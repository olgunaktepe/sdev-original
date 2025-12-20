$(document).ready(function () {
    var script = "ajax/php/widgets/phone_manager.php";
    var selectors = {                
        container           : '.widget-phone_manager',

        numbersContainer    : '.numbers-container',
        numbersSearchFrom	: '.numbers-search-form',
        numberSearch		: '.numbers-search-a',
        numbersItem			: '.numbers-item',
        numbersBuy          : '.numbers-buy-a',
        numbersToggle       : '.numbers-toggle-a',
        numbersForward      : '.numbers-forward-a',
        numberForwardCancel : '.numbers-froward-cancel-a',
        numbersEdit         : '.numbers-edit-a',
        numbersAssign       : '.numbers-assign-a',

        logContainer        : '.log-container',
        logSearchFrom	    : '.log-search-form',
        logSearch		    : '.log-search-a',
        logItem			    : '.log-item',   
        logTag              : '.log-tag-a', 
        loadRead            : '.log-read-a',    
        logPlay             : '.log-play-a',
        logConvo            : '.log-convo-a',
        logDeleteRecording  : '.log-delete-recording-a',

        logSmsFullContent   : '.log-sms-content-full',
        logSmsViewMore      : '.log-sms-more-a',

        activeContainer     : '.active-container',
        activeItem          : '.active-item',
        activeRefresh       : '.active-refresh-a',
        activeTsLabel       : '.active-ts-label',
        
        convoContainer      : '.convo-container',
        convoDetailsContainer:   '.convo-details-container',
        convoSendContainer  : '.convo-send-container',
        convoCallBtn        : '.convo-call-a',
        convoSmsBtn         : '.convo-sms-a',
        convoSmsBody        : '.convo-sms-body',
        convoSmsCounter     : '.convo-sms-counter',

        contactsSearchForm   : '.contacts-search-form',
        contactsSearch       : '.contacts-search-a',
        contactsContainer    : '.contacts-container',
        contactsSearchCount  : '.contacts-search-count',
        contactsAdd			 : '.contacts-create-a',
		contactsAddLookup	 : '.contacts-create-lookup-a',
		contactsEdit		 : '.contacts-edit-a',    		

        dialBtn				 : '.dial-btn-a',
		smsBtn				 : '.sms-btn-a',

        templates: {    
            numbersItem			: '#template-numbers-item',   
            numbersForward      : 'ajax/template/widgets/phone_manager/_forward.phtml',     
            numbersAssign       : 'ajax/template/widgets/phone_manager/_assign.phtml',     
            numbersEdit         : 'ajax/template/widgets/phone_manager/_edit.phtml',             
            logItem		    	: '#template-log-item',    
            activeItem          : '#template-active-item',   
            
            convoModal          : 'ajax/template/widgets/phone_manager/_convo.phtml',
            convoMsg            : '#template-convo-msg',
            convoDetails        : '#template-convo-details',

            contactsItem        : '#template-contacts-item',
            contactsAdd			: 'ajax/template/widgets/phone_manager/_contacts_create.phtml',
        }
    };
    var container = $('body').find(selectors.container);
    var globals = {};
    globals['listingId'] = container.attr('data-listing-id');
    var modal;    
    var contactsaip = false;
    var contactsScrollPosition = 0;
    var contactsPage = 0;

    bind();
    init();
  
    function bind () {
        $('body').on('dialer.buyNumberSuccess',function(){ loadNumbers(); })

        container.on('click', selectors.dialBtn, function(e){ e.preventDefault(); dialBtn($(this)); });	
		container.on('click', selectors.smsBtn, function(e){ e.preventDefault(); smsBtn($(this)); });	

        container.on('click',selectors.numbersBuy,function(e){e.preventDefault(); numbersBuy(); })
        container.on('click',selectors.logSearch,function(e){e.preventDefault(); loadLog(); })
        container.on('click',selectors.logTag,function(e){e.preventDefault(); logTagEdit($(this)); })
        container.on('click',selectors.loadRead,function(e){e.preventDefault(); logRead($(this)); })
        container.on('click',selectors.logPlay,function(e){e.preventDefault(); logPlay($(this)); })
        container.on('click',selectors.logSmsViewMore,function(e){e.preventDefault(); logSmsViewMore($(this)); })
        container.on('click',selectors.numbersToggle,function(e){e.preventDefault(); numbersToggle($(this)); })
        container.on('click',selectors.numbersForward,function(e){e.preventDefault(); numbersForward($(this)); })
        container.on('click',selectors.numberForwardCancel,function(e){e.preventDefault(); numberForwardCancel($(this)); })
        container.on('click',selectors.numbersEdit,function(e){e.preventDefault(); numbersEdit($(this)); })
        container.on('click',selectors.numbersAssign,function(e){e.preventDefault(); numbersAssign($(this)); })

        container.on('click',selectors.logDeleteRecording,function(e){e.preventDefault(); logDeleteRecording($(this)); })

        container.on('click',selectors.logConvo,function(e){e.preventDefault(); logConvo($(this)); })        
        container.on('click',selectors.convoCallBtn,function(e){e.preventDefault(); convoDial($(this)); })        
        container.on('click',selectors.convoSmsBtn,function(e){e.preventDefault(); convoSms($(this)); })     
        container.on('keyup',selectors.convoSmsBody,function(e){ updateConvoSmsCounter(); });           

        container.on('click',selectors.contactsSearch,function(e){e.preventDefault(); loadContacts(0); });
        container.on('click', selectors.contactsAdd, function(e){ e.preventDefault(); contactsAdd($(this)); });
		container.on('click', selectors.contactsAddLookup, function(e){ e.preventDefault(); contactsAddLookup($(this)); });
		container.on('click', selectors.contactsEdit, function(e){ e.preventDefault(); contactsEdit($(this)); });
        container.find(selectors.contactsContainer).scroll(function(e){ contactsScroll($(this)); });
    }
    function init(){     
        if(container.find(selectors.numbersContainer).length>0)loadNumbers();
        if(container.find(selectors.logContainer).length>0)loadLog();        
        if(container.find(selectors.activeContainer).length>0)loadActive();
        if(container.find(selectors.contactsContainer).length>0)loadContacts(0);        
    }
    function dialBtn(btn){
		var number = btn.attr('data-number');		        
		$(window).trigger('dialer.dial',{number: number});
	}
	function smsBtn(btn){
		var number = btn.attr('data-number');		
		$(window).trigger('dialer.sms',{number: number});
	}
    function updateConvoSmsCounter(){
        var input = container.find(selectors.convoSmsBody);
        var val = input.val();        
        var limit = 1600;

        if(val.length>limit){ val = val.substring(0, limit); input.val(val); }
        container.find(selectors.convoSmsCounter).text(val.length);
    }
    function convoDial(btn){
        var to = btn.attr('data-to');
        var from = btn.attr('data-from');
		var listingId = container.attr('data-listing-id');

        if(from.length<=0 || to.length<=0){
            $.error("Unexpected Error");
            return false;
        }

        modal.close();
		$(window).trigger('dialer.dial',{number: to, from: from, listingId: listingId});
    }
    function convoSms(btn){
        var to = btn.attr('data-to');
        var from = btn.attr('data-from');
		var listingId = container.attr('data-listing-id');
        var body = container.find(selectors.convoSmsBody).val();


        if(from.length<=0 || to.length<=0 || body.length<=0){
            $.error("Unexpected Error");
            return false;
        }
        
        modal.block();
        btn.button('loading');
        $(window).trigger('dialer.smsSend',{number: to, from: from, listingId: listingId, body: body, callback: function(){ 
            modal.release();
            btn.button('reset');
            loadConvo(modal.key,0); 
        }});        
    }
    function scrollConvo(){
        if(modal.convoLoading)return;

        var pos = container.find(selectors.convoContainer).scrollTop();

        if(pos == 0){
            modal.page++;            
            loadConvoMessages(modal.key,modal.page);
        }
    }
    function logConvo(btn){
        var key = btn.attr('data-key');

        modal = new Modal({
			parent: container,
			static: true,			
			title: 'Communications Log',
            size: '80%',
			template: selectors.templates.convoModal,	
            templateData: {key: key},
			callback: function(){
                loadConvo(key);
            },
			buttons: new Array(				                
				$('<button>').addClass('btn btn-default dialog-close').text('Close')				
			)
		});
    }
    function loadConvo(key){
        var c = container.find(selectors.convoDetailsContainer);

        c.loading(true);
        $.post(script+'?test',{action: 'getConvo', key: key},function(json){
            c.loading(false);            
            if(json.error){ c.html(json.error); }
            else{   
                var html = Handlebars.compile(container.find(selectors.templates.convoDetails).html());     
                c.html(html(json));                
                modal.key = key;
                modal.page = 0;
                loadConvoMessages(key,0);    
                    
                var callBtn = container.find(selectors.convoCallBtn);
                var smsBtn = container.find(selectors.convoSmsBtn);
                                
                if(json.own_number){
                    var from = json.own_number.number;
                    var to = json.remote_numbers[0].number;
                    var listingId = 0; //json.remote_numbers[0].listing_id;

                    console.log(from);

                    callBtn.attr('data-from',from);
                    //callBtn.attr('data-to',to);
                    callBtn.attr('data-listing-id',listingId);

                    smsBtn.attr('data-from',from);
                    smsBtn.attr('data-to',to);
                    smsBtn.attr('data-listing-id',listingId);
                }
                else{                
                    container.find(selectors.convoSendContainer).hide();
                    container.find(selectors.callBtn).hide();                                                             
                }                                  
            }
        },"json");
    }
    function loadConvoMessages(key,page){
        var c = container.find(selectors.convoContainer);
        c.css('height',($(window).height()-200)+'px');      

        if(page == 0)c.html('');

        modal.convoLoading = true;
        c.loading(true);
        $.post(script+'?test',{action: 'getConvoMessages', key: key, page: page},function(json){
            c.loading(false);            
            modal.convoLoading = false;
            if(json.error){ $.error(json.error); }
            else{   
                var html = Handlebars.compile(container.find(selectors.templates.convoMsg).html());     
                $.each(json.items,function(k,el){                    
                    c.prepend(html(el));
                })    
                
                if(page==0){
                    setTimeout(function(){ c.scrollTop(c.prop("scrollHeight")); },200);
                    setTimeout(function(){ c.scrollTop(c.prop("scrollHeight")); },500);
                }
                else{
                    setTimeout(function(){ c.scrollTop(20); },200);
                    setTimeout(function(){ c.scrollTop(20); },500);
                }
                
                c.scroll(function (event) { scrollConvo(); })
            }
        },"json");
    }

    function numbersEdit(btn){
        var id = btn.closest(selectors.numbersItem).attr('data-id');

        modal = new Modal({
			parent: container,
			static: true,			
			title: 'Edit Phone Number Settings',
			template: selectors.templates.numbersEdit,	
            templateData: {id: id},
			callback: function(){ },
			buttons: new Array(				
                $('<button>').addClass('btn btn-success').text('Update Settings').click(function(){
                    var btn = $(this)
                    var form = modal.modal.find('form');
                            
                    modal.block();
                    btn.button('loading');
                    $.post(script,form.serialize(),function(json){
                        modal.release();
                        btn.button('reset');
                        if(json.error){ $.error(json.error); }
                        else{        
                            modal.close();
                            loadNumbers();
                            $.notify("Phone number settings upated!");
                        }
                    },"json");

                }),
				$('<button>').addClass('btn btn-default dialog-close').text('Cancel')				
			)
		});
    }
    function numbersToggle(btn){
        var type = btn.attr('data-type');  
        var id = btn.closest(selectors.numbersItem).attr('data-id');

        $.post(script,{action: 'toggleNumberSetting', type: type, id: id}, function(json){
            if(json.error){ $.error(json.error); }
            else{
                if(btn.hasClass('active')){
                    btn.addClass('btn-outline-secondary').removeClass('btn-white').removeClass('btn-success').removeClass('active');
                }
                else{
                    btn.removeClass('btn-outline-secondary').addClass('btn-white').addClass('btn-success').addClass('active');
                }
            }
        },"json");
    }
    function numberForwardCancel(btn){
        var id = btn.attr ('data-id');
        
        btn.button('loading');        
        $.post(script,{action: 'cancelForward', id: id},function(json){
            btn.button('reset');
            if(json.error){ $.error(json.error); }
            else{        
               modal.close();
               loadNumbers();
            }
        },"json");
    }
    function numbersForward(btn){
        var id = btn.closest(selectors.numbersItem).attr('data-id');

        modal = new Modal({
			parent: container,
			static: true,			
			title: 'Forward Phone Number',
			template: selectors.templates.numbersForward,	
            templateData: {id: id},
			callback: function(){ },
			buttons: new Array(				
                $('<button>').addClass('btn btn-success').text('Forward Number').click(function(){
                    var btn = $(this)
                    var form = modal.modal.find('form');
                            
                    modal.block();
                    btn.button('loading');
                    $.post(script,form.serialize(),function(json){
                        modal.release();
                        btn.button('reset');
                        if(json.error){ $.error(json.error); }
                        else{        
                            modal.close();
                            loadNumbers();
                            $.notify("Phone number settings upated!");
                        }
                    },"json");

                }),
				$('<button>').addClass('btn btn-default dialog-close').text('Cancel')				
			)
		});
    }

    function numbersAssign(btn){
        var id = btn.closest(selectors.numbersItem).attr('data-id');

        modal = new Modal({
			parent: container,
			static: true,			
			title: 'Assign Phone Number',
			template: selectors.templates.numbersAssign,	
            templateData: {id: id},
			callback: function(){ },
			buttons: new Array(				
                $('<button>').addClass('btn btn-success').text('Assign Number').click(function(){
                    var btn = $(this)
                    var form = modal.modal.find('form');
                            
                    modal.block();
                    btn.button('loading');
                    $.post(script,form.serialize(),function(json){
                        modal.release();
                        btn.button('reset');
                        if(json.error){ $.error(json.error); }
                        else{        
                            modal.close();
                            loadNumbers();
                            $.notify("Phone number settings upated!");
                        }
                    },"json");

                }),
				$('<button>').addClass('btn btn-default dialog-close').text('Cancel')				
			)
		});
    }

    function numbersBuy(){
        $('body').trigger('dialer.buyNumber');
    }
    function loadNumbers(){   	
    	var params = {};    	
    	params.pageLength = 10;
		var btn = container.find(selectors.numberSearch);
    	
        var itemTemplate = container.find(selectors.templates.numbersItem).html();
        var c = container.find(selectors.numbersContainer);
        var form = container.find(selectors.numbersSearchFrom);

		btn.button('loading');
        ajaxDataTableInit(c,form,itemTemplate,script,params,function(data){ btn.button('reset'); });            
    }


    function logSmsViewMore(btn){
        var item = btn.closest(selectors.logItem);
        var content = item.find(selectors.logSmsFullContent).text();        

        modal = new Modal({
			parent: container,
			static: true,			
			title: 'View SMS',
			content: content,
			buttons: new Array(				
				$('<button>').addClass('btn btn-default dialog-close').text('Done')				
			)
		});
    }
    function loadLog(){   	
    	var params = {};    	
    	params.pageLength = 10;
		var btn = container.find(selectors.logSearch);
    	
        var itemTemplate = container.find(selectors.templates.logItem).html();
        var c = container.find(selectors.logContainer);
        var form = container.find(selectors.logSearchFrom);
  
		btn.button('loading');
        ajaxDataTableInit(c,form,itemTemplate,script,params,function(data){ btn.button('reset'); });            
    }
    function logDeleteRecording(btn){
        if(!confirm("Are you sure you want to delete this recording? This can not be undone"))return;

        var sid = btn.attr('data-sid');        

        btn.button('loading');
        $.post(script,{action: 'deleteRecording', sid: sid},function(json){
            btn.button('reset');
            if(json.error){ $.error(json.error); }
            else{        
               btn.parent().fadeOut();       
            }
        },"json");
    }
    function logTagEdit(btn){
        var sid = btn.attr('data-id');        
        $('body').trigger('dialer.dialpadTagEdit',{sid: sid});
    }
    function logRead(btn){
        var item = btn.closest(selectors.logItem);
        var id = item.attr('data-id');
        var btn = item.find(selectors.loadRead);

        btn.button('loading');
        $.post(script,{action: 'readLog', id: id},function(json){
            btn.button('reset');
            if(json.error){ $.error(json.error); }
            else{        
               btn.fadeOut();       
            }
        },"json");

    }
    function logPlay(btn){
        var sid = btn.attr('data-sid');

        btn.button('loading');
        $.post(script,{action: 'getRecordingUrl', sid: sid},function(json){
            btn.button('reset');
            if(json.error){ $.error(json.error); }
            else{        
                logRead(btn);
               btn.replaceWith('<audio autoplay=1 controls><source src="'+json.url+'" type="audio/mpeg">Your browser does not support the audio element.</audio>');               
            }
        },"json");
    }

    //Active
    function loadActive(){
        var btn = container.find(selectors.activeRefresh);
        var label = container.find(selectors.activeTsLabel);
        var c = container.find(selectors.activeContainer);
    
        if(c.length<=0)return false;

        //btn.button('loading');
        $.post(script,{action: 'loadActiveConvos', listingId: globals['listingId']},function(json){
            //btn.button('reset');
            if(json.error){ $.error(json.error); }
            else{       
                c.html(''); 
                var html = Handlebars.compile(container.find(selectors.templates.activeItem).html());
                if(json.calls.length>0){
                    $.each(json.calls,function(k,el){
                        console.log(el);
                        c.append(html(el));                    
                    })                
                }
                else{
                    c.html("<br>   No active conversations");
                }                
                label.text("Last Update: "+new Date().toDateString()+" "+new Date().toLocaleTimeString());
            }

            setTimeout(function(){ loadActive(); },1000);
        },"json");
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
			templateData: { id: id },
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
							loadContacts(0);	
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
							loadContacts(0);		
							modal.close();				
						}
					},"json");					
				}),
				$('<button>').addClass('btn btn-default dialog-close').text('Cancel')				
			)
		});
	}
    function contactsScroll(obj){		        
		if(contactsaip == true)return false;		
		
		if(obj.scrollTop() + obj.innerHeight()+1 >= obj[0].scrollHeight && obj.scrollTop()>contactsScrollPosition) {
            contactsaip = true;
			loadContacts(contactsPage+1);			
		}
		contactsScrollPosition = obj.scrollTop();		
	}
    function loadContacts(page){   	
        var c = container.find(selectors.contactsContainer);
        var form = container.find(selectors.contactsSearchForm);
        var btn = container.find(selectors.contactsSearch);
        var count = container.find(selectors.contactsSearchCount);

        var data = form.serializeObject();
        data.page = page;
        contactsPage = page;

        if(page == 0){
            count.text(0);
            c.html('');
        }

        console.log("loading button");
        btn.button('loading');
        $.post(script,data,function(json){
            console.log("reset button");
            btn.button('reset');

            if(json.error) $.error(json.error);
            else{
                var html = Handlebars.compile(container.find(selectors.templates.contactsItem).html());

                $.each(json.items,function(k,el){                    
                    c.append(html(el));
                });
                count.text(json.total);

                contactsaip = false;
            }
        },"json");
    }
    
});