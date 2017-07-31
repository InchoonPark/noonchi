import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import './Home.css';

export default class Home extends Component {
  componentDidMount() {
    if(!this.props.user.screenName) {
      browserHistory.push('/')
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.game.roomNumber) {
      browserHistory.push('/lobby')
    }
  }
  handleJoinGame = () => {
    browserHistory.push('/join')
  }
  handleCreateGame = () => {
    this.props.createGame(this.props.user.screenName)
  }
  render() {
    return (
      <div>
        <button
          className='block-btn secondary-btn'
          onClick={this.handleJoinGame}>
          Join Game
        </button>
        <button
          className='block-btn primary-btn'
          onClick={this.handleCreateGame}>
          Create Game
        </button>
      </div>
    )
  }
}
