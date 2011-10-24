goog.provide('draw.canvas');

/**
 * @constructor
 * @param {Element} element to render the canvas into.
 */
function Canvas(element) {
	var self = this;

	self.element = element;
	self.socket = false;
	self.isDown = false;
	self.line = [];
}

/**
 * inits canvas
 */
Canvas.prototype.init = function() {
	var self = this;

	self.ctx = self.element.getContext('2d');
	self.ctx.canvas.width = window.innerWidth;
	self.ctx.canvas.height = window.innerHeight;
	self.lastPoint = {};
};

/**
 * @param {goog.events.BrowserEvent} event Event.
 * @return {number} X-coordinate.
 */
Canvas.prototype.getX = function(event) {
	var self = this;

	return event.offsetX;
};

/**
 * @param {goog.events.BrowserEvent} event Event.
 * @return {number} Y-coordinate.
 */
Canvas.prototype.getY = function(event) {
	var self = this;

	return event.offsetY;
};

/**
 * @param {Object} line Line object.
 */
Canvas.prototype.drawLine = function(line) {
	var self = this;

	self.ctx.beginPath();
	line.points.forEach(function(item) {
		self.ctx.lineTo(item.x, item.y);
	});
	self.ctx.strokeStyle = '#555';
	self.ctx.stroke();
};

/**
 * @param {SocketStorage} storage Socket instance.
 */
Canvas.prototype.setStorage = function(storage) {
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
Canvas.prototype.mouseDown = function(event) {
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
Canvas.prototype.mouseMove = function(event) {
	var self = this, x, y;

	if (!self.isDown) {
		return;
	}

	x = self.getX(event);
	y = self.getY(event);

	self.ctx.beginPath();
	self.ctx.moveTo(self.lastPoint.x, self.lastPoint.y);
	self.ctx.lineTo(x, y);
	self.ctx.strokeStyle = '#000';
	self.ctx.stroke();

	self.lastPoint = {x: x, y: y};

	self.line.push({x: x, y: y});
};

/**
 * @param {goog.events.BrowserEvent} event Event.
 */
Canvas.prototype.mouseUp = function(event) {
	var self = this;

	if (self.line.length && self.storage) {
		self.storage.add(self.line);
	}

	self.isDown = false;
	self.line = [];
	self.lastPoint = {};
};
