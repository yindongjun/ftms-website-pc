import React, { Component } from 'react'
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom'
import BrandInsurance from '../../../components/NewCarInsurance/BrandInsurance'
import InsuranceComputer from '../../../components/NewCarInsurance/InsuranceComputer'
import './index.less'

class newCarInsurance extends Component {
  render() {
    const {match} = this.props
    return (
      <div className='handlenewCarInsurance'>
        <div className='newCarInsurance-header'>
          <img src={require('../../../assets/img/carSellHelp/newCarInsurance/banner.png')} alt="" />
        </div>
        <div className = 'logo'></div>
        <p className = 'text'>新车保险</p>
        <span className = 'text_line'></span>
        <BrowserRouter>
          <div>
            <ul className='NavList'>
              <NavLink to={`${match.url}/brandinsurance`} activeClassName="selected">
                <li>AAA品牌保险</li>
              </NavLink>
              <NavLink to={`${match.url}/insurancecomputer`} activeClassName="selected">
                <li>保险计算器</li>
              </NavLink>
            </ul>
            <div className='serverhallContent'>
              <Switch>
                <Route exact path={`${match.url}/brandinsurance`} component={BrandInsurance} />
                <Route exact path={`${match.url}/insurancecomputer`} component={InsuranceComputer} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default newCarInsurance