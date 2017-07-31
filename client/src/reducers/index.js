import { combineReducers } from 'redux'
import game from './game'
import user from './user'

const rootReducer = combineReducers({
  game,
  user
})

export default rootReducer
