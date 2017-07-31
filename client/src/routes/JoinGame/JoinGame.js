import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import Alert from 'react-s-alert'
import './JoinGame.css';

export default class JoinGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roomNumber: null
    }
  }
  componentDidMount() {
    if(!this.props.user.screenName) {
      browserHistory.push('/')
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.game.joinGameError) {
      return Alert.error(nextProps.game.joinGameError, {
        position: 'bottom',
        effect: 'stackslide',
        timeout: 5000
      })
    }

    if(nextProps.game.roomNumber) {
      browserHistory.push('/lobby')
    }
  }
  handleRoomNumberChange = (event) => {
    this.setState({ roomNumber: event.target.value});
  }
  handleRoomNumberSubmit = (event) => {
    event.preventDefault()
    this.props.joinGame(this.state.roomNumber.trim())
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleRoomNumberSubmit}>
          <input
            className='block-input'
            placeholder='Room Number'
            onChange={this.handleRoomNumberChange}
            type='text'/>
          <button
            className='block-btn primary-btn'
            onClick={this.handleRoomNumberSubmit}>
            Enter
          </button>
        </form>
      </div>
    )
  }
}
