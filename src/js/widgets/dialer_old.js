$(document).ready(function(){
	var el =$('.widget-dialer');
	if(el.exists() && typeof(dialer) == 'undefined'){		
		dialer = new Dialer(el);
	}
});

var Dialer = Class.create({
	init: function(el, opts) {
		var $this = this;
		this.options = {
			script					: 'ajax/php/widgets/dialer.php',
			ringDelay				: 1,	
			disableSelector			: '.disable-a',
			moreSelector			: '#dialer-more',
			callerIDSelector		: '.callerId',
			templateCallHistory		: '#template-call-history',
			callHistoryContainer		: '.call-history-container',
			statusSelector			: '.status',
			statusIcon				: '.status-icon',
			dialSelector			: '.dial',
			callSelector			: '.call',
			endSelector				: '.hangup',
			acceptSelector			: '.accept',
			rejectSelector			: '.reject',
			numberSelector			: '.tocall',
			currentNumber			: '.tocurrent',			
			tokenSelector			: '.token',
			userIdSelector			: '.userId',			

			fromLabel				: '.from-label',
			toLabel					: '.to-label',
			callerIdContainer		: '.callerId-container',
			timerLabel				: '.timer-label',
			noNumberAssigned				: '.no-number-assigned',
			
			actions:{
				digit				: '.dial-digit',
				transfer			: '.dial-transfer',
				mute				: '.dial-mute',
				transferClient		: '.dial-transfer-client',
				transferConference	: '.dial-transfer-conference',
				play				: '.dial-play',
				eraseDigit			: '.erase-digit-a',
			},
			activeWidget			: '.active-widget',
			disabledWidget			: '.disabled-widget',
			views					: '.theme-panel-content',
			templates: {				
				//incoming			: 'ajax/template/widgets/dialer/_incoming.phtml',
				incoming			: '#dialer-incoming',
				outbound			: '#dialer-outgoing',
				keypad				: '#dialer-keypad',
				incall				: '#call-inprogress',
				callerId			: '#template-callerId',
				callerIdBusy		: '#template-callerId-busy',
                                noNumberAssignedTemplate        : '#template-no_number',
			}
		}						

		this.setOptions(opts);				
		this.disabled = false;
		this.dialer = el;
		
		if(!this.dialer) return;
		
		this.statusIcons = {
			'ready'		: 'ready',
			'busy'		: 'busy',
			'incall'	: 'incall',
			'error'		: 'error',
			'default'	: 'default'
		};
        		
		this.ring = false;
		this.connection = null;
		this.number = null;
		this.timer = null;
		this.token = this.dialer.find(this.options.tokenSelector).val();
		this.device = Twilio.Device;        
		//this.bind();        
		//this.callStoped();
		this.setup();		
	},	

	setOptions: function(opts){
		if(!$.defined(opts)) return;
		var $this = this;
		$.each(opts, function(n,o){
			$this.options[n] = o;
		});
	},	

	bind: function(){
		var $this = this;
		$(window).on('updateNumbers',function(){ $this.setup(); })
		this.device.ready(function (device) { $this.setStatus('Ready','ready'); });
		this.device.incoming(function (conn) { $this.incoming(conn); conn.accept(function (conn) { $this.accept(conn); });	});
		this.device.offline(function (device) { $this.setStatus('Offline','error'); });
		this.device.error(function (error) { $this.end(); $this.setStatus(error,'error'); });
		this.device.connect(function (conn) { $this.setStatus('Call in progress...','incall'); $this.callStarted(); });
		this.device.disconnect(function (conn) { $(window).trigger('callEnded',conn); $this.setStatus('Call ended','default'); $this.callStoped(); $this.connection = ''; });
		//this.device.presence(function (pres){ $this.updatePresence(pres); });
		//this.device.offline(function(device) { $this.refreshToken(); });
		this.dialer.find(this.options.dialSelector).click(function(){ $this.dial($(this)); });
		this.dialer.find(this.options.callSelector).click(function(){ $this.call(); });
		this.dialer.find(this.options.endSelector).click(function(){ $this.end(); });
		this.dialer.find(this.options.acceptSelector).click(function(){ $this.acceptIncoming(); });		
		this.dialer.find(this.options.rejectSelector).click(function(){ $this.rejectIncoming(); });		
		this.dialer.find(this.options.numberSelector).keyup(function(){ $this.updateNumber(); });
		this.dialer.find(this.options.disableSelector).click(function(){ $this.disable(); });
		
		this.dialer.on('click',this.options.actions.digit,function(e){e.preventDefault(); e.stopPropagation(); $this.sendDigit($(this).attr('data-digit')); });
		this.dialer.on('click',this.options.actions.eraseDigit,function(e){e.preventDefault(); e.stopPropagation(); $this.eraseDigit($(this)); });
		
		$('body').on('click',this.options.actions.mute,function(e){e.preventDefault(); e.stopPropagation(); $this.toggleMute($(this)); });
		$('body').on('click',this.options.actions.transfer,function(e){e.preventDefault(); e.stopPropagation(); $this.transfer($(this)); });
		$('body').on('click',this.options.actions.transferClient,function(e){e.preventDefault(); e.stopPropagation(); $this.transferClient($(this)); });
		$('body').on('click',this.options.actions.transferConference,function(e){e.preventDefault(); e.stopPropagation(); $this.transferConference($(this)); });
		$('body').on('click',this.options.actions.play,function(e){e.preventDefault(); e.stopPropagation(); $this.playMessage($(this)); });			
		
		$(window).on('dial',function(e, number){ $this.autoCall(number); });
	},

	setup: function(){
		//this.device.setup(this.token,{closeProtection: true});
		this.refreshToken();
		var $this = this;
		var selector = $this.dialer.find($this.options.callerIDSelector);
		selector.html('loading...');
		$.post($this.options.script,{action:'loadNumbers'},function(json){
			if (json.error) $.error(json.error);
			else {
				selector.html('');
				if ($.defined(json.data)) {
					$.each(json.data,function(n,el){
						selector.append($('<option>').text(el.number).val(el.id));
					});
				}
				else{
					//selector.append($('<option>').text(el.number).val(el.id));
                                    var template = Handlebars.compile($this.dialer.find($this.options.templates.noNumberAssignedTemplate).html());
                                    var obj = {};
                                    $this.dialer.find($this.options.noNumberAssigned).html(template(obj));    
				}
				selector.selectpicker();
			}
		},"json");
	},        
        listHistory: function(){
            var $this = this;
            $.post($this.options.script,{action:'loadHistoryNumbers'},function(json){
                    if (json.error) $.error(json.error);
                    else {
                            if ($.defined(json.data)) {
                                    var template = Handlebars.compile($this.dialer.find($this.options.templateCallHistory).html());
                                    var obj = {};
                                    obj.call_history = json.data;
                                    $this.dialer.find($this.options.callHistoryContainer).html(template(obj));
                            }
                    }
            },"json");
        },        
	toggle: function(status){
		if(!$.defined(status))status=false;
		
		if(status)this.dialer.addClass('active');
		else this.dialer.removeClass('active');
	},
        redial: function(history){
            var $this = this;
            if ($.defined(history.val())) $this.autoCall(history.val());
        },
	call: function(){
		this.toggle(true);
		if (this.isActiveCall()){ this.setStatus('A call is already in progress'); return; }		
		var number = this.cleanupNumber(this.dialer.find(this.options.numberSelector).val());
		if (!$.defined(number)) return;
		var userId = this.dialer.find(this.options.userIdSelector).val();
		if (!$.defined(userId)){ $.error('User not authorized to make phone calls.'); return; }
		var callerId = this.dialer.find(this.options.callerIDSelector).val();
		if (!$.defined(callerId))return;
                this.number = number;
		params = {
			'tocall' 		: number,			
			'numberId'		: callerId,
			'userId'		: userId
		};
		this.connection = this.device.connect(params);
		this.callStarted();
	},
	callConference: function(confId){	
		if (this.isActiveCall()){ this.setStatus('A call is already in progress'); return; }
		var userId = this.dialer.find(this.options.userIdSelector).val();
		if (!$.defined(userId)){ $.error('User not authorized to make phone calls.'); return; }
		var callerId = this.dialer.find(this.options.callerIDSelector).val();
		if (!$.defined(callerId))return;

		params = {
			'confId'  		: confId,
			'userId'		: userId,			
		};
		this.connection = this.device.connect(params);
		this.connection.parameters.confId = confId;
		this.callStarted();
	},
	autoCall: function(number){	
		var number = this.cleanupNumber(number);
		$(this.options.numberSelector).val(number);
		this.call();
	},	
	end: function(){
		this.device.disconnectAll();
		this.callStoped();
	},
	acceptIncoming: function(){
		this.stopRinging(); 
		this.connection.accept();
	},
	rejectIncoming: function(){
		this.stopRinging(); 
		this.connection.reject();
		this.toggle(false);
		this.switchView(this.dialer.find(this.options.templates.keypad));
	},
	dial: function(obj){
		var value = obj.attr('data-value');	
		if (!$.defined(value)) return;				

		if (this.connection) this.connection.sendDigits(value);
		else this.updateNumber(value);
	},
	incoming: function(conn){		
		var $this = this;
		this.connection = conn;
		$this.startRinging();
		
		this.dialer.find(this.options.fromLabel).text('Unknown Number');
		var from = this.formatNumber(this.cleanupNumber(this.connection.parameters.From));
		this.dialer.find(this.options.fromLabel).text(from);
		this.switchView(this.dialer.find(this.options.templates.incoming));
		this.toggle(true);
		this.lookupCaller();
		
		/*
		this.incomgingModal = new Modal({
			parent: $('body'),
			static: true,
			title: 'You have an incoming call',
			templateData: this.connection.parameters,
			template: $this.options.templates.incoming,
			buttons: new Array( $('<a>').addClass('btn btn-success').text('Accept').click(function(){ $this.incomgingModal.release(); $this.incomgingModal.close(); $this.stopRinging(); $this.connection.accept(); }), $('<a>').addClass('btn btn-danger').text('Reject').click(function(){ $this.incomgingModal.release(); $this.incomgingModal.close(); $this.stopRinging(); $this.connection.reject(); })
		)});
		this.incomgingModal.block();
		*/
		this.checkIncoming();
	},
	lookupCaller: function(){
		var $this = this;
		var container = this.dialer.find(this.options.callerIdContainer);
		var templateBusy = Handlebars.compile(this.dialer.find(this.options.templates.callerIdBusy).html());
		container.html(templateBusy());
						
		if($.defined(this.connection.parameters) && $.defined(this.connection.parameters.From))
			var number = this.connection.parameters.From;
		else
			var number = this.dialer.find(this.options.toLabel).text();
		
		number = this.formatNumber(this.cleanupNumber(number));
		$.post(this.options.script,{action: 'lookupCaller', number: number},function(json){
			if(json.error){}
			else{
				var template = Handlebars.compile($this.dialer.find($this.options.templates.callerId).html());
				container.html(template(json));
			}
		},"json");
	},
	checkIncoming: function(){
		var $this = this;
		if (!$.defined(dialer.connection) || dialer.connection.status() == 'closed'){
			/*
			if ($.defined(this.incomgingModal)){
				this.incomgingModal.release();
				this.incomgingModal.close(); 
				this.stopRinging();
			}
			*/			
			this.stopRinging();
			this.toggle(false);
			this.switchView(this.dialer.find(this.options.templates.keypad));
		}
		else setTimeout(function(){ $this.checkIncoming(); }, 500);
	},
	accept: function(conn){
		$(window).trigger('callAccepted',conn);
	},
	setStatus: function(st,icon){		
		if (typeof st == 'object'){
			st = st.message;
		}
		this.status = st;
		this.dialer.find(this.options.statusSelector).text(this.status);
		
		if($.defined(icon))
			this.dialer.find(this.options.statusIcon).attr('data-status',this.statusIcons[icon]);
	},
	callStarted: function(){
		this.timerStart();
		this.dialer.find(this.options.toLabel).text(this.formatNumber(this.cleanupNumber(this.number)));
		this.switchView(this.dialer.find(this.options.templates.incall));
		this.lookupCaller();
		
		//this.dialer.find(this.options.callSelector).hide();
		//this.dialer.find(this.options.endSelector).show();
	},
	switchView: function(view){
		var n = 1;
		var views = this.dialer.find(this.options.views);
		views.fadeOut(function(){			
			if(n==views.length){
				view.fadeIn();
			}
			n++;
		});		
	},
	callStoped: function(){
		this.timerStop();
		this.switchView(this.dialer.find(this.options.templates.keypad));
                this.listHistory();
		//this.dialer.find(this.options.callSelector).show();
		//this.dialer.find(this.options.endSelector).hide();
	},
	updateNumber: function(v){				
		if ($.defined(v)) {
			if(v == -1){				
				if($.defined(this.number) && this.number.length>0)this.number = this.number.substring(0, this.number.length - 1);
				else return;
			}
			else
				this.number = this.number + v;
		}
		else this.number = this.dialer.find(this.options.numberSelector).val();
		this.number = this.formatNumber(this.cleanupNumber(this.number));
		this.dialer.find(this.options.numberSelector).val(this.number);
	},
	refreshToken: function(){
		this.setStatus('Refreshing...','busy');
		var $this = this;
		$.post(this.options.script,{action: 'refreshToken'},function(json){
			if (json.token){
				$this.token = json.token;
				$this.device.setup($this.token,{closeProtection: true});
			}
			else if (json.error) $this.setStatus(json.error,'error');
			else {
				$this.setStatus('Offline','error');
				$.error("Unable to refresh token.");
			}
		},"json");
	},
	disable: function(){
		this.disabled = !this.disabled;
		if (this.disabled) {
			this.dialer.find(this.options.activeWidget).hide();
			this.dialer.find(this.options.disabledWidget).show();
			$(this.options.moreSelector).hide();
			this.device.setup('',{closeProtection: false});
		}
		else {
			this.dialer.find(this.options.activeWidget).show();
			this.dialer.find(this.options.disabledWidget).hide();
			$(this.options.moreSelector).show();
			this.refreshToken();
		}
	},
	eraseDigit: function(btn){
		this.updateNumber(-1);
	},
	sendDigit: function(d){					
		if (!this.isActiveCall()) this.updateNumber(d);
		else this.connection.sendDigits(d);
	},
	toggleMute: function(btn){
		if (!this.isActiveCall()) $.error("No phone call detected");
		this.connection.mute(!this.connection.isMuted());
		if (this.connection.isMuted()){ btn.find('p').text(btn.attr('data-text-on')); btn.find('i').removeClass(btn.attr('data-icon-off')).addClass(btn.attr('data-icon-on')); }
		else { btn.find('p').text(btn.attr('data-text-off')); btn.find('i').removeClass(btn.attr('data-icon-on')).addClass(btn.attr('data-icon-off')); }
	},
	transferClient: function(btn){
		var id = btn.attr('data-client-id');
		if (!$.defined(id)) $.error('Client not found!');
		params = {};
		params.agentId = id;
		this.transfer(btn,params);
	},
	transferConference: function(btn){
		params = {};
		params.agentId = this.dialer.find(this.options.userIdSelector).val();
		params.confId = generateUUID(false);
		this.transfer(btn,params);
	},
	playMessage: function(btn){
		params = {};
		params.targetCall = 'parent';
		this.transfer(btn,params);
	},
	transfer: function(btn,params){
		$this = this; 
		if (!this.isActiveCall()) $.error("No phone call detected");
		if (!$.defined(params)) params = {};
		btn.button('loading');
		var data = {};
		data.action = 'liveCallAction';
		data.sid = this.connection.parameters.CallSid;
		if (!this.isInboundCall()) data.targetCall = 'child';
		data.cmd = btn.attr('data-cmd');
		
		$.each(params,function(k,v){ data[k] = v; });
		$.post(this.options.script,data,function(json){
			btn.button('reset');
			if (json.error) $.error(json.error);
			else {
				if ($.defined(params.confId)) $this.callConference(params.confId);
			}
		},"json");
	},
	notifyUser: function(){
		if (!this.ring) return;
		this.ringOnce(true);
	},
	ringOnce: function(repeat){
		var $this = this;
		if (!$.defined(repeat)) repeat = false;
		if ($('#queueAudio').exists() || this.isOnCall()){
			if(repeat) setTimeout(function(){ if(repeat)$this.notifyUser(); }, 500);
			return;
		}
		var audio = document.createElement("audio");
		audio.setAttribute("id","queueAudio");
		audio.setAttribute("autoplay","autoplay");
		audio.setAttribute("src","/agent/uploads/ring.wav");
		document.body.appendChild(audio);
		audio.addEventListener('ended', function(){ setTimeout(function(){ $('#queueAudio').remove(); if(repeat)$this.notifyUser(); }, parseInt($this.options.ringDelay)*1000); });
		return audio;
	},
	startRinging: function(){
		this.ring = true;
		this.notifyUser();
	},
	stopRinging: function(){
		this.ring = false;
		$('#queueAudio').remove();
	},
	cleanupNumber: function(v){
		if($.defined(v))
			return v.replace(/[^0-9\+\#\*]/g,''); //.substring(0,10);
	},
	formatNumber: function(v){
		if($.defined(v))
			if (v.indexOf('+') != 0 || v.indexOf('+1') == 0) v = v.replace('+1','').replace(/(\d{3})(\d{3})(\d)/, '($1) $2-$3');
		return v;
	},
	isActiveCall: function(){
		return ($.defined(this.connection) && this.connection.status() != 'closed');
	},
	isOnCall: function(){
		return ($.defined(this.connection) && this.connection.status() == 'open');
	},
	isInboundCall: function(){
		return (this.isActiveCall() && $.defined(this.connection.parameters.From));

	},
	//Conference Actions
	joinRoom: function(){
		$.post(this.options.script,{action: 'dialConference', confId: this.connection.parameters.confId});
	},
	
	timerStart: function(){
		var $this = this;
		this.timer = moment().unix();
		setInterval(function(){ $this.timerUpdate(); }, 1000);
	},
	timerStop: function(){
		this.timer = null;
		this.dialer.find(this.options.timerLabel).text('');
	},
	timerReset: function(){
		this.timerStop();
		this.timerStart();
	},
	timerUpdate: function(){
		var time = moment().unix();
		var duration = moment.duration((time-this.timer)*1000, 'milliseconds');		
		this.dialer.find(this.options.timerLabel).text(moment(duration._data).format("HH:mm:ss"));
	},
});
