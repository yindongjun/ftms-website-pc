import React, { Component } from 'react'
import classNames from 'classnames'
import './index.less'
import Safety from '../../../components/BrandCenter/SocialResponsibility/Safety';
import Enviorment from '../../../components/BrandCenter/SocialResponsibility/Enviorment';
import Educate from '../../../components/BrandCenter/SocialResponsibility/Educate';

const data = [
  {
    span1: '时间',
    span2: '2018-2020年',
    span3: '2021-2023年',
    span4: '2024-2026年'
  },
  {
    span1: '运营',
    span2: '体系化管理：构建企业社会责任体系',
    span3: '企业社会责任同企业发展紧密连接',
    span4: '产业联动：实现多跨产业联动'
  },
  {
    span1: '方法',
    span2: '坚持环保/育人/安全，构建企业社会责任体系',
    span3: <p>企业社会责任融入企业管理及产品创新，<br/>建立可持续发展的企业社会责任体系</p>,
    span4: <p>围绕“人车社会”构建跨产业的企业社会责任体系,<br/>致力于人类社会的可持续发展</p>
  },
  {
    span1: '周期',
    span2: '2018-2020年（具体规划）',
    span3: '2021-2023年（发展方向）',
    span4: '2024-2026年（愿景展望）'
  },
  {
    span1: '安全',
    span2: '儿童交通安全主题教育行动/儿童交通安全体验营',
    span3: <p>覆盖一/二线经销店<br/>实现面向客户的安全体验“场景化”</p>,
    span4: <p>相关产业联动，<br/>助推实现儿童交通安全“低伤亡”</p>
  },
  {
    span1: '环保',
    span2: '藏东高原景观恢复',
    span3: <p calss="span3_p">针对工厂、周边社区及特定生态区域进行有效治理</p>,
    span4: <p>联动产业上下游<br/>共同为建筑“美好城市和美好社会”贡献一己之力</p>
  },
  {
    span1: '育人',
    span2: '希望工程、丰田梦想之车、大学生筑梦行动',
    span3: <p>覆盖全教育周期<br/>培养具体创新精神和社会实践能力的“双一流”人才</p>,
    span4: <p>推动人类社会可持续发展，<br/>助力中国教育事业蓬勃向上</p>
  }
]

class SocialResponsibility extends Component {
  constructor(props){
    super(props)
    this.state ={
      switchOption: 'safety'
    }
  }
  handleSwitch(type){
    this.setState({
      switchOption: type
    })
  }

  render() {
    const {switchOption} = this.state
    return (
      <div className='handleSocialResponsibility'>
        <div className='headerPic'>
          <span>
            <h1>社会责任</h1>
            <i></i>
          </span>
        </div>
        <div className='SocialResponsibilityTitle'>
          <h2>安全、环保、育人</h2>
          <p>“环境保护”，“交通安全”和“人才培养”与社会、企业和产品三方面紧密相连，一一对应，</p>
          <p>是一汽丰田企业社会责任的三大支柱，</p>
          <p>长期以来以此三大支柱为中心一汽丰田积极开展各项社会公益活动。</p>
        </div>
        <div className='project'>
          <h2>2018-2026年一汽丰田企业社会责任战略规划</h2>
          <p><i>战略目标</i>：构筑有益于社会绿色健康可持续发展的社会责任体系，做“负责的企业公民”。</p>
          <ul className='projectList'>
            {
              data.map((v, i) => {
                return <li key={i}>
                  <ul>
                    <li>{v.span1}</li>
                    <li>{v.span2}</li>
                    <li>{v.span3}</li>
                    <li>{v.span4}</li>
                  </ul>
                </li>
              })
            }
          </ul>
        </div>
        <div className='Action'>
          <h2>实际行动</h2>
          <ul className='ActionNav'>
            <li onClick={() => this.handleSwitch('safety')} className={classNames({ 'sel-option': switchOption === 'safety' })}>安全</li>
            <li onClick={() => this.handleSwitch('envir')} className={classNames({ 'sel-option': switchOption === 'envir' })}>环保</li>
            <li onClick={() => this.handleSwitch('educate')} className={classNames({ 'sel-option': switchOption === 'educate' })}>育人</li>
          </ul>
          {
            switchOption==='safety'?
            <Safety/>
            :
            switchOption==='envir'?
            <Enviorment/>
            :
            switchOption==='educate'?
            <Educate/>
            :
            null
          }
        </div>
      </div>
    )
  }
}

export default SocialResponsibility