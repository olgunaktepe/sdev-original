$(window).ready(function(){
	var script = 'ajax/php/settings.php';	
	var systemWidget = $('.widget-system');
	var selectors = {	
		container: '.page-settings',
			
		panicOn: '.panic-on-a',	
		panicOff: '.panic-off-a',
		megapanic: '.mega-panic-a',
		megapanicContainer: '.mega-panic-instructions',
		
		templates : {			
		}
	};
	var container = $(selectors.container);
	
	init();
	bind();
	
	function init(){
	}
	function bind(){
		
		container.find(selectors.panicOn).click(function(e){ e.preventDefault(); panicOn($(this)); });
		container.find(selectors.panicOff).click(function(e){ e.preventDefault(); panicOff($(this)); });
		container.find(selectors.megapanic).click(function(e){ e.preventDefault(); megapanic($(this)); });		
		
		systemWidget.find('a.submit').click(function(e){e.preventDefault(); save($(this));});		
	}	
	function megapanic(btn){
		btn.hide();
		container.find(selectors.megapanicContainer).removeClass('hidden');
	}
	function panicOn(btn){
		if(!confirm("Are you sure you want to ENTER Panic mode? All tickets will be prices at $5,000"))return;
		btn.button('loading');
		
		$.post(script,{action: 'panicOn'},function(json){
			btn.button('reset');
			if(json.error) $.error(json.error);
			else window.location.reload();
		},"json");
	}
	function panicOff(btn){
		if(!confirm("Are you sure you want to EXIT Panic mode?"))return;
		btn.button('loading');
		
		$.post(script,{action: 'panicOff'},function(json){
			btn.button('reset');
			if(json.error) $.error(json.error);
			else window.location.reload();
		},"json");
	}
	function save(btn){
		var form = btn.parents('form');
		if(!$.defined(form))return;
		
		btn.button('loading');
		$.post(script,form.serialize(),function(json){
			btn.button('reset');
			if(json.error) error(json.error);
			else{
				notify("Settings Saved!");
			}
		},"json");
	}
});

