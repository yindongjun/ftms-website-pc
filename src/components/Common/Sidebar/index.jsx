import React, { Component } from 'react'
import { BackTop } from 'antd'
import './index.less'
import {share} from '../../../utils/myshare'

const sidebar = [
  // {
  //   ImgURL: "home.png",
  //   title: '返回首页',
  //   url: '/'
  // },
  {
    ImgURL: "3D.png",
    title: '数字展厅',
    url: '/carSellHelp/CarDigiRoom'
  },
  {
    ImgURL: "book.png",
    title: '预约试驾',
    url: '/carSellHelp/appointmentDrive'
  },
  {
    ImgURL: "declare.png",
    title: '经销商查询',
    url: '/dealerinquiry'
  }
]

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ifShow: false
    }
  }
  componentDidMount() {
    let url = window.location.href
    let url2 = url.split("/")[3] || '';
    if (url2 === 'personcenter') {
      this.setState({
        ifShow: false
      })
    } else {
      this.setState({
        ifShow: true
      })
    }
    window.addEventListener('scroll',this.handleScroll.bind(this))
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this))
  }

  handleScroll(e) {
    let scTop = document.documentElement.scrollTop||document.body.scrollTop
    let ele = document.getElementsByClassName('ant-back-top')[0];
    // console.log(ele);
    if (ele) {
      if(scTop > 500) {
        ele.setAttribute('style', 'right: 0');
      } else if(scTop <= 500) {
        ele.setAttribute('style', 'right: -0.5rem');

      }
    }
  }
  // 返回顶部
  scroll (currentY, targetY) {
    // 计算需要移动的距离
    let needScrollTop = targetY - currentY
    let _currentY = currentY
    setTimeout(() => {
      // 一次调用滑动帧数，每次调用会不一样
      const dist = Math.ceil(needScrollTop / 10)
      _currentY += dist
      window.scrollTo(_currentY, currentY)
      // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
      if (needScrollTop > 10 || needScrollTop < -10) {
        this.scroll.bind(this,_currentY, targetY)
      } else {
        window.scrollTo(_currentY, targetY)
      }
    }, 1)
  }
  toTop() {
    // const scrollHeight = document.getElementsByClassName('toTop')[0].offsetTop
    // const currentY = document.documentElement.scrollTop || document.body.scrollTop
    // this.scroll.bind(this,currentY, scrollHeight)
    document.documentElement.scrollTop=0;
    document.body.scrollTop = 0 ;
  }
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
      <div className='keyBtn'>
        <ul className='slide-right-nav'>
          <li>
            <img src={require(`../../../assets/img/sidebar/home.png`)} alt="" />
            <a href='/'>返回首页</a>
          </li>
          {
            sidebar.map((item, index) => {
              return <li key={index}>
                <img src={require(`../../../assets/img/sidebar/${item.ImgURL}`)} alt="" />
                <a target="_blank" href={item.url}>{item.title}</a>
              </li>
            })
          }
          {
            this.state.ifShow ? (<li>
              <img src={require(`../../../assets/img/sidebar/share.png`)} alt="" />
              <div className='share'>
                分享到：
                <img onClick={this.handleShare.bind(this, 'qqim')} src={require(`../../../assets/img/sidebar/qq.png`)} alt="" />
                <img onClick={this.handleShare.bind(this, 'qqzone')} src={require(`../../../assets/img/sidebar/qqSpace.png`)} alt="" />
                <img onClick={this.handleShare.bind(this, 'sinaminiblog')} src={require(`../../../assets/img/sidebar/sina.png`)} alt="" />
              </div>
            </li>) : null
          }

        </ul>
        <div className='toTop' onClick={this.toTop}>
          <div className="ant-back-top">
            <div className="ant-back-top-content">
              <div className="ant-back-top-icon"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar
