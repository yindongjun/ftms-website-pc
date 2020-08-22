import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'antd'
import { personalInfo } from '../../../services/personalInfo'
import { querryStringToObject } from '../../../utils/util.js'
import { message } from 'antd';
import './index.less'
//修改密码
class ModifyPwd extends Component {
  constructor(props){
    super(props)
    this.state={
      visible: false,
      usedpassword:'',
      newpassword1:'',
      newpassword2:'',
      sign: null

    }
  }

  componentDidMount() {
    const search = this.props.location.search;
    const params = querryStringToObject(search);
    const sign = params.sign == 1;
      this.setState({
        sign: sign
      })
  }
  showModal = () => {
    //区分设置密码跟修改密码
    if(this.state.sign) {//设置密码
      if(this.state.newpassword1==this.state.newpassword2){
        //新密码输入一致
        let data={
          password:this.state.newpassword1,
          surePassword:this.state.newpassword2,
        }
        console.log(data);
        personalInfo.updateFcUserPassword(data).then((res)=>{
          console.log(res)
          if(res && res.code==='0'){
            //修改成功
            this.setState({
              visible: true,
            });
          }
        })
      }else{
        message.warning('两次新密码输入不一致', 1)
      }
    }else {//修改密码
      if(this.state.usedpassword){
        if(this.state.newpassword1==this.state.newpassword2){
          //新密码输入一致
          let data={
            oldPassword:this.state.usedpassword,
            password:this.state.newpassword1,
            surePassword:this.state.newpassword2,
          }
          personalInfo.updatePassword(data).then((res)=>{
            console.log(res)
            if(res && res.code==='0'){
              //修改成功
              this.setState({
                visible: true,
              });
            }
          })
        }else{
          message.warning('两次新密码输入不一致', 1)
        }
      }else{
        message.warning('请输入旧密码', 1)
      }
    }
    
    
  }

  handleOk = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
    
  }
  gotologin(){//重新登陆
    this.setState({
      visible: false,
    });
    if(this.state.sign) {
      window.location.href='/personcenter/home';
    }else {
      const params = {
          url: '/personcenter/home'
      };
      window.location.href='/login';
      localStorage.setItem('loginJump',JSON.stringify(params))
    }
  }

  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }

  usedpw(e){//输入旧密码
    this.setState({
      usedpassword:e.target.value
    })
  }
  newpw1(e){//输入旧密码
    this.setState({
      newpassword1:e.target.value
    })
  }
  newpw2(e){//输入旧密码
    this.setState({
      newpassword2:e.target.value
    })
  }

  render(){
    return (
      <div className='handleModifyPwd'>
        {
          this.state.sign?<h2>设置密码</h2>
          :<h2>修改密码</h2>
        }
        {
          this.state.sign?null
          :<Link to='/personcenter/home'>返回个人中心</Link>
        }
        
        <div className='ModifyPwdBox'>
          <ul>
            {
              !this.state.sign?
              <li>
                <label>旧&nbsp;&nbsp;密&nbsp;&nbsp;码：</label>
                <input type="password" placeholder='请输入旧密码' onChange={this.usedpw.bind(this)} />
              </li>
              :null
            }
            <li>
              <label>新&nbsp;&nbsp;密&nbsp;&nbsp;码：</label>
              <input type="password" placeholder={this.state.sign?'请输入6-20位数字和字母的组合':'请输入新密码'} maxLength="20" onChange={this.newpw1.bind(this)}/>
            </li>
            <li>
              <label>确认密码：</label>
              <input type="password" placeholder={this.state.sign?'请再次输入确认新密码':'请输入新密码'} maxLength="20" onChange={this.newpw2.bind(this)}/>
            </li>
          </ul>
          <span className='changebtn' onClick={this.showModal}>{this.state.sign?'完成':'立即更换'}</span>
        </div>
        <div className='warning'>
          <h3>操作提示：</h3>
          <div>
            <p>1、登录密码是您在进行个人中心账号登录的唯一权限凭证，请修改后牢记密码</p>
            <p>2、设置密码时，建议您不要使用过于简单的数字（如六位相同数字）或者易被破译的数字（如生日、电话号码等）</p>
          </div>
        </div>
        <Modal
          title=""
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          centered={true}
          wrapClassName='chengePwdbox'
          footer={null}
        >
          <img src={require('../../../assets/img/personsenter/success-icon.png')} alt=""/>
          {
            this.state.sign?<p>您的密码设置成功！</p>
            :
            <p>您的密码修改成功，请重新登录！</p>
          }
          <span onClick={this.gotologin.bind(this)}>确定</span>
        </Modal>
      </div>
    )
  }
}

export default ModifyPwd