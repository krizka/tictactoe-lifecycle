import React, { Component } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';
import GameGrid from './Components/GameGrid/GameGrid.js';
import Lobby from './Components/Lobby/Lobby.js';

let socket;

const newGame = () => {
  return {
    ready: false,
    layout: new Array(9).fill(''),
    turn: false,
    character: '',
    result: {
      state: '',
      pattern: [],
    },
  }
};

let gameObj = newGame();

class App extends Component {

  constructor() {
    super();
    this.state = {
      path: 'lobby',
      game: newGame(),
    }
    socket = socketIOClient('localhost:4001');
  };

  gameReset = () => {
    gameObj = newGame();
    this.updateStates(gameObj, 'lobby');
  };

  updateStates = (game, path) => {
    if (game) this.setState({game: game});
    if (path) this.setState({path: path});
  };

  componentDidMount() {
    document.title = "Tic Tac Toe";

    socket.on('waiting', () => {
    });

    socket.on('foundGame', (data) => {
      console.log('foundGame');
      gameObj = this.state.game;
      gameObj.ready = true;
      gameObj.turn = data.turn;
      gameObj.character = data.character;
      this.updateStates(gameObj, 'inGame');
      socket.emit('ready', socket.id)
    });

    socket.on('update', (data) => {
      if (data.badMove) return;
      console.log('this socket id = ', socket.id);
      console.log('socket id from server = ', data.test);
      gameObj = this.state.game;
      gameObj.layout = data.layout;
      gameObj.turn = (socket.id === data.test);//data.turn;
      this.updateStates(gameObj);
      console.log('LOOK HERE MY FRIEND... gameObj.turn = ', gameObj.turn);
      console.log('AND BE SURE TO LOOK HERE! ', this.state.game.turn);
      console.log('Updates game = ', this.state.game);
    });

    socket.on('gameFinished', (data) => {
      console.log('gameFinished');
      let gameObj = this.state.game;
      gameObj.turn = false;
      gameObj.result.state = data.result;
      gameObj.result.pattern = Array.from(data.pattern);
      this.updateStates(gameObj, 'gameOver');
    });

    socket.on('serverReset', () => {
      this.gameReset();
    })

    socket.on('disconnect', () => {
      this.gameReset();
    });
  };

  onFindGameSubmit = () => {
    socket.emit('findGame');
    this.updateStates(null, 'waiting');
  };

  returnToLobby = () => {
    this.gameReset();
  };

  makeMove = (e) => {
    console.log(this.state.game);
    if (this.state.game.turn) {
      socket.emit('makeMove', e.target.id);
    };
  };

  render() {
    let { game, path } = this.state;
    const waiting = (path === 'waiting');

    return (<div>
              {(path === 'lobby' || path === 'waiting') ? 
                <Lobby onFindGameSubmit={this.onFindGameSubmit} waiting={waiting}/>
              :
                <GameGrid game={game} path={path} makeMove={this.makeMove} returnToLobby={this.returnToLobby}/> 
              }
            </div>);
  };

};

export default App;