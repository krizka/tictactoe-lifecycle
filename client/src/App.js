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

const gameObj = newGame();

class App extends Component {

  constructor() {
    super();

    this.state = {
      path: 'lobby',
      game: newGame(),
    }

    socket = socketIOClient('localhost:4001');
  };

  componentDidMount() {
    document.title = "Tic Tac Toe";

    socket.on('waiting', () => {
    });

    socket.on('foundGame', (data) => {
      console.log(data);
      this.setState({path: 'inGame'});
      this.setState({game: {
        active: true,
        layout: new Array(9).fill(''),
        turn: data.turn,
        character: data.character,
        result: {
          state: '',
          pattern: [],
        }}
      });
      console.log(this.state.game);
    });

    socket.on('update', (data) => {
      console.log(data);
      console.log('data=',data.layout);
      if (data.badMove) return;
      this.setState({game: {
        active: true,
        layout: data.layout,
        turn: data.turn,
        character: this.state.character,
        result: {
          state: '',
          pattern: [],
        }}
      });
      console.log('update=',this.state.game);
    });

    socket.on('gameFinished', (data) => {
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
