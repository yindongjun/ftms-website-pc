import React, { Component } from 'react';
import { Tabs, Select, Slider, Input, message, Modal} from 'antd';
import './financeLease.less'
import { carSellHelpInter } from '../../../services/carSellHelpInter'
import { Number } from 'core-js';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

class FinanceLease extends Component {
    constructor(props) {
        super(props)
        this.state = {
          firstproportion: 20,
          lastproportion: 30,
          jisuanqiType: 'jisuanqiB',
          // 丰田计算表 form1
          jisuanqiA_01chexingshuruxinxi: {
            rongzileixing: '1',
            carModel: '',
            carModelName: '请选择车型',
            carConfig: '',
            carConfigName: '请选择配置',
            shijiPrice: '',
            gouzhishui: '',
            jingpinjiazhuangfei: '',
            shangpaifuwufei: '',
            baoxianfei: '',
            chechuanshui: '',
            all_price: '0'
          },
          // 丰田计算表 form2
          jisuanqiA_02tianxierongzixinxi: {
            qixian: '',
            shoufukuan: '',
            baozhengjin: '',
            weikuanbili: '',
            shoufukuanbiliMax: '40'
          },
          // 一汽计算表 form1
          jisuanqiB_01chexingshuruxinxi: {
            rongzileixing: '1',
            carModel: '',
            carModelName: '请选择车型',
            carConfig: '',
            carConfigName: '请选择配置',
            shijiPrice: '',
            qixian: '',
            shoufubili: 5,
            weikuanbili: '',
            shoufukuanbiliMax: 70
          },
          // 易鑫计算表 form1
          jisuanqiC_01chexingshuruxinxi: {
            rongzileixing: '1',
            carModel: '',
            carModelName: '请选择车型',
            carConfig: '',
            carConfigName: '请选择配置',
            shijiPrice: '',
            gouzhishui: '',
            baoxianjine: '',
            qixian: '',
            zhanghuguanlifei: 0,
            shoufubili: 0,
            weikuanbili: 0,
            GPSjigeleixing: ''
          },
          // 信息提示 流程提示
          messageTitle: '',
          messageIsShow: false,
          messageBoxIsOpen: false,
          // 接口数据
          // 融资租赁促销活动
          getFinanceActiveList_RESDATA: [],
          // 车型列表
          brandModelsList_RESDATA: [],
          // 车型配置和价格
          getVersion_RESDATA: [],
          // 丰田计算结果
          toyotaLease_RESDATA: {},
          // 一汽计算结果
          fawLease_RESDATA: {},
          // 易鑫计算结果
          yiXinLease_RESDATA: {},
          // 易租贷计算器--获取租赁配置信息
          getLeaseConfig_RESDATA: [],
          // 是否计算中
          isLoading: false,
          display_cpjs: 'block',
          display_jsq: 'none'
        }

        this.withinErrorMargin = this.withinErrorMargin.bind(this)
    }
    // 生命周期
    componentDidMount() {
      this.setState({
        jisuanqiType: 'jisuanqiA',
      })
      this.getFinanceActiveList()
      // this.brandModelsList()
      this.getLeaseConfig('toyota_lease')
    }
    // ================================================== 接口函数 ==================================================
    // 金融服务 融资租赁：促销活动列表 0金融促销活动，1融资租赁促销活动
    getFinanceActiveList() {
      // 促销活动分类type 0金融促销活动，1融资租赁促销活动
      let type = 1
      carSellHelpInter.getFinanceActiveList(type).then( (res) => {
        if(res && res.code === '0') {
          let arr = []
          for (let i = 0; i < res.data.length; i++) {
            let obj = {
              cid: res.data[i].cid,
              name: res.data[i].activityCarModels
            }
            arr.push(obj)
          }
          this.setState({
            getFinanceActiveList_RESDATA: res.data,
            brandModelsList_RESDATA: arr
          })
        }
      })
    }
    // 融资租赁：易租贷计算器--丰田租赁
    toyotaLease(postData) {
      carSellHelpInter.toyotaLease(postData).then( (res) => {
        if(res && res.code === '0') {
          this.setState({
            toyotaLease_RESDATA: res.data,
            isLoading: false
          })
        } else {
          this.setState ({
            isLoading: false
          })
        }
      })
    }
    // 融资租赁：易租贷计算器--一汽租赁
    fawLease(postData) {
      carSellHelpInter.fawLease(postData).then( (res) => {
        if(res && res.code === '0') {
          this.setState({
            fawLease_RESDATA: res.data
          })
        }
      })
    }
    // 融资租赁：易租贷计算器--易鑫租赁
    yiXinLease(postData) {
      carSellHelpInter.yiXinLease(postData).then( (res) => {
        if(res && res.code === '0') {
          this.setState({
            yiXinLease_RESDATA: res.data
          })
        }
      })
    }
    // 融资租赁：易租贷计算器--获取租赁配置信息 code值为：丰田租赁：toyota_lease 一汽租赁：faw_lease
    getLeaseConfig(code) {
      carSellHelpInter.getLeaseConfig(code).then( (res) => {
        if(res && res.code === '0') {
          this.setState ({
            getLeaseConfig_RESDATA: res.data
          })
        }
      })
    }
    // 品牌车型：车型展示列表
    // brandModelsList() {
    //   carSellHelpInter.brandModelsList().then((res) => {
    //     if (res && res.code === '0') {
    //       let arr = []
    //       for(let i = 0; i < res.data.length; i++) {
    //         arr.push(res.data[i].car_series)
    //       }
    //       arr = arr.flat()
    //       this.setState({
    //         brandModelsList_RESDATA: arr
    //       })
    //     }
    //   })
    // }
    // 品牌车型：获取车型的价格和版本
    getVersion(cid) {
        carSellHelpInter.getVersion(cid).then((res) => {
          if (res && res.code === '0') {
              this.setState({
                  getVersion_RESDATA: res.data
              })
          }
        })
    }
    // ============================================================================================================

    // 滑动条改变比例值
    proportionChange(jisuanqitype, type, min, max,va) {
      if(jisuanqitype === 'jisuanqiB') {
        if (va <= max && va >= min) {
          this.setState ({
            jisuanqiB_01chexingshuruxinxi: Object.assign(this.state.jisuanqiB_01chexingshuruxinxi, { shoufubili: va})
          })
        }
      } else {
        if(type === 'shou') {
          if (va <= max && va >= min) {
            this.setState ({
              jisuanqiC_01chexingshuruxinxi: Object.assign(this.state.jisuanqiC_01chexingshuruxinxi, { shoufubili: va})
            })
          }
        } else {
          if (va <= max && va >= min) {
            this.setState ({
              jisuanqiC_01chexingshuruxinxi: Object.assign(this.state.jisuanqiC_01chexingshuruxinxi, { weikuanbili: va})
            })
          }
        }
      }
    }
    // 计算类型 选择

    jisuanqiTypeCheck(type) {
      this.setState({
        jisuanqiType: type
      })
      if (type === 'jisuanqiA') this.getLeaseConfig('toyota_lease')
      if (type === 'jisuanqiB') this.getLeaseConfig('faw_lease')
    }
    // select 改变

    handleSelectChange(type, name, e) {
      // console.log(type, name, e)
      this.setState({
        type: Object.assign(this.state[type], {[name]: e})
      })
      
      if (type === 'jisuanqiA_01chexingshuruxinxi') {
        // 车型改变 要联动 配置信息
        if ( name === 'carModel') {
          this.setState({
            jisuanqiA_01chexingshuruxinxi: Object.assign(this.state.jisuanqiA_01chexingshuruxinxi, {
              carModel: e.split('*')[0],
              carModelName: e.split('*')[1],
              // 置空 下级所有联动框
              carConfig: '',
              carConfigName: '请选择配置',
              shijiPrice: '',
              gouzhishui: '',
              jingpinjiazhuangfei: '',
              shangpaifuwufei: '',
              baoxianfei: '',
              chechuanshui: '',
              all_price: '0'
            }),
            // 丰田计算结果
            toyotaLease_RESDATA: {}
          })
          this.getVersion(e.split('*')[0])
        }
        // 配置项改变 联动 实际销售价格改变  合计等价格重制为0后 重新计算
        if ( name === 'carConfig') {
          this.setState({
            type: Object.assign(this.state[type], {
              carConfig: e.split('*')[0],
              carConfigName: e.split('*')[2],
              shijiPrice: e.split('*')[1],
              // 置空 下级所有联动框
              gouzhishui: '',
              jingpinjiazhuangfei: '',
              shangpaifuwufei: '',
              baoxianfei: '',
              chechuanshui: ''
            }),
            // 丰田计算结果
            toyotaLease_RESDATA: {}
          }, () => {
            this.setState({
              type: Object.assign(this.state[type], {'all_price': parseFloat(this.state[type].shijiPrice) })
            })
          })
        }
      }
      if (type === 'jisuanqiA_02tianxierongzixinxi') {
        // 分期改变 要改变首付比例上限 和 尾款比例
        if (name === 'qixian') {
          let arr = this.state.getLeaseConfig_RESDATA
          for(let i = 0; i < arr.length; i++) {
            if (e === arr[i].stageNum) {
              this.setState({
                type: Object.assign(this.state[type], {'shoufukuanbiliMax': arr[i].downPaymentProportion}, {'weikuanbili': arr[i].finalPaymentProportion})
              })
            }
          }
          this.setState({
            // 丰田计算结果
            toyotaLease_RESDATA: {}
          })
        }
      }

      if (type === 'jisuanqiB_01chexingshuruxinxi') {
        // 车型改变 要联动 配置信息
        if ( name === 'carModel') {
          this.setState({
            jisuanqiB_01chexingshuruxinxi: Object.assign(this.state.jisuanqiB_01chexingshuruxinxi, {
              carModel: e.split('*')[0],
              carModelName: e.split('*')[1],
              // 置空 下级所有联动框,
              carConfig: '',
              carConfigName: '请选择配置',
              shijiPrice: ''
            }),
            // 一汽计算结果
            fawLease_RESDATA: {}
          })
          this.getVersion(e.split('*')[0])
        }
        // 配置项改变 联动 实际销售价格改变
        if ( name === 'carConfig') {
          this.setState({
            type: Object.assign(this.state[type], {
              'carConfig': e.split('*')[0],
              'carConfigName': e.split('*')[2],
              // 置空 下级所有联动框,
              'shijiPrice': e.split('*')[1]
            }),
            // 一汽计算结果
            fawLease_RESDATA: {}
          })
        }
        // 分期改变 要改变首付比例上限 和 尾款比例
        if (name === 'qixian') {
          let arr = this.state.getLeaseConfig_RESDATA
          for(let i = 0; i < arr.length; i++) {
            if (e === arr[i].stageNum) {
              this.setState({
                type: Object.assign(this.state[type], {'shoufukuanbiliMax': arr[i].downPaymentProportion}, {'weikuanbili': arr[i].finalPaymentProportion})
              })
            }
          }
          this.setState({
            // 一汽计算结果
            fawLease_RESDATA: {}
          })
        }
      }

      if (type === 'jisuanqiC_01chexingshuruxinxi') {
        // 车型改变 要联动 配置信息
        if ( name === 'carModel') {
          this.setState({
            jisuanqiC_01chexingshuruxinxi: Object.assign(this.state.jisuanqiC_01chexingshuruxinxi, {
              carModel: e.split('*')[0],
              carModelName: e.split('*')[1],
              // 置空 下级所有联动框,
              carConfig: '',
              carConfigName: '请选择配置',
              shijiPrice: ''
            }),
            // 易鑫计算结果
            yiXinLease_RESDATA: {}
          })
          this.getVersion(e.split('*')[0])
        }
        // 配置项改变 联动 实际销售价格改变
        if ( name === 'carConfig') {
          this.setState({
            type: Object.assign(this.state[type], {
              'carConfig': e.split('*')[0],
              'carConfigName': e.split('*')[2],
              // 置空 下级所有联动框,
              'shijiPrice': e.split('*')[1]
            }),
            // 易鑫计算结果
            yiXinLease_RESDATA: {}
          })
        }
        // 分期改变
        if (name === 'qixian') {
          this.setState({
            // 易鑫计算结果
            yiXinLease_RESDATA: {},
          })
        }
      }
      // console.log(this.state[type])
    }
    // input 改变
    handleInputChange(type, name, e) {
      // console.log(type, name, e.target.value, typeof (e.target.value),parseFloat(e.target.value))
      let reg = /^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$/
      this.setState({
        type: Object.assign(this.state[type], {[name]: reg.test(e.target.value)? e.target.value : ''})
      })
      if (type === 'jisuanqiA_01chexingshuruxinxi') {
        // 购置税 加装费用等变动  合计价格跟随变动
        if (name === 'shijiPrice' || name === 'gouzhishui' || name === 'jingpinjiazhuangfei' || name === 'shangpaifuwufei' || name === 'baoxianfei' || name === 'chechuanshui') {
          let a = this.state[type].shijiPrice === '系统计算获得，可修改' ? 0 : parseFloat(this.state[type].shijiPrice)
          let b = this.state[type].gouzhishui === '请输入购置税' ? 0 : parseFloat(this.state[type].gouzhishui)
          let c = this.state[type].jingpinjiazhuangfei === '请输入精品加装费' ? 0 : parseFloat(this.state[type].jingpinjiazhuangfei)
          let d = this.state[type].shangpaifuwufei === '请输入上牌服务费' ? 0 : parseFloat(this.state[type].shangpaifuwufei)
          let e = this.state[type].baoxianfei === '请输入保险费' ? 0 : parseFloat(this.state[type].baoxianfei)
          let f = this.state[type].chechuanshui === '请输入车船税' ? 0 : parseFloat(this.state[type].chechuanshui)
          // console.log(parseFloat(a), parseFloat(b), parseFloat(c), parseFloat(d), parseFloat(e), parseFloat(f));
          // 不为NaN的值进行累加
          let sum = 0;
          if (!isNaN(parseFloat(a))) { sum += a; }
          if (!isNaN(parseFloat(b))) { sum += b; }
          if (!isNaN(parseFloat(c))) { sum += c; }
          if (!isNaN(parseFloat(d))) { sum += d; }
          if (!isNaN(parseFloat(e))) { sum += e; }
          if (!isNaN(parseFloat(f))) { sum += f; }
          // console.log(sum);
          this.setState({
            type: Object.assign(this.state[type], {'all_price': sum})
          })
        }
        // 对不是数字的进行提示，上面的判断，每输入一次，就会判断全部，所以需要单独判断
        if (name === 'shijiPrice') {
          if (isNaN(parseFloat(this.state[type].shijiPrice))) {
            message.warn('请输入数字',2)
          }
        }
        if (name === 'gouzhishui') {
          if (isNaN(parseFloat(this.state[type].gouzhishui))) {
            message.warn('请输入数字',2)
          }
        }
        if (name === 'jingpinjiazhuangfei') {
          if (isNaN(parseFloat(this.state[type].jingpinjiazhuangfei))) {
            message.warn('请输入数字',2)
          }
        }
        if (name === 'shangpaifuwufei') {
          if (isNaN(parseFloat(this.state[type].shangpaifuwufei))) {
            message.warn('请输入数字',2)
          }
        }
        if (name === 'baoxianfei') {
          if (isNaN(parseFloat(this.state[type].baoxianfei))) {
            message.warn('请输入数字',2)
          }
        }
        if (name === 'chechuanshui') {
          if (isNaN(parseFloat(this.state[type].chechuanshui))) {
            message.warn('请输入数字',2)
          }
        }
      }
      if (type === 'jisuanqiA_02tianxierongzixinxi') {
        if (name === 'shoufukuan') {
          if (isNaN(parseFloat(this.state[type].shoufukuan))) {
            message.warn('请输入数字',2)
          }
        }
        if (name === 'baozhengjin') {
          if (isNaN(parseFloat(this.state[type].baozhengjin))) {
            message.warn('请输入数字',2)
          }
        }
      }
    }
    // 生成方案 提交
    submit(type) {
      if (type === 'toyotaLease') {
        let jisuanqiA_01 = this.state.jisuanqiA_01chexingshuruxinxi
        let jisuanqiA_02 = this.state.jisuanqiA_02tianxierongzixinxi
        let postData = {
          financingType: jisuanqiA_01.rongzileixing, // 融资类型：1.直租 2.回租 string
          carModelsId: jisuanqiA_01.carModel,// 车型Id	 string
          carVersionId: jisuanqiA_01.carConfig,// 车型版本Id string
          actualPrice: jisuanqiA_01.shijiPrice,// 实际销售价(元)
          purchaseTax: jisuanqiA_01.gouzhishui === '请输入购置税'? 0:jisuanqiA_01.gouzhishui,// 购置税（元）非必须
          suppliesAddFee: jisuanqiA_01.jingpinjiazhuangfei === '请输入精品加装费'? 0:jisuanqiA_01.jingpinjiazhuangfei,// 用品加装费（元）非必须
          registrationServiceFee: jisuanqiA_01.shangpaifuwufei === '请输入上牌服务费'? 0:jisuanqiA_01.shangpaifuwufei,// 上牌服务费（元）非必须
          premiumFee: jisuanqiA_01.baoxianfei === '请输入保险费'? 0:jisuanqiA_01.baoxianfei,// 保险费（首年）（元）非必须
          carVesselTax: jisuanqiA_01.chechuanshui === '请输入车船税'? 0:jisuanqiA_01.chechuanshui,// 车船税（首年）（元）非必须
          totalFee: jisuanqiA_01.all_price,// 合计（元）
          stageNum: jisuanqiA_02.qixian,// 期限（月）
          downPayment: jisuanqiA_02.shoufukuan === '请输入首付款'? 0:jisuanqiA_02.shoufukuan,// 首付款（元）
          cashDeposit: jisuanqiA_02.baozhengjin === '请输入保证金'? 0:jisuanqiA_02.baozhengjin,// 保证金（元）非必须
          finalPaymentProportion: jisuanqiA_02.weikuanbili// （残值率）尾款比例，0-100，无% string
        }
        // 校验区域
        if (!postData.carModelsId) {
          message.warn('请选择车型')
          // this.setState({
          //   messageIsShow: true,
          //   messageTitle: '请选择车型'
          // })
          return
        }
        if (!postData.carVersionId) {
          message.warn('请选择车型配置')
          return
        }
        if (!postData.stageNum) {
          message.warn('请选择期限')
          return
        }
        if (!postData.downPayment) {
          message.warn('请填写首付款')
          return
        }
        if (postData.downPayment > this.state.jisuanqiA_01chexingshuruxinxi.all_price * (this.state.jisuanqiA_02tianxierongzixinxi.shoufukuanbiliMax /100) ) {
          message.warn('首付款超出上限')
          return
        }
        if (postData.downPayment < this.state.jisuanqiA_01chexingshuruxinxi.all_price * 0.05 ) {
          message.warn('首付款低于下限')
          return
        }
        this.toyotaLease(postData)
        this.setState({
          isLoading: true
        })
      } else if (type === 'fawLease') {
        let jisuanqiB_01 = this.state.jisuanqiB_01chexingshuruxinxi
        let postData = {
          financingType: jisuanqiB_01.rongzileixing, // 融资类型：1.直租 2.回租 string
          carModelsId: jisuanqiB_01.carModel,// 车型Id	 string
          carVersionId: jisuanqiB_01.carConfig,// 车型版本Id string
          actualPrice: jisuanqiB_01.shijiPrice,// 实际销售价(元)
          stageNum: jisuanqiB_01.qixian,// 期限（月）
          downPaymentProportion: jisuanqiB_01.shoufubili,// 首付比例,0-100,不要%
          finalPaymentProportion: jisuanqiB_01.weikuanbili,// 尾款比例，0-100，不要% 非必须
        }
        // 校验区域
        if (!postData.carModelsId) {
          message.warn('请选择车型')
          return
        }
        if (!postData.carVersionId) {
          message.warn('请选择车型配置')
          return
        }
        if (!postData.stageNum) {
          message.warn('请选择期限')
          return
        }
        if (postData.downPaymentProportion === '') {
          message.warn('请选择首付比例')
          return
        }
        this.fawLease(postData)
      } else if (type === 'yiXinLease') {
        let jisuanqiC_01 = this.state.jisuanqiC_01chexingshuruxinxi
        let GPSPRICE = {
          '厂商项目基础价格' : 0,
          '厂商项目1档': 500,
          '厂商项目2档': 1000,
          '厂商项目3档': 1500,
          '厂商项目4档': 2000
        }
        let postData = {
          financingType: jisuanqiC_01.rongzileixing, // 融资类型：1.直租 2.回租 string
          carModelsId: jisuanqiC_01.carModel,// 车型Id	 string
          carVersionId: jisuanqiC_01.carConfig,// 车型版本Id string
          actualPrice: jisuanqiC_01.shijiPrice,// 实际销售价(元)
          purchaseTax: jisuanqiC_01.gouzhishui === '请输入购置税'? 0 : jisuanqiC_01.gouzhishui,// 购置税（元）非必须
          premiumFee:  jisuanqiC_01.baoxianjine === '请输入保险金额'? 0 : jisuanqiC_01.baoxianjine, //保险金额（元）
          stageNum: jisuanqiC_01.qixian,// 期限（月）
          accountManagementFee: jisuanqiC_01.zhanghuguanlifei, // 账户管理费（元）
          downPaymentProportion: jisuanqiC_01.shoufubili,// 首付比例,0-99,不要%
          finalPaymentProportion: jisuanqiC_01.weikuanbili,// 尾款比例，0-99，不要% 非必须
          gpsPriceType: jisuanqiC_01.GPSjigeleixing,// GPS价格类型
          gpsPrice: GPSPRICE[jisuanqiC_01.GPSjigeleixing]// GPS价格
        }
        console.log(postData)
        // 校验区域
        if (!postData.carModelsId) {
          message.warn('请选择车型')
          return
        }
        if (!postData.carVersionId) {
          message.warn('请选择车型配置')
          return
        }
        if (!postData.premiumFee) {
          message.warn('请输入保险金额')
          return
        }
        if (!postData.stageNum) {
          message.warn('请选择期限')
          return
        }
        if (postData.accountManagementFee > (parseFloat(this.state.jisuanqiC_01chexingshuruxinxi.shijiPrice) + parseFloat(this.state.jisuanqiC_01chexingshuruxinxi.gouzhishui)) * 0.05) {
          message.warn('账户管理费超出上限')
          return
        }
        if (postData.downPaymentProportion === '') {
          message.warn('请选择首付比例')
          return
        }
        if (!postData.finalPaymentProportion === '') {
          message.warn('请选择尾款比例')
          return
        }
        if (!postData.gpsPriceType) {
          message.warn('请选择GPS价格类型')
          return
        }
        this.yiXinLease(postData)
      }
    }
    // 浮点运算误差判断 返回布尔值 小于误差为===   大于则不全等
    withinErrorMargin(left, right) {
      return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
    }

    
    // 信息框
    // messageBoxIsOpen() {
    //   this.setState( (pre, props) => {
    //     return {
    //       messageIsShow: !pre.messageIsShow
    //     }
    //   })
    // }
    render() {
      const {getFinanceActiveList_RESDATA, brandModelsList_RESDATA, getVersion_RESDATA, toyotaLease_RESDATA, getLeaseConfig_RESDATA,
        fawLease_RESDATA, yiXinLease_RESDATA, jisuanqiA_01chexingshuruxinxi, jisuanqiA_02tianxierongzixinxi,
        jisuanqiB_01chexingshuruxinxi, jisuanqiC_01chexingshuruxinxi} =this.state
      // 活动标题
      const title = getFinanceActiveList_RESDATA[0] ? getFinanceActiveList_RESDATA[0].activityTitle : null
      let _this = this
      function tabChange (e) {
        e === '1' && show1()
        e === '2' && show2()
      } 
      function show1() {
        _this.setState({
          display_cpjs: 'block',
          display_jsq: 'none'
        })
      }
      function show2() {
        _this.setState({
          display_cpjs: 'none',
          display_jsq: 'block'
        })
      }
      return (
        <div className = 'financeLeaseInfo'>
          <div className = 'bannerImg'>
            <div></div>
            <p>融资租赁</p>
            <span></span>
          </div>
          <Tabs defaultActiveKey="1" onTabClick = {tabChange}>
            <TabPane tab="易租贷产品介绍" key="1">
              
            </TabPane>
            <TabPane tab="易租贷计算器" key="2">
              
            </TabPane>
            
          </Tabs>
          <div className="cpjx" style={{display: this.state.display_cpjs}}>
              <div className = 'title1'>
                <h1>惬享美好汽车生活，从易租贷开始</h1>
                <p>易租贷为一汽丰田首款品牌融资租赁产品，</p>
                <p>尊享私人定制，为您提供丰富灵活的用车金融方案，实现超低首付、超低月供，首付低至5%，让您无需一次性投入大笔资金，就可先享心仪座驾及配套服务。</p>
                <p style = {{'marginBottom': '0.5rem'}}>合同期末，根据您的需求，还可以自由选择续租、购买、返还或置换，让您轻松实现驾趣梦想，畅快出行。</p>                
                <p style = {{'marginBottom': '0.95rem'}}>支持车型：
                  {
                    brandModelsList_RESDATA.map( (item, index) => {
                      if( index === brandModelsList_RESDATA.length -1) {
                        return ( ` ${item.name} ` )
                      } else {
                        return ( ` ${item.name} 、` )
                      }
                    } )
                  }
                  <span>。</span>
                </p>                
                <h2>{title}</h2>
              </div>
              <ul className = 'activeList'>
                {
                  getFinanceActiveList_RESDATA.map( (item, index) => {
                    return (
                      <li key = {index}>
                        <img src={item.pcActivityPic} style={{width: '2.64rem'}} alt=""/>
                        <h1>{item.activityCarModels}</h1>
                        {/* <h2>厂家支援金最高 <span> 5500元</span></h2> */}
                        <h2>{item.activityContent}</h2>
                      </li>
                    )
                  })
                }
              </ul>
              <div className = 'step'>
                <h2>流程</h2>
                <ul>
                  <li>
                    <i></i>
                    <span>选择心仪车辆</span>
                  </li>
                  <li className = 'line'></li>
                  <li>
                    <i></i>
                    <span>商定易租贷方案</span>
                  </li>
                  <li className = 'line'></li>
                  <li>
                    <i></i>
                    <span>资料准备提交</span>
                  </li>
                  <li className = 'line'></li>
                  <li>
                    <i></i>
                    <span>审批</span>
                  </li>
                  <li className = 'line'></li>
                  <li>
                    <i></i>
                    <span>签约</span>
                  </li>
                  <li className = 'line'></li>
                  <li>
                    <i></i>
                    <span>提车</span>
                  </li>
                </ul>
                {/* <div className = 'line'>
                </div> */}
                <div className = 'bcg'>
                  <dl>
                    <dd>
                      <h2><b>无</b>压力</h2>
                      <p>首付5%起，月供低</p>
                      <i></i>
                    </dd>
                    <dd>
                      <h2><b>不</b>操心</h2>
                      <p>购置税、保险精品、上牌站式</p>
                      <p>打包服务</p>
                      <i></i>
                    </dd>
                    <dd>
                      <h2><b>够</b>灵活</h2>
                      <p>合同期满，</p>
                      <p>还换、买、续任你选</p>
                      <i></i>
                    </dd>
                    <dd>
                      <h2><b>巧</b>组合</h2>
                      <p>金融方案任你组合</p>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className = 'moneyPlan'>
                <h2>易租贷产品计划</h2>
                <ul>
                  <li>
                    <h5>首付无忧计划</h5>
                    <p><span style = {{marginRight: '0.2rem'}}>首付5%</span><span style = {{width: '4.75rem'}}>24期尾款60% <i>/</i> 36期尾款50% <i>/</i> 48期尾款30%</span></p>
                    <img src={require('../../../assets/img/carSellHelp/financeLease/首付无忧计划.png')} alt="" style = {{width: '5.08rem'}}/>
                    <strong>首付5%</strong>
                    <b>尾款30%-60%</b>
                    <i>24-48期月供</i>
                  </li>
                  <li>
                    <h5>月供无忧计划</h5>
                    <p style = {{ marginBottom: '0.58rem'}}><span style = {{width: '100%'}}>24期首付40%，尾款60% <i>/</i> 36期首付50%，尾款50% <i>/</i> 48期首付70%，尾款30%</span></p>
                    <img src={require('../../../assets/img/carSellHelp/financeLease/月供无忧计划.png')} alt="" style = {{width: '5.08rem'}}/>
                    <strong style = {{ top: '1.2rem', left: '0.3rem'}}>首付40%-70%</strong>
                    <b style = {{ top: '1.2rem'}}>尾款30%-60%</b>
                    <i>24-48期月供</i>
                  </li>
                </ul>
                <dl className = 'somePlans'>
                  <h5>随心专享计划</h5>
                  <dd style = {{ background: 'rgb(211, 176, 120)'}}><span style = {{ color: '#fff'}}>首付</span><span style = {{ color: '#fff'}}>期限</span><span style ={{border: 'none', color: '#fff'}}>尾款</span></dd>
                  <dd><span>5%-40%</span><span>24</span><span style ={{border: 'none'}}>60%</span></dd>
                  <dd><span>5%-50%</span><span>36</span><span style ={{border: 'none'}}>50%</span></dd>
                  <dd><span>5%-70%</span><span>48</span><span style ={{border: 'none'}}>30%</span></dd>
                </dl>
                <p><span>*</span>一汽丰田可能会根据市场情况对以上产品作出调整</p>
              </div>
              <div className = 'partner'>
                <h2>合作伙伴</h2>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
          </div>
            <div className="cpjx" style={{display: this.state.display_jsq}}>
              {/* 选项卡下三种类型的计算器 A:丰田 B:一汽 C:易鑫 */}
              <h3 className = 'jisuanqiType'>
                <span onClick = {this.jisuanqiTypeCheck.bind(this, 'jisuanqiA')} className = {this.state.jisuanqiType === 'jisuanqiA'? 'type_active' : ''}>丰田租赁</span>
                <span onClick = {this.jisuanqiTypeCheck.bind(this, 'jisuanqiB')} className = {this.state.jisuanqiType === 'jisuanqiB'? 'type_active' : ''}>一汽租赁</span>
                <span onClick = {this.jisuanqiTypeCheck.bind(this, 'jisuanqiC')} className = {this.state.jisuanqiType === 'jisuanqiC'? 'type_active' : ''}>易鑫租赁</span>
              </h3>
              <div className = 'jisuanqi'>
                {
                  this.state.jisuanqiType === 'jisuanqiA'?
                  <div className = 'jisuanqiA' style = {{display: 'block'}}>
                    <div className = 'A_form_1'>
                      <h3><span>01</span>选择车型输入信息</h3>
                      <div className = 'A_form_1_info'>
                        <div className = 'rongzileixing'>
                          <span className = 'star'>*</span>融资类型:
                          <Select defaultValue="1" onChange = {this.handleSelectChange.bind(this, 'jisuanqiA_01chexingshuruxinxi', 'rongzileixing')}>
                            <Option value="1">直租</Option>
                            <Option value="2">回租</Option>
                          </Select>
                        </div>
                        <div className = 'carModelSelected'>
                          <span className = 'star'>*</span>车型:
                          <Select value = {jisuanqiA_01chexingshuruxinxi.carModelName}
                                  onChange = {this.handleSelectChange.bind(this, 'jisuanqiA_01chexingshuruxinxi', 'carModel')}>
                            {
                              brandModelsList_RESDATA && brandModelsList_RESDATA.map( (item, index) => {
                                return (
                                  <Option value={`${item.cid}*${item.name}`} key = {index}>{item.name}</Option>
                                )
                              })
                            }
                          </Select>
                        </div>
                        <div className = 'carModelConfigure'>
                          <span className = 'star'>*</span>配置:
                          <Select value = {jisuanqiA_01chexingshuruxinxi.carConfigName}
                                  onChange = {this.handleSelectChange.bind(this, 'jisuanqiA_01chexingshuruxinxi', 'carConfig')}>
                            {
                              getVersion_RESDATA && getVersion_RESDATA.map( (item, index) => {
                                return (
                                  <Option value={`${item.id}*${item.shop_price}*${item.version + item.name.replace('<sup>+</sup>', '+')}`} key = {index}>{item.version + item.name.replace('<sup>+</sup>', '+')}</Option>
                                )
                              })
                            }
                          </Select>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder='系统计算获得，可修改'
                                value = {this.state.jisuanqiA_01chexingshuruxinxi.shijiPrice}
                                onChange = {this.handleInputChange.bind(this, 'jisuanqiA_01chexingshuruxinxi', 'shijiPrice')}/>
                          <span>实际销售价格（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder='请输入购置税'
                                value = {this.state.jisuanqiA_01chexingshuruxinxi.gouzhishui}
                                onChange = {this.handleInputChange.bind(this, 'jisuanqiA_01chexingshuruxinxi', 'gouzhishui')}/>
                          <span>购置税（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder='请输入精品加装费'
                                value = {this.state.jisuanqiA_01chexingshuruxinxi.jingpinjiazhuangfei}
                                onChange = {this.handleInputChange.bind(this, 'jisuanqiA_01chexingshuruxinxi', 'jingpinjiazhuangfei')}/>
                          <span>精品加装费（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder='请输入上牌服务费'
                                value = {this.state.jisuanqiA_01chexingshuruxinxi.shangpaifuwufei}
                                onChange = {this.handleInputChange.bind(this, 'jisuanqiA_01chexingshuruxinxi', 'shangpaifuwufei')}/>
                          <span>上牌服务费（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder='请输入保险费'
                                value = {this.state.jisuanqiA_01chexingshuruxinxi.baoxianfei}
                                onChange = {this.handleInputChange.bind(this, 'jisuanqiA_01chexingshuruxinxi', 'baoxianfei')}/>
                          <span>保险费（首年）（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder='请输入车船税'
                                value = {this.state.jisuanqiA_01chexingshuruxinxi.chechuanshui}
                                onChange = {this.handleInputChange.bind(this, 'jisuanqiA_01chexingshuruxinxi', 'chechuanshui')}/>
                          <span>车船税（首年）（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia' disabled>
                          <input type="text" value = {this.state.jisuanqiA_01chexingshuruxinxi.all_price} disabled/>
                          <span>合计（元）:</span>
                        </div>
                      </div>
                    </div>
                    <div className = 'A_form_2'>
                      <h3><span>02</span>填写融资信息</h3>
                      <div className = 'A_form_2_info'>
                        <div className = 'qixian'>
                          <span className = 'star'>*</span>期限(月）:
                          <Select placeholder="请选择分期数" onChange = {this.handleSelectChange.bind(this, 'jisuanqiA_02tianxierongzixinxi', 'qixian')}>
                            {
                              getLeaseConfig_RESDATA && getLeaseConfig_RESDATA.map( (item, index) => {
                                return (
                                  <Option value={item.stageNum} key = {index}>{item.stageNum}</Option>
                                )
                              })
                            }
                          </Select>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <strong style = {{position: 'absolute', left: '0', top: '-0.1rem', fontWeight: 'normal', fontSize: '0.12rem' }}>合计的5%-{this.state.jisuanqiA_02tianxierongzixinxi.shoufukuanbiliMax}%</strong>
                          {
                            this.state.jisuanqiA_02tianxierongzixinxi.qixian && this.state.jisuanqiA_01chexingshuruxinxi.all_price !== '系统计算获得，可修改' ? 
                            <strong style = {{position: 'absolute', right: '0', top: '-0.1rem', fontWeight: 'normal', fontSize: '0.12rem' }}>
                                {
                                  // 金额下限是 合计 * 0.05
                                  (this.state.jisuanqiA_01chexingshuruxinxi.all_price * 0.05).toFixed(2)
                                }~
                                {
                                  // 金额上限是 合计 * 首款比例上限
                                  ( this.state.jisuanqiA_01chexingshuruxinxi.all_price * (this.state.jisuanqiA_02tianxierongzixinxi.shoufukuanbiliMax /100) ).toFixed(2)
                                }
                            </strong> 
                            : 
                            <strong style = {{position: 'absolute', right: '0', top: '-0.1rem', fontWeight: 'normal', fontSize: '0.12rem' }}>- -</strong>                         
                          }
                          <i className = 'star'>*</i>
                          <input type="text" placeholder='请输入首付款' value = {this.state.jisuanqiA_02tianxierongzixinxi.shoufukuan}
                                onChange = {this.handleInputChange.bind(this, 'jisuanqiA_02tianxierongzixinxi', 'shoufukuan')}/>
                          <span>首付款（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder='请输入保证金' value = {this.state.jisuanqiA_02tianxierongzixinxi.baozhengjin}
                                onChange = {this.handleInputChange.bind(this, 'jisuanqiA_02tianxierongzixinxi', 'baozhengjin')}/>
                          <span>保证金（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" disabled value = {`${this.state.jisuanqiA_02tianxierongzixinxi.weikuanbili}%`}/>
                          <span>(残值率) 尾款比例:</span>
                        </div>
                        {
                          this.state.isLoading? 
                          <div className = 'btnLoading'>生成中...</div>
                          :
                          <div className = 'btn' onClick = {this.submit.bind(this, 'toyotaLease')}>生成方案</div>
                        }
                      </div>
                    </div>
                    <div className = 'A_form_3'>
                      <h3><span>03</span>生成融资方案</h3>
                      <div className = 'A_form_3_info'>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder = {toyotaLease_RESDATA.actualPrice} disabled/>
                          <span>实际销售价（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder = {toyotaLease_RESDATA.financingAmount} disabled/>
                          <span>融资金额（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder = {toyotaLease_RESDATA.monthlyRent} className = 'red_input' disabled/>
                          <span>月租金（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder = {toyotaLease_RESDATA.finalPaymentProportion? toyotaLease_RESDATA.finalPaymentProportion + '%' : null} disabled/>
                          <span>尾款比例:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder = {toyotaLease_RESDATA.finalPayment} disabled/>
                          <span>期末留购价（元）:</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  :this.state.jisuanqiType === 'jisuanqiB'?
                    <div className = 'jisuanqiB' style = {{display: 'block'}}>
                    <div className = 'B_form_1'>
                      <h3><span>01</span>选择车型输入信息</h3>
                      <div className = 'B_form_1_info'>
                        <div className = 'rongzileixing'>
                          <span className = 'star'>*</span>融资类型:
                          <Select defaultValue="1" onChange = {this.handleSelectChange.bind(this, 'jisuanqiB_01chexingshuruxinxi', 'rongzileixing')}>
                            <Option value="1">直租</Option>
                            <Option value="2">回租</Option>
                          </Select>
                        </div>
                        <div className = 'carModelSelected'>
                          <span className = 'star'>*</span>车型:
                          <Select value={jisuanqiB_01chexingshuruxinxi.carModelName} onChange = {this.handleSelectChange.bind(this, 'jisuanqiB_01chexingshuruxinxi', 'carModel')}>
                            {
                              brandModelsList_RESDATA && brandModelsList_RESDATA.map( (item, index) => {
                                return (
                                  <Option value={`${item.cid}*${item.name}`} key = {index}>{item.name}</Option>
                                )
                              })
                            }
                          </Select>
                        </div>
                        <div className = 'carModelConfigure'>
                          <span className = 'star'>*</span>配置:
                          <Select value={jisuanqiB_01chexingshuruxinxi.carConfigName} onChange = {this.handleSelectChange.bind(this, 'jisuanqiB_01chexingshuruxinxi', 'carConfig')}>
                            {
                              getVersion_RESDATA && getVersion_RESDATA.map( (item, index) => {
                                return (
                                  <Option value={`${item.id}*${item.shop_price}*${item.version + item.name.replace('<sup>+</sup>', '+')}`} key = {index}>{item.version + item.name.replace('<sup>+</sup>', '+')}</Option>
                                )
                              })
                            }
                          </Select>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder='系统计算获得，可修改'
                                value = {this.state.jisuanqiB_01chexingshuruxinxi.shijiPrice}
                                onChange = {this.handleInputChange.bind(this, 'jisuanqiB_01chexingshuruxinxi', 'shijiPrice')}/>
                          <span>实际销售价（元）:</span>
                        </div>
                        <div className = 'qixian'>
                          <span className = 'star'>*</span>期限（月）:
                          <Select placeholder="请选择分期数" onChange = {this.handleSelectChange.bind(this, 'jisuanqiB_01chexingshuruxinxi', 'qixian')}>
                            {
                              getLeaseConfig_RESDATA && getLeaseConfig_RESDATA.map( (item, index) => {
                                return (
                                  <Option value={item.stageNum} key ={index}>{item.stageNum}</Option>
                                )
                              })
                            }
                          </Select>
                        </div>
                        <div className = 'moneyProportion'>
                          <p><span className = 'star'>*</span>首款比例: <strong>{this.state.jisuanqiB_01chexingshuruxinxi.shoufubili}%</strong></p>
                          <Slider value={this.state.jisuanqiB_01chexingshuruxinxi.shoufubili} onChange = {this.proportionChange.bind(this, 'jisuanqiB', 'shou', 5, this.state.jisuanqiB_01chexingshuruxinxi.shoufukuanbiliMax)} tooltipVisible = {false} min = {0} max = {100}/>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" disabled value = {this.state.jisuanqiB_01chexingshuruxinxi.weikuanbili + '%'} style = {{color: 'burlywood', fontSize: '0.2rem', fontWeight: '700'}}/>
                          <span>尾款比例:</span>
                        </div>
                        <div className = 'btn' onClick = {this.submit.bind(this, 'fawLease')}>生成方案</div>
                      </div>
                    </div>
                    <div className = 'B_form_2'>
                      <h3><span>02</span>生成融资方案</h3>
                      <div className = 'B_form_2_info'>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder = {fawLease_RESDATA.actualPrice} disabled/>
                          <span>实际销售价（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder = {fawLease_RESDATA.drawThePrincipal} disabled/>
                          <span>计息本金（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder = {fawLease_RESDATA.downPayment} className = 'red_input' disabled/>
                          <span>首付金额（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder = {fawLease_RESDATA.finalPaymentProportion? fawLease_RESDATA.finalPaymentProportion+'%': null} disabled/>
                          <span>尾款比例:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder = {fawLease_RESDATA.finalPayment} disabled/>
                          <span>尾款金额（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder = {fawLease_RESDATA.monthlyRent} className = 'red_input' disabled/>
                          <span>月供（元）:</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  :this.state.jisuanqiType === 'jisuanqiC'?
                  <div className = 'jisuanqiC' style = {{display: 'block'}}>
                    <div className = 'C_form_1'>
                      <h3><span>01</span>选择车型输入信息</h3>
                      <div className = 'C_form_1_info'>
                        <div className = 'rongzileixing'>
                          <span className = 'star'>*</span>融资类型:
                          <Select defaultValue="直租" onChange = {this.handleSelectChange.bind(this, 'jisuanqiC_01chexingshuruxinxi', 'rongzileixing')}>
                            <Option value="直租">直租</Option>
                            <Option value="回租">回租</Option>
                          </Select>
                        </div>
                        <div className = 'carModelSelected'>
                          <span className = 'star'>*</span>车型:
                          <Select value={jisuanqiC_01chexingshuruxinxi.carModelName} onChange = {this.handleSelectChange.bind(this, 'jisuanqiC_01chexingshuruxinxi', 'carModel')}>
                            {
                              brandModelsList_RESDATA && brandModelsList_RESDATA.map( (item, index) => {
                                return (
                                  <Option value={`${item.cid}*${item.name}`} key = {index}>{item.name}</Option>
                                )
                              })
                            }
                          </Select>
                        </div>
                        <div className = 'carModelConfigure'>
                          <span className = 'star'>*</span>配置:
                          <Select value={jisuanqiC_01chexingshuruxinxi.carConfigName} onChange = {this.handleSelectChange.bind(this, 'jisuanqiC_01chexingshuruxinxi', 'carConfig')}>
                            {
                              getVersion_RESDATA && getVersion_RESDATA.map( (item, index) => {
                                return (
                                  <Option value={`${item.id}*${item.shop_price}*${item.version + item.name.replace('<sup>+</sup>', '+')}`} key = {index}>{item.version + item.name.replace('<sup>+</sup>', '+')}</Option>
                                )
                              })
                            }
                          </Select>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder='系统计算获得，可修改'
                                value = {this.state.jisuanqiC_01chexingshuruxinxi.shijiPrice}
                                onChange = {this.handleInputChange.bind(this, 'jisuanqiC_01chexingshuruxinxi', 'shijiPrice')}/>
                          <span>实际销售价（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder='请输入购置税'
                                value = {this.state.jisuanqiC_01chexingshuruxinxi.gouzhishui}
                                onChange = {this.handleInputChange.bind(this, 'jisuanqiC_01chexingshuruxinxi', 'gouzhishui')}/>
                          <span>购置税（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <i className = 'star'>*</i>
                          <input type="text" placeholder='请输入保险金额'
                                value = {this.state.jisuanqiC_01chexingshuruxinxi.baoxianjine}
                                onChange = {this.handleInputChange.bind(this, 'jisuanqiC_01chexingshuruxinxi', 'baoxianjine')}/>
                          <span>保险金额（元）:</span>
                        </div>
                        <div className = 'qixian'>
                          <span className = 'star'>*</span>期限（月）:
                          <Select placeholder="请选择分期数" onChange = {this.handleSelectChange.bind(this, 'jisuanqiC_01chexingshuruxinxi', 'qixian')}>
                            <Option value="12">12</Option>
                            <Option value="24">24</Option>
                            <Option value="36">36</Option>
                            <Option value="48">48</Option>
                          </Select>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          {
                            this.state.jisuanqiC_01chexingshuruxinxi.shijiPrice !== '系统计算获得，可修改' &&
                            this.state.jisuanqiC_01chexingshuruxinxi.shijiPrice ?
                            // &&
                            // this.state.jisuanqiC_01chexingshuruxinxi.gouzhishui !== '请输入购置税' &&
                            // this.state.jisuanqiC_01chexingshuruxinxi.gouzhishui ?
                            // 账户管理费（元）=（实际销售价+购置税）×5%
                            <strong className='countFee'>最大为
                              { (parseFloat(this.state.jisuanqiC_01chexingshuruxinxi.shijiPrice) +
                                (this.state.jisuanqiC_01chexingshuruxinxi.gouzhishui ?
                                  parseFloat(this.state.jisuanqiC_01chexingshuruxinxi.gouzhishui) : 0))*0.05.toFixed(2)
                              }
                            </strong>
                            :
                            <strong className='countFee'>- -</strong>
                          }
                          <input type="text" placeholder = '请输入账户管理费' onChange = {this.handleInputChange.bind(this, 'jisuanqiC_01chexingshuruxinxi', 'zhanghuguanlifei')}/>
                          <span>账户管理费（元）:</span>
                        </div>
                        <div className = 'moneyProportion'>
                          <p><span className = 'star'>*</span>首款比例: <strong>{this.state.jisuanqiC_01chexingshuruxinxi.shoufubili}%</strong></p>
                          <Slider value={this.state.jisuanqiC_01chexingshuruxinxi.shoufubili} onChange = {this.proportionChange.bind(this, 'jisuanqiC', 'shou', 0, 99)} tooltipVisible = {false} min = {0} max = {99}/>
                        </div>
                        <div className = 'money2Proportion'>
                          <p><span className = 'star'>*</span>尾款比例: <strong>{this.state.jisuanqiC_01chexingshuruxinxi.weikuanbili}%</strong></p>
                          <Slider value={this.state.jisuanqiC_01chexingshuruxinxi.weikuanbili} onChange = {this.proportionChange.bind(this, 'jisuanqiC', 'wei',0 ,99)} tooltipVisible = {false} min = {0} max = {99}/>
                        </div>
                        <div className = 'GPStype'>
                          <span className = 'star'>*</span>GPS价格类型:
                          <Select placeholder="请选择GPS价格类型" onChange = {this.handleSelectChange.bind(this, 'jisuanqiC_01chexingshuruxinxi', 'GPSjigeleixing')}>
                            <Option value="厂商项目基础价格">厂商项目基础价格</Option>
                            <Option value="厂商项目1档">厂商项目1档</Option>
                            <Option value="厂商项目2档">厂商项目2档</Option>
                            <Option value="厂商项目3档">厂商项目3档</Option>
                            <Option value="厂商项目4档">厂商项目4档</Option>
                          </Select>
                        </div>
                        <div className = 'btn' onClick = {this.submit.bind(this, 'yiXinLease')}>生成方案</div>
                      </div>
                    </div>
                    <div className = 'C_form_2'>
                      <h3><span>02</span>生成融资方案</h3>
                      <div className = 'C_form_2_info'>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder = {yiXinLease_RESDATA.actualPrice} disabled/>
                          <span>实际销售价（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder = {yiXinLease_RESDATA.downPayment} className = 'red_input' disabled/>
                          <span>首付金额（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder = {yiXinLease_RESDATA.finalPayment} disabled/>
                          <span>尾款金额（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder = {yiXinLease_RESDATA.finalPaymentProportion ? yiXinLease_RESDATA.finalPaymentProportion+'%':null} disabled/>
                          <span>尾款比例:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder = {yiXinLease_RESDATA.gpsPrice} disabled/>
                          <span>GPS价格（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder = {yiXinLease_RESDATA.financingAmount} disabled/>
                          <span>合计融资额（元）:</span>
                        </div>
                        <div className = 'shijixiaoshoujia'>
                          <input type="text" placeholder = {yiXinLease_RESDATA.monthlyRent} className = 'red_input' disabled/>
                          <span>月供（元）:</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  :null
                }
                  <span className="bottomWarning">注：以上数据仅供参考，实际支付金额以最终客户贷款合同为准，详情可咨询当地经销商</span>
              </div>
            </div>
          {/* <Modal
            className = 'message'
            title=''
            visible={this.state.messageIsShow}
            onCancel={this.messageBoxIsOpen.bind(this)}
            footer = {null}
          >
            <div className = 'tipPic'>X</div>
            <h2>{this.state.messageTitle}</h2>
            <div className = 'btn' onClick = {this.messageBoxIsOpen.bind(this)}>关闭</div>
          </Modal> */}
        </div>
      )
    }
}

export default FinanceLease