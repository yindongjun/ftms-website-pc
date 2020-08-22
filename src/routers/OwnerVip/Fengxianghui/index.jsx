import React from 'react'
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom'
import Queity from '../../../components/OwnerVip/Fxh/Queity';
import Life from '../../../components/OwnerVip/Fxh/Life';
import './index.less'

class Fengxianghui extends React.Component {
  render() {
    const {match} = this.props
    return (
        <div className='handlefhx'>
          <div className='fxh-header'>
            <img src={require('../../../assets/img/fxh/banner.png')} alt="" />
          </div>
        
            <div>
              <ul className='NavList'>
                <NavLink to={`${match.url}/queity`} activeClassName="selected">
                  <li>丰·权益</li>
                </NavLink>
                <NavLink to={`${match.url}/life`} activeClassName="selected">
                  <li>汇·生活</li>
                </NavLink>
              </ul>
              <div className='serverhallContent'>
                <Switch>
                  <Route exact path={`${match.url}/queity`} component={Queity} />
                  <Route exact path={`${match.url}/life`} component={Life} />
                </Switch>
              </div>
            </div>
         
        </div>
    )
  }
}

export default Fengxianghui