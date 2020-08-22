import React, { Component } from 'react'
import Login from '../../components/LoginModel/Login'
import Register from '../../components/LoginModel/Register'
import ForgetPwd from '../../components/LoginModel/ForgetPwd'
import './index.less'

class LoginModel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowLogin: 'LOGIN'
    }
  }

  handleLogin(log) {
    this.setState({
      isShowLogin: log
    })
  }

  render() {
    const { isShowLogin } = this.state
    let currentshowpage;
    if (isShowLogin === 'LOGIN') {
      currentshowpage = <Login handleLogin={(log) => this.handleLogin(log)} />
    } else if (isShowLogin === 'REGISTER') {
      currentshowpage = <Register handleLogin={(log) => this.handleLogin(log)} />
    } else if (isShowLogin === 'FORGETPWD') {
      currentshowpage = <ForgetPwd handleLogin={(log) => this.handleLogin(log)} />
    }

    return (
      <div className='handleLoginModel'>
          <div className="handleLogin">
            {
              currentshowpage
            }
          </div>
      </div>
    )
  }
}
export default LoginModel