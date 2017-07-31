import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
import createSocketIoMiddleware from 'redux-socket.io'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'
import io from 'socket.io-client'

import VideoLayout from './layouts/VideoLayout'
import rootReducer from './reducers'
import ErrorRoute from './routes/Error'
import GameRoute from './routes/Game'
import JoinGameRoute from './routes/JoinGame'
import LobbyRoute from './routes/Lobby'
import HomeRoute from './routes/Home'
import ScreenNameRoute from './routes/ScreenName'
import App from './App.js'
import './index.css'

export const socket = io('https://noonchi.herokuapp.com')
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/')

let middlewares = [socketIoMiddleware]

if (process.env.NODE_ENV === `development`) {
  const logger = createLogger()
  middlewares.push(logger)
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route component={VideoLayout}>
          <IndexRoute component={ScreenNameRoute}/>
          <Route path="home" component={HomeRoute}/>
          <Route path="join" component={JoinGameRoute}/>
          <Route path="g/:roomNumber" component={ScreenNameRoute}/>
        </Route>
        <Route path="lobby" component={LobbyRoute}/>
        <Route path="game" component={GameRoute}/>
        <Route path="error" component={ErrorRoute}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
