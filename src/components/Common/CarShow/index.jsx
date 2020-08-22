import React, { Component } from 'react'
import { Tabs } from 'antd'
import './index.less'
import {carSellHelpInter} from "../../../services/carSellHelpInter";

// const carList = [
//   {
//     tabTitle: '轿车',
//     carDetail: [
//       {
//         smallTitle: <div>
//           <img src={require('../../../assets/img/officislSite/carshow/yazhoulong.png')} alt="" />
//           <span>AVALON亚洲龙</span>
//         </div>,
//         imgUrl: 'yazhoulong.png',
//         carName: '亚洲龙 AVALON',
//         slogan: '智·美双极',
//         price: '￥254,800~￥289,000',
//         function: [
//           { opt: '全景看车' },
//           { opt: '车型详情' },
//           { opt: '预约试驾' },
//           { opt: '立即订购' }
//         ]
//       },
//       {
//         smallTitle: <div>
//           <img src={require('../../../assets/img/officislSite/carshow/huangguan.png')} alt="" />
//           <span>CROWN皇冠</span>
//         </div>,
//         imgUrl: 'huangguan.png',
//         carName: 'CROWN皇冠',
//         slogan: '厚积，博发',
//         price: '￥254,800~￥381,800',
//         function: [
//           { opt: '车型详情' },
//           { opt: '预约试驾' }
//         ]
//       },
//       {
//         smallTitle: <div>
//           <img src={require('../../../assets/img/officislSite/carshow/PHEV.png')} alt="" />
//           <span>卡罗拉双擎E+</span>
//         </div>,
//         imgUrl: 'PHEV.png',
//         carName: '卡罗拉双擎E+',
//         slogan: '卡罗拉双擎E+纵情而来',
//         price: '价格：敬请期待',
//         function: [
//           { opt: '全景看车' },
//           { opt: '车型详情' },
//           { opt: '预约试驾' },
//           { opt: '立即订购' }
//         ]
//       },
//       {
//         smallTitle: <div>
//           <img src={require('../../../assets/img/officislSite/carshow/kaluola.png')} alt="" />
//           <span>COROLLA 卡罗拉</span>
//         </div>,
//         imgUrl: 'kaluola.png',
//         carName: 'COROLLA卡罗拉',
//         slogan: 'COROLLA卡罗拉',
//         price: '￥107,800~￥163,800',
//         function: [
//           { opt: '车型详情' },
//           { opt: '预约试驾' },
//         ]
//       },
//       {
//         smallTitle: <div>
//           <img src={require('../../../assets/img/officislSite/carshow/kaluola.png')} alt="" />
//           <span>卡罗拉双擎</span>
//         </div>,
//         imgUrl: 'kaluola.png',
//         carName: '卡罗拉双擎',
//         slogan: '焕新时刻，智尚生活',
//         price: '￥139,800~￥175,800',
//         function: [
//           { opt: '车型详情' },
//           { opt: '预约试驾' },
//         ]
//       },
//       {
//         smallTitle: <div>
//           <img src={require('../../../assets/img/officislSite/carshow/weichi.png')} alt="" />
//           <span>VIOS 威驰</span>
//         </div>,
//         imgUrl: 'weichi.png',
//         carName: 'VIOS 威驰',
//         slogan: '心驰所享，无畏青春',
//         price: '￥69,800~￥113,800',
//         function: [
//           { opt: '车型详情' },
//           { opt: '预约试驾' },
//         ]
//       },
//       {
//         smallTitle: <div>
//           <img src={require('../../../assets/img/officislSite/carshow/FS.png')} alt="" />
//           <span>VIOS FS 威驰FS</span>
//         </div>,
//         imgUrl: 'FS.png',
//         carName: 'VIOS FS 威驰FS',
//         slogan: '心驰所享，无畏青春',
//         price: '￥69,800~￥109,800',
//         function: [
//           { opt: '车型详情' },
//           { opt: '预约试驾' },
//         ]
//       }
//     ]
//   },
//   {
//     tabTitle: 'SUV',
//     carDetail: [
//       {
//         smallTitle: <div>
//           <img src={require('../../../assets/img/officislSite/carshow/puladuo.png')} alt="" />
//           <span>普拉多</span>
//         </div>,
//         imgUrl: 'puladuo.png',
//         carName: '普拉多',
//         slogan: '舍我其谁',
//         price: '￥443,800~￥615,800',
//         function: [
//           { opt: '车型详情' },
//           { opt: '预约试驾' },
//         ]
//       },
//       {
//         smallTitle: <div>
//           <img src={require('../../../assets/img/officislSite/carshow/rongfang.png')} alt="" />
//           <span>RAV4 荣放</span>
//         </div>,
//         imgUrl: 'rongfang.png',
//         carName: 'RAV4 荣放',
//         slogan: '劲领天地间',
//         price: '￥179,800~￥269,800',
//         function: [
//           { opt: '车型详情' },
//           { opt: '预约试驾' },
//         ]
//       },
//       {
//         smallTitle: <div>
//           <img src={require('../../../assets/img/officislSite/carshow/yizhe.png')} alt="" />
//           <span>IZOA 奕泽</span>
//         </div>,
//         imgUrl: 'yizhe.png',
//         carName: 'IZOA 奕泽',
//         slogan: '奕人，奕世界',
//         price: '￥149,800~￥175,800',
//         function: [
//           { opt: '全景看车' },
//           { opt: '车型详情' },
//           { opt: '预约试驾' }
//         ]
//       }
//     ]
//   },
//   {
//     tabTitle: '中型客车',
//     carDetail: [
//       {
//         smallTitle: <div>
//           <img src={require('../../../assets/img/officislSite/carshow/kesida.png')} alt="" />
//           <span>COASTER 柯斯达</span>
//         </div>,
//         imgUrl: 'kesida.png',
//         carName: 'COASTER 柯斯达',
//         slogan: '超越平凡的动力，来自悦动的心',
//         price: '￥382,500~￥556,800',
//         function: [
//           { opt: '车型详情' },
//           { opt: '预约试驾' },
//         ]
//       }
//     ]
//   },
//   {
//     tabTitle: '原装进口',
//     carDetail: []
//   }
// ]
class CarShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'bottom',
      carList: [],
      carListIndex: this.props.cli
    }
  }
  componentDidMount(){
    this.brandModelsList();
  }
  brandModelsList() {
    carSellHelpInter.brandModelsList().then((res) => {
      if(res && res.code == '0') {
        this.setState({
          carList: res.data
        })
      }
    })
  }

  goType(alias) {
    window.location.href = '/buycar/cartype/detail/' + alias;
  }
  goDrive(cid) {
    window.location.href = 'carSellHelp/appointmentDrive?cid=' + cid;
  }
  go3D(cid) {
    if(Number(cid) === 33){
      window.open('/carSellHelp/digiAvalon');
    }else if(Number(cid) === 34){
      window.open('/carSellHelp/digiCorolla');
    }else if(Number(cid) === 32){
      window.open('/carSellHelp/digiIzoa');
    }
  }
  handleImgClick(is3d,cid,alias, brandid) {
    console.log(is3d);
    if(is3d) {
      this.go3D(cid)
    } else {
      this.goType(alias)
    }
  }
  render() {
    const TabPane = Tabs.TabPane;
    const { mode, carList } = this.state;
    // console.log(this.state.carListIndex);
    const carIndex = this.state.carListIndex + '';
    return (
      <div className='CarShowPage'>
        <Tabs type='card'
          defaultActiveKey={carIndex}
          tabPosition={mode}
          className='modal-options'
        >
          {
            carList.map((v, i) => {  // 外层循环
              return <TabPane tab={v.title} key={i} disabled = {v.car_series.length === 0 ? true:false}>
                <div>
                  <Tabs type='card'
                    defaultActiveKey="0"
                    tabPosition={mode}
                    className='car-options'
                  >
                    {
                      v.car_series.map((item, index) => {
                        return <TabPane tab={
                          <div className='scaleCar'>
                            {item.isnew === '1' ? <i className='isNew'></i> : null}
                            {item.is3d === '1' ? <i className='isThreeD'></i> : null}
                            <img src={item.thumb} alt=""/>
                            <span>{item.name}</span>
                          </div>
                        } key={index}>
                          <div className='carShow'>
                            <h1>{item.name}</h1>
                            <span>{item.keywords}</span>
                            <span>{item.price}</span>
                            <ul className='carShowBtn'>
                              {item.is3d === '1' ? <li onClick={this.go3D.bind(this,item.cid)}>全景看车</li> : null}
                              <li onClick={this.goType.bind(this, item.alias)}>车型详情</li>
                              {/* {item.is_presell === '1' ? <li>立即订购</li> : <li onClick={this.goDrive.bind(this,item.cid)}>预约试驾</li>} */}
                              {/* 针对威尔法隐藏试驾 */}
                              {item.is_presell === '1' ? <li>立即订购</li> : item.cid==35 || item.cid ==26 || item.cid == 12?<li onClick={this.goDrive.bind(this,item.cid)}>预约咨询</li>:<li onClick={this.goDrive.bind(this,item.cid)}>预约试驾</li>}
                            </ul>
                          </div>
                          <img src={item.big_thumb} alt="" onClick={this.handleImgClick.bind(this,item.is3d,item.cid,item.alias)}/>
                        </TabPane>
                      })
                    }
                  </Tabs>
                </div>
              </TabPane>
            })
          }
        </Tabs>
        <span className='closebtn' onClick={() => this.props.onClose(true)}></span>
      </div>
    )
  }
}

export default CarShow
