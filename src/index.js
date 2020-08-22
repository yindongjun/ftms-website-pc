import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'
import thunk from 'redux-thunk'
import reducers from './reducers'
import App from './App'
import './utils/resetFontSize'
import './assets/style/reset.less'
import Home from './routers/Home'
import SerIntroduce from './routers/OwnerVip/SerIntroduce'
import ServerHall from './routers/OwnerVip/ServerHall'
import PureBrand from './routers/OwnerVip/PureBrand'
import Fengxianghui from './routers/OwnerVip/Fengxianghui'
import CapacityNet from './routers/OwnerVip/CapacityNet'
import NativeTour from './routers/OwnerVip/PureBrand/nativetour'
import ThanksTeacher from './routers/OwnerVip/PureBrand/thanksteacher'
import CircleTran from './routers/OwnerVip/SerIntroduce/CircleTran'
import DealerRecruit from './routers/FooterNav/DealerrRecruit'
import SiteMap from './routers/FooterNav/SiteMap'
import SitePolicy from './routers/FooterNav/SitePolicy'
import TenderNotice from './routers/FooterNav/TenderNotice'
import Login from './routers/Login'
import EnterpriseBrand from './routers/BrandCenter/EnterpriseBrand'
import EnterpriseIntroduce from './routers/BrandCenter/EnterpriseIntroduce'
import NewsCenter from './routers/BrandCenter/NewsCenter'
import NewsDetail from './routers/BrandCenter/NewsCenter/NewsDetail'
import ActivityCenter from './routers/BrandCenter/ActivityCenter'
import ActivityDetail from './routers/BrandCenter/ActivityCenter/ActivityDetail'
import FansInteraction from './routers/BrandCenter/FansInteraction'
import WonderfulArticle from './routers/BrandCenter/FansInteraction/WonderfulArticle'
import ArticleDetail from './routers/BrandCenter/FansInteraction/ArticleDetail'
import PersonalDetail from './routers/BrandCenter/FansInteraction/PersonalDetail'
import PostsDetail from './routers/BrandCenter/FansInteraction/PostsDetail'
import VideoZone from './routers/BrandCenter/FansInteraction/VideoZone'
import PersonalCenter from './routers/PersonalCenter'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
// 购车支持 组
// 数字展厅
import CarDigiRoom from './routers/carSellHelp/CarDigiRoom'
import digiAvalon from './routers/carSellHelp/CarDigiRoom/digiAvalon'
import digiCorolla from './routers/carSellHelp/CarDigiRoom/digiCorolla'
import digiIzoa from './routers/carSellHelp/CarDigiRoom/digiIzoa'
// /buycar/cartype/detail/avalon
// 品牌车型
import CarBrandModels from './routers/carSellHelp/carBrandModels'
// import CarBrandModels from './routers/buycar/cartype/detail'
// 品牌车型详情
import CarDetails from './routers/carSellHelp/carBrandModels/carDetails'
// 下载中心
import DownloadCenter from './routers/carSellHelp/downloadCenter'
// 纯正用品
import GenuineProduct from './routers/carSellHelp/genuineProduct'
// 金融服务
import FinancialService from './routers/carSellHelp/financialService'
// 融资租赁
import FinanceLease from './routers/carSellHelp/financeLease'
// 新车保险
import NewCarInsurance from './routers/carSellHelp/newCarInsurance'
// 预约试驾
import AppointmentDrive from './routers/carSellHelp/appointmentDrive/appointmentDrive.jsx'
// 车型对比
import VsCarPage from './routers/carSellHelp/vsCarPage'
// 经销商查询
import DealerInquiry from './routers/DealerInquiry'
// 社会责任
import SocialResponsibility from './routers/BrandCenter/SocialResponsibility'
// 全局搜索
import Search from './routers/Search'
import PureRAV4 from './routers/carSellHelp/PureRAV4'
import moment from 'moment';
import 'moment/locale/zh-cn'
//活动
import children from './routers/Activity/Children'

moment.locale('zh-cn');
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f=>f
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))


ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        {/* AuthRouter用来过滤需要登录的页面，可以在里边判断某些字符开头的path，如果是这些path，并且未登录就重定向到登录页面 */}
        {/* <AuthRouter></AuthRouter> */}
        <Switch>
          <LocaleProvider locale={zhCN}>
            <App>
              <Route exact path='/' component={Home} />
              {/* 车主专享 */}
              <Route path='/ownervip/serintroduce' component={SerIntroduce}/>
              <Route path='/ownervip/serverhall' component={ServerHall} />
              <Route path='/ownervip/purebrand' component={PureBrand}/>
              <Route path='/ownervip/fengxianghui' component={Fengxianghui}/>
              <Route path='/ownervip/capacitynet' component={CapacityNet}/>
              <Route exact path='/ownervip/nativetour' component={NativeTour}/>
              <Route exact path='/ownervip/thanksteacher' component={ThanksTeacher}/>
              <Route exact path='/ownervip/CircleTran' component={CircleTran}/>
              {/* 底部导航 */}
              <Route exact path='/footernav/dealerrecruit' component={DealerRecruit}/>
              <Route exact path='/footernav/sitemap' component={SiteMap}/>
              <Route exact path='/footernav/sitepolicy' component={SitePolicy}/>
              <Route path='/footernav/tendernotice' component={TenderNotice}/>
              {/* 登录、注册 */}
              <Route exact path='/login' component={Login}/>
              {/* 品牌中心 */}
              <Route exact path='/brandcenter/enterprisebrand' component={EnterpriseBrand}/>
              <Route exact path='/brandcenter/enterpriseintroduce' component={EnterpriseIntroduce}/>
              <Route exact path='/brandcenter/newscenter' component={NewsCenter}/>
              <Route exact path='/brandcenter/newscenter/newsdetail' component={NewsDetail}/>
              <Route exact path='/brandcenter/activitycenter' component={ActivityCenter}/>
              <Route exact path='/brandcenter/activitycenter/activitydetail' component={ActivityDetail}/>
              <Route exact path='/brandcenter/fansinteraction' component={FansInteraction}/>
              <Route exact path='/brandcenter/fansinteraction/wonderfularticle' component={WonderfulArticle}/>
              <Route exact path='/brandcenter/fansinteraction/articledetail' component={ArticleDetail}/>
              <Route exact path='/brandcenter/fansinteraction/personaldetail' component={PersonalDetail}/>
              <Route exact path='/brandcenter/fansinteraction/postsdetail' component={PostsDetail}/>
              <Route exact path='/brandcenter/fansinteraction/videozone' component={VideoZone}/>
              {/* 个人中心 */}
              <Route path='/personcenter' component={PersonalCenter}/>
              <Route exact path='/carSellHelp/CarDigiRoom' component={CarDigiRoom}/>
              <Route exact path='/carSellHelp/digiAvalon' component={digiAvalon}/>
              <Route exact path='/carSellHelp/digiCorolla' component={digiCorolla}/>
              <Route exact path='/carSellHelp/digiIzoa' component={digiIzoa}/>
              {/* 活动 */}
              <Route exact path='/activity/children' component={children}/>
              {/* 购车支持 组 */}
              <Route exact path='/carSellHelp/carBrandModels' component={CarBrandModels}/>
              <Route exact path='/buycar/cartype/detail/:carAlias' component={CarDetails}/>
              <Route exact path='/carSellHelp/downloadCenter' component={DownloadCenter}/>
              <Route exact path='/carSellHelp/genuineProduct' component={GenuineProduct}/>
              <Route exact path='/carSellHelp/financialService' component={FinancialService}/>
              <Route exact path='/carSellHelp/financeLease' component={FinanceLease}/>
              {/* 新车保险 */}
              <Route path='/carSellHelp/newCarInsurance' component={NewCarInsurance}/>
              <Route exact path='/carSellHelp/appointmentDrive' component={AppointmentDrive}/>
              <Route exact path='/carSellHelp/vsCarPage' component={VsCarPage}/>
              {/* 经销商查询 */}
              <Route exact path='/dealerinquiry' component={DealerInquiry}/>
              {/* 社会责任 */}
              <Route exact path='/brandcenter/socialResponsibility' component={SocialResponsibility}/>
              {/* 全局搜索 */}
              <Route exact path='/search' component={Search}/>
              {/* 纯正用品外装精品 */}
              <Route exact path='/carSellHelp/PureRAV4' component={PureRAV4}/>
            </App>
          </LocaleProvider>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),

  document.getElementById('root'))
