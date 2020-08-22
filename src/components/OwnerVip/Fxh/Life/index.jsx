import React, { Fragment } from 'react'
import classNames from 'classnames'
import { Modal, Icon } from 'antd'
import moment from 'moment';
import{ carOwner, getOwnerStory }from '../../../../services/carOwner'
import{ common }from '../../../../services/common'
import VideoWin from '@/components/VideoWin'
import './index.less'
//丰享汇列表
let allnum=1;

const cardNav = [
  {
    cardicon: '普通卡-灰.png',
    cardicon2: '普通卡.png',
    title: '普通卡',
    cardName: 'COMMON'
  },
  {
    cardicon: 'ry-icon.png',
    cardicon2: '荣耀卡.png',
    title: '荣耀卡',
    cardName: 'GLORY'
  },
  {
    cardicon: 'zx-icon.png',
    cardicon2: '尊享卡.png',
    title: '尊享卡',
    cardName: 'ENJOY'
  },
  {
    cardicon: 'zz-icon.png',
    cardicon2: '至尊卡.png',
    title: '至尊卡',
    cardName: 'EXTREME'
  },
  {
    cardicon: 'cj-icon.png',
    cardicon2: '超级VIP卡.png',
    title: '超级VIP',
    cardName: 'SUPERVIP'
  }
]

const returnActNav = [
  {
    img: 'recom.png',
    title: '11月荐者有份，与礼乐享30天',
    date: '2018-11-11'
  },
  {
    img: 'pet.png',
    title: '12月我的专属吉祥物',
    date: '2018-12-07'
  },
  {
    img: 'send.png',
    title: '11月发福时刻 丰狂享礼',
    date: '2018-11-20'
  },
  {
    img: 'kllreturn.png',
    title: '12月年底活动-紧急寻找百万会员',
    date: '2017-11-30'
  },
  {
    img: 'return8.png',
    title: '一汽丰田感恩回馈季一重礼 老会员畅游礼',
    date: '2017-10-13'
  },
  {
    img: 'return8.png',
    title: '一汽丰田感恩回馈季三重礼 卡罗拉车主升级礼',
    date: '2017-08-30'
  },
  {
    img: 'cardreturn.png',
    title: '一汽丰田感恩回馈季二重礼 金秋关怀礼',
    date: '2017-09-23'
  },
  {
    img: 'sharereturn.png',
    title: '8~9月纵享丰情 约礼一夏',
    date: '2016-08-13'
  }
]
class Life extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      carType: 'SUPERVIP',
      visible: false,
      newActivity:[],
      pastActivity:[],
      allbtn:false,
      videodata:{},
      vediovisible:false,
      storyList: []
    }
  }

  componentDidMount(){
    common.getVideoUrl('EasyLife').then((res)=>{
      if(res && res.code==='0'){
        this.setState({
          videodata:res.data[0],
        })
      }
    })
    carOwner.CurActivityList().then((res)=>{
      if(res && res.code==='0'){
        this.setState({
          newActivity:res.data
        })
      }
    })
    let x=1;
    this.PastActivityList(x);
    this.getOwnerStory();


  }
  //车主故事
  getOwnerStory() {
    carOwner.getOwnerStory().then((res) => {
      if(res && res.code === '0') {
        this.setState({
          storyList: [...this.state.storyList,...res.data.dataList]
        })
      }
    })
  }
  //获取过期活动
  PastActivityList(x){
    let data={
      beginPage:x,
      pageSize:8
    }
    carOwner.PastActivityList(data).then((res)=>{
      if(res && res.code==='0'){
          this.setState({
            pastActivity:[...this.state.pastActivity,...res.data.dataList]
          })
        if(res.data.hasNextPage){
          this.setState({
            allbtn:true
          })
        }else{
          this.setState({
            allbtn:false
          })
        }
      }
    })
  }

  //点击加载更多
  alllist(){
    ++allnum;
    console.log(allnum);
    this.PastActivityList(allnum);
  }

  gotodetail(id,url){
    if(url){
      window.open(url);
    }else{
     window.open('/brandcenter/activitycenter/activitydetail?id='+id+'&text=feng')
    }
  }
  gotoOwner(id,link,url) {
    if(link == '0') {
      window.open('/brandcenter/activitycenter/activitydetail?id='+id+'&text=owner')
    }else if (link == '1') {
      window.open(url)
    }
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
  handleSwitch(type) {
    this.setState({
      carType: type
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
    // window.scroll(0,0)
    this.setState({
      visible: false,
    });
  }

  render() {
    const { carType,videodata,storyList } = this.state
    return (
      <div className='handleLife'>
        <div className='carhostvip'>
          <h2 className="pad_t_0">车主会员盛典</h2>
          <div className='videoPlay' onClick={this.showVedio.bind(this)}>
            <img src={this.state.videodata.picture} alt=""/>
            <img src={require('../../../../assets/img/brandcenter/fansinteraction/play-icon.png')} alt="" />
            {/* <VideoWin id={"carhuiyuan"} vid={videodata.videoUrl} ></VideoWin> */}
          </div>
        </div>
        <div className='ownerStory'>
          <h2 className="spec">车主故事</h2>
          <div className='storyContent'>
            {
              this.state.storyList.map((item,index)=>{
                return(
                  <span key={item.id} onClick={()=>{this.gotoOwner(item.id,item.isLink,item.url)}}>
                    <img src={item.pc_pic} alt="" />
                    <h3>{item.title}</h3>
                    <i>{moment(item.addtime).format('YYYY-MM-DD')}</i>
                  </span>
                )
              })
            }
            {/* <span>
              <img style={{background: 'red'}} src={require('../../../../assets/img/brandcenter/fansinteraction/play-icon.png')} alt="" />
              <h3>阿大</h3>
              <i>2013-01-02</i>
            </span> */}
            {/* <span>
              <img style={{background: 'red'}} src={require('../../../../assets/img/brandcenter/fansinteraction/play-icon.png')} alt="" />
              <h3>阿大</h3>
              <i>2013-01-02</i>
            </span> */}
          </div>
        </div>
        <div className='scoreShop'>
          <h2 className="spec">积分商城</h2>
          <div className='scoreContent'>
            <p><img src={require('../../../../assets/img/brandcenter/fansinteraction/score_img.png')} alt=""/></p>
            <p>
              <span><i></i>一汽丰田丰享汇积分商城是一汽丰田为了打造更美好的用车生活体验，全面提升一汽丰田丰享汇品牌服务，而特别推出的一项客户回馈服务。</span>
              <span><i></i>目前积分商城已上架部分商品，在未来还将推出更多服务和权益，为会员带来尊享体验。</span>
            </p>
          </div>
        </div>
        <div className='newActivity'>
          <h2 className="spec">最新活动</h2>
          <div className='activityContent'>
            {
              this.state.newActivity.map((item,index)=>{
                return(
                  <span key={item.id} onClick={()=>{this.gotodetail(item.id,item.url)}}>
                    <img src={item.pcActivityPic} alt="" />
                    <h3>{item.activityTitle}</h3>
                    <i>{moment(item.activityDate).format('YYYY-MM-DD')}</i>
                  </span>
                )
              })
            }
            {/* <span>
              <img src={require('../../../../assets/img/fxh/meet.png')} alt="" />
              <h3>Nice To Meet 哟！一汽丰田丰享汇车主会员盛典</h3>
              <i>2018-12-21</i>
            </span>
            <span>
              <img src={require('../../../../assets/img/fxh/searchhost.png')} alt="" />
              <h3>11月丰狂享礼，寻找年度幸运车主</h3>
              <i>2018-11-22</i>
            </span> */}
          </div>
        </div>
        <div className='returnActivity'>
          <h2 className="spec">往期活动</h2>
          <ul className='activityNav'>
            {
              this.state.pastActivity.map((v, i) => {
                return <li key={i} onClick={()=>{this.gotodetail(v.id,v.url)}}>
                  <img src={v.pcActivityPic} alt="" />
                  <h3>{v.activityTitle + '【活动已结束】'}</h3>
                  <i>{moment(v.activityDate).format('YYYY-MM-DD')}</i>
                </li>
              })
            }
          </ul>
          {
            this.state.allbtn?<span className='watchmore' onClick={this.alllist.bind(this)}>查看更多<Icon type="down" /></span>:null
          }
        </div>
        <Modal
          title=" "
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          wrapClassName='fxhMedal'
          centered={true}
        >
          <img src={require('../../../../assets/img/fxh/pic-7.png')} alt=""/>
          <p>更多精彩活动, 更多专属权益, 尽在一汽丰田丰享会</p>
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
            <VideoWin id={'shipin'} vid={this.state.videodata.videoUrl}></VideoWin>
           </div>
        </Modal>
      </div>
    )
  }
}

export default Life
