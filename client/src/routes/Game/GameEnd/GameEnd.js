import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import Confetti from 'react-confetti'
import './GameEnd.css'

const ordinal = (d) => {
  const nth = { '1': 'st', '2': 'nd', '3': 'rd' }
  return `${d}${nth[d] || 'th'}`
}

export default class GameEnd extends Component {
  handleHomeRoute = () => {
    browserHistory.push('/home')
  }
  render() {
    return (
      <div className='game-end-bg'>
        <div className='game-end-desc-container'>
          <h1 className='game-heading'>Congratulations!</h1>
          <h3 className='game-desc'>You ended the game in {ordinal(this.props.rank)} place!</h3>
          <button className='game-end-btn' onClick={this.handleHomeRoute}>
            Take me back home
          </button>
        </div>
        <div className='leaderboard-container'>
          <h1 className='leaderboard-heading'>Scoreboard</h1>
          <hr/>
          <ol>{this.props.game.players.map(player => {
              return (
                <li className='player' key={player.socketId}>
                  <span className='screen-name'>{player.screenName}</span>
                  <span className='score'>{player.score}</span>
                </li>
              )
            })}
          </ol>
        </div>
        <Confetti gravity={0.025} />
      </div>
    )
  }
}
