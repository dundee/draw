
var http = require('http');
var faye = require('faye');
var fs = require('fs');
var sys = require('sys');

var server = http.createServer(function (req, res) {
	res.writeHead(200);
	res.end();
});

var fayeServer = new faye.NodeAdapter({
	mount: '/faye',
	timeout: 45
});

fayeServer.attach(server);

server.listen(8000);
sys.log('Server started on PORT 8000');

//fayeServer.getClient().subscribe('/hello', function(message) {
//	fayeServer.getClient().publish('/msg', 'Hi ' + message.name + '!');
//	fayeServer.getClient().publish('/msg', 'Nice to meet you');
//});
