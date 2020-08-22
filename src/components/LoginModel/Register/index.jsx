import React, { Component } from 'react'
import {Checkbox, message, Modal} from 'antd'
import './index.less'
import {loginApi} from "../../../services/api";

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ifChecked: true,
            ifCanSend: false,
            isShowSendBtn: true,
            seconds: 60,
            imgData: '', // 图片验证码
            imgCodeKey: '', //获取图片验证接口返回的codeKey
            imgVerificationCode: '',  // 图片验证码内容
            loginName: '',
            mobile: '',
            mobileVerificationCode: '', // 手机短信验证码
            password: '', // 密码
            surePassword: '', // 确认密码
            yinsizhengceShow: false,

        }
        this.yinsizhengceShowOrNot = this.yinsizhengceShowOrNot.bind(this)
    }
    componentDidMount() {
        this.getImageCode() // 初始化图片验证码
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    interval = null
    // 输入框值改变
    handleRegisterChange = (e) => {
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
    // 隐私政策弹窗开关
    yinsizhengceShowOrNot() {
        this.setState ( (pre, props) => {
            return {
                yinsizhengceShow: !pre.yinsizhengceShow
            }
        })
    }
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
    sendRegisterCode() {
        if(!this.state.isShowSendBtn) {
            return
        }
        const params = {
            mobile: this.state.mobile,
            sendCodeType: 'register'
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
    onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        this.setState({
            ifChecked: e.target.checked
        });
    }
    // 注册
    register() {
        const params = {
            imgCodeKey: this.state.imgCodeKey,
            imgVerificationCode: this.state.imgVerificationCode,
            loginName: this.state.loginName,
            mobile: this.state.mobile,
            mobileVerificationCode: this.state.mobileVerificationCode,
            password: this.state.password,
            surePassword: this.state.surePassword,
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
        if(!params.loginName) {
            message.warning('请输入用户名')
            return
        }
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
        if(!this.state.ifChecked) {
            message.warning('请勾选注册协议！')
            return
        }
        loginApi.register(params).then(res => {
            if (res && res.code === '0') {
                localStorage.setItem('userInfo',JSON.stringify(res.data))
                window.location.href = '/personcenter/home'
            }
        })
    }

    render() {
        const { imgData, isShowSendBtn, seconds, ifCanSend, ifChecked } = this.state;
        return (
            <div className='RegisterBox'>
                <h2>注册</h2>
                <div className='mobileBox'>
                    <span></span>
                    <input
                        name="mobile"
                        type="text"
                        onChange={this.handleRegisterChange}
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
                        onChange={this.handleRegisterChange}
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
                            onChange={this.handleRegisterChange}
                            placeholder="请输入手机验证码"
                        />
                    </div>
                    <i onClick={() => this.sendRegisterCode()} aria-disabled={isShowSendBtn} className={ifCanSend ? 'canSendBtn' : `sendBtn`}>
                        {isShowSendBtn ? '获取验证码' : `${seconds}s后获取`}
                    </i>
                </div>
                <div className='UserNameBox'>
                    <span></span>
                    <input
                        name="loginName"
                        type="text"
                        onChange={this.handleRegisterChange}
                        placeholder="请输入用户名"
                    />
                </div>
                <div className='settingPwdBox'>
                    <span></span>
                    <input
                        name="password"
                        type="password"
                        onChange={this.handleRegisterChange}
                        placeholder="请设置您的密码"
                    />
                </div>
                <div className='ConfirmPwdBox'>
                    <span></span>
                    <input
                        name="surePassword"
                        type="password"
                        onChange={this.handleRegisterChange}
                        placeholder="请再次确认密码"
                    />
                </div>
                <p className='userProtocol'>
                    <Checkbox onChange={this.onChange} checked={ifChecked}></Checkbox>
                    <span className='ProtocolBtn'>我已阅读并同意<button onClick = {this.yinsizhengceShowOrNot.bind(this)}>《一汽丰田用户注册协议》</button></span>
                </p>
                <span className='register-btn' onClick={() => this.register()}>注册</span>
                <span className='login-warning'>已有账号，请<a onClick={()=>this.props.handleLogin('LOGIN')}>登录</a></span>
                <Modal
                    className = 'yinsizhengce'
                    title="一汽丰田用户注册协议"
                    visible={this.state.yinsizhengceShow}
                    onCancel={this.yinsizhengceShowOrNot}
                    footer = {null}
                >
                    <div className="agreement-text">
                        <h5>一汽丰田顾客个人信息保护基本方针</h5>
                        <p>一汽丰田汽车销售有限公司(以下简称“一汽丰田销售”)、一汽丰田销售认定的经销商（以下简称 “一汽丰田经销商”）及其各自的关联公司（包括但不限于其各自的母公司、车辆的制造公司及丰田汽车（中国）投资有限公司）（以下将“一汽丰田销售”、“一汽丰田经销商”及其各自的关联公司统称为“一汽丰田”）认为严格遵守个人信息保护相关的中国法律法规，妥善处理顾客个人姓名、地址、电话号码、邮箱地址等 能够识别顾客个人及其家庭成员身份的信息（以下简称“个人信息”），是企业重要的社会责任。基于此，“一汽丰田”制定了如下的保护个人信息基本方针。</p>

                        <h5>1.个人信息的取得</h5>
                        <p style = {{color: 'rgb(211, 176, 120)'}}>1)“一汽丰田”于以下情形取得个人信息：</p>
                        <p>① 销售产品、提供服务时取得的个人信息；</p>
                        <p>② 为了提供问询对应等取得的个人信息（包括使用来电显示取得的联系方式）；</p>
                        <p>③ 实施各项调查（包括“一汽丰田”委托外部公司实施的）时取得的个人信息；</p>
                        <p>④ “一汽丰田”取得的其他个人信息。</p>
                        <p style = {{color: 'rgb(211, 176, 120)'}}>2)“一汽丰田”将在取得顾客的同意后，取得其个人信息。</p>

                        <h5>2.个人信息的处理</h5>
                        <p style = {{color: 'rgb(211, 176, 120)'}}>1）关于个人信息的使用</p>
                        <p>“一汽丰田”根据前述第1.条规定取得的个人信息，将仅在“一汽丰田”内部根据需要进行共享，并且仅为以下目的或其他合法、正当的目的使用：</p>
                        <p>① 与顾客进行的交易；</p>
                        <p>② 商品及服务的企划、开发、改善；</p>
                        <p>③ 发送与“一汽丰田”的产品、服务、宣传活动（包括但不限于汽车、保险等）相关的信息或通知；</p>
                        <p>（但在未取得顾客同意的情况下，我们不会发送商业性目的的上述信息或通知）</p>
                        <p>④ 在产品企划、开发或提高服务质量及顾客满意度等方面，实施的各项调查；</p>
                        <p>⑤ 顾客问询、联系“一汽丰田经销商”及丰田顾客服务中心时，进行迅速的对应；</p>
                        <p>⑥ 根据法律规定或政府机关、法院、调解机构、仲裁机构等的通知、指导等而采取的对应；</p>
                        <p>⑦ 其他取得个人信息时所明示的使用目的。</p>
                        <p style = {{color: 'rgb(211, 176, 120)'}}>2）向第三方提供个人信息</p>
                        <p>“一汽丰田”根据前述第1.条规定取得的个人信息，在未取得顾客同意的情况下，不会向第三方提供或出售。但是，为了实现上述使用目的，在必要的范围内，会提供给业务受托方。于此情形下，“一汽丰田”会要求业务受托方妥当处理“一汽丰田”所提供的个人信息，并进行妥善管理。</p>
                        <p style = {{color: 'rgb(211, 176, 120)'}}>3）妥善管理个人信息</p>
                        <p>为了对个人信息严格保密，防止不正当接触个人信息，防止个人信息丢失、损坏、被篡改、泄露等，“一汽丰田”采取了妥善的安全措施，并且将在因前述事由导致事故后采取救济措施。</p>

                        <h5>3.问询等</h5>
                        <p>关于个人信息的相关问询，请就近联系“一汽丰田经销商”或“一汽丰田顾客服务中心”。“一汽丰田”将严格遵守个人信息保护相关的中国法律法规，进行妥善处理。</p>
                        <p>·关于就近的“一汽丰田经销商”</p>
                        <p>【http://www.ftms.com.cn/dealerinquiry】</p>
                        <p>·“一汽丰田顾客服务中心”</p>
                        <p>【电话：800-810-1210，400-810-1210】</p>

                        <h5>4.遵纪守法与改善</h5>
                        <p>“一汽丰田”将严格遵守个人信息保护相关的中国法律法规，并为了妥善处理个人信息而进行持续性的改善，并会将改善内容随时体现在本基本方针中。</p>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Login