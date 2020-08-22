import React,{Component} from 'react'
import './index.less'
import {headerApi} from "../../../services/api";

const button = [
  {
    title: '数字展厅',
    url: '/carSellHelp/CarDigiRoom'
  },
  {
    title: '安心二手车',
    url: 'http://www.ft-ucar.com.cn/'
  },
  {
    title: '丰享汇',
    url: '/ownervip/fengxianghui/queity'
  },
  {
    title: '官方商城',
    url: 'https://mall.ftms.com.cn/'
  },
  {
    title: '粉丝互动',
    url: '/brandcenter/fansinteraction'
  }
]
class MiddleFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: []
    }
  }
  componentDidMount() {
    this.getAdvertisement()
  }
  getAdvertisement() {
    headerApi.getAdvertisement().then(res => {
      if (res && res.code === '0') {
        this.setState({
          dataList: res.data
        })
        // console.log('=============')
        // console.log(this.state.dataList)

      }
    })
  }
  render(){
    return(
      <div className='handleMiddleFooter'>
        <div className='activ-area'>
          <ul>
            {
              this.state.dataList.map((item, index) => {
                return <li style={{backgroundImage: 'url('+item.list.pc_pic+')', width: this.state.dataList.length === 4? '9.08rem' : null}} key={index}><a href={item.list.url} target='_blank'>{item.list.name}</a><div className="black"></div></li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default MiddleFooter
