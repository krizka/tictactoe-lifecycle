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

    socket.on('foundGame', (data) => {
      gameObj = this.state.game;
      gameObj.ready = true;
      gameObj.turn = data.turn;
      gameObj.character = data.character;
      this.updateStates(gameObj, 'inGame');
      socket.emit('ready', socket.id)
    });

    socket.on('update', (data) => {
      if (data.badMove) return;
      gameObj = this.state.game;
      gameObj.layout = data.layout;
      gameObj.turn = (socket.id === data.test);//data.turn;
      this.updateStates(gameObj);
    });

    socket.on('gameFinished', (data) => {
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

  onFindGame = () => {
    socket.emit('findGame');
    this.updateStates(null, 'waiting');
  };

  onStopFindingGame = () => {
    socket.emit('scrapThat');
    this.updateStates(null, 'lobby');
  };

  returnToLobby = () => {
    this.gameReset();
  };

  makeMove = (e) => {
    console.log(e.target.id);
    if (this.state.game.turn) {
      socket.emit('makeMove', e.target.id);
    };
  };

  render() {
    let { game, path } = this.state;
    const waiting = (path === 'waiting');

    return (<div>
              {(path === 'lobby' || path === 'waiting') ? 
                <Lobby onFindGameSubmit={waiting?this.onFindGame:this.onStopFindingGame} waiting={waiting}/>
              :
                <GameGrid game={game} path={path} makeMove={this.makeMove} returnToLobby={this.returnToLobby}/> 
              }
            </div>);
  };

};

export default App;