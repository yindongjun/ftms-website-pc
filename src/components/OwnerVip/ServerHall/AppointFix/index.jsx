import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import classNames from 'classnames'
import {Input, Select, Checkbox, Button, DatePicker, Modal, message, TimePicker, Icon} from 'antd';
import { common } from '@/services/common'
import {publicApi,loginApi} from "@/services/api";
import BaiduMap from '../../../../components/baiduMap'
import { querryStringToObject } from '../../../../utils/util'
import { carOwner }from '@/services/carOwner'
import './index.less'
import moment from 'moment';
const format = 'HH:mm';
// import AmapBox from '@/components/Common/AMap'
//预约维修
const { RangePicker } = DatePicker;
class AppointFixed extends Component {
  constructor(props){
    super(props)
    const search = this.props.location.search;
    const Params= querryStringToObject(search);
    this.state={
      accessToken: '',
      isShowDealerDetail: false,
      visible: false,
      name: '',               // 用户名
      sex: Number,            // 性别
      tel: '',                // 手机号
      code: '',               // 验证码
      cid: '',                // 车型id
      gotime: '',             // 预约时间
      mileage: '',            // 行驶里程
      faultPart: '',          // 故障部位
      description: '',        // 故障描述
      dealerName: '',         // 经销商名称
      deacler_Name:'',
      sign: '0',               // 是否同意隐私协议，0不同意，1同意
      signnooff:false,
      seconds: 60,
      isShowSendBtn: true,
      ifCanSend: false,
      params1:Params,
      xiugaiID:Params.id || '',
      carList: [],            // 车辆列表
      getProvince_RESDATA: [],// 省份列表数据
      getCity_RESDATA: [],    // 城市列表数据
      getDealer_RESDATA: [],  // 经销商列表数据
      provinceId: '110000',
      cityId: '110000',
   distributorList:[],  //经销商经纬度信息
      mapInstance:'',      //地图对象
      riqi: '请选择预约日期',
      times:'请选择预约时间',
      // 地图
      sum: '',
      lat: 39.962357,
      lng: 116.456547,
      city: '北京',
      zoom: 11,
      identifying: 0,
      yinsizhengceShow: false,
      riqi_pl: '',
      times_pl: ''
    }
    this.yinsizhengceShowOrNot = this.yinsizhengceShowOrNot.bind(this)
  }

  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken;
    if(!accessToken){
      message.warning('检测到您未登录，请先登录');
      window.location.href = "/login";
    }
    if(accessToken){
      this.setState({
        accessToken:accessToken
      })
      this.getUserInfo(accessToken);
    }

    this.getCarList();
    this.getProvince();
    this.getCity(this.state.provinceId);
  }
  // 隐私政策弹窗开关
  yinsizhengceShowOrNot() {
    this.setState ( (pre, props) => {
      return {
        yinsizhengceShow: !pre.yinsizhengceShow,
        // sign:'1',
        // signnooff:true
      }
    })
  }
  //获取用户信息
  getUserInfo(x){
    let token;
    if(this.state.xiugaiID){
      token={
        accessToken:x,
        id: this.state.xiugaiID
      }
      carOwner.getUserInfo(token).then((res)=>{
        if(res && res.code==='0'){
          if(res.data){
            this.setState({
              sex: res.data.sex || '',//性别
              tel: res.data.mobile || '',//手机号
              cid: res.data.cid || undefined, 
              name: res.data.name || '',
              mileage: res.data.mileage || '',
              faultPart: res.data.faultPart || '',
              description: res.data.description || '',
              deacler_Name: res.data.dealer_name || '',
              // dealerName: res.data.dealer_name || '',
              provinceId: res.data.provinceid || '',
              cityId: res.data.cityid,
              riqi_pl: res.data.gotimeYear || undefined,
              times_pl: res.data.gotimeDate || undefined,
              riqi: res.data.gotimeYear || undefined,
              times: res.data.gotimeDate || undefined,
              lat: res.data.lat || '',
              lng: res.data.lng || ''
            },() => {
              this.getProvince()
              publicApi.getCity(this.state.provinceId).then((res) => {
                if(res && res.code === '0') {
                  this.setState({
                    getCity_RESDATA: res.data,
                    cityId: this.state.cityId
                  }, () => {
                    this.handleGetDealer(0);
                    this.addressDetailOpen(0, {lng: this.state.lng, lat: this.state.lat, city: this.state.city, deacler_Name: this.state.deacler_Name});
                  })
                }
              })
            })
          }
        }else if(res.msg==='用户未登录'){
          window.location.href=`/login`;
        }
      })
    }else{
      token={
        accessToken:x
      }
      carOwner.getUserInfo(token).then((res)=>{
        if(res && res.code==='0'){
          if(res.data){
            this.setState({
              tel:res.data.tel,
              name:res.data.nickname,
              sex:res.data.sex
            })
            if(!res.data.cid){
              this.setState({
                cid: this.state.params1.carType || undefined
              })
            }else{
              this.setState({
                cid:res.data.cid
              })
            }
          }
        }else if(res.msg==='用户未登录'){
          window.location.href=`/login`;
        }
      })
    }
    
  }

  // 获取车辆列表
  getCarList() {
    common.getAllVehicleList().then((res) => {
      if(res && res.code =='0') {
        this.setState({
          carList:res.data
        })
      }
    })
  }

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
          cityId: res.data[0].cid
        }, () => {
          this.handleGetDealer(0);
        });
      }
    })
  }

  // 下拉框经销商列表
  getDealer(cityId) {
    publicApi.getDealer(cityId).then( (res) => {
      if(res && res.code === '0') {
        this.setState({
          getDealer_RESDATA: res.data
        })
      }
    })
  }

 // 经销商地址点击
  addressDetailOpen(index,{lng, lat, city, deacler_Name}) {
    console.log(lng,lat,city, deacler_Name)
    if (this.state.addressDetailOpenNum === index) {
      console.log('111')
      this.handleSearch();
      this.setState({
        identifying:0,
        deacler_Name:''
      })
    } else {
      console.log('2222')
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

  // this.handleGetDealer(item);
  }
  handleEnterSearch(e){
    if (e.which === 13) {
      this.handleSearch()
    }
  };
 // 搜索点击
 handleSearch = () => {
  this.handleGetDealer(1);
 }
 // 获取经销商经纬度信息·
 handleGetDealer = (item) => {
    let params={
      dealerName:this.state.dealerName,
      cityid:this.state.cityId,
      provinceid:this.state.provinceId
    }
    // let params='dealerName='+this.state.dealerName+'&provinceid='+this.state.provinceId+'&cityid='+this.state.cityId;
  // // 直接切换市
  // if(item === 0){
    //   params='provinceid='+this.state.provinceId+'&cityid='+this.state.cityId;
  // }else if(item === 1){
    //   // 点击搜索时
    //   if(this.state.provinceId=='请选择省' && this.state.cityId=='请选择市'){
    //     params='dealerName='+this.state.dealerName;
    //   }else if(this.state.cityId ==='请选择市'){
    //     params='dealerName='+this.state.dealerName+'&provinceid='+this.state.provinceId;
    //   } else if (this.state.provinceId ==='请选择省') {
    //     params='dealerName='+this.state.dealerName+'&cityid='+this.state.cityId;
    //   }
  // }else{
    //   params='dealerName='+item.name;
    // }
    this.getlistdata(params);
      this.setState({
        addressDetailOpenNum: ''
      })
  }
  getlistdata(params){
    // params={
    //   dealerName:this.state.dealerName,
    //   cityid:this.state.cityId,
    //   provinceid:this.state.provinceId
    // }
    // params = encodeURI(params);
    publicApi.searchDealer(params).then((res) => {
   if(res && res.code === '0') {
              if (res.data.sum === 0) {
                this.setState({
                  sum: res.data.sum
                })
                message.warning('未搜索到相关信息');
              } else {
                this.setState(() => {
                  return {
                    sum: res.data.sum,
                    distributorList:res.data.list,
                    spinFlag:false,
                    getDealer_RESDATA:res.data.list
                  }
                },() => {
                  // this.state.mapInstance.setFitView()
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

  // 改变省份
  changeProvince(e) {
    this.setState(() => {
      return {
        provinceId: e,
        cityId: '请选择市',
        dealerName:''
      }
    },() => {
   // this.handleGetDealer(0);
  });
    this.getCity(e);
  }

  // 改变城市
  changeCity(e) {
  this.setState(() => {
   return { 
        cityId: e,
        dealerName:''
      }
  },() => {
   this.handleGetDealer(0);
  })
  // this.getDealer(e);
  }

  // 性别
  onSexChange = (e) => {
    this.setState({sex: e.target.value})
  }
  
  // 车型--选择
  changeCid = (e) => {
    console.log(e)
    this.setState({
      cid:e
    })
  }

  //日期切换
  riqichange(a,b){
    console.log(b);
    this.setState({
      riqi:b
    })
  }

  //时间切换
  timechange(a,b){
    console.log(b);
    this.setState({
      times:b
    })
  }

  // 隐私政策
 onSignChange = (e) =>{
      this.setState ({
        identifying:1
      })
    if(e.target.checked){
      this.setState({
        sign: '1',
        signnooff:e.target.checked,
      })
    }else{
      this.setState({
        sign: '0',
        signnooff:e.target.checked,
      })
    }
    
 }

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const tel = userInfo && userInfo.mobile
    this.setState({
      [name]: value,
      identifying: 1
    })
    if(name === 'tel') {
      if(value === tel) {
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

  // 发送验证码
  sendLoginCode() {
    const params = {
      mobile: this.state.tel,
      sendCodeType: 'maintenance'
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
  
  // 提交预约
  submit = (e) => {
    let params;
    if(this.state.xiugaiID){
      params = {
        accessToken:this.state.accessToken,
        name: this.state.name,
        sex: this.state.sex,
        tel: this.state.tel,
        code: this.state.code,
        cid: this.state.cid,
        gotime: this.state.riqi+' '+this.state.times,
        mileage: this.state.mileage,
        faultPart: this.state.faultPart,
        description: this.state.description,
        dealerName: this.state.deacler_Name,
        sign:  this.state.sign,
        newPhone: false,
        id:this.state.xiugaiID,
      };
    }else{
      params = {
        accessToken:this.state.accessToken,
        name: this.state.name,
        sex: this.state.sex,
        tel: this.state.tel,
        code: this.state.code,
        cid: this.state.cid,
        gotime: this.state.riqi+' '+this.state.times,
        mileage: this.state.mileage,
        faultPart: this.state.faultPart,
        description: this.state.description,
        dealerName: this.state.deacler_Name,
        sign:  this.state.sign,
        newPhone: false
      };
    }
    console.log(params);

    if(!params.name && params.name !== 0) {
      message.warning('请输入姓名')
      return
    }

    if(params.sex !=='1' && params.sex !== '0') {
      message.warning('请选择性别')
      return
    }

    if(!params.tel) {
      message.warning('请输入手机号')
      return
    }

    let TEL = /^1[0-9]{10}$/
    if(!TEL.test(params.tel)) {
      message.warning('您输入的手机号有误，请输入正确的手机号');
      return
    }

    if(this.state.newPhone&&!params.code) {
      message.warning('请输入验证码')
      return
    }

    if(!params.cid) {
      message.warning('请选择车型')
      return
    }

    if(this.state.riqi=='请选择预约日期' || this.state.times=='请选择预约时间'){
      message.warning('请选择预约时间')
      return
    }
    if(params.mileage!='' && params.mileage<0){
      message.warning('行驶里程不能为负数');
      return;
    }

    // if(!params.mileage && params.mileage !== 0) {
    //   message.warning('请填写行驶里程')
    //   return
    // }

    // let NUM = /^[0-9]*[.]{0,1}[0-9]{0,2}$/        // 最多两位小数
    let NUM = /^[0-9]*$/
    if(!NUM.test(params.mileage)) {
      message.warning('行驶里程只能输入数字')
      return
    }

    if(!params.faultPart) {
      message.warning('请填写故障部位')
      return
    }

    // if(!params.description) {
    //   message.warning('请填写故障描述')
    //   return
    // }

    if(!params.dealerName) {
      message.warning('请选择经销商')
      return
    }


    if(params.sign=='0') {
      message.warning('请勾选隐私政策')
      return
    }
    
    carOwner.repair(params).then((res)=>{
      if (res && res.code === '0') {
        // message.success(res.msg)
        this.setState({visible: true})
      }else{
        // message.warning(res.msg);
      }
    })
 }

 // mapInstance = (mapInstance) => {
 //  this.setState({mapInstance:mapInstance})
 // }

 // 时间插件
 onDataChange = (value, dateString) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
 } 
  
  disabledDate=(current)=> {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  disabledHours=()=> {
    function range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    }
    return range(0, 24).splice(0,9).concat(range(0, 24).splice(17,23));
  }
  //去维修
  gotoweixiu(){
    window.location.href='/personcenter/appointmain?name=2';
  }

  render(){
    const {isShowDealerDetail, isShowSendBtn, seconds, name, ifCanSend, sex, tel, cid, carList, provinceId, cityId, dealerName, getProvince_RESDATA, getCity_RESDATA, getDealer_RESDATA, mileage, faultPart, description, riqi_pl, times_pl, riqi, times}=this.state
    const Option = Select.Option;
    const { TextArea } = Input
    return(
      <div className='handleAppointFixed'>
        <div className='personalInfo'>
          <h2 className="AM_h2">个人信息</h2>
          <div>
            <h3><i>*</i>填写您的姓名：</h3>
            <Input maxLength={10} value={name} placeholder='请输入姓名' name="name" onChange={this.handleChange}/>
            <Checkbox onChange={this.onSexChange} value={'1'} checked={sex === '1'}>男</Checkbox>
            <Checkbox onChange={this.onSexChange} value={'0'} checked={sex === '0'}>女</Checkbox>
          </div>
          <div>
            <h3><i>*</i>填写您的手机：</h3>
            <span>
              <Input name="tel" 
              value={tel} 
              maxLength={11} 
              placeholder='请输入手机号' 
              style={this.state.newPhone?{}:{border:'none'}}
              onChange={this.handleChange}/>
              {
                this.state.newPhone?
                <i onClick={() => this.sendLoginCode()} aria-disabled={isShowSendBtn} className={ifCanSend ? 'canSendBtn' : `sendBtn`}>
                {isShowSendBtn ? '获取验证码' : `${seconds}s后获取`}
              </i>:null
              }
              
            </span>
            {
              this.state.newPhone?
              <Fragment>
                <h3 style={{paddingLeft:'.2rem'}}><i>*</i>输入验证码：</h3>
                <Input placeholder='请输入验证码' name="code" onChange={this.handleChange}/>
              </Fragment>:null
            }
          </div>
        </div>
        <div className='appointInfo'>
          <h2 className="AM_h2">预约信息</h2>
          <div>
            <h3><i>*</i>选择车型：</h3>
            <Select value={cid} onChange={this.changeCid.bind(this)} placeholder="请选择车型" style={{ width: '3.2rem', height: '.46rem' }}>
              {
                carList.map((item,index) => {
                  return (
                    <Option key={index} value={item.cid}>{item.name}</Option>
                  )
                })
              }
            </Select>
          </div>
          <div>
            <h3><i>*</i>预约时间：</h3>
            <DatePicker placeholder={riqi_pl?riqi_pl:'请选择预约日期'}
              format = "YYYY-MM-DD" 
              style={{ width: '3.2rem', height: '.46rem' }}
              disabledDate={this.disabledDate}
              onChange={this.riqichange.bind(this)}
              value={riqi === '请选择预约日期'? undefined: moment(riqi)}
              />
              <TimePicker style={{ width: '3.2rem', height: '.46rem',marginRight:'.2rem' }}
              defaultOpenValue={moment('09:00', 'HH:mm')} 
                          format={format}
                          placeholder={times_pl?times_pl:'请选择预约时间'}
                          disabledHours={this.disabledHours}
                          onChange={this.timechange.bind(this)}
                          value={times === '请选择预约时间' ? undefined : moment(this.state.times, 'HH:mm')}
                           />
            <span className="hint_i">请提前一天预约维修时间</span>
          </div>
          <div>
            <h3>行驶里程：</h3>
            <Input type="number"  min="1" value={mileage} maxLength={15} placeholder='请填写行驶公里数' name="mileage" onChange={this.handleChange}/>
            <span>公里</span>
          </div>
          <div>
            <h3><i>*</i>故障部位：</h3>
      <Input placeholder='请填写故障部位' value={faultPart} name="faultPart" onChange={this.handleChange}/>
          </div>
          <div>
            <h3>故障描述:</h3>
            <TextArea maxLength={400} value={description} placeholder='请输入故障描述' style={{ width: '6.6rem', height: '.46rem',marginLeft:'.12rem', resize: "none" }} name="description" onChange={this.handleChange}/>
          </div>
        </div>
        <div className='dealerInfo'>
          <h2 className="AM_h2">经销商信息</h2>
          <div className = 'deacler'>
            <strong>*</strong>&nbsp;附近的经销商: <br/>
            <Select value={this.state.provinceId} defaultValue="请选择省" onChange={this.changeProvince.bind(this)}>
              {
                getProvince_RESDATA.map((item,index) => {
                  return (
                    <Option key={index} value={item.cid}>{item.name}</Option>
                  )
                })
              }
            </Select>
            <Select value={this.state.cityId} defaultValue="请选择市" onChange={this.changeCity.bind(this)}>
              {
                getCity_RESDATA.map((item,index) => {
                  return (
                    <Option key={index} value={item.cid}>{item.name}</Option>
                  )
                })
              }
            </Select>
            <Input
                name="dealerName"
                value={dealerName}
                placeholder="输入经销商名称快速查询"
                onKeyDown={this.handleEnterSearch.bind(this)}
                onChange={this.handleChange} />
            <b>共找到<i>{this.state.sum}</i>条搜索结果</b>
            <span className = 'btn' onClick={this.handleSearch}></span>
          </div>
          <div className = 'mapInfo'>
            <ul>
              {
                getDealer_RESDATA.map((item, index) => {
                  return (
                    <a key={index}>                    
                      <li  className = {this.state.addressDetailOpenNum === index ? 'open_li' : ''} onClick={this.addressDetailOpen.bind(this,index, {lng: item.lng, lat: item.lat, city: item.city, deacler_Name: item.name})}>
                      <h5><span>{this.state.addressDetailOpenNum === index ? null : index+1}</span>{item.fullname}<Icon style={{position: 'absolute', top: '20%', right: '-7%'}} type="down" /></h5>
                      <p style = {{textAlign: 'left', marginLeft: '0.43rem', marginBottom: '0.2rem'}}>{item.address}</p>
                      {/* <p>销售热线： {item.phone_seal} &nbsp;&nbsp;| &nbsp;&nbsp;服务热线： {item.phone_service}</p> */}
                      <p style = {{textAlign: 'left', marginLeft: '0.43rem'}}>销售热线： {item.phone_seal}</p>
                      <p style = {{textAlign: 'left', marginLeft: '0.43rem'}}>服务热线： {item.phone_service}</p>
                    </li>
                    </a>
                     )
                })
              }
            </ul>
      {/*<div className = 'map'>
        <AmapBox 
        distributorList = {this.state.distributorList}
        mapInstance = {this.mapInstance}
       /> 
      </div>*/}
            <div className = 'map'>
              <BaiduMap lat={this.state.lat} lng={this.state.lng} city={this.state.city} dealerList={getDealer_RESDATA} zoom={this.state.zoom} identifying={this.state.identifying}></BaiduMap>
            </div>
          </div>
          <a className='fixedpolicy' href='/ownervip/serintroduce/guarpolicy'>查看保修政策</a>
        </div>
        <div className='appointment'>
          <Checkbox name="sign" checked={this.state.signnooff} onChange={this.onSignChange}>我已阅读并同意</Checkbox>
          <Button ghost onClick = {this.yinsizhengceShowOrNot.bind(this)}>《隐私政策》</Button>
          <span className='appointbtn' onClick={this.submit}>马上预约</span>
        </div>
        <Modal
          title=""
          visible={this.state.visible}
          onOk={() => {this.setState({visible: false})}}
          onCancel={()=>{this.setState({visible: false})}}
          footer={null}
          wrapClassName='appointFixedwarnning'
          centered={true}
        >
          <img src={require('../../../../assets/img/serverhall/success.png')} alt=""/>
          <p>您的预约已经提交！</p>
          <p>经销商会第一时间联系您，请耐心等待！</p>
          <span onClick={this.gotoweixiu.bind(this)}>查看预约</span>
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

export default AppointFixed