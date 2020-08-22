import React, { Component } from 'react'
import { Modal } from 'antd'
import './index.less'

class PhoneInternet extends Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      erweimaIsShow: false
    }
  }
  //
  erweimaIsOpen() {
    this.setState( (pre) => {
      return {
        erweimaIsShow: !pre.erweimaIsShow
      }
    })
  }

  render() {
    return (
      <div className='handlePhoneInternet'>
        <div className='PhoneInternetHeader'>
          <p>CarLife拥有强大的百度地图资源，带来全新的驾驶体验。可以同步查阅手机通讯录。</p>
          <p>并且满足您随时随地播放音乐或电台，一路畅听音乐盛宴的需求。</p>
          <p>CarLife率先支持Android和iPhone双平台。只需通过USB连接手机与座驾便可无需分心，安全驾驶。</p>
        </div>
        <div className = 'productIntroduce'>
          <h3>产品简介</h3>
          <div className = 'productInfoBox clearfix'>
            <div className = 'productInfoContent' style = {{marginRight: '0.1rem'}}>
              <h5>DA介绍</h5>
              <div className="clearfix" style = {{paddingLeft: '0.02rem'}}>
                <span className="fl" >1.</span>
                <p className="fl">
                  <span>各种操作按钮静电化。</span><br/>
                  <span>实现同时兼具科技和简单的CarLife操作平滑面板。</span>
                </p>
              </div>
              <div className="clearfix">
                <span className="fl" >2.</span>
                <p className="fl">
                  <span>搭载静电触控屏。简洁的薄型液晶屏实现轻快的使用体验。同时也实现了畅快的触控感。</span>
                </p>
              </div>
              <div className="clearfix">
                <span className="fl">3.</span>
                <p className="fl">
                  <span>9寸大型液晶屏。迎合中国用户需求的同时，也提高了辨识度和操作感<br/>(分辨率1280×720)</span>
                </p>
              </div>
              <div className="clearfix">
                <span className="fl">4. </span>
                <p className="fl">
                  <span>在主界面采用了具有科技感和操控性强势的卡片式HMI设计。</span>
                </p>
              </div>
            </div>
            <div className = 'productInfoContent'>
              <h5>Baidu CarLife介绍</h5>
              <div className="clearfix">
                <span className="fl">1.</span>
                <p className="fl">
                  CarLife拥有强大的百度地图资源，融入车规级HMI界面，带来全新的驾驶体验。
                </p>
              </div>
              <div className="clearfix">
                <span className="fl">2.</span>
                <p className="fl">
                便捷的电话服务，可同步查阅手机通讯录，一目了然，尽在掌握。
                </p>
              </div>
              <div className="clearfix">
                <span className="fl">3.</span>
                <p className="fl">
                随时随地播放您的本地音乐，便可在线收听音乐或电台，一路畅听音乐盛宴。
                </p>
              </div>
              <div className="clearfix">
                <span className="fl">4.</span>
                <p className="fl">
                CarLife率先支持Android和iPhone双平台，覆盖多种主流手机品牌。<br/>
                您只需通过USB连接手机与座驾便可无需分心，安全驾驶。
                </p>
              </div>
              <div className="clearfix">
                <span className="fl">5.</span>
                <p className="fl">
                CarLife配合您最熟悉的操作方式，无论是几句简单的语音指令，还是轻点触控。
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className = 'hulianCarModels'>
          <h3>互联车型</h3>
          <ul className="clearfix">
            <li>
              <img src={require('../../../../assets/img/carBrandModels/COROLLA-E+.png')} alt=""/>
              <h6>卡罗拉双擎E+</h6>
            </li>
            <li>
              <img src={require('../../../../assets/img/carBrandModels/COROLLA.png')} alt=""/>
              <h6>COROLLA 卡罗拉</h6>
            </li>
            <li>
              <img src={require('../../../../assets/img/carBrandModels/COROLLA-.png')} alt=""/>
              <h6>卡罗拉双擎</h6>
            </li>
            <li>
              <img src={require('../../../../assets/img/carBrandModels/yize3.png')} alt=""/>
              <h6>IZOA 奕泽</h6>
            </li>
          </ul>
          <a className = 'downBtn' href = '/shiyongshuouming.pdf' download = '使用说明书.pdf'>用户下载手册</a>
          <p>*仅支持安装了多媒体系统的卡罗拉车型</p>
        </div>
        <div className = 'jiemianzhanshi'>
          <div>
            <h3>界面展示</h3>
            <img src={require('../../../../assets/img/carBrandModels/1.png')} alt=""/>
          </div>
        </div>
        <div className = 'yingjianlianjiefangfa'>
          <h3>硬件连接方法</h3>
          <div className="yingjianlianjiefangfa_div clearfix">
            <div >
              <img src={require('../../../../assets/img/carBrandModels/2.png')} alt=""/>
              <h5>Android手机</h5>
              <p>连接要求</p>
              <p>支持版本：Android OS 5.0以上</p>
              <p>连接需要：USB Cable</p>
            </div>
            <div >
              <img src={require('../../../../assets/img/carBrandModels/3.png')} alt=""/>
              <h5>iPhone手机</h5>
              <p>连接要求</p>
              <p>支持版本：iPhone6 iOS 9.0以上</p>
              <p>连接需要：iPhone Lighting Cable</p>
            </div>
          </div>
        </div>
        <div className = 'caozuofangfa'>
          <h3>从DA操作Carlife方法</h3>
          <ul className="clearfix">
            <li>
              <img src={require('../../../../assets/img/carBrandModels/4.png')} alt="" style = {{width: '3.6rem'}}/>
              <i></i>
            </li>
            <li>
              <img src={require('../../../../assets/img/carBrandModels/5.png')} alt="" style = {{width: '3.6rem'}}/>
              <i></i>
            </li>
            <li className="li_shangjt">
              <img src={require('../../../../assets/img/carBrandModels/6.png')} alt="" style = {{width: '3.6rem'}}/>
              <i></i>
              <i></i>
            </li>
            <li className="li_phone">
              <img src={require('../../../../assets/img/carBrandModels/11.png')} alt=""/>
            </li>
            </ul>
            <ul className="ul_bottom">
            <li>
              <img src={require('../../../../assets/img/carBrandModels/9.png')} alt="" style = {{width: '3.6rem'}}/>
              <i ></i>
            </li>
            <li>
              <img src={require('../../../../assets/img/carBrandModels/8.png')} alt="" style = {{width: '3.6rem'}}/>
              <i></i>
            </li>
            <li>
              <img src={require('../../../../assets/img/carBrandModels/7.png')} alt="" style = {{width: '3.6rem'}}/>
              <i></i>
            </li>
            <li></li>
          </ul>
          <div className = 'androidBtn' onClick = {this.erweimaIsOpen.bind(this)}><span></span>iPhone下载</div>
          <div className = 'iosBtn' onClick = {this.erweimaIsOpen.bind(this)}><span></span>Android下载</div>
          {/* <div className = 'phone'></div> */}
          {/* <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i> */}
        </div>
        <Modal
          className = 'erweima'
          title=""
          visible={this.state.erweimaIsShow}
          onCancel={this.erweimaIsOpen.bind(this)}
          footer = {null}
        >
          <span></span>
        </Modal>
      </div>
    )
  }
}

export default PhoneInternet