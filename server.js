const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require('path')
const gameMod = require('./modules/gameMod.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 4001;

const ticker = () => {
	console.log('--------------------')
	console.log('# Games:', Object.keys(gameMod.games).length);
	console.log('# Connected players: ', Object.keys(io.sockets.sockets).length);
};

io.on('connection', socket => {
	socket.emit('connection');

	socket.on("disconnect", () => {
		gameMod.deleteGame(socket, io);
		gameMod.removeFromQueue(socket.id);
	});

	socket.on('findGame', () => {
		gameMod.findGame(socket, true);
	});

	socket.on('ready', (data) => {
		gameMod.readyPlayer(socket.id);
	});

	socket.on('makeMove', (data) => {
		gameMod.makeMove(socket, io, data);
	});	
});

server.listen(port, () => {
	console.log(`Server started on port ${port}`);
	setInterval(() => ticker(), 60000);
});

app.get('*', (req, res) => res.send('Hello World!'));