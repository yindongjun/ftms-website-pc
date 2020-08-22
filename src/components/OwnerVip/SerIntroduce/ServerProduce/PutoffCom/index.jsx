import React, {Component} from 'react'
import {Form, Input, Select, DatePicker} from 'antd'
import {common} from '../../../../../services/common'
import {carOwner} from '../../../../../services/carOwner'
import './index.less'

const Option = Select.Option;
const {MonthPicker} = DatePicker;
const _this = this;

class PutoffCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carlist: [],
      carlistone: '',//车型
      carling: '',
      carage: '',//车龄
      yearxian: '',//年限
      yanbao: '',//延保年限
      price: '',//价格
    };
  }

  componentDidMount() {
    common.getVehicleList().then((res) => {
      if (res && res.code == '0') {
        this.setState({
          carlist: res.data
        })
      }
    })


    // let data1={
    //   carModel:'卡罗拉',
    //   carAge:'3个月',
    //   serviceLife:'3万公里',
    //   serviceType:'发动机故障'
    // }
    // carOwner.extenInSur(data1).then((res)=>{
    //   console.log(res);
    // })

  }

  getcarxing(event) {//取车型
    console.log(event)
    this.setState({
      carlistone: event
    })

    let data = {
      carModels: event,
      carAge: this.state.carage,
      serviceLife: this.state.yearxian,
      serviceType: this.state.yanbao
    }
    this.getjiage(data);
  }

  carlingvalue(event) {//取车龄
    if (event == 'NEW') {
      this.setState({
        carling: '新车',
        carage: '3个月（含）以内'
      })
    } else if (event == 'SUB_NEW') {
      this.setState({
        carling: '次新车',
        carage: '3个月以上至33个月'
      })
    } else if (event == 'null') {
      this.setState({
        carling: '暂未提供服务',
        carage: '33个月以上',
      })
    }
    this.setState({
      carage: event
    })
    let data = {
      carModels: this.state.carlistone,
      carAge: event,
      serviceLife: this.state.yearxian,
      serviceType: this.state.yanbao
    }
    this.getjiage(data);
  }

  getyearxian(event) {//取年限
    this.setState({
      yearxian: event
    })
    let data = {
      carModels: this.state.carlistone,
      carAge: this.state.carage,
      serviceLife: event,
      serviceType: this.state.yanbao
    }
    this.getjiage(data);
  }

  getyanbao(event) {//延保服务类型
    this.setState({
      yanbao: event
    })
    let data = {
      carModels: this.state.carlistone,
      carAge: this.state.carage,
      serviceLife: this.state.yearxian,
      serviceType: event
    }
    this.getjiage(data);
  }

  getjiage(data) {
    console.log(data)
    if (data.carModels && data.carAge && data.serviceLife && data.serviceType) {
      let init = {
        code: data.carModels,
        serviceLife: data.serviceLife,
        serviceType: data.serviceType,
        type: data.carAge
      }
      console.log(init)
      carOwner.extenInSur(init).then((res) => {
        console.log(res);
        if (res && res.code === '0') {
          this.setState({
            price: res.data
          })
        }
      })
    }
  }


  render() {
    return (
      <div className='handlePutoffCom'>
        <div>
          <label><i>*</i>车型：</label>
          <Select onChange={this.getcarxing.bind(this)} placeholder="请选择车型" style={{width: '3.68rem', height: '.4rem'}}>
            {/* <Option value="亚洲龙">亚洲龙</Option> */}
            {
              this.state.carlist.map((item, index) => {
                return (
                  <Option value={item.code} key={index}>{item.name}</Option>
                )
              })
            }
          </Select>
        </div>
        <div>
          <label><i>*</i>车龄：</label>
          <div>
            <Select onChange={this.carlingvalue.bind(this)} placeholder="请选择车龄"
                    style={{width: '3.68rem', height: '.4rem'}}>
              <Option value="NEW">3个月（含）以内</Option>
              <Option value="SUB_NEW">3个月以上至33个月</Option>
              <Option value="null">33个月以上</Option>
            </Select>
            <p>从新车销售到预计购买延保的月数</p>
          </div>
        </div>
        <div>
          <label>车辆类型：</label>
          <span>{this.state.carling}</span>
        </div>
        <div>
          <label><i>*</i>延保服务提供年限：</label>
          <Select disabled={this.state.carling=='暂未提供服务'?true:false} onChange={this.getyearxian.bind(this)} placeholder="请选择年限"
                  style={{width: '3.68rem', height: '.4rem'}}>
            <Option value="ONE_YEAR">1年3万公里</Option>
            <Option value="TWO_YEAR">2年6万公里</Option>
            <Option value="THREE_YEAR">3年9万公里</Option>
          </Select>

        </div>
        <div>
          <label><i>*</i>延保服务类型：</label>
          <Select disabled={this.state.carling=='暂未提供服务'?true:false} onChange={this.getyanbao.bind(this)} placeholder="请选择服务类型"
                  style={{width: '3.68rem', height: '.4rem'}}>
            <Option value="ENGINE">发动机保障</Option>
            <Option value="THREE_MAJOR">三大件保障</Option>
            <Option value="WHOLE_CAR">全车保障</Option>
          </Select>
        </div>
        <div>
          <label><i>*</i>延保参考价：</label>
          <span>{this.state.price}</span>
        </div>
        <p className='warning'>注：以上数据仅供参考，实际支付金额以最终客户贷款合同为准，详情可咨询当地经销商。</p>
      </div>
    )
  }
}

export default PutoffCom
