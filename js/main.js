goog.provide('draw.main');

goog.require('draw.canvas');
goog.require('draw.colorpicker');
goog.require('draw.storage.socket');
goog.require('draw.toolbox');
goog.require('goog.Uri');
goog.require('goog.debug.ErrorHandler');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.net.XhrLite');
goog.require('goog.ui.Dialog');

function main() {
	var canvasElement = document.getElementById('canvas');
	var canvas = new Canvas(canvasElement);
	canvas.init();

	var colorPicker = new ColorPicker(canvas);
	var toolbox = new Toolbox(colorPicker);
	toolbox.render(document.getElementById('toolbox'));

	goog.events.listen(canvasElement, goog.events.EventType.MOUSEDOWN, canvas.mouseDown, true, canvas);
	goog.events.listen(canvasElement, goog.events.EventType.MOUSEMOVE, canvas.mouseMove, true, canvas);
	goog.events.listen(canvasElement, goog.events.EventType.MOUSEUP, canvas.mouseUp, true, canvas);
	goog.events.listen(canvasElement, goog.events.EventType.MOUSEOUT, canvas.mouseUp, true, canvas);

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
		var storage = new SocketStorage(socket);
		canvas.setStorage(storage);
	});
}

window['main'] = main;
