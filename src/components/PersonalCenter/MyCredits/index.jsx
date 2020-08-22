import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Select, Pagination  } from 'antd';
import classNames from 'classnames'
import './index.less'

class MyCredits extends Component {
  constructor(props){
    super(props)
    this.state={
      CreditsType: 'VIP'
    }
  }
  handleSwitch(type){
    this.setState({
      CreditsType: type
    })
  }
  render() {
    const Option = Select.Option;
    const {CreditsType}=this.state
    return (
      <div className='handleMyCredits'>
        <h2>我的积分</h2>
        <div className='MyCreditsTitle'>
          <Link to='/personcenter/home'>返回个人中心</Link>
          <span>
            <i onClick={()=>{this.handleSwitch('VIP')}} className={classNames({'sel-credits-type':CreditsType=='VIP'})}>会员积分</i>
            <i onClick={()=>{this.handleSwitch('FANS')}} className={classNames({'sel-credits-type':CreditsType=='FANS'})}>粉丝积分</i>
          </span>
        </div>
        <div className='MyCreditsContent'>
          <div className='contentheader'>
            <label>积分记录查询：</label>
            <Select defaultValue="获得" style={{ width: '2rem', height: '.4rem' }}>
              <Option value="获得">获得</Option>
              <Option value="消耗">消耗</Option>
            </Select>
            <i>共搜索到922条数据</i>
            <span>当前积分：<i>2000</i></span>
          </div>
          <ul className='contentList'>
            {
              [1,2,3,4,5].map((v,i)=>{
                return <li key={i}>
                  <label>+1000</label>
                  <span>兑换xxx获得20积分</span>
                  <i>2018-12-10 12:00:00</i>
                </li>
              })
            }
          </ul>
          <Pagination showQuickJumper defaultCurrent={1} total={100} />
        </div>
      </div>
    )
  }
}

export default MyCredits