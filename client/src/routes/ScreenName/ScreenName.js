import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import Alert from 'react-s-alert'
import './ScreenName.css';

export default class ScreenName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screenName: null
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
    if(nextProps.game.roomNumber && nextProps.user.screenName && this.props.params.roomNumber) {
      return browserHistory.push('/lobby')
    }
    if(nextProps.user.screenName) {
      if(this.props.params.roomNumber) {
        return this.props.joinGame(this.props.params.roomNumber)
      }
      return browserHistory.push('/home')
    }
  }
  handleScreenNameChange = (event) => {
    this.setState({ screenName: event.target.value});
  }
  handleScreenNameSubmit = (event) => {
    event.preventDefault()

    this.props.setUser({
      screenName: this.state.screenName,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleScreenNameSubmit}>
          <input
            className='block-input'
            placeholder='Screen Name'
            maxLength={16}
            onChange={this.handleScreenNameChange}
            type='text'/>
          <button
            className='block-btn primary-btn'
            onClick={this.handleScreenNameSubmit}>
            OK
          </button>
        </form>
      </div>
    )
  }
}
