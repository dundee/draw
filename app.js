var io = require('socket.io').listen(8000);
var sys = require('sys');

sys.log('Server started on PORT 8000');

io.sockets.on('connection', function (socket) {
	socket.on('line', function (data) {
		socket.broadcast.emit('line', data);
	});
});
