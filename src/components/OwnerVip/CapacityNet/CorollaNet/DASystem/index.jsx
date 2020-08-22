import React, { Component } from 'react'
import { Icon } from 'antd'
import './index.less'

class DASystem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carouselPosition: 0,
      carouselNum: 5,
      carouselPosition1: 0,
      carouselNum1: 5
    }
  }

  carouselLeft = (text) => {
    if(text=='ios'){
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
    }else{
      this.setState((prev) => {
        if (prev.carouselPosition1 >= 0) {
          return {
            carouselPosition1: -(Math.ceil(this.state.carouselNum1 / 4) - 1) * 11.86
          }
        }
        return {
          carouselPosition1: prev.carouselPosition1 + 11.86
        }
      })
    }
  }

  carouselRight = (text) => {
    console.log(text)
    if(text=='ios'){
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
    }else{
      this.setState((next) => {
        if (next.carouselPosition1 <= -(Math.ceil(this.state.carouselNum1 / 4) - 1) * 11.86) {
          return {
            carouselPosition1: 0
          }
        }
        return {
          carouselPosition1: next.carouselPosition1 - 11.86
        }
      })
    }
  }


  render() {
    const { carouselPosition, carouselNum,carouselPosition1, carouselNum1 } = this.state
    return (
      <div className='handleADSystem'>
        <div>
          <h2>产品简介</h2>
          <div>
            <p>本应用程序用于一汽丰田卡罗拉汽车上有线镜像功能。</p>
            <p>通过线缆直显示方式把iphone4S以上的手机与车载相机连接，使驾驶人员在行驶中更便捷，更安全的在线导航功能，从而提高驾驶的安全性，为用户开启智能驾驶时代的汽车生活。</p>
          </div>
        </div>
        <div>
          <h2>界面展示</h2>
          <div>
            <h3><Icon type="apple" />IOS系统 - DA多媒体显示系统</h3>
            {/* <div style={{ width: '11.86rem' }}>
              <ul style={{ 'left': carouselPosition + 'rem', 'width': Math.ceil(carouselNum / 4) * 11.86 + 'rem' }}> */}
            <div>
              <ul>
                <li><img src={require('../../../../../assets/img/hiconnect/ios1.png')} alt="" /></li>
                <li><img src={require('../../../../../assets/img/hiconnect/ios2.png')} alt="" /></li>
                <li><img src={require('../../../../../assets/img/hiconnect/ios3.png')} alt="" /></li>
                {/* <li><img src={require('../../../../../assets/img/hiconnect/ios4.png')} alt="" /></li> */}
              </ul>
            </div>
            {/* <span>
              <Icon type="left-circle" onClick={()=>{this.carouselLeft('ios')}} />
              <Icon type="right-circle" onClick={()=>{this.carouselRight('ios')}} />
            </span> */}
          </div>
          <div>
            <h3><Icon type="android" />Android系统 - DA多媒体显示系统</h3>
            {/* <div style={{ width: '11.86rem' }}>
              <ul style={{ 'left': carouselPosition1 + 'rem', 'width': Math.ceil(carouselNum1 / 4) * 11.86 + 'rem' }}> */}
            <div>
              <ul>
                <li><img src={require('../../../../../assets/img/hiconnect/andriod1.png')} alt="" /></li>
                <li><img src={require('../../../../../assets/img/hiconnect/andriod2.png')} alt="" /></li>
                <li><img src={require('../../../../../assets/img/hiconnect/andriod3.png')} alt="" /></li>
                <li><img src={require('../../../../../assets/img/hiconnect/andriod4.png')} alt="" /></li>
                </ul>
            </div>
            {/* <span>
              <Icon type="left-circle" onClick={()=>{this.carouselLeft('and')}} />
              <Icon type="right-circle" onClick={()=>{this.carouselLeft('and')}} />
            </span> */}
          </div>
        </div>
      </div >
    )
  }
}

export default DASystem