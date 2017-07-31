import React, { Component } from 'react'
import Modal from 'react-modal'
import { browserHistory } from 'react-router'
import './Lobby.css'

const modalStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '0px',
    left                       : '0px',
    right                      : '0px',
    bottom                     : '0px',
    margin: 'auto',
    height: '250px',
    width: '400px',
    border                     : '0px',
    borderRadius               : '0px',
    padding                    : '20px'
  }
}

export default class Lobby extends Component {
  constructor() {
    super()
    this.state = {
      inviteModal: false
    }
  }
  componentDidMount() {
    if(!this.props.game.roomNumber || this.props.game.started) {
      browserHistory.push('/')
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.game.lobbyError) {
      browserHistory.push({
        pathname: '/error'
      })
    }

    if(nextProps.game.started) {
      browserHistory.push('/game')
    }
  }
  handleInviteModal = () => {
    this.setState({ inviteModal: true })
  }
  handleCloseInviteModal = () => {
    this.setState({ inviteModal: false })
  }
  handleFacebookShare = () => {
    window.FB.ui({
      method: 'share',
      href: `https://www.noonchi.xyz/g/${this.props.game.roomNumber}`,
    })
  }
  handleMessengerShare = () => {
    window.FB.ui({
      method: 'send',
      link: `https://www.noonchi.xyz/g/${this.props.game.roomNumber}`
    })
  }
  render() {
    let startGameBtn = null

    if(this.props.game.host && this.props.game.players.length > 1) {
      startGameBtn = (
        <button className='start-game-btn' onClick={this.props.startGame}>
          Start
        </button>
      )
    }

    return (
      <div className='lobby-bg'>
        <div className='room-number-header'>
          <h1 className='room-number-heading'>The room number is {this.props.game.roomNumber}.</h1>
          <div className='header-btns'>
            <button className='header-invite-btn' onClick={this.handleInviteModal}>
              Invite
            </button>
            {startGameBtn}
          </div>
        </div>
        <div className='lobby-container'>
          <div className='lobby-header'>
            <h1 className='lobby-heading'>Lobby</h1>
            <button className='invite-btn'>
              <i className='fa fa-paper-plane' onClick={this.handleInviteModal}></i>
            </button>
          </div>
          <hr/>
          <div className='players-container'>
            {this.props.game.players.map(player => {
              return (
                <span className='player' key={player.socketId}>
                  {player.screenName}
                </span>
              )
            })}
          </div>
        </div>
        <Modal
          isOpen={this.state.inviteModal}
          contentLabel='Invite friends to play!'
          style={modalStyle}>
          <h1 className='invite-modal-heading'>Invite your friends!</h1>
          <a href='#' onClick={this.handleFacebookShare}>
            <div className='share-option'>
              <i className='fa fa-facebook-official share-icon'/>
              <h3 className='share-option-desc'>Share to Facebook</h3>
            </div>
          </a>
          <a href='#' onClick={this.handleMessengerShare}>
            <div className='share-option'>
              <i className='fa fa-commenting share-icon'/>
              <h3 className='share-option-desc'>Send through Messenger</h3>
            </div>
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${'Draw and guess things with me at https://www.noonchi.xyz/g/' +
            this.props.game.roomNumber}!`}>
            <div className='share-option'>
              <i className='fa fa-twitter share-icon'/>
              <h3 className='share-option-desc'>Share to Twitter</h3>
            </div>
          </a>
          <button className='close-modal-btn' onClick={this.handleCloseInviteModal}>
            Close
          </button>
        </Modal>
      </div>
    )
  }
}
