import React, { Component } from 'react'
import './index.less'

class Emergency extends Component {
  render() {
    return (
      <div className='handleEmergency'>
        <h2>紧急救援</h2>
        <div className='Emergency'>
          <div className='condition'>
            <h3>客户遇到车辆不能正常行驶的情况，可以拨打网点救援电话或者一汽丰田客服电话<span>800-810-1210</span>或<span>400-810-1210</span></h3>
            <p>客户在电话中应尽可能向网点救援人员描述故障现场，并按照网点救援人员的引导查看车辆，以便网点救援人员判断故障。详细告知车辆型号及姓名和移动联系方式，和具体位置，保持手机通讯正常并注意查看，记录网点救援人员电话。</p>
          </div>
          <div className='action-option'>
            <h3>在等待救援小组到达过程中的一些注意事项，例如：</h3>
            <p>1）车辆抛锚在路面，打开故障警示灯，在车后方安全距离处设置故障警示牌（后备箱内）。</p>
            <p>2）保持手机畅通，便于随时联络。</p>
            <p>3）寻找安全场所等待，确保人身安全。如果车辆在高速公路上出现故障，应立即打开双闪警示灯并将车辆移至紧急停车带。同时人员应离开车辆转移至高速公路道路外安全地带。</p>
            <p>4）当车辆抛锚在路面，客户需要离车时，注意锁好车辆，以确保财产安全。</p>
          </div>
          <div className='manual-load'>
            <img src={require('../../../../assets/img/serverhall/emccar.png')} alt="" />
            <span>
              <img src={require('../../../../assets/img/serverhall/commonsc.png')} alt="" />
              <i>
                {/* <h3>通用版救援手册下载</h3> */}
                <a href="https://www.ftms.com.cn/download.php?files=/pdf/tu1.pdf" class="download">通用版救援手册下载 </a >
                <img className='one' src={require('../../../../assets/img/serverhall/loadb.png')} alt="" />
                <img className='two' src={require('../../../../assets/img/serverhall/loadw.png')} alt="" />
              </i>
            </span>
            <span>
              <img src={require('../../../../assets/img/serverhall/kllsc.png')} alt="" />
              <i>
                {/* <h3>通用版救援手册下载</h3> */}
                <a href="https://www.ftms.com.cn/download.php?files=/pdf/tu3.pdf" class="download">卡罗拉双擎救援手册下载</a >
                <img className='one' src={require('../../../../assets/img/serverhall/loadb.png')} alt="" />
                <img className='two' src={require('../../../../assets/img/serverhall/loadw.png')} alt="" />
              </i>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Emergency