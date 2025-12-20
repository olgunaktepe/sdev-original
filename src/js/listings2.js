$(document).ready(function () {
    var script = "ajax/php/listings2.php";
    var selectors = {
        container			: ".page-listings",

		locContainer		: '.locations-container',
		locContainerScrollable: '.locations-scrollable-container',
		locCenterInput		: '.center-input',
		locView				: '.locations-view-a',
		locCard				: '.location-card',
		locCardHeader		: '.location-card-header',
		locationFilters		: '.location-filter-values',
		locSize				: '.locations-size-a',

		filtersSizeContainer	: '.filters-size-container',
		locSizeContainer		: '.locations-size-container',
					
		filterSave			: '.filter-save-a',
		filters				: '.filter-select',
		filterReset			: '.filter-reset-a',
		filterLoad			: '.filter-load-a',
		filterDelete		: '.filter-delete-a',
		filterRemove		: '.filter-remove-a',
		filterDisable		: '.filter-disable-a',
		filterEnable		: '.filter-enable-a',		

		filterSearchRes		: '.filter-search-res',
		filterSearchForm	: '.filter-search-form',
		filterSearch		: '.filter-search-a',
		filterSearchResView : '.filter-search-res-view-a',
		filterSearchResAdd  : '.filter-search-res-add-a',
		filterSearchResViewContainer: '.filter-search-res-view-container',

		filterContainer		: '.filter-container',
		filterAdd			: '.filter-add-a',
		filterQuerySelector	: '.filter-query-selector',
		filterQueryItem		: '.filter-query-item',
		filterQueryData		: '.filter-query-data',
		filterQueryInputSelector: '.filter-query-input-selector',
		filterQueryInput	: '.filter-query-input-container',
		filterQueryOptions	: '.filter-query-options-container',
		filterQueryOptionsSelect: '.filter-query-options-select',
		filterQueryOptionsSelected: '.filter-query-options-selected',
		filterQueryOptionAdd: '.filter-query-option-add',
		filterrQueryOptionValue: '.filter-query-option-value',
		filterrQueryOptionValue1: '.filter-query-option-value1',
		filterrQueryOptionValue2: '.filter-query-option-value2',
		filterQueryProximity: '.filter-query-proximity-value',
		filterQueryInputTypeContainer	: '.filter-query-input-type-container',
		filterQueryInputTypeSelect		: '.filter-query-input-type-selector',
		filterQueryRelativeOptionValue: '.filter-query-relative-option-value',
		filterQueryRelativeOptionValue1: '.filter-query-relative-option-value1',
		filterQueryRelativeOptionValue2: '.filter-query-relative-option-value2',
		filteRQueryRelativeOptionMultiplier: '.filter-query-relative-option-value-multiplier',
		filteRQueryRelativeOptionMultiplier1: '.filter-query-relative-option-value-multiplier1',
		filteRQueryRelativeOptionMultiplier2: '.filter-query-relative-option-value-multiplier2',

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

		listingsSort		: '.listings-sort',
		listingsSortSelect	: '.listings-sort select',
		
	
        templates: {                    
			locCard			: '#template-location-card',	
        	infowindow		: '#template-infowindow',
			exportFilters	: '#template-export-filter',
			rental			: '#template-rental-res',
			upload			: '#template-upload',
			
			stats			: '#template-stats',
			
			filterSave		: 'ajax/template/listings2/_filter_save.phtml',
			filterload		: 'ajax/template/listings2/_filter_load.phtml',
			filterAddQuery	: 'ajax/template/listings2/_filter_add_query.phtml',
			filterQueryItem	: '#template-filter-query-item',		
			filterItem		: '#template-filter-item',	
			filterSearchItem: '#template-filter-search-res-item',
			filterSearchView: '#template-filter-search-res-view',	
			create		: 'ajax/template/listings2/_create.phtml',
        },
	}  
    var container = $(selectors.container);    
    var modal;
	var map;	
	var markers = [];
	var listingIds = [];
	var listingIdsChunked = [];
	var statsHidden = {};
	var listings = [];
	var listingsStats = {};
	var listingsState = {'scrollPosition':0, 'aip': false};
	var builderFilters;
	var filters = [];
	var activeFilterChunks = [];
	var searchParams = '';
	var benchmark;	
	var sortedListingsIndex;
	var locContainerSize = 8;

    init();
    bind();

    function init() {    	
    }

    function bind() {
		container.on('change',selectors.locCenterInput,function(){ centerMap($(this)); })
		container.on('click',selectors.locView,function(e){e.preventDefault(); search(); })		
		container.on('click',selectors.locSize,function(e){e.preventDefault(); locSize($(this)); })		
		container.on('click',selectors.filterSave,function(e){e.preventDefault(); filterSave($(this)); })
		container.on('change',selectors.filters,function(e){e.preventDefault(); setFilter($(this)); })		
		container.on('click',selectors.filterReset,function(e){e.preventDefault(); filterReset($(this)); })
		container.on('click',selectors.filterLoad,function(e){e.preventDefault(); filterLoad($(this)); })		
		container.on('click',selectors.filterSearch,function(e){e.preventDefault(); filterSearch($(this)); })		
		container.on('click',selectors.filterSearchResView,function(e){e.preventDefault(); filterSearchResView($(this)); })		
		container.on('click',selectors.filterSearchResAdd,function(e){e.preventDefault(); filterSearchResAdd($(this)); })		

		container.on('click',selectors.filterDelete,function(e){e.preventDefault(); filterDelete($(this)); })		
		container.on('click',selectors.filterRemove,function(e){e.preventDefault(); filterRemove($(this)); })		
		container.on('click',selectors.filterDisable,function(e){e.preventDefault(); filterDisable($(this),1); })		
		container.on('click',selectors.filterEnable,function(e){e.preventDefault(); filterDisable($(this),0); })		

		container.on('click',selectors.filterAdd,function(e){e.preventDefault(); filterAdd($(this)); })
		container.on('change',selectors.filterQuerySelector,function(e){e.preventDefault(); filterQuerySelect($(this)); })
		container.on('change',selectors.filterQueryInputSelector,function(e){e.preventDefault(); filterQueryInputSelect($(this)); })
		container.on('click',selectors.filterQueryOptionsSelect,function(e){e.preventDefault(); filterQueryOptionsSelect($(this),1); })
		container.on('click',selectors.filterQueryOptionsSelected,function(e){e.preventDefault(); filterQueryOptionsSelect($(this),0); })
		container.on('click',selectors.filterQueryOptionAdd,function(e){e.preventDefault(); filterQueryOptionAdd($(this),0); })
		container.on('change',selectors.filterQueryInputTypeSelect,function(e){e.preventDefault(); filterQueryInputTypeSelect($(this)); })

		container.on('click',selectors.statsView,function(e){e.preventDefault(); statsView($(this)); })
		container.on('click',selectors.statsHide,function(e){e.preventDefault(); statsHide($(this)); })

		container.on('click',selectors.export,function(e){e.preventDefault(); exportModal($(this)); })
		container.on('click',selectors.selectAll,function(e){e.preventDefault(); selectAll($(this)); })

		container.on('click',selectors.rentalBtn,function(e){e.preventDefault(); rentalBtn($(this)); })
		
		container.on('click',selectors.flagBtn,function(e){e.preventDefault(); flagBtn($(this)); })
		container.on('click',selectors.add,function(e){e.preventDefault(); create($(this)); })
		container.on('click',selectors.sample,function(e){e.preventDefault(); sample($(this)); })
		
		container.find(selectors.locContainerScrollable).scroll(function(e){ locScroll($(this)); })				

		container.on('change.bs.fileinput',selectors.upload, function(e){ importListings(e); });	
		
		container.on('click',selectors.listingsSort, function(e){ e.preventDefault(); sortListings($(this)); });	
		container.on('click',selectors.listingsSortSelect, function(e){ e.stopPropagation(); e.preventDefault(); });	
		container.on('change',selectors.listingsSortSelect, function(e){ sortListingsSelect($(this)); });	
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

		if(btn.hasClass('flag-on'))type='';
		
		$.post(script,{action: 'updateStatus', id: id, status: type},function(json){			
			if(json.error){ $.error(json.error); }
			else{
				listings[id].status = json.status;
				var html = Handlebars.compile(container.find(selectors.templates.locCard).html());
				
				var item = container.find(selectors.locCard).filter(function(){ return $(this).attr('data-id')==id; })
        		if(item.length<=0){ $.error("Item not found!"); }			
				else{
					item.replaceWith(html(listings[id]));
				}        		
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
		for(x in statsHidden)statsHidden[x] = false;
		
		statsHidden[btn.attr('data-type')] = true;	
		filterCards();
	}	
	function filterDelete(btn){
		if(!confirm("Are you sure you want to permanently delete this filter?"))return;

		var id = btn.attr('data-id');

		btn.button('loading');
		$.post(script,{action: 'removeFilter', id: id},function(json){
			btn.button('reset');						
			if(json.error){ $.error(json.error); }
			else{
				filterSearch(); 
			}
		},"json");
	}
	function setFilter(){
		var c =  container.find(selectors.filters);
		var data = JSON.parse(c.val());		
		var builder = container.find(selectors.builder);
		builder.queryBuilder('setRules', data);		
		c.val('');	
	}
	function filterRemove(btn){
		var key = btn.attr('data-key');
		var index = filters.findIndex(function(el){ return el.key==key })
		if(index>=0){						  
			filters.splice(index, 1);			
		}
		renderFilters();
	}
	function filterDisable(btn,status){
		var key = btn.attr('data-key');		
		var index = filters.findIndex(function(el){ return el.key==key })
		if(index>=0){
			filters[index].disabled=status;
		}
		renderFilters();
	}
	function filterAdd(){
		modal = new Modal({
			parent: container,
			size: '80%',
			static: true,			
			title: 'Save Filters',
			template: selectors.templates.filterAddQuery,				
			callback: function(){ modal.filter = ''; },
			buttons: new Array(
				$('<button>').addClass('btn btn-default dialog-close').text('Cancel'),
				$('<button>').addClass('btn btn-primary').text('Add').click(function(){	
					var btn = $(this);
					
					container.find(selectors.filterQueryOptionsSelected+' option').prop('selected', true);
					var filter = {
						'op':	container.find(selectors.filterQueryInputSelector).val(),
						'value': container.find(selectors.filterQueryOptionsSelected).val(),
						'id': container.find(selectors.filterQuerySelector).val(),
						'type': container.find(selectors.filterQuerySelector).find('option:selected').attr('data-type'),
						'mode': container.find('[name="query-op"]:checked').val(),
						'label': container.find(selectors.filterQuerySelector).find('option:selected').text(),
						'proximity': parseFloat(container.find(selectors.filterQueryProximity).val())
					};
					if(isNaN(filter.proximity))filter.proximity=0;
					container.find(selectors.filterQueryOptionsSelected+' option').prop('selected', false);	
										
					if(container.find(selectors.filterQueryProximity).is(':visible') && filter.proximity<=0){ $.error("Proximity is required!"); return; }					
					
					addFilter(filter);					
					modal.close();
					
							
				})
			)
		});
	}
	function addFilter(filter){
		if(filters == 'ShowAll')filters = [];

		var key = getFilterKey(filter);
		var old = filters.filter(function(el){ return el.key==key })
		if(old.length<=0){
			filter.key = key;
			filters.push(filter);
		}
		renderFilters();
	}	
	function getFilterKey(filter){
		return JSON.stringify(filter).replace(/[^0-9A-Za-z]/ig,"");
	}
	function groupFilters(items){
		var groups = [];
		$.each(items,function(k,el){
			var id = el.id;

			var group = groups.filter(function(el){ return el.id==id });
			if(group.length<=0){
				group = {'id': id ,'label': el.label, 'items': []};
				groups.push(group);
			}

			group = groups.filter(function(el){ return el.id==id });		
			
			group = group[0];
			//console.log(el);
			group['items'].push(el);
		})
		return groups;
	}
	function renderFilters(){
		//console.log(filters);

		var groups = groupFilters(filters);
		//console.log({'groups': groups});

		var c = container.find(selectors.filterContainer);

		var html = Handlebars.compile(container.find(selectors.templates.filterItem).html());
		c.html(html({'groups': groups}));		
	}
	function filterQueryOptionAdd(){
		var value = '';
		var label = '';
		var type = container.find(selectors.filterQueryInputTypeSelect).val();

		if(type == 'relative'){
			var val = container.find(selectors.filterQueryRelativeOptionValue).val();
			var val1 = container.find(selectors.filterQueryRelativeOptionValue1).val();
			var val2 = container.find(selectors.filterQueryRelativeOptionValue2).val();
			if(!$.defined(val))val='';
			if(!$.defined(val1))val1='';
			if(!$.defined(val2))val2='';

			var label = container.find(selectors.filterQueryRelativeOptionValue+' option:selected').text();
			var label1 = container.find(selectors.filterQueryRelativeOptionValue1+' option:selected').text();
			var label2 = container.find(selectors.filterQueryRelativeOptionValue2+' option:selected').text();

			var mult = parseFloat(container.find(selectors.filteRQueryRelativeOptionMultiplier).val());
			var mult1 = parseFloat(container.find(selectors.filteRQueryRelativeOptionMultiplier1).val());
			var mult2 = parseFloat(container.find(selectors.filteRQueryRelativeOptionMultiplier2).val());
			if(isNaN(mult))mult=1;
			if(isNaN(mult1))mult1=1;
			if(isNaN(mult2))mult2=1;

			if(val.length<=0 && val1.length<=0){
				$.error("Invalid Value");
				return;
			}

			value = val+'*'+mult;
			label = label+'*'+mult;
			if(val1.length>0){
				value = val1+'*'+mult1+' - '+val2+'*'+mult2;
				label = label1+'*'+mult1+' - '+label2+'*'+mult2;
			}				
		}
		else{				
			var val = container.find(selectors.filterrQueryOptionValue).val();
			var val1 = container.find(selectors.filterrQueryOptionValue1).val();
			var val2 = container.find(selectors.filterrQueryOptionValue2).val();

			value = val;
			if(val1.length>0)value = val1+' - '+val2;
			label = value;	

			if(value.length<=0){
				$.error("Invalid Value");
				return;
			}
		}				

		var selected = container.find(selectors.filterQueryOptionsSelected);

		var old = selected.find('option[value="'+value+'"]');
		if(old.length<=0)selected.append('<option value="'+value+'">'+label+'</option>');	
	}
	function filterQueryOptionsSelect(obj,status){		
		var select = container.find(selectors.filterQueryOptionsSelect);
		var selected = container.find(selectors.filterQueryOptionsSelected);
		var val = obj.val();		
		if(status == 1){
			$.each(val,function(k,v){
				if(v.length>0){
					var old = selected.find('option[value="'+v+'"]');
					var label = obj.find('option[value="'+v+'"]').text();				
					if(old.length<=0)selected.append('<option value="'+v+'">'+label+'</option>');
				}
			})	
		}
		else{
			$.each(val,function(k,v){
				selected.find('option[value="'+v+'"]').remove()
			})			
		}
		select.val('');
		selected.val('');
		
	}
	function filterQueryInputTypeSelect(){
		var type = container.find(selectors.filterQueryInputTypeSelect).val();
		var c = container.find(selectors.filterQueryInputTypeContainer);
		c.hide();

		var div = c.filter(function(k,el){ return $(el).attr('data-type')==type; });
		div.show();
	}
	function filterQueryInputSelect(){
		var input = container.find(selectors.filterQueryInputSelector);

		container.find(selectors.filterrQueryOptionValue).val('');
		container.find(selectors.filterrQueryOptionValue1).val('');
		container.find(selectors.filterrQueryOptionValue2).val('');
		container.find(selectors.filterQueryProximity).val('');
		container.find(selectors.filterQueryRelativeOptionValue).val('');
		container.find(selectors.filterQueryRelativeOptionValue1).val('');
		container.find(selectors.filterQueryRelativeOptionValue2).val('');
		container.find(selectors.filteRQueryRelativeOptionMultiplier).val('');
		container.find(selectors.filteRQueryRelativeOptionMultiplier1).val('');
		container.find(selectors.filteRQueryRelativeOptionMultiplier2).val('');

		var c = container.find(selectors.filterQueryInput).filter(function(){ return $(this).hasClass('op_'+input.val()) });
		if(!c.length){
			c = container.find(selectors.filterQueryInput).filter(function(){ return $(this).hasClass('op_default') });
		}
		container.find(selectors.filterQueryInput).hide();

		if(input.val().indexOf('not_')>=0){
			modal.modal.find('.form-check-input[value="and"]').prop('checked',true);
		}
		else{
			modal.modal.find('.form-check-input[value="or"]').prop('checked',true);
		}

		c.show();
	}
	function filterQuerySelect(){
		var input = container.find(selectors.filterQuerySelector);
		var c = container.find(selectors.filterQueryItem);
		
		c.loading(true);		
		$.post(script,{action: 'getFilterData', id: input.val()},function(json){
			c.loading(false);						
			if(json.error){ c.html('Error: '+json.error); }
			else{
				var html = Handlebars.compile(container.find(selectors.templates.filterQueryItem).html());
				c.html(html(json));
				filterQueryInputSelect();		
			}
		},"json");
	}

	function filterLoad(){
		modal = new Modal({
			parent: container,
			size: '50%',
			static: true,			
			title: 'Load Filter',
			template: selectors.templates.filterload,				
			callback: function(){ filterSearch(); },
			buttons: new Array(
				$('<button>').addClass('btn btn-default dialog-close').text('Done')				
			)
		});
	}
	function filterSearch(){
		container.find(selectors.filterSearchResViewContainer).html('');
		var btn = container.find(selectors.filterSearch);
		btn.button('loading');

		var form = modal.modal.find('form');
		$.post(script,form.serialize(),function(json){
			btn.button('reset');						
			if(json.error){ $.error(json.error); }
			else{
				var c = container.find(selectors.filterSearchRes);
				var html = Handlebars.compile(container.find(selectors.templates.filterSearchItem).html());		
				c.html(html(json));				
			}
		},"json");
	}
	function filterSearchResView(btn){
		var id = btn.attr('data-id');
		var c = container.find(selectors.filterSearchResViewContainer);

		c.loading(true);
		$.post(script,{action: 'getFilter', id: id},function(json){
			c.loading(false);
			if(json.error){ c.html('Error: '+json.error); }
			else{				
				var html = Handlebars.compile(container.find(selectors.templates.filterSearchView).html());	
				var groups = groupFilters(json.item.data);				
				c.html(html({'groups':groups, 'id': json.item.id}));
			}
		},"json");
	}
	function filterSearchResAdd(btn){
		var id = btn.attr('data-id');		

		btn.button('loading');
		$.post(script,{action: 'getFilter', id: id},function(json){
			btn.button('reset');
			if(json.error){ $.error(json.error); }
			else{				
				$.each(json.item.data,function(k,el){
					//console.log(el);
					addFilter(el)
				});
			}
		},"json");
	}
	function filterReset(){
		if(!confirm("Are you sure you want to clear the filters?"))return;

		filters = [];
		renderFilters();
	}
	function filterSave(btn){	
		if(filters.length<=0){ $.error("Nothing to save!"); return; }

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
					
					var form = modal.modal.find('form');
					var data = form.serializeObject();
					data['filters'] = filters;

					if(data.overwrite_id){
						if(!confirm("Are you sure you want to overwrite this existing filter?")){
							return;
						}
					}
					
					modal.block();
					btn2.button('loading');
					$.post(script,data,function(json){
						btn2.button('reset');			
						modal.release();
						if(json.error){ $.error(json.error); }
						else{
							modal.close();
							$.notify('Filter Saved!');
						}
					},"json");

					
				})
			)
		});
	}
	function filterListings(){			
		var btn = container.find(selectors.filterSearch);				
		btn.button('loading');

		var c = container.find(selectors.locContainer);	
		c.html('filtering...');		
		
		listingIdsChunked = [];
		let size = 200;
		let maxThreads = 5;

		//let size = 50;
		//let maxThreads = 1;
		for (let i = 0;  i < listingIds.length; i += size) {
			listingIdsChunked.push(listingIds.slice(i, i + size))
		}
		if(listingIdsChunked.length<maxThreads)maxThreads = 1;

		if(filters.length<=0){
			//if(maxThreads <= 1){				//Show all listings
				filters = 'ShowAll';
			//}
			//else{
//				c.html('No filters applied...');
			//	return false;
			//}
		}

		listingsStats = {'total': listingIds.length, 'chunks': listingIdsChunked.length, 'chunkSize': size, 'maxThreads': maxThreads,'valid':0, 'invalid':0, 'err':0, 'err_valid':0,'speed': 0};
		statsHidden = {'valid': true, 'err': false, 'invalid': false, 'err_valid': false, 'filterOff': false};		
		
		loadStats(filters);

		activeFilterChunks = [];		
		processListingsThreaded(filters);		
	}
	function checkProgress(){		
		//console.log("Updating progress...");
		var done = 0;
		var pending = 0;
		var active = 0;
		for(x in activeFilterChunks){
			var chunk = activeFilterChunks[x];
			if(chunk.done) done++;
			else pending++;

			if(chunk.active)active++;
		}
		//console.log('Done: '+done);
		//console.log('Pending: '+pending);
		//console.log('Active: '+active);

		listingsStats['total'] = listingIds.length;
		//listingsStats['progress'] = 100-parseFloat((100*listingIdsChunked.length)/listingsStats.chunks);
		listingsStats['progress'] = parseFloat((100*done)/listingsStats.chunks);
		listingsStats['elapsed'] = checkTimer();		
		if(listingsStats['elapsed']>0){			
			listingsStats['speed'] = (done*listingsStats['chunkSize'])/listingsStats['elapsed']		
			listingsStats['speed'] = listingsStats['speed'].toFixed(2);			
		}
		else listingsStats['speed'] = 0;

		var sc = container.find(selectors.statsContainer);
		var html = Handlebars.compile(container.find(selectors.templates.stats).html());
		sc.html(html(listingsStats));

		if(listingIdsChunked.length<=0 && active==0){			
			var btn = container.find(selectors.filterSearch);					
			btn.button('reset');												
			filterCards(); 								
		}
		else{
			setTimeout(function(){ checkProgress(); },1000);
		}
	}
	function lunchThread(rules){
		if(listingIdsChunked.length<=0)return;

		var maxThreads = listingsStats.maxThreads;
		var active = 0;
		for(x in activeFilterChunks)if(activeFilterChunks[x].active)active++;
		
		if(active>=maxThreads){ setTimeout(function(){ lunchThread(rules); },500); }

		var openThreads = maxThreads-active;
		//console.log("Open Threads: "+openThreads);
		for(i=0; i<openThreads; i++){
			if(listingIdsChunked.length>0){
				var chunk = listingIdsChunked.shift();			
				var x = activeFilterChunks.length;
				activeFilterChunks[x] = {'done': false, 'active': true};
				console.log('Launching: '+x);
				processListings(x,chunk,rules).then(function(x){ 					
					activeFilterChunks[x] = {'done': true, 'active': false};
				});		
			}
		}
		if(listingIdsChunked.length>0)setTimeout(function(){ lunchThread(rules); },500);
	}
	function processListingsThreaded(rules){	
		lunchThread(rules);
		checkProgress();
		return;
	}
	function startTimer() {
		benchmark = new Date();
	}	  
	function checkTimer() {
		endTime = new Date();
		var timeDiff = endTime - benchmark; //in ms
		// strip the ms
		timeDiff /= 1000;
	  
		// get seconds 
		var seconds = Math.round(timeDiff);
		return seconds;
	}
	function processListings(chunkId, ids,rules){	
		var dfd = new $.Deferred();
		
		if(ids.indexOf('2800967')>=0){
			console.log("---------------------");
			console.log(ids);
			console.log("---------------------");
		}

		//console.log("processing: "+ids.join(','));
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

			dfd.resolve(chunkId);

		},"json");
		return dfd.promise();
	}
	function createCards(listings){
		var c = container.find(selectors.locContainer);
		var html = Handlebars.compile(container.find(selectors.templates.locCard).html());
	
		
		//elementsInit();
	}
	function locScroll(obj){		
		if(listingsState.aip == true)return false;		

		listingsState.aip = true;
		if(obj.scrollTop() + obj.innerHeight() >= obj[0].scrollHeight && obj.scrollTop()>listingsState.scrollPosition) {				
			var page = listingsState.page+1;			
			showCardsPage(page);			
		}
		listingsState.scrollPosition = obj.scrollTop();
		listingsState.aip = false;
	}
	function showCardsPage(page){
		var perpage = 10;

		var c = container.find(selectors.locContainer);		
		var html = Handlebars.compile(container.find(selectors.templates.locCard).html());		

		if(page == 0)c.html('');
		listingsState.page = page;
		
		var sorted = listings;	
		if($.defined(sortedListingsIndex) && sortedListingsIndex.length){
			console.log("Sorting...");
			console.log(sortedListingsIndex);
			sorted = [];	
			for(x in sortedListingsIndex){
				var id = sortedListingsIndex[x][0];
				//console.log("Adding "+id);
				sorted.push(listings[id]);
			}				
		}		
		//console.log("-----------");
		//console.log(sorted);
		//console.log("-----------");

		var visible = sorted.filter(function(el){ return (el.visible); });

		var paginated = visible.slice((page*perpage), (page*perpage)+perpage);
		console.log('Offset: '+(page*perpage));
		console.log('Loading page: '+page);
		console.log('Visible: '+visible.length);
		console.log('Page: '+paginated.length);

		$.each(paginated,function(k,el){			
			c.append(html(el));
		});
		
	}
	function sortListingsSelect(select){
		var header = select.parent();
		var label = header.find('label');
		label.text(select.find('option:selected').text());
		header.attr('data-sort',select.val());
		header.attr('data-sort-type',select.find('option:selected').attr('data-sort-type'));		
		header.click();		
		//sortListings(header);
	}
	const getValue = (path, obj) => path.split('.').reduce((acc, c) => acc && acc[c], obj);
	function sortListings(header){		
		if(!header)return false;
		console.log(header);

		//var oldDir = (header.hasClass('dir-d'))?'dir-d':'dir-u';
	
		var sortable = [];				
		if(header == 'default'){
			var col = 'created_on';
			var type = 'date';
			var dir = 'desc';
		}
		else{			
			var col = header.attr('data-sort');
			var type = header.attr('data-sort-type');
			var dir = (header.hasClass('dir-d'))?'asc':'desc';
		}
		//console.log(header);
		//console.log(col);
		//console.log(type);
		//console.log(dir);
		
		
		for(id in listings){			
			var listing = listings[id];		
			var value = getValue(col,listing)
			//console.log(value);
			
			if(!$.defined(value))value = '';			
			if(type == 'num' && typeof value != 'number'){
				value = parseFloat(value.replace(/[^0-9\.\-]/g,''));
				if(isNaN(value))value = 0;
			}			
			sortable.push([id, value]);			
		}
		sortable.sort(function(a, b) {
			if(type == 'date'){
				if(dir == 'asc')
					return new Date(a[1]) - new Date(b[1]);
				else
					return new Date(b[1]) - new Date(a[1]);
			}
			else if(type == 'num'){
				if(dir == 'asc')
					return a[1] - b[1];
				else
					return b[1] - a[1];
			}
			else{
				if(dir == 'asc')
					return a[1].localeCompare(b[1]);
				else
					return b[1].localeCompare(a[1]);
				
			}			
		});
		
		sortedListingsIndex = sortable;

		setTimeout(function(){			
			showCardsPage(0);
		},50);
		
	}
	function filterCards(){		
		var c = container.find(selectors.locContainer);		

		c.loading();		
		listings.map(item => { 
			if(
				(statsHidden.valid == true && item.valid == 1)
				||
				(statsHidden.invalid == true && item.invalid == 1)
				||
				(statsHidden.err == true && item.err == 1)
				||
				(statsHidden.err_valid == true && item.err_valid == 1)
			){
				//items.push(item); 				
				item.visible = 1;
			}
			else{				
				item.visible = 0;
			}			
		})			
		//c.html(html({'items':items}));
		
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
		showCardsPage(0);
	}

	function loadStats(filters){				
		var data = container.find('form').serializeObject();
		data.action = 'calcLocationsStats';	
		data.rules = filters;

		//c.html('loading...');
		//btn.button('loading');
		$.post(script,data,function(json){
			//btn.button('reset');
			if(json.error){ $.error(json.error); }
			else{				
				//var sc = container.find(selectors.statsContainer);
				//var html = Handlebars.compile(container.find(selectors.templates.stats).html());
				//sc.html(html({'total':json.items.length,'speed':0, 'elapsed': 0}));
				//c.html('No filters applied...');
				
				//sortListings('default');
				//filterListings();

				console.log(json);
			}
		},"json");
	}
	function locSize(btn){
		var size = btn.attr('data-size');
		if(size == 'larger'){
			locContainerSize += 1;			
		}
		else{
			locContainerSize -= 1;			
		}
		if(locContainerSize<1)locContainerSize = 1;
		if(locContainerSize>12)locContainerSize = 12;
		fillContainer = 12-locContainerSize;		
		
		for(var i=0; i<=12; i++){
			console.log('col-sm-'+i);
			container.find(selectors.filtersSizeContainer).removeClass('col-sm-'+i);
			container.find(selectors.locSizeContainer).removeClass('col-sm-'+i);
		}
		if(locContainerSize == 12){
			container.find(selectors.filtersSizeContainer).hide();
		}
		else{
			container.find(selectors.filtersSizeContainer).show();
		}
		
		container.find(selectors.filtersSizeContainer).addClass('col-sm-'+fillContainer);
		container.find(selectors.locSizeContainer).addClass('col-sm-'+locContainerSize);
	}
	function search(){				
		var btn = container.find(selectors.locView);
		var c = container.find(selectors.locContainer);

		var data = container.find('form').serializeObject();
		data.action = 'getLocations';	

		startTimer();
		if(searchParams == JSON.stringify(data)){
			filterListings();
			return;
		}
					
		searchParams = JSON.stringify(data);
		listingIds = [];
		listings = [];
		c.html('loading...');
		btn.button('loading');
		$.post(script,data,function(json){
			btn.button('reset');
			if(json.error){ $.error(json.error); }
			else{
				var newListings = [];
				$.each(json.items,function(k,el){					
					listingIds.push(el.id);		
					if(el.new == 1) newListings.push(el.id);		
				});				
				$.each(json.formatted,function(k,el){
					if(newListings.indexOf(el.id)>=0)el.new = 1;
					listings[el.id] = el;
				});
				newListings = [];

				var sc = container.find(selectors.statsContainer);
				var html = Handlebars.compile(container.find(selectors.templates.stats).html());
				sc.html(html({'total':json.items.length,'speed':0, 'elapsed': 0}));
				c.html('No filters applied...');
				
				sortListings('default');
				filterListings();
			}
		},"json");	
	}
 
	
});