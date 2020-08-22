import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NoticeDetail from './NoticeDetail';
import NoticeList from './NoticeList'
import './index.less'

class TenderNotice extends Component {
  render() {
    const {match} = this.props
    return (
        <div className='handleTenderNotice'>
        <div className='headerPic'>
              <span>
                <h1>供应商招募公告</h1>
                <i></i>
              </span>
            </div>
          {/* <img src={require('../../../assets/img/footerlink/notice.png')} alt="" /> */}
          <BrowserRouter>
              <Switch>
                <Route exact path={`${match.url}`} component={NoticeList} />
                <Route exact path={`${match.url}/detail`} component={NoticeDetail} />
              </Switch>
            </BrowserRouter>
        </div>
    )
  }
}

export default TenderNotice