import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'antd'
import {loginApi} from "../../../services/api";
import { personalInfo } from '../../../services/personalInfo'
import { message } from 'antd';
import './index.less'
//更换手机号
class ChangeMobileNum extends Component {
  constructor(props){
    super(props)
    this.state={
      visible: false,
      imgData: '', // 图片验证码
      imgCodeKey: '', //获取图片验证接口返回的codeKey
      // imgVerificationCode: '',  // 图片验证码内容
      oldtel:'',//原来的手机号
      oldnum:'',//短信验证码
      imgnum:'',//图片验证码字母
      newtel:'',//新手机号
      newnum:'',//新验证码
      isShowSendBtn:true,//验证码显示开关
      seconds:60,
      ifCanSend: false,
      isShowSendBtn1:true,//验证码显示开关
      seconds1:60,
      ifCanSend1: false,
    }
  }

  // 发送验证码
  sendLoginCode(x,y) {
    if(y=='changeMobileOld'){
      //旧手机号
      if(!this.state.isShowSendBtn) {
        return
      }
      const params = {
        mobile: x,
        sendCodeType: y
      };
      loginApi.sendMobileCode(params).then(res => {
        if (res && res.code === '0') {
          this.setState({
            isShowSendBtn:false
          })
          this.interval = setInterval(() => this.tick('old'), 1000)
        }
      })
    }else{
      if(!this.state.isShowSendBtn1) {
        return
      }
      const params = {
          mobile: x,
          sendCodeType: y
        };
      loginApi.sendMobileCode(params).then(res => {
        if (res && res.code === '0') {
          this.setState({
            isShowSendBtn1:false
          })
          this.interval1 = setInterval(() => this.tick('new'), 1000)
        }
      })
    }
    
    
  }

  // 发送验证码倒计时
  tick(x) {
    if(x=='old'){
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
    }else{
      if(this.state.seconds1 <= 1) {
        this.setState({
          seconds1: 60,
          isShowSendBtn1: true
        });
        clearInterval(this.interval1);
        return
      }
      this.setState((prevState) => ({
        seconds1: prevState.seconds1 - 1
      }));
    }
    
  }

  // 验证图形验证码
  checkImageCode = (e) => {
    let params = {
      signCode: this.state.imgnum,
      codeKey: this.state.imgCodeKey
    };
    loginApi.checkImageCode(params).then(res => {
      if (res && res.code === '0') {
        this.setState({
          ifCanSend1: true,
        })
      } else {
        this.setState({
          ifCanSend1: false,
        })
      }
    })
  };
  componentWillMount(){
    clearInterval(this.interval);
    clearInterval(this.interval1);
  }

  componentDidMount(){
    this.getImageCode();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const mobile = userInfo && userInfo.mobile
    this.setState({
      oldtel: mobile
    })
  }
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
  inputChange=(e)=>{
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    })
    if (name === 'imgnum') {
      if (value.length === 4) {
      } else {
        this.setState({
          ifCanSend1: false,
        })
      }
    }
  }

  showModal = () => {//点击立即更换
    if(this.state.oldtel==''){
      message.warning('请输入原手机号', 1)
    }else if(this.state.oldnum==''){
      message.warning('请输入验证码', 1)
    }else if(this.state.imgnum==''){
      message.warning('请输入图片验证码', 1)
    }else if(this.state.newtel==''){
      message.warning('请输入新手机号', 1)
    }else if(this.state.newnum==''){
      message.warning('请输入验证码', 1)
    }else{
      let data={
        imgCodeKey:this.state.imgCodeKey,
        imgVerificationCode:this.state.imgnum,
        mobile:this.state.newtel,
        mobileVerificationCode:this.state.newnum,
        oldMobile:this.state.oldtel,
        oldMobileVerificationCode:this.state.oldnum
      }
      personalInfo.updateMobile(data).then((res)=>{//提及信息
        if(res && res.code==='0'){
          this.setState({
            visible: true,
          });
        }
      })
    }
   
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  gotologin(){//重新登陆
    this.setState({
      visible: false,
    });
    const params = {
      url: '/personcenter/home'
  };
    window.location.href=`/login`;
    localStorage.setItem('loginJump',JSON.stringify(params))
  }

  render() {
    const {  oldtel,newtel,imgData,ifCanSend,isShowSendBtn,seconds,ifCanSend1,isShowSendBtn1,seconds1} = this.state
    return (
      <div className='handleChangeMobileNum'>
        <h2>更换手机号</h2>
        <Link to='/personcenter/home'>返回个人中心</Link>
        <div className='ChangeMobileBox'>
          <ul>
            <li>
              <label>原手机号码：</label>
              <input name="oldtel"
                     value={oldtel}
                     className='input-disabled'
                     disabled="disabled"
                    onChange={this.inputChange} 
                    type="tel" 
                    placeholder='请输入原手机号' 
                    maxLength="11" />
            </li>
            <li>
              <label>输入验证码：</label>
              <div>
                <input name="oldnum" 
                      onChange={this.inputChange} 
                      type="text" 
                      placeholder='请输入验证码' 
                      maxLength="6" />
                {/**<span>获取验证码</span>**/}
                <span onClick={() => this.sendLoginCode(oldtel,'changeMobileOld')}
                      aria-disabled={isShowSendBtn}
                  className='canSendBtn'>
                  {isShowSendBtn ? '获取验证码' : `${seconds}s后获取`}
                </span>
              </div>
            </li>
            <li>
              <label>新手机号码：</label>
              <input name="newtel"
                     onChange={this.inputChange}
                     type="tel"
                     placeholder='请输入新手机号码'
                     maxLength="11"/>
            </li>
            <li>
              <label>图片验证码：</label>
             <div>
                <input onBlur={this.checkImageCode}
                        name="imgnum" 
                        onChange={this.inputChange} 
                        type="text" 
                        placeholder='请输入验证码' 
                        maxLength="4"/>
                <span onClick={this.imageCodeChange}>
                  <img src={imgData} alt=""/>
                </span>
             </div>
            </li>
            <li>
              <label>输入验证码：</label>
              <div>
                <input name="newnum" 
                       onChange={this.inputChange} 
                       type="text" 
                       placeholder='请输入验证码' 
                       maxLength="6"/>
                <span onClick={() => this.sendLoginCode(newtel,'changeMobileNew')}
                      aria-disabled={isShowSendBtn1}
                  className={ifCanSend1 ? 'canSendBtn' : `sendBtn`}>
                  {isShowSendBtn1 ? '获取验证码' : `${seconds1}s后获取`}
                </span>
              </div>
            </li>
          </ul>
          <span className='changebtn' onClick={this.showModal}>立即更换</span>
        </div>
        <div className='warning'>
          <h3>操作提示：</h3>
          <div>
            <p>1、更换绑定手机，需要原手机号码，原手机号码无法接收短信，请拔打客服电话400-810-1210。</p>
            <p>2、手机更换后，同时更改会员的登录账号，更换后请牢记新手机号码。</p>
          </div>
        </div>
        <Modal
          title=""
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          centered={true}
          wrapClassName='chengeMobilebox'
          footer={null}
        >
          <img src={require('../../../assets/img/personsenter/success-icon.png')} alt=""/>
          <p>您的信息已保存</p>
          <span onClick={this.gotologin.bind(this)}>确定</span>
        </Modal>
      </div>
    )
  }
}

export default ChangeMobileNum