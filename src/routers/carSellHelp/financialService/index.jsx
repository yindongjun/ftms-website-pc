import React, { Component } from 'react';
import { Tabs, Select, Slider, message } from 'antd';
import { carSellHelpInter } from '../../../services/carSellHelpInter'
import { querryStringToObject } from '../../../utils/util'
import './index.less'


const TabPane = Tabs.TabPane;
const Option = Select.Option;

class FinancialService extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstNum: 0,
      firstproportion: 0,
      firstproportionMax: 0,
      lastNum: 0,
      lastproportion: 0,
      lastproportionMax: 0,
      // 车型id
      carModelSelect: '',
      carName: '请选择车型',
      // 配置id
      configSelect: '',
      configName: '请选择配置',
      // 金融机构id
      financialNameSelect: '',
      financialNameShowSelect: '请选择金融机构',
      financialProductTypeSelect: '',
      financialProductTypeShowSelect: '请选择金融产品类型',
      financialProductNameSelect: '',
      financialProductNameShowSelect: '请选择金融产品',
      fenqiSelect: '',
      fenqiShowSelect: '请选择分期',
      shijiPrice: '系统计算获得，可修改',
      // 二维码展示框
      erweimaBoxIsShow: false,
      // 根据银行类型显示到底是
      feilvORlilv: '费率',
      // 页面默认展示标签 antd
      currentActiveKey: '1',
      // === 接口数据 ===
      // 促销活动列表
      getFinanceActiveList_RESDATA: [],
      getFinanceActiveList_RESDATA_title: '',
      // 车型列表
      financeVehicleList_RESDATA: [],
      // 车型配置和价格
      VehicleVersionList_RESDATA: [],
      // 获取金融机构
      financeOrganList_RESDATA: [],
      // 金融产品类型
      financeProductTypeList_RESDATA: [],
      // 金融产品名称
      financeProductList_RESDATA: [],
      // 分期数用
      financeProductDetail_RESDATA: [],
      // 生成方案结果
      financeProgram_RESDATA: [],
      display_txjr: 'block', //此状态机为display的取值
      display_jsq: 'none'
    }
    this.timerNum = null
    this.submit = this.submit.bind(this)
  }
  // 生命周期
  componentDidMount() {
    this.getFinanceActiveList()
    this.financeVehicleList()

    const search = this.props.location.search;
    const params = querryStringToObject(search);

    let carInfo_session = sessionStorage.getItem('carInfo_session')
    let carName = carInfo_session ?
      JSON.parse(carInfo_session).carTitle ?
        JSON.parse(carInfo_session).carTitle
        :
        ''
      :
      ''

    this.setState({
      currentActiveKey: params.currentActiveKey ? params.currentActiveKey : '1',
      display_txjr: params.currentActiveKey === '2' ? 'none' : 'block',
      display_jsq: params.currentActiveKey === '2' ? 'block' : 'none',
      // currentActiveKey: '1',
      carModelSelect: params.carCid || '',
      carName: params.carCid ? carName : '请选择车型'
    })
    // 如果有带入信息，就带入后 调用该车型配置接口
    if (params.carCid) {
      // 如果该车型不在 金融服务活动计划之内 就 不要调用接口 避免初始化页面就报错
      this.timerNum = setTimeout(() => {
        for (let i = 0; i < this.state.financeVehicleList_RESDATA.length; i++) {
          if (this.state.financeVehicleList_RESDATA[i].cid === Number(params.carCid)) {
            this.VehicleVersionList(params.carCid)
          }
        }
      }, 500)
    }
  }
  componentWillUnmount() {
    this.timerNum = null
  }
  // ================================================== 接口函数 ==================================================
  // 促销活动列表
  getFinanceActiveList() {
    // 促销活动分类type 0金融促销活动，1融资租赁促销活动
    let type = 0
    carSellHelpInter.getFinanceActiveList(type).then((res) => {
      if (res && res.code === '0') {
        this.setState({
          getFinanceActiveList_RESDATA: res.data,
          getFinanceActiveList_RESDATA_title: res.data[0].activityTitle
        })
      }
    })
  }
  // 金融服务：车型列表
  financeVehicleList() {
    carSellHelpInter.financeVehicleList().then((res) => {
      if (res && res.code === '0') {
        this.setState({
          financeVehicleList_RESDATA: res.data
        })
      }
    })
  }
  // 金融服务：车型配置和价格
  VehicleVersionList(cid) {
    carSellHelpInter.VehicleVersionList(cid).then((res) => {
      if (res && res.code === '0') {
        this.setState({
          VehicleVersionList_RESDATA: res.data
        })
      }
    })
  }
  // 金融服务：获取金融机构
  financeOrganList(cid) {
    carSellHelpInter.financeOrganList(cid).then((res) => {
      if (res && res.code === '0') {
        // console.log('======= 获取金融机构 =======')
        // console.log(res.data)
        this.setState({
          financeOrganList_RESDATA: res.data
        })
      }
    })
  }
  // 金融服务：获取产品类型
  financeProductTypeList(versionId, organId) {
    carSellHelpInter.financeProductTypeList(versionId, organId).then((res) => {
      if (res && res.code === '0') {
        // console.log('======= 获取产品类型 =======')
        // console.log(res.data)
        this.setState({
          financeProductTypeList_RESDATA: res.data
        })
      }
    })
  }
  // 金融服务：获取产品列表 -- 名称
  financeProductList(typeId, organId, versionId) {
    carSellHelpInter.financeProductList(typeId, organId, versionId).then((res) => {
      if (res && res.code === '0') {
        // console.log('======= 获取产品列表 =======')
        // console.log(res.data)
        this.setState({
          financeProductList_RESDATA: res.data
        })
      }
    })
  }
  // 金融服务：产品详情 -- 分期数
  financeProductDetail(productId, versionId) {
    carSellHelpInter.financeProductDetail(productId, versionId).then((res) => {
      if (res && res.code === '0') {
        // console.log('======= 获取产品详情 =======')
        // console.log(res.data)
        this.setState({
          financeProductDetail_RESDATA: res.data.stageList
        })
      }
    })
  }
  // 金融服务：生成方案
  financeProgram(postData) {
    carSellHelpInter.financeProgram(postData).then((res) => {
      if (res && res.code === '0') {
        this.setState({
          financeProgram_RESDATA: res.data
        })
      }
    })
  }
  // ============================================================================================================

  // 滑动条改变比例值
  proportionChange(type, min, max, va) {
    // console.log(type, va)
    if (type === 'first') {
      if (va <= max && va >= min) {
        this.setState({
          firstNum: va
        })
      }
    } else {
      if (va <= max && va >= min) {
        this.setState({
          lastNum: va
        })
      }
    }
  }
  handleSelectChange(type, v) {
    console.log(type, v)
    this.setState({
      [type + 'Select']: v
    })

    if (type === 'carModel') {
      this.setState({
        carModelSelect: v.split('*')[0],
        carName: v.split('*')[1],
        // 置空下级 联动框
        configSelect: '',
        configName: '请选择配置',
        shijiPrice: '系统计算获得，可修改',
        financialNameSelect: '',
        financialNameShowSelect: '请选择金融机构',
        financialProductTypeSelect: '',
        financialProductTypeShowSelect: '请选择金融产品类型',
        financialProductNameSelect: '',
        financialProductNameShowSelect: '请选择金融产品',
        fenqiSelect: '',
        fenqiShowSelect: '请选择分期',
        firstproportion: 0,
        firstproportionMax: 0,
        lastproportion: 0,
        lastproportionMax: 0,
        firstNum: 0,
        lastNum: 0,
        // 生成方案结果
        financeProgram_RESDATA: []
      })
      this.VehicleVersionList(v.split('*')[0])
    } else if (type === 'config') {
      let arr = v.split('*')
      this.financeOrganList(arr[0])
      this.setState({
        configSelect: arr[0],
        configName: arr[2],
        shijiPrice: arr[1],
        // 置空 下级联动框
        financialNameSelect: '',
        financialNameShowSelect: '请选择金融机构',
        financialProductTypeSelect: '',
        financialProductTypeShowSelect: '请选择金融产品类型',
        financialProductNameSelect: '',
        financialProductNameShowSelect: '请选择金融产品',
        fenqiSelect: '',
        fenqiShowSelect: '请选择分期',
        firstproportion: 0,
        firstproportionMax: 0,
        lastproportion: 0,
        lastproportionMax: 0,
        firstNum: 0,
        lastNum: 0,
        // 生成方案结果
        financeProgram_RESDATA: []
      })
    } else if (type === 'financialName') {
      // console.log(v.split('*')[0], v.split('*')[1])
      this.setState({
        financialNameSelect: v.split('*')[0],
        financialNameShowSelect: v.split('*')[1],
        // 置空 下级联动框
        financialProductTypeSelect: '',
        financialProductTypeShowSelect: '请选择金融产品类型',
        financialProductNameSelect: '',
        financialProductNameShowSelect: '请选择金融产品',
        fenqiSelect: '',
        fenqiShowSelect: '请选择分期',
        firstproportion: 0,
        firstproportionMax: 0,
        lastproportion: 0,
        lastproportionMax: 0,
        firstNum: 0,
        lastNum: 0,
        // 生成方案结果
        financeProgram_RESDATA: []
      })
      this.financeProductTypeList(this.state.configSelect, v.split('*')[0])
      // 如果选择的是一汽金融 要有二维码 丰田金融的organID 是 1
      if (v.split('*')[0] === '1') {
        this.setState({
          erweimaBoxIsShow: true
        })
      } else {
        this.setState({
          erweimaBoxIsShow: false
        })
      }
      // 如果是选择的 招商银行 中国银行 建设银行 邮政储蓄银行 为费率
      if (v.split('*')[1] === '招商银行' || v.split('*')[1] === '中国银行' || v.split('*')[1] === '建设银行' || v.split('*')[1] === '邮政储蓄银行') {
        this.setState({
          feilvORlilv: '费率'
        })
      } else {
        this.setState({
          feilvORlilv: '利率'
        })
      }
    } else if (type === 'financialProductType') {
      let typeId = v.split('*')[0]
      let organId = v.split('*')[1]
      this.setState({
        financialProductTypeSelect: organId,
        financialProductTypeShowSelect: v.split('*')[2],
        // 置空 下级联动框
        financialProductNameSelect: '',
        financialProductNameShowSelect: '请选择金融产品',
        fenqiSelect: '',
        fenqiShowSelect: '请选择分期',
        firstproportion: 0,
        firstproportionMax: 0,
        lastproportion: 0,
        lastproportionMax: 0,
        firstNum: 0,
        lastNum: 0,
        // 生成方案结果
        financeProgram_RESDATA: []
      })
      // 联动 金融产品列表
      this.financeProductList(typeId, organId, this.state.configSelect)
    } else if (type === 'financialProductName') {
      this.setState({
        financialProductNameSelect: v.split('*')[0],
        financialProductNameShowSelect: v.split('*')[1],
        // 置空 下级联动框
        fenqiSelect: '',
        fenqiShowSelect: '请选择分期',
        firstproportion: 0,
        firstproportionMax: 0,
        lastproportion: 0,
        lastproportionMax: 0,
        firstNum: 0,
        lastNum: 0,
        // 生成方案结果
        financeProgram_RESDATA: []
      })
      this.financeProductDetail(v.split('*')[0], this.state.configSelect)
    } else if (type === 'fenqi') {
      // 联动 首付比例 范围 初始值等
      this.setState({
        firstproportion: Number(v.split('*')[0]),
        firstproportionMax: Number(v.split('*')[1]),
        lastproportion: Number(v.split('*')[2]),
        lastproportionMax: Number(v.split('*')[3]),
        fenqiSelect: Number(v.split('*')[4]),
        fenqiShowSelect: Number(v.split('*')[4]),
        // 同时直接将 首付和尾款比例设定为 当前最小值
        firstNum: Number(v.split('*')[0]),
        lastNum: Number(v.split('*')[2]),
        // 置空生成方案结果
        financeProgram_RESDATA: []
      })
    }
  }

  // 实际售价 价格更改
  shijiPriceChange(e) {
    this.setState({
      shijiPrice: e.target.value
    })
  }

  // 生成方案 提交信息
  submit() {
    let postData = {
      cid: this.state.carModelSelect, // 车型id
      versionId: this.state.configSelect, // 车版ID  配置ID
      organId: this.state.financialNameSelect, // 金融机构id
      productId: this.state.financialProductNameSelect, // 金融产品ID
      downPaymentProportion: this.state.firstNum, // 首付比例
      finalPaymentProportion: this.state.lastNum, // 尾款比例
      carPrice: this.state.shijiPrice, // 实际价格
      stages: this.state.fenqiSelect // 分期数
    }
    // 校验区域
    if (!postData.cid) {
      message.warn('请选择车型')
      return
    }
    if (!postData.versionId) {
      message.warn('请选择车型配置')
      return
    }
    if (!postData.organId) {
      message.warn('请选择金融机构')
      return
    }
    if (!this.state.financialProductTypeSelect) {
      message.warn('请选择金融产品类型')
      return
    }
    if (!postData.productId) {
      message.warn('请选择金融产品')
      return
    }
    if (postData.downPaymentProportion === '') {
      message.warn('请选择首付比例')
      return
    }
    if (!postData.stages) {
      message.warn('请选择分期数')
      return
    }

    this.financeProgram(postData)
  }
  render() {
    const { getFinanceActiveList_RESDATA, financeVehicleList_RESDATA, VehicleVersionList_RESDATA, financeOrganList_RESDATA, financeProductTypeList_RESDATA
      , financeProductList_RESDATA, financeProductDetail_RESDATA, financeProgram_RESDATA } = this.state;
    console.log(VehicleVersionList_RESDATA);
    let _this = this
    function checkBox(ev) {
      _this.setState({
        currentActiveKey: ev
      })
      console.log(ev)
      ev === '1' && show1()
      ev === '2' && show2()
    }
    function show1() {
      _this.setState({
        display_txjr: 'block', //此状态机为display的取值
        display_jsq: 'none'
      })
    }
    function show2() {
      _this.setState({
        display_txjr: 'none', //此状态机为display的取值
        display_jsq: 'block'
      })
    }
    return (
      <div className='financialServiceInfo'>
        <div className='bannerImg'>
          <i></i>
          <span></span>
          <b>金融服务</b>
          <strong></strong>
        </div>
        <Tabs activeKey={this.state.currentActiveKey} onTabClick={checkBox}>
          <TabPane tab="贴心金融" key="1">


          </TabPane>
          <TabPane tab="金融计算器" key="2">

          </TabPane>
        </Tabs>
        <div className="txjr" style={{ display: this.state.display_txjr }}>
          <div className='title1'>
            <p>一汽丰田与两家金融公司、多家银行及融资租赁公司开展汽车个人贷款业务。</p>
            <p style={{ 'marginBottom': '0.95rem' }}>客户需要贷款购车时，可以根据自身条件选择不同的金融机构，经销店会为客户提供便捷、安心的一站式服务。</p>
            {/* <h2>12-2月主要金融促销活动</h2> */}
            <h2>{getFinanceActiveList_RESDATA && this.state.getFinanceActiveList_RESDATA_title}</h2>
          </div>
          <div className="activeBoard">
            <ul className='activeList'>
              {
                getFinanceActiveList_RESDATA.map((item, index) => {
                  return (
                    <li key={index}>
                      <span style={{ 'backgroundImage': `url(${item.pcActivityPic})` }}></span>
                      <dl>
                        <dd style={{ borderBottom: 'none' }} title={item.activityContent[0] || null}>{item.activityContent[0] || null}</dd>
                        <dd style={{ borderBottom: 'none' }} title={item.activityContent[1] || null}>{item.activityContent[1] || null}</dd>
                        <dd style={{ borderBottom: 'none' }} title={item.activityContent[2] || null}>{item.activityContent[2] || null}</dd>
                        <dd style={{ borderBottom: 'none' }} title={item.activityContent[3] || null}>{item.activityContent[3] || null}</dd>
                        <dd style={{ borderBottom: 'none' }} title={item.activityContent[4] || null}>{item.activityContent[4] || null}</dd>
                        <dd style={{ borderBottom: 'none' }} title={item.activityContent[5] || null}>{item.activityContent[5] || null}</dd>
                        <dd>{item.activityContent[6] || null}</dd>
                      </dl>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className='showPanter'>
            <h2>金融合作平台</h2>
            <ul>
              <li>
                <img src={require('../../../assets/img/carSellHelp/financialService/一汽金融.png')} alt="" />
              </li>
              <li>
                <img src={require('../../../assets/img/carSellHelp/financialService/丰田金融.png')} alt="" />
              </li>
              <li>
                <img src={require('../../../assets/img/carSellHelp/financialService/招商银行.png')} alt="" />
              </li>
              <li>
                <img src={require('../../../assets/img/carSellHelp/financialService/中国银行.png')} alt="" />
              </li>
              <li>
                <img src={require('../../../assets/img/carSellHelp/financialService/平安银行.png')} alt="" />
              </li>
              <li>
                <img src={require('../../../assets/img/carSellHelp/financialService/中国建设银行.png')} alt="" />
              </li>
              <li>
                <img src={require('../../../assets/img/carSellHelp/financialService/中国邮政储蓄银行.png')} alt="" />
              </li>
              <li>
                <img src={require('../../../assets/img/carSellHelp/financialService/中信银行.png')} alt="" />
              </li>
            </ul>
          </div>
          <div className='newProduct'>
            <h2>金融创新产品</h2>
            <p>一汽丰田在传统定额本息产品之外，还开发了金融创新产品，给不同客户提供丰富的选择</p>
            <ul>
              <li>
                <img src={require('../../../assets/img/carSellHelp/financialService/贷-安享贷.png')} alt="" style={{ width: '1.31rem', marginRight: '0.08rem' }} />
                <div>
                  <h5>安享贷</h5>
                  <p>超低首付，2-3年低利息金融产品，赠送客户一年三大保障延保产品</p>
                </div>
              </li>
              <li>
                <img src={require('../../../assets/img/carSellHelp/financialService/贷-附加贷.png')} alt="" style={{ width: '1.04rem', marginRight: '0.15rem' }} />
                <div>
                  <h5>附加贷</h5>
                  <p>购置税、保险、精品、保养等贷款享受低利息</p>
                </div>
              </li>
              <li>
                <img src={require('../../../assets/img/carSellHelp/financialService/贷-田园贷.png')} alt="" style={{ width: '0.9rem' }} />
                <div>
                  <h5>田园贷</h5>
                  <p>农村户籍客户专属绿色审批通道</p>
                </div>
              </li>
            </ul>
            <span>注：具体详情请咨询当地经销商</span>
          </div>
        </div>
        <div className="txjr" style={{ display: this.state.display_jsq }}>
          <div className='calculator'>
            {/* 左侧表 */}
            <div className='carDetailInfo'>
              <h2><span>01</span>选择车型输入信息</h2>
              <div className='carDetailInfo_form'>
                <div className='carModelSelected'>
                  <span className='star'>*</span>车型:
                      <Select value={this.state.carName} onChange={this.handleSelectChange.bind(this, 'carModel')}>
                    {
                      financeVehicleList_RESDATA && financeVehicleList_RESDATA.map((item, index) => {
                        return (
                          <Option value={`${item.cid}*${item.cName}`} key={index}>{item.cName}</Option>
                        )
                      })
                    }
                  </Select>
                </div>
                <div className='carModelConfigure'>
                  <span className='star'>*</span>配置:
                      <Select value={this.state.configName} onChange={this.handleSelectChange.bind(this, 'config')}>
                    {
                      VehicleVersionList_RESDATA && VehicleVersionList_RESDATA.map((item, index) => {
                        return (
                          <Option value={`${item.versionId}*${item.price}*${item.version}`} key={index}>
                            {item.version}
                          </Option>
                        )
                      })
                    }
                  </Select>
                </div>
                <div className='shijixiaoshoujia'>
                  <input type="number" value={this.state.shijiPrice} onChange={this.shijiPriceChange.bind(this)} />
                  <span><i>*</i>售价（元）:</span>
                </div>
                <div className='financialInstitution'>
                  <span className='star'>*</span>金融机构:
                      <Select value={this.state.financialNameShowSelect} onChange={this.handleSelectChange.bind(this, 'financialName')}>
                    {
                      financeOrganList_RESDATA && financeOrganList_RESDATA.map((item, index) => {
                        return (
                          <Option value={item.organId + '*' + item.organName} key={index} disabled={/敬请期待/.test(item.organName) ? true : false}>
                            {item.organName}
                          </Option>
                        )
                      })
                    }
                  </Select>
                </div>
                <div className='financialType'>
                  <span className='star'>*</span>金融产品类型:
                      <Select value={this.state.financialProductTypeShowSelect} onChange={this.handleSelectChange.bind(this, 'financialProductType')}>
                    {
                      financeProductTypeList_RESDATA && financeProductTypeList_RESDATA.map((item, index) => {
                        return (
                          <Option value={`${item.typeId}*${item.organId}*${item.typeName}`} key={index}>
                            {item.typeName}
                          </Option>
                        )
                      })
                    }
                  </Select>
                </div>
                <div className='financialName'>
                  <span className='star'>*</span>金融产品名称:
                      <Select value={this.state.financialProductNameShowSelect} onChange={this.handleSelectChange.bind(this, 'financialProductName')}>
                    {
                      financeProductList_RESDATA && financeProductList_RESDATA.map((item, index) => {
                        return (
                          <Option value={`${item.productId}*${item.productName}`} key={index}>
                            {item.productName}
                          </Option>
                        )
                      })
                    }
                  </Select>
                </div>
                <div className='stagesNum'>
                  <span className='star'>*</span>分期数:
                      <Select value={this.state.fenqiShowSelect} onChange={this.handleSelectChange.bind(this, 'fenqi')}>
                    {
                      financeProductDetail_RESDATA && financeProductDetail_RESDATA.map((item, index) => {
                        return (
                          <Option
                            value={`${item.downPaymentFrom}*${item.downPaymentTo}*${item.finalPaymentFrom}*${item.finalPaymentTo}*${item.stages}*${index}`} key={index}>
                            {item.stages}
                          </Option>
                        )
                      })
                    }
                  </Select>
                </div>
                {
                  this.state.firstproportion === 0 && this.state.firstproportionMax === 0 ? null :
                    <div className='moneyProportion'>
                      <p><span className='star'>*</span>首款比例: <strong>{this.state.firstNum}%</strong></p>
                      <Slider value={this.state.firstNum} onChange={this.proportionChange.bind(this, 'first', this.state.firstproportion, this.state.firstproportionMax)} tooltipVisible={false} min={0} max={100} />
                    </div>
                }
                {
                  this.state.lastproportion === 0 && this.state.lastproportionMax === 0 ? null :
                    <div className='money2Proportion'>
                      <p><span className='star'>*</span>尾款比例: <strong>{this.state.lastNum}%</strong></p>
                      <Slider value={this.state.lastNum} onChange={this.proportionChange.bind(this, 'last', this.state.lastproportion, this.state.lastproportionMax)} tooltipVisible={false} min={0} max={100} />
                    </div>
                }
                <div className='planBtn' onClick={this.submit}>生成方案</div>
              </div>
            </div>
            {/* 右侧表 */}
            <div className='creatPlan'>
              <h2><span>02</span>生成金融方案</h2>
              <div className='creatPlan_Info'>
                <p><span>售价（元）：</span><i>{financeProgram_RESDATA.carPrice}</i></p>
                <p><span>首付金额（元）：</span><i>{financeProgram_RESDATA.downPaymentMoney}</i></p>
                <p><span>贷款金额（元）：</span><i style={{ color: 'red' }}>{financeProgram_RESDATA.loanMoney}</i></p>
                <p><span>月供（元）：</span><i style={{ color: 'red' }}>{financeProgram_RESDATA.monthPaymentMoney}</i></p>
                <p><span>{this.state.feilvORlilv}：</span><i>{financeProgram_RESDATA.rate}%</i></p>
                <p><span>尾款金额（元）：</span><i style={{ color: 'red' }}>{financeProgram_RESDATA.finalPaymentMoney}</i></p>
                {
                  this.state.erweimaBoxIsShow && financeProgram_RESDATA.carPrice ?
                    <div className='erweima'></div> : null
                }
              </div>
            </div>
            <div className='tips_p'>注：以上数据仅供参考，实际支付金额以最终客户贷款合同为准，详情可咨询当地经销商</div>
          </div>
        </div>
      </div>
    )
  }
}

export default FinancialService