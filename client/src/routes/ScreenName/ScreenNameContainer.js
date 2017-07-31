import { connect } from 'react-redux'
import ScreenName from './ScreenName'

const mapStateToProps = (state) => {
  const { user, game } = state

  return {
    user,
    game
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (data) => {
      dispatch({ type: 'server/set_user', data })
    },
    joinGame: (roomNumber) => {
      dispatch({ type: 'server/join_game', roomNumber })
    }
  }
}

const ScreenNameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenName)

export default ScreenNameContainer
