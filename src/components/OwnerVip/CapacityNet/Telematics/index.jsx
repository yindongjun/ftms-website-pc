import React, { Component } from 'react'
import { Modal } from 'antd'
import './index.less'

class Telematics extends Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false
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

  render() {
    return (
      <div className='handleTelematics'>
        <div className='TelematicsHeader'>
          <p>一汽丰田车联网通过车内网、车载移动互联网和车际网，</p>
          <p>建立车与车主、车与路、车与车、车与外部世界之间的连接，</p>
          <p>实现智能动态信息服务和车辆智能化控制。致力于为车主提供全面、智能、贴心的车联网服务。</p>
        </div>
        <div className='TelematicsContent'>
          <div className='ConnectDownload'>
            <span>
              <img src={require('../../../../assets/img/hiconnect/yficon.png')} alt="" />
              <h3>一汽丰田</h3>
            </span>
            <span onClick={this.showModal} style={{cursor: 'pointer'}}>
              <h3>点击下载</h3>
              <img src={require('../../../../assets/img/hiconnect/load.png')} alt="" />
            </span>
          </div>
          <div className='NewEnergy'>
            <h1>新能源专享</h1>
            <div>
              <h2>功能简介</h2>
              <div>
                <p>通过官方APP中的新能源专享功能，可以实现车辆信息的实时查看、充电桩的查找、生态指数排名与消息推送等服务，</p>
                <p>从而提升新能源车主的便捷性，享受全新的智能车生活时代。</p>
              </div>
            </div>
            <div className='net-car-type'>
              <h2>互联车型</h2>
              <img src={require('../../../../assets/img/hiconnect/car.png')} alt="" />
              <h3>卡罗拉双擎E+</h3>
            </div>
            <div className='function-Introduce'>
              <h2>功能介绍</h2>
              <ul>
                <li>
                  <img src={require('../../../../assets/img/hiconnect/cd.png')} alt="" />
                  <div>
                    <i>1</i>
                    <span>
                      <p>车辆信息实时展示</p>
                      <p>随时查看您的爱车状况</p>
                    </span>
                  </div>
                </li>
                <li>
                  <img src={require('../../../../assets/img/hiconnect/default.png')} alt="" />
                  <div>
                    <i>2</i>
                    <span>
                      <p>充电桩查找，</p>
                      <p>快速查找您身边的充电桩。</p>
                    </span>
                  </div>
                </li>
                <li>
                  <img src={require('../../../../assets/img/hiconnect/prev.png')} alt="" />
                  <div>
                    <i>3</i>
                    <span>
                      <p>生态指数统计，</p>
                      <p>环保贡献，一目了然。</p>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='moreFunction'>
          <h2>更多功能，敬请期待</h2>
          <ul>
            <li>
              <img src={require('../../../../assets/img/hiconnect/csrcontrol.png')} alt="" />
              <h3>车辆控制</h3>
            </li>
            <li>
              <img src={require('../../../../assets/img/hiconnect/carconnection.png')} alt="" />
              <h3>车况监控</h3>
            </li>
            <li>
              <img src={require('../../../../assets/img/hiconnect/mapsrccar.png')} alt="" />
              <h3>地图寻车</h3>
            </li>
            <li>
              <img src={require('../../../../assets/img/hiconnect/warning.png')} alt="" />
              <h3>保养提醒</h3>
            </li>
            <li>
              <img src={require('../../../../assets/img/hiconnect/health.png')} alt="" />
              <h3>车辆健康报告</h3>
            </li>
          </ul>
          <span>(注：车联网功能仅使用部分车型)</span>
        </div>
        <Modal
          title=" "
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          wrapClassName = 'downloadmodal'
          centered = {true}
        >
          <img src={require('../../../../assets/img/hiconnect/carnetcode.jpg')} alt=""/>
          <span>一汽丰田App</span>
        </Modal>
      </div>
    )
  }
}

export default Telematics