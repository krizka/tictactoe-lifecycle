class game {
	constructor(player1ID, player2ID, gameLayout) {
		this.player1 = {ID: player1ID, character: 'o'};
		this.player2 = {ID: player2ID, character: 'x'};
		this.gameLayout = gameLayout;
		this.turn = player1ID;
		this.moves = 0;
	};
};

let queuing = [];
let games = {};
let gameIDs = {};
let interva;

const getGameID = (player) => gameIDs[player];
const getGame = (player) => games[getGameID(player)];
const getMyCharacter = (player) => {
	let game = getGame(player);
	if (game.player1.ID === player) return game.player1.character;
	if (game.player2.ID === player) return game.player2.character;
};
const getOpponentID = (player) => {
	let game = getGame(player);
	return game.player1.ID === player ? game.player2.ID : game.player1.ID;
};

const deleteGame = (socket, io) => {
	let player = socket.id;
	let gameID = gameIDs[player];
	let game = games[gameID];
	if (game) {
		let opponent = getOpponentID(player);
		if (opponent) try {
			io.sockets.connected[opponent].emit('gameFinished', {result: 'opponent-disconnected'});
		} catch (err) {
			console.log(err);
		}
		socket.emit('gameFinished', {result: 'disconnect'});
		delete games[gameID];
		delete gameIDs[player];
		delete gameIDs[opponent];
	};
};

const findGame = (socket, firstCall) => {
	let player1 = socket.id;
	if (firstCall) queuing.push(player1);
	if (queuing.length > 1) {		
		queuing.pop();
		let player2 = queuing.pop();
		let gameID = (Math.random() + 1).toString(36).slice(2, 18);
		games[gameID] = new game (player1, player2, new Array(9).fill(''));
		gameIDs[player1] = gameID;
		gameIDs[player2] = gameID;
		socket.emit('foundGame', {
			character: games[gameID].player1.character, 
			turn: true}
		);
	} else if (queuing.length === 0) {
		clearInterval(interva);
		socket.emit('foundGame', {
			character: getMyCharacter(player1), 
			turn: false}
		);
	} else {
		socket.emit('waiting');
		if (firstCall) interva = setInterval(() => findGame(socket, false), 618);
	};
};

module.exports = {
	findGame,
	queuing,
	games,
	gameIDs,
	deleteGame
};