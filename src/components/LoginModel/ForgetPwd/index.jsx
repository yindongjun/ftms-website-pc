import React, { Component, Fragment } from 'react'
import {loginApi} from "../../../services/api";
import './index.less'
import {message} from "antd";

class ForgetPwd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 'FORGET',
      ifCanSend: false,
      isShowSendBtn: true,
      seconds: 60,
      imgData: '', // 图片验证码
      imgCodeKey: '', //获取图片验证接口返回的codeKey
      imgVerificationCode: '',  // 图片验证码内容
      mobile: '',
      mobileVerificationCode: '', // 手机短信验证码
      password: '', // 密码
      surePassword: '' // 确认密码
    }
  }
  componentDidMount() {
    this.getImageCode() // 初始化图片验证码
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  interval = null;
  jumpNextStep(go) {
    this.setState({
      step: go
    })
  }
  // 输入框值改变
  handleForgetChange = (e) => {
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
  sendForgetCode() {
    if(!this.state.isShowSendBtn) {
      return
    }
    const params = {
      mobile: this.state.mobile,
      sendCodeType: 'findPassword'
    };
    loginApi.sendMobileCode(params).then(res => {
      if (res && res.code === '0') {
        message.success('验证码发送成功')
        this.setState({
          isShowSendBtn:false
        });
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
  // 忘记密码参数校验接口
  findPasswordCheck() {
    const params = {
      imgCodeKey: this.state.imgCodeKey,
      imgVerificationCode: this.state.imgVerificationCode,
      mobile: this.state.mobile,
      mobileVerificationCode: this.state.mobileVerificationCode,
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
    loginApi.findPasswordCheck(params).then(res => {
      if (res && res.code === '0') {
        this.jumpNextStep('NEXTSTEP')
      }
    })
  }
  // 忘记密码
  findPassword() {
    const params = {
      imgCodeKey: this.state.imgCodeKey,
      imgVerificationCode: this.state.imgVerificationCode,
      mobile: this.state.mobile,
      mobileVerificationCode: this.state.mobileVerificationCode,
      password: this.state.password,
      surePassword: this.state.surePassword,
    };
    if(!params.password) {
      message.warning('请设置密码')
      return
    }
    let PWD = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
    if(!PWD.test(params.password)) {
      message.warning('您输入的密码格式有误，请输入6-20位数字和字母组合！');
      return
    }
    if(!params.surePassword) {
      message.warning('请确认密码')
      return
    }
    if(params.password !== params.surePassword) {
      message.warning('两次密码输入不一致')
      return
    }
    loginApi.findPassword(params).then(res => {
      if (res && res.code === '0') {
        this.jumpNextStep('GOLOGIN')
      }
    })
  }

  render() {
    const { step, imgData, isShowSendBtn, ifCanSend, seconds, password, surePassword } = this.state
    return (
        <div className='forgetPwdBox'>
          <h2>忘记密码</h2>
          {
            step === 'FORGET' ?
                <Fragment>
                  <div className='mobileBox'>
                    <span></span>
                    <input
                        name="mobile"
                        type="text"
                        onChange={this.handleForgetChange}
                        placeholder="请输入手机号"
                        maxLength={11}
                    />
                  </div>
                  <div className='ImgCodeBox'>
                    <span></span>
                    <input
                        onBlur={this.checkImageCode}
                        name="imgVerificationCode"
                        type="text"
                        onChange={this.handleForgetChange}
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
                          onChange={this.handleForgetChange}
                          placeholder="请输入手机验证码"
                      />
                    </div>
                    <i onClick={() => this.sendForgetCode()} aria-disabled={isShowSendBtn} className={ifCanSend ? 'canSendBtn' : `sendBtn`}>
                      {isShowSendBtn ? '获取验证码' : `${seconds}s后获取`}
                    </i>
                  </div>
                  <span className='nextstep' onClick={() => this.findPasswordCheck()}>下一步</span>
                </Fragment>
                :
                step === 'NEXTSTEP' ?
                    <Fragment>
                      <div className='settingPwdBox'>
                        <span></span>
                        <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={this.handleForgetChange}
                            placeholder="请设置您的密码"
                        />
                      </div>
                      <div className='ConfirmPwdBox'>
                        <span></span>
                        <input
                            name="surePassword"
                            type="password"
                            value={surePassword}
                            onChange={this.handleForgetChange}
                            placeholder="请再次确认密码"
                        />
                      </div>
                      <span className='submitbtn' onClick={() => this.findPassword()}>提交</span>
                    </Fragment>
                    :
                    step === 'GOLOGIN' ?
                        <Fragment>
                          <img src={require('../../../assets/img/officislSite/success_03.png')} alt=""/>
                          <h3>重设密码成功</h3>
                          <span className='nextstep' onClick={()=>this.props.handleLogin('LOGIN')}>去登录</span>
                        </Fragment>
                        :
                        null
          }
        </div>
    )
  }
}

export default ForgetPwd