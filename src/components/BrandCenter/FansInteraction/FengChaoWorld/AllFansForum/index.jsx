import React, {Component} from 'react'
import { message, Tooltip } from 'antd'
import $ from 'jquery'
import Share from '@/components/Common/Share'
import { brandConter } from '../../../../../services/brandConter'
import './index.less'

const text = <Share/>

class AllFansForum extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topicList:[],
      postList:[],
      page:0
    }
    this.showParModel = this.showParModel.bind(this)
  }
  componentDidMount() {
    this.middleFun();
  }
  middleFun() {
    this.getPostList(this.state.page);
  }
  getPostList(page) {
    page++;
    brandConter.getPostList('all',page).then((res) => {
      if(res&&res.code =="0") {
        if(res.data.list.length>0) {
          
          this.setState({
            postList:[...this.state.postList,...res.data.list]
          })
          if(page>=res.data.totalpage) {
            this.props.moreShow();
          }
          this.waterFall();
        }else {
          this.props.moreShow();
        }
        

      }else {
        message.warn(res.msg)
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
    var cols=2;//两列
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
  goDetail(id) {
    window.location.href = `/brandcenter/fansinteraction/postsdetail?id=`+id;
  }
  goPerson(id) {
    window.location.href = `/brandcenter/fansinteraction/personaldetail?id=`+id;
  }
  showParModel() {
    this.props.showM();
  }
  render(){
    return(
      <ul id="ullist" className='AllFansForumRemarkList' ref="ullist">
        {this.getList()}
      </ul>
    )
  }

  getList() {
    const { postList } = this.state;
    return postList.map((item,index) => {
        return (
          <a key={item.id+'_'+index} className="libox">
        <div>
          <div className='ListHeader'>
            <img onClick = {this.goPerson.bind(this,item.userId)} src={item.authorinfo.avatarurl} alt=""/>
            <h1 onClick = {this.goPerson.bind(this,item.userId)}>{item.authorinfo.nickname}</h1>
            {
                        item.authorinfo.tags.map((ii,vv)=> {
                            return (
                            <i key={vv}>{ii.label}</i>)
                        })
                    }
                  {item.authorinfo.isowner==1?<i>车主认证</i>:null}
            <span onClick={this.showParModel}>关注</span>
          </div>
          <div key={item.id} onClick={this.goDetail.bind(this,item.id)}>
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
            </div>:null
            }
          </div>
          
          <div className='ListBottomIcon'>
            <span>{item.createtime}</span>
            <span>
              <i>{item.view}</i>
              <i onClick={this.showParModel}>{item.reply}</i>
              <i onClick={this.showParModel}>{item.zan}</i>
              {/* <i>{item.share}</i> */}
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
export default AllFansForum