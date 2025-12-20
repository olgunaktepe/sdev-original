$(document).ready(function () {
    var script = "ajax/php/controlpanel/index.php";
    var selectors = {
        container			: ".page-controlpanel",

		logContainer			: '.log-container',
		logChart				: '.log-chart',		
		logRefresh				: '.log-refresh-a',
		logMode					: '.log-mode-a',

		crexi					: '.crexi-container',                        
		crexiRefresh			: '.crexi-refresh-a',

		ce						: '.ce-container',                        
		ceRefresh				: '.ce-refresh-a',

		century					: '.century-container',                        
		centuryRefresh			: '.century-refresh-a',

		loopnet					: '.loopnet-container',                        
		loopnetRefresh			: '.loopnet-refresh-a',

		ma						: '.ma-container',                        
		maRefresh				: '.ma-refresh-a',

		sourcesContainer		: '.sources-container',
		sourcesRefresh			: '.sources-refresh-a',
		sourcesChart			: '.sources-chart',
		sourcesMode				: '.sources-mode-a',

		wsContainer				: '.weeklyscrape-container',
		wsRefresh				: '.weeklyscrape-refresh-a',
		wsChart					: '.weeklyscrape-chart',
		wsMode					: '.weeklyscrape-mode-a',


		pingContainer			: '.ping-container',
		pingRefresh				: '.ping-refresh-a',	
		pingMode				: '.ping-mode-a',	               
        
        
	
        templates: {        	
			log				: '#template-log',
			sources			: '#template-sources',
			ws				: '#template-weeklyscrape',
			ping			: '#template-ping',
        },
	}    
    var container = $(selectors.container);    
    init();
    bind();

    function init() {    	
    	loadCrexi();  		
		loadCe();  		
		loadCentury();
		loadLoopnet();
		//loadMa();

		loadSources();
		loadWs();
		loadPing();
    }
    function bind() {		
		container.on('click', selectors.logRefresh, function(e){ e.preventDefault(); logRefresh($(this)); });
		container.on('click', selectors.logMode, function(e){ e.preventDefault(); logMode($(this)); });

		container.on('click', selectors.sourcesRefresh, function(e){ e.preventDefault(); loadSources(); });
		container.on('click', selectors.sourcesMode, function(e){ sourcesMode($(this)); });

		container.on('click', selectors.wsRefresh, function(e){ e.preventDefault(); loadWs(); });
		container.on('click', selectors.wsMode, function(e){ wsMode($(this)); });

		container.on('click', selectors.pingRefresh, function(e){ e.preventDefault(); loadPing(); });
		container.on('click', selectors.pingMode, function(e){ pingMode($(this)); });		
    } 
	function pingMode(btn){
		var attr = '';
		if($.defined(btn.attr('data-range'))){
			attr = 'data-range';
		}
		if($.defined(btn.attr('data-type'))){
			attr = 'data-type';
		}

		container.find(selectors.pingContainer).find(selectors.pingMode+'['+attr+']').removeClass('active');
		btn.addClass('active');		
		loadPing();
	}
	function loadPing(){ 
		var c = container.find(selectors.pingContainer);

		var range = c.find(selectors.pingMode+'[data-range]'+'.active').attr('data-range');
		if(!range)range=1;

		var type = c.find(selectors.pingMode+'[data-type]'+'.active').attr('data-type');
		if(!type)type=0;

		c.loading();
    	$.post(script,{action: 'getPingStats', range: range, type: type},function(json){
    		c.loading(false);
    		if(json.error){ $.error(json.error); }
    		else{    			    							
    			var html = Handlebars.compile(container.find(selectors.templates.ping).html());				
    			c.html(html(json));    	

				c.find(selectors.pingMode+'[data-range="'+range+'"]').addClass('active');		
				c.find(selectors.pingMode+'[data-type="'+type+'"]').addClass('active');		
    		}
    	},"json");
	}
	function loadWs(){ 
		var c = container.find(selectors.wsContainer);

		c.loading();
    	$.post(script,{action: 'getWeeklyScrape'},function(json){
    		c.loading(false);
    		if(json.error){ $.error(json.error); }
    		else{    			    							
    			var html = Handlebars.compile(container.find(selectors.templates.ws).html());				
    			c.html(html(json));
    			initLogChart(json.chartData.morris_chart,c);    						

				//c.find(selectors.logMode+'[data-mode="scrapes"]').addClass('active');
    		}
    	},"json");
	}



	function loadSources(){    			
    	var c = container.find(selectors.sourcesContainer);  		

		var range = c.find(selectors.sourcesMode+'.active').attr('data-range');
		if(!range)range=0;

		c.loading();
    	$.post(script,{action: 'getSourcesStats', range: range},function(json){
    		c.loading(false);
    		if(json.error){ $.error(json.error); }
    		else{    			    			
    			var html = Handlebars.compile(container.find(selectors.templates.sources).html());				
    			c.html(html(json));
    			initBarChart(json.chartData.morris_chart,c.find(selectors.sourcesChart));    										

				console.log(selectors.sourcesMode+'[data-range="'+range+'"]');
				c.find(selectors.sourcesMode+'[data-range="'+range+'"]').addClass('active');
    		}
    	},"json");
    }
	function sourcesMode(btn){
		container.find(selectors.sourcesContainer).find(selectors.sourcesMode).removeClass('active');
		btn.addClass('active');		
		loadSources();
	}
	function initBarChart(data,chart){    	
		var uid = generateUUID();
		
    	var options = {
				element: uid,
				data: data.morris_data,
    			xkey: 'x',
				stacked: true,
    			ykeys: data.morris_labels,     			
    			fillOpacity: ['0.1'],
    			labels: data.morris_labels,    			    		
    			//behaveLikeLine: true,
    			//gridLineColor: '#eef0f2',
    			hideHover: 'auto',
    			dataLabels: false,    			
    			resize: true, //defaulted to true

				//pointSize: 3,
                //lineWidth: 1,                                
                //hideHover: 'auto',
                //pointFillColors: data.morris_colors,
                //pointStrokeColors: data.morris_colors,
                //gridLineColor: '#eef0f2',
                barColors: data.morris_colors,
    	};    	    	    	    	
    	    		
		chart.attr('id',uid).empty();    	
    	Morris.Bar(options);    		    
    }

	

	function loadCrexi(){    	
    	var c = container.find(selectors.crexi);  		
		getTrafficData(c,'crexi.com');	     	        	    	    	
    }
	function loadCe(){    	
    	var c = container.find(selectors.ce);  		
		getTrafficData(c,'commercialexchange.com');	     	        	    	    	
    }
	function loadCentury(){    	
    	var c = container.find(selectors.century);  		
		getTrafficData(c,'century21.com');	     	        	    	    	
    }
	function loadLoopnet(){    	
    	var c = container.find(selectors.loopnet);  		
		getTrafficData(c,'loopnet.com');	     	        	    	    	
    }
	function loadMa(){    	
    	var c = container.find(selectors.ma);  		
		getTrafficData(c,'moodysanalytics.com');	     	        	    	    	
    }
	function logMode(btn){
		var c = btn.closest(selectors.logContainer);
		var mode = btn.attr('data-mode');
		var domain = btn.attr('data-domain');		
		renderLog(c,domain,mode);
	}
	function logRefresh(btn){
		var c = btn.closest(selectors.logContainer);
		var mode = c.find(selectors.logMode+'.active').attr('data-mode');		
		var domain = btn.attr('data-domain');		
		renderLog(c,domain,mode);
	}
	function renderLog(c,domain,mode){
		if(mode == 'scrapes'){
			getScrapesData(c,domain);	
		}
		else{			
			getTrafficData(c,domain);			
		}	
	}
	function getScrapesData(c,domain){ 
		c.loading();
    	$.post(script,{action: 'getScrapes', domain: domain},function(json){
    		c.loading(false);
    		if(json.error){ $.error(json.error); }
    		else{    			    			
				json.title = domain;
				json.domain = domain;
    			var html = Handlebars.compile(container.find(selectors.templates.log).html());				
    			c.html(html(json));
    			initLogChart(json.chartData.morris_chart,c);    						

				c.find(selectors.logMode+'[data-mode="scrapes"]').addClass('active');
    		}
    	},"json");
	}
	function getTrafficData(c,domain){
		c.loading();
    	$.post(script,{action: 'getTraffic', domain: domain},function(json){
    		c.loading(false);
    		if(json.error){ $.error(json.error); }
    		else{    			    							
				json.title = domain;
				json.domain = domain;
    			var html = Handlebars.compile(container.find(selectors.templates.log).html());				
    			c.html(html(json));
    			initLogChart(json.chartData.morris_chart,c);    						

				c.find(selectors.logMode+'[data-mode="traffic"]').addClass('active');
    		}
    	},"json");
	}
    function initLogChart(data,c){
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
    
});