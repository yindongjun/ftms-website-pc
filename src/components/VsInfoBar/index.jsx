import React, { Component, Fragment } from 'react'
import './index.less'
import { message } from 'antd';
import { add, del, getAll, delAll } from '../../redux/vsCarList.redux'
import { connect } from 'react-redux'

@connect(
    state => state,
    { add, del, getAll, delAll }
)

class VsInfoBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
    this.show = this.show.bind(this)
    this.toVsCarPage = this.toVsCarPage.bind(this)
  }

  show() {
    // this.setState( (pre) => {
    //   return {
    //     isShow: !pre.isShow
    //   }
    // })
    this.props.show()
    // this.forceUpdate()
  }

  // 删除 redux 里的公共状态
  deleteRow(delIndex, e) {
    e.stopPropagation();
    if (delIndex === 'all') {
      this.props.delAll()
    } else {
      if (this.props.getAll().vsCarListInfo.length <= 2) {
        message.warn('至少需要两款车型')
      }
      this.props.del(delIndex)
    }
    this.forceUpdate()
  }

  // 跳转车型对比页面
  toVsCarPage() {
    let arr = this.props.getAll().vsCarListInfo
    if(arr.length < 2) {
      message.warn('最少需要两款车型')
      return
    }
    this.props.toVsCarPage()
  }

  render() {
    return (
      <div className = {`vsInfoBar ${this.props.isVSBarShow ? 'active' : null}`} onClick = {this.show}>
        <div className = 'vsBtn'>
          <i></i>
          <p>车型对比</p>
          {
            this.props.isVSBarShow ? <span>&gt;</span> : <span>&lt;</span>
          }
        </div>
        <h2>车型对比</h2>
        <ul>
          {
            this.props.getAll().vsCarListInfo && this.props.getAll().vsCarListInfo.map( (item, index) => {
              return (
                <li key = {index}>
                  <b>{item.cartype}</b>
                  <span dangerouslySetInnerHTML={{ __html:`${item.version} ${item.name}`}}></span>
                  <i onClick = {this.deleteRow.bind(this, index)}>X</i>
                </li>
              )
            })
          }
        </ul>
        {
          this.props.getAll().vsCarListInfo.length !== 0 ? 
          (<Fragment>
            <p>最多可选4个<span onClick = {this.deleteRow.bind(this, 'all')}><i></i> 清空</span></p>
            <div className = 'VS' onClick = {this.toVsCarPage}>开始对比</div>
          </Fragment>) : null
        }
      </div>
    )
  }
}

export default VsInfoBar