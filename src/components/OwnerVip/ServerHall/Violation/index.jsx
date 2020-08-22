import React, { Component, Fragment } from 'react'
import './index.less'
import {Input, Select, message, Modal} from 'antd';
import { carOwner } from '../../../../services/carOwner'

class Violation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowCheckedInfo: false,
      vinValue: '',//vin
      vinList: [],
      aiCheShow: false,
      carTypeValue: undefined,//车型
      engineValue: '',//发动机
      licenceNumber: '',
      licenceStr: '京',
      searchList: [],
      violationNum: '',
      sumPoints: '',
      sumFine: '',
      violationList: [],
      briefList: [],
      licenceList: [],
      engineList: []
    }
    this.handleVinChange = this.handleVinChange.bind(this)
    this.handleCartypeValue = this.handleCartypeValue.bind(this)
    this.handleLicenceStr = this.handleLicenceStr.bind(this)
    this.handleEnginevValue = this.handleEnginevValue.bind(this)
    this.handleLicenceNumber = this.handleLicenceNumber.bind(this)
  }
  componentDidMount () {
    this.ifLogin()
  }
  ifLogin() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if(userInfo) {
      this.getCarCode();
      this.getProvinceBrief();
    }else {
      window.location.href = '/login'
    }
  }
  getCarCode() {//带入用户车架号
    carOwner.getCarCode().then((res) => {
      if(res && res.code ==='0') {
        if(res.data.length > 0) {
          const vinList =[],
                engineList = [],
                licenceList = [];
          res.data.map((item,index) => {
            if(item.carCode) {
              let data = {};
              data.carCode = item['carCode'];
              vinList.push(data)
            }
            if (item.carNumber) {
              let data = {};
              data.carNumber = item['carNumber'];
              licenceList.push(data)
            }
            if (item.carDriveNumber) {
              let data = {};
              data.carDriveNumber = item['carDriveNumber'];
              engineList.push(data)
            }
          })
          this.setState({
            vinList: [...vinList],
            engineList: [...engineList],
            licenceList: [...licenceList]
          })
          // this.setState({
          //   vinList: res.data
          // })
        }else {
          this.setState({
            aiCheShow: true
          })
          // window.location.href = '/personcenter/home'
        }
      }
    })
  }
  getProvinceBrief() {//获取省份简称
    carOwner.getProvinceBrief().then((res) => {
      if(res && res.code === '0') {
        this.setState({
          briefList: res.data
        })
      }
    })
  }
  // 没有绑定爱车弹窗开关
  aiCheShowNot() {
    this.setState ( (pre, props) => {
      return {
        aiCheShow: !pre.aiCheShow
      }
    })
    window.location.href = '/personcenter/home'
  }
  // 跳转个人中心
  toPersoncenter() {
    window.location.href = '/personcenter/home#anchor_myCar'
  }
  handleVinChange(e) {
    // console.log(this.state.engineList,this.state.licenceList,this.state.vinList)
    var num = -1;
    this.state.vinList.map((item,index) => {
      if(item.carCode === e) {
        num= index;
      }
    })
    this.setState({
      vinValue : e,
      engineValue: this.state.engineList.length>0?this.state.engineList[num].carDriveNumber: '',
      licenceNumber: this.state.licenceList[num].carNumber || ''
    })
  }
  handleCartypeValue(e) {
    this.setState ({
      carTypeValue:e
    })
  }
  handleLicenceStr(e) {
    this.setState ({
      licenceStr:e
    })
  }
  handleLicenceNumber(e) {
    this.setState ({
      licenceNumber:e.target.value
    })
  }
  handleEnginevValue(e) {
    this.setState ({
      engineValue:e.target.value
    })
  }
  handleChecked = () => {
    const {vinValue, carTypeValue, engineValue, licenceNumber, licenceStr, briefList} = this.state;
    console.log(vinValue,carTypeValue,engineValue,licenceNumber,licenceStr);
    let licenceReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Za-z]{1}[A-Za-z0-9]{4}[A-Za-z0-9挂学警港澳]{1}$/;
    let vinReg = /^([A-Za-z0-9]{17})$/;//车架号正则
    let engReg = /^([a-zA-Z0-9]{4,10})$/;//发动机正则
    console.log(licenceNumber)
    if (carTypeValue=='' || carTypeValue == undefined) {
      message.warn('请选择您的车型');
      return;
    }else if (licenceNumber=='') {
      message.warn('请输入车牌号码');
      return;
    }else if (!licenceReg.test(licenceNumber)) {
      message.warn('请输入正确的车牌号码');
      return;
    }else if (engineValue=='') {
      message.warn('请输入完整的发动机号码');
      return;
    }else if (!engReg.test(engineValue)) {
      console.log(engineValue)
      message.warn('请输入正确的发动机号码');
      return;
    }
    // else if (vinValue=='') {
    //   message.warn('请输入完整的车架号码');
    //   return;
    // }else if (!vinReg.test(vinValue)) {
    //   message.warn('请输入正确的车架号码');
    //   return;
    // }
    else {
      const data = {};
      data.carType = carTypeValue;
      data.carNumber = licenceNumber;
      data.carCode = vinValue;
      data.carDriveNumber = engineValue;
      // data.carType = '02';
      // data.carNumber = "粤BL61Q9";
      // data.carCode = "036053";
      // data.carDriveNumber = "004179";

      carOwner.TrafficViolationsList(data).then((res) => {
        if(res && res.code === '0') {
          if(res.data.violationNum>0) {
            this.setState({
              isShowCheckedInfo: true,
              violationNum:res.data.violationNum,//违章次数
              sumPoints: res.data.sumPoints,//总扣分
              sumFine: res.data.sumFine,//总罚款
              violationList:res.data.violationPunishListBOS,
            })
          }else {
            this.setState({
              isShowCheckedInfo: false,
              violationNum:res.data.violationNum,//违章次数
              sumPoints: res.data.sumPoints,//总扣分
              sumFine: res.data.sumFine,//总罚款
              violationList: []
            })
            message.success("暂无信息");
          }
        }
      })
    }
  }
  render() {
    const { isShowCheckedInfo,vinValue,
      carTypeValue,engineValue,licenceNumber,licenceStr,
      violationNum,sumPoints,sumFine,violationList, briefList, vinList} = this.state
    const Option = Select.Option;
    return (
      <div className='handletViolation'>
        <div className='ViolationCheck'>
          <div>
            <h3><i>*</i>车型：</h3>
            <Select placeholder='请选择您的车型' value={carTypeValue} onChange={this.handleCartypeValue} style={{ width: '3.68rem', height: '.46rem' }}>
              <Option value="01">大型车</Option>
              <Option value="02">小型车</Option>
            </Select>
          </div>
          <div>
            <h3><i>*</i>车牌号码：</h3>
            {/* <Select placeholder='请选择您的车牌号码' value={licenceStr} onChange={this.handleLicenceStr} style={{ width: '1rem', height: '.46rem', marginRight: '.1rem' }}>
              {
                briefList.map((item,index)=> {
                  return <Option key={index} value={item.provinceBrief}>{item.provinceBrief}</Option>
                })
                }
            </Select> */}
            {/* <Input placeholder='请输入车牌号码' maxLength={6} value={licenceNumber} onChange={this.handleLicenceNumber} style={{ width: '2.5rem', height: '.46rem' }} /> */}
            <Input placeholder='请输入车牌号码' maxLength={7} value={licenceNumber} onChange={this.handleLicenceNumber} style={{ width: '3.68rem', height: '.46rem' }} />
          </div>
          <div>
            <h3><i>*</i>发动机号：</h3>
            <Input placeholder='请输入完整的发动机号' maxLength={10} value={engineValue} onChange={this.handleEnginevValue} style={{ width: '3.68rem', height: '.46rem' }} />
          </div>
          <div>
            <h3><i>*</i>车架号码：</h3>
            <Select placeholder='请选择您的车架号' onChange={this.handleVinChange} style={{ width: '3.68rem', height: '.46rem' }}>
              {
                vinList.map((item,index)=> {
                  return <Option key={index} value={item.carCode}>{item.carCode}</Option>
                })
              }
            </Select>
          </div>
          <span>*请对照《机动车行驶证》认真填写以上信息</span>
          <button onClick={this.handleChecked}>查询</button>
        </div>
        {
          isShowCheckedInfo ?
            <Fragment>
              <table className="checked-result" >
                <thead>
                  <tr>
                    <th colSpan='3'>查询结果</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>违章次数</td>
                    <td>总扣分</td>
                    <td>总罚款</td>
                  </tr>
                  <tr>
                    <td>{violationNum}条</td>
                    <td>{sumPoints}分</td>
                    <td>{sumFine}元</td>
                  </tr>
                </tbody>
              </table>
              {
                violationList.map((v, i) => {
                  return <table key={i} className='ViolationDetail'>
                    <tbody>
                      <tr>
                        <td>{v.handleTime}</td>
                        <td>扣{v.points}分，罚{v.fine}百</td>
                      </tr>
                      <tr>
                        <td>违章地点</td>
                        <td>{v.illegalsite}</td>
                      </tr>
                      <tr>
                        <td>违章行为</td>
                        <td>{v.illegalbehavior}</td>
                      </tr>
                    </tbody>
                  </table>
                })
              }
            </Fragment>
            :
            null
        }
        <Modal
            className = 'aiCheShow'
            title=""
            visible={this.state.aiCheShow}
            footer = {null}
        >
          <span></span>
          <p>您还没有绑定车辆，立即去绑定吧！</p>
          <div className = 'btn' onClick = {this.toPersoncenter.bind(this)}>确定</div>
        </Modal>
      </div>
    )
  }
}

export default Violation
