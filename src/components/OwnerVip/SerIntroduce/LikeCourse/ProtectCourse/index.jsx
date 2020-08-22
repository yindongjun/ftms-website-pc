import React from 'react'
import { Icon, message, Modal} from 'antd'
import './index.less'
import { carOwner } from '../../../../../services/carOwner';
import VideoWin from '@/components/VideoWin'
import { common } from '../../../../../services/common';
import './index.less'

  
let n=1;
class ProtectCourse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      carouselVedioPosition: 0,
      carouselVedioNum: 5,
      articalList: [],
      pageNum: 0,
      rowNum: 3,
      hasNextPage: false,
      videoList: [],
      vediovisible: false,
      showUrl: '',
      hasPreviousPage:false
    }
  }
  componentDidMount() {
    this.carList(this.state.pageNum,this.state.rowNum);
    this.getVideoList(1);
  }
  carList(page,row) {
    page++;
    carOwner.carList(page,row).then((res) => {
      if(res && res.code === '0') {
        this.setState({
          articalList: [...this.state.articalList,...res.data.dataList],
          hasNextPage_1:res.data.hasNextPage,
          pageNum: page
        })
      }
    })
  }
  getVideoList(n) {
    let page={
      "beginPage": n,
      "pageSize": '3',
      "type": "LoveCarClass"
    }
    common.getVideoPage(page).then((res) => {
      if(res && res.code == '0') {
        this.setState({
          videoList: [...this.state.videoList,...res.data.dataList],
          hasNextPage:res.data.hasNextPage,
          hasPreviousPage:res.data.hasPreviousPage
        })
      }
    })

  }
  carouselLeft = () => {
    this.getVideoList(--n);
    // this.setState((prev) => {
    //   if (prev.carouselVedioPosition >= 0) {
    //     return {
    //       carouselVedioPosition: -(Math.ceil(this.state.carouselVedioNum / 4) - 1) * 14
    //     }
    //   }
    //   return {
    //     carouselVedioPosition: prev.carouselVedioPosition + 14
    //   }
    // })
  }

  carouselRight = () => {
    this.getVideoList(++n);
    // this.setState((next) => {
    //   if (next.carouselVedioPosition <= -(Math.ceil(this.state.carouselVedioNum / 4) - 1) * 14) {
    //     return {
    //       carouselVedioPosition: 0
    //     }
    //   }
    //   return {
    //     carouselVedioPosition: next.carouselVedioPosition - 14
    //   }
    // })
  }


  showVedio = (url) => {
    this.setState({
      vediovisible: true,
      showUrl: url
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
    const { carouselVedioPosition, carouselVedioNum,articalList,hasPreviousPage, pageNum, rowNum,hasNextPage_1, hasNextPage, videoList, showUrl} = this.state
    return (
      <div className='handleProtectCourse last'>
        <h2>精彩文章</h2>
        <ul className='articalList'>
          {
            articalList.map((v, i) => {
              return <a target='_blank' href={v.islink=='1'?v.url:'/ownervip/circletran?id='+v.id+'&text=wenzhang'} key={i}>
                <li>
                  <h1>{v.title}</h1>
                  <span><i>{v.addtime}</i></span>
                  <img src={v.pc_pic} alt=""/>
                </li>
              </a>
            })
          }
        </ul>
        {hasNextPage_1?
            <span className='watchmore' onClick={()=>{this.carList(pageNum,rowNum)}}>查看更多</span>
            // <button className='observemore' onClick={()=>{this.carList(pageNum,rowNum)}}>查看更多</button>
          :null
        }
        
        <div className="handleProtectCourse video">
          <h2>精彩视频</h2>
          <div className='vedioList'>
            <div style={{width: '14rem'}}>
                {/* <ul style={{ 'left': carouselVedioPosition + 'rem', 'width': Math.ceil(carouselVedioNum / 4) * 14 + 'rem' }}>
                  {
                    videoList.length > 0?
                    videoList.map((v, i) => {
                      return <li key={i} >
                      
                      <VideoWin id={'shipin_'+i} vid={v.videoUrl}></VideoWin>
                        <p>{v.videoName}</p>
                      </li>
                    }):''
                  }
                </ul> */}
              <ul>
                {
                  videoList.length > 0?
                  videoList.map((item, i) => {
                    return <li key={i}>
                    <div className='vediobox' onClick={this.showVedio.bind(this,item.videoUrl)} >
                      <img src={item.picture} alt="" />
                      <img src={require('../../../../../assets/img/brandcenter/fansinteraction/play-icon.png')} alt="" />
                    </div>
                    <p>{item.videoName}</p>
                  </li>
                  }):''
                }
              </ul>
            </div>
            {hasNextPage?
              <span className='watchmore' onClick={this.carouselRight}>查看更多</span>
                :null
              }
          
          </div>
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

export default ProtectCourse