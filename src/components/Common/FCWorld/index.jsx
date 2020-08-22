import React, { Component, Fragment } from 'react'
import './index.less'

class FCWorld extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <Fragment>
        <img src={require('../../../assets/img/brandcenter/fansinteraction/code.png')} alt="" />
        <p>更多精彩内容</p>
        <p>尽在丰潮世界</p>
      </Fragment>
    )
  }
}

export default FCWorld