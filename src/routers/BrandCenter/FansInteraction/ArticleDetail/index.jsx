import React, { Component } from 'react'
import { Tooltip, Modal, message } from 'antd';
import Share from '../../../../components/Common/Share'
import { querryStringToObject } from '../../../../utils/util'
import { brandConter } from '../../../../services/brandConter'
import './index.less'

const text = <Share />
class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleDetail: {},
      thumb_up: false,
      like_num: null
    }
    this.addLike = this.addLike.bind(this);
  }
  componentDidMount() {
    this.getArticleDetail();
  }
  getArticleDetail() {
    const search = this.props.location.search;
    const params = querryStringToObject(search);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const accessToken = userInfo && userInfo.accessToken;
    const data = {};
    data.id = params.id;
    data.accessToken = accessToken;
    brandConter.getDetail(data).then((res) => {
      if(res && res.code == '0') {
        this.setState({
          articleDetail: res.data.dataList,
          thumb_up: res.data.thumb_up
        })
      }
    })
  }
  addLike() {
    const search = this.props.location.search;
    const params = querryStringToObject(search);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken

    if(!accessToken){
      message.warning('检测到您未登录，请先登录');
      setTimeout(function(){
        window.location.href = "/login";
      },1000)

      return;
    }

    const data = {};
    data.id = params.id;
    data.accessToken = accessToken;
    brandConter.collect(data).then((res) => {
      if(res && res.code =='0') {
        this.setState({
          thumb_up: res.data.thumb_up,
          like_num: res.data.like_num
        })
      }
    })
  }
  render() {
    const {articleDetail} = this.state;
    return (
      <div className='handleArticleDetail'>
        {this.getList()}
      </div>
    )
  }
  getList() {
    const {articleDetail, thumb_up, like_num} = this.state;
    return <div className='ArticleDetail'>
              <div className='Title'>
                <h2>{articleDetail.title}</h2>
                <p className='article-icon'>
                  <span>{articleDetail.create_time}</span>
                  <span>
                    <i>{articleDetail.read_num}</i>
                    <Tooltip placement="bottom" title={text}>
                      <i>{articleDetail.share_num}</i>
                    </Tooltip>
                    <i className={articleDetail.thumb_up||thumb_up?'thumb_up':''} onClick={this.addLike}>{like_num?like_num:articleDetail.like_num}</i>
                  </span>
                </p>
              </div>
              <div className='content'>
                <p dangerouslySetInnerHTML={{ __html:articleDetail.content}}></p>
              </div>
              <div className='code'>
                <p>更多精彩扫描下方二维码</p>
                <p>关注一汽丰田</p>
                <img src={require('../../../../assets/img/brandcenter/wonderful/code-ftms.png')} alt=""/>
              </div>
            </div>
  }
}
export default ArticleDetail