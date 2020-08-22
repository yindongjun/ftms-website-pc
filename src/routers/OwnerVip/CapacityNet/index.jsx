import React, { Component } from 'react'
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom'
import CorollaNet from '../../../components/OwnerVip/CapacityNet/CorollaNet'
import Telematics from '../../../components/OwnerVip/CapacityNet/Telematics';
import PhoneInternet from '../../../components/OwnerVip/CapacityNet/PhoneInternet';
import './index.less'

class CapacityNet extends Component {
  render() {
    const {match} = this.props
    return (
      <div className='handleHiConnect'>
        <div className='topBanner'>
          <img className="headImg" src={require('../../../assets/img/hiconnect/notitbanner.png')} alt="" />
          <span className='tit'>智能互联</span>
          <i className='underLine'></i>
        </div>
        <BrowserRouter>
          <div>
            <ul className='NavList'>
              {/* <NavLink to={`${match.url}/telematics`} activeClassName="selected">
                <li>车联网</li>
              </NavLink> */}
              <NavLink to={`${match.url}/corollanet`} activeClassName="selected">
                <li>卡罗拉互联</li>
              </NavLink>
              <NavLink to={`${match.url}/phoneInternet`} activeClassName="selected">
                <li>手机互联</li>
              </NavLink>
            </ul>
            <div className='serverhallContent'>
              <Switch>
                <Route exact path={`${match.url}/telematics`} component={Telematics} />
                <Route exact path={`${match.url}/corollanet`} component={CorollaNet} />
                <Route exact path={`${match.url}/phoneInternet`} component={PhoneInternet} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default CapacityNet
