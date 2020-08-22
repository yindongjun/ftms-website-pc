import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'
import './index.less'
import {footerApi, headerApi} from "../../../../services/api";

class NoticeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      pageNum: 0,
      row: 10,
      hasNextPage: true,
    }
  }
  componentDidMount() {
    this.getTenderList(this.state.pageNum,this.state.row)
  }
  getTenderList(page,row) {
    page++;
    const params = {
      page: page,
      row: row
    };
    footerApi.getTenderList(params).then(res => {
      if (res && res.code === '0') {
        this.setState({
          dataList: [...this.state.dataList,...res.data.dataList],
          hasNextPage:res.data.hasNextPage
        })
      }
    })
    this.setState({
      pageNum: page
    })
  }

  render() {
    const { dataList, hasNextPage, pageNum, row } = this.state;

    return (
      <div className='handleNoticList'>
        <ul>
          {
            dataList.map((item, index) => {
              return <Link to={'/footernav/tendernotice/detail?bid=' + item.bid} key={index}>
                <li>
                  <span>{item.addtime}</span>
                  <span>{item.name}</span>
                </li>
              </Link>
            })
          }
        </ul>
        {
          hasNextPage?
              <span onClick={() => {this.getTenderList(pageNum,row)}}>查看更多<Icon type="down" /></span>
              :null
        }
      </div>
    )
  }
}

export default NoticeList