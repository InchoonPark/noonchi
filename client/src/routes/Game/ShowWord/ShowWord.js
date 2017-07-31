import React, { Component } from 'react'
import './ShowWord.css'

export default class NewTurn extends Component {
  render() {
    return (
      <div className='show-word-bg'>
        <h1 className='game-heading'>Your word is {this.props.game.word}.</h1>
        <h3 className='game-desc'>Be prepared to draw it out!</h3>
      </div>
    )
  }
}
