import React, { Component, Fragment } from 'react'
import { Icon, message, Tooltip } from 'antd'
import $ from 'jquery'
// import {Macy} from 'macy'
import Share from '@/components/Common/Share'
import classNames from 'classnames'
import './index.less'
import { brandConter } from '../../../../../services/brandConter'

const text = <Share/>

class Recommend extends Component {
  constructor (props) {
    super(props)
    this.state  = {
      topicList:[],
      postList:[],
      page:0,
      isShow:false,
      btnMoreShow:false, 
    }
    this.showParModel = this.showParModel.bind(this);
  }
  componentDidMount() {
    this.getHotTopic();
    this.middleFun();
  }
  handleShow(flag) {
    const _flag = !flag;
    this.setState({
      isShow: _flag
    })
  }
  getHotTopic () {
    brandConter.getHotTopic().then((res) => {
      if(res&&res.code=='0') {
        this.setState({
          topicList:res.data
        })
      }
    })
  }
  middleFun() {
    this.getPostList(this.state.page);
  }
  getPostList(page) {
    page++;
    brandConter.getPostList('recom',page).then((res) => {
      if(res&&res.code =="0") {
        if(res.data.list.length>0) {
          this.setState({
            postList:[...this.state.postList,...res.data.list],
          })
          if(page>=res.data.totalpage) {
            this.props.moreShow();
          }else{
            this.setState({
              btnMoreShow:true
            })
          }
          this.waterFall();
        }else {
          this.props.moreShow();
        }
      }
    })
    this.setState({
      page:page
    })
  }
  waterFall () {
    let top1=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    var allBox = $('#ullist > .libox');
    var boxWidth = $(allBox).eq(0).outerWidth();
    var boxH=$(allBox).eq(0).outerHeight();
    var screenWidth = this.refs.ullist.offsetWidth;//大容器宽度
    var cols=2;//
    var heightArr = [];
    var maxhight=0;
    var mh=0;
    $.each(allBox,function (index,value) {
        var boxHeight = $(value).outerHeight();
        if(index < cols)
        {
            heightArr[index] = boxHeight;
        }
        else 
        {
            var minBoxHeight = Math.min.apply(null,heightArr);
            var minBoxIndex = $.inArray(minBoxHeight,heightArr);
            if(minBoxIndex){
              $(value).css({
                'position':'absolute',
                'top':minBoxHeight + 'px',
                'left':minBoxIndex * boxWidth +10+ 'px'
            });
            }else{
              $(value).css({
                'position':'absolute',
                'top':minBoxHeight + 'px',
                'left':minBoxIndex * boxWidth+ 'px'
            });
            }
            mh=minBoxHeight+boxHeight;
            if(mh>maxhight){
              maxhight=mh;
            }
            $('#ullist').height(maxhight);
            heightArr[minBoxIndex] += boxHeight;
            window.scrollTo(0, top1);
        }
    })
  }


  showParModel() {
    this.props.showM();
    
  }
  searchMore(){
    console.log('11');
    // this.props.moreShow();
  }
  render() {
    const {topicList, isShow,btnMoreShow} = this.state;
    return (
      <Fragment>
        <div className='TopicList'>
          <span>热门话题：</span>
          <ul className={classNames({ 'up' :!isShow})}>
            {
              topicList.map((item,index) => {
                return (
                  <li key={item.id}><span>#</span>{item.title}<span>#</span></li>
                )
              })
            }
          </ul>
          <Icon type="down" onClick={this.handleShow.bind(this,isShow)} />
        </div>
        <div id="ullist" className='RemarkList' ref="ullist">
              {this.getList()}
        </div>
        
      </Fragment>
    )
  }

  getList() {
    const {postList} = this.state;
    
     return  postList.map((item,index) => {
        return (
          <a className="libox" key={item.id+'_'+index}>                      
            <div>
                <div className='ListHeader'>
                  <a href={`/brandcenter/fansinteraction/personaldetail?id=`+item.userId}>
                    <img src={item.authorinfo.avatarurl} alt="" />
                    <h1>{item.authorinfo.nickname}</h1>
                  </a>
                    {
                          item.authorinfo.tags.map((ii,vv)=> {
                              return (
                              <i key={vv}>{ii.label}</i>)
                          })
                      }
                    {item.authorinfo.isowner==1?<i>车主认证</i>:null}
                  <span onClick={this.showParModel}>关注</span>
                </div>
                <a href={`/brandcenter/fansinteraction/postsdetail?id=`+item.id} key={item.id}>
                <span className='activityTitle'>{item.title}</span>
                {item.thumbs.length>0?
                  <div className='imgshow'>
                  {item.thumbs.map((v,i)=> {
                    return (
                      item.thumbs.length==1?
                      <img className="imgshow_1" key ={i} src={v} />:item.thumbs.length==2?
                      <img className="imgshow_2" key ={i} src={v} />:item.thumbs.length>=3?
                      <img className="imgshow_3" key ={i} src={v} />:''
                    )
                  })}
                  {/* <img src={require('../../../../../assets/img/brandcenter/fansinteraction/1.png')} alt="" /> */}
                </div>:''
                }
                </a>
              
              <div className='ListBottomIcon'>
                <span>{item.createtime}</span>
                <span>
                  <i>{item.view}</i>
                  <i onClick={this.showParModel}>{item.reply}</i>
                  <i onClick={this.showParModel}>{item.zan}</i>
                  <Tooltip placement="bottom" title={text} overlayClassName='sharebox'>
                    <i>{item.share}</i>
                  </Tooltip>
                </span>
              </div>
            </div>
          </a>
        )
      })
    
  }
}
export default Recommend