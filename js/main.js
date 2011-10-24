goog.provide('draw.main');

goog.require('draw.draw');
goog.require('draw.toolbox');
goog.require('goog.Uri');
goog.require('goog.debug.ErrorHandler');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.net.XhrLite');
goog.require('goog.ui.Dialog');

function main() {
	var canvas = document.getElementById('canvas');
	var draw = new Draw(canvas);
	draw.init();

	var toolbox = new Toolbox();
	toolbox.render(document.getElementById('toolbox'));

	goog.events.listen(canvas, goog.events.EventType.MOUSEDOWN, draw.mouseDown, true, draw);
	goog.events.listen(canvas, goog.events.EventType.MOUSEMOVE, draw.mouseMove, true, draw);
	goog.events.listen(canvas, goog.events.EventType.MOUSEUP, draw.mouseUp, true, draw);
	goog.events.listen(canvas, goog.events.EventType.MOUSEOUT, draw.mouseUp, true, draw);

	goog.events.listen(document.getElementById('help'), goog.events.EventType.CLICK, function() {
		var d = new goog.ui.Dialog();
		d.setTitle('Draw!');
		d.setContent('<strong>Draw!</strong> is HTML5 application which gives you the ability to share your ' +
		'drawing skills with the world. Whatever your draw on the screen is in realtime displayed in browsers of all other connected users.');
		d.setButtonSet(goog.ui.Dialog.ButtonSet.createOk());
		d.setVisible(true);
	}, true, this);

	goog.net.XhrIo.send('./config.json', function(event) {
		var config = event.target.getResponseJson();
		var socket = io.connect('http://' + window.location.hostname + ':' + config.port);
		draw.setSocket(socket);
	});
}

window['main'] = main;
