$(document).ready(function () {
    var script = "ajax/php/deal.php";
    var selectors = {
        container			: ".page-deal",

		gridBox				: '.grid-box',

		gmapsStreet			: '.gmaps-street',
		gmapsMap			: '.gmaps-map',

		zillow1				: '.zillow-1-container',
		zillow2				: '.zillow-2-container',				

		census1				: '.census-1-container',
		census2				: '.census-2-container',						


		logContainer		: '.log-container',
		logChart			: '.log-chart',		
		logRefresh			: '.log-refresh-a',
		logMode				: '.log-mode-a',
	
        templates: {                    	
        	graphSummary	: '#template-graph-summary',						
        	
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
		initGrid();
    	loadListing();
    }
    function bind() {		
		container.on('click', selectors.logMode, function(e){ e.preventDefault(); logMode($(this)); });	
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
		initStreetView(state.deal.listing.lat,state.deal.listing.lng);
		initMapView(state.deal.listing.lat,state.deal.listing.lng);
		initZillowData();
		initCensusData();
	}
	function logMode(btn){
		var c = btn.closest(selectors.logContainer);
		c.find(selectors.logMode).removeClass('active');		
		btn.addClass('active');
		initZillowData();
		initCensusData();
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
		  $.each(container.find(selectors.gridBox),function(k){
			  var el = $(this);
			  var html = $("<div />").append(el.clone()).html();	
			  el.remove();		  			  
			  items.push({x: 0, y: 0, w: 4, h: 2, content: html});
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
		 
	}
});