$(document).ready(function () {
    var script = "ajax/php/map.php";
    var selectors = {
        container			: ".page-map",

		locContainer		: '.locations-container',
		locCenterInput		: '.center-input',
		locView				: '.locations-view-a',
		locCard				: '.location-card',
		locCardHeader		: '.location-card-header',
		locationFilters		: '.location-filter-values',

		builder				: '#query-builder',

		filterBtn			: '.filter-a',
		filterSave			: '.filter-save-a',
		filters				: '.filter-select',
		filterRemove		: '.filter-remove-a',

		statsContainer		: '.stats-container',
		statsView			: '.stats-view-a',
		statsHide			: '.stats-hide-a',		

		export				: '.export-a',
		selectAll			: '.select-all',

		rentalBtn			: '.rental-a',
		rentalRes			: '.rental-res',
		rentalDate			: '.rental-date',

		flagBtn				: '.flag-a',

		
		upload				: '.fileupload-listings',
		uploading			: '.uploading-listings',
		
		add					: '.add-a',
		sample				: '.sample-a',
		
	
        templates: {                    
			locCard			: '#template-location-card',	
        	infowindow		: '#template-infowindow',
			exportFilters	: '#template-export-filter',
			rental			: '#template-rental-res',
			upload			: '#template-upload',
			
			stats			: '#template-stats',
			
			filterSave		: 'ajax/template/map/_filter_save.phtml',
			create		: 'ajax/template/map/_create.phtml',
        },
	} 
	var initDone = false;   
    var container = $(selectors.container);    
    var modal;
	var map;	
	var currentLocation;
	var currentBox;
	var newLat;
	var newLng;
	var newCurrLocation;
	var latlngArray;
	var marker;
	var markers = [];
	var listingIds = [];
	var listingIdsChunked = [];
	var statsHidden = {};
	var listings = [];
	var listingsStats = {};
	var builderFilters;

    init();
    bind();

    function init() {    	
    	//google.maps.event.addDomListener(window, 'load', initMap);	
		window.addEventListener('load', initMap)	
		setTimeout(function(){ initMap(); },500);
		setTimeout(function(){ initMap(); },1000);
		setTimeout(function(){ initMap(); },2000);
		initBuilder();
		loadFilters();
    }

    function bind() {
		container.on('change',selectors.locCenterInput,function(){ centerMap($(this)); })
		container.on('click',selectors.locView,function(e){e.preventDefault(); getMoveData(); })
		container.on('click',selectors.filterBtn,function(e){e.preventDefault(); filterListings($(this)); })
		container.on('click',selectors.filterSave,function(e){e.preventDefault(); filterSave($(this)); })
		container.on('change',selectors.filters,function(e){e.preventDefault(); setFilter($(this)); })
		container.on('click',selectors.filterRemove,function(e){e.preventDefault(); filterRemove($(this)); })
		container.on('click',selectors.statsView,function(e){e.preventDefault(); statsView($(this)); })
		container.on('click',selectors.statsHide,function(e){e.preventDefault(); statsHide($(this)); })

		container.on('click',selectors.export,function(e){e.preventDefault(); exportModal($(this)); })
		container.on('click',selectors.selectAll,function(e){e.preventDefault(); selectAll($(this)); })

		container.on('click',selectors.rentalBtn,function(e){e.preventDefault(); rentalBtn($(this)); })
		
		container.on('click',selectors.flagBtn,function(e){e.preventDefault(); flagBtn($(this)); })
		container.on('click',selectors.add,function(e){e.preventDefault(); create($(this)); })
		container.on('click',selectors.sample,function(e){e.preventDefault(); sample($(this)); })

		container.on('change.bs.fileinput',selectors.upload, function(e){ importListings(e); });		
    }
	function create(){
		modal = new Modal({
			parent: container,
			size: '80%',
			static: true,			
			title: 'Add Listing',
			template: selectors.templates.create,				
			callback: function(){ },
			buttons: new Array(
				$('<button>').addClass('btn btn-default dialog-close').text('Cancel'),
				$('<button>').addClass('btn btn-primary').text('Create Listing').click(function(){
					var btn2 = $(this);	
					
					var data = modal.modal.find('form').serialize()

					modal.block();
					btn2.button('loading');
					$.post(script,data,function(json){
						btn2.button('reset');			
						modal.release();
						if(json.error){ $.error(json.error); }
						else{
							modal.close();
							$.notify('Filters Saved!');
						}
					},"json");

					
				})
			)
		});
	}	
	function importListings(){			
		var form = container.find(selectors.upload);
		var data = new FormData();
		data.append('file', form.find('input[type="file"]')[0].files[0]);
		data.append('action', 'importListings');
		form.find('.btn').hide();
		form.find(selectors.uploading).show();
				
		$.ajax({
			url: script,
			data: data,
			processData: false,
			contentType: false,
			dataType: "json",
			type: 'POST',
			success: function(json) {
				form.find('.btn').show();
				form.find(selectors.uploading).hide();
				
				if(json.error){ $.error(json.error); }
				else{ 
					modal = new Modal({
						parent: container,
						//size: '80%',
						static: true,			
						title: 'Upload Results',
						content: 'Loading...',
						callback: function(){
							setTimeout(function(){
								var html = Handlebars.compile(container.find(selectors.templates.upload).html());
								modal.update(html(json.stats));							
							},500);							
						},
						buttons: new Array(
							$('<button>').addClass('btn btn-default dialog-close').text('Done'),							
						)
					});
				}								
			}
		});		
	}
	
	function flagBtn(btn){
		var type = btn.attr('data-type');
		var id = btn.closest(selectors.locCard).attr('data-id');
		
		$.post(script,{action: 'flag', id: id, flag: type},function(json){			
			if(json.error){ $.error(json.error); }
			else{
				reloadItemFlags(id);
			}
		},"json");
	}
	function reloadItemFlags(id){    	
        var item = container.find(selectors.locCard).filter(function(){ return $(this).attr('data-id')==id; })
        if(item.length<=0){ $.error("Item not found!"); return; }			

        $.post(script,{action: 'loadListingFlags', id: id},function(json){
        	if(json.error){ $.error(json.error); }
        	else{
				
				listings[id].flags = json.item.flags;
        		var html = Handlebars.compile(container.find(selectors.templates.locCard).html());
        		item.replaceWith(html({'items': [listings[id]]}));
        	}    		
        },"json");        
    }
	function selectAll(btn){
		var c = btn.parent();
		if(c.find('[type="checkbox"]:checked').length > 0){
			c.find('[type="checkbox"]').prop('checked',false);
		}
		else{
			c.find('[type="checkbox"]').prop('checked','true');
		}

	}
	function rentalBtn(btn){		
		var date = container.find(selectors.rentalDate).val();

		var loc = map.getCenter()

		var bounds = map.getBounds();
		if(!$.defined(bounds))return false;

		var NECorner = bounds.getNorthEast();
		var SWCorner = bounds.getSouthWest();
		var box = {'lat1':NECorner.lat(), 'lng1':NECorner.lng(), 'lat2':SWCorner.lat(), 'lng2':SWCorner.lng()}
		
		btn.button('loading');
		$.post(script,{action: 'getLeaseRates', date: date, box: box, lat: loc.lat(), lng: loc.lng()},function(json){
			btn.button('reset');									
			if(json.error){ $.error(json.error); }
			else{
				var html = Handlebars.compile(container.find(selectors.templates.rental).html());
				container.find(selectors.rentalRes).html(html(json));
			}
		},"json");
	}
	function exportModal(){				
		modal = new Modal({
			parent: container,			
			static: true,		
			size: '50%',	
			title: 'Export Results',
			content: 'Loading...',
			callback: function(){
				setTimeout(function(){					
					var html = Handlebars.compile(container.find(selectors.templates.exportFilters).html());
					modal.update(html({'fields':builderFilters, 'stats':listingsStats}));
				},500);				
			},
			buttons: new Array(
				$('<button>').addClass('btn btn-default dialog-close').text('Cancel'),
				$('<button>').addClass('btn btn-primary').text('Export Results').click(function(){
					var btn2 = $(this);	
					
					var data = modal.modal.find(':input').serializeObject();
					data.action = 'export';

					if(!data['type[]']){ $.error("Select at least 1 results set"); return false;}
					if(!data['filter[]'])data['filter[]'] = [];
					if(typeof data['type[]'] == 'string')data['type[]'] = [data['type[]']];
					if(typeof data['filter[]'] == 'string')data['filter[]'] = [data['filter[]']];

					var ids = [];					
					listings.map(item => { 						
						if(
							(data['type[]'].indexOf('valid')>=0 && item.valid == 1)
							||
							(data['type[]'].indexOf('invalid')>=0 && item.invalid == 1)
							||
							(data['type[]'].indexOf('err')>=0 && item.err == 1)
							||
							(data['type[]'].indexOf('err_valid')>=0 && item.err_valid == 1)
						){
							ids.push(item.id);
						}						
					});	
					data.ids = ids;
					
					if(data.ids.length<=0){ $.error('No listings found to export'); return false; }

					var ids = data.ids.join(',');
					var fields = data['filter[]'].join(",");

					btn2.button('Generating File. This may take a few minutes, please wait...');
					modal.block();
					$.post(script, {action: 'generateExport', ids: ids, fields: fields}, function(json) {
						btn2.button('reset');
						modal.release();
						if(json.error){ $.error(json.error); }
						else{
							modal.close();
							$.notify("You download will start shortly...");	
							var url = '/site/map?action=export&filename='+json.filename;				
							$('body').append($('<iframe style="display:none" src="'+url+'">'));										
						}
					},"json");							
				})
			)
		});		
	}
	function sample(){
		var url = '/site/map?action=export_sample';				
		$('body').append($('<iframe style="display:none" src="'+url+'">'));		
	}

	function statsHide(btn){
		statsHidden[btn.attr('data-type')] = false;	
		filterCards();
	}	
	function statsView(btn){
		statsHidden[btn.attr('data-type')] = true;	
		filterCards();
	}	
	function filterRemove(){		
	}
	function setFilter(){
		var c =  container.find(selectors.filters);
		var data = JSON.parse(c.val());		
		var builder = container.find(selectors.builder);
		builder.queryBuilder('setRules', data);		
		c.val('');	
	}
	function loadFilters(){
		var c =  container.find(selectors.filters);
		$.post(script,{action: 'getFilters'},function(json){						
			if(json.error){ $.error(json.error); }
			else{
				c.html('<option value="">Select from saved filters...</option>');
				$.each(json.items,function(k,el){					
					c.append('<option data-id="'+el.id+'" value=\''+el.data+'\'>'+el.title+'</option>');
				});
				
			}
		},"json");
	}
	function filterSave(btn){
		var builder = container.find(selectors.builder);
		var rules = builder.queryBuilder('getRules', { get_flags: true });		

		modal = new Modal({
			parent: container,
			//size: '80%',
			static: true,			
			title: 'Save Filters',
			template: selectors.templates.filterSave,				
			callback: function(){ },
			buttons: new Array(
				$('<button>').addClass('btn btn-default dialog-close').text('Cancel'),
				$('<button>').addClass('btn btn-primary').text('Save').click(function(){
					var btn2 = $(this);					

					modal.block();
					btn2.button('loading');
					$.post(script,{action: 'filterSave', rules: rules, title: modal.modal.find('input:eq(0)').val()},function(json){
						btn2.button('reset');			
						modal.release();
						if(json.error){ $.error(json.error); }
						else{
							modal.close();
							$.notify('Filters Saved!');
						}
					},"json");

					
				})
			)
		});
	}
	function filterListings(btn){			
		var builder = container.find(selectors.builder);
		var rules = builder.queryBuilder('getRules', { get_flags: true });

		btn.button('loading');

		var c = container.find(selectors.locContainer);	
		c.html('filtering...');

		listingIdsChunked = [];
		let size = 50;
		for (let i = 0;  i < listingIds.length; i += size) {
			listingIdsChunked.push(listingIds.slice(i, i + size))
		}

		listingsStats = {'total': listingIds.length, 'chunks': listingIdsChunked.length,'valid':0, 'invalid':0, 'err':0, 'err_valid':0};
		statsHidden = {'valid': true, 'err': false, 'invalid': false, 'err_valid': false, 'filterOff': false};		

		processListingsChunk(rules);
	}
	function processListingsChunk(rules){		
		if(listingIdsChunked.length<=0){
			var builder = container.find(selectors.builder);		
			var btn = container.find(selectors.filterBtn)
			
			btn.button('reset');			
			builder.loading(false);	
			
			//createCards(listings);
			filterCards(); 								
		}
		else{
			var chunk = listingIdsChunked.shift();				
			processListings(chunk,rules).then(function(){ 							
				processListingsChunk(rules); 
			});
		}
		listingsStats['total'] = listingIds.length;
		listingsStats['progress'] = 100-parseFloat((100*listingIdsChunked.length)/listingsStats.chunks);		
		var sc = container.find(selectors.statsContainer);
		var html = Handlebars.compile(container.find(selectors.templates.stats).html());
		sc.html(html(listingsStats));	
				
		//filterCards(); 
	}
	function processListings(ids,rules){	
		var dfd = new $.Deferred();

		console.log("processing: "+ids.join(','));
		$.post(script,{action: 'filterListings', listingIds: ids.join(','), rules: rules},function(json){			
			if(json.error){ $.error(json.error); }
			else{				
				$.each(json.deals,function(k,el){					
					if(!listings[el.id])return false;

					listings[el.id].valid = (el.pass && !el.err)?1:0;
					listings[el.id].invalid = el.pass?0:1;
					listings[el.id].err = el.err?1:0;
					listings[el.id].err_valid = (el.err && el.pass)?1:0;
					listings[el.id].filters = {};


					if(listings[el.id].valid == 1){ listings[el.id].color = 'bg-success'; }
					if(listings[el.id].err_valid == 1){ listings[el.id].color = 'bg-warning'; }
					if(listings[el.id].err == 1){ listings[el.id].color = 'bg-warning'; }
					if(listings[el.id].invalid == 1){ listings[el.id].color = 'bg-danger'; }

					$.each(el.res,function(k,r){												
						var label = k.replace(/-uid-(.*)/,'').replace(/\./g,' - ');
						var key = el.id+'-'+k.replace(/-uid-(.*)/,'').replace(/ |\./g,'');
						var color = '';
						if(r.err){ color = 'warning'; }
						else if(r.valid){ color = 'success'; }						
						else{ color = 'danger'; }	

						if(listings[el.id].filters[key] && listings[el.id].filters[key]['color']=='danger'){
							color = 'danger';
						}						
						listings[el.id].filters[key] = {'label':label, 'value': r.value, 'color': color}						
					});				
				});				
				$.each(json.stats,function(k,v){ listingsStats[k] += parseInt(v); });							
			}

			dfd.resolve();

		},"json");
		return dfd.promise();
	}
	function createCards(listings){
		var c = container.find(selectors.locContainer);
		var html = Handlebars.compile(container.find(selectors.templates.locCard).html());
	
		
		//elementsInit();
	 }
	function filterCards(){		
		var c = container.find(selectors.locContainer);		
		var html = Handlebars.compile(container.find(selectors.templates.locCard).html());

		c.loading();
		var items = [];
		listings.map(item => { 

			var marker = '';
			for(x in markers)if(markers[x].listingId == item.id)marker = markers[x];

			if(
				(statsHidden.valid == true && item.valid == 1)
				||
				(statsHidden.invalid == true && item.invalid == 1)
				||
				(statsHidden.err == true && item.err == 1)
				||
				(statsHidden.err_valid == true && item.err_valid == 1)
			){
				items.push(item); 
				if(marker)marker.setVisible(true);
			}
			else{
				if(marker)marker.setVisible(false);
			}			
		})	
		c.html(html({'items':items}));
		
		if(statsHidden.valid == true){
			container.find(selectors.statsHide).filter(function(){ return $(this).attr('data-type')=='valid'; }).show();
			container.find(selectors.statsView).filter(function(){ return $(this).attr('data-type')=='valid'; }).hide();			
		}
		else{
			container.find(selectors.statsHide).filter(function(){ return $(this).attr('data-type')=='valid'; }).hide();
			container.find(selectors.statsView).filter(function(){ return $(this).attr('data-type')=='valid'; }).show();
		}

		if(statsHidden.invalid == true){
			container.find(selectors.statsHide).filter(function(){ return $(this).attr('data-type')=='invalid'; }).show();
			container.find(selectors.statsView).filter(function(){ return $(this).attr('data-type')=='invalid'; }).hide();						
		}
		else{
			container.find(selectors.statsHide).filter(function(){ return $(this).attr('data-type')=='invalid'; }).hide();
			container.find(selectors.statsView).filter(function(){ return $(this).attr('data-type')=='invalid'; }).show();				
		}

		if(statsHidden.err == true){
			container.find(selectors.statsHide).filter(function(){ return $(this).attr('data-type')=='err'; }).show();
			container.find(selectors.statsView).filter(function(){ return $(this).attr('data-type')=='err'; }).hide();			
		}
		else{
			container.find(selectors.statsHide).filter(function(){ return $(this).attr('data-type')=='err'; }).hide();
			container.find(selectors.statsView).filter(function(){ return $(this).attr('data-type')=='err'; }).show();
		}

		if(statsHidden.err_valid == true){
			container.find(selectors.statsHide).filter(function(){ return $(this).attr('data-type')=='err_valid'; }).show();
			container.find(selectors.statsView).filter(function(){ return $(this).attr('data-type')=='err_valid'; }).hide();			
		}
		else{
			container.find(selectors.statsHide).filter(function(){ return $(this).attr('data-type')=='err_valid'; }).hide();
			container.find(selectors.statsView).filter(function(){ return $(this).attr('data-type')=='err_valid'; }).show();
		}
		c.loading(false);	
	}
	function initBuilder(){
		var builder = container.find(selectors.builder);

		builder.loading(true);
		$.post(script,{action: 'buildFilterConfig'},function(json){
			builder.loading(false);
			if(json.error){ $.error(json.error); }
			else{
				builderFilters = json;
				var model = {
					"JQQueryBuilderConfig": {
					  	"plugins": {
							//"sortable": null,
							"unique-filter": null,
							//"invert": null,
							//"not-group": null,
							"sql-support": {
						  	"boolean_as_integer": false
							}
					  	},
					  	"filters": json,
					  	"rules": null
						},
						"JQQueryBuilderFieldIdMappings": {
					  	"\"SaleReportView\".\"BookingConfirmRef\"": "salereportview-bookingconfirmref",
					  	"\"SaleReportView\".\"TransferFareinsellingcurrency\"": "salereportview-transferfareinsellingcurrency",
					  	"\"SaleReportView\".\"TransferMarkupPrice\"": "salereportview-transfermarkupprice"
						},
						"Query": null
				  	};

				  	builder.queryBuilder(model.JQQueryBuilderConfig);		  
				  	builder.on('getSQLFieldID.queryBuilder.filter', function(e) {
					  	if (e.value in model.JQQueryBuilderFieldIdMappings) {
							return model.JQQueryBuilderFieldIdMappings[e.value];
					  	} else {
							return e.value;
						  }
				  	});
				  	if (model.Query) {
						builder.queryBuilder('setRulesFromSQL', model.Query);
					}
					builder.find('.group-actions .btn').removeClass('btn-success').addClass('btn-primary');								  
			}
		},"json");	

	}

	function centerMap(input){
		var address = input.val();		

		const geocoder = new google.maps.Geocoder();
        geocoder.geocode({address: address},
            (results, status) => {				
                if (status == 'OK' && results.length > 0) {
                    const firstResult = results[0].geometry;
                    const bounds = new google.maps.LatLngBounds();

                    if (firstResult.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(firstResult.viewport);
                    } else {
                        bounds.extend(firstResult.location);
                    }

                    map.fitBounds(bounds);
                }
            }
        );
	}
	function initMap(){
		if(initDone)return;		
		map = new google.maps.Map(document.getElementById('map-canvas'), {
			center: new google.maps.LatLng(34.08564344830642,-118.26248089994928), // Munich Germany
			zoom: 5
		  });
		google.maps.event.addListener( map, 'idle', function() {
			initDone = true;
		});	
			
		getMoveData()
		//google.maps.event.addListener(map,'dragend',getMoveData) // All events are here https://google-developers.appspot.com/maps/documentation/javascript/examples/full/map-events
	}
	function getMoveData() {
		clearMarkers()
		currentLocation = map.getCenter()
		newCurrLocation = currentLocation.toString();
		newCurrLocation = newCurrLocation.replace('(', '');
		newCurrLocation = newCurrLocation.replace(')', '');
		
		var bounds = map.getBounds();
		if(!$.defined(bounds))return false;

		var NECorner = bounds.getNorthEast();
		var SWCorner = bounds.getSouthWest();
		currentLocationBox = {'lat1':NECorner.lat(), 'lng1':NECorner.lng(), 'lat2':SWCorner.lat(), 'lng2':SWCorner.lng()}
	
		latlngArray = new Array();
		latlngArray = newCurrLocation.split(",")
		for (a in latlngArray) {
				latlngArray[a] = parseFloat(latlngArray[a]);
		}
		newLat = latlngArray[0]
		newLng = latlngArray[1]
		map.setCenter({
			lat : newLat,
			lng : newLng
		});
		showPlaces()		
	}
	
function getMissingSubmarkets(){
	var data = {};
	data.action = 'getMissingSubmarkets';	

	$.post(script,data,function(json){
		$.each(json.items,function(k,el){
			marker = new google.maps.Marker({
				map: map,		
				title: 'ID: '+el.remote_id,
				position: { lat: parseFloat(el.lat), lng: parseFloat(el.lng) }
			  });
		});		  
	},"json");
}
function testSubmarkets(){
	var data = {};
	data.action = 'testSubmarkets';
	data.lat = currentLocation.lat();
	data.lng = currentLocation.lng();
	data.box = currentLocationBox;

	marker = new google.maps.Marker({
		map: map,		
		title: 'TEST',
		position: { lat: parseFloat("34.04602170142056"), lng: parseFloat("-118.24341835510265") }
	  });


	$.post(script,data,function(json){
		$.each(json.items,function(k,el){
			if(!el.geo)return;
			const lines = el.geo.map(p => google.maps.geometry.encoding.decodePath(p));
			var geo = '';			

			//console.log(lines);
			if(lines[1]){
				console.log('multi');				
				geo = new google.maps.Data.MultiPolygon([lines]);
			}
			else{
				console.log('poly');
				geo = new google.maps.Data.Polygon(lines);				
			}
			//console.log(geo);
			map.data.add({
				"type": "Feature",
				"properties": {
					"name": el.name,
					//"color": "red",
					//"rank": "15",
					//"ascii": "111"
				},
				geometry: geo
			});			
		});


		map.data.setStyle((feature) => {
			//return /** @type {google.maps.Data.StyleOptions} */ {
			 // fillColor: feature.getProperty("color"),
			  //strokeWeight: 1,
			//};
		  });
		
		  // Set mouseover event for each feature.
		  map.data.addListener("mouseover", (event) => {			
			  console.log(event.feature.getProperty("name"));
		  });

		  

	},"json");

	/*
	
			console.log(lines);						
			map.data.add({
				geometry: new google.maps.Data.Polygon([lines])
			  });

			  map.setCenter({
				lat : lines[0].lat(),
				lng : lines[0].lng()
			});

			*/
}
function showPlaces(){	
	getMissingSubmarkets();
	//testSubmarkets();
	return false;

	var btn = container.find(selectors.locView);

	var c = container.find(selectors.locContainer);

	var data = container.find('form').serializeObject();
	data.action = 'getLocations';
	data.lat = currentLocation.lat();
	data.lng = currentLocation.lng();
	data.box = currentLocationBox;

	listingIds = [];
	listings = [];
	c.html('loading...');
	btn.button('loading');
	$.post(script,data,function(json){
		btn.button('reset');
		if(json.error){ $.error(json.error); }
		else{
			$.each(json.items,function(k,el){
				createMarker(el);
				listingIds.push(el.id);				
			});
			//createMarkers(json.items);
			createCenterMarker(currentLocation.lat(),currentLocation.lng());

			$.each(json.formatted,function(k,el){
				listings[el.id] = el;
			});

			var sc = container.find(selectors.statsContainer);
			var html = Handlebars.compile(container.find(selectors.templates.stats).html());
			sc.html(html({'total':json.items.length}));

			c.html('No filters applied...');

			//const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });


			//statsHidden = {'valid': true, 'err': true, 'invalid': true, 'err_valid': true, 'filterOff': true};
			//filterCards();

		}
	},"json");	
 }
 
 function createCenterMarker(lat,lng){	 
	var marker = new google.maps.Marker({
		map: map,		
		position: { lat: lat, lng: lng }
	  });
	  markers.push(marker);
 }
 function createMarker(el) {   		 				 
		 const image = {
			url: '/images/markers/'+el.source+'.png',			
			size: new google.maps.Size(32, 32),			
			origin: new google.maps.Point(0, 0),			
			anchor: new google.maps.Point(0, 0),
		  };

		 var marker = new google.maps.Marker({
			map: map,
			icon: image,
			listingId: el.id,
			title: el.title+' - '+el.source,
			position: { lat: parseFloat(el.lat), lng: parseFloat(el.lng) }
		  });
		  markers.push(marker);
		  const infowindow = new google.maps.InfoWindow({
			content: '',
		  });		

		  var html = Handlebars.compile(container.find(selectors.templates.infowindow).html());
		  var content = html(el);

		  google.maps.event.addListener(marker, 'click', function() {			
			infowindow.setContent(content);		
			infowindow.open(map, this);

			console.log(marker.listingId);
			//window.open('/site/deal2?id='+marker.listingId, '_blank');

		  });
		  //console.log(marker);
 }
 function clearMarkers() {
   for (var i = 0; i < markers.length; i++) {
	 markers[i].setMap(null);
   }
   markers = [];
 
 } 
	
});