import React, { Component } from 'react'
import LogoImage from './logo.svg'
import './VideoLayout.css'

export default class VideoLayout extends Component {
  render() {
    return (
      <div className='video-layout-bg'>
        <img src={LogoImage} className='logo-img' role='presentation' />
        {this.props.children}
      </div>
    )
  }
}
