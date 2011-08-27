function Draw(element, client) {
	if (! (this instanceof arguments.callee)) {
		return new arguments.callee(arguments);
	}
	var self = this;

	self.element = element;
	self.client = client;
	self.isDown = false;
	self.line = [];

	self.init();
}

Draw.prototype.init = function() {
	var self = this;

	self.ctx = self.element.getContext("2d");

	client.subscribe('/line', function (message) {
		console.log("Msg:", message);
	});
}

Draw.prototype.mouseDown = function(event) {
	var self = this;

	self.isDown = true;

	x = event.offsetX;
	y = event.offsetY;

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

	x = event.offsetX;
	y = event.offsetY;

	self.ctx.fillStyle = "rgb(0,0,0)";
	self.ctx.lineTo(x, y);
	self.ctx.stroke();

	self.line.push({x: x, y: y});
}

Draw.prototype.mouseUp = function(event) {
	var self = this;

	if (self.line.length) {
		client.publish('/line', {line: self.line});
	}

	self.isDown = false;
	self.line = [];
}

$(function(){
	client = new Faye.Client("http://localhost:8000/faye", {
		timeout: 120
	});
	var draw = new Draw(document.getElementById("canvas"), client);

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
});
