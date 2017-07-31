import { connect } from 'react-redux'
import Lobby from './Lobby'

const mapStateToProps = (state) => {
  const { game, user } = state

  return {
    game,
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => {
      dispatch({ type: 'server/start_game' })
    }
  }
}

const LobbyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby)

export default LobbyContainer
