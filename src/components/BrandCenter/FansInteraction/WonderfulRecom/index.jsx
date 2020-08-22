import React, { Component, Fragment } from 'react'
import { Tooltip, Modal } from 'antd';
import Share from '../../../Common/Share';
import FCWorld from '../../../Common/FCWorld';
import {brandConter} from '../../../../services/brandConter'
import {common} from '../../../../services/common'
import VideoWin from '@/components/VideoWin'
import './index.less'

const text = <Share/>

class WonderfulRecom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      codevisible: false,
      vediovisible: false,
      codetype: 'FTMS',
      articleList: [],
      videoList: [],
      visibleFc: false,
      thumb_up: false,
      accessToken:'',
      showUrl: ''
    }
  }

  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken;
    if(accessToken){
      this.setState({
        accessToken:accessToken
      })
      this.getArticleList(accessToken);
    }else{
      this.getArticleList('');
    }
    this.getVideoList();
  }
  getArticleList(x) {
    let data={
      "page": 1,
      "row": 8,
      "accessToken":x 
    }
    brandConter.getList(data).then((res) => {
      if(res&&res.code=='0') {
        if(res.data.dataList.length>0) {
          this.setState({
            articleList:[...this.state.articleList,...res.data.dataList],
          })
        }
      }
    })
  }
  getVideoList() {
    const data = {};
    data.beginPage = '1';
    data.pageSize = '3';
    data.type = 'Recommend'
    common.getVideoPage(data).then((res) => {
      if(res && res.code == '0') {
        this.setState({
          videoList: res.data.dataList,
        })
      }
    })
  }
  // 控制显示具体的二维码的弹窗
  showModal(type) {
    this.setState({
      codevisible: true,
      codetype: type
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      codevisible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      codevisible: false,
    });
  }

  // 显示视频的弹窗
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
  //二维码弹窗
  handleOkFc = (e) => {
    console.log(e);
    this.setState({
      visibleFc: false,
    });
  }

  handleCancelFc = (e) => {
    console.log(e);
    this.setState({
      visibleFc: false,
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
          })
        this.getVideoList()
      }
    })
  }
  render() {

    const { codetype, articleList, videoList, videoUrl, showUrl} = this.state
    let codeTypeDetail;
    if (codetype === 'FTMS') {
      codeTypeDetail = <Fragment>
        <img src={require('../../../../assets/img/brandcenter/wonderful/code-ftms.png')} alt="" />
        <p>一汽丰田</p>
      </Fragment>
    } else if (codetype === 'AVALON') {
      codeTypeDetail = <Fragment>
        <img src={require('../../../../assets/img/brandcenter/wonderful/code-yzl.png')} />
        <p>亚洲龙 AVALON</p>
      </Fragment>
    } else if (codetype === 'YIZHE') {
      codeTypeDetail = <Fragment>
        <img src={require('../../../../assets/img/brandcenter/wonderful/code-yzs.png')} />
        <p>奕泽说</p>
      </Fragment>
    } else if (codetype === 'COROLLA') {
      codeTypeDetail = <Fragment>
        <img src={require('../../../../assets/img/brandcenter/wonderful/code-kll.png')} />
        <p>卡罗拉双擎汇</p>
      </Fragment>
    } else if (codetype === 'RAV4') {
      codeTypeDetail = <Fragment>
        <img src={require('../../../../assets/img/brandcenter/wonderful/RAV4.png')} />
        <p>RAV4 荣放</p>
      </Fragment>
    } else if (codetype === 'WEIBO') {
      codeTypeDetail = <Fragment>
        <img src={require('../../../../assets/img/brandcenter/wonderful/code-wb.png')} />
        <p>官方微博</p>
      </Fragment>
    } else if (codetype === 'DOUYIN') {
      codeTypeDetail = <Fragment>
        <img src={require('../../../../assets/img/brandcenter/wonderful/code-dy.png')} />
        <p>抖音</p>
      </Fragment>
    }


    return (
      <div className='handleWonderfulRecom'>
        <div className='ImgFontpart'>
          <div className='title'>
            <h2>图文专区</h2>
            <p>被定格的每个风景，都是你与一汽丰田的回忆欣赏精彩文章</p>
          </div>
          <h3 className='wonderfulArticle'>精彩文章</h3>
          <ul className='articleList'>
          {
                  articleList.map((item,index) => {
                    return <a key={item.id} target="_blank" href={!item.has_detail?item.url:`/brandcenter/fansinteraction/articledetail?id=`+item.id}>
                            <li>
                              <span>
                                <div>{item.title}</div>
                                <span>
                                  <i>{item.create_time}</i>
                                  <i>{item.read_num}</i>
                                  <i>{item.share_num}</i>
                                  <i className={item.thumb_up?'thumb_up':''}>{item.like_num}</i>
                                </span>
                              </span>
                              <img src={item.pc_pic} alt="" />
                            </li>
                          </a>
                    
                  })
                }
          </ul>
          <a className='watchmore' href='/brandcenter/fansinteraction/wonderfularticle'>查看全部</a>
        </div>
        <div className='vediopart'>
          <div className='title'>
            <h2>视频专区</h2>
            <p>每部视频，皆有内涵与诉说的故事笑容与泪水或是一汽丰田与你相伴的每一天</p>
          </div>
          <ul className='vedioList'>
            {videoList.length>0?
              videoList.map((item,index)=>{
                return <li key={index}>

                        <div className='vediobox' onClick={this.showVedio.bind(this,item.id,item.videoUrl)} >
                          {/* <VideoWin id={'shipin'+index} vid={item.videoUrl}></VideoWin> */}
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
          <a className='watchall' href='/brandcenter/fansinteraction/videozone'>查看全部</a>
        </div>
        <div className='wonderfulFooter'>
          <h2>粉丝精彩，无处不在</h2>
          <div className='codelist'>
            <h3>微信公众号</h3>
            <ul>
              <li onClick={() => { this.showModal('FTMS') }}>
                <img src={require('../../../../assets/img/brandcenter/wonderful/code-ftms.png')} />
                <span>一汽丰田</span>
              </li>
              <li onClick={() => { this.showModal('AVALON') }}>
                <img src={require('../../../../assets/img/brandcenter/wonderful/code-yzl.png')} />
                <span>亚洲龙 AVALON</span>
              </li>
              <li onClick={() => { this.showModal('YIZHE') }}>
                <img src={require('../../../../assets/img/brandcenter/wonderful/code-yzs.png')} />
                <span>奕泽说</span>
              </li>
              <li onClick={() => { this.showModal('COROLLA') }}>
                <img src={require('../../../../assets/img/brandcenter/wonderful/code-kll.png')} alt="" />
                <span>卡罗拉双擎汇</span>
              </li>
              <li onClick={() => { this.showModal('RAV4') }}>
                <img src={require('../../../../assets/img/brandcenter/wonderful/RAV4.png')} />
                <span>RAV4 荣放</span>
              </li>
            </ul>
          </div>
          <div className='weiboanddouyingTitle'>
            <h3>微博</h3>
            <h3>抖音</h3>
          </div>
          <div className='weiboanddouying'>
            <span>
              <div>
                <img src={require('../../../../assets/img/brandcenter/wonderful/logo-weibo.png')} alt="" />
                <p>@一汽丰田官方微博</p>
              </div>
              <img onClick={() => { this.showModal('WEIBO') }} src={require('../../../../assets/img/brandcenter/wonderful/code-wb.png')} alt="" />
            </span>
            <span>
              <div>
                <img src={require('../../../../assets/img/brandcenter/wonderful/logo-dy.png')} alt="" />
                <p>@一汽丰田</p>
                <i>抖音号：581273644</i>
                <i>一汽丰田官方账号</i>
              </div>
              <img onClick={() => { this.showModal('DOUYIN') }} src={require('../../../../assets/img/brandcenter/wonderful/code-dy.png')} alt="" />
            </span>
          </div>
        </div>
        <Modal
          title=""
          visible={this.state.codevisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          wrapClassName='showdetailcode'
          centered={true}
        >
          {
            codeTypeDetail
          }
        </Modal>

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
        {/* 分享二维码 */}
        <Modal
          title=" "
          visible={this.state.visibleFc}
          onOk={this.handleOkFc}
          onCancel={this.handleCancelFc}
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

export default WonderfulRecom