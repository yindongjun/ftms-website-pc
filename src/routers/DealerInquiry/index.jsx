import React, { Component } from 'react'
import {Input, Select, Checkbox, Button, DatePicker, Modal, message, Icon} from 'antd';
import './index.less'
import {headerApi, publicApi, loginApi} from "../../services/api";
import BaiduMap from "../../components/baiduMap";


class DealerInquiry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sex: '男',
      visible: false,
      isShowDealerDetail: false,
      provinceSelect: '110000',
      citySelect: '110000',
      // 地图
      sum: '',
      lat: 39.962357,
      lng: 116.456547,
      city: '北京',
      zoom: 11,
      identifying: 0,
      // 省份列表数据
      getProvince_RESDATA: [],
      // 城市列表数据
      getCity_RESDATA: [],
      // 经销商列表数据
      getDealer_RESDATA: [],
    }
  }

  componentDidMount() {
    this.getProvince();
    this.getCity(this.state.provinceSelect);

    let params = {
      provinceid: '',
      cityid: '',
      dealerName: '',
      cityName: '',
      provinceName: ''
    }
    this.searchDealer(params)
  }

  onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  }

  handleDealer = () => {
    this.setState({
      isShowDealerDetail: !this.state.isShowDealerDetail
    })
  }

  // 控制弹框
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  // 经销商地址 点击展开
  addressDetailOpen(index, {lng, lat, city, deacler_Name})  {
    console.log(index)
    if (this.state.addressDetailOpenNum === index) {
      this.searchBtn()
    } else {
      this.setState ({
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

  jumpAppDrive(name){
    this.props.history.push('/carSellHelp/appointmentDrive?dealerName=' + name)
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

  // 经销商查询
  searchDealer(params) {
    publicApi.searchDealer(params).then( (res) => {
      if(res && res.code === '0') {
        console.log(res.data)
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
  handleEnterSearch(e){
    if (e.which === 13) {
      this.searchBtn(e)
    }
  };
  // 按照经销商名称搜索
  searchBtn(e) {
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
  }

  render() {
    const Option = Select.Option;
    const { getProvince_RESDATA, getCity_RESDATA, getDealer_RESDATA, provinceSelect, citySelect} = this.state

    return (
      <div className='handleDealerInquiry'>
        <div className='headerPic'>
          <span>
            <h1>经销商查询</h1>
            <i></i>
          </span>
        </div>
        <div className='DealerInquiry'>
          <div className='dealerInfo'>
            <div className='deacler'>

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
              <Input onKeyDown={this.handleEnterSearch.bind(this)} id = 'searchBtn' placeholder="输入经销商名称快速查询" />
              <b>共找到<i>{this.state.sum}</i>条搜索结果</b>
              <span className = 'btn' onClick = {this.searchBtn.bind(this)}></span>
            </div>
            <div className='mapInfo'>
              <ul>
                {
                  getDealer_RESDATA && getDealer_RESDATA.map((item, index) => {
                    return (
                        <a key={index}>
                      <li className={this.state.addressDetailOpenNum === index ? 'open_li' : ''} onClick = {this.addressDetailOpen.bind(this, index, {lng: item.lng, lat: item.lat, city: item.city, deacler_Name: item.name})}>
                        <h5>
                          <span>{this.state.addressDetailOpenNum === index ? null : index+1}</span><i>{item.fullname}<Icon style={{position: 'absolute', top: '20%', right: '-7%'}} type="down" /></i>
                          {/* <b>32.66km</b> */}
                        </h5>
                        <p style = {{textAlign: 'left', marginLeft: '0.43rem', marginBottom: '0.2rem'}}>{item.address}</p>
                        <p style = {{textAlign: 'left', marginLeft: '0.43rem'}}>销售热线： {item.phone_seal}</p>
                        <p style = {{textAlign: 'left', marginLeft: '0.43rem'}}>服务热线： {item.phone_service}</p>
                        <a href='javascript:void(0)' onClick={this.jumpAppDrive.bind(this, item.name)} className='appdrive'>预约试驾</a>
                      </li>
                        </a>
                    )
                  })
                }
              </ul>
              <div className='map'>
                <BaiduMap lat={this.state.lat} lng={this.state.lng} city={this.state.city} dealerList={getDealer_RESDATA} zoom={this.state.zoom} identifying={this.state.identifying}></BaiduMap>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DealerInquiry
