import React, { Component } from 'react'
import Alert from 'react-s-alert'
import { paper } from 'paper'
import { socket } from '../../../index.js'
import './DrawingPeriod.css'

export default class DrawingPeriod extends Component {
  constructor() {
    super()
    this.state = {
      color: 'black',
      width: 8
    }
  }
  componentDidMount() {
    const { drawingCanvas } = this.refs
    drawingCanvas.width = window.innerWidth
    drawingCanvas.height = window.innerHeight

    const tempPaperScope = new paper.PaperScope()
    tempPaperScope.setup('drawingCanvas')

    const tool = new tempPaperScope.Tool()
    let path = null

    tool.onMouseDown = (event) => {
      const { point } = event
      const { x, y } = point

      path = new tempPaperScope.Path()
      path.strokeCap = 'round'
      path.strokeJoin = 'round'
      path.strokeColor = this.state.color
      path.strokeWidth = this.state.width

      const data = {
        color: this.state.color,
        width: this.state.width,
        x,
        y
      }

      socket.emit('path_start', data)
      path.add(point)
    }

    tool.onMouseDrag = (event) => {
      const { point } = event
      const { x, y } = point
      const data = { x, y }

      socket.emit('path_draw', data)
      path.add(point)
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.game.guesses.length > this.props.game.guesses.length) {
      Alert.info(nextProps.game.guesses[0], {
        position: 'bottom',
        effect: 'scale',
        timeout: 2000
      })
    }
  }
  handleColorChange = (color) => {
    this.setState({ color })
  }
  handleWidthChange = (width) => {
    this.setState({ width })
  }
  render() {
    return (
      <div className='acting-period-bg'>
        <div className='colors-container'>
          <button
            className={'color-btn red ' + (this.state.color === '#e74c3c' ? 'selected' : '')}
            onClick={() => this.handleColorChange('#e74c3c')}/>
          <button
            className={'color-btn orange ' + (this.state.color === '#e67e22' ? 'selected' : '')}
            onClick={() => this.handleColorChange('#e67e22')}/>
          <button
            className={'color-btn yellow ' + (this.state.color === '#f1c40f' ? 'selected' : '')}
            onClick={() => this.handleColorChange('#f1c40f')}/>
          <button
            className={'color-btn green ' + (this.state.color === '#2ecc71' ? 'selected' : '')}
            onClick={() => this.handleColorChange('#2ecc71')}/>
          <button
            className={'color-btn blue ' + (this.state.color === '#3498db' ? 'selected' : '')}
            onClick={() => this.handleColorChange('#3498db')}/>
          <button
            className={'color-btn purple ' + (this.state.color === '#9b59b6' ? 'selected' : '')}
            onClick={() => this.handleColorChange('#9b59b6')}/>
          <button
            className={'color-btn black ' + (this.state.color === 'black' ? 'selected' : '')}
            onClick={() => this.handleColorChange('black')}/>
        </div>
        <div className='misc-container'>
          <button
            className={'misc-btn ' + (this.state.width === 4 ? 'selected' : '')}
            onClick={() => this.handleWidthChange(4)}>
            <i className='fa fa-paint-brush' style={{fontSize: 12}}></i>
          </button>
          <button
            className={'misc-btn ' + (this.state.width === 8 ? 'selected' : '')}
            onClick={() => this.handleWidthChange(8)}>
            <i className='fa fa-paint-brush' style={{fontSize: 16}}></i>
          </button>
          <button
            className={'misc-btn ' + (this.state.width === 20 ? 'selected' : '')}
            onClick={() => this.handleWidthChange(20)}>
            <i className='fa fa-paint-brush'></i>
          </button>
          <button
            className={'misc-btn ' + (this.state.color === 'white' ? 'selected' : '')}
            onClick={() => this.handleColorChange('white')}>
            <i className='fa fa-eraser'></i>
          </button>
        </div>
        <canvas
          className='canvas'
          id='drawingCanvas'
          ref='drawingCanvas'/>
        <div className='word-header'>
          <h1 className='word-text'>
            {this.props.game.word}
          </h1>
        </div>
      </div>
    )
  }
}
