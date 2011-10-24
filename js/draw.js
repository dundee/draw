goog.provide('draw.draw');

/**
 * @constructor
 * @param {Element} element to render the canvas into.
 */
function Draw(element) {
	var self = this;

	self.element = element;
	self.socket = false;
	self.isDown = false;
	self.line = [];
}

/**
 * inits canvas
 */
Draw.prototype.init = function() {
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
Draw.prototype.getX = function(event) {
	var self = this;

	return event.offsetX;
};

/**
 * @param {goog.events.BrowserEvent} event Event.
 * @return {number} Y-coordinate.
 */
Draw.prototype.getY = function(event) {
	var self = this;

	return event.offsetY;
};

/**
 * @param {Object} socket Socket instance.
 */
Draw.prototype.setSocket = function(socket) {
	var self = this;

	self.socket = socket;

	self.socket.on('add', function(data) {
		data.lines.forEach(function(line) {
			self.ctx.beginPath();
			line.points.forEach(function(item) {
				self.ctx.lineTo(item.x, item.y);
			});
			self.ctx.strokeStyle = '#555';
			self.ctx.stroke();
		});
	});
};

/**
 * @param {goog.events.BrowserEvent} event Event.
 */
Draw.prototype.mouseDown = function(event) {
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
Draw.prototype.mouseMove = function(event) {
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
Draw.prototype.mouseUp = function(event) {
	var self = this;

	if (self.line.length && self.socket) {
		self.socket.emit('add', {lines: [{points: self.line}]});
	}

	self.isDown = false;
	self.line = [];
	self.lastPoint = {};
};
