const initialState = {
  screenName: null,
  error: null
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_USER_SUCCESS':
      return Object.assign({}, state, {
        screenName: action.screenName
      })
    case 'SET_USER_ERROR':
      return Object.assign({}, state, {
        error: action.error
      })
    default:
      return state
  }
}

export default userReducer
