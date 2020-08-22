import React, { Component, Fragment } from 'react'
import './index.less'

class digiCorolla extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

    var height = window.document.body.offsetHeight - 70;
    document.getElementById('digi_iframes').style.height=height+'px'

  }

  render() {
    return (
      <div className = 'CarDigiRoom'>
        <iframe id='digi_iframes' src='/3d/pc/corollaphev/index.html' scrolling="no" width='100%' height='100%'>
        </iframe>
      </div>
    )
  }
}

export default digiCorolla
