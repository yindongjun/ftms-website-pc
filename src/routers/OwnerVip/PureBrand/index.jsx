import React, { Component } from 'react'
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom'
import Quality from '../../../components/OwnerVip/Purebrand/Quality';
import GoodsShow from '../../../components/OwnerVip/Purebrand/GoodsShow';
import FalseCheck from '../../../components/OwnerVip/Purebrand/FalseCheck';
import UpKeepPlan from '../../../components/OwnerVip/Purebrand/UpKeepPlan';
import GoodsDetail from '../../../components/OwnerVip/Purebrand/GoodsDetail';
import Part from '../../../components/OwnerVip/Purebrand/Part';
import './index.less'
class PureBrand extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    const { match } = this.props
    return (
      <div className="handlePureBrand">
        {/* 纯牌零件 */}
        <div className="PureBrand">
          <div className='topBanner'>
            <img className="headImg" src={require('../../../assets/img/purebrand/banner.png')} alt="" />
            <span className='tit'>纯牌零件</span>
            <i className='underLine'></i>
          </div>
          <BrowserRouter>
            <div>
              <ul className='NavList'>
                <NavLink to={`${match.url}/quality`} activeClassName="selected">
                  <li>品质保障</li>
                </NavLink>
                <NavLink to={`${match.url}/goodsshow`} activeClassName="selected">
                  <li>产品介绍</li>
                </NavLink>
                <NavLink to={`${match.url}/falsecheck`} activeClassName="selected">
                  <li>防伪查询</li>
                </NavLink>
                {/* <NavLink to={`${match.url}/part`} activeClassName="selected">
                  <li>零件溯源</li>
                </NavLink> */}
                <NavLink to={`${match.url}/upkeep`} activeClassName="selected">
                  <li>保养计划</li>
                </NavLink>
              </ul>
              <div className='serverhallContent'>
                <Switch>
                  <Route exact path={`${match.url}/quality`} component={Quality} />
                  <Route exact path={`${match.url}/goodsshow`} component={GoodsShow} />
                  <Route exact path={`${match.url}/falsecheck`} component={FalseCheck} />
                  {/* <Route exact path={`${match.url}/part`} component={Part} /> */}
                  <Route exact path={`${match.url}/upkeep`} component={UpKeepPlan} />
                  <Route exact path={`${match.url}/goodsshow/detail`} component={GoodsDetail} />
                </Switch>
              </div>
            </div>
          </BrowserRouter>
        </div>
      </div>
    )
  }
}

export default PureBrand
