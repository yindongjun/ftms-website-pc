import React, { Component, Fragment } from 'react'
import { Icon, Modal, Input, message } from 'antd'
import { Link, NavLink } from 'react-router-dom'
import { personalInfo } from '../../../services/personalInfo'
import moment from 'moment'
import './index.less'
import config from '../../../config.json'

const orderStatus = {
  "COMMIT": "待支付",
  "PAID": "已支付",
  "REFUND": "退款中",
  "REFUNDED": "已退款",
  "COMPLETED": "已完成",
  "CANCELED": "已取消"
};

class PersonalHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      updateModal: false,
      addCarStep: 1,
      bound: 'FAIL',  // 绑定成  FAIL 绑定失败
      failtype: 1, // 0 绑定失败  其他表示信息匹配不正确
      unusedNum: 0,
      usedNum: 0,
      staleNum: 0,
      userInfo: {},
      vin: '',
      tel: '',
      carNum:'',
      engineCode: '',
      loveCarList: [],
      orderObjectData: {}, // 所有订单列表数据
      orderListData: [], // 所有订单数据,包括了后台的页码数据和订单列表
      loveCarInfo: {},//绑定车信息
      errMsg: '',
      mobile: '',
      accessToken: '',
      updateInfo: [],
      jifen:'0',//积分

    }
    this.handleVinChange = this.handleVinChange.bind(this);
    this.handleTelChange = this.handleTelChange.bind(this);
  }
  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken
    this.setState({
      accessToken: accessToken
    })
    this.getCardListNum();
    this.getUserInfo();
    this.getLoveCarList();
    // 获取所有订单列表
    this.queryOrderList()
  }
  queryOrderList(status, pageNum) {
    if(!status) {
      status = ''
    }
    if(!pageNum) {
      pageNum = '1'
    }
    const params = {
      "beginPage": pageNum,
      "memberId": "",
      "orderStatus": '',
      "orderType": status,
      "pageSize": "2"
    }
    personalInfo.orderList(params).then(res => {
      if (res && res.code === '0') {
        const data = res.data;
        this.setState({
          orderObjectData: data || {},
          orderListData: data.dataList || []
        })
      }
    })
  }
  goOrderDetail = (orderNo) => {
    console.log(orderNo)
    window.open(`${config.mallServerPath}/account/orderList/Payfor?id=` + orderNo + '&token=' + this.state.accessToken, '_blank'); //
  }
  goPay = (orderNo) => {
    console.log(orderNo)
    window.open(`${config.mallServerPath}/avalon/success/` + orderNo + '?token=' + this.state.accessToken, '_blank'); //
  }
  goRefund = (orderNo, refundNo) => {
    console.log(orderNo)
    window.open(`${config.mallServerPath}/account/recedeOrder/detail?refundNo=` + refundNo + '&orderNo=' + orderNo + '&token=' + this.state.accessToken, '_blank'); //
  }
  getCardListNum() {
    const data = {};
    data.beginPage = 1;
    data.cardStatus = 'all';
    data.mobile = '';
    data.mallMemberId = '';
    data.pageSize = '';
    personalInfo.cardList(data).then((res) => {
      if(res && res.code =='0') {
        this.setState ({
          unusedNum:res.data.unusedNum,
          usedNum: res.data.usedNum,
          staleNum:res.data.staleNum
        })
      }
    })
  }
  getLoveCarList() {
    personalInfo.loveCarList().then((res)=>{
      if(res && res.code =='0') {
        this.setState({
          loveCarList: [...this.state.loveCarList,...res.data]
        })
      }
      console.log(this.state.loveCarList);
    })
  }
  getUserInfo() {
    personalInfo.userInfo().then((res) => {
      if(res && res.code == '0') {
        this.setState({
          userInfo: res.data,
          mobile: res.data.mobile,
          tel:res.data.mobile,
        })
      }
    })
    personalInfo.getFcUserMemberScore().then((res)=>{
      if(res && res.code == '0'){
        this.setState({
          jifen:res.data.score
        })
      }
    })
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
      updateModal: false,
      addCarStep: 1,
      vin: '',
      loveCarList: []
    });
    this.getLoveCarList();
  }

  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
      addCarStep: 1,
      vin: '',
      loveCarList: []
    });
    this.getLoveCarList();
  }
  handleUpdateOk () {
    this.setState({
      updateModal: false,
    })
  }
  handleUpdateCancel () {
    this.setState({
      updateModal: false,
    })
  }
  //点击修改按钮
  showUpdateModal(index) {
    let currentArr = [];
    currentArr.push(this.state.loveCarList[index]);
    this.setState({
      updateModal: true,
      updateInfo: currentArr
    })
    // console.log(this.state.updateInfo);
  }
  updateCarInfo(carId) {
    // console.log('update',carId);
    if(this.matchCarNum(this.state.carNum)) {
      const param = {};
      param.carNumber = this.state.carNum;
      param.carEngineCode = this.state.engineCode;
      param.id = carId;
      personalInfo.updateCar(param).then((res) => {
        // console.log(res);
        if (res && res.code == '0') {
          message.success('修改成功');
          this.setState({
            loveCarList: []
          })
          this.getLoveCarList();
          this.setState({
            updateModal: false,
            carNum: '',
            engineCode: ''
          })
        }
      })
    } else {
      message.warn('请输入正确的车牌号')
    }
  }
  handleNextStep = () => {
    const {vin, tel, addCarStep} = this.state;
    let mobileReg = /^\d{11}$/;
    if(addCarStep==1) {
      if(vin=='') {
        message.warn("请输入车架号");
        return;
      }else if (vin.length<17) {
        message.warn("请输入17位车架号");
        return;
      }else if(tel =='') {
        message.warn("请输入手机号");
        return;
      }else if (!mobileReg.test(tel)) {
        message.warn('请输入正确的手机号码')
        return
      }else {
        console.log('第一个接口carInfo');
        personalInfo.carInfo(vin, tel).then((res) =>{
          if(res && res.code=='0') {
            this.setState({
              loveCarInfo: res.data,
              addCarStep: this.state.addCarStep + 1
            })
          }else if (res.code == '410') {
            this.setState({
              addCarStep: 3,
              failtype: 0,
              errMsg: res.msg
            })
          }else{
            console.log('第一个接口失败')
            this.setState({
              bound: 'ERR',
              addCarStep: 3,
              failtype:1
            })
          }
        })
      }
    }else if(this.state.addCarStep==2) {
      //调用添加车辆接口
      console.log('第二个接口bindCar');
      if(this.matchCarNum(this.state.carNum)) {
        const data = {};
        data.carCode = this.state.vin;
        data.mobile = this.state.tel;
        // 新增的字段
        data.carNumber = this.state.carNum;
        data.carEngineCode = this.state.engineCode;
        personalInfo.bindCar(data).then((res)=> {
          if(res && res.code == '0') {
            console.log('成功了')
            this.setState({
              addCarStep: this.state.addCarStep + 1,
              bound: 'SUCCESS',
              carNum: '',
              engineCode: ''
            })
          }else {
            console.log(res.msg);
            this.setState({
              carNum: '',
              engineCode: '',
              bound: 'ERR',
              addCarStep: 3,
              failtype: 0,
              errMsg: res.msg
            })
          }
        })
      } else {
        message.warn('请输入正确的车牌号')
      }
    }else{
      // alert(3)
    }
  }

  handleAgainInput=()=>{
    this.setState({
      addCarStep: 1
    })
  }

  handleVinChange(e) {
    this.setState({
      vin: e.target.value
    })
  }
  handleTelChange(e) {
    this.setState({
      tel: e.target.value
    })
  }
  handleCarNumChange(e) {
    this.setState({
      carNum: e.target.value
    })
  }
  // 车牌号校验
  matchCarNum (carNum) {
    console.log(carNum);
    if(carNum) {
      const rule = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|(DF[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})$/;
      return rule.test(carNum);
    } else {
      return true;
    }
  }
  handleEngineCodeChange(e) {
    this.setState({
      engineCode: e.target.value
    })
  }
  toAccountinfo() {
    window.location.href = '/personcenter/accountinfo';
  }
  render() {
    const { addCarStep, bound, failtype, unusedNum, usedNum, staleNum, userInfo, vin, tel,carNum,engineCode, loveCarList, orderListData, orderObjectData, loveCarInfo, errMsg, mobile,updateInfo } = this.state
    // console.log(loveCarInfo);
    return (
      <div className='personalInfo'>
        <div className='personalbaseInfo'>
          <span className='baseInfoLeft'>
            <div className="imgBox">
              <img onClick={this.toAccountinfo} src={userInfo.memberLogo?userInfo.memberLogo:require('../../../assets/img/personsenter/headpic.png')} alt="" style={{cursor:'pointer'}} />
            </div>
            <div>
              <div>
                <h2>{userInfo.loginName}</h2>
                {/* <button>会员卡</button>
                <button>粉丝卡</button> */}
              </div>
              <div className="sexdiv">
                <p>性别：{userInfo.sex?userInfo.sex==0?'女':'男':''}</p>
                <span>粉丝积分：{this.state.jifen}分</span>
              </div>

              <span>
                <Link to='/personcenter/accountinfo'>账户信息<Icon type="right" /></Link>
                <Link to='/personcenter/myfooterprint'>我的足迹<Icon type="right" /></Link>
              </span>
            </div>
          </span>
          <span className='baseInfoRight'>
            <div>
              <span>登录密码</span>
              <i>用于保护账号信息和登录安全</i>
              <NavLink to='/personcenter/modifypwd'>修改密码</NavLink>
            </div>
            <div>
              <span>安全手机</span>
              <i>{mobile.substring(0,3)+'****'+mobile.substring(7,11)}</i>
              <NavLink to='/personcenter/changemobile'>更换手机号</NavLink>
            </div>
          </span>
        </div>
        <div className='propertyInfo'>
          <div className='myaccount'>
            <h2>我的卡券</h2>
            <ul>
              <Link to='/personcenter/mycoupon?status=unused'>
                <li>
                  <i>{ unusedNum==null?0:unusedNum }</i>
                  <span>未使用</span>
                </li>
              </Link>
              <Link to='/personcenter/mycoupon?status=used'>
                <li>
                  <i>{ usedNum==null?0:usedNum  }</i>
                  <span>已使用</span>
                </li>
              </Link>
              <Link to='/personcenter/mycoupon?status=stale'>
                <li>
                  <i>{ staleNum==null?0:staleNum  }</i>
                  <span>已过期</span>
                </li>
              </Link>
            </ul>
          </div>
          <div className='myappoint'>
            <h2>我的预约</h2>
            <ul>
              <Link to='/personcenter/appointmain?name=3'>
                <li>
                  <i className='iFor1'></i>
                  <span>预约试驾</span>
                </li>
              </Link>
              <Link to='/personcenter/appointmain?name=1'>
                <li>
                  <i className='iFor2'></i>
                  <span>预约保养</span>
                </li>
              </Link>
              <Link to='/personcenter/appointmain?name=2'>
                <li>
                  <i className='iFor3'></i>
                  <span>预约维修</span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className='myorder'>
          <div>
            <h2>我的订单</h2>
            <Link to='/personcenter/myorder'>全部订单<Icon type="right" /></Link>
          </div>
          <ul className='orderTitle'>
            <li>商品</li>
            {/*<li>价格</li>*/}
            <li>订单金额</li>
            <li>订单状态</li>
            <li>操作</li>
          </ul>
          <ul className='orderList'>
            {
              orderListData.map((item, index) => {
                return <li key={index}>
                  < div>
                    <span>订单号：<i>{item.orderNo} {moment(item.commitTime).format('YYYY-MM-DD HH:mm:ss')}</i></span>
                    <span>{item.dealerName}</span>
                  </div>
                  <ul>
                    <li>
                      <img src={item.goodsImg} alt=""/>
                      <span>
                        <h3>{item.goodsName}</h3>
                        <p>{item.attrs[1].attributeName}：{item.attrs[1].attributeValueName}</p>
                        <p>{item.attrs[2].attributeName}：{item.attrs[2].attributeValueName}</p>
                      </span>
                    </li>
                    {/*<li>￥268,800.00</li>*/}
                    <li>￥{item.depositPrice}</li>
                    <li>{orderStatus[item.orderStatus]}</li>
                    <li>
                      {/*<button>立即支付</button>*/}
                      {/*<Link to='/personcenter/orderdetail'>订单详情</Link>*/}
                      {
                        item.orderStatus === 'COMMIT' ? (
                            <React.Fragment>
                              <a>
                                <button onClick={this.goPay.bind(this, item.orderNo)}>立即支付</button>
                              </a>
                              <a>
                                <span onClick={this.goOrderDetail.bind(this, item.orderNo)}>订单详情</span>
                              </a>
                            </React.Fragment>
                        ) : item.orderStatus === 'PAID' ? (
                            <React.Fragment>
                              <a>
                                <button onClick={this.goOrderDetail.bind(this, item.orderNo)}>订单详情</button>
                              </a>
                            </React.Fragment>
                        ) : item.orderStatus === 'REFUND' ? (
                            <React.Fragment>
                              <a>
                                <button onClick={this.goRefund.bind(this, item.orderNo, item.refundNo)}>查看退款</button>
                              </a>
                              <a>
                                <span onClick={this.goOrderDetail.bind(this, item.orderNo)}>订单详情</span>
                              </a>
                            </React.Fragment>
                        ) : item.orderStatus === 'CANCELED' ? (
                            <React.Fragment>
                              <a>
                                <button onClick={this.goOrderDetail.bind(this, item.orderNo)}>订单详情</button>
                              </a>
                            </React.Fragment>
                        ) : item.orderStatus === 'COMPLETED' && item.isAssess !== 'Y' ? (
                                <React.Fragment>
                                  <a>
                                    <button onClick={this.goOrderDetail.bind(this, item.orderNo)}>订单详情</button>
                                  </a>
                                </React.Fragment>
                            ) :
                            <a>
                              <button onClick={this.goOrderDetail.bind(this, item.orderNo)}>订单详情</button>
                            </a>

                      }
                    </li>
                  </ul>
                </li>
              })
            }
          </ul>
          {
                orderListData.length=== 0 ? <div className='noData'>
                    <img src={require('../../../assets/img/personsenter/nothing.jpg')} alt=""/>
                    <div className='tip'>暂无记录</div>
                </div> : null
            }
        </div>
        <div className='MyCarBox'>
          <div id = "anchor_myCar" style={{'height': 0, 'position': 'relative', 'top': '-1.8rem', 'overflow': 'hidden'}}></div>
          <div className='MyCarTitle'>
            <h2>我的爱车</h2>
            <span className='addBtn' onClick={this.showModal}>添加爱车</span>
          </div>
          <ul className='myCarTableTitle'>
            <li style={{width: '18%'}}>车型</li>
            {/* 接口返回颜色不准确，因此隐藏，以后可能需要展示 */}
            {/* <li style={{width: '8%'}}>颜色</li> */} 
            <li style={{width: '18%'}}>车架号</li>
            <li style={{width: '12%'}}>车牌号</li>
            <li style={{width: '16%'}}>发动机号</li>
            <li style={{width: '12%'}}>购车时间</li>
            <li style={{width: '24%'}}>操作</li>
          </ul>
          {
            loveCarList.map((v, i) => {
              return <ul className='MyCarList' key={i}>
                <li style={{width: '18%'}}><p>{v.carModelName}</p><p>{v.carVersion}</p></li>
                {/* <li style={{width: '8%'}}>{v.color}</li> */}
                <li style={{width: '18%'}}>{v.carCode}</li>
                <li style={{width: '12%'}}>{v.carnumber}</li>
                <li style={{width: '16%'}}>{v.carenginecode}</li>
                <li style={{width: '12%'}}>{moment.unix(v.buyTime).format('YYYY-MM-DD')}</li>
                <li style={{width: '24%'}}><button className='addBtn' onClick={this.showUpdateModal.bind(this,i)}>修改</button></li>
              </ul>
            })
          }
          {
            loveCarList.length=== 0 ? <div className='noData'>
                <img src={require('../../../assets/img/personsenter/nothing.jpg')} alt=""/>
                <div className='tip'>暂无记录</div>
            </div> : null
          }
        </div>
        <Modal visible={this.state.updateModal}
               onOk={this.handleUpdateOk.bind(this)}
               onCancel={this.handleUpdateCancel.bind(this)}
               footer={null} centered={null}
               wrapClassName='addCarModal'>
          <div className='stepTwo'>
            {
              updateInfo.map((v, i) => {
                return <div className='flexContent' key={i}>
                  <div className='carInfo'>
                    <h1>{v.carModelName}</h1>
                    {/* <span>颜色：{v.color}</span> */}
                    <span>车架号：{v.carCode}</span>
                    <span>购车人手机号：{v.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</span>
                    <span>购车时间：{moment.unix(v.buyTime).format('YYYY-MM-DD')}</span>
                  </div>
                  <div className='inputInfo'>
                    <div className='inputbox'>
                      <label>请输入车牌号：</label>
                      <Input placeholder="请输入车牌号" value={carNum} onChange={this.handleCarNumChange.bind(this)}  style={{ height: '.4rem', width: '3rem' }} />
                    </div>
                    <div className='inputbox'>
                      <label>请输入发动机号：</label>
                      <Input placeholder="请输入发动机号" value={engineCode} onChange={this.handleEngineCodeChange.bind(this)} style={{ height: '.4rem', width: '3rem' }}  />
                    </div>
                    <p className='tip'>注：为了方便您更好的使用违章查询功能，我们建议您输入车牌号与发动机号（非必填）。</p>
                    <span className='bound' onClick={this.updateCarInfo.bind(this,v.id)}>保存</span>
                  </div>
                </div>
              })
            }
          </div>
        </Modal>
        <Modal
          title=""
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          centered={true}
          wrapClassName='addCarModal'
        >
          {
            addCarStep === 1 ?
              <div className='stepOne'>
                <h1>绑定车辆</h1>
                <div className='inputbox'>
                  <label>请输入车架号：</label>
                  <Input placeholder="请输入属于您本人的汽车车架号" maxLength={17} value={vin} onChange={this.handleVinChange} style={{ height: '.4rem', width: '3rem' }} />
                </div>
                <div className='inputbox'>
                  <label>请输入手机号：</label>
                  <Input placeholder="请输入您的手机号" maxLength={11} value={tel} disabled={true} style={{ height: '.4rem', width: '3rem' }}  />
                </div>
                <span className='nextstep' onClick={this.handleNextStep}>下一步</span>
              </div>
              :
              addCarStep === 2 ?
                <div className='stepTwo'>
                  <div className='flexContent'>
                    <div className='carInfo'>
                      <h1>{loveCarInfo.title_short}</h1>
                      {/* <span>颜色：{loveCarInfo.color}</span> */}
                      <span>车架号：{loveCarInfo.carCode}</span>
                      <span>购车人手机号：{loveCarInfo.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</span>
                      <span>购车时间：{loveCarInfo.salesdate}</span>
                    </div>
                    <div className='inputInfo'>
                      <div className='inputbox'>
                        <label>请输入车牌号：</label>
                        <Input placeholder="请输入车牌号" value={carNum} onChange={this.handleCarNumChange.bind(this)}  style={{ height: '.4rem', width: '3rem' }} />
                      </div>
                      <div className='inputbox'>
                        <label>请输入发动机号：</label>
                        <Input placeholder="请输入发动机号" value={engineCode} onChange={this.handleEngineCodeChange.bind(this)} style={{ height: '.4rem', width: '3rem' }}  />
                      </div>
                      <p className='tip'>注：为了方便您更好的使用违章查询功能，我们建议您输入车牌号与发动机号（非必填）。</p>
                      <span className='bound' onClick={this.handleNextStep}>立即绑定</span>
                    </div>
                  </div>
                </div>
                :
                <div className='boundSuccess'>
                  {
                    bound === 'SUCCESS' ?
                      <Fragment>
                        <img src={require('../../../assets/img/personsenter/success-icon.png')} alt="" />
                        <p>绑定爱车成功</p>
                        <span onClick={this.handleCancel}>关闭</span>
                      </Fragment>
                      :
                      <Fragment>
                        <img src={require('../../../assets/img/personsenter/fail-icon.png')} alt="" />
                        {
                          
                          failtype === 0?
                          <Fragment>
                            {/* <p>绑定爱车失败，请重新绑定！</p> */}
                            <p>{errMsg}</p>
                            <span onClick={this.handleCancel}>关闭</span>
                          </Fragment>
                          :
                          <Fragment>
                            <p>车主信息匹配不成功</p>
                            <p>请检查您输入的车架号和手机号是否正确</p>
                            <span onClick={this.handleAgainInput}>重新输入</span>
                            <span onClick={this.handleCancel} className='close'>关闭</span>
                          </Fragment>
                        }
                      </Fragment>
                  }
                </div>
          }
        </Modal>
      </div>
    )
  }
}

export default PersonalHome
