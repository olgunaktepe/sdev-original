$(document).ready(function () {
    var script = "ajax/php/deal3.php";
    var selectors = {
        container			: ".page-deal",

		dialBtn				: '.dial-btn-a',
		smsBtn				: '.sms-btn-a',

		gridContainer		: '.grid-stack',
		gridBox				: '.grid-box',

		gmapsStreet			: '.gmaps-street',
		gmapsMap			: '.gmaps-map',
		gmapsMapOaTotal		: '.gmaps-map-oa-total',
		gmapsMapOaBtn		: '.gmaps-map-oa-a',
		gmapsMapOaList		: '.gmaps-map-oa-list',
		gmapsMapOaSummary	: '.gmaps-map-oa-summary',

		gmapsMapPlacesTotal		: '.gmaps-map-places-total',
		gmapsMapPlacesBtn		: '.gmaps-map-places-a',
		gmapsMapPlacesList		: '.gmaps-map-places-list',
		gmapsMapPlacesSummary	: '.gmaps-map-places-summary',

		listingInfo				: '.listing-info-container',
		listingAgents			: '.listing-agents-container',
		listingGallery			: '.listing-gallery',
		listingPoi				: '.listing-poi-container',
		listingPoiForm			: '.listing-poi-form',
		listingPoiSearch		: '.listing-poi-search-a',
		listingPoiCount			: '.listing-poi-count-label',

		listingLeaseinfo		: '.listing-leaseinfo-container',
		listingLeaseinfoCount	: '.listing-leaseinfo-count-label',
		
		cacheLabel				: '.cache-label',
		cacheRefresh			: '.cache-refresh-a',

		zillow1				: '.zillow-1-container',
		zillow2				: '.zillow-2-container',				

		census1				: '.census-1-container',
		census2				: '.census-2-container',
		
		walkscore			: '.walkscore-container',

		greatschools			: '.greatschools-container',

		markets					: '.markets-container',		
		marketsSelect			: '.markets-select',
		marketsDataContainer	: '.market-data-container',

		submarkets				: '.submarkets-container',
		submarketsSelect		: '.submarkets-select',
		submarketsDataContainer	: '.submarket-data-container',

		summary				: '.summary-container',
		flags				: '.listing-flags-container',

		timeline			: '.timeline-container',
		flagBtn				: '.flag-a',

		listingUpdates				: '.listing-updates-a',
		listingUpdatesSearch		: '.listing-updates-search-a',
        listingUpdatesContainer	: '.listing-updates-container',
        listingUpdatesForm			: '.listing-updates-form',
				

		contactsContainer	: '.contacts-container',
		contactsContractorSearch: '.contacts-contractors-find-a',
		contactsAdd			: '.contacts-create-a',
		contactsAddLookup	: '.contacts-create-lookup-a',
		contactsEdit		: '.contacts-edit-a',
		
		phonesContainer		: '.phones-container',
		phonesSettings		: '.phones-settings-a',


		logContainer		: '.log-container',
		logChart			: '.log-chart',		
		logRefresh			: '.log-refresh-a',
		logMode				: '.log-mode-a',

		foldersTree			: '.folders-tree',
		foldersDropzoneUploader		: '.folders-dropzone-uploader',
		foldersDropzone				: '.folders-fileupload-dropzone',
		foldersDropzoneTrigger		: '.folders-fileupload-dropzone-trigger',	
		foldersDropzonePreview		: '.folders-dropzone-preview-container',
		foldersSearch				: '.folder-search',


		updatesContainer			: '.updates-container',
		updatesAdd					: '.updates-add',
		updatesDropzoneUploader		: '.updates-dropzone-uploader',
		updatesDropzone				: '.updates-fileupload-dropzone',
		updatesDropzoneTrigger		: '.updates-fileupload-dropzone-trigger',	
		updatesDropzonePreview		: '.updates-dropzone-preview-container',
		updatesCreate				: '.updates-create-a',
		updatesSearchForm			: '.updates-search-form',
		updatesSearch				: '.updates-search-a',

		mainStatus					: '.deal-main-status',
		mainStatusEdit				: '.main-status-edit',

		todoContainer				: '.todo-container',
		todoItem					: '.todo-item',
		todoAdd						: '.todo-add',
		todoEdit					: '.todo-edit-a',
		todoUpdate					: '.todo-update-a',
		todoShowAll					: '.todo-show-closed-a',
		todoRemove					: '.todo-remove-a',

		versionsContainer			: '.versions-container',
		versionsAdd					: '.versions-add-a',
		versionsInherit				: '.version-inherit-a',	
		versionsView				: '.versions-view-a',	
		versionsEdit				: '.versions-edit-a',	
		versionsRemove				: '.versions-remove-a',
	
        templates: {                    	
        	graphSummary	: '#template-graph-summary',	
			gmapsMapOaList	: '#template-gmaps-map-oa-list',	
			gmapsMapOaSummary	: '#template-gmaps-map-oa-summary',	
			gmapsMapPlacesList	: '#template-gmaps-map-places-list',	
			gmapsMapPlacesSummary	: '#template-gmaps-map-places-summary',	
			listingInfo		: '#template-listing-info',
			listingAgents		: '#template-listing-agents',
			listingGallery		: '#template-listing-gallery',
			listingPoi			: '#template-listing-poi',
			listingLeaseinfo	: '#template-listing-leaseinfo',

			greatschools			: '#template-greatschools',
			walkscore			: '#template-walkscore',
			markets				: '#template-markets',
			submarkets			: '#template-submarkets',

			summary				: '#template-summary',
			flags				: '#template-listing-flags',

			timeline			: '#template-timeline',

			contacts			: '#template-contacts',
			contactsAdd			: 'ajax/template/deal3/_contacts_create.phtml',
			contactsContractorSearch: 'ajax/template/deal3/_contractors_find.phtml',  
			
			phones				: '#template-phones',	
			phonesSettings		: 'ajax/template/deal3/_phones_settings.phtml',  	

			updatesAdd			: 'ajax/template/deal3/_updates_add.phtml',  
			updatesUploaderPreviewItem:  '#template-updates-uploader-preview-item',
			updatesItem			:  '#template-updates-item',

			foldersUpload		: 'ajax/template/deal3/_folders_upload.phtml',  

			mainStatus			: 'ajax/template/deal3/_status_edit.phtml', 
			
			todoAdd				: 'ajax/template/deal3/_todo_add.phtml',  			
			todoItem			:  '#template-todo-item',

			versionsItem		: '#template-versions-item',
			versionsAdd			: 'ajax/template/deal3/_versions_add.phtml',  
			
			listingUpdates				: 'ajax/template/deal3/_listing_updates.phtml',
			listingUpdatesItem			: '#template-listing-updates-item',


        	//details			: 'ajax/template/listings/_details.phtml',        	
        },
	}    
    var container = $(selectors.container);    
    var modal;
	var state = {};	
	state.listingId = container.attr('data-listing-id');	

    init();
    bind();

    function init() {    			
    	loadListing();
		if(container.find(selectors.gridContainer).length>0)initGrid();
		fixNavs();		
    }
    function bind() {		
		container.on('click', selectors.cacheRefresh, function(e){ e.preventDefault(); cacheRefresh($(this)); });	

		container.on('click', selectors.logMode, function(e){ e.preventDefault(); logMode($(this)); });	
		container.on('click', selectors.gmapsMapOaBtn, function(e){ e.preventDefault(); loadMapAddresses($(this)); });	
		container.on('click', selectors.gmapsMapPlacesBtn, function(e){ e.preventDefault(); loadMapPlaces($(this)); });	
		container.on('click', selectors.flagBtn,function(e){e.preventDefault(); flagBtn($(this)); })

		container.on('click', selectors.contactsContractorSearch, function(e){ e.preventDefault(); contactsContractorSearch($(this)); });	
		container.on('click', selectors.contactsAdd, function(e){ e.preventDefault(); contactsAdd($(this)); });
		container.on('click', selectors.contactsAddLookup, function(e){ e.preventDefault(); contactsAddLookup($(this)); });
		container.on('click', selectors.contactsEdit, function(e){ e.preventDefault(); contactsEdit($(this)); });

		container.on('click', selectors.dialBtn, function(e){ e.preventDefault(); dialBtn($(this)); });	
		container.on('click', selectors.smsBtn, function(e){ e.preventDefault(); smsBtn($(this)); });	

		container.on('click', selectors.updatesAdd, function(e){ e.preventDefault(); updatesAdd(0); });	
		container.on('click', selectors.updatesSearch, function(e){ e.preventDefault(); initUpdates(); });	

		container.on('click', selectors.todoAdd, function(e){ e.preventDefault(); todoAdd($(this)); });	
		container.on('click', selectors.todoEdit, function(e){ e.preventDefault(); todoEdit($(this)); });	
		container.on('click', selectors.todoUpdate, function(e){ e.preventDefault(); todoUpdate($(this)); });			
		container.on('click', selectors.todoShowAll, function(e){ e.preventDefault(); todoShowAll($(this)); });			
		container.on('click', selectors.todoRemove, function(e){ e.preventDefault(); todoRemove($(this)); });	
		
		container.on('click',selectors.listingUpdates,function(e){ e.preventDefault(); listingUpdates($(this)); });
		container.on('click',selectors.listingUpdatesSearch,function(e){ e.preventDefault(); listingUpdatesSearch(); });

		container.on('click', selectors.phonesSettings, function(e){ e.preventDefault(); phonesSettings($(this)); });

		container.on('click', selectors.mainStatusEdit, function(e){ e.preventDefault(); mainStatusEdit($(this)); });

		container.on('click', selectors.versionsAdd, function(e){ e.preventDefault(); versionsAdd($(this)); });
		container.on('click', selectors.versionsInherit, function(e){ e.preventDefault(); e.stopPropagation(); versionsInherit($(this)); });
		container.on('click', selectors.versionsView, function(e){ e.preventDefault(); versionsView($(this)); });
		container.on('click', selectors.versionsEdit, function(e){ e.preventDefault(); versionsEdit($(this)); });
		container.on('click', selectors.versionsRemove, function(e){ e.preventDefault(); versionsRemove($(this)); });	
		
		container.on('click', selectors.listingPoiSearch, function(e){ e.preventDefault(); loadPoi($(this)); });	

		container.on('change', selectors.marketsSelect, function(e){ e.preventDefault(); initMarketsData($(this)); });	
		container.on('change', selectors.submarketsSelect, function(e){ e.preventDefault(); initSubmarketsData($(this)); });	
    }		
	function fixNavs(){
		$('.main-nav-item').click(function(){
			$('.main-tab-pane').hide();			
			$('.main-tab-content #'+$(this).find('a').attr('href').replace('#','')).show();
		});
	}
	function initGrid(){
		let grid = GridStack.init({
			cellHeight: 70,
			acceptWidgets: true,			
			dragIn: '.newWidget',  // class that can be dragged from outside
			dragInOptions: { revert: 'invalid', scroll: false, appendTo: 'body', helper: 'clone' }, // clone or can be your function
			removable: '#trash', // drag-out delete class
		  });
		  var items = [];

		  var col = 0;
		  var row = 0;
		  $.each(container.find(selectors.gridBox),function(k){
			  var el = $(this);
			  var html = $("<div />").append(el.clone()).html();	
			  el.remove();		  			  			  
			  items.push({x: col, y: row, w: 4, h: 2, content: html});
			  col+=4;
			  if(col%3 == 0){ col=0; row++; }
		  });		  
		  grid.load(items);
		  state.grid = grid;
		  resizeGrid();
		  
		  grid.on('added removed change', function(e, items) {
			let str = '';
			items.forEach(function(item) { str += ' (x,y)=' + item.x + ',' + item.y; });
			console.log(e.type + ' ' + items.length + ' items:' + str );
			initView();
		  });
		  //window.addEventListener('resize', function() {resizeGrid()});		  
		  //grid.column(4, 'moveScale');
	}
	function resizeGrid() {
		let layout = 'moveScale';
		let width = document.body.clientWidth;
		if (width < 700) {
		  state.grid.column(1, layout).cellHeight('100vw');		  
		} else if (width < 850) {
			state.grid.column(3, layout).cellHeight('33.3333vw');		  
		} else if (width < 950) {
			state.grid.column(6, layout).cellHeight('16.6666vw');		  
		} else if (width < 1100) {
			state.grid.column(8, layout).cellHeight('12.25vw');		  
		} else {
			state.grid.column(12, layout).cellHeight('8.3333vw');		  
		}
	};

	function listingUpdatesSearch(){
    	var params = {};    	
    	params.pageLength = 10;
    	
        var itemTemplate = container.find(selectors.templates.listingUpdatesItem).html();
        var c = container.find(selectors.listingUpdatesContainer);
        var form = container.find(selectors.listingUpdatesForm);  
        
        ajaxDataTableInit(c,form,itemTemplate,script,params);
    }
    function listingUpdates(btn){
    	var id = btn.attr('data-id');

    	modal = new Modal({
			parent: container,
			size: '80%',
			static: true,			
			title: 'View Update',
			template: selectors.templates.listingUpdates,	
			templateData: {id: id},
			callback: function(){ listingUpdatesSearch(); },
			buttons: new Array($('<button>').addClass('btn btn-default dialog-close').text('Done'))
		});    	    
    }

	function dialBtn(btn){
		var number = btn.attr('data-number');
		var listingId = container.attr('data-listing-id');

		$(window).trigger('dialer.dial',{number: number, listingId: listingId});
	}
	function smsBtn(btn){
		var number = btn.attr('data-number');
		var listingId = container.attr('data-listing-id');

		$(window).trigger('dialer.sms',{number: number, listingId: listingId});
	}

	function cacheRefresh(btn){
		var id = state.listingId;
		
		btn.button('loading');
		$.post(script,{action: 'refreshCache', id: id},function(json){						
			if(json.error){ $.error(json.error); btn.button('reset'); }
			else{
				location.reload();
			}
		},"json");
	}

	function flagBtn(btn){
		var type = btn.attr('data-type');
		var id = state.listingId;
		
		$.post(script,{action: 'flag', id: id, flag: type},function(json){			
			if(json.error){ $.error(json.error); }
			else{
				state.deal.listing.flags = json.flags;
				
				var c = container.find(selectors.flags);			
				var html = Handlebars.compile(container.find(selectors.templates.flags).html());					
				c.html(html(state.deal.listing.flags));	
			}
		},"json");
	}
	function loadListing(){
		container.loading(true);
		$.post(script,{action: 'loadListing', id: state.listingId},function(json){
			container.loading(false);
			if(json.error)container.html(json.error);
			else{
				state.deal = json;
				initView();
			}
		},"json");
	}
	function initView(){
		initListingInfo();
		initAgents();
		initGallery();
		initStreetView(state.deal.listing.lat,state.deal.listing.lng);
		initMapView(state.deal.listing.lat,state.deal.listing.lng);
		initZillowData();
		initCensusData();
		initTimeline();
		initWalkscore();
		initGreatschools();
		initmarkets();
		initSummary();
		initContacts();		
		initPhones();
		initUpdates();
		initFolders();
		initMainStatus();
		initTodo();
		initVersions();
		loadPoi();
		loadLeaseinfo();
	}	
	function initSummary(deal){		
		var c = container.find(selectors.summary);					
		if(!$.defined(deal)){deal = state.deal;}		
		
		var html = Handlebars.compile(container.find(selectors.templates.summary).html());					
		c.html(html(deal));		
	}
	function logMode(btn){
		var c = btn.closest(selectors.logContainer);
		c.find(selectors.logMode).removeClass('active');		
		btn.addClass('active');
		initZillowData();
		initCensusData();
	}

	function initWalkscore(){	
		var c = container.find(selectors.walkscore);			
		var html = Handlebars.compile(container.find(selectors.templates.walkscore).html());					
		c.html(html(state.deal.walkscore));		
	}
	function initGreatschools(){	
		var c = container.find(selectors.greatschools);			
		var html = Handlebars.compile(container.find(selectors.templates.greatschools).html());					
		c.html(html(state.deal.greatschools));		
	}
	function initmarkets(){
		var c = container.find(selectors.markets);				
		var html = Handlebars.compile(container.find(selectors.templates.markets).html());					
		c.html(html(state.deal.markets));
		
		var c = container.find(selectors.submarkets);				
		var html = Handlebars.compile(container.find(selectors.templates.submarkets).html());					
		c.html(html(state.deal.submarkets));

		initMarketsData();
	}
	function initMarketsData(){
		var sId = container.find(selectors.marketsSelect).val();
		var els = container.find(selectors.marketsDataContainer)
		els.hide();
		els.filter(function(k,el){ return $(el).attr('data-id')==sId; }).show();



		var sId = container.find(selectors.submarketsSelect).val();
		var els = container.find(selectors.submarketsDataContainer)
		els.hide();
		els.filter(function(k,el){ return $(el).attr('data-id')==sId; }).show();
	}

	//Versions
	function versionsRemove(btn){
		var id = btn.attr('data-id');

		if(!confirm("Are you sure you want to delete this version?"))return false;

		modal.block();					
		btn.button('loading');
		$.post(script,{action: 'removeVersion',id: id},function(json){
			btn.button('reset');
			modal.release();
			if(json.error){ $.error(json.error); }
			else{				
				modal.close();
				initVersions();							
			}
		},"json");

	}
	function versionsView(btn){
		var id = btn.attr('data-id');
		var localId = btn.attr('data-local-id');
		if(localId){
			$.post(script,{action: 'setDefaultVersion',id: localId, listing_id:state.listingId},function(json){},"json");
		}
		versionsActivate(id);
	}
	function versionsActivate(id){
		var activeSource = '';
		var activeVersion = false;
		for(x in state.versions){
			var items = state.versions[x];			
			var version = items.filter(function(el){ return el.id==id; })					
			if(version.length>0){	
				activeSource = x;					
				activeVersion = version[0];								
			}
			//if(activeVersion){ break; }
		}
		if(!activeVersion){ $.error('Unable to find the selected version'); return; }
		
		state.curVersionDeal = activeVersion.item;
		state.curVersionSource = activeSource;

		console.log(state.curVersionDeal);
		
		//state.deal = state.curVersionDeal;		
		initListingInfo(state.curVersionDeal);
		initSummary(state.curVersionDeal);	
		renderVersions(state.versions);	
	}	
	function versionsInherit(obj){
		var input = obj.parent().find('input.form-control');
		var checkbox = obj.find('input[type="checkbox"]');		
				
		if(checkbox.is(':checked')){
			console.log('remove check');	
			checkbox.prop('checked',false);		
			input.prop('disabled',false);
			input.prop('readonly',false);
			input.attr('name',input.attr('data-key'));
			input.focus();			
		}
		else{			
			checkbox.prop('checked',true);		
			input.prop('disabled',true);
			input.prop('readonly',true);
			input.attr('name','');
			input.val(input.attr('data-value'));						
		}
	}
	function versionsEdit(btn){
		var id = btn.attr('data-id');		
		var type = btn.closest(selectors.versionsContainer).attr('data-type');
		verionUpdate(type,id);
	}
	function versionsAdd(btn){		
		var type = btn.closest(selectors.versionsContainer).attr('data-type');
		verionUpdate(type,0);
	}
	function verionUpdate(type,id){
		modal = new Modal({
			parent: container,
			size: '70%',
			static: true,			
			title: (id>0)?'Edit version':'Create a new version',
			template: selectors.templates.versionsAdd,	
			templateData: { lId: state.listingId, type: type, id: id },
			callback: function(){},
			buttons: new Array(
				$('<button>').addClass('btn btn-primary').text((id>0)?'Update version':'Create Version').click(function(e){
					var btn = $(this);
					var form = modal.modal.find('form');																						
					if (!form[0].reportValidity())return false;															
															
					modal.block();					
					btn.button('loading');
					$.post(script,form.serialize(),function(json){
						btn.button('reset');
						modal.release();
						if(json.error){ $.error(json.error); }
						else{				
							modal.close();
							initVersions();							
						}
					},"json");

				}),
			
				$('<button>').addClass('btn btn-default dialog-close').text('Done'))
		});
	}
	function initVersions(){		
		var c = container.find(selectors.versionsContainer);

		state.version = [];
		c.loading(true);
		$.post(script,{action: 'getDealVersions', id: state.deal.listing.id, lat: state.deal.listing.lat, lng: state.deal.listing.lng},function(json){						
			c.loading(false);
			if(json.error)c.html(json.error);
			else{		
				state.versions = json;														
				renderVersions(json);

				var activeVersion = 'default';
				var defaultVersion = [];
				for(x in json){
					defaultVersion = json[x].filter(function(el){ return el.default==1; })
				}
				
				if(defaultVersion.length>0){
					activeVersion = defaultVersion[0].id;
				}				
				console.log("Active Version: "+activeVersion);
				versionsActivate(activeVersion);
			}
		},"json");		
	}
	function renderVersions(data){
		var count = 0;
		for(x in data){			
			count += data[x].length;
		}
		var c = container.find(selectors.versionsContainer);
		var html = Handlebars.compile(container.find(selectors.templates.versionsItem).html());
		c.html(html({'items':data,'activeSource':state.curVersionSource, 'count': count}));					
	}

	//Timeline
	function initTimeline(){	
		var c = container.find(selectors.timeline);		

		c.loading(true);
		$.post(script,{action: 'loadTimeline', id: state.deal.listing.id, lat: state.deal.listing.lat, lng: state.deal.listing.lng},function(json){			
			c.loading();
			if(json.error)container.html(json.error);
			else{								
				var html = Handlebars.compile(container.find(selectors.templates.timeline).html());					
				c.html(html(json));	
			}
		},"json");
	}
	function initListingInfo(deal){
		var c = container.find(selectors.listingInfo);		
		if(!$.defined(deal))deal = state.deal;		
			
		var html = Handlebars.compile(container.find(selectors.templates.listingInfo).html());
		c.html(html(deal.standerized));

		container.find(selectors.cacheLabel).text(state.deal.listing.last_deal_cache_ago);
	}

	function initAgents(){
		c = container.find(selectors.listingAgents);
		html = Handlebars.compile(container.find(selectors.templates.listingAgents).html());
		c.html(html(state.deal.standerized));
	}

	function loadLeaseinfo(){
		var c = container.find(selectors.listingLeaseinfo);						
		console.log(state.deal.leaseinfo);
			
		var html = Handlebars.compile(container.find(selectors.templates.listingLeaseinfo).html());
		c.html(html(state.deal.leaseinfo));
	}
	function loadPoi(){
		var c = container.find(selectors.listingPoi);
		var form = container.find(selectors.listingPoiForm);
		var btn = container.find(selectors.listingPoiSearch);
		var label = container.find(selectors.listingPoiCount);

		//Clear markers	
		if(state.poiMarkers){
			for (var i = 0; i < state.poiMarkers.length; i++) {			
				state.poiMarkers[i].setMap(null);
			}		
		}
		state.poiMarkers = [];			
							
		btn.button('loading');
		$.post(script,form.serialize(),function(json){
			btn.button('reset');
			if(json.error){
				c.html('Error: '+json.error);
			}
			else{
				state.poiMarkers = [];
				$.each(json.items,function(k,el){
					var marker = createPoiMarker(el);
					state.poiMarkers.push(marker);
				});

				html = Handlebars.compile(container.find(selectors.templates.listingPoi).html());
				c.html(html(json));
				label.text(json.items.length);
			}
		},"json");		
	}
	function createPoiMarker(el) {  		
		const svgMarker = {
			path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
			fillColor: "#f01515",
			fillOpacity: 0.6,
			strokeWeight: 0,
			rotation: 0,
			scale: 2,
			anchor: new google.maps.Point(15, 30),
		  }; 		 				 
		var marker = new google.maps.Marker({
		   map: state.map,
		   icon: svgMarker,
		   title: el.address+' | '+el.title+' | '+el.type+' | '+el.subtype+' - '+el.distance+' miles',
		   position: { lat: parseFloat(el.lat), lng: parseFloat(el.lng) }
		 });
		 return marker;		 
	}
	function initGallery(){
		var c = container.find(selectors.flags);			
		var html = Handlebars.compile(container.find(selectors.templates.flags).html());					
		c.html(html(state.deal.listing.flags));		

		c = container.find(selectors.listingGallery);

		console.log(c);

		html = Handlebars.compile(container.find(selectors.templates.listingGallery).html());
		c.html(html(state.deal.listing));		
	}

	//Status/Data
	function initMainStatus(){
		var c = container.find(selectors.mainStatus);
		c.text(state.deal.status);
	}
	function mainStatusEdit(){		
		modal = new Modal({
			parent: container,
			size: '70%',
			static: true,			
			title: 'Update Deal Status',
			template: selectors.templates.mainStatus,	
			templateData: { id: state.listingId},
			callback: function(){},
			buttons: new Array(
				$('<button>').addClass('btn btn-primary').text('Update Status').click(function(e){
					var btn = $(this);
					var form = modal.modal.find('form');																						
					if (!form[0].reportValidity())return false;															
															
					modal.block();					
					btn.button('loading');
					$.post(script,form.serialize(),function(json){
						btn.button('reset');
						modal.release();
						if(json.error){ $.error(json.error); }
						else{				
							modal.close();
							container.find(selectors.mainStatus).text(json.status);
						}
					},"json");

				}),
				$('<button>').addClass('btn btn-default dialog-close').text('Done'))
		});
	}

	//Folders
	function removeFile(obj){
		var c = container.find(selectors.foldersTree);

		c.loading(true);
		$.post(script,{action: 'removeFile', id: obj.id},function(json){
			c.loading(false);
			if(json.error)$.error(json.error);
			else{	
				refreshFolders();														
			}
		},"json");
	}	
	function refreshFolders(){
		var c = container.find(selectors.foldersTree);		
		$.post(script,{action: 'getFolders', id: state.listingId},function(json){
			if(json.error){ $.error(json.error); }
			else{	
				c.jstree(true).settings.core.data = json;
				c.jstree(true).refresh();
			}
		},"json");
	}
	function initFolders(){
		state.folders = [];
		var c = container.find(selectors.foldersTree);		
		$.post(script,{action: 'getFolders', id: state.listingId},function(json){
			if(json.error){ $.error(json.error); }
			else{		
				
				var menuItems = $.jstree.defaults.contextmenu.items();
				menuItems['view'] = {
					"separator_before"	: false,
					"icon"				: false,
					"separator_after"	: false,
					"_disabled"			: false, //(this.check("delete_node", data.reference, this.get_parent(data.reference), "")),
					"label"				: "View",
					"action"			: function (data) {
						var inst = $.jstree.reference(data.reference),
						obj = inst.get_node(data.reference);	
						var url = obj.a_attr.href;
						if($.defined(url) && url.length>0){
							window.open(url, '_blank');
						}
						
					}
				};
				menuItems['upload'] = {
					"separator_before"	: false,
					"icon"				: false,
					"separator_after"	: false,
					"_disabled"			: false, //(this.check("delete_node", data.reference, this.get_parent(data.reference), "")),
					"label"				: "Upload Files",
					"action"			: function (data) {
						var inst = $.jstree.reference(data.reference),
						obj = inst.get_node(data.reference);	
						var folder = obj.id;
						if(obj.type == 'file')folder = obj.parent;
						foldersUpload(folder);
						
					}
				};
				
				var defaultRemoveAction = menuItems['remove']['action'];
				menuItems['remove']['action'] = function (data) {
					var inst = $.jstree.reference(data.reference),
					obj = inst.get_node(data.reference);
					if(obj.children.length>0){ $.error("Unable to delete folder!");  return; }
					
					if(obj.type == 'file'){
						if(!confirm("Are you sure you want to delete this file?"))return false;
						removeFile(obj);
					}
					else{
						if(!confirm("Are you sure you want to delete this folder?"))return false;
						defaultRemoveAction(data);
					}					
				};

				state.folders = json;		
				c.jstree({
					'core' : {
						'check_callback' : true,
						'themes' : {
							'responsive': false
						},
						'data' : json
					},
					'types' : {
						'default' : {
							'icon' : 'fa fa-folder'
						},
						'file' : {
							'icon' : 'fa fa-file'
						}
					},
					/*
					'conditionalselect' : function (node, event) {
						var res = state.folders.filter(function(el){ return el.id == node.id });
						if(res.length>0){
							var url = res[0].url;
							if($.defined(url) && url.length>0){								
								window.open(url, '_blank');
								return true;
							}
						}
						return true;
					},
					*/			
					'plugins' : ['types', 'dnd', 'contextmenu', 'changed', 'search', 'unique'],		
					'contextmenu': {
						'items': menuItems
					}			
					
				});

				var to = false;
				container.find(selectors.foldersSearch).keyup(function () {
					if(to) { clearTimeout(to); }
					var v = $(this).val();
					to = setTimeout(function () {c.jstree(true).search(v);}, 250);
				});

				c.on('changed.jstree', function (e, data) {
					var v = c.jstree(true).get_json('#', {flat:true})
					updateFolders(v);
				});
				c.on('paste.jstree', function (e, data) {
					var v = c.jstree(true).get_json('#', {flat:true})
					updateFolders(v);
				});
				c.on('rename_node.jstree', function (e, data) {
					var v = c.jstree(true).get_json('#', {flat:true})
					updateFolders(v);
				});								
			}
		},"json");		
	}
	function updateFolders(data){		
		$.post(script,{action: 'updateFolders', id: state.listingId, data: data}, function(json){
			if(json.error){ $.error("Unexpected Error"); }
			else{}
		},"json");
	}
	function foldersUpload(folder){
		modal = new Modal({
			parent: container,
			//size: '80%',
			static: true,			
			title: 'Upload Files',
			template: selectors.templates.foldersUpload,	
			templateData: { folder: folder, id: state.listingId},
			callback: function(){ initFoldersDropzone(); },
			buttons: new Array(
				$('<button>').addClass('btn btn-primary').text('Add Files').click(function(e){
					var btn = $(this);
					var form = modal.modal.find('form');																						
					if (!form[0].reportValidity())return false;	
									
					var data = new FormData(form[0]);  					
					for(x in modal.files)data.append('file_'+x,modal.files[x]);
															
					modal.block();					
					btn.loading(true);					
					$.ajax({
						type: 'POST',
						url: script,
						data: data,
						dataType: 'json',
						contentType: false,
						cache: false,
						processData:false,
						beforeSend: function(){
							
						},
						success: function(json){
							modal.release();
							modal.modal.loading(false);										
							btn.loading(false);	

							if(json.error){ $.error(json.error); }														
							else{								
								modal.close();
								refreshFolders();
							}			

						}
					});										
				}),
				$('<button>').addClass('btn btn-default dialog-close').text('Done'))
		});
	}
	function initFoldersDropzone(){ 		
		var c = container.find(selectors.foldersDropzoneUploader);
		var upload = c.find(selectors.foldersDropzone);	
		var trigger = container.find(selectors.foldersDropzoneTrigger);
		var preview = container.find(selectors.foldersDropzonePreview);	


		initDropzone(upload,trigger,preview,function(files){ modal.files = files; });
	}

	//Todo
	function todoRemove(btn){
		if(!confirm("Are you sure you want to remove this task?")) return false;

		var id = btn.attr('data-id');
		$.post(script,{action: 'removeTodoTask', id: id},function(json){			
			if(json.error)container.html(json.error);
			else{			
				modal.close();									
				initTodo();
			}
		},"json");
	}
	function todoShowAll(){
		container.find(selectors.todoItem).removeClass('hidden');
	}
	function initTodo(){		
		var c = container.find(selectors.todoContainer)

		c.loading(true);
		$.post(script,{action: 'loadTodoTasks', id: state.listingId},function(json){
			c.loading(false);
			if(json.error)container.html(json.error);
			else{												
				var html = Handlebars.compile(container.find(selectors.templates.todoItem).html());				
				c.html(html({items: json.data}));
			}
		},"json");
	}
	function todoEdit(btn){
		var id = btn.closest(selectors.todoItem).attr('data-id');
		todoModal(id);
	}
	function todoUpdate(btn){
		var id = btn.closest(selectors.todoItem).attr('data-id');	
		updatesAdd(id);	
	}
	function todoAdd(){
		todoModal(0);
	}
	function todoModal(id){
		modal = new Modal({
			parent: container,
			//size: '80%',
			static: true,			
			title: (id>0)?'Edit Task':'Create Task',
			template: selectors.templates.todoAdd,	
			templateData: { lId: state.listingId, id: id },
			callback: function(){ },
			buttons: new Array(
				$('<button>').addClass('btn btn-primary').text((id>0)?'Edit Task':'Create Task').click(function(e){
					var btn = $(this);
					var form = modal.modal.find('form');																						
					if (!form[0].reportValidity())return false;										
															
					modal.block();					
					btn.loading(true);					
					$.post(script,form.serialize(),function(json){
						modal.release();
						btn.loading(false);
						if(json.error){ $.error(json.error); }
						else{												
							modal.close();
							initTodo();
						}
					},"json");
														
				}),
				$('<button>').addClass('btn btn-default dialog-close').text('Done'))
		});
	}

	//Updates
	function initUpdates(){
		loadUpdatesPage(0);
	}
	function loadUpdatesPage(page){			
		var c = container.find(selectors.updatesContainer);
		var form = container.find(selectors.updatesSearchForm);

		var data = form.serializeObject();
		data.id = state.listingId;
		data.page = page;
		if(page == 0)c.html('');

		c.loading(true);
		$.post(script,data,function(json){
			c.loading(false);
			if(json.error)container.html(json.error);
			else{												
				var html = Handlebars.compile(container.find(selectors.templates.updatesItem).html());				
				c.append(html({items: json.data}));
			}
		},"json");
	}
	function updatesAdd(todoId){
		modal = new Modal({
			parent: container,
			//size: '80%',
			static: true,			
			title: 'Add Update',
			template: selectors.templates.updatesAdd,	
			templateData: { id: state.listingId, todoId: todoId},
			callback: function(){ initUpdatesDropzone(); },
			buttons: new Array(
				$('<button>').addClass('btn btn-primary').text('Add Update').click(function(e){
					var btn = $(this);
					var form = modal.modal.find('form');																						
					if (!form[0].reportValidity())return false;	
									
					var data = new FormData(form[0]);  					
					data.delete('logo');
					data.delete('image');
					for(x in modal.files)data.append('file_'+x,modal.files[x]);
															
					modal.block();					
					btn.loading(true);					
					$.ajax({
						type: 'POST',
						url: script,
						data: data,
						dataType: 'json',
						contentType: false,
						cache: false,
						processData:false,
						beforeSend: function(){
							
						},
						success: function(json){
							modal.release();
							modal.modal.loading(false);										
							btn.loading(false);	

							if(json.error){ $.error(json.error); }														
							else{								
								modal.close();
								loadUpdatesPage(0);
							}			

						}
					});										
				}),
				$('<button>').addClass('btn btn-default dialog-close').text('Done'))
		});
	}
	function initUpdatesDropzone(){ 		
		var c = container.find(selectors.updatesDropzoneUploader);
		var upload = c.find(selectors.updatesDropzone);	
		var trigger = container.find(selectors.updatesDropzoneTrigger);
		var preview = container.find(selectors.updatesDropzonePreview);		
		initDropzone(upload,trigger,preview,function(files){ modal.files = files; console.log(files); });
	}
	function initDropzone(upload,trigger,preview,callback){
		trigger.on("click",function(e){e.preventDefault(); e.stopPropagation(); upload.find("input[type='file']").trigger('click'); });

		modal.files = [];      
        upload.fileupload({
            url: script+'?action=na',                        
            maxNumberOfFiles: 10,
            autoUpload: false,
            dataType: 'json',            
            singleFileUploads: false,
            done: function (e, data) {
                //console.log(data);
            },
            add: function (e, data) {                 
                var error_uploads_indexes = [];
				$.each(data.files, function(index, file) {
					var maxFileSize = 10000000;
					var acceptFileTypes = /(\.|\/)(gif|jpe?g|png|pdf|ms-excel)$/i;
					var uploadErrors = [];   
										
					if(!acceptFileTypes.test(data.originalFiles[index]['type'])) {
						uploadErrors.push('File type not accepted');
					}                
					if (data.originalFiles[index]['size'] > maxFileSize) {
						uploadErrors.push('Filesize too big');
					}     

					if(uploadErrors.length > 0) {
						error_uploads_indexes.push(index);
						$.error(uploadErrors.join("\n"));
					} else {
						//console.log(data.files);
						//c.loading(true);
						//container.find(selectors.productImagePreview).attr('src',URL.createObjectURL(data.files[0]));
						//data.submit();
					}
				});
				// remove indexes (files) with error
				data.files = $.grep( data.files, function( n, i ) {
					return $.inArray(i, error_uploads_indexes) ==-1;
				});

				modal.files = data.files;				
				$.each(data.files, function (index, file) {   					
					var html = Handlebars.compile(container.find(selectors.templates.updatesUploaderPreviewItem).html());
					var type = data.originalFiles[index]['type'];
					var url = URL.createObjectURL(data.files[index]);

					if(type.indexOf('excel')>0){type='excel'; url = '/images/icons/file_excel.jpg';}
					if(type.indexOf('pdf')>0){type='pdf'; url = '/images/icons/file_pdf.jpg';}
				
					var elData = {'name': data.files[index].name, 'url': url, 'type': type};					
					var el = $(html(elData));
					el.one('click', { filename: file.name, files: data.files }, function(event){ event.data.files.splice(0, 1); el.remove(); });
					preview.append(el);
				});	
				
				if(callback){
					callback(data.files);
				}				
            },
            processalways: function (e, data) {                
            },
            progressall: function (e, data) {            
            },
            done: function (e, data) {                
            },
            always: function (e, data) {                            
            }
        }); 
    }	

	//Census
	function initCensusData(){	
		if(state.deal.census.income)initGraphSummary(state.deal.census.income,container.find(selectors.census1));	
		if(state.deal.census.population)initGraphSummary(state.deal.census.population,container.find(selectors.census2));	
	}	
	
	function initZillowData(){	
		if(state.deal.zillow.zhvi)initGraphSummary(state.deal.zillow.zhvi,container.find(selectors.zillow1));	
		if(state.deal.zillow.zori)initGraphSummary(state.deal.zillow.zori,container.find(selectors.zillow2));	
	}	
	function initGraphSummary(data,c){		
		var res = {};		
		var key = c.find(selectors.logMode+'.active').attr('data-mode');		
		if(!key)key='zip';	
		
		if(!data.data[key]){
			c.html('Error: '+data.title);
			return false;
		}

		res.morris_labels = new Array();
		res.morris_data = new Array();
		res.morris_colors = new Array();

		res.morris_labels.push('Value');
		res.morris_colors.push('#80deea');
		$.each(data.data[key].data,function(k,v){
			if(v)res.morris_data.push({'x':k, 'Value': v})
		})
		
		var summary = {};		
		summary.types = Object.keys(data.data);
		summary.title = data.title;
		summary.trends = data.data[key].trends;
		summary.loc = data.data[key].type+": "+data.data[key].title;

		var html = Handlebars.compile(container.find(selectors.templates.graphSummary).html());
		c.html(html(summary));						
		c.find(selectors.logMode+'[data-mode="'+key+'"]').addClass('active');		
		initMorrisLineChart(res,c);		
	}	
    function initMorrisLineChart(data,c){
    	var chart = c.find(selectors.logChart);   				  	    			
		var uid = generateUUID();

    	var options = {
				element: uid,
				data: data.morris_data,
    			xkey: 'x',
    			ykeys: data.morris_labels,     			
    			fillOpacity: ['0.1'],
    			labels: data.morris_labels,    			    		
    			behaveLikeLine: true,
    			//gridLineColor: '#eef0f2',
    			hideHover: 'auto',
    			//dataLabels: false,    			
    			resize: true, //defaulted to true

				pointSize: 3,
                lineWidth: 1,                                
                hideHover: 'auto',
                pointFillColors: data.morris_colors,
                pointStrokeColors: data.morris_colors,
                gridLineColor: '#eef0f2',
                lineColors: data.morris_colors,
    	};    	    	    	    	
    	    		
		chart.attr('id',uid).empty();    	
    	Morris.Line(options);    		    
    }


	function initStreetView(lat,lng){			
		state.streetMap = new google.maps.StreetViewPanorama(container.find(selectors.gmapsStreet)[0],{
      		position: { lat: parseFloat(lat), lng: parseFloat(lng) },			  
      		pov: {
        		heading: 34,
        		pitch: 10,
      		},
    	});

		setTimeout(function(){
			$.each(state.mapMarkers,function(k,el){ createZillowMarker(el); })
			$.each(state.gmapsPlaces,function(k,el){ createPlaceMarker(el); })
			$.each(state.poiMarkers,function(k,el){ createPoiMarker(el); })
		},300);		
	}
	function initMapView(lat,lng){	
		state.map = new google.maps.Map(container.find(selectors.gmapsMap)[0], {
			center: new google.maps.LatLng(parseFloat(lat),parseFloat(lng)),
			zoom: 18,
			mapTypeId: google.maps.MapTypeId.HYBRID
		  });
		new google.maps.Marker({
			position: new google.maps.LatLng(parseFloat(lat),parseFloat(lng)),			
			map: state.map,
			featureType: "all",
    		elementType: "labels",
		});
		//setTimeout(function(){ loadMapAddresses();  },5*1000);		
	}
	


	function loadMapPlaces(btn){	
		//Clear markers		
		if(!$.defined(state.placesMarkers))state.placesMarkers = [];
		for (var i = 0; i < state.placesMarkers.length; i++) {
			state.placesMarkers[i].setMap(null);
		}		
		state.placesMarkers = [];			
		
		var bounds = state.map.getBounds();
		if(!$.defined(bounds))return false;				

		var request = {
			bounds: bounds,			
			//rankBy: google.maps.places.RankBy.DISTANCE
		};		
			
		btn.button('loading');
		service = new google.maps.places.PlacesService(state.map);
		state.gmapsPlaces = [];
		state.gmapsPlacesStats = {'closure_rate':0, 'closed':0, 'open':0, 'total':0, 'types':{}, 'topType':{'title':'','count':0}};		
		state.gmapsPlacesPage = 0;

		service.nearbySearch(
			request,
			(results, status, pagination) => {
			  if (status !== "OK" || !results){ placesDone();  return;}
		
			  processPlacesResult(results);			  
			  if (pagination && pagination.hasNextPage) {	
					state.gmapsPlacesPage++;	
					if(state.gmapsPlacesPage>10){
						alert("Too many pages!");				
						placesDone();
					}
					else{
						pagination.nextPage();				
					}						  					
			  }
			  else{
				  placesDone();
			  }
			}
		);
	}
	function processPlacesResult(results){
		console.log("Processing Results ("+state.gmapsPlacesPage+")...");
		for (let i = 0; i < results.length; i++) {
			let el = results[i];
			if(el.types[0] == 'locality')continue;
			console.log(el.place_id);
			var marker = createPlaceMarker(el);	
			state.placesMarkers.push(marker);
			state.gmapsPlaces.push(el);

			if(el.business_status == "OPERATIONAL")state.gmapsPlacesStats.open++;
			else state.gmapsPlacesStats.closed++;
			state.gmapsPlacesStats.total++;

			let type = el.types[0];
			if(!$.defined(state.gmapsPlacesStats.types[type]))state.gmapsPlacesStats.types[type] = 0;
			state.gmapsPlacesStats.types[type]++;
		}			
	}
	function placesDone(){
		var btn = container.find(selectors.gmapsMapPlacesBtn);
		btn.button('reset');
		state.gmapsPlacesStats.closure_rate = (state.gmapsPlacesStats.total>0)?((100*state.gmapsPlacesStats.closed)/state.gmapsPlacesStats.total):0;
		state.gmapsPlacesStats.types = Object.fromEntries(Object.entries(state.gmapsPlacesStats.types).sort(([,a],[,b]) => a-b));

		let entries = Object.entries(state.gmapsPlacesStats.types);
		state.gmapsPlacesStats.types = entries.sort((a, b) => b[1] - a[1]);

		var c = container.find(selectors.gmapsMapPlacesList);
		var html = Handlebars.compile(container.find(selectors.templates.gmapsMapPlacesList).html());
		c.html(html({'items':state.gmapsPlaces}));

		c = container.find(selectors.gmapsMapPlacesSummary);
		html = Handlebars.compile(container.find(selectors.templates.gmapsMapPlacesSummary).html());
		c.html(html(state.gmapsPlacesStats));

		console.log(state.gmapsPlacesStats);
	}
	function createPlaceMarker(el) {  		
		const svgMarker = {
			path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
			fillColor: "orange",
			fillOpacity: 0.6,
			strokeWeight: 0,
			rotation: 0,
			scale: 2,
			anchor: new google.maps.Point(15, 30),
		  }; 		 				 
		marker = new google.maps.Marker({
		   map: state.map,
		   icon: svgMarker,
		   title: el.name,
		   position: { lat: parseFloat(el.geometry.location.lat()), lng: parseFloat(el.geometry.location.lng()) }
		 });
		 return marker;		 
	}


	function loadMapZillowAddresses(btn){			
		//Clear markers		
		state.mapMarkers = [];		
		for (var i = 0; i < state.mapMarkers.length; i++) {			
			state.mapMarkers[i].setMap(null);
		}		
		state.mapMarkers = [];			
		
		var bounds = state.map.getBounds();
		if(!$.defined(bounds))return false;				

		var NECorner = bounds.getNorthEast();
		var SWCorner = bounds.getSouthWest();		
		var box = {'north':NECorner.lat(), 'east':NECorner.lng(), 'west':SWCorner.lng(), 'south':SWCorner.lat()}		

		btn.button('loading');
		$.post(script,{action: 'loadMapZillowAddresses', box: box},function(json){
			btn.button('reset');
			if(json.error)container.html(json.error);
			else{				
				$.each(json.items,function(k,el){
					var marker = createZillowMarker(el);
					state.mapMarkers.push(marker);
				});

				var c = container.find(selectors.gmapsMapOaList);
				var html = Handlebars.compile(container.find(selectors.templates.gmapsMapOaList).html());
				c.html(html(json));

				c = container.find(selectors.gmapsMapOaSummary);
				html = Handlebars.compile(container.find(selectors.templates.gmapsMapOaSummary).html());
				c.html(html(json));
			}
		},"json");
	}
	function createZillowMarker(el) {  		
		const svgMarker = {
			path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
			fillColor: "blue",
			fillOpacity: 0.6,
			strokeWeight: 0,
			rotation: 0,
			scale: 2,
			anchor: new google.maps.Point(15, 30),
		  }; 		 				 
		var marker = new google.maps.Marker({
		   map: state.map,
		   icon: svgMarker,
		   title: el.address+' | '+el.value,
		   position: { lat: parseFloat(el.loc.latitude), lng: parseFloat(el.loc.longitude) }
		 });
		 return marker;		 
	}



	function loadMapAddresses(btn){	
		loadMapZillowAddresses(btn)
		return;



		//Clear markers		
		if(!$.defined(state.mapMarkers))state.mapMarkers = [];
		for (var i = 0; i < state.mapMarkers.length; i++) {
			state.mapMarkers[i].setMap(null);
		}		
		state.mapMarkers = [];			

		var loc = state.map.getCenter()				
		var bounds = state.map.getBounds();
		if(!$.defined(bounds))return false;
		
		var center = {'lat':loc.lat(),'lng':loc.lng()};

		var NECorner = bounds.getNorthEast();
		var SWCorner = bounds.getSouthWest();
		var box = {'lat1':NECorner.lat(), 'lng1':NECorner.lng(), 'lat2':SWCorner.lat(), 'lng2':SWCorner.lng()}

		btn.button('loading');
		$.post(script,{action: 'loadMapAddresses', center: center, box: box},function(json){
			btn.button('reset');
			if(json.error)container.html(json.error);
			else{
				container.find(selectors.gmapsMapOaTotal).text(json.total);
				$.each(json.items,function(k,el){
					createOaMarker(el);
				});

				var c = container.find(selectors.gmapsMapOaList);
				var html = Handlebars.compile(container.find(selectors.templates.gmapsMapOaList).html());
				c.html(html(json));
			}
		},"json");
	}
	function createOaMarker(el) {  
		const svgMarker = {
			path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
			fillColor: "blue",
			fillOpacity: 0.6,
			strokeWeight: 0,
			rotation: 0,
			scale: 2,
			anchor: new google.maps.Point(15, 30),
		  }; 		 				 
		marker = new google.maps.Marker({
		   map: state.map,
		   icon: svgMarker,
		   title: el.uid+' - '+el.zip,
		   position: { lat: parseFloat(el.lat), lng: parseFloat(el.lng) }
		 });
		 state.mapMarkers.push(marker);
	}


	//Contacts	
	function contactsAddLookup(btn){
		console.log(btn.parents('.input-group'));
		var number = btn.parents('.input-group').find('input').val();
		if(!number){ $.error("Number not found"); return; }

		btn.button('loading');
		$.post(script,{action: 'contactsLookup', number: number},function(json){
			btn.button('reset');
			if(json.error)$.error(json.error);
			else{
				if(json.caller.caller_name) modal.modal.find('input[name="name"]').val(json.caller.caller_name);				
			}
		},"json");

	}
	function contactsEdit(btn){
		var id = btn.attr('data-id');
		if(!id){ $.error("ID not found!"); return; }
		contactsSave(id);
	}
	function contactsAdd(btn){
		contactsSave(0);
	}
	function contactsSave(id){
		if(!$.defined(id))id = 0;

		modal = new Modal({
			parent: container,
			//size: '80%',
			static: true,			
			title: (id>0)?'Edit Contact':'Create Contact',
			template: selectors.templates.contactsAdd,	
			templateData: { lId: state.deal.listing.id, id: id },
			callback: function(){  },
			buttons: new Array(
				$('<button>').addClass('btn btn-primary').text('Save Contact').click(function(){
					var btn = $(this);
					var form = modal.modal.find('form');
					if (!form[0].reportValidity())return false;

					btn.button('loading');
					modal.block();
					$.post(script,form.serialize(),function(json){			
						modal.release();
						btn.button('reset');
						if(json.error)container.html(json.error);
						else{		
							initContacts();			
							modal.close();				
						}
					},"json");					
				}),
				$('<button>').addClass('btn btn-danger modal-btn-left').text('DELETE Contact').click(function(){
					if(!confirm("Are you sure you want to DELETE this contact? This cannot be undone.")) return;

					var btn = $(this);					
					btn.button('loading');
					modal.block();
					$.post(script,{action: 'removeContact', id: id},function(json){			
						modal.release();
						btn.button('reset');
						if(json.error)container.html(json.error);
						else{		
							initContacts();			
							modal.close();				
						}
					},"json");					
				}),
				$('<button>').addClass('btn btn-default dialog-close').text('Cancel')				
			)
		});
	}
	function contactsContractorSearch(btn){		
		modal = new Modal({
			parent: container,
			size: '80%',
			static: true,			
			title: 'Find Contractor',
			template: selectors.templates.contactsContractorSearch,	
			templateData: {},
			callback: function(){  },
			buttons: new Array($('<button>').addClass('btn btn-default dialog-close').text('Done'))
		});
	}
	function initContacts(){		
		var c = container.find(selectors.contactsContainer);		

		c.loading(true);
		$.post(script,{action: 'loadContacts', id: state.deal.listing.id},function(json){			
			c.loading();
			if(json.error)c.html(json.error);
			else{		
				var html = Handlebars.compile(container.find(selectors.templates.contacts).html());					
				c.html(html(json));
			}
		},"json");
	}



	//Phones
	function initPhones(){
		var c = container.find(selectors.phonesContainer);		

		c.loading(true);
		$.post(script,{action: 'loadPhones', id: state.deal.listing.id},function(json){			
			c.loading();
			if(json.error)container.html(json.error);
			else{						
				var html = Handlebars.compile(container.find(selectors.templates.phones).html());					
				c.html(html(json));					
			}
		},"json");
	}
	function phonesSettings(){
		modal = new Modal({
			parent: container,
			//size: '80%',
			static: true,			
			title: 'Phone Settings',
			template: selectors.templates.phonesSettings,	
			templateData: { id: state.deal.listing.id },
			callback: function(){  },
			buttons: new Array(
				$('<button>').addClass('btn btn-primary').text('Save Settings').click(function(){
					var btn = $(this);
					var form = modal.modal.find('form');

					btn.button('loading');
					modal.block();
					$.post(script,form.serialize(),function(json){			
						modal.release();
						btn.button('reset');
						if(json.error)container.html(json.error);
						else{		
							initPhones();				
							modal.close();				
						}
					},"json");
					
				}),
				$('<button>').addClass('btn btn-default dialog-close').text('Done')				
			)
		});
	}



});