import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { Modal } from 'antd'
import DASystem from './DASystem';
import AVNSystem from './AVNSystem';
import './index.less'

class CorollaNet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      SystemType: 'DA',
      visible: false,
      ModalCodeType: 'DACode'
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleMediaSystem(type) {
    this.setState({
      SystemType: type
    })
  }
  handleModalSystem(type){
    this.setState({
      ModalCodeType: type
    })
  }
  render() {
    const { SystemType, ModalCodeType } = this.state
    return (
      <div className='handleCorollaConnect'>
        <div className='ConnectIntroduce'>
          <p>一汽丰田卡罗拉互联致力于为卡罗拉17款车型车主提供更便捷的智能汽车服务，通过线缆或无线直显方式把手机与车载机相连接，</p>
          <p>使驾驶人员更便捷，更安全的在车载机上操作导航，电话，音乐，视频等手机的各项功能，从而提高舒适性，</p>
          <p>趣味性及安全性，为用户开启智能驾驶时代的汽车生活。</p>
        </div>
        <div className='ConnectContent'>
          <div className='ConnectDownload'>
            <span>
              <img src={require('../../../../assets/img/hiconnect/corolla.png')} alt="" />
              <div>
                <h3>卡罗拉互联</h3>
                <p>仅适用于卡罗拉17款全系车型</p>
              </div>
            </span>
            <span onClick={this.showModal}  style={{cursor: 'pointer'}}>
              <h3>点击下载</h3>
              <img src={require('../../../../assets/img/hiconnect/load.png')} alt="" />
            </span>
          </div>
          <div className='SwitchTitle'>
            <h2 onClick={() => { this.handleMediaSystem('DA') }} className={classNames({ 'sel-system-type': SystemType === 'DA' })}>DA多媒体显示系统</h2>
            <h2 onClick={() => { this.handleMediaSystem('AVN') }} className={classNames({ 'sel-system-type': SystemType === 'AVN' })}>AVN多媒体导航系统</h2>
          </div>
          {
            SystemType === 'DA' ?
              <DASystem />
              :
              <AVNSystem />
          }
        </div>

        <Modal
          title=" "
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          wrapClassName='carnet-downloadmodal'
          centered={true}
        >
          <div className='SwitchCode'>
            <h2 onClick={() => { this.handleModalSystem('DACode') }} className={classNames({ 'sel-system-type': ModalCodeType === 'DACode' })}>DA多媒体显示系统</h2>
            <h2 onClick={() => { this.handleModalSystem('AVNCode') }} className={classNames({ 'sel-system-type': ModalCodeType === 'AVNCode' })}>AVN多媒体导航系统</h2>
          </div>
          {
            ModalCodeType === 'AVNCode' ?
              <div className='DAContent'>
                <img src={require('../../../../assets/img/hiconnect/twocode.png')} alt="" />
                <p>
                  <span>豌豆荚市场下载</span>
                  <span>360助手下载</span>
                </p>
              </div>
              :
              <div className='AVNContent'>
                <img src={require('../../../../assets/img/hiconnect/code.png')} alt="" />
                <p>
                  <span>IOS系统下载</span>
                  <span>豌豆荚市场下载</span>
                  <span>360助手下载</span>
                </p>
              </div>
          }
        </Modal>
      </div>
    )
  }
}

export default CorollaNet
