const initialState = {
  roomNumber: null,
  players: [],
  host: null,
  started: null,
  drawer: null,
  word: null,
  wordLength: null,
  mode: null,
  error: null,
  round: 0,
  guesses: [],
  joinGameError: null,
  gameError: null,
  lobbyError: null
}

const gameReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CREATE_GAME_SUCCESS':
      return Object.assign({}, state, action.data, {
        host: true,
        lobbyError: null
      })
    case 'JOIN_GAME_SUCCESS':
      return Object.assign({}, state, action.data, {
        host: false,
        lobbyError: null
      })
    case 'PLAYER_JOINED_LOBBY':
      return Object.assign({}, state, {
        players: action.players
      })
    case 'PLAYER_LEFT_LOBBY':
      return Object.assign({}, state, {
        players: action.players
      })
    case 'GAME_STARTED':
      return Object.assign({}, state, {
        started: true,
        gameError: null
      })
    case 'SHOW_WORD':
      return Object.assign({}, state, {
        mode: 'SHOW_WORD',
        word: action.word
      })
    case 'NEW_TURN':
      if(state.mode === 'SHOW_WORD') {
        return state
      }

      return Object.assign({}, state, {
        mode: 'NEW_TURN',
        drawer: action.drawer,
        word: null,
        wordLength: action.wordLength
      })
    case 'DRAWING_PERIOD':
      return Object.assign({}, state, {
        mode: 'DRAWING_PERIOD'
      })
    case 'GUESSING_PERIOD':
      if(state.mode === 'DRAWING_PERIOD') {
        return state
      }
      return Object.assign({}, state, {
        mode: 'GUESSING_PERIOD'
      })
    case 'TURN_ENDED':
      return Object.assign({}, state, {
        mode: 'TURN_ENDED',
        word: action.word,
        players: action.players
      })
    case 'ROUND_ENDED':
      return Object.assign({}, state, {
        mode: 'ROUND_ENDED',
        word: action.word,
        round: action.round,
        players: action.players
      })
    case 'GAME_ENDED':
      return Object.assign({}, state, {
        mode: 'GAME_ENDED',
        players: action.players
      })
    case 'GUESS_SUCCESS':
      return Object.assign({}, state, {
        word: action.word
      })
    case 'PLAYER_GUESSED':
      return Object.assign({}, state, {
        guesses: [action.message, ...state.guesses]
      })
    case 'LOBBY_ERROR':
      return Object.assign({}, state, {
        lobbyError: action.error
      })
    case 'JOIN_GAME_ERROR':
      return Object.assign({}, state, {
        joinGameError: action.error
      })
    case 'GAME_ERROR':
      return Object.assign({}, state, {
        mode: 'GAME_ERROR',
        gameError: action.error
      })
    default:
      return state
  }
}

export default gameReducer
