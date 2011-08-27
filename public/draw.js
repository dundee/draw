function Draw(element) {
	if (! (this instanceof arguments.callee)) {
		return new arguments.callee(arguments);
	}
	var self = this;

	self.element = element;
	self.socket = false;
	self.isDown = false;
	self.line = [];

	self.init();
}

Draw.prototype.init = function() {
	var self = this;

	self.ctx = self.element.getContext("2d");
	self.ctx.canvas.width  = window.innerWidth;
	self.ctx.canvas.height = window.innerHeight;
}

Draw.prototype.getX = function(event) {
	var self = this;

	return event.pageX - self.element.offsetLeft;
}

Draw.prototype.getY = function(event) {
	var self = this;

	return event.pageY - self.element.offsetTop;
}

Draw.prototype.setSocket = function(socket) {
	var self = this;

	self.socket = socket;

	self.socket.on('add', function (data) {
		data.lines.forEach(function(line) {
			self.ctx.beginPath();
			line.points.forEach(function(item) {
				self.ctx.lineTo(item.x, item.y);
			});
			self.ctx.stroke();
		});
	});
}

Draw.prototype.mouseDown = function(event) {
	var self = this;

	self.isDown = true;

	x = self.getX(event);
	y = self.getY(event);

	self.ctx.fillStyle = "rgb(0,0,0)";
	self.ctx.beginPath();
	self.ctx.moveTo(x, y);

	self.line = [{x: x, y: y}];
}

Draw.prototype.mouseMove = function(event) {
	var self = this;

	if (!self.isDown) {
		return;
	}

	x = self.getX(event);
	y = self.getY(event);

	self.ctx.fillStyle = "rgb(0,0,0)";
	self.ctx.lineTo(x, y);
	self.ctx.stroke();

	self.line.push({x: x, y: y});
}

Draw.prototype.mouseUp = function(event) {
	var self = this;

	if (self.line.length && self.socket) {
		self.socket.emit('add', {lines:[{points: self.line}]});
	}

	self.isDown = false;
	self.line = [];
}

$(function(){
		var draw = new Draw(document.getElementById("canvas"));

		$('#canvas').mousedown(function(event){
			draw.mouseDown(event);
		});
		$('#canvas').mousemove(function(event){
			draw.mouseMove(event);
		});
		$('#canvas').mouseup(function(event){
			draw.mouseUp(event);
		});
		$('#canvas').mouseout(function(event){
			draw.mouseUp(event);
		});

		$('#help').click(function() {
			$('#help span').dialog();
		});

		$.getJSON("./config.json", function (config) {
			var socket = io.connect("http://" + window.location.hostname + ':' + config.port);
			draw.setSocket(socket);
		});
});
