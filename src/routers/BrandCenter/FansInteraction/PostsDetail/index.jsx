import React, { Component, Fragment } from 'react'
import { Modal, Tooltip } from 'antd';
import Share from '@/components/Common/Share'
import FCWorld from '../../../../components/Common/FCWorld'
import { brandConter } from '../../../../services/brandConter'
import { querryStringToObject } from '../../../../utils/util'
import './index.less'
import { Item } from 'antd-mobile/lib/tab-bar';

const text = <Share/>
class PostsDetail extends Component {
  constructor(props) {
    super(props)
    this.state={
      isShowRepaly: true,
      visible: false,
      postContent: {},
      userInfo: {},
      tags: [],
      page: 0,
      moreBtn: true,
      remarkList: []
    }
    this.getMore = this.getMore.bind(this);
  }
  componentDidMount() {
    this.getPostDetail();
    this.getMore(this.state.page);
  }
  getPostDetail() {
    const search = this.props.location.search;
    const params = querryStringToObject(search);
    brandConter.getPostDetail(params.id).then((res) => {
      if(res && res.code == '0') {
        this.setState({
          postContent:res.data,
          userInfo: res.data.authorinfo,
          tags: res.data.authorinfo.tags
        })
      }
    })
  }
  getMore(page) {
    page++;
    const search = this.props.location.search;
    const params = querryStringToObject(search);
    brandConter.getRemarkList(params.id,page).then((res) => {
      if(res&&res.code=='0') {
        if(res.data&&res.data.list) {
          if(res.data.list.length>0) {
            this.setState({
              remarkList: [...this.state.remarkList,...res.data.list]
            })
          }
          if(page>=res.data.totalpage) {
            this.setState({
              moreBtn:false
            })
          }
        }else {
          this.setState({
            moreBtn:false
          })
        }
      }
    })
    this.setState({
      page:page
    })
    console.log(this.state.remarkListr);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }

  goPerson = (id) => {
    window.location.href = `/brandcenter/fansinteraction/personaldetail?id=`+id
  }
  render() {
    const {isShowRepaly, postContent, userInfo, tags, page, moreBtn, remarkList} = this.state;
    return (
      <div className='handlePostsDetail'>
      {
          <div className='PostsDetail'>
            <div className='PostsTitle'>
              <h2>{postContent.title}</h2>
              <span>
                <i>{postContent.createtime}</i>
                <i>{postContent.view}</i>
                <Tooltip placement="bottom" title={text} overlayClassName='sharebox'>
                  <i>{postContent.share}</i>
                </Tooltip>
                <i onClick={this.showModal}>{postContent.zan}</i>
              </span>
            </div>
            
            <div className='PostsPersonInfo'>
              <a href={`/brandcenter/fansinteraction/personaldetail?id=`+postContent.userId}>
                <img src={userInfo.avatarurl} alt="" />
                <p>{userInfo.nickname}</p>
              </a>
                {
                        tags.map((ii,vv)=> {
                            return (
                            <span key={vv}>{ii.label}</span>)
                        })
                    }
                {userInfo.isowner==1?<span className="carner">认证车主</span>:null}
                {/* <span>丰潮达人</span>
                <span className="carner">认证车主</span>
                <i>#精彩活动#</i> */}
                <button onClick={this.showModal}>关注</button>
            </div>
            <div className="PostsPersonConent" dangerouslySetInnerHTML={{ __html:postContent.content}}></div>
            <div className='PostsRemark'>
              <h2>评论</h2>
              <ul className='RemarkList'>
                {this.MarkList()}
              </ul>
              {
                moreBtn?
                  <span className="watchmore" onClick={()=>{this.getMore(page)}}>查看更多</span>:
                  null
              }
            </div>
            <Fragment>
              <Modal
                title=" "
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={null}
                wrapClassName='FCWorld'
                centered={true}
              >
                <FCWorld/>
              </Modal>
            </Fragment>
          </div>
      }
      </div>
    )
  }
  MarkList () {
    const {remarkList} = this.state;
    return remarkList.map((item,index) => {
      return <li key={item.id}>
                <div className='RemarkUserDetail'>
                  <img onClick={this.goPerson.bind(this,item.uid)} src={item.authorinfo.avatarurl} alt="" />
                  <div>
                    <span onClick={this.goPerson.bind(this,item.uid)} className='suername'>{item.authorinfo.nickname}</span>
                    {
                        item.authorinfo.tags.map((ii,vv)=> {
                            return (
                            <span className="label" key={vv}>{ii.label}</span>)
                        })
                    }
                    {item.userId==1?<span className="carner">认证车主</span>:null}
                    <i>{item.createtime}</i>
                    <span className='num'>{item.lc}楼</span>
                      {
                        item.tid==0?
                        <p>{item.content}</p>:
                        <Fragment>
                            <div className='repaly'>
                                <span>
                                    <img src={require('../../../../assets/img/brandcenter/fansinteraction/top.png')} alt=""/>
                                    <p>{item.tcomment.nickname}</p>
                                </span>
                                <span>
                                    <p>{item.tcomment.content}</p>
                                    <img src={require('../../../../assets/img/brandcenter/fansinteraction/bottom.png')} alt=""/>
                                </span>
                            </div>
                            <p>{item.content}</p>
                        </Fragment>
                      }
                  </div>
                </div>
                <div className='remarkNum'>
                  <i>{item.reply}</i>
                  <i>{item.up}</i>
                </div>
            </li>
    })
  }
}

export default PostsDetail