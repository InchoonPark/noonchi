import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import DrawingPeriod from './DrawingPeriod'
import GameEnd from './GameEnd'
import GuessingPeriod from './GuessingPeriod'
import NewTurn from './NewTurn'
import ShowWord from './ShowWord'
import Leaderboard from './Leaderboard'
import './Game.css'

export default class Game extends Component {
  componentDidMount() {
    if(!this.props.game.roomNumber || !this.props.user.screenName) {
      browserHistory.push('/')
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.game.gameError) {
      browserHistory.push({
        pathname: '/error'
      })
    }
  }
  render() {
    switch(this.props.game.mode) {
      case 'NEW_TURN':
        return <NewTurn {...this.props} />
      case 'SHOW_WORD':
        return <ShowWord {...this.props} />
      case 'DRAWING_PERIOD':
       return <DrawingPeriod {...this.props} />
      case 'GUESSING_PERIOD':
        return <GuessingPeriod {...this.props} />
      case 'TURN_ENDED':
        return <Leaderboard {...this.props} />
      case 'ROUND_ENDED':
        return <Leaderboard {...this.props} />
      case 'GAME_ENDED':
        return <GameEnd {...this.props} />
      default:
        return <div></div>
    }
  }
}
