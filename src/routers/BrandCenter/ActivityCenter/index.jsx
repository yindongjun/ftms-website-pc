import React, {Component} from 'react'
import './index.less'
import {brandConter} from '../../../services/brandConter'

class ActivityCenter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      //新闻列表
      ActivitiesList: [],
      ActivitiesListEnd: [],
      pageNum: 0,
      row: 8,
      type: 'recent',
      hasNextPage: true,
      moreBtnShow: true
    }
  }

  //生命周期
  componentDidMount() {
    this.getActivitiesList(this.state.pageNum, this.state.row, 'recent');
    this.getActivitiesList(this.state.pageNum, this.state.row, 'end');
  }

  getActivitiesList(page, row, type) {
    page++;
    brandConter.activitiesList(page, row, type, 'component').then((res) => {
      if (res && res.code === '0') {
        if (type === 'recent') {
          if(res.data.list){
            this.setState({
              ActivitiesList: [...this.state.ActivitiesList, ...res.data.list]
            })
          }
        } else if (type === 'end') {
          if(res.data.list){
            this.setState({
              ActivitiesListEnd: [...this.state.ActivitiesListEnd, ...res.data.list]
            })
            if(res.data.list.length < this.state.row){
              this.setState({
                hasNextPage: false
              })
            }
          }else{
            this.setState({hasNextPage:false})
          }
        }
      }
    })
    this.setState({
      pageNum: page
    })
  }


  render() {
    return (
      <div className='handleActivityCenter'>
        <div className="ActivityCenter">
          <div className='headerPic'>
            <span>
              <h1>活动中心</h1>
              <i></i>
            </span>
          </div>
          <div className='latestActivity'>
            <h2>近期活动</h2>
            <div className='latestActivitycontent'>
              {
                this.state.ActivitiesList.map((item, index) => {
                  return <a
                    href={item.has_detail ? `/brandcenter/activitycenter/activitydetail?id=${item.id}`+ `&text=activity` : item.url}
                    target='_blank'
                   key={index} >
                    <img src={item.thumb} alt=""/>
                    <h3 className={item.is_sale?'icon_h3':''}>{item.title}</h3>
                    <i>{item.create_time}</i>
                  </a>
                })
              }
            </div>
          </div>
          <div className='pastActivity'>
            <h2>往期活动</h2>
            <ul className='pastActivitylist'>
              {
                this.state.ActivitiesListEnd.map((item, index) => {
                  return <li onClick={() => {
                    if (item.has_detail)
                      window.open(`/brandcenter/activitycenter/activitydetail?id=${item.id}`+`&text=activity`)
                    else
                      window.open(item.url)
                  }}
                             key={index}>
                    <img src={item.thumb} alt=""/>
                    <h3>{item.title + '【活动已结束】'}</h3>
                    <i>{item.create_time}</i>
                  </li>
                })
              }

            </ul>
          </div>
          {
           this.state.hasNextPage ?
          <span className='watchmore' onClick={()=>{this.getActivitiesList(this.state.pageNum, this.state.row, 'end')}}>查看更多</span>
          : null
          }
        </div>
      </div>
    )
  }
}

export default ActivityCenter
