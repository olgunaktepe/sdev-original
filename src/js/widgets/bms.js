$(document).ready(function () {
    var script = "ajax/php/widgets/bms.php";
    var selectors = {
        container			: ".widget-bms",
		
        btn					: '.bms-a',
		get					: '.bms-get-a',
		
		zhvi				: '.bms-zhvi-container',
		zhviChart			: '.bms-zhvi-chart',
        
	
        templates: {                    	
			modal			: 'ajax/template/widgets/bms/_modal.phtml',        	        	
        	
        	zhvi			: '#template-zhvi',        	
        },
	}    
    var container = $(selectors.container);    
    var modal;

    init();
    bind();

    function init() {    	
		google.load('visualization', '1', {packages:['corechart'], callback: {}});    	
    }

    function bind() {							
		container.on('click',selectors.btn,function(e){ e.preventDefault(); bmModal($(this)); });
		container.on('click',selectors.get,function(e){ e.preventDefault(); getBms($(this)); });
	}
	function getBms(btn){
		var data = modal.modal.find(':input').serialize();
		var c = modal.modal.find(selectors.results);    	

		modal.block();
    	btn.button('loading');
    	$.post(script,data,function(json){    		
			modal.release();
			btn.button('reset');
    		if(json.error){ $.error(json.error); }
    		else{    			    			
    			if(json.zhvi){
					renderZHVI(json.zhvi);
				}
    		}
    	},"json");
    }
    function bmModal(btn){
    	modal = new Modal({
			parent: container,
			size: '80%',
			static: true,			
			title: 'Benchmarks Tool',
			template: selectors.templates.modal,				
			callback: function(){				
				modal.modal.find('.select2-container').css('width','100%');
			},
			buttons: new Array($('<button>').addClass('btn btn-default dialog-close').text('Done'))
		});    	    
    }
	function renderZHVI(data){		
		var c = modal.modal.find(selectors.zhvi);
		var html = Handlebars.compile(container.find(selectors.templates.zhvi).html());
		console.log(data);
		c.html(html(data));

		var chartData = [];
		$.each(data,function(k,vals){
			chartData.push([k,parseFloat(vals.min),parseFloat(vals.median),parseFloat(vals.max)])
		});		

		drawBmChart(modal.modal.find(selectors.zhviChart),chartData);
	}

	function drawBmChart(c,chartData) {		
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Category');
		data.addColumn('number', 'Min');
		data.addColumn('number', 'Median');
		data.addColumn('number', 'Max');
		
		console.log(chartData);
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







    function search() {    	
    	var params = {};    	
    	params.pageLength = 10;
		var btn = container.find(selectors.search);
    	
        var itemTemplate = container.find(selectors.templates.item).html();
        var c = container.find(selectors.listings);
        var form = container.find(selectors.searchFrom);
  
		btn.button('loading');
        ajaxDataTableInit(c,form,itemTemplate,script,params,function(data){ btn.button('reset'); updateExport(data); });        
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