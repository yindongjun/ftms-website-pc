import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PersonalHome from '../../components/PersonalCenter/Home'
import AccountInfo from '../../components/PersonalCenter/AccountInfo'
import MyCredits from '../../components/PersonalCenter/MyCredits'
import AppointMain from '../../components/PersonalCenter/AppointMain'
import ChangeMobileNum from '../../components/PersonalCenter/ChangeMobileNum'
import OrderDetail from '../../components/PersonalCenter/OrderDetail'
import MyOrder from '../../components/PersonalCenter/MyOrder'
import ModifyPwd from '../../components/PersonalCenter/ModifyPwd'
import MyFooterPrint from '../../components/PersonalCenter/MyFooterPrint'
import MyCoupon from '../../components/PersonalCenter/MyCoupon'
import './index.less';

class PersonalCenter extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    const { match } = this.props;
    // console.log(this.props)
    return (
      <div className='handlepersonal_center'>
        <div className="personal_center">
          <div className='topBanner'>
            <img src={require('../../assets/img/personsenter/notitbanner.png')} alt='' />
            <span className='tit'>个人中心</span>
            <i className='underLine'></i>
          </div>
          <div className='personal_content'>
            <BrowserRouter>
              <Switch>
                <Route exact path={`${match.url}/home`} component={PersonalHome} />
                <Route path={`${match.url}/accountinfo`} component={AccountInfo} />
                <Route path={`${match.url}/credits`} component={MyCredits} />
                <Route path={`${match.url}/appointmain`} component={AppointMain} />
                <Route path={`${match.url}/changemobile`} component={ChangeMobileNum} />
                <Route path={`${match.url}/orderdetail`} component={OrderDetail} />
                <Route path={`${match.url}/myorder`} component={MyOrder} />
                <Route path={`${match.url}/modifypwd`} component={ModifyPwd} />
                <Route path={`${match.url}/myfooterprint`} component={MyFooterPrint} />
                <Route path={`${match.url}/mycoupon`} component={MyCoupon} />
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </div>
    )
  }
}
export default PersonalCenter
