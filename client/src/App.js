import React, { Component } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';
import GameGrid from './Components/GameGrid/GameGrid.js';
import Lobby from './Components/Lobby/Lobby.js';

let socket;

const newGame = () => {
  return {
    active: false,
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
    this.setState({game: gameObj});
    this.setState({path: 'lobby'});
  }
  // setGame = (game) => {
  //   this.setState({game: {
  //       active: game.active,
  //       layout: game.layout,
  //       turn: game.turn,
  //       character: game.character,
  //       result: game.result,
  //   })
  // };

  componentDidMount() {
    document.title = "Tic Tac Toe";

    socket.on('waiting', () => {
    });

    socket.on('foundGame', (data) => {
      gameObj = this.state.game;
      gameObj.turn = data.turn;
      gameObj.character = data.character;
      this.setState({game: gameObj});
      this.setState({path: 'inGame'});
    });

    socket.on('update', (data) => {
      // console.log(data);
      // console.log('data=',data.layout);
      if (data.badMove) return;
      gameObj = this.state.game;
      gameObj.layout = data.layout;
      gameObj.turn = data.turn;
      this.setState({game: gameObj});
      console.log('update=',this.state.game);
    });

    socket.on('gameFinished', (data) => {
      this.setState({path: 'gameOver'});
      let gameObj = this.state.game;
      gameObj.turn = false;
      gameObj.result.state = data.result;
      gameObj.result.pattern = Array.from(data.pattern);
      this.setState({game: gameObj});
    });

    socket.on('disconnect', () => {
    });
  };

  onFindGameSubmit = () => {
    socket.emit('findGame');
    this.setState({path: 'waiting'});
  };

  returnToLobby = () => {
    this.setState({path: 'lobby'});
  };

  makeMove = (e) => {
    console.log('NOWALALA');
    if (this.state.game.turn) {
      console.log('WOWOWOW');
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
