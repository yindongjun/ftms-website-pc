import React, { Component } from 'react'
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom'
import HonestServer from '../../../components/OwnerVip/SerIntroduce/HonestServer'
import ServerProduce from '../../../components/OwnerVip/SerIntroduce/ServerProduce';
import GuarRepPolicy from '../../../components/OwnerVip/SerIntroduce/GuarRepPolicy';
import ServerActivity from '../../../components/OwnerVip/SerIntroduce/ServerActivity';
import AroundMag from '../../../components/OwnerVip/SerIntroduce/AroundMag'
import LikeCourse from '../../../components/OwnerVip/SerIntroduce/LikeCourse'
import './index.less'

class SerIntroduce extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const {match} = this.props
    return (
      <div className='handleServerIntroduce'>
        {/* 服务介绍 */}
        <div className='ServerIntroduce'>
          <img className="headImg" src={require('../../../assets/img/serviceIntroduce/banner.jpg')} alt="" />
          <p className = 'text'>服务介绍</p>
          <span className = 'bottomLine'></span>
          <BrowserRouter>
            <div>
              <ul className='NavList'>
                <NavLink to={`${match.url}/honestserver`} activeClassName="selected">
                  <li>诚信服务</li>
                </NavLink>
                <NavLink to={`${match.url}/serverproduce`} activeClassName="selected">
                  <li>服务产品</li>
                </NavLink>
                <NavLink to={`${match.url}/serveractivity`} activeClassName="selected">
                  <li>服务活动</li>
                </NavLink>
                <NavLink to={`${match.url}/guarpolicy`} activeClassName="selected">
                  <li>保修政策</li>
                </NavLink>
                <NavLink to={`${match.url}/stafysurvey`} activeClassName="selected">
                  <li>满意度调查</li>
                </NavLink>
              </ul>
              <div className='serverIntrContent'>
                <Switch>
                  <Route exact path={`${match.url}/honestserver`} component={HonestServer} />
                  <Route exact path={`${match.url}/serverproduce`} component={ServerProduce} />
                  <Route exact path={`${match.url}/serveractivity`} component={ServerActivity} />
                  <Route exact path={`${match.url}/guarpolicy`} component={GuarRepPolicy} />
                  <Route exact path={`${match.url}/stafysurvey`}>
                    <img style={{ width: '14rem', marginTop: '.8rem' }} src={require('../../../assets/img/serviceIntroduce/stafy.jpeg')} alt="" />
                  </Route>
                  <Route exact path={`${match.url}/serveractivity/aroundmag`} component={AroundMag} />
                  <Route exact path={`${match.url}/serveractivity/likecarcourse`} component={LikeCourse} />
                </Switch>
              </div>
            </div>
          </BrowserRouter>
        </div>
      </div>
    )
  }
}

export default SerIntroduce