import React, { Component } from 'react'

class CustomAlert extends Component {
  render() {
    return (
      <div className={this.props.classNames} id={this.props.id} style={this.props.styles}>
        <div className='s-alert-box-inner'>
          {this.props.message}
        </div>
      </div>
    )
  }
}

export default CustomAlert
