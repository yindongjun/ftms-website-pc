import React, { Component,Fragment } from 'react'
import './index.less'
import{ common }from '../../../../services/common'
import VideoWin from '@/components/VideoWin'
import { Modal } from 'antd';

class Excellent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      videodata:'',
      showUrl: ''
    }
  }
  componentDidMount(){
    common.getVideoUrl('BrandConcept').then((res)=>{
      if(res && res.code==='0'){
        this.setState({
          videodata:res.data[0],
        })
      }
    })
  }

  showVedio = (url) => {
    this.setState({
      vediovisible: true,
      showUrl:url
    });
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

  render() {
    const {showUrl} = this.state
    return (
      <div className='handleExcellent'>
        <h2>品牌理念解读</h2>
        <img src={require('../../../../assets/img/brandcenter/enterprisebrand/brandlogo.png')} alt="" />
        <div className='really-excellent'>
          <span className='reallyLeft'>
            <img src={require('../../../../assets/img/brandcenter/enterprisebrand/true.png')} alt="" />
            <ul>
              <li>“真”是一汽丰田品牌感性层面的价值观，</li>
              <li>“真”是真实、真心、真诚，</li>
              <li>&nbsp;&nbsp;&nbsp;是一汽丰田待人、待车的态度和主张。</li>
            </ul>
          </span>
          <span className='excellentRight'>
            <img src={require('../../../../assets/img/brandcenter/enterprisebrand/ji.png')} alt="" />
            <ul>
              <li>“极”是一汽丰田品牌物性层面的方法论，</li>
              <li>&nbsp;&nbsp;&nbsp;它代表着一汽丰田在生产品质上极致</li>
              <li>&nbsp;&nbsp;&nbsp;精工、完美无缺；</li>
              <li>&nbsp;&nbsp;&nbsp;在全生命周期上极致服务、安心安享。</li>
            </ul>
          </span>
        </div>
        <div className='really-excellect-box'>
          <span className='boxLeft'>
            <div>
              <h1>用户的感受真</h1>
              <i></i>
              <p>消费升级环境下基于最高级<b>价值认同</b>的用户真实感受</p>
            </div>
            <div>
              <h1>受众的追求真</h1>
              <i></i>
              <p>契合社会<b>主流价值观</b>与升级后的消费理念</p>
            </div>
          </span>
          <span className='boxRight'>
            <div>
              <h1>极致的制造技术</h1>
              <i></i>
              <p>基于<b>TNGA平台</b>的丰田产品的极致差异化</p>
            </div>
            <div>
              <h1>极致的产品品质</h1>
              <i></i>
              <p>被全球认可的丰田<b>可靠产品基因</b></p>
            </div>
          </span>
        </div>
        <div className='really-excellect-title'>
          <span><i></i><h3>感性之真</h3></span>
          <span><i></i><h3>物性之极</h3></span>
        </div>
        <div className='feature'>
          <span className='brandfeature'>
            <div>
              <img src={require('../../../../assets/img/brandcenter/enterprisebrand/sjiocn.png')} alt=""/>
              <h1>品牌层面</h1>
              <h3>承载的三大功能</h3>
            </div>
            <ul>
              <li>
                <h2><img src={require('../../../../assets/img/brandcenter/enterprisebrand/driveicon.png')} alt=""/>驱动</h2>
                <h3>锐化品牌标签</h3>
              </li>
              <li>
              <h2><img src={require('../../../../assets/img/brandcenter/enterprisebrand/notice-icon.png')} alt=""/>注意</h2>
                <h3>形成品牌差异</h3>
              </li>
              <li>
              <h2><img src={require('../../../../assets/img/brandcenter/enterprisebrand/effecticon.png')} alt=""/>影响</h2>
                <h3>贴合丰田全球战略</h3>
              </li>
            </ul>
          </span>
          <span className='marketkingfeature'>
          <div>
              <img src={require('../../../../assets/img/brandcenter/enterprisebrand/sjiocn.png')} alt=""/>
              <h1>营销层面</h1>
              <h3>承载的三大功能</h3>
            </div>
            <ul>
              <li>
                <h2><img src={require('../../../../assets/img/brandcenter/enterprisebrand/driveicon.png')} alt=""/>驱动</h2>
                <h3>与消费者产生共鸣</h3>
              </li>
              <li>
              <h2><img src={require('../../../../assets/img/brandcenter/enterprisebrand/notice-icon.png')} alt=""/>注意</h2>
                <h3>体现产品转变趋势</h3>
              </li>
              <li>
              <h2><img src={require('../../../../assets/img/brandcenter/enterprisebrand/effecticon.png')} alt=""/>影响</h2>
                <h3>整合传播品牌价值</h3>
              </li>
            </ul>
          </span>
        </div>
        <h2>品牌理念视频</h2>
        <div className='brand-vedio vediobox' onClick={this.showVedio.bind(this,this.state.videodata.videoUrl)}>
          {/* <video poster={this.state.videodata.picture} controls >
              <source src={this.state.videodata.videoUrl} ></source>
            </video> */}
            {
              this.state.videodata !==''?
              <Fragment>
                <img src={this.state.videodata.picture} alt="" />
                <img src={require('../../../../assets/img/brandcenter/fansinteraction/play-icon.png')} alt="" />
              </Fragment>:''
              // <VideoWin id={'wuxing'} vid={this.state.videodata.videoUrl} ></VideoWin>:''
            }
            {/* <iframe className='vedio'  src={this.state.videodata.videoUrl}  ></iframe> */}
          {/* <img className='vedio' src={require('../../../../assets/img/brandcenter/enterprisebrand/vedioLarge.png')} alt=""/> */}
          {/* <img className='play' src={require('../../../../assets/img/brandcenter/enterprisebrand/playicon.png')} alt=""/> */}
        </div>
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

export default Excellent
