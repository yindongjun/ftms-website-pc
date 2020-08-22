import React, { Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import {personalInfo} from '../../../services/personalInfo'
import './index.less'
import { message } from 'antd';

class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sexVal: 0,
      name: '',
      imgUrl: '',
      userInfo: {},
      publicUrl: '',
      name_ex: 0,
      sex_ex: ''

    }
    this.check_sex = this.check_sex.bind(this);
    this.handleName = this.handleName.bind(this);
    this.save = this.save.bind(this);
    this.changeImg = this.changeImg.bind(this);
  }
  componentDidMount() {
    this.getUserInfo();
  }
  getUserInfo() {
    personalInfo.userInfo().then((res) => {
      if(res && res.code == '0') {
        this.setState({
          name: res.data.loginName,
          sexVal: res.data.sex?res.data.sex:3,
          imgUrl: res.data.memberLogo,
          name_ex: res.data.loginName,
          sex_ex: res.data.sex?res.data.sex:3
        })
      }
    })
  }
  check_sex(e) {
    this.setState({
      sexVal: e.target.value
    })
  }
  handleName(e) {
    this.setState({
      name: e.target.value
    })
  }
  changeImg() {
    // const base64 = '';
    const _this = this;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken
    const file = this.fileInput.files;
    let reader = new FileReader();
    console.log(file[0].size);
    if(file[0].type != 'image/png' && file[0].type != 'image/jpeg') {
      message.warn('只能上传 png/jpg 格式');
    }else if (file[0].size>1024*1024) {
      message.warn('只能上传低于1M的照片');
    }else {
      reader.readAsDataURL(file[0]);
      reader.onload = function() {
        // base64 = reader.result;
        var data = {};
        data.imgUrl = reader.result;
        data.accessToken = accessToken;
        personalInfo.uploadMemberLogo(data).then((res) => {
          if(res && res.code =='0') {
            message.success('图片修改成功');
            _this.setState({
              imgUrl:res.data.imgNetworkAddress,
              publicUrl: res.data.imgRelativePath
            })
          }
        })
      }
    }
    
    
  }
  save() {
    console.log(this.state.sexVal,this.state.name);
    const { name, sexVal, publicUrl, sex_ex, name_ex} = this.state;
    const data = {};
    data.loginName = name;
    data.sex = sexVal;
    if(publicUrl){
      data.memberLogo = publicUrl
    }
    if(name=='') {
      message.warn('请输入姓名');
      return;
    }else if(name.length>15) {
      message.warn('用户名只能为长度小于15的汉字数字字母！');
      return;
    }else if(sexVal!=0&&sexVal!=1) {
      message.warn('请选择性别');
      return;
    }else if (sexVal==sex_ex && name==name_ex) {
      message.warn('请更改后提交');
      return;
    }else {
      personalInfo.updateUserInfo(data).then((res)=> {
        if(res && res.code=='0') {
          message.success(res.msg);
        }
      })
    }
  }
  render() {
    const {sexVal, name, imgUrl} = this.state;
    return (
      <div className='handleAccountInfo'>
        <h2>账户信息</h2>
        <Link to='/personcenter/home'>返回个人中心</Link>
        <div className='AccountInfo'>
          <p>
            <div className='imgBox'>
              <img src={imgUrl?imgUrl:require('../../../assets/img/personsenter/headpic.png')} alt="" />
            </div>
            <input type="file" ref={e => this.fileInput = e} accept="image/*" multiple="multiple" onChange={this.changeImg} />
          </p>
          <span>点击更换</span>
          <div className='username'>
            <label>用户名：</label>
            <span>
              <input placeholder='请输入姓名' value={name} onChange={this.handleName} />
              <i>限定十五个字符以内</i>
            </span>
          </div>
          <div className='sex'>
            <label>性&nbsp;&nbsp;&nbsp;&nbsp;别：</label>
            <span>
              <i><b className={classNames({'check_sex':sexVal=='1'})}></b>男<input type="radio" name="sex" value="1" onClick={this.check_sex} /></i>
              <i><b className={classNames({'check_sex':sexVal=='0'})}></b>女<input type="radio" name="sex" value="0" onClick={this.check_sex} /></i>
            </span>
            {/* <span>
              <i>男<input type="radio" name="sex" value="1" /></i>
              <i>女<input type="radio" name="sex" value="0" /></i>
            </span> */}
          </div>
          <button className='savebtn' onClick={this.save}>保存</button>
        </div>
      </div>
    )
  }
}
export default AccountInfo