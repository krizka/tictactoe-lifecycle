const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require('path')

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 4001;

server.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

app.get('*', (req, res) => res.send('Hello World!'));