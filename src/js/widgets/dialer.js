$(document).ready(function () {
    var script = "ajax/php/widgets/dialer.php";
    var selectors = {
        container			: ".widget-dialer",
        
        dial                : '#dial-btn',        
        //initBtn             : '.dialer-init-a',
        dialpad             : '#dialer-keypad',
        dialpadPanel        : '.dialpad-panel',
        dialpadStatus       : '.dialpad-status',
        dialpadTimerLabel   : '.dialpad-timer',
        dialpadTocall       : '.dialpad-tocall',
        dialpadHangup       : '.dialpad-hangup-a',
        dialpadAccept       : '.dialpad-accept-a',
        dialpadReject       : '.dialpad-reject-a',
        dialpadMute         : '.dialpad-mute-a',
        dialpadRecord       : '.dialpad-record-a',
        dialpadTagCall      : '.dialpad-tag-call-a',
        dialpadSummaryClose : '.dialpad-summary-close-a',
        dialpadDigit        : '.dial-digit',
        
        dialpadBuy          : '.dialpad-buy-a',
        dialpadBuySearch    : '.dialpad-buy-search-a',
        dialpadBuyRes       : '.dialpad-buy-search-res',
        dialpadBuyBtn       : '.dialpad-buy-res-a',

        dialpadCallerId     : '.dialpad-callerid-selector',
        dialpadNumberRelease: '.dialpad-number-release-a',

        dialpadSmsBody      : '.dialpad-sms-body',
        dialpadSmsNumber    : '.dialpad-tosms',
        dialpadSmsSend      : '.dialpad-sms-send-a',
        dialpadSmsCounter   : '.dialpad-sms-counter',       
        dialpadSmsListingId : '.dialpad-tosms-listing-id', 

        dialerToggle        : '.dialer-toggle',

        dialpadTagListingInput : '.listing-autocomplete',
        dialpadTagListingRes   : '.listing-autocomplete-res',
		     
        templates: {                    	
			dialpadBuyRes   : '#dialpad-buy-search-res',
            buy			    : 'ajax/template/widgets/dialer/_buy.phtml',
            configNumber    : 'ajax/template/widgets/dialer/_configure_number.phtml',
            tagCall         : 'ajax/template/widgets/dialer/_tag_call.phtml',

            dialpadListingAutocompleteItems: '#template-autocomplete-res',
        },
	}    
    var container = $(selectors.container);    
    var modal;
    var call = false;
    var device = false;
    var dialer = {};
    var panels = [];
    var heartbeat = false;
    var dialpad = container.find(selectors.dialpad);

    init();
    bind();

    function init() {   
        initDialpadPanels();
        loadCallerIds();       
    }

    function bind() {	
        $(window).on("switchDialpadPanel", function(e, panel) { switchDialpadPanel(panel); });
        
        $(window).on("beforeunload", function() { uninitDialer(); });
        $(window).on("dialer.buyNumber", function() { buyNumber(); });
        $(window).on("dialer.configNumber", function(e, input) { configureNumber(input.sid); });
        $(window).on("dialer.dialpadTagEdit", function(e, input) { dialpadTagEdit(input.sid); });
        $(window).on("dialer.dial", function(e, input) { startDial(input); });        
        $(window).on("dialer.sms", function(e, input) { startSms(input); });       
        $(window).on("dialer.smsSend", function(e, input) { smsSend(input); });       

        container.on('click',selectors.dialpadHangup,function(e){ e.preventDefault(); hangupCall($(this)); });
        container.on('click',selectors.dialpadMute,function(e){ e.preventDefault(); toggleMute($(this)); });
        container.on('click',selectors.dialpadRecord,function(e){ e.preventDefault(); toggleCallRecording($(this)); });
        container.on('click',selectors.dialpadTagCall,function(e){ e.preventDefault(); dialpadTagCall($(this)); });
        container.on('click',selectors.dialpadSummaryClose,function(e){ e.preventDefault(); dialpadSummaryClose($(this)); });
        container.on('click',selectors.dialpadAccept,function(e){ e.preventDefault(); acceptIncomingCall($(this)); });
        container.on('click',selectors.dialpadReject,function(e){ e.preventDefault(); rejectIncomingCall($(this)); });
        container.on('change',selectors.dialpadCallerId,function(e){ container.find(selectors.dialpadCallerId).val($(this).val()); });
        container.on('click',selectors.dialpadDigit,function(e){ e.preventDefault(); dialpadDigit($(this)); });

        						
		container.on('click',selectors.dial,function(e){ e.preventDefault(); makeOutgoingCall(); });
        container.on('click',selectors.dialpadBuy,function(e){ e.preventDefault(); buyNumber(); });
        $('body').on('click',selectors.dialpadBuySearch,function(e){ e.preventDefault();  buyNumberSearch($(this)); });
        $('body').on('click',selectors.dialpadBuyBtn,function(e){ e.preventDefault();  buyNumberSubmit($(this)); });
        $('body').on('click',selectors.dialpadNumberRelease,function(e){ e.preventDefault(); releaseNumber($(this)); });

        container.on('click',selectors.dialpadSmsSend,function(e){ e.preventDefault(); dialpadSmsSend($(this)); });
        container.on('keyup',selectors.dialpadSmsBody,function(e){ updateSmsCounter(); });        
        container.on('change',selectors.dialpadSmsNumber,function(e){ dialpadClearSmsListingId(); });

        container.on('click',selectors.dialerToggle,function(e){ e.preventDefault(); dialerToggle(); });

        $('body').on('keyup',selectors.dialpadTagListingInput,function(e){ listingAutocompleteSearch(); });       
        
        
	}
    function dialpadDigit(btn){
        var digit = btn.attr('data-digit');
        if (!isActiveCall()) return;

        call.sendDigits(digit);
    }
    function startDial(input){
        //input.number = '3237158388';

        container.find(selectors.dialpadTocall).val(input.number);
        if(!input.from)input.from = dialer.callerIds[0];                    
        container.find(selectors.dialpadCallerId).val(input.from);

        dialerToggle('active'); 
        makeOutgoingCall(input);
    }
    function startSms(input){
        //input.number = '3237158388';

        container.find(selectors.dialpadSmsNumber).val(input.number);
        if(!input.from){
            input.from = dialer.callerIds[0];
            container.find(selectors.dialpadCallerId).val(input.from);
        }        

        dialerToggle('active'); 
        setTimeout(function(){ container.find('[href="#sms"]').click(); },50);        
        setTimeout(function(){ container.find(selectors.dialpadSmsBody).focus(); },100);                
        if(input.listingId)container.find(selectors.dialpadSmsListingId).show().attr('data-id',input.listingId);        
    }
    function dialpadClearSmsListingId(){
        container.find(selectors.dialpadSmsListingId).hide().attr('data-id','');
    }


    function timerStart(){		
		call.timer = moment().unix();
		setInterval(function(){ timerUpdate(); }, 1000);
	}
	function timerStop(){
		call.timer = null;
		container.find(selectors.dialpadTimerLabel).text('');
	}
	function timerReset(){
		timerStop();
		timerStart();
	}
	function timerUpdate(){
		var time = moment().unix();
		var duration = moment.duration((time-call.timer)*1000, 'milliseconds');	
        duration = moment(duration._data).format("HH:mm:ss");
        
		container.find(selectors.dialpadTimerLabel).text(duration);
        call.timerDuration = duration;
	}
    function initDialpadPanels(){
        container.find(selectors.dialpadPanel).each(function(){ 
            var panel = $(this);
            panels[panel.attr('data-type')] = panel.html();
            panel.html('');
        });        
        switchDialpadPanel('dialpad');        
    }
    function switchDialpadPanel(type,input){
        dialpadClearSmsListingId();

        var data = '';
        if(input){
            data = jQuery.extend({}, input);
            if(input.customParameters)data.customParameters = Object.fromEntries(input.customParameters);        
        }                
        container.find(selectors.dialpadPanel).hide();        

        var html = Handlebars.compile(panels[type]);
        container.find(selectors.dialpadPanel).filter(function(){ return $(this).attr('data-type')==type; }).html(html(data)).show();               
        if(type == 'dialpad'){
            loadCallerIds();
        }
    }
    function dialpadSummaryClose(){
        switchDialpadPanel('dialpad'); 
        dialerToggle('inactive');       
    }
    function loadCallerIds(){         
        var c = container.find(selectors.dialpadCallerId);
        dialer.callerIds = [];

        $.post(script,{action: 'loadCallerIds'},function(json){            
            if(json.error){ $.error(json.error); }
            else{        
                c.html('<option value="">Select Caller ID...</option>');
                $.each(json.items,function(k,l){                         
                    c.append('<option value="'+l.number+'">'+l.title+'</option>');
                    dialer.callerIds.push(l.number);

                });
            }
        },"json");
    }
    function releaseNumber(btn){
        if(!confirm("Are you sure you want to release this phone number? This action can't be undone"))return;

        modal.block();
        var sid = btn.attr('data-sid');

        btn.button('loading');
        $.post(script,{action: 'releaseNumber', sid: sid},function(json){            
            btn.button('reset');
            modal.release();
            if(json.error){ $.error(json.error); }
            else{      
                $.notify("Phone number released!");
                modal.close();                  
                loadCallerIds();
            }
        },"json");
    }
    function buyNumber(){
        modal = new Modal({
			parent: $('body'),
			static: true,			
			title: 'Buy a New Phone Number',
			template: selectors.templates.buy,	
			callback: function(){ },
			buttons: new Array(				
				$('<button>').addClass('btn btn-default dialog-close').text('Cancel')				
			)
		});
    }
    function buyNumberSubmit(btn){
        var id = btn.attr('data-id');

        modal.block();
        btn.button('loading');
        $.post(script,{action: 'buyNumber', number: id},function(json){
            modal.release();
            btn.button('reset');
            if(json.error){ $.error(json.error); }
            else{        
                modal.close();
                loadCallerIds();
                setTimeout(function(){
                    configureNumber(json.sid);                
                },200);
                $('body').trigger('dialer.buyNumberSuccess');
            }
        },"json");
    }
    function configureNumber(sid){
        modal = new Modal({
			parent: $('body'),
			static: true,			
			title: 'Configure Phone Number',
			template: selectors.templates.configNumber,	
            templateData: {sid: sid},
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
                            $.notify("Phone number settings upated!");
                        }
                    },"json");

                }),
				$('<button>').addClass('btn btn-default dialog-close').text('Cancel')				
			)
		});
    }
    function buyNumberSearch(btn){       
        var form = modal.modal.find('form');
        
        var c = modal.modal.find(selectors.dialpadBuyRes);
        c.html('loading...');
        btn.button('loading');
        $.post(script,form.serialize(),function(json){
            btn.button('reset');
            if(json.error){ c.html('Error: '+json.error); }
            else{        
                var html = Handlebars.compile(container.find(selectors.templates.dialpadBuyRes).html());        
                c.html(html(json.number));
            }
        },"json");
    }

    function updateSmsCounter(){
        var input = container.find(selectors.dialpadSmsBody);
        var val = input.val();        
        var limit = 1600;

        if(val.length>limit){ val = val.substring(0, limit); input.val(val); }
        container.find(selectors.dialpadSmsCounter).text(val.length);

    }
    function smsSend(input){
        var data = {
            action: 'sendSms',
            body: input.body,
            number: input.number,
            from: input.from,
            listingId: input.listingId
        };
        if(input.btn)input.btn.button('loading');
        $.post(script,data,function(json){
            if(input.btn)input.btn.button('reset');
            if(json.error){ $.error(json.error); }
            else{                        
                if(input.callback){
                    input.callback();
                }       
            }
        },"json");
    }
    function dialpadSmsSend(btn){
        var data = {
            action: 'sendSms',
            body: container.find(selectors.dialpadSmsBody).val(),
            number: container.find(selectors.dialpadSmsNumber).val(),
            from: container.find(selectors.dialpadCallerId).val(),            
            listingId: container.find(selectors.dialpadSmsListingId).attr('data-id')
        };
        
        btn.button('loading');
        $.post(script,data,function(json){
            btn.button('reset');
            if(json.error){ $.error(json.error); }
            else{                        
                $.notify("SMS Sent");
                container.find(selectors.dialpadSmsBody).val('');
                container.find(selectors.dialpadSmsNumber).val('');
                dialpadClearSmsListingId();
                dialerToggle('inactive');                
            }
        },"json");
    }







    function dialpadTagCall(btn){
        var sid = btn.attr('data-sid');
        switchDialpadPanel('dialpad');  
        dialerToggle('inactive');
        dialpadTagEdit(sid);
    }
    function dialpadTagEdit(sid){    
        modal = new Modal({
			parent: $('body'),
			static: true,			
			title: 'Tag Call',
			template: selectors.templates.tagCall,	
            templateData: {sid: sid},
			callback: function(){  },
			buttons: new Array(				
                $('<button>').addClass('btn btn-success').text('Update Tags').click(function(){
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
                            $.notify("Call tagged");
                        }
                    },"json");

                }),
				$('<button>').addClass('btn btn-default dialog-close').text('Cancel')				
			)
		});
    }
    function listingAutocompleteSearch(){    
        var input = modal.modal.find(selectors.dialpadTagListingInput);        
        var c = modal.modal.find(selectors.dialpadTagListingRes);  
        var q = input.val();

        if(q == modal.modal.req_q)return false;
        if(modal.modal.req)modal.modal.req.abort();   
        
        modal.modal.req_q = q;          
        
        c.loading(true);
        var req = $.post(script,{action: 'listingAutocomplete', q: q},function(json){
            c.loading(false);
            if(json.error){ c.html('Error: '+json.error); }
            else{        
                var html = Handlebars.compile(container.find(selectors.templates.dialpadListingAutocompleteItems).html());
                c.html(html(json));
            }
        },"json");
        modal.modal.req = req;
    }
    
    function dialerToggle(forceState){
        dialpadClearSmsListingId();

        if(forceState){
            if(forceState=='inactive')container.removeClass('active');
            if(forceState=='active')container.addClass('active');
            return;            
        }
        
        if(container.hasClass('active')){
            container.removeClass('active');
        }
        else{            
            if(device == false)initDialer();
            else container.addClass('active');            
        }
    }
    function initDialer(){   
        var activeId = localStorage.getItem('dialer-widget-active-id');

        if(activeId && activeId.trim() && activeId != device.localId){
            var invalidSession = false;
            var lastBeat = localStorage.getItem('dialer-widget-active-timestamp');
            if(lastBeat>0){
                lastBeat = Math.floor((Date.now()-lastBeat)/1000);
                if(lastBeat>10){
                    invalidSession = true;                    
                }
            }
            else{
                invalidSession = true;                
            }
            if(invalidSession){
                localStorage.setItem('dialer-widget-active-id', '');
            }
            else{
                $.error("Dialer already active in another tab");
                container.find(selectors.dialerToggle).attr('data-status','err');
            }            
            return;
        }


        container.find(selectors.dialerToggle).attr('data-status','busy');
        $.post(script,{action: 'refreshToken'},function(json){
            if(json.error){ container.find(selectors.dialerToggle).attr('data-status','err'); $.error("Unable to generate token!"); }
            else{        
                if(json.token){
                    initDevice(json.token);
                }
                else{
                    container.find(selectors.dialerToggle).attr('data-status','err');
                    $.error("Unable to generate token!");
                }                
            }
        },"json");
    }
    function uninitDialer(){
        var activeId = localStorage.getItem('dialer-widget-active-id');

        if(activeId.trim() && activeId == device.localId){
            localStorage.setItem('dialer-widget-active-id', '');
            if(heartbeat)clearInterval(heartbeat);
            container.find(selectors.dialerToggle).attr('data-status','err');
        }
    }
    function initDevice(token) {                 
        device = new Twilio.Device(token, {          
          logLevel: 1,                    
          codecPreferences: ["opus", "pcmu"]
        });                                      
        
        navigator.mediaDevices.getUserMedia({ audio: true }).then(function(){            
            addDeviceListeners(device);    

            // Device must be registered in order to receive incoming calls
            device.register();
            container.find(selectors.dialerToggle).attr('data-status','ready');
            dialpad.removeClass('hidden');
            container.addClass('active');
            device.localId = generateUUID();            
            localStorage.setItem('dialer-widget-active-id', device.localId);

            if(heartbeat)clearInterval(heartbeat);
            heartbeat = setInterval(function(){
                var activeId = localStorage.getItem('dialer-widget-active-id');
                if(activeId.trim() && activeId == device.localId){
                    localStorage.setItem('dialer-widget-active-timestamp', Date.now());
                }                
            },1000);

        });                                
    }
    function addDeviceListeners(device) {
        device.on("registered", function () {
          console.log("Twilio.Device Ready to make and receive calls!");
          //callControlsDiv.classList.remove("hide");
        });
    
        device.on("error", function (error) {
            console.log("Twilio.Device Error: " + error.message);
        });
    
        device.on("incoming", handleIncomingCall);
        device.on("offline", uninitDialer);        
    
        //device.audio.on("deviceChange", updateAllAudioDevices.bind(device));
    
        // Show audio selection UI if it is supported by the browser.
        if (device.audio.isOutputSelectionSupported) {
          //audioSelectionDiv.classList.remove("hide");
        }
    }

    function isActiveCall(){
		return (call)?true:false;
	}
    function toggleMute(btn){
		if (!isActiveCall()) $.error("No phone call detected");

		call.mute(!call.isMuted());
		if (call.isMuted()){ btn.addClass(btn.attr('data-class-on')).removeClass(btn.attr('data-class-off')); btn.find('label').text(btn.attr('data-text-on')); btn.find('i').removeClass(btn.attr('data-icon-off')).addClass(btn.attr('data-icon-on')); }
		else { btn.addClass(btn.attr('data-class-off')).removeClass(btn.attr('data-class-on')); btn.find('label').text(btn.attr('data-text-off')); btn.find('i').removeClass(btn.attr('data-icon-on')).addClass(btn.attr('data-icon-off')); }
	}
    function handleIncomingCall(incomingcall){
        call = incomingcall;
        
        dialerToggle('active');       
        switchDialpadPanel('incoming',call); 
     
        call.on("accept", handleAcceptedCall);
        call.on("disconnect", handleDisconnect);
        call.on("cancel", handleRejectedCall); 
    }    
    function acceptIncomingCall(){
        call.accept();
        handleAcceptedCall();
    }
    function rejectIncomingCall(){        
        call.reject();  
        timerStop();  
        switchDialpadPanel('dialpad');
        call = false;        
    }
    function handleAcceptedCall(){
        timerStart();             
        switchDialpadPanel('incall',call);
        checkCallRecording();
    }
    function handleDisconnect(){
        timerStop();
        //switchDialpadPanel('dialpad');        
        switchDialpadPanel('summary',call);
        call = false;        
    }
    function handleRejectedCall(){
        timerStop();  
        switchDialpadPanel('dialpad');
        call = false; 
        dialerToggle('inactive');
    }
    function hangupCall(){        
        call.disconnect();     
        //This will trigger handleDisconnect   
    }
    function toggleCallRecording(){
        var btn = container.find(selectors.dialpadRecord);
        var sid = call.parameters.CallSid; 
        var status = 1-call.isRecording;

        btn.button('loading');
        $.post(script,{action: 'toggleCallRecording', 'sid': sid, status: status},function(json){
            btn.button('reset');
            if(json.error){ $.error(json.error); }
            else{                    
                call.isRecording = status;                
                toggleRecord();              
            }
        },"json");
    }
    function checkCallRecording(){ 
        var btn = container.find(selectors.dialpadRecord);
        
        btn.addClass('hidden');
        setTimeout(function(){
            if (!isActiveCall()) return;
            var sid = call.parameters.CallSid;       

            $.post(script,{action: 'checkCallRecording', 'sid': sid},function(json){
                if(json.error){ $.error(json.error); }
                else{                    
                    call.isRecording = json.res;                    
                    toggleRecord();              
                }
            },"json");
        },3*1000);
    }
    function toggleRecord(){
        var btn = container.find(selectors.dialpadRecord);

        btn.removeClass('hidden');
        if (call.isRecording){ btn.addClass(btn.attr('data-class-on')).removeClass(btn.attr('data-class-off')); btn.find('label').text(btn.attr('data-text-on')); btn.find('i').removeClass(btn.attr('data-icon-off')).addClass(btn.attr('data-icon-on')); }
		else { btn.addClass(btn.attr('data-class-off')).removeClass(btn.attr('data-class-on')); btn.find('label').text(btn.attr('data-text-off')); btn.find('i').removeClass(btn.attr('data-icon-on')).addClass(btn.attr('data-icon-off')); }
    }
    async function makeOutgoingCall(input) {
        if(!$.defined(input))input = {};
        //switchDialpadPanel('incoming');        
        //return;

        var params = {}; 
        params['From'] = container.find(selectors.dialpadCallerId).val();
        params['To'] = container.find(selectors.dialpadTocall).val();        
        if(input.listingId)params['listingId'] = input.listingId;
        
        if(!device){ $.error("Phone system not ready"); return false; }
        if(!params.From){ $.error("Select Caller ID"); return false; }
        if(!params.To){ $.error("Invalid phone number"); return false; }

        // Twilio.Device.connect() returns a Call object
        call = await device.connect({ params });        
        switchDialpadPanel('outbound',params);        
    
        // add listeners to the Call
        // "accepted" means the call has finished connecting and the state is now "open"
        call.on("accept", handleAcceptedCall);
        call.on("disconnect", handleDisconnect);
        call.on("cancel", handleRejectedCall);                         
      }

});