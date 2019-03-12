var app = require('express')();
var server = app.listen(3000, () => {
	console.log("I'm listening....");
});

var io = require('socket.io')(server);
io.on('connection', (socket) => {
	console.log('connected to ' + socket.id);
	socket.on('playerUpdate', (data) => {
		socket.broadcast.emit('playerUpdate', data);
	});
	socket.on('playerJoin', (data) => {
		console.log(`broadcasting new player ${JSON.stringify(data)}`);
		socket.broadcast.emit('playerJoin', data);
	});
});