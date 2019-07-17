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

class App extends Component {

  socket = socketIOClient('localhost:4001');

  constructor() {
    super();
    this.state = {
      path: 'lobby',
      game: {
        active: false,
        layout: new Array(9).fill(''),
        turn: false,
        character: '',
        result: {
          state: '',
          pattern: [],
        },
      },
    }
  };

  componentDidMount() {
    document.title = "Tic Tac Toe - SF";
    socket.on('waiting', () => {
    });
    socket.on('foundGame', (data) => {;
    });
    socket.on('update', (data) => {
    });
    socket.on('gameFinished', (data) => {
    });
    socket.on('disconnect', () => {
    });
  };

  onFindGameSubmit = () => {
    socket.emit('findGame');
  };

  makeMove = (e) => {
    socket.emit('makeMove', e.target.id);
  };


  render() {
    let { game, path } = this.state;
    const waiting = (path === 'waiting');

    return (<div>
              {(path === 'lobby' || path === 'waiting') ? 
                <Lobby onFindGameSubmit={this.onFindGameSubmit} waiting={waiting}/>
              :
                <GameGrid layout={game.layout} makeMove={this.makeMove}/> 
              }
            </div>);
  };

};

export default App;
