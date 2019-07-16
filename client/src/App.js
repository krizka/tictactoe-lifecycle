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

  onFindGameSubmit = () => {
    console.log('Search for game');
    this.setState({waiting: true});
  };


  render() {
    return (
      <div>
          {this.state.inGame ? (
          <div>
            <GameGrid layout={this.state.layout}/>
          </div>
        ) : <Lobby onFindGameSubmit={this.onFindGameSubmit} waiting={this.state.waiting}/>}
      </div>
    );
  };

};

export default App;
