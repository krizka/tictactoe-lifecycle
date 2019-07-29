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
      searchDots: 0,
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

  tick() {
    let newSearchDots = this.state.searchDots;
    if (++newSearchDots === 4) newSearchDots = 0;
    this.setState({searchDots: newSearchDots});
  }

  componentDidMount() {
    document.title = "Tic Tac Toe";

    socket.on('foundGame', (data) => {
      clearInterval(this.timerID);
      this.setState({searchDots: 0});
      gameObj = this.state.game;
      gameObj.ready = true;
      gameObj.turn = data.turn;
      gameObj.character = data.character;
      this.updateStates(gameObj, 'inGame');
      socket.emit('ready', socket.id)
    });
    socket.on('findingGame', () => {
      clearInterval(this.timerID2);
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
  // checkFindGame() {
  //   return (this.state.path === 'waiting');
  // };

  findGameHandler() {
    alert("No response from server");
    socket.emit('cancelFindGame');
    this.updateStates(null, 'lobby');
    clearInterval(this.timerID2);
  };

  onFindGame = () => {
    if (!socket.connected) {
      alert('Not connected to server')
    } else {
      socket.emit('findGame');
      this.updateStates(null, 'waiting');
      this.timerID = setInterval(() => this.tick(), 618);
      this.timerID2 = setInterval(() => this.findGameHandler(), 10000);
    };
  };

  onStopFindingGame = () => { //Need to add server side implementation
    socket.emit('cancelFindGame');
    this.updateStates(null, 'lobby');
  };

  returnToLobby = () => {
    this.gameReset();
  };

  makeMove = (e) => {
    if (this.state.game.turn) {
      socket.emit('makeMove', e.target.id);
    };
  };

  render() {

    let { game, path } = this.state;
    const waiting = (path === 'waiting');

    return (<div className="App">
              {(path === 'lobby' || path === 'waiting') ? 
                <Lobby onFindGameSubmit={waiting?this.onStopFindingGame:this.onFindGame} waiting={waiting} searchDots={this.state.searchDots}/>
              :
                <GameGrid game={game} path={path} makeMove={this.makeMove} returnToLobby={this.returnToLobby}/> 
              }
            </div>);
  };

};

export default App;