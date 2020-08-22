import React, { Component } from 'react'
import { Icon } from 'antd'
import './index.less'

class AVNSystem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      carouselPosition: 0,
      carouselNum: 5
    }
  }

  carouselLeft = () => {
    this.setState((prev) => {
      if (prev.carouselPosition >= 0) {
        return {
          carouselPosition: -(Math.ceil(this.state.carouselNum / 4) - 1) * 11.86
        }
      }
      return {
        carouselPosition: prev.carouselPosition + 11.86
      }
    })
  }

  carouselRight = () => {
    this.setState((next) => {
      if (next.carouselPosition <= -(Math.ceil(this.state.carouselNum / 4) - 1) * 11.86) {
        return {
          carouselPosition: 0
        }
      }
      return {
        carouselPosition: next.carouselPosition - 11.86
      }
    })
  }

  render() {
    const { carouselPosition, carouselNum } = this.state
    return (
      <div className='handleAVNSystem'>
        <div>
          <h2>产品简介</h2>
          <div>
            <p>本应用程序用于一汽丰田卡罗拉汽车上有线镜像功能。</p>
            <p>通过线缆或无线直显方式把Android4.0.3以上的手机与车载机相连接.使驾驶人员更便捷,更安全的在车载机上操作导航，电话,音乐,视频等手机的各项功能。</p>
            <p>从而提高舒适性,趣味性及安全性,为用户开启智能驾驶时代的汽车生活。</p>
          </div>
        </div>
        <div>
          <h2>界面展示</h2>
          <div>
            <h3><Icon type="android" />Android系统 - AVN多媒体导航系统</h3>
            {/* <div style={{ width: '11.86rem' }}>
              <ul style={{ 'left': carouselPosition + 'rem', 'width': Math.ceil(carouselNum / 4) * 11.86 + 'rem' }}> */}
            <div>
              <ul>
                <li><img src={require('../../../../../assets/img/hiconnect/avnand1.png')} alt="" /></li>
                <li><img src={require('../../../../../assets/img/hiconnect/avnand2.png')} alt="" /></li>
                <li><img src={require('../../../../../assets/img/hiconnect/avnand3.png')} alt="" /></li>
                {/* <li><img src={require('../../../../../assets/img/hiconnect/avnand2.png')} alt="" /></li>
                <li><img src={require('../../../../../assets/img/hiconnect/avnand3.png')} alt="" /></li> */}
              </ul>
            </div>
            {/* <span>
              <Icon type="left-circle" onClick={this.carouselLeft} />
              <Icon type="right-circle" onClick={this.carouselRight} />
            </span> */}
          </div>
        </div>
      </div>
    )
  }
}

export default AVNSystem