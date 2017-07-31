import React, { Component } from 'react'
import './NewTurn.css'

export default class NewTurn extends Component {
  render() {
    return (
      <div className='new-turn-bg'>
        <h1 className='game-heading'>
          It is {this.props.game.drawer.screenName}'s turn to draw.
        </h1>
        <h3 className='game-desc'>Try to guess the word being drawn!</h3>
      </div>
    )
  }
}
