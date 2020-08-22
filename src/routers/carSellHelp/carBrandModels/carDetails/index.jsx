import React, { Component, Fragment } from 'react'
import VsInfoBar from '../../../../components/VsInfoBar'
import { Modal, message } from 'antd';
import './index.less'
import{ carSellHelpInter }from '../../../../services/carSellHelpInter'
import { querryStringToObject } from '../../../../utils/util'
import { add, del, getAll, delAll } from '../../../../redux/vsCarList.redux'
import { connect } from 'react-redux'

@connect(
    state => state,
    { add, del, getAll, delAll }
)

class CarDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
          bannerRem: 0,
          currentDd: 0,
          carModelBannerRem: 0.2,
          toLeft: false,
          toRight: true,
          carModelNum: 5,
          floatNavCurrent: 0,
          floatNavIsShow: false,
          bigPicIsShow: false,
          carDetailPicVisible: false,
          showNowPic: '',
          brandId: '',
          carId: '',
          isVSBarShow: false,
          vsInfoBoxDDisplayNum: '000',
          congfigInfoChangeStatus: 'you',
          changeHeight: 0,
          configHeight: 0,
          configPageCurrent: 0,
          // 更多车型横向移动距离
          moveSize: 0,
          // === 车型详情接口数据 ===
          carDetail_RESDATA: {},
          // 配置整体信息
          carConfig_RESDATA: [],
          // 单独类目配置信息，取值为 整体配置信息的第一项的大小类目， 因为不同版本车型号的配置参数类目都相同
          carConfigBigTitle_RESDATA: [],
          // === 更多车型接口数据 ===
          carMore_RESDATA: [],
          // === 车型版本和价格 ===
          getVersion_RESDATA: [],
        //  ==== 锚点定位 ====
          ancFirst: false,
          ancSecond: false,
          ancThird: false,
          ancFourth: false,
          isFixedToTop: false,
          // 参数配置表里的 滚动联动tips定位
          tipsCheckStatus: '',
          carDesc:'',//车型配置说明
          exc: ['12','35'], //不加入对比的车型
          disableCompare: true, //是否关闭加入对比功能
        }

        this.handleScroll = this.handleScroll.bind(this)
    }
    // 生命周期
    componentDidMount() {
      window.scrollTo(0, 0)
      const infoTable = document.getElementById('infoTableArea')
      // console.log(infoTable);
      infoTable.addEventListener('scroll', this.tableScroll.bind(this))
      window.addEventListener('scroll', this.handleScroll);

      // const search = this.props.location.search;
      // const params = querryStringToObject(search);

      // let aliasName = params.carAlias || null
      let aliasName = this.props.match.params.carAlias
      this.getCarDetailInfo(aliasName)

      this.getMoreCars(aliasName)
    }
    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('scroll', this.tableScroll);
    }
    // table滚动
    tableScroll(e) {
      const father = e.target
      const anchorIdArr = father.getElementsByClassName('titles')
      let infoTableAreaScrolltop = document.getElementById('infoTableArea').scrollTop
      for(let i = 0; i < anchorIdArr.length; i++) {
        console.log(infoTableAreaScrolltop, anchorIdArr[i].previousSibling.offsetTop)
        if(infoTableAreaScrolltop >= anchorIdArr[i].previousSibling.offsetTop) {
          this.setState({
            tipsCheckStatus: i
          })
        }
      }
    }
    // ================================================== 接口函数 ==================================================
    // 品牌车型：车型详情
    getCarDetailInfo(aliasName) {
      carSellHelpInter.getCarDetailInfo(aliasName).then((res) => {
        if (res && res.code === '0') {
          // console.log('======= 车型详情 =======')
          // console.log(res.data)
          this.setState ({
            carDetail_RESDATA: res.data,
            carConfig_RESDATA: res.data.configuration,
            carConfigBigTitle_RESDATA: res.data.configuration[0].spec,
            carChexingliangdian: res.data.proDetailImageUrlList,
            carId: res.data.cid,
            carDesc:res.data.carDesc
          })
          // console.log(res.data.proDetailImageUrlList)
        }

        let obj = {
          carTitle: this.state.carDetail_RESDATA.carName,
          carPrice: this.state.carDetail_RESDATA.kind,
          // 此处应该在详情页的接口里多加一个字段，该字段是个该车型图片，加上后 替换掉临时字段proImageUrl即可
          carImage: this.state.carDetail_RESDATA.thumb
        }
        localStorage.setItem('carInfo_session', JSON.stringify(obj))
      })
    }
    // 品牌车型：车型详情：更多车型
    getMoreCars(aliasName) {
      carSellHelpInter.getMoreCars(aliasName).then( (res) => {
        if(res && res.code === '0') {
          // console.log('======= 更多车型 =======')
          let arr = []
          for(let i = 0; i <  res.data.length; i++) {
            arr.push(res.data[i].car_series)
          }
          this.setState ({
            carMore_RESDATA: arr.flat(),
            // carModelNum: res.data.car_series.length
          })
          // console.log(this.state.carMore_RESDATA)
        }
      })
    }
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
    // 轮播图
    bannerRight(type) {
      // console.log(this.state.carModelNum, (Math.ceil(this.state.carModelNum / 4) - 1))
      if (type === 'carModelList') {
        this.setState( (pre, props) => {
          // console.log(pre.carModelBannerRem);//向右点击left-,直到减到(Math.ceil(this.state.carModelNum / 4) - 1)) - 3.9,left <= ul的宽
          if (pre.carModelBannerRem <= - (Math.ceil(this.state.carModelNum / 4)) * 3.4) {
            return {
              // carModelBannerRem: 0.5,
              toRight: false
            }
          } else {
            return {
              carModelBannerRem: pre.carModelBannerRem - 3.7,
              toLeft: true
            }
          }
        })
      } else {
        this.setState( (pre, props) => {
          if (pre.bannerRem <= -56.04) {
            return {
              bannerRem: 0,
              currentDd: 0
            }
          }
          return {
            bannerRem: pre.bannerRem - 14.01,
            currentDd: pre.currentDd + 1
          }
        })
      }
    }
    bannerLeft(type) {
      if (type === 'carModelList') {
        this.setState( (pre, props) => {
          // console.log(pre.carModelBannerRem);//向左点击，left+，直到加到>=0.5，向左可以点击的条件是left -3.9
          if (pre.carModelBannerRem >= 0.2) {
            return {
              // carModelBannerRem: 0.5,
              toLeft: false
            }
          } else {
            return {
              carModelBannerRem: pre.carModelBannerRem + 3.7,
              toRight: true
            }
          }
        })
      } else {
        this.setState( (pre, props) => {
          if (pre.bannerRem >= 0) {
            return {
              bannerRem: -56.04,
              currentDd: 4
            }
          }
          return {
            bannerRem: pre.bannerRem + 14.01,
            currentDd: pre.currentDd - 1
          }
        })
      }
    }
    // 加入 删除 对比
    addRow(addIndex, type, e) {
      // console.log(addIndex)
      e.stopPropagation();
      let obj = {}
      let parent, imgUrl, h3, p
      // 顶部按钮的加入对比 和 底部更多车型的加入对比按钮 获取信息的方式不一样
      if (type === 'noTopBtn') {
        if (e.target.nodeName === 'I' || e.target.nodeName === 'STRONG' || e.target.nodeName === 'SPAN') {
          parent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode
          imgUrl = parent.children[2].attributes.src.value
          h3 = parent.children[3].innerText
          p = e.target.parentNode.children[2].innerText
        } else {
          parent = e.target.parentNode.parentNode.parentNode.parentNode
          imgUrl = parent.children[2].attributes.src.value
          h3 = parent.children[3].innerText
          p = e.target.children[2].innerText
        }
        // 要对添加的对比车型进行 加入 redux 状态管理  obj 是 redux里面 对比车型的信息存储格式
        obj = Object.assign(addIndex[0], { cartype : addIndex[1], carTitle: h3, carPrice: p, carImage: imgUrl} )
        // console.log(obj)
      } else {
        // const search = this.props.location.search;
        // const params = querryStringToObject(search);

        // let cid = params.carCid || null

        let carInfo_session = localStorage.getItem('carInfo_session')
        carInfo_session = JSON.parse(carInfo_session)
        // 要对添加的对比车型进行 加入 redux 状态管理  obj 是 redux里面 对比车型的信息存储格式
        obj = {
          carImage: carInfo_session.carImage,
          carPrice: carInfo_session.carPrice,
          carTitle: carInfo_session.carTitle,
          cartype: carInfo_session.carTitle,
          cid: this.state.carId,
          id: addIndex.id,
          name: addIndex.name,
          price: addIndex.price,
          shop_price: addIndex.shop_price,
          version: addIndex.version
        }
      }
      // 添加之前 先和已有的做对比 重复选择的车型不让填入对比
      for (let i = 0; i < this.props.compare.vsCarListInfo.length; i++) {
        if (obj.id === this.props.compare.vsCarListInfo[i].id) {
            message.warn('请选择不同版本')
            return
        }
      }

      if (this.props.compare.vsCarListInfo.length >= 4) {
          message.warn('最多只能添加4款车型')
          return
      } else {
          this.props.add(obj)
          message.success('添加成功')
          this.setState({
              isVSBarShow: true
          })
      }
    }
    // 浮动锚点样式
    floatNav(type) {
      // 点击事件触发页面滚动，如果滚动以后class控制不准确，可以在点击时取消监听scroll事件，采用锚点样式
      // window.removeEventListener('scroll', this.handleScroll);
      this.setState({
        floatNavCurrent: type,
        ancFirst: false,
        ancSecond: false,
        ancThird: false,
        ancFourth: false,
      })
      /*setTimeout(() => {
        window.addEventListener('scroll', this.handleScroll)
      })*/
    }
    // 页面滑动与左侧标签联动
    controlLeftAnc() {
      this.setState({
        floatNavCurrent: 0, // 清除点击时的class控制
      });

      const currentTop = document.documentElement.scrollTop || document.body.scrollTop;
      // console.log('当前滚动高度', currentTop);
      const h1 = document.getElementById('anc1').offsetHeight;
      const h2 = document.getElementById('anc2').offsetHeight;
      const h3 = document.getElementById('anc3').offsetHeight;
      const h4 = document.getElementById('anc4').offsetHeight;
      // console.log(h1,h2,h3,h4);
      if (currentTop <= h1 + 420) {
        this.setState({
          ancFirst: true,
          ancSecond: false,
          ancThird: false,
          ancFourth: false,
        })
      } else if (currentTop > h1 + 420 && currentTop <= h1 + h2 + 420) {
        this.setState({
          ancFirst: false,
          ancSecond: true,
          ancThird: false,
          ancFourth: false,
        })
        // 参数配置表 高度 变化
        let topTipsHeight = document.getElementById('littleTipOut')
        let configHeight = document.getElementsByClassName('infoTable')[0]
        this.setState({
          changeHeight: topTipsHeight.offsetHeight,
          configHeight: configHeight.offsetHeight
        })
      } else if (currentTop > h1 + h2 + 420 && currentTop <= h1 + h2 + h3 + 420) {
        this.setState({
          ancFirst: false,
          ancSecond: false,
          ancThird: true,
          ancFourth: false,
        })
        // 参数配置表 高度 变化
        let topTipsHeight = document.getElementById('littleTipOut')
        let configHeight = document.getElementsByClassName('infoTable')[0]
        this.setState({
          changeHeight: topTipsHeight.offsetHeight,
          configHeight: configHeight.offsetHeight
        })
      } else if (currentTop > h1 + h2 + h3 + 420) {
        this.setState({
          ancFirst: false,
          ancSecond: false,
          ancThird: false,
          ancFourth: true,
        })
      }
    }
    // 滚动条
    handleScroll(e) {
      let scTop = document.documentElement.scrollTop||document.body.scrollTop;
      let kvHeight = document.getElementsByClassName('BannerImg')[0].offsetHeight;
      // console.log('浏览器滚动事件', e, scTop)
      if (scTop > kvHeight) {
        this.setState({
          isFixedToTop: true,
        })
      } else {
        this.setState({
          isFixedToTop: false
        })
      }
      if (scTop > kvHeight) {
        this.setState({
          floatNavIsShow: true
        })
      } else {
        this.setState({
          floatNavIsShow: false
        })
      }
      this.controlLeftAnc();
    }
    // 车型大图弹窗开关
    carDetailPicOpenOrClose(pic) {
      this.setState ( (pre, props) => {
        return {
          showNowPic: pic,
          carDetailPicVisible: !pre.carDetailPicVisible
        }
      })
    }
  scrollTable(ind){
    document.getElementById('infoTableArea').scrollTop = document.getElementById(`anchor_${ind}`).offsetTop;
    this.setState({
      tipsCheckStatus: ind
    })
  }

    // 跳转车辆详情
    toCarDetail(carAlias, e) {
      e.stopPropagation();
      // this.props.history.push(`/carSellHelp/carBrandModels/carDetails?carAlias=${carAlias}&carCid=${carId}&brandId=${brandId}`)
      window.location.href = `/buycar/cartype/detail/${carAlias}`

      const parent = e.target.parentNode
      const imgUrl = parent.children[2].attributes.src.value
      const h3 = parent.children[3].innerText
      const p = parent.children[4].innerText
      let carInfo_session = {
          carTitle: h3,
          carPrice: p.replace(/价格：/, ''),
          carImage: imgUrl
      }
      // 还要将这种格式存到sessionStorage里面 进入详情里也有个加入对比要取到这个对象
      sessionStorage.setItem('carInfo_session', JSON.stringify(carInfo_session))
  }
  // 去3D
  go3D(cid) {
    if(Number(cid) === 33){
      window.open('/carSellHelp/digiAvalon');
    }else if(Number(cid) === 34){
      window.open('/carSellHelp/digiCorolla');
    }else if(Number(cid) === 32){
      window.open('/carSellHelp/digiIzoa');
    }
  }
  handleItemClick(is3d,cid,carAlias,e) {
    if(is3d) {
      this.go3D(cid)
    } else {
      this.toCarDetail(carAlias,e)
    }
  }
    // 跳转下载中心
    toDownloadCenter() {
      window.open(`/carSellHelp/downloadCenter?carCid=${this.state.carId}`, "_blank");
    }
    // 跳转预约试驾
    toAppointmentDrive() {
      this.props.history.push(`/carSellHelp/appointmentDrive?cid=${this.state.carId}`)
    }
    // 跳转纯正用品
    togenuineProduct() {
      this.props.history.push(`/carSellHelp/PureRAV4?id=${this.state.carId}`)
    }
    // 跳转保险计算器
    toBrandinsurance() {
      window.open(`/carSellHelp/newCarInsurance/insurancecomputer?carCid=${this.state.carId}`, "_blank");
    }
    // 跳转金融计算器
    toFinancialService() {
      window.open(`/carSellHelp/financialService?currentActiveKey=2&carCid=${this.state.carId}`, "_blank");
    }
    // 跳转车辆对比详情
    toVsCarPage() {
      this.props.history.push(`/carSellHelp/vsCarPage`)
    }

    //跳转到3D
 car3dTo(e) {
    if(e.productId===12593){
      window.open('/carSellHelp/digiCorolla')
    }else if(e.productId===12595){
     window.open('/carSellHelp/digiAvalon')
   }else if(e.productId===12587){
     window.open('/carSellHelp/digiIzoa')
   }

  }

    // 对比盒子点击时获取数据
    vsInfoBoxChange(cid, e) {
      e.stopPropagation()
      this.setState({
          vsInfoBoxDDisplayNum: cid
      })
      this.getVersion(cid)
    }
    // 关闭对比盒子
    vslistClose() {
        this.setState({
            vsInfoBoxDDisplayNum: ''
        })
    }

    // 车型对比栏
    show() {
      this.setState( (pre) => {
          return {
              isVSBarShow: !pre.isVSBarShow
          }
      })
    }
    // 参数配置车型版本过多切换显示状态
    congfigInfoChange() {
      this.setState({
        congfigInfoChangeStatus: this.state.congfigInfoChangeStatus === 'you'? 'zuo' : 'you'
      })
    }

    // 参数配置 翻页
    configPageChange (type) {

      switch(type) {
        case 'zuo':
          this.setState( (pre) => {
            return {
              configPageCurrent: pre.configPageCurrent <= 0 ? 0 : pre.configPageCurrent -1
            }
          }, () => {
            // 参数配置表 高度 变化
            let topTipsHeight = document.getElementById('littleTipOut')
            let configHeight = document.getElementsByClassName('infoTable')[0]
            console.log('-=-=-=-=-=--=-=-=-', topTipsHeight, configHeight)
            this.setState({
              changeHeight: topTipsHeight.offsetHeight,
              configHeight: configHeight.offsetHeight
            })
          })
          break;
        case 'you':
          this.setState( (pre) => {
            return {
              configPageCurrent: pre.configPageCurrent >= Math.ceil(this.state.carConfig_RESDATA.length /4) - 1 ? Math.ceil(this.state.carConfig_RESDATA.length /4) - 1 : pre.configPageCurrent +1
            }
          }, () => {
            // 参数配置表 高度 变化
            let topTipsHeight = document.getElementById('littleTipOut')
            let configHeight = document.getElementsByClassName('infoTable')[0]
            console.log('-=-=-=-=-=--=-=-=-', topTipsHeight, configHeight)
            this.setState({
              changeHeight: topTipsHeight.offsetHeight,
              configHeight: configHeight.offsetHeight
            })
          })
          break;
        default:
          this.setState( (pre) => {
            return {
              configPageCurrent: pre.configPageCurrent +1
            }
          })
      }
    }
    // 更多车型切换
    async checkCarBox (ev) {
      console.log(ev)
      // 获取数组长度
      let arrL = this.state.carMore_RESDATA.length
      // 获取倍数
      let getSize = parseInt(arrL/4)
      // 取余
      let getDot = arrL%4
      getDot !== 0 && getSize++
      await console.log(getSize, this.state.moveSize)
      // 设置左边界
      if (ev==='left' && this.state.moveSize>=0) return
      // 设置右边界
      if (ev==='right' && (this.state.moveSize + (getSize-1)*14.64) <= 0) return

      await this.setState({
        moveSize: ev === 'left' ? this.state.moveSize + 14.64 : this.state.moveSize - 14.64
      })
      await console.log(getSize, this.state.moveSize)
    }
    //判断是否属于不加入对比的车型
    isExc(excId){
      return this.state.exc.indexOf(''+excId)!=-1;
    }
    render() {
      const {carDetail_RESDATA, carMore_RESDATA, moveSize, carConfig_RESDATA, carConfigBigTitle_RESDATA, carChexingliangdian,
      getVersion_RESDATA} = this.state
      
      let configPages = []
      for (let i = 0; i < Math.ceil(carConfig_RESDATA.length /3); i++) {
        configPages.push(1)
      }
      return (
        <div className = 'carDetails' onClick = {this.vslistClose.bind(this)}>
          <div className = 'carDetailInfo'>
            <div className = "BannerImg">
              <img src={carDetail_RESDATA.proImageUrl} alt="CG-Banner" style={{'width': '19.2rem'}}/>
            </div>
            <div className = {this.state.isFixedToTop ? 'carInfoBtn fixed' : 'carInfoBtn'}>
              <img src={carDetail_RESDATA.logos} alt="carLogo"/>
              <i></i>
              <span><i>价格：</i> {carDetail_RESDATA.kind}</span>
              {
                carDetail_RESDATA.isPresell === 0? null:
                <div className = 'div1'><i className = 'i3'></i> 立即订购</div>
              }
              {/* 针对威尔法隐藏试驾 */}
              {
                this.state.carId==35 || this.state.carId==26 || this.state.carId==12?
                <div onClick = {this.toAppointmentDrive.bind(this)} className = 'div2'><i className = 'i3'></i> 预约咨询</div>:
                <div onClick = {this.toAppointmentDrive.bind(this)} className = 'div2'><i className = 'i2'></i> 预约试驾</div>
              }

              
              {/* <div onClick = {this.toAppointmentDrive.bind(this)} className = 'div2'><i className = 'i2'></i> 预约试驾</div> */}
              { this.state.disableCompare || this.isExc(this.state.carId)? null:
                <div className = 'div3' onClick = {this.vsInfoBoxChange.bind(this, this.state.carId)}>
                  <i className = 'i1'></i> 加入对比
                  <div className = 'vsInfoBox' style =  {{display: this.state.vsInfoBoxDDisplayNum === this.state.carId? 'block':'none'}}>
                    <i></i>
                    <ul className="vsInfoList">
                        {
                            getVersion_RESDATA.map( (item3, index) => {
                                return (
                                    <li key = {index} onClick = {this.addRow.bind(this, item3, 'topBtn')}>
                                        <i>+</i>
                                        <span dangerouslySetInnerHTML={{ __html:item3.version + item3.name}} title = {item3.version + item3.name.replace('<sup>+</sup>', '+')}></span>
                                        <strong>{item3.price}</strong>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <h5>提示：点击选择增加车型对比</h5>
                  </div>
                </div>
              }
              {
                carDetail_RESDATA.isThreeDimensions === 1?
                    <strong onClick={this.car3dTo.bind(this,carDetail_RESDATA)}></strong>:
                    null
              }
            </div>
            <div className = 'carInfoAll'>
              <div id="anc1">
                <div id = "anchor_chexingzhanshi" style={{'height': 0, 'position': 'relative', 'top': '-1.8rem', 'overflow': 'hidden'}}></div>
                <h2 id = 'chexingzhanshi'>车型展示</h2>
                <div className = 'banner'>
                  <ul style = {{'left': this.state.bannerRem + 'rem'}}>
                    {/* {
                    [1,1,1,1,1].map( (item, index) => {
                      return (
                        <li key={index}>
                          <div className = 'mask1' onClick = {this.showBigPic} onClick = {this.carDetailPicOpenOrClose}>
                            <i></i>
                            <img src= {require('../../../../assets/img/carBrandModels/carDetails/pic-1.png')} alt="" style={{'width': '9.3rem'}}/>
                          </div>
                          <div className = 'mask2'>
                            <i></i>
                            <img src= {require('../../../../assets/img/carBrandModels/carDetails/pic-2.png')} alt="" style={{'width': '4.4rem'}}/>
                          </div>
                          <div className = 'mask3'>
                            <i></i>
                            <img src= {require('../../../../assets/img/carBrandModels/carDetails/pic-3.png')} alt="" style={{'width': '4.4rem'}}/>
                          </div>
                        </li>
                      )
                    })
                  } */}
                    <li>
                      {
                        carChexingliangdian && carChexingliangdian.slice(0,3).map( (item, index) => {
                          if (index === 0) {
                            return (
                              <div className = 'mask1' onClick = {this.carDetailPicOpenOrClose.bind(this, item)} key = {index}>
                                <i></i>
                                <img src= {item} alt="" style={{'width': '9.3rem'}}/>
                              </div>
                            )
                          } else if (index === 1) {
                            return (
                              <div className = 'mask2' onClick = {this.carDetailPicOpenOrClose.bind(this, item)} key = {index}>
                                <i></i>
                                <img src= {item} alt="" style={{'width': '4.4rem'}}/>
                              </div>
                            )
                          } else if (index === 2) {
                            return (
                              <div className = 'mask3' onClick = {this.carDetailPicOpenOrClose.bind(this, item)} key = {index}>
                                <i></i>
                                <img src= {item} alt="" style={{'width': '4.4rem'}}/>
                              </div>
                            )
                          }
                        })
                      }
                    </li>
                  </ul>
                </div>
              </div>
              <div id="anc2">
                <div id = "anchor_chexingliangdian" style={{'height': 0, 'position': 'relative', 'top': '-1.8rem', 'overflow': 'hidden'}}></div>
                <h2 id = 'chexingliangdian'>车型亮点</h2>
                <div dangerouslySetInnerHTML={{ __html: carDetail_RESDATA.detailInfo}} className="specialInfo"></div>
              </div>
              
 	            <div id="anc3">
              <div id = "anchor_canshupeizhi" style={{'height': 0, 'position': 'relative', 'top': '-1.8rem', 'overflow': 'hidden'}}></div>
              <h2 id = 'canshupeizhi' style = {{marginBottom: '0.2rem'}}>参数配置</h2>
              {/* 临时翻页新需求 可能随时变化 不要删除！！！ */}
              {
                carConfig_RESDATA.length > 4 ?
                <div className = 'configInfoBtnArea'>
                  <div className = 'nextButn' onClick = {this.configPageChange.bind(this, 'you')}></div>
                  <div className = 'preButn' onClick = {this.configPageChange.bind(this, 'zuo')}></div>
                  {/* {
                    configPages.map( (item, index) => (<span key = {index} className = {this.state.configPageCurrent === index? 'current' : ''}></span>) )
                  } */}
                </div>
                :
                null
              }
              <div className = 'configInfo'>
                <ul className = 'tips'>
                  {
                    carConfigBigTitle_RESDATA.map( (item, index) => {
                      return (
                        <li key = {index} className = { this.state.tipsCheckStatus === index? 'tips_active' : ''}>
                          <span></span>
                          <a onClick={this.scrollTable.bind(this,index)} title={item.catalog} >{item.catalog}</a>
                        </li>
                      )
                    })
                  }
                </ul>
                <div className = 'infoTable'>
                  {/* 此处为参数配置表头 */}
                  <div className='littleTipOut' id = 'littleTipOut'>
                    <dl className = 'littleTips' >
                      <dd style = {{background: 'burlywood'}}>
                        型号
                      </dd>
                      {
                        // 临时翻页新需求 可能随时变化 不要删除！！！
                        carConfig_RESDATA.slice(this.state.configPageCurrent * 4, this.state.configPageCurrent * 4 + 4).map( (item, index) => {
                          return (
                            <dd style = {{background: 'burlywood'}} key = {index}>{item.name}</dd>
                          )
                        })
                      }
                    </dl>
                    <dl className = 'littleTips'>
                      <dd style = {{color: '#000'}}>厂家建议零售价格</dd>
                      {
                        // 临时翻页新需求 可能随时变化 不要删除！！！
                        carConfig_RESDATA.slice(this.state.configPageCurrent * 4, this.state.configPageCurrent * 4 + 4).map( (item, index) => {
                          return (
                            <dd key = {index} style = {{color: 'burlywood', fontWeight: '700', fontSize: '0.2rem'}}>{item.price}</dd>
                          )
                        })
                      }
                    </dl>
                  </div>
                  {/* 此处为参数配置项 */}
                    
                  <div className='detailInfo' id='infoTableArea' style = {{top: this.state.changeHeight + 'px', height: this.state.configHeight - this.state.changeHeight + 'px' }}>
                    {
                      carConfigBigTitle_RESDATA.map( (item, index) => {
                        return (
                          <Fragment key = {index}>
                            <div id = {`anchor_${index}`} style={{'height': 0, 'position': 'relative', 'top': '0', 'overflow': 'hidden'}}></div>
                            <div className = 'titles'>{item.catalog}</div>
                            {
                              item.params.map( (item2, index2) => {
                                return (
                                  <dl className = 'littleTips' key={index2} >
                                    {/* <dd style = {{color: '#000', background: index2 % 2 === 0 ? 'rgba(0,0,0,0.1)' : '#fff'}}>{item2.name}</dd> */}
                                    <dd style = {{color: '#000', background: index2 % 2 === 0 ? 'rgba(0,0,0,0.1)' : '#fff'}}>
                                      <span dangerouslySetInnerHTML={{ __html: item2.name}}></span>
                                    </dd>
                                    {
                                      // 临时翻页新需求 可能随时变化 不要删除！！！
                                      carConfig_RESDATA.slice(this.state.configPageCurrent * 4, this.state.configPageCurrent * 4 + 4).map( (item3, index3) => {
                                        let item3_factory = item3.spec[index]
                                        if (item3_factory.params[index2].txt === '有') {
                                          return (
                                            <dd key = {index3} style = {{color: '#000', background: index2 % 2 === 0 ? 'rgba(0,0,0,0.1)' : '#fff'}}>
                                              <i className='yes'></i>
                                            </dd>
                                          )
                                        } else {
                                          if (item3_factory.params[index2].txt === '无') {
                                            return (
                                              <dd key = {index3} style = {{color: '#000', background: index2 % 2 === 0 ? 'rgba(0,0,0,0.1)' : '#fff'}}>
                                                <i className='no'></i>
                                              </dd>
                                            )
                                          } else {
                                            return (
                                              <dd key = {index3} style = {{color: '#000', background: index2 % 2 === 0 ? 'rgba(0,0,0,0.1)' : '#fff'}}>
                                                <span dangerouslySetInnerHTML={{ __html:`${item3_factory.params[index2].txt}`}}></span>
                                              </dd>
                                            )
                                          }
                                        }
                                      })
                                    }
                                  </dl>
                                )
                              })
                            }
                          </Fragment>
                        )
                      })
                    }
                  </div>
                  </div>
                </div>
              </div>
              {this.state.carDesc?
                <div className="suoming_box_box">
                <div className="suoming_box">
                  <div  className="suoming_fl">
                    {/* <img src={require('../../../../assets/img/carBrandModels/icon-care1.png')}/> */}
                    注：
                  </div>
                  <div className="suoming_fr"  dangerouslySetInnerHTML={{ __html: this.state.carDesc}} ></div>
              </div> </div>:null
              }

              <div id="anc4">
                <div id = "anchor_gouchezhichi" style={{'height': 0, 'position': 'relative', 'top': '-1.8rem', 'overflow': 'hidden'}}></div>
                <h2 id = 'gouchezhichi'>购车支持</h2>
                {
                  carDetail_RESDATA.isHaveBoutique === 0 || this.state.carId ==30 || this.state.carId == 28 ?
                    // 二次三木运算 判断是否有下载中心  0 无 1 有
                    carDetail_RESDATA.isHaveDowncenter === 0 ?
                    <div className = 'calculator3'>
                      <div onClick = {this.toBrandinsurance.bind(this)}>
                        <span className = 'insurance'></span>
                        <p>保险计算器</p>
                      </div>
                      <div onClick = {this.toFinancialService.bind(this)} style = {{ 'marginRight': 0}} >
                        <span className = 'finance'></span>
                        <p>金融计算器</p>
                      </div>
                    </div>
                    :
                    <div className = 'calculator'>
                      <div onClick = {this.toBrandinsurance.bind(this)}>
                        <span className = 'insurance'></span>
                        <p>保险计算器</p>
                      </div>
                      <div onClick = {this.toFinancialService.bind(this)}>
                        <span className = 'finance'></span>
                        <p>金融计算器</p>
                      </div>
                      <div style = {{ 'marginRight': 0}} onClick = {this.toDownloadCenter.bind(this, 'carId')}>
                        <span className = 'download'></span>
                        <p>下载中心</p>
                      </div>
                    </div>
                  :
                    // 二次三木运算 判断是否有下载中心  0 无 1 有
                    carDetail_RESDATA.isHaveDowncenter === 0 ?
                    <div className = 'calculator'>
                      <div onClick = {this.togenuineProduct.bind(this)}>
                        <span className = 'help'></span>
                        <p>纯正用品</p>
                      </div>
                      <div onClick = {this.toBrandinsurance.bind(this)}>
                        <span className = 'insurance'></span>
                        <p>保险计算器</p>
                      </div>
                      <div onClick = {this.toFinancialService.bind(this)} style = {{ 'marginRight': 0}} >
                        <span className = 'finance'></span>
                        <p>金融计算器</p>
                      </div>
                    </div>
                    :
                    <div className = 'calculator2'>
                      <div onClick = {this.togenuineProduct.bind(this)}>
                        <span className = 'help'></span>
                        <p>纯正用品</p>
                      </div>
                      <div onClick = {this.toBrandinsurance.bind(this)}>
                        <span className = 'insurance'></span>
                        <p>保险计算器</p>
                      </div>
                      <div onClick = {this.toFinancialService.bind(this)}>
                        <span className = 'finance'></span>
                        <p>金融计算器</p>
                      </div>
                      <div style = {{ 'marginRight': 0}} onClick = {this.toDownloadCenter.bind(this, 'carId')}>
                        <span className = 'download'></span>
                        <p>下载中心</p>
                      </div>
                    </div>
                }
              </div>

              {
                carMore_RESDATA && carMore_RESDATA.length === 0 ? null :
                <Fragment>
                  <div className='bottomList'>
                    <h2>更多车型</h2>
                    <div className="nextButn" onClick = {this.checkCarBox.bind(this,'right')}></div>
                    <div className="preButn" onClick = {this.checkCarBox.bind(this,'left')}></div>
                    <div className = 'moreModels'>
                      {/* style ={{'left': this.state.carModelBannerRem + 'rem', 'width': Math.ceil(this.state.carModelNum / 4) * 14.64 + 'rem'}}*/}
                      <ul className="jiaocheList" style={{width: carMore_RESDATA.length*3.66 + 'rem',left: (0.2 + moveSize) + 'rem'}}>
                        {
                          carMore_RESDATA.map( (item, index) => {
                            return (
                              index <= 3000 ?
                                <li key = {index} onClick = {this.handleItemClick.bind(this,item.is3d,item.cid,item.alias)}>
                                  <i className = {item.isnew === 0 ?'' : 'carMark_new'}></i>
                                  <span className = {item.is3d === 0 ?'' : 'carMark_attr'}></span>
                                  <img src = {item.thumb} alt="" style = {{width: '2.69rem'}}/>
                                  <h3>{item.name}</h3>
                                  {
                                    item.price?
                                      <p>价格：{item.price}</p>
                                      :
                                      <p>价格请咨询当地经销商</p>
                                  }
                                  <div className = 'detailBtn' style = {this.state.disableCompare || this.isExc(item.cid)?{'margin-left':'0.8rem'}:{}}  onClick = {this.toCarDetail.bind(this, item.alias)}>
                                    <em></em>&nbsp;查看详情
                                  </div>
                                  { this.state.disableCompare || this.isExc(item.cid)? null:
                                    <div className = 'joinVSBtn' onClick = {this.vsInfoBoxChange.bind(this, item.cid)}>
                                      <em></em>&nbsp;加入对比
                                      <div className = 'vsInfoBox' style =  {{left: ((index+1)%4 === 1&&'-1.7rem') || ((index+1)%4 === 0&&'-3rem'),display: this.state.vsInfoBoxDDisplayNum === item.cid? 'block':'none'}}>
                                        <i></i>
                                        <ul className="vsInfoList">
                                          {
                                            getVersion_RESDATA.map( (item2, index) => {
                                              return (
                                                <li key = {index} onClick = {this.addRow.bind(this, [item2, item.name], 'noTopBtn' )}>
                                                  <i>+</i>
                                                  <span dangerouslySetInnerHTML={{ __html:item2.version + item2.name}} title = {item2.version + item2.name.replace('<sup>+</sup>', '+')}></span>
                                                  <strong>{item2.price}</strong>
                                                </li>
                                              )
                                            })
                                          }
                                        </ul>
                                        <h5>提示：点击选择增加车型对比</h5>
                                      </div>
                                    </div>
                                  }
                                </li>
                                :
                                null
                            )
                          })
                        }
                      </ul>
                    </div>
                    {
                      /*(Math.ceil(this.state.carModelNum / 4) - 1) === 0 ? null :
                      <Fragment>
                        <div className = 'nextBtn'
                                onClick = {this.bannerLeft.bind(this, 'carModelList')}
                                disabled={!this.state.toLeft}></div>
                        <div className = 'preBtn'
                                onClick = {this.bannerRight.bind(this, 'carModelList')}
                                disabled={!this.state.toRight}></div>
                      </Fragment>*/
                    }
                  </div>
                </Fragment>
              }
            </div>
            <div className = 'floatNav' style = {{'display': this.state.floatNavIsShow ? 'block' : 'none'}}>
              <a href="#anchor_chexingzhanshi" className = { this.state.floatNavCurrent === 1 || this.state.ancFirst ? 'a_active' : null}
                 onClick = {this.floatNav.bind(this,1)}><i className = 'i1'></i> 车型展示</a>
              <a href="#anchor_chexingliangdian" className = { this.state.floatNavCurrent === 2 || this.state.ancSecond ? 'a_active' : null}
                 onClick = {this.floatNav.bind(this,2)}><i className = 'i2'></i> 车型亮点</a>
              <a href="#anchor_canshupeizhi" className = { this.state.floatNavCurrent === 3 || this.state.ancThird ? 'a_active' : null}
                 onClick = {this.floatNav.bind(this,3)}><i className = 'i3'></i> 参数配置</a>
              <a href="#anchor_gouchezhichi" className = { this.state.floatNavCurrent === 4 || this.state.ancFourth ? 'a_active' : null}
                 onClick = {this.floatNav.bind(this,4)}><i className = 'i4'></i> 购车支持</a>
            </div>
            { this.state.disableCompare?null:
              <VsInfoBar toVsCarPage = {this.toVsCarPage.bind(this)} isVSBarShow = {this.state.isVSBarShow} show = {this.show.bind(this)}/>
            }
          </div>
          <Modal
            className = 'carDetailPicModal'
            title=""
            visible={this.state.carDetailPicVisible}
            onCancel={this.carDetailPicOpenOrClose.bind(this, this.state.showNowPic)}
            footer = {null}
          >
            <div className = 'imgdiv'>
              <img src={this.state.showNowPic} alt=""/>
            </div>
          </Modal>
        </div>
      )
    }
}

export default CarDetails