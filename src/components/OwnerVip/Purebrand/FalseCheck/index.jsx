import React from 'react'
import './index.less'
import {common} from '@/services/common'
import VideoWin from '@/components/VideoWin'
import { Modal } from 'antd'

class FalseCheck extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      videodata: {}
    }
  }
  componentDidMount(){
    common.getVideoUrl('SecurityCheck').then((res)=>{
      if(res && res.code==='0'){
        this.setState({
          videodata:res.data[0],
        })
      }
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
  render() {
    return (
      <div className="handleFalseCheck">
        <div className="CompareFalse">
          <h2>真伪对比</h2>
          <div className="videoplay" onClick={this.showVedio.bind(this)}>
            <img src={this.state.videodata.picture} alt=""/>
            <img src={require('../../../../assets/img/brandcenter/fansinteraction/play-icon.png')} alt="" />
          </div>
          {/* <VideoWin id={"fangwei"} className="video_div" vid={this.state.videodata.videoUrl}></VideoWin> */}
          {/* <img className="palybtn" src={require('../../../../assets/img/purebrand/play.png')} alt="" /> */}
        </div>
        <div className="avoidCheck">
          <h2>防伪查询</h2>
          <div className="text-font">
            <p>丰田车保有量巨大，市场上也充斥着各种零件，稂莠不齐，严重危害了消费者利益。</p>
            <p>包括国内某电商销售的丰田纯牌零件也极有可能是假冒零件。那么问题来了，车主如何鉴别真假纯牌零件？</p>
          </div>
          <div className="checkStep">
            <div className="check-step">
              <span className="step01">
                <i>01</i>
                <p>16年10月开始，一汽丰田渠道内纯牌零件会陆续粘贴防伪标签。（具体图例参考右图）</p>
              </span>
              <span className="step02">
                <i>02</i>
                <p>找到防伪标签，右侧有个灰色的涂层，轻轻刮开涂层。使用智能手机中的扫一扫功能，即可知道你购买的零件的真伪。就是这样简单有效。</p>
              </span>
            </div>
            <img src={require("../../../../assets/img/purebrand/pic-2.png")} alt=""/>
          </div>
          <div className="checkCode">
            <img src={require("../../../../assets/img/purebrand/pic-4.png")} alt=""/>
          </div>
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
            <VideoWin id={'shipin'} vid={this.state.videodata.videoUrl}></VideoWin>
           </div>
        </Modal>
      </div>
    )
  }
}

export default FalseCheck
