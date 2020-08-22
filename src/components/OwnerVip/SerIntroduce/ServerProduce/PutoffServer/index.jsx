import React, { Component , Fragment } from 'react'
import {carSellHelpInter} from '@/services/carSellHelpInter'
import './index.less'

class PutoffServer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      yanbao:[]
    }
  }
  componentDidMount(){
    carSellHelpInter.getInsuranceActiveList(1).then((res)=>{
      if(res && res.code==='0'){
        this.setState({
          yanbao:res.data
        })
      }
    })
  }
  render() {
    return (
      <div className='handlePutoffServer'>
        <h2>人有医保  车有延保</h2>
        <div className='putoffServer'>
          <h3>延长保修服务</h3>
          <p>是为车辆提供原厂质保期结束后一定时间内或公里数的延长保修服务。当车辆出现保修范围内的故障时可免费获得维修服务。</p>
        </div>
        <div className='Abrand'>
          <h3>AAA品牌延保</h3>
          <p>AAA延保产品是一汽丰田为旗下相关车型提供的、有保险托底的延保产品。</p>
        </div>
        <div className='guard'>
          <h3>保障责任和保障范围</h3>
          <ul>
            <li>
              <img src={require('../../../../../assets/img/serviceIntroduce/quilty.png')} alt="" />
              <h4>保障责任</h4>
              <div>
                <p>在正常使用条件下由于材料或</p>
                <p>制造商的质量问题而造成的零件</p>
                <p>损坏导致的修理及更换工时费</p>
                <p>用和零配件费用。</p>
              </div>
            </li>
            <li>
              <img src={require('../../../../../assets/img/serviceIntroduce/range.png')} alt="" />
              <h4>保障范围</h4>
              <div>
                <p>全面保障：和厂家原厂保修范围一致</p>
                <p>三大保障：发动机总成、变速器总成、</p>
                <p>前/后轮驱动</p>
                <p>发动机保障：发动机总成</p>
              </div>
            </li>
            <li>
              <img src={require('../../../../../assets/img/serviceIntroduce/yearnum.png')} alt="" />
              <h4>延保年限或公里数</h4>
              <div>
                <p>1年3万公里</p>
                <p>2年6万公里</p>
                <p>3年9万公里</p>
              </div>
            </li>
          </ul>
        </div>
        <div className='advance'>
          <h3>AAA品牌延保的优势</h3>
          <p className='oneadvance'>购买产品的客户可享受全国经销店免费维修</p>
          <p>经销店维修的安心 &nbsp;&nbsp;/&nbsp;&nbsp; 厂家统一服务的安心&nbsp;&nbsp; /&nbsp;&nbsp; 厂家承保的安心 &nbsp;&nbsp;/ &nbsp;&nbsp;二手车残值的安心</p>
        </div>
        <div className='group'>
          <h3>套餐组合</h3>
          <ul>
            <li><img src={require('../../../../../assets/img/serviceIntroduce/fixedicon.png')} alt="" /></li>
            <li>
              <div>
                <img src={require('../../../../../assets/img/serviceIntroduce/tc.png')} alt="" />
                <span>
                  <i>安享套餐</i>
                  <i>定保通+AAA延保</i>
                </span>
              </div>
              <div>
                <img src={require('../../../../../assets/img/serviceIntroduce/cartype.png')} alt="" />
                <span>
                  <i>适用车型</i>
                  <i>COROLLA 卡罗拉、RAV4荣放、VIOS 威驰</i>
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div className='policy'>
          {
            this.state.yanbao.map((v,index)=>{
              return(
                <Fragment key={index}>
                <h3>{v.activityTitle}</h3>
                <p>{v.activityContent}</p>
                </Fragment>
              )
            })
          }
        </div>
        <span className='bottomWarning'>详情请垂询当地经销店</span>
      </div>
    )
  }
}
export default PutoffServer