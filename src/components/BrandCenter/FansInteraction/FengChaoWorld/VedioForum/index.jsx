import React, {Component} from 'react'
import { message, Tooltip } from 'antd'
import Share from '@/components/Common/Share'
import { brandConter } from '../../../../../services/brandConter'
import './index.less'

const text = <Share/>
class VedioForum extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topicList:[],
      postList:[],
      page:0
    }
    this.showParModel = this.showParModel.bind(this);
  }
  componentDidMount() {
    this.middleFun();
  }
  middleFun() {
    this.getPostList(this.state.page);
  }
  getPostList(page) {
    page++;
    brandConter.getPostList('video',page).then((res) => {
      if(res&&res.code =="0") {
        if(res.data.list.length>0) {
          this.setState({
            postList:[...this.state.postList,...res.data.list]
          })
          if(page>=res.data.totalpage) {
            this.props.moreShow();
          }
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
      <ul className='VedioForumRemarkList'> 
          {this.getList()}
        </ul>
    )
  }
  getList() {
    const { postList } = this.state;
    return postList.map((item,index) => {
      return (
        <li key={item.id}>
            <div className='ListHeader'>
              <img onClick={this.goPerson.bind(this,item.userId)} src={item.authorinfo.avatarurl} alt=""/>
              <h1 onClick={this.goPerson.bind(this,item.userId)}>{item.authorinfo.nickname}</h1>
              {
                    item.authorinfo.tags.map((ii,vv)=> {
                        return (
                        <i key={vv}>{ii.label}</i>)
                    })
                }
              {item.authorinfo.isowner==1?<i>车主认证</i>:null}
              <span onClick={this.showParModel}>关注</span>
            </div>
            <div onClick={this.goDetail.bind(this,item.id)}>
              <span className='activityTitle'>{item.title}</span>
              <div className='imgshow'> 
                  {item.thumbs.map((v,i)=> {
                      return (
                        <span key={i}>
                          <img src={v} />
                          <img src={require('../../../../../assets/img/brandcenter/fansinteraction/play-icon.png')} alt=""/>
                        </span>
                      )
                    })}
              </div>
            </div>
            <div className='ListBottomIcon'>
              <span>{item.createtime}</span>
              <span>
                <i>{item.view}</i>
                <i onClick={this.showParModel}>{item.replay}</i>
                <i onClick={this.showParModel}>{item.zan}</i>
                <Tooltip placement="bottom" title={text} overlayClassName='sharebox'>
                  <i>{item.share}</i>
                </Tooltip>
              </span>
            </div>
          </li>
      )
    })
  }
}
export default VedioForum
