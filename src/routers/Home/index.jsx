import React, { Component } from 'react'
import { Carousel } from 'antd'
import MiddleFooter from '../../components/Common/MiddleFooter';
import CarShow from '../../components/Common/CarShow'
import {carSellHelpInter} from '../../services/carSellHelpInter'
import './index.less'
import config from '../../config.json'
import {common} from "../../services/common";
import {publicApi} from "../../services/api";

class OfficialHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'bottom',
      showCarousel: true,
      showCar: false,
      dataList: [],
      carList: [],
      toCardListIndex: 0,
      accessToken: '',
      activeHasOrNot: false,
      zBoxFlag: false,
      x1: 0,
      y1: 0,
      dragFlag: false
    }
  }
  componentDidMount(){
    this.getSlideshow();
    this.brandModelsList();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken
    this.setState({
      accessToken: accessToken
    })
    // 抽奖活动有无
    publicApi.luckyDrawHasOrNot().then(res => {
      if (res && res.code === '0') {
        this.setState({
          activeHasOrNot: res.data
        })
      }
    })
  }
  getSlideshow() {
    common.getSlideshow('3').then((res) => {
      if(res && res.code == '0') {
        this.setState({
          dataList: res.data
        })
      }
    })
  }

  brandModelsList() {
    carSellHelpInter.brandModelsList().then((res) => {
      if(res && res.code == '0') {
        this.setState({
          carList: res.data
        })
      }
    })
  }
  // 显示车型展示
  showCarShow = (i) => {
    // 车型敬请期待，不可点击
    // if(i === 3 ) return;
    this.setState({
      showCarousel: false,
      toCardListIndex: i
    })
  }
  // 点击车型展示页面中的关闭按钮，关闭车型展示部分
  onClose = (flag) => {
    this.setState({
      showCarousel: flag
    })
  }
  // banner图点击跳转
  bannerLink(url) {
    console.log(url);
    window.location.href = url;
  }
  // 抽奖活动 增加的点击跳转 登陆校验
  toChoujiang(i) {
    if(this.state.dragFlag) return
    if (i == 0) {

    } else {
      if (this.state.accessToken){
        window.open(`${config.mallServerPath}/luckdraw?` + 'token=' + this.state.accessToken, '_blank'); // 
      } else {
        window.open(`${config.mallServerPath}/luckdraw`,'_blank');
      }
    }
  }
  getPos(ev){
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;  
    return {x: ev.clientX+scrollLeft, y: ev.clientY+scrollTop};     
  }
  drag(e) {
    this.setState({
      zBoxFlag: true,
      x1: e.clientX,
      y1: e.clientY
    })
    var disX,disY
    var oDiv=document.getElementById('lucky');
    var oEvent=e||window.event;
    var pos=this.getPos(oEvent);
    disX=pos.x-oDiv.offsetLeft;//鼠标x-div left
    disY=pos.y-oDiv.offsetTop;//鼠标y-div top
    var _this = this
    document.onmousemove=function(e){
      var oEvent=e||window.event;
      var pos=_this.getPos(oEvent);
      var l=pos.x-disX;
      var t=pos.y-disY;
      if(l<0){
          l=0;
      }else if(l>document.documentElement.clientWidth-oDiv.offsetWidth){
          l=document.documentElement.clientWidth-oDiv.offsetWidth;
      }
      if(t<0){
          t=0;
      }else if(t>document.documentElement.clientHeight-oDiv.offsetHeight){
          t=document.documentElement.clientHeight-oDiv.offsetHeight;
      }
      oDiv.style.left=l+'px';
      oDiv.style.top=t+'px';
      e.preventDefault()
    }
    document.onmouseup=function(e){
      document.onmousemove=null;
      document.onmouseup=null;
      var diff = Math.sqrt((e.clientX-_this.state.x1)*(e.clientX-_this.state.x1)+(e.clientY-_this.state.y1)*(e.clientY-_this.state.y1));
      if(diff > 2){
        _this.setState({
          zBoxFlag: false,
          dragFlag: true
        })
      } else {
        _this.setState({
          zBoxFlag: false,
          dragFlag: false
        })
      }
      console.log(diff)
      e.preventDefault()
      e.stopPropagation()
    }
    return false;  
  }
  render() {
    const { showCarousel, dataList, carList } = this.state
    console.log(dataList);
    return (
        <div className='handleOfficialSite'>
          {
            showCarousel ?
              // 首页轮播图
              <div className='slide-img'>
                {
                  dataList.length > 0 ?
                    <Carousel autoplay>

                    {/*<div>*/}
                      {/*<div>*/}
                        {/*<img src={dataList[0].thumb} title={dataList[0].title} onClick={this.bannerLink.bind(this, dataList[0].url)} alt=""/>*/}
                      {/*</div>*/}
                    {/*</div><div>*/}
                      {/*<div>*/}
                        {/*<img src={dataList[1].thumb} title={dataList[1].title} onClick={this.bannerLink.bind(this, dataList[1].url)} alt=""/>*/}
                      {/*</div>*/}
                    {/*</div><div>*/}
                      {/*<div>*/}
                        {/*<img src={dataList[2].thumb} title={dataList[2].title} onClick={this.bannerLink.bind(this, dataList[2].url)} alt=""/>*/}
                      {/*</div>*/}
                    {/*</div><div>*/}
                      {/*<div>*/}
                        {/*<img src={dataList[3].thumb} title={dataList[3].title} onClick={this.bannerLink.bind(this, dataList[3].url)} alt=""/>*/}
                      {/*</div>*/}
                    {/*</div>*/}
                      {
                        // 循环出来的轮播图就会从第四张开始，挨个写出来的就会从第一张开始，原因未知

                    dataList.map((item, index) => {
                      return <div key={index}>
                        <img src={item.thumb} title={item.title} alt="" onClick={this.bannerLink.bind(this, item.url)}
                             style={{cursor: 'pointer'}}/>
                        <h3>{index}</h3>
                      </div>
                    })
                  }
                    </Carousel>
                    :null
                }
                <ul className='silde-nav'>
                  {
                    carList.map((item,index)=>{
                      return <li key={index} onClick={this.showCarShow.bind(this, index)}>
                            {item.car_series.length === 0 ? <span className='special1'>原装进口</span> : null}
                        {item.car_series.length === 0 ? <span className='special1'>{item.title +'（敬请期待）'}</span> : <span>{item.title}</span>}
                      </li>
                    })
                  }
                </ul>
              </div>
              :
              // 车型展示
              <CarShow cli={this.state.toCardListIndex} onClose={flag => this.onClose(flag)} />
          }
          <MiddleFooter />
          {
            this.state.activeHasOrNot ?
                <div className='lucky'>
                  {this.state.zBoxFlag && <div className="zBox"></div>}
                  <a id="lucky" onMouseDown={this.drag.bind(this)} onClick={this.toChoujiang.bind(this, 1)} target='_blank'>
                    <div className='luckyImg'></div>
                    {/*<img src={require("../../assets/img/footer/lucky.png")} alt="" />*/}
                  </a>
                </div>
                :
                null
          }
        </div>
    )
  }
}
export default OfficialHome
