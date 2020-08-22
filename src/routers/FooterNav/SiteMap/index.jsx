import React, { Component } from 'react'
import {carSellHelpInter} from '../../../services/carSellHelpInter'
import './index.less'

class SiteMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      typeList: []
    }
    
  }
  componentDidMount() {
    this.brandModelsList();
  }
  brandModelsList() {
    carSellHelpInter.brandModelsList().then((res)=> {
      if(res && res.code == '0') {
        this.setState({
          typeList: res.data
        })
      }
    })
  }
  render() {
    return (
        <div className='handleSiteMap'>
          <div className='headerPic'>
              <span>
                <h1>网站地图</h1>
                <i></i>
              </span>
          </div>
          {/*<img src={require('../../../assets/img/footerlink/map.png')} alt="" />*/}
          <div className='SiteMapContent'>
            <div className='SiteMapRight'>
              <h2>品牌车型</h2>
              <span></span>
              <div className='SiteMapRightList'>
                <ul>
                  {
                    this.state.typeList.map((type, index) => {
                      const carSeries = type.car_series;
                      if(carSeries && carSeries.length) {
                        return carSeries.map((cs, csi) => {
                          return (
                            <a key={csi} href={`/buycar/cartype/detail/${cs.alias}`}><li>{cs.name}</li></a>
                          )
                        })
                      }
                    })
                  }
                  {/* <a href="/buycar/cartype/detail/avalon"><li>AVALON 亚洲龙</li></a>
                  <a href="/buycar/cartype/detail/crown"><li>CROWN 皇冠</li></a>
                  <a href="/buycar/cartype/detail/corolla_phev"><li>卡罗拉双擎E+</li></a>
                  <a href="/buycar/cartype/detail/corolla"><li>COROLLA 卡罗拉</li></a>
                  <a href="/buycar/cartype/detail/corollahev"><li>卡罗拉双擎</li></a>
                  <a href="/buycar/cartype/detail/vios"><li>VIOS 威驰</li></a>
                  <a href="/buycar/cartype/detail/viosfs"><li>VIOS FS 威驰FS</li></a> */}
                </ul>
                {/* <ul>
                  <a href="/buycar/cartype/detail/izoa"><li>IZOA 奕泽</li></a>
                  <a href="/buycar/cartype/detail/rav4"><li>RAV4 荣放</li></a>
                  <a href="/buycar/cartype/detail/prado"><li>PRADO 普拉多</li></a>
                  <a href="/buycar/cartype/detail/coaster"><li>COASTER 柯斯达</li></a>
                  <a href="/buycar/cartype/detail/86"><li>86</li></a>
                  <a href="/buycar/cartype/detail/vellfire"><li>威尔法双擎</li></a>
                </ul> */}
              </div>
            </div>
            <div className='SiteMapLeft'>
              <ul>
                <h2>购车支持</h2>
                <span></span>
                <a href="/carSellHelp/CarDigiRoom"><li>数字展厅</li></a>
                <a href="/carSellHelp/carBrandModels"><li>品牌车型</li></a>
                <a href="/carSellHelp/genuineProduct"><li>纯正用品</li></a>
                <a href="/carSellHelp/financialService"><li>金融服务</li></a>
                <a href="/carSellHelp/financeLease"><li>融资租赁</li></a>
                <a href="/carSellHelp/newCarInsurance/brandinsurance"><li>新车保险</li></a>
                <a href="http://www.ft-ucar.com.cn/"><li>安心二手车</li></a>
                <a href="https://mall.ftms.com.cn/"><li>官方商城</li></a>
              </ul>
              <ul>
                <h2>车主专享</h2>
                <span></span>
                <a href="/ownervip/serintroduce/honestserver"><li>服务介绍</li></a>
                <a href="/ownervip/serverhall/upkeepplan"><li>服务大厅</li></a>
                <a href="/ownervip/purebrand/quality"><li>纯牌零件</li></a>
                <a href="/ownervip/fengxianghui/queity"><li>丰享汇</li></a>
                <a href="/ownervip/capacitynet/telematics"><li>智能互联</li></a>
              </ul>
              <ul>
                <h2>品牌中心</h2>
                <span></span>
                <a href="/brandcenter/enterprisebrand"><li>企业品牌</li></a>
                <a href="/brandcenter/enterpriseintroduce"><li>企业介绍</li></a>
                <a href="/brandcenter/socialResponsibility"><li>社会责任</li></a>
                <a href="/brandcenter/newscenter"><li>企业新闻</li></a>
                <a href="/brandcenter/activitycenter"><li>活动中心</li></a>
                <a href="/brandcenter/fansinteraction"><li>粉丝互动</li></a>
              </ul>
            </div>
          </div>
        </div>
    )
  }
}

export default SiteMap