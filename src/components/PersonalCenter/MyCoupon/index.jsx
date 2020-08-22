import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Pagination  } from 'antd';
import classNames from 'classnames'
import { querryStringToObject } from '../../../utils/util'
import { personalInfo } from '../../../services/personalInfo'
import moment from 'moment'
import './index.less'

class MyCoupon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      CouponType: 'unused', // 未使用  USED 已使用 UPTODATE 已过期
      page: 0,
      hasNextPage: true,
      unusedNum: 0,
      usedNum: 0,
      staleNum: 0,
      couponList: [],
      current: 1,
      allPageSize: 0,
      pageSize: 6
    }
  }
  componentDidMount() {
    this.showCouponTab(this.state.page);
  }
  handleSwitch(type) {
    this.setState({
      current: 1,
      couponList: []
    })
    this.showCouponTab(0,type);
  }
  showCouponTab(page,type,cur) {
    console.log(page,type,cur);
    if(cur){

    }else {
      page++;
    }
    const search = this.props.location.search;
    const params = querryStringToObject(search);
    this.setState({
      CouponType: type?type:params.status
    })
    const obj = {};
    obj.beginPage = cur?cur:page;
    obj.cardStatus = type?type:params.status;
    obj.mobile = '';
    obj.mallMemberId = '';
    obj.pageSize = this.state.pageSize;
    personalInfo.cardList(obj).then((res) => {
      if(res && res.code=='0') {
        if(res.data.basePageObject.dataList.length>0) {
          this.setState({
            couponList: [...this.state.couponList,...res.data.basePageObject.dataList],
          })
        }
        this.setState({
          hasNextPage: res.data.basePageObject.hasNextPage,
          unusedNum: res.data.unusedNum,
          usedNum: res.data.usedNum,
          staleNum: res.data.staleNum,
          page: page,
          allPageSize: obj.cardStatus=='unused'?
            res.data.unusedNum:obj.cardStatus=='used'?
            res.data.usedNum:res.data.staleNum
        })
      }
    })
  }
  changepage(page) {
    this.setState({
      couponList: []
    })
    if(page>Math.ceil(this.state.allPageSize/6)||page<1) {

    }else {
      this.setState({
        current:page
      })
      this.showCouponTab(this.state.page,this.state.CouponType,page)
    }
  }
  render() {
    const { CouponType, unusedNum, usedNum, staleNum, couponList, page, current, allPageSize } = this.state
    return (
      <div className='handleMyCoupon'>
        <h2>我的卡券</h2>
        <div className='MyCouponTitle'>
          <Link to='/personcenter/home'>返回个人中心</Link>
          <span>
            <i onClick={() => { this.handleSwitch('unused') }} className={classNames({ 'sel-coupon-type': CouponType == 'unused' })}>未使用（{unusedNum==null?0:unusedNum}）</i>
            <i onClick={() => { this.handleSwitch('used') }} className={classNames({ 'sel-coupon-type': CouponType == 'used' })}>已使用（{usedNum==null?0:usedNum}）</i>
            <i onClick={() => { this.handleSwitch('stale') }} className={classNames({ 'sel-coupon-type': CouponType == 'stale' })}>已过期（{staleNum==null?0:staleNum}）</i>
          </span>
        </div>
        <ul className='CouponList'>
          {
            couponList.map((item, i) => {
              return <li key={i} className={CouponType}>
                <div className='cardLeft'>
                  <h1><i>￥</i>{item.listPrice}</h1>
                  <span>{item.goodsName} </span>
                </div>
                <div className='cardRight'>
                  <span>适用范围：<i>{item.cardUse}</i></span>
                  <span>适用规则：<i>{item.depositPrice}元抵{item.listPrice}元</i></span>
                  <span>有效期：{moment(item.effectTime).format('YYYY-MM-DD')}-{moment(item.expireTime).format('YYYY-MM-DD')}</span>
                </div>
                {
                  CouponType === 'used' ?
                    <span className='mark'><img src={require('../../../assets/img/personsenter/used-icon.png')} alt=""/></span>
                    :
                    CouponType === 'stale' ?
                      <span className='mark'><img src={require('../../../assets/img/personsenter/logouptodate.png')} alt=""/></span>
                      :
                      null
                }
              </li>
            })
          }
          {/* {
            [1, 2, 3, 4].map((v, i) => {
              return <li key={i} className={CouponType}>
                <div className='cardLeft'>
                  <h1><i>￥</i>99</h1>
                  <span>【99元抵1999元】</span>
                </div>
                <div className='cardRight'>
                  <span>适用范围：<i>新车购买</i></span>
                  <span>适用规则：<i>99元抵1999元</i></span>
                  <span>有效期：2018.12.21-2019.05.21</span>
                </div>
                {
                  CouponType === 'used' ?
                    <span className='mark'><img src={require('../../../assets/img/personsenter/used-icon.png')} alt=""/></span>
                    :
                    CouponType === 'stale' ?
                      <span className='mark'><img src={require('../../../assets/img/personsenter/logouptodate.png')} alt=""/></span>
                      :
                      null
                }
              </li>
            })
          } */}
          <Pagination onChange={this.changepage.bind(this)} current={current} showQuickJumper pageSize={6} defaultCurrent={1} total={allPageSize} />
        </ul>
      </div>
    )
  }
}

export default MyCoupon