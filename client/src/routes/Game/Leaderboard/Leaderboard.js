import React, { Component } from 'react'
import Alert from 'react-s-alert'
import './Leaderboard.css'

const ordinal = (d) => {
  const nth = { '1': 'st', '2': 'nd', '3': 'rd' }
  return `${d}${nth[d] || 'th'}`
}

export default class Leaderboard extends Component {
  componentDidMount() {
    Alert.closeAll()
  }
  render() {
    let desc = null

    if(this.props.game.mode === 'TURN_ENDED') {
      desc = `You are currently in ${ordinal(this.props.rank)} place!`
    } else if(this.props.game.mode === 'ROUND_ENDED') {
      desc = `You ended Round ${this.props.game.round} in ${ordinal(this.props.rank)} place!`
    }

    return (
      <div className='leaderboard-bg'>
        <div className='leaderboard-desc-container'>
          <h1 className='game-heading'>The correct word was {this.props.game.word}.</h1>
          <h3 className='game-desc'>{desc}</h3>
        </div>
        <div className='leaderboard-container'>
          <h1 className='leaderboard-heading'>Leaderboard</h1>
          <hr/>
          <ol>{this.props.leaderboard.map(player => {
              return (
                <li className='player' key={player.socketId}>
                  <span className='screen-name'>{player.screenName}</span>
                  <span className='score'>{player.score}</span>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}
