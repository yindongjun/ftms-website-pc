import React, { Component } from 'react'
import {Tooltip, Icon, Modal} from 'antd'
import Share from '../../../../components/Common/Share';
import {common} from '../../../../services/common'
import {brandConter} from '../../../../services/brandConter'
import VideoWin from '@/components/VideoWin'
import './index.less'

const text = <Share/>

class VedioZone extends Component {
  constructor(props){
    super(props)
    this.state={
      vediovisible: false,
      videoList: [],
      page: 0,
      hasNext: true,
      thumb_up: false,
      showUrl:''
    }
  }
  componentDidMount() {
    this.getVideoList(this.state.page);
  }
  getVideoList(page) {
    page++;
    const data = {};
    data.beginPage = page;
    data.pageSize = '6';
    data.type = 'Recommend'
    common.getVideoPage(data).then((res) => {
      if(res && res.code == '0') {
        this.setState({
          videoList: [...this.state.videoList,...res.data.dataList,],
          page: page,
          hasNext: res.data.hasNextPage,
        })
      }
    })
  }
  showVedio = (id,url) => {
    this.setState({
      vediovisible: true,
      showUrl:url
    });
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken
    if(accessToken) {
      const data = {};
      data.id = id;
      data.accessToken = accessToken;
      brandConter.readVideo(data).then((res) => {
        if(res && res.code =='0') {
          
        }
      })
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
  addLike = (id) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken
    const data = {};
    data.accessToken = accessToken;
    data.id = id;
    brandConter.collectVideo(data).then((res) => {
      if(res && res.code =='0') {
        this.setState({
          videoList: [],
          page: 1
        })
        this.getVideoList(0);
      }
    })
  }
  render() {
    const {videoList, showUrl, page, hasNext} = this.state;
    return (
      <div className='handleVedioZone'>
          <div className='VedioZone'>
            <div className='headerPic'>
                <span>
                  <h1>粉丝互动</h1>
                  <i></i>
                </span>
              </div>
            {/* <img src={require('../../../../assets/img/brandcenter/fansinteraction/banner.png')} alt="" /> */}
            <div className='VedioList'>
              <h2>视频专区</h2>
              <ul>
                {
                  videoList.length>0?
                  videoList.map((item,index)=>{
                    return <li key={item.id}>
                            <div className='vediobox' onClick={this.showVedio.bind(this,item.id,item.videoUrl)} >
                            {/* <VideoWin id={'fensi'+index} vid={item.videoUrl}></VideoWin> */}
                              <img src={item.picture} alt="" />
                              <img src={require('../../../../assets/img/brandcenter/fansinteraction/play-icon.png')} alt="" />
                            </div>
                            <div className='footerIcon'>
                              <span>{item.videoName}</span>
                              <span>
                                <i>{item.readNum}</i>
                                <Tooltip placement="bottom" title={text} overlayClassName='sharebox'>
                                  <i>{item.shareNum}</i>
                                </Tooltip>
                                <i className={this.state.thumb_up||item.isThumbUp=='1'?'thumb_up':''} onClick={this.addLike.bind(this,item.id)}>{item.likeNum}</i>
                              </span>
                            </div>
                          </li>
                  }):''
                }
              </ul>
            </div>
            {
              hasNext?
                <span className='watchmore' onClick={this.getVideoList.bind(this,page)}>查看更多<Icon type="down" /></span>:
                null
          }
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
            <VideoWin id={'fensi'} vid={showUrl}></VideoWin>
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
export default VedioZone