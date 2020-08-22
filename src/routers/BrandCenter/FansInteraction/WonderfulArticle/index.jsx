import React, { Component } from 'react'
import {Icon} from 'antd'
import {brandConter} from '../../../../services/brandConter'
import './index.less'

class WonderfulArticle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      row: 6,
      articleList: [],
      moreBtn: true,
      accessToken:''
    }
  }
  componentDidMount() {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken;
    if(accessToken){
      this.setState({
        accessToken:accessToken
      })
      this.getList(this.state.pageNum,this.state.row,accessToken);
    }else{
      this.setState({
        accessToken:''
      })
      this.getList(this.state.pageNum,this.state.row,'');
    }
  }
  getList(page,row,token) {
    let data={
        "page":page++,
        "row": row,
        "accessToken": token
    }
    brandConter.getList(data).then((res) => {
      if(res&&res.code=='0') {
        // if(res.data.dataList.length>0) {
        //   alert(1)
        // }
        if(res.data.dataList.length>0) {
          this.setState({
            articleList:[...this.state.articleList,...res.data.dataList],
            moreBtn: res.data.hasNextPage
          })
        }
      }
    })
    this.setState({
      pageNum:page
    })
  }
  render() {
    const {articleList, pageNum, row, moreBtn,accessToken} = this.state;
    return (
      <div className='handleWonderfulArticle'>
          <div className='WonderfulArticle'>
          <div className='headerPic'>
              <span>
                <h1>粉丝互动</h1>
                <i></i>
              </span>
            </div>
            {/* <img src={require('../../../../assets/img/brandcenter/fansinteraction/banner.png')} alt="" /> */}
            <div className='ArticleList'>
              <h2>精彩文章</h2>
              <ul>
                {
                  articleList.map((item,index) => {
                    return <a key={item.id} href={`/brandcenter/fansinteraction/articledetail?id=`+item.id}>
                            <li>
                              <img src={item.pc_pic} alt="" />
                              <h3>{item.title}</h3>
                              <div>
                                <span>{item.create_time}</span>
                                <span>
                                  <i>{item.read_num}</i>
                                  <i>{item.share_num}</i>
                                  <i>{item.like_num}</i>
                                </span>
                              </div>
                            </li>
                          </a>
                    
                  })
                }
              </ul>
            </div>
            {
              moreBtn?
            <span className='watchmore' onClick={this.getList.bind(this,pageNum,row,accessToken)} >查看更多<Icon type="down" /></span>
            :null
            }
          </div>
      </div>
    )
  }
}
export default WonderfulArticle