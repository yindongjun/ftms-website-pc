import React, { Component, Fragment } from 'react'
import './index.less'
import { Select, Input, message, Modal} from 'antd';
import { carSellHelpInter } from '../../../services/carSellHelpInter'
import { loginApi, headerApi} from '../../../services/api'
import { querryStringToObject } from '../../../utils/util'

const Option = Select.Option;

class DownloadCenter extends Component {
    constructor(props) {
        super(props)
        this.state = {
          isShowSendBtn: true,
          seconds: 60,
          sexValue: '',
          isRead: true,
          mobileInput: '请输入手机号',
          mobileInputChange: false,
          tokenMobile: '',
          mobileVerificationCodeInput: '',
          nameInput: '请输入姓名',
          carModelName: '',
          downloadFailBox: false,
          // 是否有带入信息
          isHasTaken: false,
          // 更多车型接口数据
          car_series_RESDATA: [],
          // 获取壁纸接口数据
          getWallpaper_RESDATA: [],
          yinsizhengceShow: false,
        }
        this.interval = null
        
        this.readOrNot = this.readOrNot.bind(this)
        this.submit = this.submit.bind(this)
        this.getMobileVerificationCode = this.getMobileVerificationCode.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
    }
    // 生命周期
    componentDidMount() {
      const search = this.props.location.search;
      const params = querryStringToObject(search);
      let brand_id = params.brandId || ''
      let carCid = params.carCid || ''

      let carInfo_session = localStorage.getItem('carInfo_session')
      carInfo_session = JSON.parse(carInfo_session)
      this.setState({
        carModelName: carInfo_session ? carInfo_session.carTitle : '请选择车型'
      })

      let userInfo = localStorage.getItem('userInfo')
      userInfo = JSON.parse(userInfo)
      console.log(userInfo);
      if (userInfo) {
        this.setState({
          sexValue: userInfo.sex === '0'? '0' : '1',
          mobileInput: userInfo.mobile,
          mobileInputTaken: userInfo.mobile ? true : false,
          tokenMobile: userInfo.mobile,
          nameInput: userInfo.realName,
          nameInputTaken: userInfo.realName ? true : false,
          isHasTaken: true
        })
      }
      // this.getMoreCars(aliasName)
      this.brandModelsList()
      this.getWallpaper(carCid)
    }
    componentWillUnmount() {
      clearInterval(this.interval)
    };
    // ================================================== 接口函数 ==================================================
    // 保存下载记录
    insertDownLoadRecord(postData) {
      carSellHelpInter.insertDownLoadRecord(postData).then( (res) => {
        if(res && res.code === '0') {
          // console.log(this.state.getWallpaper_RESDATA);
          if (this.state.getWallpaper_RESDATA[0]) {
            window.location.href = this.state.getWallpaper_RESDATA[0].files 
            message.success('下载成功')  
          } else {
            this.setState({
              downloadFailBox: true
            })
          }
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
          console.log(arr.flat())
          this.setState({
            car_series_RESDATA: arr.flat()
          })
        }
      })
    }
    // 品牌车型：车型详情：更多车型
    // getMoreCars(aliasName) {
    //   carSellHelpInter.getMoreCars(aliasName).then( (res) => {
    //     if(res && res.code === '0') {
    //       this.setState({
    //         car_series_RESDATA: res.data.car_series
    //       })
    //     }
    //   })
    // }
    // 下载中心：获取壁纸
    getWallpaper(cid) {
      carSellHelpInter.getWallpaper(cid).then( (res) => {
        if(res && res.code === '0') {
          this.setState({
            getWallpaper_RESDATA: res.data
          })
          // console.log(this.state.getWallpaper_RESDATA[0])
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
    // 我已经阅读勾选状态
    readOrNot() {
      this.setState ( (pre, props) => {
        return {
          isRead: !pre.isRead
        }
      })
    }
    // input 输入框值
    handleInputChange(type, e) {
      this.setState({
        [type + 'Input']: e.target.value
      })
      if (type === 'mobile') {
        this.setState({
          mobileInputChange: e.target.value === this.state.tokenMobile? false: true
        })
      }
    }
    // select 输入框值  车型变动 要联动精彩壁纸变动
    handleSelectChange(name) {
      this.setState({
        carModelName: name
      })
      let brand_id = 0
      this.state.car_series_RESDATA.forEach( el => {
        if(el.name === name) {
          brand_id = el.cid
        }
      });
      this.getWallpaper(brand_id)
    }

    // 获取短信验证码
    getMobileVerificationCode() {
      if(!this.state.isShowSendBtn) {
        return
      }
      let postData = {
        "mobile": this.state.mobileInput, // 手机号
        "sendCodeType": "downloadCatalogue" // 发送短信类型，详见备注信息
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
  // 隐私政策弹窗开关
  yinsizhengceShowOrNot() {
    this.setState ( (pre, props) => {
      return {
        yinsizhengceShow: !pre.yinsizhengceShow
      }
    })
  }
    // 下载壁纸
    downloadIt(files) {
      window.location.href = files
    }
    // 点击下载
    submit() {
      let postData = {
        "agree": this.state.isRead ? 'Y':'',//是否同意保密协议 不勾选传空 勾选传Y
        "carModelName": this.state.carModelName,//车型
        "mobile": this.state.mobileInput === '请输入手机号'? '': this.state.mobileInput,//手机号
        "mobileVerificationCode": this.state.mobileVerificationCodeInput,//验证码
        "name": this.state.nameInput === '请输入姓名'? '': this.state.nameInput,//用户名
        "sex": this.state.sexValue//性别 0女 1男
      }
      // 校验区域
      if (!postData.carModelName) {
        message.warning('请选择车型')
        return
      }
      if (!postData.name) {
        message.warning('请输入姓名')
        return
      }
      if (!postData.sex) {
        message.warning('请选择性别')
        return
      }
      if (!postData.mobile) {
        message.warning('请输入手机号')
        return
      }
      let mobileReg = /^\d{11}$/
      if (!mobileReg.test(postData.mobile)) {
        message.warning('输入手机号格式有误')
        return
      }
      if (this.state.mobileInputChange) {
        if (!postData.mobileVerificationCode) {
          message.warning('请输入手机验证码')
          return
        }
      }
      if (postData.agree !== 'Y') {
        message.warning('请阅读《隐私协议》')
        return
      }
      this.insertDownLoadRecord(postData)
    }

    // 
    downloadFailOrSuccess() {
      this.setState({
        downloadFailBox: false
      })
    }
    render() {
      const { car_series_RESDATA, getWallpaper_RESDATA} = this.state

      const bgcurl = getWallpaper_RESDATA[0] ? getWallpaper_RESDATA[0].thumb : null
      return (
        <div className = 'downLoadCenter'>
          <div className = 'downLoadCenterInfo'>
            <h2>车型型录</h2>
            {/* <div className = 'bcg' style = {{backgroundImage: `url(${bgcurl})`}}> */}
            <div className = 'bcg'>
              <div className = 'infoList'>
                <div className = 'carModelSelected'>
                  已选车型:
                  <Select placeholder={this.state.carModelName} onChange = {this.handleSelectChange}>
                    {
                      car_series_RESDATA.map( (item, index) => {
                        return (
                          <Option value={item.name} key = {index}>{item.name}</Option>
                        )
                      })
                    }
                  </Select>
                </div>
                <div className = 'nameInput'>
                  姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:
                  <Input placeholder={this.state.nameInput} disabled = {this.state.isHasTaken && this.state.nameInputTaken ? true: false} onChange = {this.handleInputChange.bind(this, 'name')}/><br/>
                  <span className = 'sex_man' onClick = {this.state.isHasTaken? null :this.checkSex.bind(this, '1')}><i className = {this.state.sexValue === '1' ? 'i_active' : null}></i> 先生</span>
                  <span className = 'sex_woman' onClick = {this.state.isHasTaken? null :this.checkSex.bind(this, '0')}><i className = {this.state.sexValue === '0' ? 'i_active' : null} ></i> 女士</span>
                </div>
                <div className = 'phoneNumInput'> 
                  手&nbsp;&nbsp;机&nbsp;号:
                  <Input placeholder={this.state.mobileInput} disabled = {this.state.isHasTaken && this.state.mobileInputTaken ? true: false} onChange = {this.handleInputChange.bind(this, 'mobile')}/>
                  {
                    this.state.mobileInputChange?
                    <span onClick = {this.getMobileVerificationCode} className = {this.state.isShowSendBtn? '':'sendBtn'}>
                      {this.state.isShowSendBtn ? '获取验证码' : `${this.state.seconds}s后获取`}
                    </span>
                    :
                    null
                  }
                </div>
                {
                  this.state.mobileInputChange?
                  <div className = 'codeCheckInput'>
                    验&nbsp;&nbsp;证&nbsp;码:
                    <Input placeholder="请输入验证码" onChange = {this.handleInputChange.bind(this, 'mobileVerificationCode')}/>
                  </div>
                  :
                  null
                }
                <p style={{cursor: 'pointer'}}>
                  <i className = {this.state.isRead ? 'i_active' : null} onClick = {this.readOrNot}></i>
                  &nbsp;&nbsp;我已阅读并接受所有的<span onClick = {this.yinsizhengceShowOrNot.bind(this)}>《隐私政策》</span>
                </p>
                <div style={{cursor: 'pointer'}} className = 'btn' onClick = {this.submit}>下载</div>
              </div>
            </div>
            <p>
              <i>i</i>
              产品(含具体配置、相关细节等)以经销商展示、销售的适用于中国大陆的具体车型及产品为准。本产品网页中提及的所有价格(包括整车、配件、金融产品等)均为厂商建议零售价格。厂商建议零售价格仅为建议，不具有任何约束力，具体的零售交易价格、产品配置及交易细节请与相关授权经销商协商确定。
            </p>
            <p>更多详情，敬请莅临一汽丰田授权的当地经销商，或致电400-810-1210</p>
            {
              getWallpaper_RESDATA.length === 0 || getWallpaper_RESDATA.length === 1 ? null : 
              <Fragment>
                <h2>精彩壁纸（1024 * 768）</h2>
                <ul>
                  {
                    getWallpaper_RESDATA && getWallpaper_RESDATA.slice(1, -1).map( (item, index) => {
                      return (
                        <li key = {index} onClick = {this.downloadIt.bind(this, item.files)}><img src={item.thumb} alt="" style = {{width: '4.47rem', height: '2.7rem'}}/></li>
                      )
                    })
                  }
                  {/* <li style = {{'marginRight': '0.28rem'}}><img src={require('../../../assets/img/carSellHelp/downloadCenter/pic-1.png')} alt="" style = {{width: '4.47rem'}}/></li>
                  <li style = {{'marginRight': '0.28rem'}}><img src={require('../../../assets/img/carSellHelp/downloadCenter/pic-1.png')} alt="" style = {{width: '4.47rem'}}/></li>
                  <li><img src={require('../../../assets/img/carSellHelp/downloadCenter/pic-1.png')} alt="" style = {{width: '4.47rem'}}/></li> */}
                </ul>
              </Fragment>
            }
          </div>
          <Modal
            className = 'yinsi'
            title="隐私政策"
            visible={this.state.yinsizhengceShow}
            onCancel={this.yinsizhengceShowOrNot.bind(this)}
            footer = {null}
          >
            <div className="agreement-text">
              <h5 style = {{fontSize: '0.2rem'}}>一汽丰田顾客个人信息保护基本方针</h5>
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
          <Modal
            className = 'downloadFailBox'
            title=""
            visible={this.state.downloadFailBox}
            onCancel={this.downloadFailOrSuccess.bind(this)}
            footer = {null}
          >
            <span></span>
            <p>下载失败</p>
            <p>该车型型录下目前还没有产品手册哦</p>
          </Modal>
        </div>
      )
    }
}

export default DownloadCenter