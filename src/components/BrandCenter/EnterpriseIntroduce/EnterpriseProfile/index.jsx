// 企业概况
import React, { Component } from 'react'
import './index.less'

const companylist = [
  {
    personal: '出资者',
    faw: '第一汽车股份有限公司(FAW)',
    tmc: '丰田汽车公司(TMC)',
    ftm: '天津一汽丰田(TFTM)',
    sftm: '四川一汽丰田(SFTM)',
    total: '合计'
  },
  {
    personal: '出资额（百万美元）',
    faw: '9.5',
    tmc: '8',
    ftm: '6.5',
    sftm: '1.25',
    total: '25'
  },
  {
    personal: '占注册资本比例（%）',
    faw: '38',
    tmc: '32',
    ftm: '25',
    sftm: '5',
    total: '100'
  }
]

class EnterpriseProfile extends Component {
  render() {
    return (
      <div className='handleEnterpriseProfile'>
        <div className='EnterpriseIntroduce'>
          <div className='title'>
            <h2>企业概要</h2>
            <p>Company brief</p>
          </div>
          <div className='EnterpriseIntroduceContent'>
            <img src={require('../../../../assets/img/brandcenter/enterpriseintroduce/brief.png')} alt="" />
            <span>
              <div>
                <i>中文全称</i>
                <span>一汽丰田汽车销售有限公司</span>
              </div>
              <div>
                <i>英文全称</i>
                <span>FAW TOYOTA MOTOR SALES CO., LTD.</span>
              </div>
              <div>
                <i>简&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称</i>
                <span>FTMS</span>
              </div>
              <div>
                <i>成立时间</i>
                <span>2003年9月25日</span>
              </div>
              <div>
                <i>注册资金</i>
                <span>2500万美元</span>
              </div>
              <div>
                <i>公司性质</i>
                <span>中外合资经营企业</span>
              </div>
              <div>
                <i>主要业务</i>
                <span>一汽丰田旗下的国产丰田品牌汽车的<br/>销售售后服务和市场管理</span>
              </div>
              <div>
                <i>所&nbsp;&nbsp;在&nbsp;&nbsp;地</i>
                <span>北京市朝阳区</span>
              </div>
            </span>
          </div>
          <ul className='EnterpriseTotal'>
            {
              companylist.map((v, i) => {
                return <li key={i}>
                  <span>{v.personal}</span>
                  <span>{v.faw}</span>
                  <span>{v.tmc}</span>
                  <span>{v.ftm}</span>
                  <span>{v.sftm}</span>
                  <span>{v.total}</span>
                </li>
              })
            }
          </ul>
        </div>
        <div className='enterpriseidea'>
          <div className='title'>
            <h2>企业理念</h2>
            <p>Business ethic</p>
          </div>
          <ul className='ideacontent'>
            <li>
              <h3>企业使命</h3>
              <i></i>
              <p>让更多的客户体验拥有汽车的喜悦，为推动汽车社会的发展贡献力量。</p>
            </li>
            <li>
              <h3>企业精神</h3>
              <i></i>
              <p>尊重、挑战、速度、诚信</p>
            </li>
            <li>
              <h3>企业行动指南</h3>
              <i></i>
              <p>See The Dealers<span>（倾听）</span> </p>
              <p>Plan Ahead<span>（预案）</span></p>
              <p>Keep Learning<span>（学习）</span></p>
            </li>
          </ul>
        </div>
        <div className='manageidea'>
          <div className='title'>
            <h2>经营理念</h2>
            <p>Management concepts</p>
          </div>
          <div className='managecontent'>
            <img src={require('../../../../assets/img/brandcenter/enterpriseintroduce/ln.png')} alt=""/>
            <div>
              <h3>客户第一、经销店第二、厂家第三</h3>
              <p>一汽丰田汽车销售有限公司以“客户第一”为经营理念，在销售及售后服务等方面为客户提供便捷、优质的服务，让更多客户体验拥有汽车的喜悦，是我们执着如一的追求。</p>
              <i></i>
              <p>QDR=品质（Quality）、耐久性（Durability）、可靠性（Reliability）</p>
              <h1>Quality Durability</h1>
              <h1>Reliability</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EnterpriseProfile