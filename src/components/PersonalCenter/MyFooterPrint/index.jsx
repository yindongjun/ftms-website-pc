import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import {Icon} from 'antd'
import { personalInfo } from '../../../services/personalInfo'
import moment from 'moment'
import './index.less'

class MyFooterPrint extends Component{
  constructor(props) {
    super(props);
    this.state = {
      footPrintList: [],
      page: 0,
      size: 6,
      hasNextPage: false
    }
  }
  componentDidMount() {
    this.getPersonInfo(this.state.page);
  }
  getPersonInfo(page) {
    page++;
    const data = {};
    data.beginPage = page;
    data.pageSize = 4;
    personalInfo.personalFootPrint(data).then((res) => {
      if(res && res.code=='0') {
        this.setState({
          footPrintList: [...this.state.footPrintList,...res.data.dataList],
          page: page,
          hasNextPage: res.data.hasNextPage
        }) 
      }
    })
  }
  render(){
    const { footPrintList, page, hasNextPage } = this.state;
    return (
      <div className='handleMyFooterPrint'>
        <h2>我的足迹</h2>
        <Link to='/personcenter/home'>返回个人中心</Link>
        <ul className='FooterPrintList'>
            {/* <li>
              <div>
                <h3>2019-04-02 17:42:46</h3>
                <p>完成您在一汽丰田的第一次预约试驾完成您在一汽丰田的第一次一汽丰田</p>
                <span>
                  <img src={require('../../../assets/img/personsenter/circle.png')} alt=""/>
                  <img src={require('../../../assets/img/personsenter/line.png')} alt=""/>
                </span>
              </div>
            </li>
            <li>
              <div>
                <h3>2019-04-02 17:42:46</h3>
                <p>完成您在一汽丰田的第一次预约试驾完成您在一汽丰田的第一次一汽丰田</p>
                <span>
                  <img src={require('../../../assets/img/personsenter/circle.png')} alt=""/>
                  <img src={require('../../../assets/img/personsenter/line.png')} alt=""/>
                </span>
              </div>
            </li>
            <li>
              <div>
                <h3>2019-04-02 17:42:46</h3>
                <p>完成您在一汽丰田的第一次预约试驾</p>
                <span>
                  <img src={require('../../../assets/img/personsenter/circle.png')} alt=""/>
                  <img src={require('../../../assets/img/personsenter/line.png')} alt=""/>
                </span>
              </div>
            </li> */}
          {
            footPrintList.map((item,index)=>{
              return <li key={index}>
                <div>
                  <h3>{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</h3>
                  <p>{item.description}</p>
                  <span>
                    <img src={require('../../../assets/img/personsenter/circle.png')} alt=""/>
                    <img src={require('../../../assets/img/personsenter/line.png')} alt=""/>
                    <i className="cicle"></i>
                  </span>
                </div>
              </li>
            })
          }
          
          {/* <img src={require('../../../assets/img/personsenter/circle.png')} alt=""/> */}
          {
            hasNextPage?
              <span className='watchmore' onClick={this.getPersonInfo.bind(this, page)}>查看更多<Icon type="down" /></span>:
              null 
        }
        </ul>
      </div>
    )
  }
}
export default MyFooterPrint