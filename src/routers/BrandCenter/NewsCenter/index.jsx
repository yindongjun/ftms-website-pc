import React, { Component } from 'react'
import './index.less'
import{ brandConter }from '../../../services/brandConter'
import { message } from 'antd';

class NewsCenter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //新闻列表
      newList:[],
      pageNum: 0,
      row: 6,
      hasNextPage: true,
      moreBtnShow: true
    }
  }
  //生命周期
  componentDidMount() {
    this.getNewList(this.state.pageNum,this.state.row);
  }

  //新闻展示列表接口
  getNewList(page,row) {
    //brandcenter/newscenter/newsdetail接口url应该为这个  fail
    page++;
    brandConter.newsList(page,row).then((res) => {
      if(res && res.code === '0') {
        this.setState ({
          newList: [...this.state.newList,...res.data.dataList],
          hasNextPage:res.data.hasNextPage
        })
      }
    })
    this.setState({
      pageNum: page
    })
  }
  render() {
    const { newList,pageNum,row,hasNextPage } = this.state 
    return (
      <div className="handleNewsCenter">
          <div className="NewsCenter">
            <div className='headerPic'>
              <span>
                <h1>新闻中心</h1>
                <i></i>
              </span>
            </div>
            <div className='newscontents'>
              <h2>企业新闻</h2>
              <ul className='newslist'>
                {
                  newList.map((item, index) => {
                    return <a href={item.isLink=='1'?item.url:`/brandcenter/newscenter/newsdetail?id=`+item.id} key={index}>
                      <li>
                        <h1 title={item.title}>{item.title}</h1>
                        <i>{item.addtime}</i>
                        <p>{item.description}</p>
                        <span>查看详情</span>
                      </li>
                    </a>
                  })
                }
              </ul>
              {
                hasNextPage?
                  <span className='watchmore' onClick={() => {this.getNewList(pageNum,row)}}>查看更多</span>
                  :null
                }
            </div>
          </div>
      </div>
    )
  }
}

export default NewsCenter