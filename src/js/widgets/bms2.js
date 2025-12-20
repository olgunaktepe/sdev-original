$(document).ready(function () {
    var script = "ajax/php/widgets/bms2.php";
    var selectors = {
        container			: ".widget-bms2",
		
        search				: '.search-a',
		summary				: '.overall-summary-container',

		zipSelector			: '.zip-select-container',
		zipSelectorInput	: '.zip-selector-select',
		
		filtersForm			: '.filters-form',
		filtersInput		: '.filters-input',

		catChart			: '.cat-chart',

		sourceChart			: '.source-chart',
		scrapesChart		: '.scrapes-chart',

		bmWidgetChart		: '.bm-widget-chart',
									
		zhviTrends			: '.zhvi-trends-container',
		zhviCurrent			: '.zhvi-current-container',
		
		zoriTrends			: '.zori-trends-container',
		zoriCurrent			: '.zori-current-container',

		markets				: '.markets-container',
		submarkets			: '.submarkets-container',
		
		marketsWidget		: '.markets-widget',
		marketsDataContainer: '.markets-data-container',
		marketsSelector		: '.markets-select',

		widgetContainer		: '.stats-widget',
		widgetChart			: '.stats-widget-chart',
		widgetRange			: '.stats-widget-range',
		widgetOutlierRange	: '.stats-widget-outlier-range',
		widgetBucketRange	: '.stats-widget-bucket-range',
		widgetSummary		: '.stats-widget-summary',
		widgetRangeFrom		: '.stats-widget-range-from',
		widgetRangeTo		: '.stats-widget-range-to',
		widgetOutlierRangeDisable: '.stats-widget-outlier-ranger-disable',

		mapCenterInput		: '.map-center-input',
		mapRadius			: '.map-radius-range',
		mapSizeLabel		: '.map-area-size-label',
				
        templates: {                    	
			modal			: 'ajax/template/widgets/bms/_modal.phtml', 
			summary			: '#template-widget-overall-summary',
			zipSelector		: '#template-zip-selector',

			zhvi			: '#template-zhvi',      

			markets			: '#template-markets',      
			submarkets		: '#template-submarkets',      
			
			widgetSummary	: '#template-widget-summary',
        },
	}    
    var container = $(selectors.container);    
    var modal;
	var widgets = {};
	var map;
	var geocoder;
	var mapState = {};
	var initDone;
	var state = {};

    init();
    bind();

    function init() {    	
		google.load('visualization', '1', {packages:['corechart'], callback: {}});
		
		window.addEventListener('load', initMap)	
		setTimeout(function(){ initMap(); },500);
		setTimeout(function(){ initMap(); },1000);
		setTimeout(function(){ initMap(); },2000);
		
    }

    function bind() {						
		container.on('click',selectors.search,function(e){ e.preventDefault(); search($(this)); });		

		container.on('change',selectors.widgetRangeFrom,function(e){ e.preventDefault(); updateWidgetRange($(this)); });		
		container.on('change',selectors.widgetRangeTo,function(e){ e.preventDefault(); updateWidgetRange($(this)); });	
		container.on('change',selectors.widgetOutlierRangeDisable	,function(e){ e.preventDefault(); toggleWidgetOutlierRange($(this)); });	

		container.on('change',selectors.filtersInput,function(e){ e.preventDefault(); filterListings($(this)); });	

		container.on('change',selectors.zipSelectorInput,function(e){ e.preventDefault(); initZhvi(); initZori(); });	

		container.on('change',selectors.marketsSelector,function(e){ e.preventDefault(); updateMarketsData($(this)); });	


		container.on('change',selectors.mapCenterInput,function(){ centerMap($(this)); })
	}
	function initMap(){
		if(initDone)return;			
		map = new google.maps.Map(document.getElementById('map-canvas'), {
			center: new google.maps.LatLng(34.08564344830642,-118.26248089994928), // Munich Germany
			zoom: 10
		});
		initDone = true;	

		google.maps.event.addListener( map, 'idle', function() {
			initDone = true;
		});	

		mapState.radius = 10;
		container.find(selectors.mapRadius).ionRangeSlider({						
			min: 0.5,
			max: 40,
			step: 0.5,
			from: mapState.radius,
			grid: true,        	
			onChange: function (data) {				
				mapState.radius = data.from;
				if(mapState.rectangle){
					var center = mapState.rectangle.getBounds().getCenter();
					drawRectangle(center,mapState.radius,mapState.radius);
				}
			},
		});

		geocoder = new google.maps.Geocoder();
			
		//getMoveData()		

		/*
		mapState.centerMarker = new google.maps.Marker({
			map: map,		
			title: 'Center',
			position: map.getCenter()
		  });

		google.maps.event.addListener(map, 'click', function(event) {
			moveCenter(event.latLng);			
		});	
		*/		
		createRetangle();
	}
	function moveCenter(pos){
		mapState.centerMarker.setMap(null);
		mapState.centerMarker = new google.maps.Marker({
			map: map,		
			title: 'Center',
			position: pos //map.getCenter()
		});
	}
	function centerMap(input){
		var address = input.val();		
		
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
					centerRectangle();
                }
            }
        );
	}
	google.maps.Polygon.prototype.getBounds || (google.maps.Polygon.prototype.getBounds = function() {
		for (var a = this.getPath(), d, c = a.getAt(0).lat(), b, f = a.getAt(0).lng(), e = 1; e < a.getLength(); e++) {
			var g = a.getAt(e);
			d = d < g.lat() ? d : g.lat();
			c = c > g.lat() ? c : g.lat();
			b = b < g.lng() ? b : g.lng();
			f = f > g.lng() ? f : g.lng()
		}
		return new google.maps.LatLngBounds(new google.maps.LatLng(d, b), new google.maps.LatLng(c, f))
	});
	function makeBounds(a, d, c) {
		var b = google.maps.geometry.spherical.computeOffset(a, c / 2, 0);
		c = google.maps.geometry.spherical.computeOffset(a, c / 2, 180);
		var f = google.maps.geometry.spherical.computeOffset(a, d / 2, 90);
		a = google.maps.geometry.spherical.computeOffset(a, d / 2, 270);
		return new google.maps.LatLngBounds(new google.maps.LatLng(c.lat(), a.lng()), new google.maps.LatLng(b.lat(), f.lng()))
	}
	function drawRectangle(center,w,l){
		w = w * .3048 * 5280;
		l = l * .3048 * 5280;	
		var bounds = makeBounds(center, w, l);
		mapState.rectangle.setBounds(bounds);	
	}
	function centerRectangle(){
		var center = map.getCenter();				
		drawRectangle(center,mapState.radius,mapState.radius);		
	}
	function createRetangle() {						
		mapState.rectangle = new google.maps.Rectangle({				
				editable: true,
				draggable: true,
				strokeColor: "#3320E1",
				strokeWeight: 2,
				fillColor: "#81B2E1",
				fillOpacity: .7
		});
		google.maps.event.addListener(mapState.rectangle, "bounds_changed", function() {        
			updateArea(mapState.rectangle.getBounds());
		}); 
		mapState.rectangle.setMap(map); 
		drawRectangle(map.getCenter(), mapState.radius, mapState.radius);  
	}
	function updateArea(bound) {
		var ne = bound.getNorthEast();
		var sw = bound.getSouthWest();
		var se = new google.maps.LatLng(sw.lat(), ne.lng());
		var len = google.maps.geometry.spherical.computeDistanceBetween(se, sw) * 3.28084;		//Feet
		var wid = google.maps.geometry.spherical.computeDistanceBetween(se, ne) * 3.28084;		//Feet

		len *= 0.000189394;		//Miles
		wid *= 0.000189394;		//Miles
		
		var area = len*wid;

		len = Math.round(100 * len) / 100;
		wid = Math.round(100 * wid) / 100;	
		
		mapState.areaWidth = wid;
		mapState.areaLength = len;

		container.find(selectors.mapSizeLabel).text("Dimensions: "+formatNumber(len,2)+" x "+formatNumber(wid,2)+", Area: "+formatNumber(area,2)+" miles");
		
	}














































	function search(btn){
		console.log("Query server...");

		var form = btn.closest('form');
		var data = form.serializeObject();

		var center = mapState.rectangle.getBounds().getCenter();		
		data.lat = center.lat();
		data.lng = center.lng();
		data.radius = mapState.radius;
		data.width = mapState.areaWidth;
		data.length = mapState.areaLength;

		btn.button('loading');
    	$.post(script,data,function(json){    					
			btn.button('reset');
    		if(json.error){ $.error(json.error); }
    		else{ 
				state.filteredListings = json.listings;
				state.listings = json.listings;
				//state.weekly_scrapes = json.stats.weekly_scrapes;				
				state.scrapes = json.stats.scrapes;		
				state.markets = json.markets;		
				filterListings();					
    		}
    	},"json");
	}
	function calcStats(){
		console.log("Calc stats...");

		var listings = state.filteredListings;
		var stats = {
			live: 0,
			expired: 0,
			sample_size: state.listings.length,			
			filtered_size: state.filteredListings.length,
			price:{list:[],missing:0},
			buildings_sqft:{list:[],missing:0},
			dom:{list:[],missing:0},
			acres:{list:[],missing:0},
			far:{list:[],missing:0},
			categories:{},
			sources:{},			
		};		

		$.each(listings,function(k,el){					
			el.price = (el.price)?parseFloat(el.price.toString().replace(/[^0-9\.]+/g,"")):0;	
			el.far = (el.far)?parseFloat(el.far.toString().replace(/[^0-9\.]+/g,"")):0;		
			el.dom = (el.dom)?parseInt(el.dom):0;		
			el.acres = (el.acres)?parseFloat(el.acres.toString().replace(/[^0-9\.]+/g,"")):0;					
			el.buildings_sqft = (el.buildings_sqft)?parseFloat(el.buildings_sqft):0;	

			if(el.expired == 0 && el.last_seen)stats.live++;
			if(el.expired == 1)stats.expired++;

			var val = el.price
			if(isNaN(val) || val<=0){ stats.price.missing++; }
			else{ stats.price.list.push(val); }					

			val = el.far;
			if(isNaN(val) || val<=0){ stats.far.missing++; }
			else{ stats.far.list.push(val); }	
			
			val = el.acres;
			if(isNaN(val) || val<=0){ stats.acres.missing++; }
			else{ stats.acres.list.push(val); }	
			
			val = el.buildings_sqft;
			if(isNaN(val) || val<=0){ stats.buildings_sqft.missing++; }
			else{ stats.buildings_sqft.list.push(val); }

			val = el.dom;
			if(isNaN(val) || val<=0 || val >= 1000){ stats.dom.missing++; }
			else{ stats.dom.list.push(val); }
			
			if(!$.defined(stats.categories[el.category]))stats.categories[el.category]=0;
			stats.categories[el.category]++;

			if(!$.defined(stats.sources[el.source]))stats.sources[el.source]=0;
			stats.sources[el.source]++;			
		});

		stats.filtered_p = (stats.sample_size>0)?(stats.sample_size-stats.filtered_size)/stats.sample_size:0;
		stats.expired_p = (stats.sample_size>0)?(100*stats.expired)/stats.sample_size:0;

		state.stats = stats;
		console.log(state);
		renderTemplates();		
	}
	function renderTemplates(){
		console.log("render...");

		renderSummary();
		renderZipcodes();		

		initScrapes();
		initCategories(state.stats.categories);
		initSources(state.stats.sources)
		initPrices(state.stats.price);
		initSqft(state.stats.buildings_sqft);
		initDom(state.stats.dom);
		initAcres(state.stats.acres);
		initFar(state.stats.far);
		initZhvi();
		initZori();
		initMarkets();
		initSubmarkets();
	}	
	function initScrapes(){		
		var c = container.find(selectors.scrapesChart);		

		var data = [];
		data.push(['Date', 'New', 'Expired']);
		$.each(state.scrapes,function(k,el){
			data.push([k,el.new,el.expired]);
		});      
        data = google.visualization.arrayToDataTable(data);

		var options = {          
		  chartArea: { width: '77%', height: '80%' },          
        };
        var chart = new google.visualization.LineChart(c[0]);
        chart.draw(data, options);      		
	}
	function renderZipcodes(){		
		var c = container.find(selectors.zipSelector);		
		var html = Handlebars.compile(container.find(selectors.templates.zipSelector).html());				
		state.zipcodes.sort();
		c.html(html({'items':state.zipcodes}));

		console.log(state.zipcodes);

		//if(!$.defined(zipInput.val()) || zipInput.val().length<=0)zipInput.val(zipInput.find('option:eq(0)').val());
	}
	function renderSummary(){
		var c = container.find(selectors.summary);		
		var html = Handlebars.compile(container.find(selectors.templates.summary).html());
		c.html(html(state.stats));
	}
	function filterListings(){
		console.log("Filter listings...");

		state.filteredListings = [];
		state.filteredStats = {
								category:{missing:0,match:0,nomatch:0},
								source:{missing:0,match:0,nomatch:0},
								price:{missing:0,match:0,nomatch:0},
								far:{missing:0,match:0,nomatch:0},
								acres:{missing:0,match:0,nomatch:0},
								building_sqft:{missing:0,match:0,nomatch:0},
							  };

		var filters = container.find(selectors.filtersInput).serializeObject();
		console.log(filters);

		state.zipcodes = [];			
		$.each(state.listings,function(k,el){
			var flag = true;			
			if($.defined(el.zip) && el.zip.length>0 && state.zipcodes.indexOf(el.zip)<0)state.zipcodes.push(el.zip);

			if(filters.category && filters.category.length>0){
				var cats = filters.category.split(',');
				cats = cats.map(s => s.trim().toLowerCase());								

				if(!$.defined(el.category) || el.category.length<=0){ state.filteredStats.category.missing++; }
				else if (cats.indexOf(el.category.toLowerCase())>=0){
					if(filters.category_exclude == 1){
						flag = false;
						state.filteredStats.category.nomatch++;
					}
					else{
						state.filteredStats.category.match++;
					}						
				}
				else{
					if(filters.category_exclude == 1){
						state.filteredStats.category.match++;
					}
					else{
						flag = false;
						state.filteredStats.category.nomatch++;						
					}						
				}
			}

			if(filters.sources && filters.sources.length>0){									
				if(el.source.length<=0){ state.filteredStats.source.missing++; }
				else if (filters.sources.indexOf(el.source)>=0){					
					state.filteredStats.source.match++;						
				}
				else{					
					flag = false;
					state.filteredStats.source.nomatch++;
				}
			}

			//Price filter
			var min = parseFloat(filters.price_min);	
			var max = parseFloat(filters.price_max);
			if(min>0 || max>0){			
				var priceFlag = true;								
				if(el.price<=0){ state.filteredStats.price.missing++; }
				else{
					if(!isNaN(min) && min>0 && el.price<min){
						priceFlag = false;
					}
					if(!isNaN(max) && max>0 && el.price<max){
						priceFlag = false;
					}
				}				
				if(priceFlag){
					state.filteredStats.price.match++;		
				}
				else{
					flag = false;
					state.filteredStats.price.nomatch++;
				}
			}

			//FAR filter
			var min = parseFloat(filters.far_min);	
			var max = parseFloat(filters.far_max);
			if(min>0 || max>0){			
				var farFlag = true;								
				if(el.far<=0){ state.filteredStats.far.missing++; }
				else{
					if(!isNaN(min) && min>0 && el.far<min){
						farFlag = false;
					}
					if(!isNaN(max) && max>0 && el.far<max){
						farFlag = false;
					}
				}				
				if(farFlag){
					state.filteredStats.far.match++;		
				}
				else{
					flag = false;
					state.filteredStats.far.nomatch++;
				}
			}

			//Acres filter
			var min = parseFloat(filters.acres_min);	
			var max = parseFloat(filters.acres_max);
			if(min>0 || max>0){			
				var acresFlag = true;								
				if(el.acres<=0){ state.filteredStats.acres.missing++; }
				else{
					if(!isNaN(min) && min>0 && el.acres<min){
						acresFlag = false;
					}
					if(!isNaN(max) && max>0 && el.acres<max){
						acresFlag = false;
					}
				}				
				if(acresFlag){
					state.filteredStats.acres.match++;		
				}
				else{
					flag = false;
					state.filteredStats.acres.nomatch++;
				}
			}

			//Building sqft filter
			var min = parseFloat(filters.building_sqft_min);	
			var max = parseFloat(filters.building_sqft_max);			
			if(min>0 || max>0){			
				var sqftFlag = true;					
				if(el.buildings_sqft<=0){ state.filteredStats.building_sqft.missing++; }
				else{
					if(!isNaN(min) && min>0 && el.buildings_sqft<min){
						sqftFlag = false;
					}
					if(!isNaN(max) && max>0 && el.buildings_sqft<max){
						sqftFlag = false;
					}
				}				
				if(sqftFlag){
					state.filteredStats.building_sqft.match++;		
				}
				else{
					flag = false;
					state.filteredStats.building_sqft.nomatch++;
				}
			}

			if(flag)state.filteredListings.push(el);
		});	
		calcStats();	
	}
	function toggleWidgetOutlierRange(input){
		var c = input.closest(selectors.widgetContainer);		
		var widget = widgets[c.attr('data-key')];		
		var slider = c.find(selectors.widgetOutlierRange);											

		if(input.is(':checked')){
			widget.settings.outlierRange.disabled = true;
			slider.parent().css({opacity: 0.2});
		}
		else{
			widget.settings.outlierRange.disabled = false;
			slider.parent().css({opacity: 1});
		}
		widget.update();
	}
	function updateWidgetRange(input){
		var c = input.closest(selectors.widgetContainer);		
		var widget = widgets[c.attr('data-key')];		

		var from = c.find(selectors.widgetRangeFrom).val();
		var to = c.find(selectors.widgetRangeTo).val();
		
		var slider = c.find(selectors.widgetRange).data("ionRangeSlider");							
		slider.update({from: from,to: to});
		
		widget.range = [from,to];		
		widget.update();		
	}
	function drawSummary(widget){
		var c = widget.containers.summary;

		var html = Handlebars.compile(container.find(selectors.templates.widgetSummary).html());
		c.html(html({'items':widget.summary}));
	}
	function drawHisto(widget){	
		var list = widget.list;				
		var c = widget.containers.chart;
		var steps = distribute(widget.stats.max,50);		
		//console.log('Steps: '+steps);
		var data = google.visualization.arrayToDataTable(list.map(function (value) {return [value];}), true);
	
		var options = {
			title: '',
			legend: { position: 'none' },
			colors: ['#4285F4'],
		
			chartArea: { width: '94%', height: '80%' },
			
			hAxis: {
			  //ticks: steps
			},
			
			bar: { gap: 0 },		
			histogram: {
			  //bucketSize: steps[1]-steps[0],
			  //maxNumBuckets: steps.length,
			  //maxNumBuckets: 10,			  
			  //minValue: 10,
			  //maxValue: 200000

			  //lastBucketPercentile: widget.settings.outlierRange,
			  //maxNumBuckets: widget.settings.bucketRange,
			  //bucketSize: widget.settings.bucketRange, //widget.stats.average/widget.settings.outlierRange,

			  //bucketSize: 0.01,
      		  maxNumBuckets: 400,      

			}
		};
		
		var chart = new google.visualization.Histogram(c[0]);
		chart.draw(data, options);		
	}
	function initWidget(widget){
		widget.update();
		
		var options = {
			type: "double",
			grid: false,
			min: widget.stats.min,
			max: widget.stats.max,			
			prettify_enabled: true,
			prettify_separator: ",",
			callback: function(){ widget.update(); },
			onChange: function (data) {				
				widget.range = [data.from,data.to];

				widget.containers.main.find(selectors.widgetRangeFrom).val(data.from);
				widget.containers.main.find(selectors.widgetRangeTo).val(data.to);

				widget.update();
			},
		}
		if(widget.settings.rangeStep)options.step = widget.settings.rangeStep;		
		
		widget.stats.min_unfiltered = Math.min.apply(null, widget.listBackup);
		widget.stats.max_unfiltered = Math.max.apply(null, widget.listBackup);
		var range = widget.containers.range.data("ionRangeSlider");
		if($.defined(range)){
			range.update({
				min		: widget.stats.min_unfiltered, 
				max		: widget.stats.max_unfiltered,
				from	: widget.stats.min_unfiltered, 
				to		: widget.stats.max_unfiltered,
			});
		}
		else{
			widget.containers.range.ionRangeSlider(options);		

			widget.containers.outlierRange.ionRangeSlider({			
				grid: false,			
				min: 50,
				max: 100,
				from: widget.settings.outlierRange,
				postfix: '%',
				grid: true,        	
				onChange: function (data) {				
					widget.settings.outlierRange = [data.from];
					widget.update();
				},
			});
		}

		widget.containers.bucketRange.ionRangeSlider({			
			grid: false,
			from: 1,
			min: 1,
			max: 20,			
			onChange: function (data) {				
				widget.settings.bucketRange = [data.from];
				widget.update();
			},
		});
	}

	
	function distribute (max, buckets) {
		var steps = [];
		var arr = [], rpt = max / buckets, groupLiteral_low;
		for (var i = 0; i < max; i += rpt) {
			if (Math.ceil(i) != i || i==0) {
				groupLiteral_low = Math.ceil(i);
			} else {
				groupLiteral_low = Math.ceil(i)+1;
			}
			arr.push({
				"limit": (Math.floor(rpt+i)),
				"literal": groupLiteral_low + "-" + (Math.floor(rpt+i))
			});
			steps.push((Math.floor(rpt+i)));
		}
		//return arr; 
		return steps;
	}
	function average(array) {
		var total = 0;
		var count = 0;
	
		jQuery.each(array, function(index, value) {
			total += value;
			count++;
		});
	
		return total / count;
	}
	function median(numbers) {
		const sorted = Array.from(numbers).sort((a, b) => a - b);
		const middle = Math.floor(sorted.length / 2);
	
		if (sorted.length % 2 === 0) {
			return (sorted[middle - 1] + sorted[middle]) / 2;
		}
	
		return sorted[middle];
	}

	function filterOutliers(someArray,rate) {  

		// Copy the values, rather than operating on references to existing values
		var values = someArray.concat();
	
		// Then sort
		values.sort( function(a, b) {
				return a - b;
			 });
	
		/* Then find a generous IQR. This is generous because if (values.length / 4) 
		 * is not an int, then really you should average the two elements on either 
		 * side to find q1.
		 */     
		var q1 = values[Math.floor((values.length / 4))];
		// Likewise for q3. 
		var q3 = values[Math.ceil((values.length * (3 / 4)))];
		var iqr = q3 - q1;
			
		//var rate = 1.5; //default
		rate = (100-rate);
		//console.log(rate);

		// Then find min and max values
		var maxValue = q3 + iqr*(rate);
		var minValue = q1 - iqr*(rate);
	
		// Then filter anything beyond or beneath these values.
		var filteredValues = values.filter(function(x) {
			return (x <= maxValue) && (x >= minValue);
		});
	
		// Then return
		return filteredValues;
	}

	//Markets
	function initMarkets(){
		var c = container.find(selectors.markets);
		var html = Handlebars.compile(container.find(selectors.templates.markets).html());
		c.html(html(state.markets.markets));		
		try{elementsInit();}catch(e){}

		updateMarketsData(c.find(selectors.marketsSelector));		
	}	
	function initSubmarkets(){
		var c = container.find(selectors.submarkets);
		var html = Handlebars.compile(container.find(selectors.templates.markets).html());
		c.html(html(state.markets.submarkets));	
		try{elementsInit();}catch(e){}

		updateMarketsData(c.find(selectors.marketsSelector));		
	}
	function updateMarketsData(obj){		
		var c = obj.closest(selectors.marketsWidget);

		var type = c.find(selectors.marketsSelector).val();
		var els = c.find(selectors.marketsDataContainer);
		els.hide();
		els.filter(function(){ return $(this).attr('data-type') == type; }).show();
	}

	//Categories
	function initCategories(){	
		var c = container.find(selectors.catChart);		

		var data = [['Task', 'Hours per Day']];
		$.each(state.stats.categories,function(cat,count){ data.push([cat,count]); })		

		data = google.visualization.arrayToDataTable(data);	
		var options = {
			chartArea: { width: '100%', height: '100%' },
		};			
		var chart = new google.visualization.PieChart(c[0]);	
		chart.draw(data, options);		    		
	}

	//Sources
	function initSources(){	
		var c = container.find(selectors.sourceChart);		

		var data = [['Task', 'Hours per Day']];
		$.each(state.stats.sources,function(source,count){ data.push([source,count]); })		

		data = google.visualization.arrayToDataTable(data);	
		var options = {
			chartArea: { width: '100%', height: '100%' },
		};			
		var chart = new google.visualization.PieChart(c[0]);	
		chart.draw(data, options);		    		
	}

	//FAR
	function initFar(obj){
		var list = obj.list;

		var key = 'stats-far';		
		if(!widgets[key])widgets[key] = {'id':key, listBackup: list, containers:{}, settings:{'outlierRange':80} ,'stats':{}, 'range':['na','na']};	
		var widget = widgets[key];
		
		widget.listBackup = list;
		widget.containers.main = container.find(selectors.widgetContainer).filter(function(){ return $(this).attr('data-key') == key; });		 
		widget.containers.chart = widget.containers.main.find(selectors.widgetChart);
		widget.containers.summary = widget.containers.main.find(selectors.widgetSummary);
		widget.containers.range = widget.containers.main.find(selectors.widgetRange);
		widget.containers.outlierRange = widget.containers.main.find(selectors.widgetOutlierRange);
		widget.containers.bucketRange = widget.containers.main.find(selectors.widgetBucketRange);
		widget.update = function(){ reinitFar(widget); }
		
		widget.stats.missing = obj.missing;
		widget.settings.rangeStep = 0.01;

		initWidget(widget);			
	}
	function reinitFar(widget){		
		var list = widget.listBackup;

		//Filter list
		list = list.filter(function(val){ 			
			if(widget.range[0]!='na' && val<widget.range[0]) return false;
			if(widget.range[1]!='na' && val>widget.range[1]) return false;
			return true;
		});		
		if(!widget.settings.outlierRange.disabled)list = filterOutliers(list,widget.settings.outlierRange);

		widget.list = list;				

		//Get Stats
		widget.stats.min = Math.min.apply(null, list);
		widget.stats.max = Math.max.apply(null, list);
		widget.stats.median = median(list);
		widget.stats.average = average(list);
		widget.stats.inc_p = (widget.listBackup.length>0)?100*widget.list.length/widget.listBackup.length:0;

		widget.summary = [
			{'label': 'Inclusion Rate', 'value': formatNumber(widget.stats.inc_p,2)+'%', 'subvalue':'('+formatNumber(list.length,0)+' listings)'},
			{'label': 'Median', 'value': formatNumber(widget.stats.median,2)},
			{'label': 'Average', 'value': formatNumber(widget.stats.average,2)},
			{'label': 'Min/Max', 'value': formatNumber(widget.stats.min,2)+' - '+formatNumber(widget.stats.max,2)},
			{'label': 'Missing Value', 'value': formatNumber(widget.stats.missing)},
		];
		
		drawHisto(widget);		
		drawSummary(widget);
	}	

	//Acres
	function initAcres(obj){
		var list = obj.list;

		var key = 'stats-acres';		
		if(!widgets[key])widgets[key] = {'id':key, listBackup: list, containers:{}, settings:{'outlierRange':80} ,'stats':{}, 'range':['na','na']};	
		var widget = widgets[key];
		
		widget.listBackup = list;
		widget.containers.main = container.find(selectors.widgetContainer).filter(function(){ return $(this).attr('data-key') == key; });		 
		widget.containers.chart = widget.containers.main.find(selectors.widgetChart);
		widget.containers.summary = widget.containers.main.find(selectors.widgetSummary);
		widget.containers.range = widget.containers.main.find(selectors.widgetRange);
		widget.containers.outlierRange = widget.containers.main.find(selectors.widgetOutlierRange);
		widget.containers.bucketRange = widget.containers.main.find(selectors.widgetBucketRange);
		widget.update = function(){ reinitAcres(widget); }		

		widget.stats.missing = obj.missing;

		initWidget(widget);			
	}
	function reinitAcres(widget){		
		var list = widget.listBackup;

		//Filter list
		list = list.filter(function(val){ 			
			if(widget.range[0]!='na' && val<widget.range[0]) return false;
			if(widget.range[1]!='na' && val>widget.range[1]) return false;
			return true;
		});		
		if(!widget.settings.outlierRange.disabled)list = filterOutliers(list,widget.settings.outlierRange);

		widget.list = list;
				

		//Get Stats
		widget.stats.min = Math.min.apply(null, list);
		widget.stats.max = Math.max.apply(null, list);
		widget.stats.median = median(list);
		widget.stats.average = average(list);
		widget.stats.inc_p = (widget.listBackup.length>0)?100*widget.list.length/widget.listBackup.length:0;
				

		widget.summary = [
			{'label': 'Inclusion Rate', 'value': formatNumber(widget.stats.inc_p,2)+'%', 'subvalue':'('+formatNumber(list.length,0)+' listings)'},
			{'label': 'Median', 'value': formatNumber(widget.stats.median,2)},
			{'label': 'Average', 'value': formatNumber(widget.stats.average,2)},
			{'label': 'Min/Max', 'value': formatNumber(widget.stats.min,2)+' - '+formatNumber(widget.stats.max,2)},
			{'label': 'Missing Value', 'value': formatNumber(widget.stats.missing)},
		];
		
		drawHisto(widget);		
		drawSummary(widget);
	}	

	//Sqft
	function initSqft(obj){
		var list = obj.list;
		
		var key = 'stats-sqft';		
		if(!widgets[key])widgets[key] = {'id':key, listBackup: list, containers:{}, settings:{'outlierRange':80} ,'stats':{}, 'range':['na','na']};	
		var widget = widgets[key];
		
		widget.listBackup = list;
		widget.containers.main = container.find(selectors.widgetContainer).filter(function(){ return $(this).attr('data-key') == key; });		 
		widget.containers.chart = widget.containers.main.find(selectors.widgetChart);
		widget.containers.summary = widget.containers.main.find(selectors.widgetSummary);
		widget.containers.range = widget.containers.main.find(selectors.widgetRange);
		widget.containers.outlierRange = widget.containers.main.find(selectors.widgetOutlierRange);
		widget.containers.bucketRange = widget.containers.main.find(selectors.widgetBucketRange);
		widget.update = function(){ reinitSqft(widget); }	
		
		widget.stats.missing = obj.missing;

		initWidget(widget);			
	}
	function reinitSqft(widget){		
		var list = widget.listBackup;

		//Filter list
		list = list.filter(function(val){ 			
			if(widget.range[0]!='na' && val<widget.range[0]) return false;
			if(widget.range[1]!='na' && val>widget.range[1]) return false;
			return true;
		});		
		if(!widget.settings.outlierRange.disabled)list = filterOutliers(list,widget.settings.outlierRange);

		widget.list = list;
				

		//Get Stats
		widget.stats.min = Math.min.apply(null, list);
		widget.stats.max = Math.max.apply(null, list);
		widget.stats.median = median(list);
		widget.stats.average = average(list);
		widget.stats.inc_p = (widget.listBackup.length>0)?100*widget.list.length/widget.listBackup.length:0;
				

		widget.summary = [
			{'label': 'Inclusion Rate', 'value': formatNumber(widget.stats.inc_p,2)+'%', 'subvalue':'('+formatNumber(list.length,0)+' listings)'},
			{'label': 'Median', 'value': formatNumber(widget.stats.median,2)},
			{'label': 'Average', 'value': formatNumber(widget.stats.average,2)},
			{'label': 'Min/Max', 'value': formatNumber(widget.stats.min,2)+' - '+formatNumber(widget.stats.max,2)},
			{'label': 'Missing Value', 'value': formatNumber(widget.stats.missing)},
		];
		
		drawHisto(widget);		
		drawSummary(widget);
	}	

	//DOM
	function initDom(obj){
		var list = obj.list;
		
		var key = 'stats-dom';		
		if(!widgets[key])widgets[key] = {'id':key, listBackup: list, containers:{}, settings:{'outlierRange':80} ,'stats':{}, 'range':['na','na']};	
		var widget = widgets[key];
		
		widget.listBackup = list;
		widget.containers.main = container.find(selectors.widgetContainer).filter(function(){ return $(this).attr('data-key') == key; });		 
		widget.containers.chart = widget.containers.main.find(selectors.widgetChart);
		widget.containers.summary = widget.containers.main.find(selectors.widgetSummary);
		widget.containers.range = widget.containers.main.find(selectors.widgetRange);
		widget.containers.outlierRange = widget.containers.main.find(selectors.widgetOutlierRange);
		widget.containers.bucketRange = widget.containers.main.find(selectors.widgetBucketRange);
		widget.update = function(){ reinitDom(widget); }	
		
		widget.stats.missing = obj.missing;

		initWidget(widget);			
	}
	function reinitDom(widget){		
		var list = widget.listBackup;

		//Filter list
		list = list.filter(function(val){ 			
			if(widget.range[0]!='na' && val<widget.range[0]) return false;
			if(widget.range[1]!='na' && val>widget.range[1]) return false;
			return true;
		});		
		if(!widget.settings.outlierRange.disabled)list = filterOutliers(list,widget.settings.outlierRange);

		widget.list = list;
				

		//Get Stats
		widget.stats.min = Math.min.apply(null, list);
		widget.stats.max = Math.max.apply(null, list);
		widget.stats.median = median(list);
		widget.stats.average = average(list);
		widget.stats.inc_p = (widget.listBackup.length>0)?100*widget.list.length/widget.listBackup.length:0;
				

		widget.summary = [
			{'label': 'Inclusion Rate', 'value': formatNumber(widget.stats.inc_p,2)+'%', 'subvalue':'('+formatNumber(list.length,0)+' listings)'},
			{'label': 'Median', 'value': formatNumber(widget.stats.median,2)},
			{'label': 'Average', 'value': formatNumber(widget.stats.average,2)},
			{'label': 'Min/Max', 'value': formatNumber(widget.stats.min,2)+' - '+formatNumber(widget.stats.max,2)},
			{'label': 'Missing Value', 'value': formatNumber(widget.stats.missing)},
		];
		
		drawHisto(widget);		
		drawSummary(widget);
	}

	//Prices
	function initPrices(obj){		
		var list = obj.list;		

		var key = 'stats-prices';		
		if(!widgets[key])widgets[key] = {'id':key, listBackup: list, containers:{}, settings:{'outlierRange':80} ,'stats':{}, 'range':['na','na']};			
		var widget = widgets[key];
		
		widget.listBackup = list;
		widget.containers.main = container.find(selectors.widgetContainer).filter(function(){ return $(this).attr('data-key') == key; });		 
		widget.containers.chart = widget.containers.main.find(selectors.widgetChart);
		widget.containers.summary = widget.containers.main.find(selectors.widgetSummary);
		widget.containers.range = widget.containers.main.find(selectors.widgetRange);
		widget.containers.outlierRange = widget.containers.main.find(selectors.widgetOutlierRange);
		widget.containers.bucketRange = widget.containers.main.find(selectors.widgetBucketRange);
		widget.update = function(){ reinitPrices(widget); }
															
		widget.stats.missing = obj.missing;

		initWidget(widget);		
	}
	function reinitPrices(widget){		
		var list = widget.listBackup;		

		//Filter list
		list = list.filter(function(val){ 
			//if(val<10000) return false;
			if(widget.range[0]!='na' && val<widget.range[0]) return false;
			if(widget.range[1]!='na' && val>widget.range[1]) return false;
			return true;
		});		
		if(!widget.settings.outlierRange.disabled)list = filterOutliers(list,widget.settings.outlierRange);

		widget.list = list;
				
		//Get Stats		
		widget.stats.min = Math.min.apply(null, list);
		widget.stats.max = Math.max.apply(null, list);
		widget.stats.median = median(list);
		widget.stats.average = average(list);
		widget.stats.inc_p = (widget.listBackup.length>0)?100*widget.list.length/widget.listBackup.length:0;
	
		widget.summary = [
			{'label': 'Inclusion Rate', 'value': formatNumber(widget.stats.inc_p,2)+'%', 'subvalue':'('+formatNumber(list.length,0)+' listings)'},
			{'label': 'Median', 'value': '$'+formatNumber(widget.stats.median,2)},
			{'label': 'Average', 'value': '$'+formatNumber(widget.stats.average,2)},
			{'label': 'Min/Max', 'value': '$'+formatNumber(widget.stats.min,2)+' - '+'$'+formatNumber(widget.stats.max,2)},
			{'label': 'Missing Value', 'value': formatNumber(widget.stats.missing)},
		];
		
		drawHisto(widget);		
		drawSummary(widget);
	}
	
	//Zillow
	function initZhvi(){
		var trends = container.find(selectors.zhviTrends);		
		var current = container.find(selectors.zhviCurrent);				
		var zip = container.find(selectors.zipSelectorInput).val();
		
    	trends.loading(true);
		current.loading(true);
    	$.post(script,{action: 'getZhvi', zip: zip},function(json){    		
			trends.loading(false);
			current.loading(false);
    		if(json.error){ 
				trends.html('Error: '+json.error); 
				current.html('Error: '+json.error); 
			}
    		else{    	
				var data = json.res;
				//Trends				
				renderBmWidget(trends,'trends',data,function(v){ return formatNumber(v)+'%'; });
				//Current				
				renderBmWidget(current,'current',data,function(v){ return '$'+formatNumber(v); });
    		}
    	},"json");
    }	
	function initZori(){
		var trends = container.find(selectors.zoriTrends);		
		var current = container.find(selectors.zoriCurrent);				
		var zip = container.find(selectors.zipSelectorInput).val();
		
    	trends.loading(true);
		current.loading(true);
    	$.post(script,{action: 'getZori', zip: zip},function(json){    		
			trends.loading(false);
			current.loading(false);
    		if(json.error){ 
				trends.html('Error: '+json.error); 
				current.html('Error: '+json.error); 
			}
    		else{    	
				var data = json.res;
				//Trends				
				renderBmWidget(trends,'trends',data,function(v){ return formatNumber(v)+'%'; });
				//Current				
				renderBmWidget(current,'current',data,function(v){ return '$'+formatNumber(v); });
    		}
    	},"json");
    }
	
	//Bm Widget
	function renderBmWidget(c,dataKey,data,dataFormatCallback){		
		var tableData = {};
		var chartData = [];
		$.each(data,function(k,el){	
			var data = el[dataKey];		
			chartData.push([k,parseFloat(data.min),parseFloat(data.average),parseFloat(data.max)])
			$.each(data,function(k,v){				
				data[k] = dataFormatCallback(v); 
			});			
			tableData[k] = {'title':el.title,'data':data};
		});		
		var html = Handlebars.compile(container.find(selectors.templates.zhvi).html());				
		c.html(html(tableData));			
		drawBmChart(c,chartData);
	}
	function drawBmChart(c,chartData) {
		var c = c.find(selectors.bmWidgetChart);				
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Category');
		data.addColumn('number', 'Min');
		data.addColumn('number', 'Average');
		data.addColumn('number', 'Max');
		
		//console.log(chartData);
		data.addRows(chartData);
		
		var view = new google.visualization.DataView(data);
		// duplicate 1 column as a dummy data series, and add intervals to it
		view.setColumns([0, 1, {
			id: 'min',
			type: 'number',
			role: 'interval',
			calc: function (dt, row) {
				return dt.getValue(row, 1);
			}
		}, {
			id: 'median',
			type: 'number',
			role: 'interval',
			calc: function (dt, row) {
				return dt.getValue(row, 2);
			}
		}, {
			id: 'max',
			type: 'number',
			role: 'interval',
			calc: function (dt, row) {
				return dt.getValue(row, 3);
			}
		}, 1, 2, 3]);
		
		var chart = new google.visualization.LineChart(c[0]);
		chart.draw(view, {
			height: 300,			
			pointSize: 10,
			lineWidth: 1,
			orientation: 'vertical',			
			intervals: {
				style: 'boxes'
			},
			legend: {	
				position: 'none'			
			},
			series: {
				0: {
					// dummy data series, controls color of intervals	
					lineWidth: 0,					
					color: 'lightblue',					
				},
				1: {
					color: 'red',
					lineWidth: 0,										
					// min series options
				},
				2: {					
					color: 'green',
					// average series options
				},
				3: {
					color: 'red',
					lineWidth: 0,					
					// max series options
				}
			}
		});
	}	
	



















    function updateExport(data){
    	container.find(selectors.export).attr('data-sql',data.sql);
    }
    function loadSummary(btn){    	
    	var c = container.find(selectors.summary);    	
        	
    	c.html('loading...')
    	$.post(script,{action: 'getSummary'},function(json){    		
    		if(json.error){ c.html(json.error); }
    		else{    			    			
    			var html = Handlebars.compile(container.find(selectors.templates.summary).html());
    			c.html(html(json));    			    			
    		}
    	},"json");
    }
    function view(btn){
    	var id = btn.closest(selectors.item).attr('data-id');
    	var rId = btn.closest(selectors.item).attr('data-remote-id');
    	    	    	
    	modal = new Modal({
			parent: container,
			size: '80%',
			static: true,			
			title: 'View Data',
			template: selectors.templates.details,	
			templateData: {id: id, rId: rId},		
			callback: function(){ updateDetails(); },
			buttons: new Array($('<button>').addClass('btn btn-default dialog-close').text('Cancel'))
		});
    }   
    function updateDetails(){
    	var form = modal.modal.find(selectors.detailsForm);
    	var c = modal.modal.find(selectors.detailsContainer);
    	
    	c.html('loading...');
    	$.post(script,form.serialize(),function(json){
    		if(json.error){ modal.update("Error: "+json.error); }
    		else{    	
    			var render = renderjson.set_show_to_level(1)(json.data);    			
    			c.html(render);
    		}    		    		
    	},"json");
    }
    function viewScore(btn){    	    	
    	btn.button('loading');
    	$.post(script,{action:'getScore',lng: btn.attr('data-lng'), lat: btn.attr('data-lat')},function(json){
    		btn.button('reset');
    		if(json.error){ modal.update("Error: "+json.error); }
    		else{    	
    			var render = renderjson.set_show_to_level(1)(json.data);
    			
    			modal = new Modal({
    				parent: container,
    				size: '80%',
    				static: true,			
    				title: 'View Score Details',
    				content: 'Loading...',
    				callback: function(){ setTimeout(function(){ modal.update(render); },200); },
    				buttons: new Array($('<button>').addClass('btn btn-default dialog-close').text('Cancel'))
    			});
    			
    			
    		}    		    		
    	},"json");    	        	
    }
    
    
    	
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
    
    function edit(btn){
    	var id = btn.closest(selectors.item).attr('data-id');
    	add(id);
    }
    function remove(btn){
    	var id = btn.closest(selectors.item).attr('data-id');
    	if(!confirm("Are you sure you want to delete this card")) return;
    	
    	btn.button("removing");
    	$.post(script,{action: 'removeCard', id:id}, function(json){
    		btn.button("reset");
    		if(json.error){ $.error(json.error); }
    		else{
    			btn.closest(selectors.item).fadeOut(function(){  });
    		}
    	},"json");
    }
    function add(id){    	
    	modal = new Modal({
			parent: container,
			static: true,			
			title: 'Add/Edit Card',
			template: selectors.templates.add,		
			templateData: {id: id},
			buttons: new Array(
					$('<button>').addClass('btn btn-success').text('Save').click(function(){
						var btn = $(this);
						var form = modal.modal.find('form');
						
						modal.block();
						btn.button('loading');
						$.post(script,form.serialize(),function(json){
							modal.release();
							btn.button('reset');
							if(json.error){
								$.error(json.error);
							}
							else{
								modal.close();
								search();
							}
						},"json")
					}),
					$('<button>').addClass('btn btn-default dialog-close').text('Cancel'))
		});
    }    
    function toggleBC(btn,bc){
    	var id = btn.closest(selectors.item).attr('data-id');
    	    	        	
    	btn.button('loading');
    	$.post(script,{action: 'toggleBC', bc:bc, id: id},function(json){
    		if(json.error){ $.error(json.error); }
    		else{
    			reloadItem(id);
    		}
    	},"json");
    	
    }
    function toggle(btn,status){
    	var id = btn.closest(selectors.item).attr('data-id');
    	
    	if(status == 0 && !confirm("Are you sure you want to pause this card?"))return;
    	
    	btn.button('loading');
    	$.post(script,{action: 'toggle', status:status, id: id},function(json){
    		if(json.error){ $.error(json.error); }
    		else{
    			reloadItem(id);
    		}
    	},"json");
    	
    }
    function reloadItem(id){    	
        var item = container.find(selectors.item).filter(function(){ return $(this).attr('data-id')==id; })
        if(item.length<=0){ $.error("Item not found!"); return; }
        	
        $.post(script,{action: 'loadCard', id: id},function(json){
        	if(json.error){ $.error(json.error); }
        	else{
        		var html = Handlebars.compile(container.find(selectors.templates.item).html());
        		item.replaceWith(html(json.item));
        	}    		
        },"json");        
    }
    

});