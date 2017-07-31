import React, { Component } from 'react'
import Alert from 'react-s-alert'
import { paper } from 'paper'
import { socket } from '../../../index.js'
import './GuessingPeriod.css'

export default class GuessingPeriod extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guess: null
    }
  }
  componentDidMount() {
    const { guessingCanvas } = this.refs
    const { screenWidth, screenHeight } = this.props.game.drawer

    let ratio = 0

    if(screenWidth / screenHeight > window.innerWidth / window.innerHeight) {
      ratio = window.innerWidth / screenWidth
      guessingCanvas.width = window.innerWidth
      guessingCanvas.height = ratio * screenHeight
    } else {
      ratio = window.innerHeight / screenHeight
      guessingCanvas.width = ratio * screenWidth
      guessingCanvas.height = window.innerHeight
    }

    const tempPaperScope = new paper.PaperScope()
    tempPaperScope.setup('guessingCanvas')

    let path = null

    socket.on('path_started', data => {
      path = new tempPaperScope.Path()
      path.strokeCap = 'round'
      path.strokeJoin = 'round'
      path.strokeColor = data.color
      path.strokeWidth = ratio * data.width

      const point = new tempPaperScope.Point(ratio * data.x, ratio * data.y)
      path.add(point)
    })

    socket.on('path_drawn', data => {
      const point = new tempPaperScope.Point(ratio * data.x, ratio * data.y)
      path.add(point)
    })
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.game.guesses.length > this.props.game.guesses.length) {
      Alert.info(nextProps.game.guesses[0], {
        position: 'bottom',
        effect: 'scale',
        timeout: 2000,
        offset: 70
      })
    }
  }
  handleGuessChange = (event) => {
    this.setState({ guess: event.target.value })
  }
  handleGuessSubmit = (event) => {
    event.preventDefault()
    if(this.state.guess) {
      this.props.guess(this.state.guess.trim())
      this.refs.guessInput.value = ''
    }
  }
  render() {
    return (
      <div className='acting-period-bg'>
        <canvas
          className='canvas'
          id='guessingCanvas'
          ref='guessingCanvas'/>
        <div className='word-header'>
          <h1 className='word-text'>
            {this.props.game.word ?
              this.props.game.word
              :
              '_'.repeat(this.props.game.wordLength)
            }
          </h1>
        </div>
        <div className='guess-container'>
          <form onSubmit={this.handleGuessSubmit}>
            <input
              className='guess-input'
              disabled={this.props.game.word}
              onChange={this.handleGuessChange}
              placeholder='Guess here!'
              ref='guessInput'
              type='text' />
          </form>
        </div>
      </div>
    )
  }
}
