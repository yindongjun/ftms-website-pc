import React, { Component } from 'react'
import classNames from 'classnames'
import Recommend from './Recommend';
import AllFansForum from './AllFansForum';
import VedioForum from './VedioForum';
import { Modal ,Icon} from 'antd';
import FCWorld from '../../../Common/FCWorld';
import {common} from '../../../../services/common';
import VideoWin from '@/components/VideoWin';
import './index.less'

class FengChaoWorld extends Component {
  constructor(props) {
    super(props)
    this.state = {
      switchtype: 'RECOMM',
      visible: false,
      btnMoreShow: true,
      showUrl: '',
      picture: '',
      imgUrl:'',
      videoUrl:''
    }
    this.searchMore = this.searchMore.bind(this);
    this.btnMoreShow = this.btnMoreShow.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    this.getVideoList();
  }

  getVideoList() {
    common.getVideoUrl('FengChao').then((res) => {
      if(res && res.code == '0') {
        this.setState({
          showUrl: res.data[0].videoUrl,
          picture: res.data[0].picture,
          imgUrl:res.data[0].picture,
        })
      }
    })
  }
  btnMoreShow () {
    this.setState({
      btnMoreShow: false
    })
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


  handleSwitch(type) {
    this.setState({
      switchtype: type,
      btnMoreShow: true
    })
  }
  showVedio = (e) => {
    this.setState({
      vediovisible: true,
    });
  }
  handleShow = (e) => {
    console.log(e);
    this.setState({
      vediovisible: false,  
    });
  }
  handleHide = (e) => {
    console.log(e);
    this.setState({
      vediovisible: false,
    });
  }

  searchMore() {
    const { switchtype } = this.state;
    if (switchtype === 'RECOMM') {  
      this.recomm.middleFun();
    } else if (switchtype === 'ALL') {
      this.all.middleFun();
    } else if (switchtype === 'VIDEO') {
      this.video.middleFun();
    }
  }  

  render() {
    const { switchtype, btnMoreShow, showUrl } = this.state
    let switchpage;
    if (switchtype === 'RECOMM') {
      switchpage = <Recommend moreShow={this.btnMoreShow} showM={this.showModal} ref={(recomm) => { this.recomm = recomm; }} />
    } else if (switchtype === 'ALL') {
      switchpage = <AllFansForum moreShow={this.btnMoreShow} showM={this.showModal} ref={(all) => { this.all = all; }} />
    } else if (switchtype === 'VIDEO') {
      switchpage = <VedioForum moreShow={this.btnMoreShow} showM={this.showModal} ref={(video) => { this.video = video; }} />
    }
    return (
      <div className='handleFengChaoWorld'>
        <div className='FengChaoWorld'>
          <h2>丰潮世界</h2>
          <div className='FengChaoWorldfont'>
            <p>这是一个一汽丰田与粉丝互联共建的生态世界。这，是我们与粉丝共同的家！</p>
            <p>在我们的愿景中，丰潮世界将实现去品牌化，由粉丝自主运营管理，</p>
            <p>我们仅提供必要的技术与服务，真正成为“粉丝们的一汽丰田”欢迎共建丰潮世界。让越来越多的人享受汽车生活带来的喜悦！</p>
          </div>
          <img src={require('../../../../assets/img/brandcenter/fansinteraction/pt1.png')} alt="" />
          <div className='vediobox' onClick={this.showVedio.bind(this)}>
            {/* {
              showUrl!==''?
              <VideoWin id={'fengchao'} vid={this.state.showUrl}></VideoWin>:''
            } */}
            <img src={this.state.imgUrl} alt="" />
            <img src={require('../../../../assets/img/brandcenter/fansinteraction/play-icon.png')} alt="" />
          </div>
        </div>
        <div className='fansforum'>
          <h2>粉丝论坛</h2>
          <div className='switchNav'>
            <ul>
              <li onClick={() => { this.handleSwitch('RECOMM') }} className={classNames({ 'sel-type': switchtype === 'RECOMM' })}>推荐</li>
              <li onClick={() => { this.handleSwitch('ALL') }} className={classNames({ 'sel-type': switchtype === 'ALL' })}>全部</li>
              {/* <li onClick={() => { this.handleSwitch('VIDEO') }} className={classNames({ 'sel-type': switchtype === 'VIDEO' })}>视频</li> */}
            </ul>
            <span onClick={this.showModal}>发帖</span>
          </div>
          <div className='fansforumcontent'>
            {
              switchpage
            }
          </div>
          {
            btnMoreShow ?
              <span className='watchmore' onClick={this.searchMore.bind(this)}>查看更多<Icon type="down" /></span> :
            null
          }
          
        </div>
        {/* 视频弹框 */}
        <Modal
          title=""
          visible={this.state.vediovisible}
          onOk={this.handleShow}
          onCancel={this.handleHide}
          footer={null}
          forceRender={true}
          getContainer={() => document.body}
          wrapClassName='showdDetailVedio'
          centered={true}
        >
          <div className='box'>
            <VideoWin id={'shipin'} vid={showUrl}></VideoWin>
           </div>
        </Modal>
        <Modal
          title=" "
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          wrapClassName='FCWorld'
          centered={true}
        >
          <FCWorld/>
        </Modal>
      </div>
    )
  }
}

export default FengChaoWorld