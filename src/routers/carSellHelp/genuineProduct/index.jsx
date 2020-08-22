import React, { Component, Fragment } from 'react'
import './index.less'
import { Modal, Input, Select, message } from 'antd';
import{ carSellHelpInter }from '../../../services/carSellHelpInter'
import{ publicApi, loginApi }from '../../../services/api'

const Option = Select.Option;

class GenuineProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      yongpinfenlei: [
        {
          active: true,
          value: '全部',// 这里有个奇怪的需求 必须注释 这里的全部 不是全部 是不限的意思 和其他选项要独立区分
          id: ''
        }
      ],
      shiyongchexing: [
        {
          active: true,
          value: '全部',// 这里有个奇怪的需求 必须注释 这里的全部 不是全部 是不限的意思 和其他选项要独立区分
          cid: ''
        },
        // {
        //   active: false,
        //   value: 'CROWN皇冠',
        //   cid: ''
        // }
      ],
      detailsVisible: false,
      infoPicVisible: false,
      woyaozixun_FormInfo: {
        nameInput: '请输入姓名',
        sex: '',
        telInput: '请输入手机号',
        tokenTEL: '', // 用户登陆后带入的手机号
        telInputChange: false, // 判断用户是否改变了手机号码，如果改变了就展示获取验证码部分，未改变则隐藏该部分
        codeInput: '',
        province: '请选择省份',
        provinceId: '',
        city: '请选择城市',
        cityId: '',
        dealerName: '下拉选择/输入快捷检索'
      },
      isSearched: false,
      searchType: '',
      currentProvince: '',
      currentCity: '',
      // 短信倒计时
      isShowSendBtn: true,
      seconds: 60,
      // 判断查看详情的弹窗里是否要有 查看加装效果按钮
      watchItButtonIsHas: false,
      // 用品详情接口数据
      productDetail_RESDATA: {},
      // 用品列表接口数据
      getListDetail_RESDATA: [],
      getListDetail_RESDATA2: [],
      sum: 0,
      searchInfo: '',
      // 纯正用品的主键ID
      productID: 0,
      // 省份列表数据
      getProvince_RESDATA: [],
      // 城市列表数据
      getCity_RESDATA: [],
      // 经销商列表数据
      getDealer_RESDATA: [],
      isFixed: false//上滑页面，分类和搜索吸顶
    }
    this.timer = null
    this.interval = null

    this.detailsModalOpenOrClose = this.detailsModalOpenOrClose.bind(this)
    this.provinceChange = this.provinceChange.bind(this)
    this.cityChange = this.cityChange.bind(this)
    this.getMobileVerificationCode = this.getMobileVerificationCode.bind(this)
    this.submit = this.submit.bind(this)
    this.search = this.search.bind(this)
  }
  // 滚动到一定位置，吸顶
  handleScroll(e) {
    let scTop = document.documentElement.scrollTop||document.body.scrollTop
    // console.log('浏览器滚动事件', e, scTop)
    if (scTop > 220) {
      this.setState({
        isFixed: true
      })
    } else {
      this.setState({
        isFixed: false
      })
    }
  }
  // 生命周期
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    this.getClassifyPureProducts()
    let postData = {
      'classify':[],
      'cid': [],
      'name': ''
    }
    this.getListPureProducts(postData)
    this.getProvince()
    this.brandModelsList()
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
    this.timer = null
    this.interval = null
  }
  // ================================================== 接口函数 ==================================================
  // 纯正用品：用品分类
  getClassifyPureProducts() {
    carSellHelpInter.getClassifyPureProducts().then( (res) => {
      if(res && res.code === '0') {
        for ( let i = 0; i < res.data.length; i++) {
          let yongpinfenlei_obj = {
            active: false,
            value: res.data[i].name,
            id: res.data[i].id
          }
          this.state.yongpinfenlei.push(yongpinfenlei_obj)
        }
        this.setState({})
      }
    })
  }
  // 纯正用品：用品列表
  getListPureProducts(postData) {
    carSellHelpInter.getListPureProducts(postData).then( (res) => {
      if(res && res.code === '0') {
        // 如果通过 查询 这种方式查询结果为空 要保持页面不动 仅仅显示搜索结果为0 列表展示的是上一次的搜索结果
        // if (res.data.sum === 0 && this.state.searchType === 'search') {
        //   this.setState({
        //     sum: 0
        //   })
        //   return
        // }
        let arr = []
        let arr2 = []
        for( let [key, value] of Object.entries(res.data)) {
          for ( let [k, va] of Object.entries(value)) {
            va.classify && arr.push(va.classify)
            va.classify && arr2.push(va)
          }
        }
        arr = new Set(arr)
        arr = Array.from(arr)
        this.setState({
          getListDetail_RESDATA: arr,
          getListDetail_RESDATA2: arr2,
          sum: res.data.sum
        })
      }
    })
  }
  // 纯正用品：用品详情
  getDetailPureProducts(id) {
    carSellHelpInter.getDetailPureProducts(id).then( (res) => {
      if(res && res.code === '0') {
        this.setState({
          productDetail_RESDATA: res.data
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
          getCity_RESDATA: res.data
        })
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
  // 经销商查询 (和上面注释掉的接口 区别在于 可以检索 带经纬度)
  searchDealer(params) {
    publicApi.searchDealer(params).then( (res) => {
      if(res && res.code === '0') {
        console.log(res.data)
        this.setState({
          getDealer_RESDATA: res.data.list,
        })
      }
    })
  }
  // 发短信验证码
  sendMobileCode(postData) {
    loginApi.sendMobileCode(postData).then( (res) => {
      if(res && res.code === '0') {
        message.success(res.msg)
        this.setState({
          isShowSendBtn:false
        });
        this.interval = setInterval(() => this.tick(), 1000)
      } else {
        message.error(res.msg)
      }
    })
  }
  // 纯正用品：我要咨询-提交
  consult(postData) {
    carSellHelpInter.consult(postData).then( (res) => {
      if(res && res.code === '0') {
        message.success(res.msg)
        this.setState({
          detailsVisible: false
        })
      } else {
        message.error(res.msg)
      }
    })
  }
  // 纯正用品：我要咨询：带入信息
  getUserInfoPureProducts(postData) {
    carSellHelpInter.getUserInfoPureProducts(postData).then( (res) => {
      if(res && res.code === '0') {
        this.setState({
          woyaozixun_FormInfo: Object.assign(this.state.woyaozixun_FormInfo, {
            nameInput: res.data.nickname,
            sex: res.data.nickname === '0'? '0' : '1',
            telInput: res.data.tel,
            tokenTEL: res.data.tel,
            telInputChange: false
          })
        })
      }
    })
  }
  // 品牌车型：车型展示列表
  brandModelsList() {
    carSellHelpInter.brandModelsList().then((res) => {
      if (res && res.code === '0') {
        let arr = []
        for (let i = 0; i < res.data.length; i++) {
          arr.push(res.data[i].car_series)
        }
        arr = arr.flat()

        for (let i = 0; i < arr.length; i++) {
          let obj = {
            active: false,
            value: arr[i].name,
            cid: arr[i].cid
          }
          this.state.shiyongchexing.push(obj)
        }
        this.setState({})
      }
    })
  }
  // ============================================================================================================
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
  // 分类切换样式
  yongpinfenlei_Check(index) {
    const name = this.state.yongpinfenlei[index].value
    // 全选
    if (index === 0) {
      // 当点击全选的时候 要清楚其他所有选项
      if (!this.state.yongpinfenlei[0].active) {
        this.state.yongpinfenlei[0].active = true
        for(let i = 1; i < this.state.yongpinfenlei.length; i++) {
          this.state.yongpinfenlei[i].active = false
        }
      }
      let cid = []
      for (let i = 1; i < this.state.shiyongchexing.length; i++) {
        if(this.state.shiyongchexing[i].active) {
          cid.push(this.state.shiyongchexing[i].cid)
        }
      }
      let postData = {
        'classify':[],
        'cid': cid,
        'name': this.state.searchInfo
      }
      this.setState({
        isSearched: true,
        searchType: ''
      })
      this.getListPureProducts(postData)
    } else {
      // 其他选项 要影响全选状态 有一个存在 全选就不能亮起（哪怕是都勾选了）
      this.state.yongpinfenlei[index].active = !this.state.yongpinfenlei[index].active
      // this.state.yongpinfenlei[0].active = false
      for (let i = 1; i < this.state.yongpinfenlei.length; i++) {
        if(this.state.yongpinfenlei[i].active) {
          this.state.yongpinfenlei[0].active = false
          break
        }
        this.state.yongpinfenlei[0].active = true
      }

      let classify = []
      for (let i = 1; i < this.state.yongpinfenlei.length; i++) {
        if(this.state.yongpinfenlei[i].active) {
          classify.push(this.state.yongpinfenlei[i].value)
        }
      }
      let cid = []
      for (let i = 1; i < this.state.shiyongchexing.length; i++) {
        if(this.state.shiyongchexing[i].active) {
          cid.push(this.state.shiyongchexing[i].cid)
        }
      }
      let postData = {
        'classify':classify,
        'cid': cid,
        'name': this.state.searchInfo
      }
      this.setState({
        isSearched: true,
        searchType: ''
      })
      this.getListPureProducts(postData)
      // 下面的逻辑保留 避免奇怪的需求变动
      // let check_arr = []
      // for(let i = 1; i < this.state.yongpinfenlei.length; i++) {
      //   if(this.state.yongpinfenlei[i].active) {
      //     check_arr.push(1)
      //   }
      // }
      // if(check_arr.length === this.state.yongpinfenlei.length - 1) {
      //   this.state.yongpinfenlei[0].active = true
      // } else {
      //   this.state.yongpinfenlei[0].active = false
      // }
    }
  }
  // 适用车型切换
  shiyongchexing_Check(index) {
    // 全选
    if (index === 0) {
      // 当点击全选的时候 要清楚其他所有选项
      if (!this.state.shiyongchexing[0].active) {
        this.state.shiyongchexing[0].active = true
        for(let i = 1; i < this.state.shiyongchexing.length; i++) {
          this.state.shiyongchexing[i].active = false
        }
      }
      let classify = []
      for (let i = 1; i < this.state.yongpinfenlei.length; i++) {
        if(this.state.yongpinfenlei[i].active) {
          classify.push(this.state.yongpinfenlei[i].value)
        }
      }
      let postData = {
        'classify':classify,
        'cid': [],
        'name': this.state.searchInfo
      }
      this.setState({
        isSearched: true,
        searchType: ''
      })
      this.getListPureProducts(postData)
    } else {
      // 其他选项 要影响全选状态 有一个存在 全选就不能亮起（哪怕是都勾选了）
      this.state.shiyongchexing[index].active = !this.state.shiyongchexing[index].active
      for (let i = 1; i < this.state.shiyongchexing.length; i++) {
        if(this.state.shiyongchexing[i].active) {
          this.state.shiyongchexing[0].active = false
          break
        }
        this.state.shiyongchexing[0].active = true
      }

      let classify = []
      for (let i = 1; i < this.state.yongpinfenlei.length; i++) {
        if(this.state.yongpinfenlei[i].active) {
          classify.push(this.state.yongpinfenlei[i].value)
        }
      }
      let cid = []
      for (let i = 1; i < this.state.shiyongchexing.length; i++) {
        if(this.state.shiyongchexing[i].active) {
          cid.push(this.state.shiyongchexing[i].cid)
        }
      }
      let postData = {
        'classify':classify,
        'cid': cid,
        'name': this.state.searchInfo
      }
      this.getListPureProducts(postData)
      // 下面的逻辑保留 避免奇怪的需求变动
      // let check_arr = []
      // for(let i = 1; i < this.state.shiyongchexing.length; i++) {
      //   if(this.state.shiyongchexing[i].active) {
      //     check_arr.push(1)
      //   }
      // }
      // if(check_arr.length === this.state.shiyongchexing.length - 1) {
      //   this.state.shiyongchexing[0].active = true
      // } else {
      //   this.state.shiyongchexing[0].active = false
      // }
      this.setState({
        isSearched: true,
        searchType: ''
      })
    }
    this.setState ({})
  }
  search(e) {
    // console.log(e.target.parentNode.children[0].value)
    this.setState({
      searchInfo: e.target.parentNode.children[0].value,
      isSearched: true,
      searchType: 'search'
    }, () => {
      let classify = []
      for (let i = 1; i < this.state.yongpinfenlei.length; i++) {
        if(this.state.yongpinfenlei[i].active) {
          classify.push(this.state.yongpinfenlei[i].value)
        }
      }
      let cid = []
      for (let i = 1; i < this.state.shiyongchexing.length; i++) {
        if(this.state.shiyongchexing[i].active) {
          cid.push(this.state.shiyongchexing[i].cid)
        }
      }
      let postData = {
        'classify':classify,
        'cid': cid,
        'name': this.state.searchInfo
      }
      this.getListPureProducts(postData)
    })
  }
  // 搜索回车事件
  searchEnter(e) {
    // console.log(e.target.value)
    if (e.keyCode === 13) {
      this.setState({
        searchInfo: e.target.value,
        isSearched: true,
        searchType: 'search'
      }, () => {
        let classify = []
        for (let i = 1; i < this.state.yongpinfenlei.length; i++) {
          if(this.state.yongpinfenlei[i].active) {
            classify.push(this.state.yongpinfenlei[i].value)
          }
        }
        let cid = []
        for (let i = 1; i < this.state.shiyongchexing.length; i++) {
          if(this.state.shiyongchexing[i].active) {
            cid.push(this.state.shiyongchexing[i].cid)
          }
        }
        let postData = {
          'classify':classify,
          'cid': cid,
          'name': this.state.searchInfo
        }
        this.getListPureProducts(postData)
      })
    }
    
  }
  // 查看详情弹框
  infoPicOpenOrClose(id, classify,el) {
    //console.log(el)
    if (Object.prototype.toString.call(id) !== '[object Object]') this.getDetailPureProducts(id)
    let reg = /外装/
    this.setState( (pre, props) => {
      return {
        infoPicVisible: !pre.infoPicVisible,
        watchItButtonIsHas: reg.test(classify) && el ? el.cid!=28 : false ? true:false ,
        classify_id: el ? el.cid : null
      }
    })
  }
  // 我要咨询弹框 联动把用品的主键ID带过去
  detailsModalOpenOrClose(id = 0) {
    this.setState( (pre, props) => {
      return {
        detailsVisible: !pre.detailsVisible,
        productID: id
      }
    })

    let userInfo = localStorage.getItem('userInfo')
    let accessToken = userInfo && JSON.parse(userInfo).accessToken
    if (accessToken) {
      let postData = {
        'accessToken': accessToken,
        'id': id
      }
      if (Object.prototype.toString.call(id) !== '[object Object]') this.getUserInfoPureProducts(postData)
    } else {
      this.props.history.push('/login')
    }
  }
  // 性别
  checkSex(sex) {
    if (sex === '1') {
      this.setState ({
        woyaozixun_FormInfo: Object.assign(this.state.woyaozixun_FormInfo, {sex: '1'})
      })
    } else {
      this.setState ({
        woyaozixun_FormInfo: Object.assign(this.state.woyaozixun_FormInfo, {sex: '0'})
      })
    }
  }
  // 省份变动  连带城市变动 经销商变动
  async provinceChange(v) {
    await this.getCity(v.split('*')[0])
    this.timer = setTimeout( () => {
      this.setState({
        woyaozixun_FormInfo: Object.assign(this.state.woyaozixun_FormInfo, {
          provinceId: v.split('*')[0],
          province: v.split('*')[1],
          cityId: this.state.getCity_RESDATA[0].cid || '', // 默认省会城市第一项
          city: this.state.getCity_RESDATA[0].name || '' ,// 默认省会城市第一项
          dealerName: '下拉选择/输入快捷检索'
        })
      })
      let params = {
        provinceid: v,
        cityid: this.state.woyaozixun_FormInfo.cityId,
        dealerName: '',
        cityName: this.state.woyaozixun_FormInfo.city,
        provinceName: this.state.woyaozixun_FormInfo.province
      }
      this.searchDealer(params)
    }, 700)
  }
  // 城市变动  连带经销商变动
  cityChange(v) {
    this.setState({
      woyaozixun_FormInfo: Object.assign(this.state.woyaozixun_FormInfo, {
        cityId: v.split('*')[0],
        city: v.split('*')[1],
        dealerName: '下拉选择/输入快捷检索'
      })
    })
    let params = {
      provinceid: this.state.woyaozixun_FormInfo.provinceId,
      cityid: this.state.woyaozixun_FormInfo.cityId,
      dealerName: '',
      cityName: this.state.woyaozixun_FormInfo.city,
      provinceName: this.state.woyaozixun_FormInfo.province
    }
    this.searchDealer(params)
  }
  // 经销商变动
  // dealerChange(v) {
  //   this.setState({
  //     woyaozixun_FormInfo: Object.assign(this.state.woyaozixun_FormInfo, {dealerName: v})
  //   })
  // }
  handleDealerSearch = (value) => {
    let params = {
      provinceid: this.state.woyaozixun_FormInfo.provinceId,
      cityid: this.state.woyaozixun_FormInfo.cityId,
      dealerName: value,
      cityName: '',
      provinceName: ''
    }
    this.searchDealer(params)
  }

  handleDealerChange = (v) => {
    this.setState({
      woyaozixun_FormInfo: Object.assign(this.state.woyaozixun_FormInfo, {dealerName: v})
    })
  }
  // input 输入框值
  handleInputChange(type, e) {
    this.setState({
      woyaozixun_FormInfo: Object.assign(this.state.woyaozixun_FormInfo, {[type + 'Input']: e.target.value})
    })
    if (type === 'tel') {
      console.log('tel', e.target.value, )
      this.setState({
        woyaozixun_FormInfo: Object.assign(this.state.woyaozixun_FormInfo, {
          telInputChange: e.target.value === this.state.woyaozixun_FormInfo['tokenTEL']? false : true
        })
      })
    }
  }
  // 获取短信验证码
  getMobileVerificationCode() {
    if(!this.state.isShowSendBtn) {
      return
    }
    let postData = {
      "mobile": this.state.woyaozixun_FormInfo['telInput'], // 手机号
      "sendCodeType": "consulting" // 发送短信类型，详见备注信息
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
  // 我的咨询 —— 点击提交
  submit() {
    let userInfo = localStorage.getItem('userInfo')
    let postData = {
      "id": this.state.productID,//纯正用品主键id
      "name": this.state.woyaozixun_FormInfo['nameInput'] === '请输入姓名'? '':this.state.woyaozixun_FormInfo['nameInput'],//用户名
      "sex": this.state.woyaozixun_FormInfo['sex'],//性别，0女，1男
      "tel": this.state.woyaozixun_FormInfo['telInput'] === '请输入手机号'? '':this.state.woyaozixun_FormInfo['telInput'],//手机号
      "code": this.state.woyaozixun_FormInfo['codeInput'],//验证码
      "dealerName": this.state.woyaozixun_FormInfo['dealerName'] === '下拉选择/输入快捷检索'? '':this.state.woyaozixun_FormInfo['dealerName'],//经销商名称
      "accessToken": JSON.parse(userInfo).accessToken//用户请求的token值 是从localStorage里获取
    }
    // 校验区域
    if (!postData.name) {
      message.warning('请输入姓名')
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
    let mobileReg = /^\d{11}$/
    if (!mobileReg.test(postData.tel)) {
      message.warning('输入手机号格式有误')
      return
    }
    if (this.state.woyaozixun_FormInfo['telInputChange']) {
      if (!postData.code) {
        message.warning('请输入手机验证码')
        return
      }
    }
    if (!postData.dealerName) {
      message.warning('请选择经销商')
      return
    }
    this.consult(postData)
  }

  jumpOutsideDetail(e){
    //console.log(e)
    this.props.history.push(`/carSellHelp/PureRAV4?id=${this.state.classify_id}&peijian=${e.id}`)
  }

  render() {
    const {productDetail_RESDATA, yongpinfenlei, getProvince_RESDATA, getCity_RESDATA, getDealer_RESDATA, getListDetail_RESDATA, getListDetail_RESDATA2, woyaozixun_FormInfo} = this.state
    return (
      <div className = 'genuineProduct'>
        <div className = 'genuineProductInfo'>
          <div className = 'bigBanner'>
            <div></div>
            <span></span>
            <p>纯正用品</p>
          </div>
          <div className = 'allAbout'>
            <div>
              <div className='classification'>
                <span>用品分类：</span>
                <ul>
                  {
                    yongpinfenlei.map((item, index) => {
                      return (
                        <li onClick={this.yongpinfenlei_Check.bind(this, index)} key={index}><i
                          className={item.active ? 'i_active' : ''}></i> {item.value}</li>
                      )
                    })
                  }
                </ul>
              </div>
              <div className='applyCarType'>
                <span>适用车型：</span>
                <ul>
                  {
                    this.state.shiyongchexing.map((item, index) => {
                      return (<li key={index} onClick={this.shiyongchexing_Check.bind(this, index)}><i
                        className={item.active ? 'i_active' : ''}></i> {item.value}</li>)
                    })
                  }
                </ul>
              </div>
              <div className='search'>
                <input type="text" placeholder='请输入用品名称，如挡雨板' maxLength='30' onKeyDown = {this.searchEnter.bind(this)}/>
                <span className='searchBtn' onClick={this.search.bind(this)}></span>
                {

                  this.state.isSearched ?
                    this.state.sum === 0 ?
                      <strong>共搜到<i>0</i>条<i>{this.state.searchInfo}</i>相关信息结果</strong>
                      :
                      <strong>共搜到<i>{this.state.sum}</i>条<i>{this.state.searchInfo}</i>相关信息结果</strong>
                    :
                    null
                }
              </div>
            </div>
            <div className='topMargin'>
              {
                getListDetail_RESDATA && getListDetail_RESDATA.map( (item, index) => {
                  return (
                    <Fragment key={index}>
                      <h2>{item}</h2>
                      <ul className = 'list1'>
                        {
                          getListDetail_RESDATA2 && getListDetail_RESDATA2.map( (el, ind) => {
                            if (el.classify === item) {
                              return (
                                <li key = {ind}>
                                  <div>
                                    <img src={el.thumb} alt=""/>
                                  </div>
                                  <h5 dangerouslySetInnerHTML={{ __html:el.name}}></h5>
                                  {/* <p>建议零售价：<span>{el.price}</span></p> */}
                                  <p>建议零售价：<span>请咨询当地经销商</span></p>
                                  <div className = 'btn1' onClick = {this.detailsModalOpenOrClose.bind(this, el.id)}><i></i> 我要咨询</div>
                                  <div className = 'btn2' onClick = {this.infoPicOpenOrClose.bind(this, el.id, el.classify, el)}><i></i> 查看详情</div>
                                </li>
                              )
                            }
                          })
                        }
                      </ul>
                    </Fragment>
                  )
                })
              }
            </div>
            {
              this.state.sum === 0?
              <div className = 'emptyContent'>
                抱歉，暂无搜索结果
              </div>
              :
              null
            }
          </div>
        </div>
        <Modal
          className = 'detailsModal'
          title="我要咨询"
          visible={this.state.detailsVisible}
          onCancel={this.detailsModalOpenOrClose}
          footer = {null}
          destroyOnClose = {!this.state.detailsVisible}
        >
          <div className = 'nameInput'>
            <strong>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</strong>
            <Input placeholder = '请输入姓名' value={woyaozixun_FormInfo.nameInput} onChange = {this.handleInputChange.bind(this, 'name')}/><br/>
            <span className = 'sex_man' onClick = {this.checkSex.bind(this, '1')}><i className = {this.state.woyaozixun_FormInfo['sex'] === '1' ? 'i_active' : null}></i> 先生</span>
            <span className = 'sex_woman' onClick = {this.checkSex.bind(this, '0')}><i className = {this.state.woyaozixun_FormInfo['sex'] === '0' ? 'i_active' : null} ></i> 女士</span>
          </div>
          <div className = 'phoneNumInput'>
            <strong>手&nbsp;&nbsp;机&nbsp;号:</strong>
            <Input placeholder = '请输入手机号' value={woyaozixun_FormInfo.telInput} onChange = {this.handleInputChange.bind(this, 'tel')}/>
            {
              woyaozixun_FormInfo.telInputChange?
              <span onClick = {this.getMobileVerificationCode} aria-disabled={this.state.isShowSendBtn} className = {this.state.isShowSendBtn? '':'sendBtn'}>
                  {this.state.isShowSendBtn ? '获取验证码' : `${this.state.seconds}s后获取`}
              </span>
              :
              null
            }
          </div>
          {
            woyaozixun_FormInfo.telInputChange?
            <div className = 'codeCheckInput'>
              <strong>验&nbsp;&nbsp;证&nbsp;码:</strong>
              <Input placeholder="请输入验证码" onChange = {this.handleInputChange.bind(this, 'code')}/>
            </div>
            :
            null
          }
          <div className = 'dealer'>
            <strong>选择经销商:</strong><br/>
            <Select value = {this.state.woyaozixun_FormInfo.province} className = 'province' onChange = {this.provinceChange}>
              {
                getProvince_RESDATA.map( (item, index) => {
                  return (
                    <Option value={item.cid + '*' + item.name} key={index}>{item.name}</Option>
                  )
                })
              }
            </Select>
            <Select value = {this.state.woyaozixun_FormInfo.city} className = 'city' onChange = {this.cityChange}>
              {
                getCity_RESDATA && getCity_RESDATA.map( (item, index) => {
                  return (
                    <Option value={item.cid + '*' + item.name} key={index}>{item.name}</Option>
                  )
                })
              }
            </Select>
            {/* <Select defaultValue = '请选择经销商' className = 'dealerInput' onChange = {this.dealerChange}>
                  {
                    getDealer_RESDATA && getDealer_RESDATA.map( (item, index) => {
                      return (
                        <Option value={item.name} key={index}>{item.name}</Option>
                      )
                    })
                  }
                </Select> */}
            <Select
              className = 'dealerInput'
              showSearch
              value={this.state.woyaozixun_FormInfo.dealerName}
              placeholder='下拉选择/输入快捷检索'
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={false}
              onSearch={this.handleDealerSearch.bind(this)}
              onChange={this.handleDealerChange.bind(this)}
              notFoundContent={null}
            >
              {
                getDealer_RESDATA && getDealer_RESDATA.map( (item, index) => {
                  return (
                    <Option key={item.name}>{item.name}</Option>
                  )
                })
              }
            </Select>
          </div>
          <div className = 'submitBtn' onClick = {this.submit}>提交</div>
        </Modal>
        <Modal
          className = 'infoPicModal'
          title=""
          visible={this.state.infoPicVisible}
          onCancel={this.infoPicOpenOrClose.bind(this)}
          footer = {null}
        >
          <div className = 'picture'>
            <img src={productDetail_RESDATA.thumb} alt=""/>
          </div>
          {/* <h2>{productDetail_RESDATA.name}<br/><span>建议零售价：<i>{productDetail_RESDATA.price}</i></span></h2> */}
          <h2 className="msgBox">
            <div className="msgName">{productDetail_RESDATA.name}</div>
            <div className="msgMuch">建议零售价：<i>请咨询当地经销商</i></div>
          </h2>
          <div className="magCarName">适用车型：<span>{productDetail_RESDATA.carName}</span></div>
          <p dangerouslySetInnerHTML = {{__html: productDetail_RESDATA.description}}></p>
          {
            this.state.watchItButtonIsHas ? <a className = 'Btn' href='javascript:void(0)' onClick={this.jumpOutsideDetail.bind(this,productDetail_RESDATA)} >查看加装效果</a> : null
          }
        </Modal>
      </div>
    )
  }
}

export default GenuineProduct
