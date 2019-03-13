var app = require('express')();

app.set('port', (process.env.PORT || 3000));

var allowedOrigins = [
	'https://star-base.herokuapp.com/',
	'http://localhost:8080',
];

app.get('/', (req, res) => {
	res.send('Star Base Net is running...');
});

app.use(function(req, res, next) {
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		res.header("Access-Control-Allow-Origin", origin);
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	}
	next();
});

const server = app.listen(app.get('port'), () => {
	console.log("I'm listening....");
});

const io = require('socket.io')(server);
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