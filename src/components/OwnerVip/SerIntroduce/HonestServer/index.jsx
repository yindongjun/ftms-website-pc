import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import './index.less'

class HonestServer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
      step: 'ONE'
    }
  }

  handleShowContent = (e) => {
    this.setState({
      isShow: true,
      step: e
    })
  }
  handleHideContent = (e) => {
    this.setState({
      isShow: false,
      step: e
    })
  }

  render() {
    const { isShow, step } = this.state
    return (
      <div className='handleHonestServer'>
        <div className='honestServer'>
          <h2>诚信服务</h2>
          <div>
            <p>自2003年成立至今，一汽丰田始终秉承“专业对车，诚意待人”的服务理念，从对车到对人开展双重关注，潜心打造“诚信服务”品牌。</p>
            <p>专业是售后服务的基础，诚意是完善售后服务需秉承的态度。</p>
          </div>
        </div>
        <div className='sixstep'>
          <h2>标准服务流程6步法</h2>
          <div className='explain'>
            <p>目前一汽丰田已形成了快速保养、快速钣喷、定保通、24小时救援、身边杂志等多项特色服务项目，</p>
            <p>及上门服务、经销店开放日、服务节、爱车养护课堂、服务嘉年华、卡罗拉DAY等多种特色服务营销活动。并以T-TEP技术人材培育体系等一项又一项举措，</p>
            <p>给车辆提供专业高品质服务的同时，也让客户充分感受到温暖与关怀。</p>
          </div>
          <ul className='process'>
            <li onMouseEnter={() => { this.handleShowContent('ONE') }} onMouseLeave={() => { this.handleHideContent('ONE') }}>
              <h3>1、保养提醒&预约</h3>
              <img src={require('../../../../assets/img/serviceIntroduce/maintain.png')} alt="" />
            </li>
            <li onMouseEnter={() => { this.handleShowContent('TWO') }} onMouseLeave={() => { this.handleHideContent('TWO') }}>
              <h3>2、预约准备</h3>
              <img src={require('../../../../assets/img/serviceIntroduce/ready.png')} alt="" />
            </li>
            <li onMouseEnter={() => { this.handleShowContent('THREE') }} onMouseLeave={() => { this.handleHideContent('THREE') }}>
              <h3>3、接待</h3>
              <img src={require('../../../../assets/img/serviceIntroduce/jd.png')} alt="" />
            </li>
            <li onMouseEnter={() => { this.handleShowContent('FOUR') }} onMouseLeave={() => { this.handleHideContent('FOUR') }}>
              <h3>4、生产</h3>
              <img src={require('../../../../assets/img/serviceIntroduce/develop.png')} alt="" />
            </li>
            <li onMouseEnter={() => { this.handleShowContent('FIVE') }} onMouseLeave={() => { this.handleHideContent('FIVE') }}>
              <img src={require('../../../../assets/img/serviceIntroduce/car.png')} alt="" />
              <h3>5、交车</h3>
            </li>
            <li onMouseEnter={() => { this.handleShowContent('SIX') }} onMouseLeave={() => { this.handleHideContent('SIX') }}>
              <img src={require('../../../../assets/img/serviceIntroduce/fixed.png')} alt="" />
              <h3>6、维修后跟踪服务</h3>
            </li>
          </ul>
          <div className={classNames({ 'process-content': isShow, 'process-content-hide': !isShow })}>
            {
              step === 'ONE' ?
                <Fragment>
                  <span>
                    <img src={require('../../../../assets/img/serviceIntroduce/warning.png')} alt="" />
                    <h3>保养提醒&预约</h3>
                  </span>
                  <ul>
                    <li>· 根据车主的用车需求来推测车辆的保养时间并提醒车主</li>
                    <li>· 根据车主的实际需求给车主提出保养、维修方面的专业建议</li>
                    <li>· 使用服务进程控制看板来识别可用的技师、工位、并向车主建议可行的预约时间</li>
                  </ul>
                </Fragment>
                : step === 'TWO' ?
                  <Fragment>
                    <h3>预约准备</h3>
                    <ul>
                      <li>· 准备所需零件、工具以及人员，确保保养&维修服务可以顺利进行</li>
                      <li>· 合理安排人员提升工作效率，避免出现技师怠工的现象</li>
                      <li>· 与车主进行预约确认，减少失约车主</li>
                    </ul>
                  </Fragment>
                  :
                  step === 'THREE' ?
                    <Fragment>
                      <h3>接待</h3>
                      <ul>
                        <li>· 引导车主停车、并热情问候车主</li>
                        <li>· 确认车主到店目的、以及车主和车辆信息</li>
                        <li>· 安装车辆检查三件套保护车主车辆</li>
                        <li>· 与车主一同进行环车检查</li>
                        <li>· 提供保养&维修建议，向车主解释工作项目、预估费用和交车时间</li>
                        <li>· 再次确认车主所有需求、填写施工单</li>
                      </ul>
                    </Fragment>
                    :
                    step === 'FOUR' ?
                      <Fragment>
                        <h3>生产</h3>
                        <ul>
                          <li>· 根据技术水平和当天工作计划分配工单</li>
                          <li>· 优先对待返修和等待车主</li>
                          <li>· 利用可视化管理工作来跟踪技师的作业情况</li>
                          <li>· 出现追加作业的情况，必须与车主进行事先确认来取得授权</li>
                        </ul>
                      </Fragment>
                      :
                      step === 'FIVE' ?
                        <Fragment>
                          <h3>交车</h3>
                          <ul>
                            <li>· 像车主进行问候</li>
                            <li>· 展示旧件或指出修理的部位</li>
                            <li>· 解释费用明细</li>
                            <li>· 确认车况、交换车主物品</li>
                            <li>· 开具发票、陪同车主付款</li>
                            <li>· 感谢车主并进行送别</li>
                          </ul>
                        </Fragment>
                        :
                        <Fragment>
                          <h3>维修后跟踪服务</h3>
                          <ul>
                            <li>· 在72小时以内回访车主</li>
                            <li>· 记录车主的反馈</li>
                            <li>· 对车主的要求、以及不满意车主进行跟踪回访</li>
                          </ul>
                        </Fragment>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default HonestServer