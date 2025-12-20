$(document).ready(function () {
    var script = "ajax/php/scrapedemails.php";
    var selectors = {
        container			: ".page-scrapedemails",
		
        emails				: '.emails-container',
        searchFrom			: '.search-form',
        search				: '.search-a',
        item				: '.emails-item',
		                           
        summary				: '.summary-container',                
        
        viewMturk			: '.view-mturk-a',
        
        
        
        
        
        
        updates				: '.updates-a',
        score				: '.score-a',
        export				: '.export-a',
        
        updatesSearch		: '.updates-search-a',
        updatesContainer	: '.updates-container',
        updatesForm			: '.updates-form',
        
        detailsContainer	: '.details-container',
        detailsForm			: '.details-form',
        
	
        templates: {                    	
        	item			: '#template-emails-item',
        	summary			: '#template-summary',
        	mturk			: 'ajax/template/scrapedemails/_mturk_details.phtml',
        	
        	
        	updates			: 'ajax/template/emails/_updates.phtml',        	
        	updatesItem		: '#template-updates-item',
        },
	}    
    var container = $(selectors.container);    
    var modal;

    init();
    bind();

    function init() {    	
    	loadSummary();
    	search();
    }

    function bind() {
		container.find(selectors.search).click(function(e){ e.preventDefault(); search($(this)); });		
		
		container.on('click',selectors.viewMturk,function(e){ e.preventDefault(); viewMturk($(this)); });
		
		
		
		
		container.on('click',selectors.score,function(e){ e.preventDefault(); viewScore($(this)); });
		container.on('click',selectors.updates,function(e){ e.preventDefault(); updates($(this)); });
		container.on('click',selectors.updatesSearch,function(e){ e.preventDefault(); updatesSearch(); });
		container.on('click',selectors.export,function(e){ e.preventDefault(); exportModal($(this)); });
		
		container.on('change',selectors.detailsForm+' select',function(e){ e.preventDefault(); updateDetails(); });
    }
    function exportModal(btn){
    	window.open(script+"?action=export&sql="+btn.attr('data-sql'),"Generating Export File","width=550,height=170,left=150,top=200,toolbar=0,status=0,")    	    
    }
    function updatesSearch(){
    	var params = {};    	
    	params.pageLength = 10;
    	
        var itemTemplate = container.find(selectors.templates.updatesItem).html();
        var c = container.find(selectors.updatesContainer);
        var form = container.find(selectors.updatesForm);  
        
        ajaxDataTableInit(c,form,itemTemplate,script,params);
    }
    function updates(btn){
    	var id = btn.closest(selectors.item).attr('data-remote-id');

    	modal = new Modal({
			parent: container,
			size: '80%',
			static: true,			
			title: 'View Update',
			template: selectors.templates.updates,	
			templateData: {id: id},
			callback: function(){ updatesSearch(); },
			buttons: new Array($('<button>').addClass('btn btn-default dialog-close').text('Done'))
		});    	    
    }
    function search() {    	
    	var params = {};    	
    	params.pageLength = 10;
		var btn = container.find(selectors.search);
    	
        var itemTemplate = container.find(selectors.templates.item).html();
        var c = container.find(selectors.emails);
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
    function viewMturk(btn){
    	var id = btn.closest(selectors.item).attr('data-id');    	
    	    	    	
    	modal = new Modal({
			parent: container,
			size: '80%',
			static: true,			
			title: 'View Data',
			template: selectors.templates.mturk,	
			templateData: {id: id},		
			callback: function(){  },
			buttons: new Array($('<button>').addClass('btn btn-default dialog-close').text('Cancel'))
		});
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