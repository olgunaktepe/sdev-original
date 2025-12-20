$(document).ready(function () {
    var script = "ajax/php/dups.php";
    var selectors = {
        container			: ".page-dups",

		test				: '.test-a',
		testInput			: '.test-input',
		testResContainer	: '.test-res-container',
		
        configContainer		: ".config-container",
		configAdd			: ".config-add-a",	
		configRemove		: ".config-remove-a",	
		configSave			: ".config-save-a",		
		
		dupsContainer		: '.dups-container',
		dupsSearch			: '.dups-search-a',
		dupsForm			: '.dups-form',	
        
	
        templates: {                    	
        	config			: "#template-config",
			configAdd		: "ajax/template/dups/_config_add.phtml",
			listingItem		: "#template-listing-item",

			dupsItem		: "#template-dups-item",

			testRes			: "ajax/template/dups/_test.phtml",
        },
	}    
    var container = $(selectors.container);  
	var configContainer = container.find(selectors.configContainer);  
    var modal;
	var config;

    init();
    bind();

    function init() {    	
    	loadConfig();
		loadDups();
    }

    function bind() {				
		container.on('click',selectors.dupsSearch,function(e){ e.preventDefault(); loadDups($(this)); });	
		container.on('click',selectors.test,function(e){ e.preventDefault(); testModal($(this)); });	
		container.on('click',selectors.configAdd,function(e){ e.preventDefault(); configAdd($(this)); });	
		container.on('click',selectors.configRemove,function(e){ e.preventDefault(); configRemove($(this)); });	
		container.on('click',selectors.configSave,function(e){ e.preventDefault(); configSave($(this)); });	
		configContainer.on('change','input,select',function(e){ e.preventDefault(); configDirty($(this)); });	
    }
	function loadDups(){		
		var params = {};    	
		params.pageLength = 10;
		var btn = container.find(selectors.dupsSearch);
			
		var itemTemplate = container.find(selectors.templates.dupsItem).html();
		var c = container.find(selectors.dupsContainer);
		var form = container.find(selectors.dupsForm);
	  
		btn.button('loading');
		ajaxDataTableInit(c,form,itemTemplate,script,params,function(data){ btn.button('reset'); });        		
	}
	function configSave(){			
		$.post(script,{action: 'saveConfig', config: config},function(json){
			if(json.error){ $.error(json.error); }
			else{
				config.save_pending=0;
				renderConfig();
			}
		});
	
	}
	function configDirty(input){	
		var name = input.attr('name');
		if(name.indexOf('weights')>=0){
			var key = input.attr('name').replace('weights[','').replace(']','');
			config.weights[key] = input.val();
		}
		else{
			config[name] = input.val();
		}

		if(config.save_pending>0)return;
		config.save_pending=1;	
		renderConfig();
	}
	function loadConfig(){
		var c = container.find(selectors.configContainer);
		c.html('loading...');
		$.post(script,{action: 'getConfig'},function(json){
			if(json.error){ c.html(json.error); }
			else{				
				config = json;
				renderConfig();
			}
		},"json");
	}
	function renderConfig(){
		var c = container.find(selectors.configContainer);
		var html = Handlebars.compile(container.find(selectors.templates.config).html());
		c.html(html(config));
	}
	function configRemove(btn){
		var type = btn.attr('data-type');
		var key = btn.attr('data-key');
		if(type == 'match'){
			var index = config.auto_match[0].conditions.findIndex(function(e){ return e[0]+'_'+e[1]+'_'+e[2] == key; });
			config.auto_match[0].conditions.splice(index,1);
		}
			
		if(type == 'mismatch'){
			var index = config.auto_mismatch[0].conditions.findIndex(function(e){ return e[0]+'_'+e[1]+'_'+e[2] == key; });
			config.auto_mismatch[0].conditions.splice(index,1);
		}			
		config.save_pending=1;
		renderConfig();	
	}
	function configAdd(btn){
		var type = btn.attr('data-type');

		modal = new Modal({
			parent: container,
			size: '700px',
			static: true,			
			title: 'Add Auto-match Rule',
			template: selectors.templates.configAdd,				
			callback: function(){},
			buttons: new Array(
				$('<button>').addClass('btn btn-primary').text("Add Rule").click(function(e){
					var btn = $(this);
					var form = modal.modal.find('form');																						
					if (!form[0].reportValidity())return false;															
														
					var data = form.serializeObject();
					if(type == 'match')
						config.auto_match[0].conditions.push([data.score,data.op,data.value]);
					if(type == 'mismatch')
						config.auto_mismatch[0].conditions.push([data.score,data.op,data.value]);
					config.save_pending=1;
					renderConfig();
					modal.close();
				}),
			
				$('<button>').addClass('btn btn-default dialog-close').text('Cancel'))
		});
	}
	function testModal(btn){
		var id = container.find(selectors.testInput).val();
		btn.button('loading');
		$.post(script,{action: 'testListing', id: id, config: config},function(json){
			btn.button('reset');
			if(json.error){ $.error(json.error); }
			else{				
				modal = new Modal({
					parent: container,
					static: true,	
					size: '100%',		
					title: 'Test',
					template: selectors.templates.testRes,
					templateData: {},
					callback: function(){ 						
						var c = modal.modal.find(selectors.testResContainer);
						var html = Handlebars.compile(container.find(selectors.templates.listingItem).html());
						$.each(json.items,function(i,v){
							c.append(html(v));							
						});
					},
					buttons: new Array($('<button>').addClass('btn btn-default dialog-close').text('Cancel'))
				});
			}
		},"json");		
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