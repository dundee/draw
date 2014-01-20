"use strict";

var io = require('socket.io').listen(8000);
var sys = require('util');
var mongodb = require('mongodb');

var collection;

var server = new mongodb.Server("127.0.0.1", 27017, {safe:false});
new mongodb.Db('draw', server, {}).open(function (error, client) {
	if (error) {
		throw error;
	}

	collection = new mongodb.Collection(client, 'lines');

	io.sockets.on('connection', function (socket) {

		var cursor = collection.find();
		cursor.toArray(function (err, docs) {
			socket.emit('add', {lines: docs});
		});

		socket.on('add', function (data) {
			socket.broadcast.emit('add', data);

			data.lines.forEach(function (line) {
				collection.insert(
					line,
					{safe: true},
					function (err, objects) {
						if (err) {
							console.warn(err.message);
						}
					}
				);
			});
		});
	});

});
