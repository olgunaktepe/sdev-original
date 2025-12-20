var page = require('webpage').create(),
  system = require('system');

//page.viewportSize = { width: 1440, height : 900 };
var file = system.args[1];
var output = system.args[2];

//var fs = require('fs');
//var content = fs.read(file);
//page.content = content;

page.open("file:///"+file,function(){		
	//var base64 = page.renderBase64('PNG');
	//console.log(base64);
	//console.log('file loaded');
	page.evaluate(function () { document.body.style.zoom = 0.5 });
	page.render(output, { format: 'pdf' });
	phantom.exit();	
});