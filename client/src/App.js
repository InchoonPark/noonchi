import React from 'react'
import Alert from 'react-s-alert'

import 'react-s-alert/dist/s-alert-default.css'
import './custom-s-alert.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
import 'react-s-alert/dist/s-alert-css-effects/scale.css'
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css'
import 'react-s-alert/dist/s-alert-css-effects/flip.css'
import 'react-s-alert/dist/s-alert-css-effects/genie.css'
import 'react-s-alert/dist/s-alert-css-effects/jelly.css'
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css'

import CustomAlert from './components/CustomAlert'

const App = (props) => (
  <div>
    {props.children}
    <Alert
      contentTemplate={CustomAlert}
      stack={{limit: 3}} />
  </div>
)

export default App
