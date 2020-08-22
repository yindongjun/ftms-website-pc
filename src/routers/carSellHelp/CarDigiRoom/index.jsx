import React, { Component, Fragment } from 'react'
import './index.less'

class CarDigiRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

      var height = window.document.body.offsetHeight - 70;
      console.log(`iframe高度：${height}`)
        if(height / window.document.body.offsetWidth > 1067/1920){
            height = window.document.body.offsetWidth * (1067/1920)
        }
      document.getElementById('digi_iframes').style.height=height+'px'

    }

    render() {
        return (
            <div className = 'CarDigiRoom'>
              <iframe id='digi_iframes' src='/3d/pc/room/index.html' scrolling="no" width='100%' height='100%'>
              </iframe>
            </div>
        )
    }
}

export default CarDigiRoom
