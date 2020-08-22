import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { getUserInfo } from './redux/user.redux'
import Header from './components/Common/Header'
import Footer from './components/Common/Footer'
import Sidebar from './components/Common/Sidebar'
import './app.less'

// @connect(
//   state => state,
//   { getUserInfo }
// )
class App extends Component {
  componentDidMount() {
      // this.props.getUserInfo()
  }
  render() {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const token = userInfo && userInfo.accessToken
      // const {token} = this.props.user
      // console.log('==========token')
      // console.log(token)
    return (
      <div className="App">
        <Header/>
        {this.props.children}
        <Sidebar/>
        <Footer/>
      </div>
    );
  }
}

export default App;
