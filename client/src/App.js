import React, { Component } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';
import GameGrid from './Components/GameGrid/GameGrid.js';
import Lobby from './Components/Lobby/Lobby.js';

class App extends Component {

  socket = socketIOClient('localhost:4001');

  constructor() {
    super();
    this.state = {
      layout: ['','','','','','','','',''],
      inGame: false,
      myTurn: false,
      returnToLobby: false,
      socket: undefined,
      waiting: false,
      character: '',
      winningLayout: [],
      result: ''
    };
    
  };

  render() {
    return (
      <div>
          {!this.state.inGame ? (
          <div>
            <GameGrid layout={this.state.layout}/>
          </div>
        ) : <Lobby/>}
      </div>
    );
  };

};

export default App;
