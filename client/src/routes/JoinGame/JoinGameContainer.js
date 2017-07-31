import { connect } from 'react-redux'
import JoinGame from './JoinGame'

const mapStateToProps = (state) => {
  const { game, user } = state

  return {
    game,
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    joinGame: (roomNumber) => {
      dispatch({ type: 'server/join_game', roomNumber })
    }
  }
}

const JoinGameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinGame)

export default JoinGameContainer
