import React, { Component } from 'react'
import './index.less'
import {share} from '../../../utils/myshare'

class Share extends Component {
  handleShare(type) {
    if (type === 'qqzone') {
      share('qzone')
      // 跳转
    } else {
      share(type)
    }
  }
  render() {
    return (
      <div className='sharebox'>
        <span>
          <p>分享到.</p>
          <img src={require('../../../assets/img/brandcenter/wonderful/code.png')} alt="" />
        </span>
        <i></i>
        <ul>
          <li onClick={this.handleShare.bind(this, 'qqim')}>
            <img src={require('../../../assets/img/brandcenter/wonderful/QQ.png')} alt="" />
            <span>QQ好友</span>
          </li>
          <li onClick={this.handleShare.bind(this, 'qqzone')}>
            <img src={require('../../../assets/img/brandcenter/wonderful/space.png')} alt="" />
            <span>QQ空间</span>
          </li>
          <li onClick={this.handleShare.bind(this, 'sinaminiblog')}>
            <img src={require('../../../assets/img/brandcenter/wonderful/xinlang.png')} alt="" />
            <span>新浪微博</span>
          </li>
        </ul>
      </div>
    )
  }
}

export default Share
