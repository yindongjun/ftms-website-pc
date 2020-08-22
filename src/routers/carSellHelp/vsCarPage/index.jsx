import React, { Component } from 'react'
import { Select, Collapse, Modal, message} from 'antd';
import{ carSellHelpInter }from '../../../services/carSellHelpInter'
import { querryStringToObject } from '../../../utils/util'
import { add, del, getAll, delAll, fix } from '../../../redux/vsCarList.redux'
import { connect } from 'react-redux'

import './vsCarPage.less'

const Option = Select.Option;
const Panel = Collapse.Panel;

@connect(
  state => state,
  { add, del, getAll, delAll, fix }
)
class VsCarPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      joinCarModalIsShow: false,
      joinCarModal_carType: '轿车',
      joinCarModal_bannerPosition: 0.5,
      // 当前vs车型id数组 获取参数 接口调用
      modelsArr: [],
      // 当前vs车型 页面最多4辆
      nowCarVsListModel: [],
      // 弹窗里的车型信息
      carVsmodalBanerList: [
        // {
        //   xin_mark: false,
        //   D_mark: true,
        //   carImg: '',
        //   carName: '卡罗拉双擎E',
        //   carPrice: '1213,12.43',
        //   checkStatus: false,
        //   alias: 'arr[i].alias',
        //   cid: 'arr[i].cid'
        // }
      ],
      // 弹窗里的车型信息题头
      carVsmodalBanerTitle: [],
      // 弹窗底部以选择的车型展示
      carVsmodalChoosedList: [
        // {
        //   carImage: '',
        //   carPrice: '',
        //   carTitle: '',
        //   cid: '',
        //   id: '',
        //   name: '',
        //   shop_price: '',
        //   version: ''
        // }
      ],
      ISdisabled: false,
      // 接口数据
      // 参数配置数据
      VehicleAttributeVS_RESDATA: [],
      // 更多车型版本
      getVersion_RESDATA: [],
      listToTop: false,
      exc: ['12','35'], //不加入对比的车型
      carVsmodalBanerListAll: [] //弹窗里全部车型信息
    }
    this.joinCarModalOpenOrClose = this.joinCarModalOpenOrClose.bind(this)
    this.addChoosedCarVS = this.addChoosedCarVS.bind(this)
  }
  // 滚动到一定位置，吸顶
  handleScroll(e) {
    let scTop = document.documentElement.scrollTop||document.body.scrollTop
    // console.log('浏览器滚动事件', e, scTop)
    if (scTop > 140) {
      this.setState({
        listToTop: true
      })
    } else {
      this.setState({
        listToTop: false
      })
    }
  }

  // 生命周期
  componentWillMount() {
    document.getElementById('root').scrollIntoView(true);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    // 拿取redux里的对比车型展示信息
    let {vsCarListInfo} = this.props.getAll()
    
    this.setState({
      nowCarVsListModel: vsCarListInfo
    })
    for (let i = 0; i < vsCarListInfo.length; i++) {
      this.state.modelsArr.push(vsCarListInfo[i].id)
      this.setState({})
    }

    this.VehicleAttributeVS(this.state.modelsArr);
    console.log('componentDidMount');
    this.getbrandModelsList();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
    // this.props.delAll()
  }
  // ================================================== 接口函数 ==================================================
  // 品牌车型：加入对比
  VehicleAttributeVS(postData) {
    carSellHelpInter.VehicleAttributeVS(postData).then((res) => {
      if (res && res.code === '0') {
        this.setState({
            VehicleAttributeVS_RESDATA: res.data
        })
      } else {
        window.location.href = '/carSellHelp/carBrandModels'
      }
    })
  }
  // 品牌车型：车型展示列表
  getbrandModelsList() {
    carSellHelpInter.brandModelsList().then((res) => {
      if (res && res.code === '0') {
        this.setState({
          carVsmodalBanerTitle: []
        });
        //过滤不加入对比的车型start======================
        res.data.map((item, index) => {
          let carArr = [];
          item.car_series.map((itemCar, index) => {
            if (!this.isExc(itemCar.cid)) {
              carArr.push(itemCar);
            }
          });
          item.car_series = carArr;
        });
        //过滤不加入对比的车型end========================
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].car_series.length > 0) {
            this.state.carVsmodalBanerTitle.push(res.data[i].title);
          }
        }
        let arr = []
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].car_series.length > 0) {
            arr.push(res.data[i].car_series);
          }
        }
        this.state.carVsmodalBanerListAll = arr;
        this.chooseModelsList(0);
      }
    })
  }
  // 品牌车型：获取选中的车型分类里的车型信息
  chooseModelsList(typeNum) {
    let arr = this.state.carVsmodalBanerListAll;
    arr = arr[typeNum];
    this.state.carVsmodalBanerList = []
    for (let i = 0; i < arr.length; i++) {
      let obj = {
        xin_mark: arr[i].isnew,
        D_mark: arr[i].is3d,
        carImg: arr[i].thumb,
        carName: arr[i].name,
        carPrice: arr[i].price,
        checkStatus: 
          (this.state.carVsmodalChoosedList[0] && this.state.carVsmodalChoosedList[0].carTitle === arr[i].name) ||
          (this.state.carVsmodalChoosedList[1] && this.state.carVsmodalChoosedList[1].carTitle === arr[i].name) ||
          (this.state.carVsmodalChoosedList[2] && this.state.carVsmodalChoosedList[2].carTitle === arr[i].name) ||
          (this.state.carVsmodalChoosedList[3] && this.state.carVsmodalChoosedList[3].carTitle === arr[i].name)?
          true: false
          ,
        alias: arr[i].alias,
        cid: arr[i].cid
      }
      this.state.carVsmodalBanerList.push(obj)
    }
  }
  // 品牌车型：获取车型的价格和版本
  getVersion(cid) {
    carSellHelpInter.getVersion(cid).then((res) => {
      if (res && res.code === '0') {
        // console.log('====== 获取车型的价格和版本 =======')
        this.setState({
          getVersion_RESDATA: res.data
        })
        // console.log(this.state.getVersion_RESDATA)
      }
    })
  }
  // ============================================================================================================
  // 删除当前对比展示的车型
  deleteThisCar(ind) {
    // if(this.state.nowCarVsListModel.length === 1) {
    //   message.warn('已经是最后一辆了')
    // } else {
    //   // this.state.nowCarVsListModel.splice(ind, 1)
    //   this.state.modelsArr.splice(ind, 1)
    //   this.props.del(ind)
    //   this.VehicleAttributeVS(this.state.modelsArr)
    // }
    this.state.modelsArr.splice(ind, 1)
    this.props.del(ind)
    this.VehicleAttributeVS(this.state.modelsArr)
  }
  // 增选车型弹窗 
  joinCarModalOpenOrClose() {
    this.setState ( (pre, props) => {
      return {
        joinCarModalIsShow: !pre.joinCarModalIsShow
      }
    })
  }
  // 选择弹窗里的车型分类
  chooseModal_carType(type, index) {
    this.setState({
      joinCarModal_carType: type,
      joinCarModal_bannerPosition: 0
    })
    console.log('chooseModelsList1');
    this.chooseModelsList(index);
  }
  // 弹窗轮播图 左右切换
  bannerLeftOrRight(type) {
    if(type === 'right') {
      this.setState( (pre, props) => {
        if(pre.joinCarModal_bannerPosition <= - this.state.carVsmodalBanerList.length * 1.5) {
          return {
            joinCarModal_bannerPosition: 0.5
          }
        }
        return {
          joinCarModal_bannerPosition: pre.joinCarModal_bannerPosition - 9
        }
      })
    } else {
      this.setState( (pre, props) => {
        if(pre.joinCarModal_bannerPosition >= 0.5) {
          return {
            joinCarModal_bannerPosition: 0.5
          }
        }
        return {
          joinCarModal_bannerPosition: pre.joinCarModal_bannerPosition + 9
        }
      })
    }
  }
  // 选中车型打勾
  checkThisCar(ind, e) {
    e.stopPropagation()
    for(let i = 0; i < this.state.carVsmodalBanerList.length; i++) {
      if (i === ind) {

        this.state.carVsmodalBanerList[i].checkStatus = !this.state.carVsmodalBanerList[i].checkStatus

        // 选中状态 增加  否则 移除
        let arr = this.state.carVsmodalChoosedList

        if (this.state.nowCarVsListModel.length + this.state.carVsmodalChoosedList.length > 3) {
          this.state.carVsmodalBanerList[i].checkStatus = false

          let h5 = this.state.carVsmodalBanerList[i].carName
          for (let k = 0; k < arr.length; k++) {
            if (arr[k].carTitle === h5) {
              this.state.carVsmodalChoosedList.splice(k, 1)
            }
          }
          this.setState({})
          if (this.state.nowCarVsListModel.length + this.state.carVsmodalChoosedList.length > 3) message.warn('最多只能添加4款车型')
          return
        }
        
        if(this.state.carVsmodalBanerList[i].checkStatus) {
          // console.log(e.target.children)
          let strong, img, h5, p
          if (e.target.nodeName === 'LI') {
            strong = e.target.children[0].getAttribute('cid')
            img = e.target.children[1].src
            h5 = e.target.children[2].innerText
            p = e.target.children[3].innerText   
          } else {
            strong = e.target.parentNode.children[0].getAttribute('cid')
            img = e.target.parentNode.children[1].src
            h5 = e.target.parentNode.children[2].innerText
            p = e.target.parentNode.children[3].innerText 
          }
          let obj = {
            carImage: img,
            carPrice: p,
            carTitle: h5,
            cartype: h5,
            cid: strong,
            id: '',
            name: '',
            price: '',
            shop_price: '',
            version: ''
          }
          arr.push(obj)
        } else {
          let h5
          if (e.target.nodeName === 'LI') {
            h5 = e.target.children[2].innerText
          } else {
            h5 = e.target.parentNode.children[2].innerText
          }
          for (let k = 0; k < arr.length; k++) {
            if (arr[k].carTitle === h5) {
              this.state.carVsmodalChoosedList.splice(k, 1)
            }
          }
        }
      }
    }
    this.setState ({})
  }
  // 删除已选中
  deletThisCar(ind, e) {
    let arr = this.state.carVsmodalBanerList
    let name = e.target.parentNode.innerText.replace('X', '').trim()
    for(let i = 0; i < arr.length; i++) {
      if (arr[i].carName === name) {
        arr[i].checkStatus = false
      }
    }
    this.state.carVsmodalChoosedList.splice(ind, 1)
    this.setState({})
  }
  // 加入对比
  addChoosedCarVS() {
    for (let i = 0; i < this.state.carVsmodalChoosedList.length; i++) {
      this.props.add(this.state.carVsmodalChoosedList[i])
      this.state.modelsArr.push(this.state.carVsmodalChoosedList[i].cid)
    }
    this.VehicleAttributeVS(this.state.modelsArr)
    // 关闭弹窗 重新滞空
    this.setState({
      joinCarModalIsShow: false,
      carVsmodalChoosedList: []
    })
    for (let i = 0; i < this.state.carVsmodalBanerList.length; i++) {
      this.state.carVsmodalBanerList[i].checkStatus = false
    }
    this.setState({})
  }
  // 光标滑过触摸 获取版本数据列表
  handleMouseEnter(cid) {
    this.getVersion(cid)
  }
  // 选择版本后重新 获取配置参数
  handleChange(ind, v) {
    this.props.fix({ind, v})
    this.state.modelsArr.splice(ind, 1, v.split('*')[1])
    this.VehicleAttributeVS(this.state.modelsArr)
  }
  //判断是否属于不加入对比的车型
  isExc(excId){
    return this.state.exc.indexOf(''+excId)!=-1;
  }
  render () {
    const {VehicleAttributeVS_RESDATA, carVsmodalBanerList, getVersion_RESDATA, nowCarVsListModel, carVsmodalBanerTitle} = this.state
    return (
      <div className = 'vs'>
        <h2>车型对比</h2>
        {/*{this.state.listToTop ? null : }*/}
        <div className={this.state.listToTop ? 'vsCarlist carListFixToTop' : 'vsCarlist'}>
          <span className = 'biaopei'><i></i>标配</span>
          <span className = 'xuanpei'><i></i>选配</span>
          <span className = 'nothing'><i></i>无</span>
          <div className = 'title' style = {{ width: '13%', flex: 'none'}}>车型</div>
          {
            [0,1,2,3].map( (item, index) => {
              return nowCarVsListModel[item] ?
              (// 有属性的样式
                <div className = 'carModel' key = {index}>
                  <b onClick = {this.deleteThisCar.bind(this, index)}></b>
                  <div className='carModelTit'>
                    <img src={nowCarVsListModel[item].carImage} alt="" style = {{width: '1.87rem'}}/>
                    <h4>{nowCarVsListModel[item].carTitle}</h4>
                    {
                      nowCarVsListModel[item].price?
                      <p>价格：{nowCarVsListModel[item].price}</p>
                      :
                      <p>{nowCarVsListModel[item].carPrice}</p>
                    }
                    <Select value={nowCarVsListModel[item].version + nowCarVsListModel[item].name?nowCarVsListModel[item].version + nowCarVsListModel[item].name.replace('<sup>+</sup>','+'): '选择车型版本添加对比'} onMouseEnter = {this.handleMouseEnter.bind(this, nowCarVsListModel[item].cid)} onChange = {this.handleChange.bind(this, index)} className = {nowCarVsListModel[item].version + nowCarVsListModel[item].name? '' : 'unCheck'}>
                      {
                        getVersion_RESDATA && getVersion_RESDATA.map( (item2, index) => {
                          return (
                            <Option
                              value={`${item2.cid}*${item2.id}*${item2.name}*${item2.price}*${item2.shop_price}*${item2.version}`}
                              key = {index}
                              disabled = {
                                (this.state.nowCarVsListModel[0] && this.state.nowCarVsListModel[0].id === item2.id) ||
                                (this.state.nowCarVsListModel[1] && this.state.nowCarVsListModel[1].id === item2.id) ||
                                (this.state.nowCarVsListModel[2] && this.state.nowCarVsListModel[2].id === item2.id) ||
                                (this.state.nowCarVsListModel[3] && this.state.nowCarVsListModel[3].id === item2.id) ?
                                  true : false
                              }
                            >
                              {`${item2.version}${item2.name.replace('<sup>+</sup>','+')}`}
                            </Option>
                          )
                        })
                      }
                    </Select>
                  </div>
                </div>
              )
              :
              (// 没有的样式
                <div className = 'carModel' key = {index}>
                  <div className='carModelTit'>
                    <strong onClick = {this.joinCarModalOpenOrClose}></strong>
                    <i>添加车型</i>
                  </div>
                </div>
              )
            })
          }
        </div>
        <Collapse style={{marginTop: this.state.listToTop ? '2.55rem' : ''}} defaultActiveKey={['0']}>
          {
            VehicleAttributeVS_RESDATA && VehicleAttributeVS_RESDATA.map( (item, index) => {
              return (
                <Panel header = {item.catalog} key = {index}>
                  <ul id="hahha">
                    {
                      item.params.map( (item2, index) => {
                        return (
                            <li key={index}>
                              <span dangerouslySetInnerHTML={{ __html:item2.name}} style = {{width: '1.81rem'}}></span>
                              {
                                item2.value.map( (item3, index) => {
                                  if (item3 === '有') {
                                    return (
                                      <span key = {index}><i></i></span>
                                    )
                                  } else if (item3 === '无') {
                                    return (
                                      <span key = {index}><em></em></span>
                                    )
                                  } else {
                                    return (
                                      <span dangerouslySetInnerHTML={{__html:item3}} key = {index}></span>
                                    )
                                  }
                                })
                              }
                            </li>
                          )
                      })
                    }
                  </ul>
                </Panel>
              )
            })
          }
        </Collapse>
        <Modal
          className = 'joinCarModal'
          title=""
          visible={this.state.joinCarModalIsShow}
          onCancel={this.joinCarModalOpenOrClose}
          footer = {null}
        >
          <div className = 'title'>
            {
              carVsmodalBanerTitle.map( (item, index) => {
                return (
                  <span className = {this.state.joinCarModal_carType === item ? 'span_active':''} onClick = {this.chooseModal_carType.bind(this, item, index)} key = {index} style = {{width: 85/carVsmodalBanerTitle.length + '%' }}>{item}</span>
                )
              })
            }
            {/* <span className = {this.state.joinCarModal_carType === 'jiaoche'? 'span_active':''} onClick = {this.chooseModal_carType.bind(this, 'jiaoche')}>轿车</span>
            <span className = {this.state.joinCarModal_carType === 'SUV'? 'span_active':''} onClick = {this.chooseModal_carType.bind(this, 'SUV')}>SUV</span>
            <span className = {this.state.joinCarModal_carType === 'zhongxingkeche'? 'span_active':''} onClick = {this.chooseModal_carType.bind(this, 'zhongxingkeche')}>中型客车</span> */}
            {/* <span>原装进口(敬请期待)</span> */}
          </div>
          <div className = 'bannerBox'>
            <span className = 'preBtn' onClick = {this.state.carVsmodalBanerList.length <= 3? null :this.bannerLeftOrRight.bind(this, 'left')}></span>
            <span className = 'nextBtn' onClick = {this.state.carVsmodalBanerList.length <= 3? null :this.bannerLeftOrRight.bind(this, 'right')}></span>
            <ul style = {{left: this.state.joinCarModal_bannerPosition + 'rem', width: (carVsmodalBanerList.length * 3.4) + 'rem'}}>
              {
                carVsmodalBanerList.map( (item, index) => {
                  if (item.checkStatus) {
                    return (
                      <li key={index} onClick = {this.checkThisCar.bind(this, index)}>
                        <strong className = 'strong_active'></strong>
                        <img src={item.carImg} alt="" style = {{width: '2.1' + 'rem'}}/>
                        <h5>{item.carName}</h5>
                        <p>价格：{item.carPrice}</p>
                      </li>
                    )
                  } else {
                    return (
                      <li key={index} onClick = {this.checkThisCar.bind(this, index)}>
                        <strong cid = {item.cid}></strong>
                        <img src={item.carImg} alt="" style = {{width: '2.1' + 'rem'}}/>
                        <h5>{item.carName}</h5>
                        <p>价格：{item.carPrice}</p>
                        {item.xin_mark === 0? null : <i></i>}
                        {item.D_mark === 0? null : <b></b>}
                      </li>
                    )
                  }
                })
              }
            </ul>
          </div>
          <p>当前已选车型：
            {
              this.state.carVsmodalChoosedList.map( (item, index) => {
                return (
                  <span key={index}>{item.carTitle}&nbsp;&nbsp;<i onClick = {this.deletThisCar.bind(this, index)}>X</i></span>
                )
              })
            }
          </p>
          <div className = 'joinItBtn' onClick = {this.addChoosedCarVS}><span></span> 加入对比</div>
          <div className = 'closeBtn' onClick = {this.joinCarModalOpenOrClose}><span>X</span> 关闭</div>
        </Modal>
      </div>
    )
  }
}

export default VsCarPage