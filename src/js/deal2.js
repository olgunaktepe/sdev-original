$(document).ready(function () {
    var script = "ajax/php/deal2.php";
    var selectors = {
        container			: ".page-deal",

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

		zillow1				: '.zillow-1-container',
		zillow2				: '.zillow-2-container',				

		census1				: '.census-1-container',
		census2				: '.census-2-container',
		
		walkscore			: '.walkscore-container',

		csmarkets			: '.csmarkets-container',
				


		logContainer		: '.log-container',
		logChart			: '.log-chart',		
		logRefresh			: '.log-refresh-a',
		logMode				: '.log-mode-a',
	
        templates: {                    	
        	graphSummary	: '#template-graph-summary',	
			gmapsMapOaList	: '#template-gmaps-map-oa-list',	
			gmapsMapOaSummary	: '#template-gmaps-map-oa-summary',	
			gmapsMapPlacesList	: '#template-gmaps-map-places-list',	
			gmapsMapPlacesSummary	: '#template-gmaps-map-places-summary',	
			listingInfo		: '#template-listing-info',
			listingAgents		: '#template-listing-agents',
			listingGallery		: '#template-listing-gallery',

			walkscore			: '#template-walkscore',
			csmarkets			: '#template-csmarkets',
        	
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
    }
    function bind() {		
		container.on('click', selectors.logMode, function(e){ e.preventDefault(); logMode($(this)); });	
		container.on('click', selectors.gmapsMapOaBtn, function(e){ e.preventDefault(); loadMapAddresses($(this)); });	
		container.on('click', selectors.gmapsMapPlacesBtn, function(e){ e.preventDefault(); loadMapPlaces($(this)); });	
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
		initStreetView(state.deal.listing.lat,state.deal.listing.lng);
		initMapView(state.deal.listing.lat,state.deal.listing.lng);
		initZillowData();
		initCensusData();
		initDups();
		initWalkscore();
		initCsmarkets();
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

		c.loading(true);
		$.post(script,{action: 'getWalkscore', id: state.deal.listing.id, lat: state.deal.listing.lat, lng: state.deal.listing.lng},function(json){			
			c.loading(false);
			if(json.error)container.html(json.error);
			else{			
				var html = Handlebars.compile(container.find(selectors.templates.walkscore).html());					
				c.html(html(json));
			}
		},"json");
	}
	function initCsmarkets(){		
		var c = container.find(selectors.csmarkets);

		c.loading(true);
		$.post(script,{action: 'getCsMarkets', id: state.deal.listing.id, lat: state.deal.listing.lat, lng: state.deal.listing.lng},function(json){			
			c.loading(false);
			if(json.error)container.html(json.error);
			else{			
				var html = Handlebars.compile(container.find(selectors.templates.csmarkets).html());					
				c.html(html(json));
			}
		},"json");
	}


	function initDups(){		
		$.post(script,{action: 'loadDuplicates', id: state.deal.listing.id, lat: state.deal.listing.lat, lng: state.deal.listing.lng},function(json){			
			if(json.error)container.html(json.error);
			else{								
			}
		},"json");
	}
	function initListingInfo(){
		var c = container.find(selectors.listingInfo);
		var html = Handlebars.compile(container.find(selectors.templates.listingInfo).html());
		c.html(html(state.deal.standerized));

		c = container.find(selectors.listingAgents);
		html = Handlebars.compile(container.find(selectors.templates.listingAgents).html());
		c.html(html(state.deal.standerized));

		c = container.find(selectors.listingGallery);
		html = Handlebars.compile(container.find(selectors.templates.listingGallery).html());
		c.html(html(state.deal.listing));		
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

		console.log(summary);

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
});