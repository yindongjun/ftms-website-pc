import React, { Component } from 'react'
import { NavLink, BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import UpKeepPlan from '../../../components/OwnerVip/Purebrand/UpKeepPlan'
import Emergency from '../../../components/OwnerVip/ServerHall/Emergency'
import AppointMaintain from '../../../components/OwnerVip/ServerHall/AppointMaintain'
import AppointFixed from '../../../components/OwnerVip/ServerHall/AppointFix'
import Violation from '../../../components/OwnerVip/ServerHall/Violation'
import './index.less'

class ServerHall extends Component {
  render() {
    const { match } = this.props
    console.log(this.props)
    return (
      <div className='handleServerHall'>
        <div className='topBanner'>
          <img className="headImg" src={require('../../../assets/img/serverhall/notitbanner.png')} alt="" />
          <span className='tit'>服务大厅</span>
          <i className='underLine'></i>
        </div>
        <BrowserRouter>
          <div>
            <ul className='NavList'>
              <NavLink to={`${match.url}/upkeepplan`} activeClassName="selected">
                <li>保养计划</li>
              </NavLink>
              <NavLink to={`${match.url}/appointmain`} activeClassName="selected">
                <li>预约保养</li>
              </NavLink>
              <NavLink to={`${match.url}/apponitfixed`} activeClassName="selected">
                <li>预约维修</li>
              </NavLink>
              <NavLink to={`${match.url}/violation`} activeClassName="selected">
                <li>违章查询</li>
              </NavLink>
              <NavLink to={`${match.url}/emergency`} activeClassName="selected">
                <li>紧急救援</li>
              </NavLink>
            </ul>
            <div className='serverhallContent'>
              <Switch>
                <Route exact path={`${match.url}/upkeepplan`} component={UpKeepPlan} />
                <Route exact path={`${match.url}/appointmain`} component={AppointMaintain} />
                <Route exact path={`${match.url}/apponitfixed`} component={AppointFixed} />
                <Route exact path={`${match.url}/violation`} component={Violation} />
                <Route exact path={`${match.url}/emergency`} component={Emergency} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}
export default withRouter((ServerHall))
