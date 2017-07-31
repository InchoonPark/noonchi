import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import './Error.css'

export default class Error extends Component {
  componentDidMount() {
    if(!this.props.game.lobbyError && !this.props.game.gameError) {
      browserHistory.push('/')
    }
  }
  handleHomeRoute = () => {
    browserHistory.push('/home')
  }
  render() {
    return (
      <div className='error-bg'>
        <h1 className='game-heading'>Huh.</h1>
        <h3 className='game-desc'>
          {this.props.game.lobbyError || this.props.game.gameError}
        </h3>
        <button className='error-btn' onClick={this.handleHomeRoute}>
          Take me back home
        </button>
      </div>
    )
  }
}
