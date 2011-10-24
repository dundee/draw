goog.provide('draw.canvas');

/**
 * @constructor
 * @param {Element} element to render the canvas into.
 */
draw.Canvas = function(element) {
	var self = this;

	self.element = element;
	self.socket = false;
	self.isDown = false;
	self.line = [];
	self.color = '#000';
};

/**
 * inits canvas
 */
draw.Canvas.prototype.init = function() {
	var self = this;

	self.ctx = self.element.getContext('2d');
	self.ctx.canvas.width = window.innerWidth;
	self.ctx.canvas.height = window.innerHeight;
	self.lastPoint = {};
};

/**
 * @param {string} color Color.
 */
draw.Canvas.prototype.setColor = function(color) {
	var self = this;

	this.color = color;
};

/**
 * @param {goog.events.BrowserEvent} event Event.
 * @return {number} X-coordinate.
 */
draw.Canvas.prototype.getX = function(event) {
	var self = this;

	return event.offsetX;
};

/**
 * @param {goog.events.BrowserEvent} event Event.
 * @return {number} Y-coordinate.
 */
draw.Canvas.prototype.getY = function(event) {
	var self = this;

	return event.offsetY;
};

/**
 * @param {Object} line Line object.
 */
draw.Canvas.prototype.drawLine = function(line) {
	var self = this;

	self.ctx.beginPath();
	line.points.forEach(function(item) {
		self.ctx.lineTo(item.x, item.y);
	});
	self.ctx.strokeStyle = line.color;
	self.ctx.stroke();
};

/**
 * @param {draw.SocketStorage} storage Socket instance.
 */
draw.Canvas.prototype.setStorage = function(storage) {
	var self = this;

	self.storage = storage;

	self.storage.listen(function(lines) {
		lines.forEach(function(line) {
			self.drawLine(line);
		});
	});
};

/**
 * @param {goog.events.BrowserEvent} event Event.
 */
draw.Canvas.prototype.mouseDown = function(event) {
	var self = this, x, y;

	self.isDown = true;

	x = self.getX(event);
	y = self.getY(event);

	self.lastPoint = {x: x, y: y};

	self.line = [{x: x, y: y}];
};

/**
 * @param {goog.events.BrowserEvent} event Event.
 */
draw.Canvas.prototype.mouseMove = function(event) {
	var self = this, x, y;

	if (!self.isDown) {
		return;
	}

	x = self.getX(event);
	y = self.getY(event);

	self.ctx.beginPath();
	self.ctx.moveTo(self.lastPoint.x, self.lastPoint.y);
	self.ctx.lineTo(x, y);
	self.ctx.strokeStyle = self.color;
	self.ctx.stroke();

	self.lastPoint = {x: x, y: y};

	self.line.push({x: x, y: y});
};

/**
 * @param {goog.events.BrowserEvent} event Event.
 */
draw.Canvas.prototype.mouseUp = function(event) {
	var self = this;

	if (self.line.length && self.storage) {
		self.storage.add(self.line, self.color);
	}

	self.isDown = false;
	self.line = [];
	self.lastPoint = {};
};
