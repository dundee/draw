goog.require('goog.events.EventType');
goog.require('goog.events');

function Draw(element) {
	"use strict";
	var self = this;

	self.element = element;
	self.socket = false;
	self.isDown = false;
	self.line = [];

	self.init();
}

Draw.prototype.init = function () {
	"use strict";
	var self = this;

	self.ctx = self.element.getContext("2d");
	self.ctx.canvas.width  = window.innerWidth;
	self.ctx.canvas.height = window.innerHeight;
	self.lastPoint = {};
};

Draw.prototype.getX = function (event) {
	"use strict";
	var self = this;

	return event.offsetX;
};

Draw.prototype.getY = function (event) {
	"use strict";
	var self = this;

	return event.offsetY;
};

Draw.prototype.setSocket = function (socket) {
	"use strict";
	var self = this;

	self.socket = socket;

	self.socket.on('add', function (data) {
		data.lines.forEach(function (line) {
			self.ctx.beginPath();
			line.points.forEach(function (item) {
				self.ctx.lineTo(item.x, item.y);
			});
			self.ctx.strokeStyle = "#555";
			self.ctx.stroke();
		});
	});
};

Draw.prototype.mouseDown = function (event) {
	"use strict";
	var self = this, x, y;

	self.isDown = true;

	x = self.getX(event);
	y = self.getY(event);

	self.lastPoint = {x: x, y: y};

	self.line = [{x: x, y: y}];
};

Draw.prototype.mouseMove = function (event) {
	"use strict";
	var self = this, x, y;

	if (!self.isDown) {
		return;
	}

	x = self.getX(event);
	y = self.getY(event);

	self.ctx.beginPath();
	self.ctx.moveTo(self.lastPoint.x, self.lastPoint.y);
	self.ctx.lineTo(x, y);
	self.ctx.strokeStyle = "#000";
	self.ctx.stroke();

	self.lastPoint = {x: x, y: y};

	self.line.push({x: x, y: y});
};

Draw.prototype.mouseUp = function (event) {
	"use strict";
	var self = this;

	if (self.line.length && self.socket) {
		self.socket.emit('add', {lines: [{points: self.line}]});
	}

	self.isDown = false;
	self.line = [];
	self.lastPoint = {};
};

function main() {
	"use strict";
	var canvas = document.getElementById("canvas");
	var draw = new Draw(canvas);

	goog.events.listen(canvas, goog.events.EventType.MOUSEDOWN, draw.mouseDown, true, draw);
	goog.events.listen(canvas, goog.events.EventType.MOUSEMOVE, draw.mouseMove, true, draw);
	goog.events.listen(canvas, goog.events.EventType.MOUSEUP, draw.mouseUp, true, draw);
	goog.events.listen(canvas, goog.events.EventType.MOUSEOUT, draw.mouseUp, true, draw);

	goog.events.listen(document.getElementById("help"), goog.events.EventType.CLICK, function () {
		$('#help span').dialog();
	}, true, this);

	$.getJSON("./config.json", function (config) {
		var socket = io.connect("http://" + window.location.hostname + ':' + config.port);
		draw.setSocket(socket);
	});
};
