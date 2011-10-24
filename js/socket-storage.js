goog.provide('draw.storage.socket');

/**
 * @constructor
 * @param {Object} socket Socket instance.
 */
function SocketStorage(socket) {
	var self = this;

	self.socket = socket;
}

/**
 * Add line to storage
 * @param {Object} line Line.
 * @param {string} color Color of line.
 */
SocketStorage.prototype.add = function(line, color) {
	var self = this;

	self.socket.emit('add', {lines: [{points: line, color: color}]});
};

/**
 * Registers listener to be called when new line is added.
 * @param {Function} func Function.
 */
SocketStorage.prototype.listen = function(func) {
	var self = this;

	self.socket.on('add', function(data) {
		func(data.lines);
	});
};
