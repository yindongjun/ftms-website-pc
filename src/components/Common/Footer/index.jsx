import React, {Component} from 'react'
import './index.less'
import { footerApi } from '../../../services/api';

const footerNavLeft = [
  {
    title: '网站政策',
    url: '/footernav/sitepolicy',
    tar: '_self'
  },
  {
    title: '经销商招募',
    url: '/footernav/dealerrecruit',
    tar: '_self'
  },
  {
    title: '供应商招募公告',
    url: '/footernav/tendernotice',
    tar: '_self'
  },
  {
    title: '网站地图',
    url: '/footernav/sitemap',
    tar: '_self'
  },
  {
    title: '加入我们',
    url: 'http://www.hotjob.cn/wt/FTMS/web/index?brandCode=null',
    tar: '_blank'
  }
]
const footerIcon = [
  {
    iconUrl: 'cart.png',
    iconHover: 'cartO_03.png',
    url:'https://mall.ftms.com.cn/'
  },
  {
    iconUrl: 'tianmao.png',
    iconHover: 'tianmaoO_05.png',
    url: 'https://ftms.tmall.com/'
  },
  {
    iconUrl: 'jd.png',
    iconHover: 'jdO_07.png',
    url: 'https://mall.jd.com/index-831360.html'
  },
  {
    iconUrl: 'weibo.png',
    iconHover: 'weiboO_09.png',
    url: 'https://weibo.com/officialftms'
  },
  {
    iconUrl: 'weixin.png',
    iconHover: 'weixinO_11.png'
  },
  {
    iconUrl: 'xcx.png',
    iconHover: 'xcxO_13.png'
  },
  {
    iconUrl: 'app.png',
    iconHover: 'appO_15.png'
  }
]
class Footer extends Component{
  constructor(props) {
    super(props);
    this.state = {
      linkList: []
    }
  }
  componentDidMount() {
    this.getLinkList()
  }
  getLinkList() {
    footerApi.getLinkList().then(res => {
      if (res && res.code === '0') {
        this.setState({
          linkList: res.data
        })
      }
    })
  }

  jumpTo = (url) => {
    if (url !== '' && url !== null && url !== undefined) {
      window.open(url)
    }
  }

  render(){
    const { linkList } = this.state;

    return(
      <div className='official-footer'>
          <ul className="footerNavbar">
            <li>
              <ul className="footerNav-Left">
                {
                  footerNavLeft.map((item, index) => {
                    return <a key={index} href={item.url} target={item.tar}>
                      <li>{item.title}</li>
                    </a>
                  })
                }
              </ul>
            </li>
            <li>
              <img src={require("../../../assets/img/footer/hottel.png")} alt="" />
              <div className='num'>
                <p> <span>800-810-1210</span> <i>(固话拨打，免费)</i></p>
                <p> <span>400-810-1210</span>  <i>(手机拨打，只需付市话费)</i></p>
              </div>
            </li>
            <li>
              <ul className="footer-icon">
                {
                  footerIcon.map((v ,i) => {
                    return <li key={i} onClick={()=>this.jumpTo(v.url)}>
                      <img src={require(`../../../assets/img/footer/${v.iconUrl}`)} alt=""/>
                      <img src={require(`../../../assets/img/footer/${v.iconHover}`)} alt=""/>
                    </li>
                  })
                }
              </ul>
            </li>
          </ul>
          <div className='company-list'>
            {
              linkList.map((item,index)=>{
                return(
                    <a target="_blank" href={item.url} key = {index} target='_blank'>{item.name}</a>
                )
              })
            }
          </div>
          <div className='copyright'>
            <p>一汽丰田汽车销售有限公司版权所有 Copyright 2018 FAW TOYOTA Motor Sales Co.,LTD</p>
            <p>京ICP07503373号-1 | 京公网安备110105019374号</p>
          </div>
        </div>
    )
  }
}

export default Footer