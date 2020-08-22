import React, { Component } from 'react'
import { Tabs, message } from 'antd';
import {connect} from 'react-redux'
import {loginApi} from "../../../services/api";
import './index.less'
import { setUserInfo } from '../../../redux/user.redux';
import {querryStringToObject} from "../../../utils/util";
import { Popover } from 'antd-mobile'
@connect(
    state => state,
    {setUserInfo}
)

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ifCanSend: false,
      isShowSendBtn: true,
      seconds: 60,
      imgData: '', // 图片验证码
      // 快捷登录
      imgCodeKey: '', //获取图片验证接口返回的codeKey
      mobileVerificationCode: '', // 手机短信验证码
      mobile1: '',
      imgVerificationCode: '', // 图片验证码内容
      // 账号登录
      mobile2: '',
      password: '',
      key1: 'block',
      key2: 'none'
    }
  }
  componentDidMount() {
    this.getImageCode(); // 初始化图片验证码
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  interval = null
  // 输入框值改变
  handleLoginChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    })
    if (name === 'imgVerificationCode') {
      if (value.length === 4) {
      } else {
        this.setState({
          ifCanSend: false,
        })
      }
    }
  };
  // 点击登录 type'1'快捷登录 type'2'账号登录
  handleLoginButton = (type) => {
    console.log(type);
    // href='/personcenter/home'
    if(type === '1') {
      this.mobileLogin()
    } else {
      this.userNameLogin()
    }
  };
  // 验证图形验证码
  checkImageCode = (e) => {
    const params = {
      signCode: this.state.imgVerificationCode,
      codeKey: this.state.imgCodeKey
    };
    loginApi.checkImageCode(params).then(res => {
      if (res && res.code === '0') {
        this.setState({
          ifCanSend: true,
        })
      } else {
        this.setState({
          ifCanSend: false,
        })
      }
    })
  };
  // 点击更换图片验证码
  imageCodeChange  = (e) => {
    this.getImageCode()
  };
  // 更换图片验证码
  getImageCode() {
    loginApi.getImageCode().then(res => {
      if (res && res.code === '0') {
        this.setState({
          imgData: res.data.imgData,
          imgCodeKey:res.data.codeKey
        })
      }
    })
  }
  // 发送验证码
  sendLoginCode() {
    if(!this.state.isShowSendBtn) {
      return
    }
    const params = {
      mobile: this.state.mobile1,
      sendCodeType: 'login'
    };
    loginApi.sendMobileCode(params).then(res => {
      if (res && res.code === '0') {
        message.success('验证码发送成功')
        this.setState({
          isShowSendBtn:false
        })
        this.interval = setInterval(() => this.tick(), 1000)
      }
    })
  }
  // 发送验证码倒计时
  tick() {
    if(this.state.seconds <= 1) {
      this.setState({
        seconds: 60,
        isShowSendBtn: true
      });
      clearInterval(this.interval);
      return
    }
    this.setState((prevState) => ({
      seconds: prevState.seconds - 1
    }));
  }
  // 快捷登录
  mobileLogin() {
    const params = {
      mobile: this.state.mobile1,
      mobileVerificationCode: this.state.mobileVerificationCode,
      imgCodeKey: this.state.imgCodeKey,
      imgVerificationCode: this.state.imgVerificationCode,
    };
    if(!params.mobile) {
      message.warning('请输入手机号')
      return
    }
    let TEL = /^((13[0-9])|(17[0-9])|(15[^4,\D])|(18[0-9])|(166)|(198)|(199)|(14[57]))\d{8}$/
    if(!TEL.test(params.mobile)) {
      message.warning('您输入的手机号有误，请输入正确的手机号');
      return
    }
    if(!params.imgVerificationCode) {
      message.warning('请输入图片验证码')
      return
    }
    if(!params.mobileVerificationCode) {
      message.warning('请输入手机验证码')
      return
    }
    loginApi.mobileLogin(params).then(res => {
      if (res && res.code === '0') {
        localStorage.setItem('userInfo',JSON.stringify(res.data))
        const loginJump = JSON.parse(localStorage.getItem('loginJump'))
        const url = loginJump && loginJump.url
        if(res.data.isUpdatePass == '0' || res.data.isUpdatePass == null) {
          window.location.href='/personcenter/modifypwd?sign=1';
        }else {
          if (url) {
            window.location.href = url
            localStorage.removeItem('loginJump')
          } else {
            window.history.go(-1);
            localStorage.removeItem('loginJump')
          }
        }
        
      }
    })
  }
  // 账号登录
  userNameLogin() {
    const params = {
      mobile: this.state.mobile2,
      password: this.state.password,
    };
    if(!params.mobile) {
      message.warning('请输入手机号')
      return
    }
    let TEL = /^((13[0-9])|(17[0-9])|(15[^4,\D])|(18[0-9])|(166)|(198)|(199)|(14[57]))\d{8}$/
    if(!TEL.test(params.mobile)) {
      message.warning('您输入的手机号有误，请输入正确的手机号');
      return
    }
    if(!params.password) {
      message.warning('请输入密码')
      return
    }
    loginApi.userNameLogin(params).then(res => {
      if (res && res.code === '0') {
        console.log(res.msg)
        localStorage.setItem('userInfo',JSON.stringify(res.data))
        const loginJump = JSON.parse(localStorage.getItem('loginJump'))
        const url = loginJump && loginJump.url
        if (url) {
          window.location.href = url
          localStorage.removeItem('loginJump')
        } else {
          window.history.go(-1);
          localStorage.removeItem('loginJump')
        }
      }
    })
  }
  render() {
    const TabPane = Tabs.TabPane;
    const { imgData, isShowSendBtn, seconds, ifCanSend } = this.state;
    let _this = this
    function TabsCheck (ev) {
      ev==="1" && showKey1()
      ev==="2" && showKey2()
    }
    function showKey1 () {
      console.log(11)
      _this.setState({
        key1: 'block',
        key2: 'none'
      })
    }
    function showKey2 () {
      console.log(22)
      _this.setState({
        key1: 'none',
        key2: 'block'
      })
    }
    return (
        <div className="LoginBox">
          <h2>登录</h2>
          <Tabs defaultActiveKey="1" type='card' onTabClick={TabsCheck}>
            <TabPane className="QuickLoginBox" tab="快捷登录" key="1"></TabPane>
            <TabPane className="AccountLoginBox" tab="账号登录" key="2"></TabPane>
          </Tabs>
          <div className="tabsBox">
            <div className="tabsBox1" style={{display: this.state.key1}}>
              <div className='mobileBox'>
                <span></span>
                <input
                    name="mobile1"
                    type="text"
                    onChange={this.handleLoginChange}
                    placeholder="请输入手机号码 / 丰潮世界账号"
                    maxLength={11}
                />
              </div>
              <div className='ImgCodeBox'>
                <span></span>
                <input
                    onBlur={this.checkImageCode}
                    name="imgVerificationCode"
                    type="text"
                    onChange={this.handleLoginChange}
                    placeholder="请输入图片验证码"
                    maxLength={4}
                />
                <i onClick={this.imageCodeChange}>
                  <img src={imgData} alt=""/>
                </i>
              </div>
              <div className='MobileCodeBox'>
                <div>
                  <span></span>
                  <input
                      name="mobileVerificationCode"
                      type="text"
                      onChange={this.handleLoginChange}
                      placeholder="请输入手机验证码"
                  />
                </div>
                <i onClick={() => this.sendLoginCode()} aria-disabled={isShowSendBtn} className={ifCanSend ? 'canSendBtn' : `sendBtn`}>
                  {isShowSendBtn ? '获取验证码' : `${seconds}s后获取`}
                </i>
              </div>
              <a className='login-btn' onClick={() => this.handleLoginButton('1')}>登录</a>
              <span className='register-warning'>如果您还没有账号，请<a onClick={()=>this.props.handleLogin('REGISTER')}>注册</a></span>
            </div>
            <div className="tabsBox2" style={{display: this.state.key2}}>
            <div className='mobileBox'>
              <span></span>
                <input
                    name="mobile2"
                    type="text"
                    onChange={this.handleLoginChange}
                    placeholder="请输入手机号"
                    maxLength={11}
                />
              </div>
              <div className='settingPwdBox'>
                <span></span>
                <input
                    type="password"
                    name="password"
                    onChange={this.handleLoginChange}
                    placeholder="请输入您的密码"
                />
              </div>
              <span className='forgetPwd' onClick={()=>this.props.handleLogin('FORGETPWD')}>忘记密码？</span>
              <span className='login-btn' onClick={() => this.handleLoginButton('2')}>登录</span>
              <span className='register-warning'>如果您还没有账号，请<a onClick={()=>this.props.handleLogin('REGISTER')}>注册</a></span>
            </div>
          </div>
          <div className="fc_footer">
              {/* <p></p> */}
              <p>
                <span>其他账号登录</span>
                <span><img src={require(`../../../assets/img/login/fc_icon1.png`)} /></span>
                <span><img src={require(`../../../assets/img/login/fc_icon2.png`)} /></span>
                <span><img src={require(`../../../assets/img/login/fc_icon3.png`)} /></span>
                <span><img src={require(`../../../assets/img/login/fc_icon4.png`)} /></span>
                {/* <span>
                  <Popover
                    overlayClassName ="fortest"
                    overlay={<img src={require(`../../../assets/img/login/foot-ewm-1.png`)} />}
                    placement='top'
                    align={{
                      overflow: { adjustY:0, adjustX:0},
                      offset: [-3, -8]
                    }}
                  >
                  <img src={require(`../../../assets/img/login/fc_icon3.png`)} />
                  </Popover>
                </span>
                <span>
                <Popover
                    overlayClassName ="fortest"
                    overlay={<img src={require(`../../../assets/img/login/app-ewm-footer.png`)} />}
                    placement='top'
                    align={{
                      overflow: { adjustY:0, adjustX:0},
                      offset: [-3, -8]
                    }}
                  >
                  <img src={require(`../../../assets/img/login/fc_icon4.png`)} />
                </Popover>
                </span> */}
                <span><img src={require(`../../../assets/img/login/fc_icon5.png`)} /></span>
              </p>
            </div>
        </div>
    )
  }
}
export default Login
