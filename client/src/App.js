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
    });

    socket.on('update', (data) => {
    });

    socket.on('gameFinished', (data) => {
    });

    socket.on('disconnect', () => {
    });
  };

  onFindGameSubmit = () => {
    console.log('hello');
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
