import { connect } from 'react-redux'
import Home from './Home'

const mapStateToProps = (state) => {
  const { game, user } = state

  return {
    game,
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createGame: (screenName) => {
      dispatch({ type: 'server/create_game', screenName })
    }
  }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer
