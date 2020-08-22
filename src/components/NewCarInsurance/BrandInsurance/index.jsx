import React, {Component} from 'react'
import {Icon} from 'antd'
import './index.less'
import { carSellHelpInter } from '../../../services/carSellHelpInter'

class BrandInsurance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 促销活动列表
      getInsuranceActiveList_RESDATA: []
    }
  }
  // 生命周期
  componentDidMount() {
    this.getInsuranceActiveList()
  }
  // ================================================== 接口函数 ==================================================
  // 促销活动列表
  getInsuranceActiveList() {
    // 促销活动分类type 0新车保险，1延保服务
    let type = 0
    carSellHelpInter.getInsuranceActiveList(type).then( (res) => {
      if(res && res.code === '0') {
        console.log(res.data)
        this.setState({
          getInsuranceActiveList_RESDATA: res.data[0]
        })
      }
    })
  }
  // ============================================================================================================
  render(){
    const {getInsuranceActiveList_RESDATA} = this.state
    return(
      <div className='handleBrandInsurance'>
        <div className='introduce'>
          <p>2017年，一汽丰田以“安心感、优惠的价格、标准化流程、信息透明”为开发理念，</p>
          <p>在国内率先推出AAA品牌服务，旨在为消费者提供轻松购买、便捷理赔的全方位专享保险服务。</p>
        </div>
        <div className='ThreeAdvance'>
          <h1>三大优势</h1>
          <p>从2007年至今，一汽丰田AAA品牌保险为无数车主演绎了一汽丰田“安心、安全、爱用”的客户服务理念，</p>
          <p>让他们可以享受到安心、便捷、专业化、标准化的汽车保险服务。</p>
          <ul className='advanceList'>
            <li>
              <img src={require('../../../assets/img/carSellHelp/newCarInsurance/1.png')} alt=""/>
              <div>
                <h2><i>A</i>：安心——专属维修</h2>
                <span>丰田认证专业人员</span>
                <span>严格遵守丰田标准作业方法维修</span>
              </div>
            </li>
            <li>
              <div>
                <h2><i>A</i>：安全——专属配件</h2>
                <span>100%丰田纯牌零件</span>
                <span>满足丰田全球标准</span>
              </div>
              <img src={require('../../../assets/img/carSellHelp/newCarInsurance/2.png')} alt=""/>
            </li>
            <li>
            <img src={require('../../../assets/img/carSellHelp/newCarInsurance/3.png')} alt=""/>
              <div>
                <h2><i>A</i>：爱用——专属服务</h2>
                <span>国内一线保险企业产品</span>
                <span>一站式贴心服务</span>
              </div>
            </li>
          </ul>
        </div>
        {
          getInsuranceActiveList_RESDATA?
            <div className='InsurancePolicy'>
              <h1>{getInsuranceActiveList_RESDATA.activityTitle}</h1>
              <p>{getInsuranceActiveList_RESDATA.activityContent}</p>
            </div>
            :null
          }
        <div className='cooperation'>
          <h1>保险合作平台</h1>
          <p>积极应对激烈变化的市场，持续强化AAA品牌保险服务，建立客户可以信赖的领先于市场的保险服务品牌。</p>
          <span>
            <img src={require('../../../assets/img/carSellHelp/newCarInsurance/pa.png')} alt=""/>
            <Icon type="plus" />
            <img src={require('../../../assets/img/carSellHelp/newCarInsurance/x.png')} alt=""/>
            <Icon type="plus" />
            <img src={require('../../../assets/img/carSellHelp/newCarInsurance/y.png')} alt=""/>
          </span>
        </div>
      </div>
    )
  }
}

export default BrandInsurance