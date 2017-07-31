import { connect } from 'react-redux'
import Game from './Game'

const mapStateToProps = (state) => {
  const { game, user } = state

  const playerIndex = game.players.findIndex(player => {
    return player.screenName === user.screenName
  })

  const rank = playerIndex + 1

  return {
    game,
    leaderboard: game.players.slice(0, 5),
    rank,
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    guess: (guess) => {
      dispatch({ type: 'server/guess', guess })
    }
  }
}

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)

export default GameContainer
