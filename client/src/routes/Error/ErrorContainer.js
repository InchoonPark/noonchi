import { connect } from 'react-redux'
import Error from './Error'

const mapStateToProps = (state) => {
  const { game } = state

  return {
    game
  }
}

const ErrorContainer = connect(
  mapStateToProps
)(Error)

export default ErrorContainer
