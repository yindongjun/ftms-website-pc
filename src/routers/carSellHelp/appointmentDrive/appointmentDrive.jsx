import React, { Component, Fragment } from 'react'
import './appointmentDrive.less'

import moment from 'moment';
import {Select, Input, DatePicker, Modal, message, Icon, TimePicker} from 'antd';
import {headerApi, publicApi, loginApi} from "../../../services/api";
import {carSellHelpInter} from "../../../services/carSellHelpInter";
import BaiduMap from '../../../components/baiduMap'
import { querryStringToObject } from '../../../utils/util'

const format = 'HH:mm';
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class AppointmentDrive extends Component {
    constructor(props) {
        super(props)
        this.state = {
          isShowSendBtn: true,
          seconds: 60,
          sexValue: '',
          buyTime: '',
          addressDetailOpenNum: '',
          appointmentSuccess: false,
          yinsizhengceShow: false,
          carModelSelect: '',
          provinceSelect: '110000',
          citySelect: '110000',
          searchBtnValue: '',
          nameInput: '请输入姓名',
          mobileInput: '请输入手机号',
          telcodeInput: '',
          datePicker: '',
          timePicker: '',
          deacler_Name: '',
          agreeSign: false,
          // 地图
          sum: '',
          lat: 39.962357,
          lng: 116.456547,
          city: '北京',
          zoom: 11,
          identifying: 0,
          // === 接口数据 ===
          defaultCarId: '',
          defaultCarName: '请选择车型',
          brandModelsList_RESDATA: [],
          // 省份列表数据
          getProvince_RESDATA: [],
          // 城市列表数据
          getCity_RESDATA: [],
          // 经销商列表数据
          getDealer_RESDATA: [],
          newPhone: false,
          cidd: null,
          cids: null,
          isQst: false
        }


        this.appointmentSuccessOrNot = this.appointmentSuccessOrNot.bind(this)
        this.yinsizhengceShowOrNot = this.yinsizhengceShowOrNot.bind(this)
        this.getMobileVerificationCode = this.getMobileVerificationCode.bind(this)
    }
    // 生命周期
    componentDidMount() {
      this.getTestDriveInfo()
      // this.brandModelsList()

      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const realName = userInfo && userInfo.loginName
      const sex = userInfo && userInfo.sex
      const mobile = userInfo && userInfo.mobile

      const search = this.props.location.search;
      const Params = querryStringToObject(search);

      const cid = Params.cid?Params.cid:null;
      const cids = ['35','26','12'];  // 预约咨询的指定车辆id,在这里变更数据源
      const isQst = cids.indexOf(''+cid)!=-1; //是否是预约咨询相关车辆

      this.setState({
        nameInput: realName,
        sexValue: sex === '0' ? '0' : '1',
        mobileInput: mobile,
        cidd: Params.cid?Params.cid:null,
        cids: cids,
        isQst:isQst
      })
    }
    componentWillUnmount() {
      clearInterval(this.interval)
    }
  interval = null;

  // ================================================== 接口函数 ==================================================
    // 预约试驾 带入信息
    getTestDriveInfo() {
      const search = this.props.location.search;
      const Params = querryStringToObject(search);
      let cid = Params.cid || ''
      let dealerName = Params.dealerName || ''
      let appointId = Params.id || ''
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const accessToken = userInfo && userInfo.accessToken
      const tel = userInfo && userInfo.mobile

      const params = {
        cid: cid,
        dealerName: dealerName,
        accessToken: accessToken || '',
        id: appointId
      };
      headerApi.getTestDriveInfo(params).then(res => {
        if (res && res.code === '0') {
          // 判断是 修改 预约试驾
          if( res.data.testDriveInfo.length !== 0 ) {
            this.setState({
              defaultCarId: res.data.testDriveInfo.vehiclaInfo.cid,
              cidd: res.data.testDriveInfo.vehiclaInfo.cid,
              defaultCarName: res.data.testDriveInfo.vehiclaInfo.name,
              buyTime: res.data.testDriveInfo.plan_shopping_time,
              datePicker: res.data.testDriveInfo.test_drive_date.split(' ')[0],
              timePicker: res.data.testDriveInfo.test_drive_date.split(' ')[1],
              deacler_Name: res.data.testDriveInfo.dealerInfo.name,
              nameInput: res.data.testDriveInfo.name,
              mobile: res.data.testDriveInfo.mobile,
              mobileInput: res.data.testDriveInfo.mobile
            })
            if(tel === res.data.testDriveInfo.mobile) {
              this.setState({
                newPhone: false
              })
            }else {
              this.setState({
                newPhone: true
              })
            }
            if (!res.data.testDriveInfo.dealerInfo) {
              this.getProvince()
              this.getCity(this.state.provinceSelect);
  
              let params = {
                provinceid: '',
                cityid: '',
                dealerName: '',
                cityName: '',
                provinceName: ''
              }
              this.searchDealer(params)
            } else {
              this.setState({
                provinceSelect: res.data.testDriveInfo.dealerInfo.provinceid,
                citySelect: res.data.testDriveInfo.dealerInfo.cityid,
                searchBtnValue: '',
                lat: res.data.testDriveInfo.dealerInfo.lat,
                lng: res.data.testDriveInfo.dealerInfo.lng,
                city: res.data.testDriveInfo.dealerInfo.city,
              }, () => {
                this.getProvince()
                publicApi.getCity(this.state.provinceSelect).then( (res) => {
                  if(res && res.code === '0') {
                    this.setState({
                      getCity_RESDATA: res.data,
                      citySelect: this.state.citySelect
                    }, () => {
                      let params = {
                        provinceid: this.state.provinceSelect,
                        cityid: this.state.citySelect,
                        dealerName: this.state.searchBtnValue,
                        cityName: '',
                        provinceName: ''
                      }
                      this.searchDealer(params);
                      this.addressDetailOpen(0, {lng: this.state.lng, lat: this.state.lat, city: this.state.city, deacler_Name: this.state.deacler_Name})
                    });
                  }
                })
              });
            }
          }
          // 不是修改预约试驾
          else {
            this.setState({
              // nameInput: res.data.userInfo.nickname,
              // sexValue: res.data.userInfo.sex,
              // mobileInput: res.data.userInfo.tel,
              defaultCarId: res.data.vehicleInfo.cid,
              defaultCarName: res.data.vehicleInfo.name
            })
            if (res.data.dealerInfo.length === 0) {
              this.getProvince()
              this.getCity(this.state.provinceSelect);

              let params = {
                provinceid: '',
                cityid: '',
                dealerName: '',
                cityName: '',
                provinceName: ''
              }
              this.searchDealer(params)
            } else {
              this.setState({
                provinceSelect: res.data.dealerInfo.provinceid,
                citySelect: res.data.dealerInfo.cityid,
                searchBtnValue: dealerName,
                lat: res.data.dealerInfo.lat,
                lng: res.data.dealerInfo.lng,
                city: res.data.dealerInfo.city,
              }, () => {
                this.getProvince()
                publicApi.getCity(this.state.provinceSelect).then( (res) => {
                  if(res && res.code === '0') {
                    this.setState({
                      getCity_RESDATA: res.data,
                      citySelect: this.state.citySelect
                    }, () => {
                      let params = {
                        provinceid: this.state.provinceSelect,
                        cityid: this.state.citySelect,
                        dealerName: dealerName,
                        cityName: '',
                        provinceName: ''
                      }
                      this.searchDealer(params);
                      this.addressDetailOpen(0, {lng: this.state.lng, lat: this.state.lat, city: this.state.city, deacler_Name: dealerName})
                    });
                  }
                })
              });
            }
          }
          this.brandModelsList()
        } else {
          this.props.history.push('/login')
        }
      })
    }
    // 品牌车型：车型展示列表
    brandModelsList() {
      carSellHelpInter.brandModelsList().then((res) => {
        if (res && res.code === '0') {
          let arr = [];
          for (let i = 0; i < res.data.length; i++) {
            //有的IE11环境报错，不支持flat，改成了手动嵌套遍历获取集合数据
            for(let j=0;j<res.data[i].car_series.length;j++){
              arr.push(res.data[i].car_series[j]);
            }
          }
          // ----------------针对威尔法隐藏试驾
          let newArr = arr;
          let lastArr = []
          newArr.map((item,index) => {
            const isQstItem = this.state.cids.indexOf('' + item.cid)!=-1; 
            if(this.state.isQst) {
              if(isQstItem) {
                lastArr.push(item)
              }
            }else {
              if(!isQstItem) {
                lastArr.push(item)
              }
            }
          })
          // --------------

          this.setState({
              brandModelsList_RESDATA: lastArr
          })
        }
      })
    }
    // 品牌车型：获取车型的价格和版本
    // getVersion(cid) {
    //   carSellHelpInter.getVersion(cid).then((res) => {
    //     if (res && res.code === '0') {
    //           this.setState({
    //               getVersion_RESDATA: res.data
    //           })
    //       }
    //   })
    // }
    // 下拉框省份列表
    getProvince() {
      publicApi.getProvince().then( (res) => {
        if(res && res.code === '0') {
          this.setState({
            getProvince_RESDATA: res.data
          })
        }
      })
    }
    // 下拉框城市列表
    getCity(provinceId) {
      publicApi.getCity(provinceId).then( (res) => {
        if(res && res.code === '0') {
          this.setState({
            getCity_RESDATA: res.data,
            citySelect: res.data[0].cid
          }, () => {
            let params = {
              provinceid: this.state.provinceSelect,
              cityid: this.state.citySelect,
              dealerName: '',
              cityName: '',
              provinceName: ''
            }
            this.searchDealer(params);
          });
        }
      })
    }
    // 下拉框经销商列表
    // getDealer(cityId) {
    //   publicApi.getDealer(cityId).then( (res) => {
    //     if(res && res.code === '0') {
    //       this.setState({
    //         getDealer_RESDATA: res.data
    //       })
    //     }
    //   })
    // }
    // 经销商查询
    searchDealer(params) {
      publicApi.searchDealer(params).then( (res) => {
        if(res && res.code === '0') {
          // console.log(res.data)
          if (res.data.sum === 0) {
            this.setState({
              sum: res.data.sum
            })
            message.warning('未搜索到相关信息');
          } else {
            this.setState({
              sum: res.data.sum,
              getDealer_RESDATA: res.data.list,
            }, () => {
              this.setState({// 获取到后 赋值地图信息为当前的 省市
                // 地图
                lat: this.state.getDealer_RESDATA[0].lat,
                lng: this.state.getDealer_RESDATA[0].lng,
                city: this.state.getDealer_RESDATA[0].city,
                zoom: 11,
                identifying: 0
              })
            })
          }
        }
      })
    }
    // 发短信验证码
    sendMobileCode(postData) {
      if(!this.state.isShowSendBtn) {
        return
      }
      loginApi.sendMobileCode(postData).then( (res) => {
        if(res && res.code === '0') {
          message.success('验证码发送成功')
          this.setState({
            isShowSendBtn:false
          });
          this.interval = setInterval(() => this.tick(), 1000)
        }
      })
    }
    // 预约试驾：立即预约
    addTestDrive(postData) {
      headerApi.addTestDrive(postData).then( (res) => {
        if(res && res.code === '0') {
          this.setState({
            appointmentSuccess: true
          })
        }
      })
    }
    // ============================================================================================================
    // 性别
    checkSex(sex) {
      this.setState ({
        sexValue: sex
      })
    }
    // 购车时间选择
    chooseBuyTime(time) {
      this.setState ({
        buyTime: time
      })
    }

    // 经销商地址 点击展开
    addressDetailOpen(index, {lng, lat, city, deacler_Name}) {
      console.log(index)
      if (this.state.addressDetailOpenNum === index) {
        this.setState ({
          identifying:0
        })
        this.searchBtn()
      } else {
        this.setState ({
          identifying:0,
          addressDetailOpenNum: index,
          deacler_Name: deacler_Name,
          // 地图
          lng: lng,
          lat: lat,
          city: city,
          zoom: 21
        })
      }
    }

    // 预约成功弹窗开关
    appointmentSuccessOrNot() {
      this.setState ( (pre, props) => {
        return {
          appointmentSuccess: !pre.appointmentSuccess
        }
      })
    }
    // 隐私政策弹窗开关
    yinsizhengceShowOrNot() {
      this.setState ( (pre, props) => {
        return {
          yinsizhengceShow: !pre.yinsizhengceShow
        }
      })
    }
    // select 变化
    handleSelectChange(type, e) {
      console.log(type, e)
      this.setState({
        [type + 'Select']: e
      })
      // 联动处理
      if (type === 'province') {
        this.getCity(e)
      }
      if (type === 'city') {
        // this.getDealer(e)
        this.setState({
          addressDetailOpenNum: ''
        })
        let params = {
          provinceid: this.state.provinceSelect,
          cityid: e,
          dealerName: '',
          cityName: '',
          provinceName: ''
        }
        this.searchDealer(params)
      }
      if (type == 'carModel') {
        this.setState({
          defaultCarId: e
        })
      }
    }
  handleChange(e) {
    this.setState({
      searchBtnValue: e.target.value,
      identifying: 1
    })
  }
    // input 变化
    handleInputChange(type, e) {
      console.log(type, e.target.value)
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const tel = userInfo && userInfo.mobile
      this.setState({
        [type + 'Input']: e.target.value
      })
      if(type==='mobile') {
        if(e.target.value === tel ) {
          this.setState({
            newPhone: false
          })
        }else {
          this.setState({
            newPhone: true
          })
        }
      }
    }
  // disabledDate=(current)=> {
  //   // Can not select days before today and today
  //   return current && current < moment().endOf('day');
  // }
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
    // 获取短信验证码
    getMobileVerificationCode() {
      let postData = {
        "mobile": this.state.mobileInput, // 手机号
        "sendCodeType": "testDrive" // 发送短信类型，详见备注信息
      }
      // 校验区域
      if (!postData.mobile) {
        message.warning('请输入手机号')
        return
      }
      let mobileReg = /^\d{11}$/
      if (!mobileReg.test(postData.mobile)) {
        message.warning('输入手机号格式有误')
        return
      }
      this.sendMobileCode(postData)
    }
  handleEnterSearch(e){
    if (e.which === 13) {
      this.searchBtn(e)
    }
  };
    // 按照经销商名称搜索
    searchBtn(e) {
      console.log(e)
      let params = {
        provinceid: this.state.provinceSelect,
        cityid: this.state.citySelect,
        dealerName: document.getElementById('searchBtn').value,
        cityName: '',
        provinceName: ''
      }
      this.searchDealer(params)
      this.setState({
        addressDetailOpenNum: ''
      })
    }
    // 日期改变
    datePickerChange(value, dataString) {
      console.log(value, dataString)
      this.setState({
        datePicker: dataString
      })
    }
    //时间切换
    timechange(a,b){
      console.log(b);
      this.setState({
        timePicker:b
      })
    }
    // 禁止选择的日期
    disabledDate(current) {
      return current < moment().endOf('day') || current > moment().add(180, 'day') ;
    }
    // 禁止选择的时间
    range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    }
    disabledHours() {
      function range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
      }
      return range(0, 24).splice(0,9).concat(range(0, 24).splice(17,23));
    }
    // 同意协议
    agreeIt() {
      this.setState ({
        identifying:1
      })
      this.setState((pre, props) => {
        return {
          agreeSign: !pre.agreeSign
        }
      })
    }
    // 立即预约
    submit() {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const accessToken = userInfo && userInfo.accessToken

      console.log(this.state.carModelSelect)
      console.log(this.state.defaultCarId)

      const search = this.props.location.search;
      const Params = querryStringToObject(search);
      let appointId = Params.id || ''

      let postData = {
        name: this.state.nameInput,
        sex: this.state.sexValue, // 用户性别，0女 1男
        tel: this.state.mobileInput,
        code: this.state.telcodeInput,
        cid: this.state.carModelSelect ? this.state.carModelSelect : this.state.defaultCarId,
        driveTime: this.state.datePicker + ' ' + this.state.timePicker, // 预约试驾时间,标准时间格式
        levelId: this.state.buyTime,// 计划购车时间, 1周内购车2， 1个月内购车3， 3个月内购车4， 3-6个月内购车5， 未知6
        dealerName: this.state.deacler_Name,
        sign: this.state.agreeSign? 1 : 0,
        accessToken: accessToken,
        // id 预约试驾修改
        id: appointId,
        driveFlag: this.state.isQst? 2 : 1
      }
      console.log(postData)
      // 校验区
      if (!postData.name || postData.name === '请输入姓名') {
        message.warning('请填写姓名')
        return
      }
      if (!postData.sex) {
        message.warning('请选择性别')
        return
      }
      if (!postData.tel) {
        message.warning('请输入手机号')
        return
      }
      if (!postData.tel || postData.tel === '请输入手机号') {
        message.warning('请输入手机号')
        return
      }
      let mobileReg = /^\d{11}$/
      if (!mobileReg.test(postData.tel)) {
        message.warning('输入手机号格式有误')
        return
      }
      if (this.state.newPhone&&!postData.code) {
        message.warning('请输入手机验证码')
        return
      }
      if (!postData.cid || this.state.defaultCarName === '请选择车型') {
        message.warning('请选择车型')
        return
      }
      if (!this.state.datePicker) {
        message.warning('请选择预约日期')
        return
      }
      if (!this.state.timePicker) {
        message.warning('请选择预约时间')
        return
      }
      // if (!postData.driveTime) {
      //   message.warning('请选择预约试驾时间')
      //   return
      // }
      if (!postData.levelId) {
        message.warning('请选择计划购车时间')
        return
      }
      if (!postData.dealerName) {
        message.warning('请选择经销商')
        return
      }
      if (postData.sign !== 1) {
        message.warning('请阅读《隐私政策》')
        return
      }
      this.addTestDrive(postData)
    }
    // 跳转预约试驾
    toYuyueShijia() {
      this.props.history.push('/personcenter/appointmain?name=3')
    }

    render() {
      const {isShowSendBtn, seconds, brandModelsList_RESDATA, getProvince_RESDATA, getCity_RESDATA, getDealer_RESDATA, provinceSelect, citySelect, searchBtnValue, cidd, isQst} = this.state
      return (
        <div className = 'appointmentDrive'>
          <div className = 'banner'>
            <span>
            {
              //-----------------针对威尔法隐藏试驾
              isQst?<h1>预约咨询</h1>:<h1>预约试驾</h1>
            }
              <i></i>
            </span>
          </div>
          <div className = 'appointmentDriveInfo'>
            <h2>个人信息</h2>
            <div className = 'nameInput'>
              <strong>*</strong>&nbsp;填写您的姓名:
              <Input placeholder = '请填写姓名' value={this.state.nameInput} onChange = {this.handleInputChange.bind(this, 'name')}/>
              <span className = 'sex_man' onClick = {this.checkSex.bind(this, '1')}>
                <a>
                  <i className = {this.state.sexValue === '1' ? 'i_active' : null}></i>
                </a>
                 先生
              </span>
              <span className = 'sex_woman' onClick = {this.checkSex.bind(this, '0')}>
                <a>
                  <i className = {this.state.sexValue === '0' ? 'i_active' : null} ></i>
                </a>
                 女士
              </span>
            </div>
            <div className = 'phoneNum'>
              <strong>*</strong>&nbsp;填写您的手机号:
              <Input placeholder = '请填写手机号' value={this.state.mobileInput} onChange = {this.handleInputChange.bind(this, 'mobile')}/>
              {
                this.state.newPhone?
                <span onClick = {this.getMobileVerificationCode} aria-disabled={isShowSendBtn}>
                  {isShowSendBtn ? '获取验证码' : `${seconds}s后获取`}
                </span>:null
              }
              
              {
                this.state.newPhone?
                <div className="spec_phone">
                   <strong>*</strong>&nbsp;输 入 验 证 码:
                  <Input placeholder="请输入验证码" onChange = {this.handleInputChange.bind(this, 'telcode')}/>
                </div>:null
              }
            </div>
            {/* <div className = 'codeCheckInput'>
              <strong>*</strong>&nbsp;输 入 验 证 码:
              <Input placeholder="请输入验证码" onChange = {this.handleInputChange.bind(this, 'telcode')}/>
            </div> */}
            {
              //-----------------针对威尔法隐藏试驾
              isQst?<h2>预约信息</h2>:<h2>试驾信息</h2>
            }
            <div className = 'carModelSelected'>
              <strong>*</strong>&nbsp;选择车型:
              <Select value={this.state.defaultCarId} placeholder={this.state.defaultCarName? this.state.defaultCarName: '请选择车型'} onChange = {this.handleSelectChange.bind(this, 'carModel')}>
                {
                  brandModelsList_RESDATA && brandModelsList_RESDATA.map( (item, index) => {
                    return (
                      <Option value={item.cid} key = {index}>{item.name}</Option>
                    )
                  })
                }
              </Select>
            </div>
            <br/>
            <div className = 'appointmentTime'>
              <strong>*</strong>&nbsp;
              {
                //-----------------针对威尔法隐藏试驾
                isQst?`预约到店时间:`:`预约试驾时间:`
              }
              <TimePicker style={{ width: '3.2rem', height: '.46rem',marginRight:'.2rem' }}
                defaultOpenValue={moment('09:00', 'HH:mm')} 
                format={format}
                placeholder={this.state.timePicker? this.state.timePicker :'请选择时间'}
                disabledHours={this.disabledHours.bind(this)}
                value = {this.state.timePicker ? moment(this.state.timePicker,'HH:mm') : undefined}
                onChange={this.timechange.bind(this)}
              />
              <DatePicker
                disabledDate={this.disabledDate.bind(this)}
                onChange = {this.datePickerChange.bind(this)}
                placeholder = {this.state.datePicker? this.state.datePicker : '请选择日期'}
                value = {this.state.datePicker ? moment(this.state.datePicker) : undefined}
                style = {{width: '3rem'}}
              />
            </div>
            <div className = 'buyTime'>
              <strong>*</strong>&nbsp;计划购车时间:
                <div>
                  <span className = 'sex_man' onClick = {this.chooseBuyTime.bind(this, '1')}>
                    <a>
                      <i className = {this.state.buyTime === '1' ? 'i_active' : null}></i>
                    </a>
                    一周内
                  </span>
                  <span className = 'sex_man' onClick = {this.chooseBuyTime.bind(this, '2')}>
                    <a>
                      <i className = {this.state.buyTime === '2' ? 'i_active' : null}></i>
                    </a>
                    1个月内
                  </span>
                  <span className = 'sex_man' onClick = {this.chooseBuyTime.bind(this, '3')}>
                    <a>
                      <i className = {this.state.buyTime === '3' ? 'i_active' : null}></i>
                    </a>
                    3个月内
                  </span>
                  <span className = 'sex_man' onClick = {this.chooseBuyTime.bind(this, '4')}>
                    <a>
                      <i className = {this.state.buyTime === '4' ? 'i_active' : null}></i>
                    </a>
                    半年内
                  </span>
                  <span className = 'sex_man' onClick = {this.chooseBuyTime.bind(this, '5')}>
                    <a>
                      <i className = {this.state.buyTime === '5' ? 'i_active' : null}></i>
                    </a>
                    短期内暂无计划
                  </span>
                </div>
            </div>
            <h2>经销商信息</h2>
            <div className = 'deacler'>
              <strong>*</strong>&nbsp;附近的经销商: <br/>
              <Select value={provinceSelect} defaultValue="请选择省" onChange = {this.handleSelectChange.bind(this, 'province')}>
                {
                  getProvince_RESDATA && getProvince_RESDATA.map( (item, index) => {
                    return (
                      <Option value={item.cid} key={index}>{item.name}</Option>
                    )
                  })
                }
              </Select>
              <Select value={citySelect} defaultValue="请选择市" onChange = {this.handleSelectChange.bind(this, 'city')}>
                {
                  getCity_RESDATA && getCity_RESDATA.map( (item, index) => {
                    return (
                      <Option value={item.cid} key={index}>{item.name}</Option>
                    )
                  })
                }
              </Select>
              <Input value={searchBtnValue} onKeyDown={this.handleEnterSearch.bind(this)}  onChange={e => this.handleChange(e)} id = 'searchBtn' placeholder="输入经销商名称快速查询"/>
              <b>共找到<i>{this.state.sum}</i>条搜索结果</b>
              <span className = 'btn' onClick = {this.searchBtn.bind(this)}></span>
            </div>
            <div className = 'mapInfo'>
              <ul>
                {
                  getDealer_RESDATA && getDealer_RESDATA.map( (item, index) => {
                    return (
                        <a key = {index}>
                      <li className = {this.state.addressDetailOpenNum === index ? 'open_li' : ''} onClick = {this.addressDetailOpen.bind(this, index, {lng: item.lng, lat: item.lat, city: item.city, deacler_Name: item.name})}>
                        <h5>
                          <span>{this.state.addressDetailOpenNum === index ? null : index+1}</span>{item.fullname}<i><Icon style={{position: 'absolute', top: '20%', right: '-7%'}} type="down" /></i>
                          {/* <b>32.66km</b> */}
                        </h5>
                        <p style = {{textAlign: 'left', marginLeft: '0.43rem', marginBottom: '0.2rem'}}>{item.address}</p>
                        <p style = {{textAlign: 'left', marginLeft: '0.43rem'}}>销售热线： {item.phone_seal}</p>
                        <p style = {{textAlign: 'left', marginLeft: '0.43rem'}}>服务热线： {item.phone_service}</p>
                      </li>
                        </a>
                    )
                  })
                }
              </ul>
              <div className = 'map'>
                <BaiduMap lat={this.state.lat} lng={this.state.lng} city={this.state.city} dealerList={getDealer_RESDATA} zoom={this.state.zoom} identifying={this.state.identifying}></BaiduMap>
              </div>
            </div>
            <p>
              <a>
                <span onClick = {this.agreeIt.bind(this)} className = {this.state.agreeSign? 'span_active': ''}></span>
              </a>
              我已阅读并同意
              <i onClick = {this.yinsizhengceShowOrNot.bind(this)}>《隐私政策》</i>
            </p>
            {/* <div className = 'subMit' onClick = {this.appointmentSuccessOrNot.bind(this)}>马上预约</div> */}
            <div className = 'subMit' onClick = {this.submit.bind(this)}>马上预约</div>
         
            <div style={{
                fontSize:'14px',
                textAlign:'center',
                marginTop:'0.3rem',
                color:'#7f7f7f',
              }}>
              {isQst?'':
                '一汽丰田感谢您预约试驾，预约的经销店会尽快与您联络，具体试驾时间及车型，请与经销店协商。'
              }
              </div>
          </div>
          
          <Modal
            className = 'appointmentSuccess'
            title=""
            visible={this.state.appointmentSuccess}
            onCancel={this.appointmentSuccessOrNot}
            footer = {null}
          >
            <span></span>
            <p>您的预约信息已提交</p>
            <p>我们的客服人员会尽快联系您。请耐心等待！</p>
            <div className = 'btn' onClick = {this.toYuyueShijia.bind(this)}>查看预约</div>
          </Modal>
          <Modal
            className = 'yinsizhengce'
            title="隐私政策"
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

export default AppointmentDrive