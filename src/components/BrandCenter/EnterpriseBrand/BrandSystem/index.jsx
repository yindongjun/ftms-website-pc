import React, { Component,Fragment } from 'react'
import './index.less'
import{ common }from '../../../../services/common'
import VideoWin from '@/components/VideoWin'
import { Icon,Tooltip, Modal } from 'antd';
let n=1;
const data = [
  {
    title: '产品',
    content: [
      { line: '亚洲龙' },
      { line: '皇冠' },
      { line: <p>卡罗拉双擎<span>E+</span></p> },
      { line: '普拉多' },
      { line: '荣放' },
      { line: '奕泽' },
      { line: '卡罗拉' },
      { line: '卡罗拉双擎' },
      { line: '威驰' },
      { line: <p>威驰<span>FS</span></p> },
      { line: '柯斯达' }
    ]
  },
  {
    title: '客户服务',
    content: [
      { line: '诚信服务' },
      { line: '安心二手车' },
      { line: '纯牌零件' },
      { line: '纯正用品+品牌优选' },
      { line: '安心租车' },
      { line: 'AAA延保' },
      { line: 'AAA保险' },
      { line: '贴心金融' }
    ]
  },
  {
    title: '渠道',
    content: [
      { line: '高素质服务团队' },
      { line: '高标准服务流程' },
      { line: '高品质店铺形象' },
      { line: '智能化产品体验' }
    ]
  },
  {
    title: '企业社会责任',
    content: [
      { line: '安全' },
      { line: '环保' },
      { line: '育人' }
    ]
  }
]
const sloganlist = [
  {
    title: '坚守真实 追求极致',
    content: [
      { row: '全面导入TNGA架构' },
      { row: '新能源车型EV/PHEV车型' },
      { row: '智能终端/车载网联' }
    ]
  },
  {
    title: '坚守真实 追求极致',
    content: [
      { row: '管家式服务，全程无忧' },
      { row: '一站式服务，更便携高效' },
      { row: '覆盖用户出行全周期' }
    ]
  },
  {
    title: '坚守真实 追求极致',
    content: [
      { row: '客服人员素养' },
      { row: '经营能力提升' },
      { row: '改善硬件环境' },
      { row: '智能化升级' }
    ]
  },
  {
    title: '坚守真实 追求极致',
    content: [
      { row: '标签化' },
      { row: '可延续' },
    ]
  }
]
class BrandSystem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videodata_1:'',//品牌回顾
      videodata_2:[],//感性视频
      vediovisible: false,
      videoUrl:'',
      hasNextPage:true,
      hasPreviousPage:true,
      showUrl: ''
    }
  }
  componentWillMount(){
    common.getVideoUrl('BrandReview').then((res)=>{
      if(res && res.code==='0'){
        this.setState({
          videodata_1:res.data[0],
        })
      }
    })
  }
  componentDidMount(){
    this.getvideolist(1)
  }
  getvideolist(n){
    let data={
        "beginPage": n,
        "pageSize": 3,
        "type": "BrandSystem"
    }
    common.getVideoPage(data).then((res)=>{
      if(res && res.code==='0'){
        this.setState({
          videodata_2:[...this.state.videodata_2,...res.data.dataList],
          hasNextPage:res.data.hasNextPage,
          hasPreviousPage:res.data.hasPreviousPage
        })
      }
    })
  }
  carouselLeft = () => {
    this.getvideolist(--n);
  }

  carouselRight = () => {
    this.getvideolist(++n);
  }
   // 显示视频的弹窗
  //  showVedio = (url) => {
  //   this.setState({
  //     vediovisible: true,
  //     videoUrl: url
  //   });
  // }
  // handleShow = (e) => {
  //   console.log(e);
  //   this.setState({
  //     vediovisible: false,
  //   });
  // }
  // handleHide = (e) => {
  //   console.log(e);
  //   this.setState({
  //     vediovisible: false,
  //   });
  // }
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
    console.log(this.state.videodata_2)
    const {hasNextPage,hasPreviousPage,videodata_1,videodata_2,videoUrl,showUrl} =this.state
    return (
      <div className='handleBrandSystem'>
        <div className='BrandFramework'>
          <h2>一汽丰田品牌体系架构</h2>
          <div className='logobg'>
            <img src={require('../../../../assets/img/brandcenter/enterprisebrand/logo.png')} alt="" />
          </div>
          <ul className='brand-belief'>
            <li>
              <span>企业愿景</span>
              <span>成为最受信赖的企业，通过稳健的经营和持续的发展，成为社会认可、用户满意、员工成长的成功企业。</span>
            </li>
            <li>
              <span>企业精神</span>
              <span>尊重 挑战 速度 诚信</span>
            </li>
            <li>
              <span>品牌资产</span>
              <span>信</span>
            </li>
            <li>
              <span>品牌定位</span>
              <span>以可信赖的产品与服务，满足用户多元出行需求。</span>
            </li>
            <li>
              <span>品牌口号</span>
              <span>致真 至极</span>
            </li>
          </ul>
          <ul className='brand-goods-list'>
            {
              data.map((v, i) => {
                return <li key={i}>
                  <div>{v.title}</div>
                  <ul>
                    {
                      v.content.map((item, index) => {
                        return <li key={index}>
                          <span>{item.line}</span>
                        </li>
                      })
                    }
                  </ul>
                </li>
              })
            }
          </ul>
          <div className='management-idea'>经营理念：客户第一、经销商第二、厂家第三</div>
          {/* <ul className='slogan-list'>
            {
              sloganlist.map((item, index) => {
                return <li key={index}>
                  <div><span>{item.title}</span></div>
                  <ul>
                    {
                      item.content.map((v, i) => {
                        return <li key={i}>
                          {v.row}
                        </li>
                      })
                    }
                  </ul>
                </li>
              })
            }
          </ul> */}
        </div>
        <div className='brandreview'>
          <h2>品牌回顾视频</h2>
          <div className='vediobox' onClick={this.showVedio.bind(this,videodata_1.videoUrl)}>
            {
              videodata_1 !==''?
              // <VideoWin id={'huigu'} vid={videodata_1.videoUrl}></VideoWin>:''
              // <div className='vediobox' onClick={this.showVedio.bind(this,item.id,item.videoUrl)} >
              // {/* <VideoWin id={'fensi'+index} vid={item.videoUrl}></VideoWin> */}
              <Fragment>
                <img src={videodata_1.picture} alt="" />
                <img src={require('../../../../assets/img/brandcenter/fansinteraction/play-icon.png')} alt="" />
              </Fragment>:''
            }
            
          </div>
        </div>
        <div className='brandSensibility'>
          <h2>品牌感性视频</h2>
          <div>
          {
              videodata_2.length>0?
              videodata_2.map((item,index)=>{
                return(
                  // <span key={index} >
                  //   <VideoWin id={'tixi_'+index} vid={item.videoUrl}></VideoWin>
                  // </span>
                  <div className='vediobox1' key={index} onClick={this.showVedio.bind(this,item.videoUrl)} >
                  {/* <VideoWin id={'fensi'+index} vid={item.videoUrl}></VideoWin> */}
                    <img src={item.picture} alt="" />
                    <img src={require('../../../../assets/img/brandcenter/fansinteraction/play-icon.png')} alt="" />
                  </div>
                )
              }):''
            }
          </div>
            
           
        </div>
        {
            hasPreviousPage?
            <Icon type="left-circle" onClick={this.carouselLeft} />:''
          }
          {hasNextPage?
            <Icon type="right-circle" onClick={this.carouselRight} />:''
          }
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
            <VideoWin id={'fensi'} vid={showUrl}></VideoWin>
            {/* <img src={require('../../../../assets/img/brandcenter/wonderful/box.png')} alt="" /> */}
            {/* <video src={showUrl} controls="controls"></video> */}
            {/* <iframe src={showUrl} frameBorder="0" style={{width:'100%',height:'100%'}}></iframe> */}
            {/* <img src={require('../../../../assets/img/brandcenter/wonderful/play.png')} alt="" /> */}
          </div>
        </Modal>
        {/* <Modal
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
          <div className='box'> */}
            {/* <VideoWin id={'tixi'} vid={videoUrl}></VideoWin> */}
            {/* <img src={require('../../../../assets/img/brandcenter/wonderful/box.png')} alt="" />
            <img src={require('../../../../assets/img/brandcenter/wonderful/play.png')} alt="" /> */}
            {/* <video src={videoUrl} controls="controls"></video> */}
            {/* <iframe src={videoUrl} frameBorder="0" style={{width:'100%',height:'100%'}}></iframe> */}
          {/* </div>
        </Modal> */}
      </div>
    )
  }
}

export default BrandSystem