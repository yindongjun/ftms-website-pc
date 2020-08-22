import React, { Component } from 'react'
// // import Login from '../../components/LoginModel/Login'
// import Register from '../../components/LoginModel/Register'
// import ForgetPwd from '../../components/LoginModel/ForgetPwd'
import VideoWin from '@/components/VideoWin'
import { Modal } from 'antd';
import './index.less'

class Childen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vediovisible: false,
      showUrl: ''
    }
  }

  handleShow = (e) => {
    // console.log(e);
    this.setState({
      vediovisible: false,
    });
  }
  handleHide = (e) => {
    // console.log(e);
    this.setState({
      vediovisible: false,
    });
  }
  showVedio = () => {
    this.setState({
      vediovisible: true,
      showUrl:'https://player.youku.com/embed/XNDE5ODE1NTIxMg==?client_id=eb038334cbb62bb8'
    });
  }

  render() {
    const {showUrl} = this.state;
    return (
        <div className="handle">
            <div><img src={require('../../../assets/img/activity/img1.jpg')} alt=""/></div>
            <div className="video" onClick={this.showVedio.bind(this)}><img src={require('../../../assets/img/activity/img2.jpg')} alt=""/></div>
            <div><img src={require('../../../assets/img/activity/img3.jpg')} alt=""/></div>
            <div><img src={require('../../../assets/img/activity/img4.jpg')} alt=""/></div>
            <div style={{marginBottom:'-.8rem'}}><img src={require('../../../assets/img/activity/img5.jpg')} alt=""/></div>
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
                <VideoWin id={'fensi1'} vid={showUrl}></VideoWin>
                {/* <img src={require('../../../../assets/img/brandcenter/wonderful/box.png')} alt="" /> */}
                {/* <video src={showUrl} controls="controls"></video> */}
                {/* <iframe src={showUrl} frameBorder="0" style={{width:'100%',height:'100%'}}></iframe> */}
                {/* <img src={require('../../../../assets/img/brandcenter/wonderful/play.png')} alt="" /> */}
              </div>
            </Modal>
        </div>
    )
  }
}
export default Childen