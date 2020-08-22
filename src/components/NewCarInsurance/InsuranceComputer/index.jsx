import React, { Component } from 'react'
import moment from 'moment';
import { Select, Checkbox, DatePicker, Radio } from 'antd';
import './index.less'
import{ carSellHelpInter }from '../../../services/carSellHelpInter'
import { message } from 'antd';
import { querryStringToObject } from '../../../utils/util'

// =============================================== 计算规则 =========================================
    // 商业第三者责任险
    let ShangYeZR_regular_person = {
      '5万': 673,
      '10万': 972,
      '20万': 1204,
      '30万': 1359,
      '50万': 1631,
      '100万': 2124
    }
    let ShangYeZR_regular_company = {
      '5万': 714,
      '10万': 1007,
      '20万': 1227,
      '30万': 1374,
      '50万': 1635,
      '100万': 2130
    }
    // 车辆损失险
    // 个人	rate:0.0135		val:566
    // 企业	rate:0.0122		val:368
    // 计算：车的价格*rate+val

    // '司乘险'
    // 个人	0.0041,0.0026	rate:0.0067
    // 企业	0.0028,0.0015	rate:0.0043
    // 计算：车的价格*rate*保险人数/5
    // 原来是两个比率分别和车的价格相乘，然后加和，再乘以保险人数，除以5
    // 这里可以先把比率加和然后和车的价格相乘
    let SiCheng_regular_person = {
      '1人': 1,
      '2人': 2,
      '3人': 3,
      '4人': 4,
      '5人': 5
    }
    let SiCheng_regular_company = {
      '1人': 1,
      '2人': 2,
      '3人': 3,
      '4人': 4,
      '5人': 5
    }

    // 不计免月特赔险
    // 个人	rate:0.15
    // 企业	rate:0.15
    // 计算：不计免赔特约条款：（车辆损失险+第三者责任险）*rate

    // 自然损失险
    // 个人	rate:0.0015		val:0
    // 企业	rate:0.0015		val:0
    // 计算：车的价格*rate+val

    // 玻璃单独破碎险
    // 个人	rate: 0.0036		--进口		val:0
    //           0.0021		--国产
    // 企业	rate:0.0028		--进口		val:0
    //          0.0015		--国产	
    // 计算：车的价格*rate+val
    let BoLiPS_regular_person = {
      '进口': 0.0036,
      '国产': 0.0021
    }
    let BoLiPS_regular_company = {
      '进口': 0.0028,
      '国产': 0.0015
    }

    // 全车盗抢险
    // 个人	rate:0.0041		val:120
    // 企业	rate:0.0039		val:120
    // 计算：车的价格*rate+val

    // 车身划痕险
    // 个人	rate:0	val:850	--2千
    //                 1100	--5千
    //                 1500	--1万
    //                 2250	--2万
    // 企业	rate:0	val:850	--2千
    //                 1100	--5千
    //                 1500	--1万
    //                 2250	--2万
    // 计算：车的价格*rate+val
    let CheShenHH_regular_person = {
      '2千': 850,
      '5千': 1100,
      '1万': 1500,
      '2万': 2250
    }
// =================================================================================================
class InsuranceComputer extends Component {
  constructor(props) {
    super()
    this.state = {
      carModelIdSelect: 0,
      carModelNameSelect: '请选择车型',
      carConfigIdSelect: 0,
      carConfigNameSelect: '请选择配置',
      carPrice: 0,
      personalOrCompany: 'person',
      jiaotongqiangzhixian: {
        active: true,
        status: '6座以下'
      },
      shangyedisanzerenxian: {
        active: true,
        status: '20万'
      },
      cheliangsunshixian: {
        active: true,
        status: ''
      },
      sichengxian: {
        active: true,
        status: 1
      },
      bujimianpeiteyuexian: {
        active: true,
        status: ''
      },
      ziransunshixian: {
        active: true,
        status: ''
      },
      bolidanduposuixian: {
        active: true,
        status: '进口'
      },
      quanchedaoqiangxian: {
        active: true,
        status: ''
      },
      cheshenhuahen: {
        active: true,
        status: '2千'
      },
      datePicker: '',
      // 接口数据
      brandModelsList_RESDATA: [],
      getVersion_RESDATA: []
    }
  }
  // 生命周期
  componentDidMount() {
    this.brandModelsList()
    // 从详情要带入信息
    const search = this.props.location.search;
    const params = querryStringToObject(search);

    let carInfo_session = sessionStorage.getItem('carInfo_session')
    let carName = carInfo_session? 
                    JSON.parse(carInfo_session).carTitle?
                      JSON.parse(carInfo_session).carTitle
                      :
                      ''
                    :
                    ''
    
    this.setState({
      carModelIdSelect: params.carCid || '',
      carModelNameSelect: params.carCid?carName :'请选择车型'
    })
    if (params.carCid) this.getVersion(params.carCid)
  }
  // ================================================== 接口函数 ==================================================
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
            brandModelsList_RESDATA: arr.flat()
        })
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
  //
  handleSelectChange(type, va) {
    console.log(type, va);
    // this.setState({
    //   [type]: va
    // })
    if (type === 'carModelSelect') {
      this.setState({
        carModelIdSelect: va.split('*')[0],
        carModelNameSelect: va.split('*')[1],
        // 清空下级所有联动框
        carPrice: 0,
        carConfigIdSelect: 0,
        carConfigNameSelect: '请选择配置'
      })
      this.getVersion(va.split('*')[0])
    } else if (type === 'carConfigSelect') {
      this.setState({
        carPrice: va.split('*')[1],
        carConfigIdSelect: va.split('*')[0],
        carConfigNameSelect: va.split('*')[2]
      })
    }
  }
  //
  handleCheckBoxChange(type, value) {
    console.log(type, value)
    if (type == 'personalOrCompany') {
      this.setState({
        [type]: value
      })
    } else {
      this.setState({
        [type]: Object.assign({}, this.state[type], {status: value})
      })
    }
  }
  //
  handleCheckBoxTitleChange(type, e) {
    console.log(type, e.target.checked)
    this.setState({
      [type]: Object.assign({}, this.state[type], {active: e.target.checked})
    })
  }
  // 
  withinErrorMargin (left, right) {
    return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
  }
  // // 日期改变
  // datePickerChange(value, dataString) {
  //   console.log(value, dataString)
  //   this.setState({
  //     datePicker: dataString
  //   })
  // }
  // // 禁止选择之前的日期
  // disabledDate(current) {
  //   return current && current < moment().endOf('day');
  // }
  render() {
    const Option = Select.Option;
    const RadioGroup = Radio.Group
    
    const {brandModelsList_RESDATA, getVersion_RESDATA, personalOrCompany, jiaotongqiangzhixian, shangyedisanzerenxian, cheliangsunshixian,
    sichengxian, bujimianpeiteyuexian, ziransunshixian, bolidanduposuixian, quanchedaoqiangxian, cheshenhuahen, carPrice} = this.state
    // person
    let a = jiaotongqiangzhixian.active? 950 : 0
    let b = shangyedisanzerenxian.active? ShangYeZR_regular_person[shangyedisanzerenxian.status] : 0
    let c = cheliangsunshixian.active? carPrice * 0.0135 + 566 : 0
    let d = sichengxian.active? (carPrice * 0.0067 * sichengxian.status)/5 : 0
    let e = bujimianpeiteyuexian.active? (carPrice * 0.0135 + 566 +  ShangYeZR_regular_person[shangyedisanzerenxian.status]) * 0.15 : 0
    let f = ziransunshixian.active? carPrice * 0.0015 : 0
    let g = bolidanduposuixian.active? carPrice * BoLiPS_regular_person[bolidanduposuixian.status] : 0
    let h = quanchedaoqiangxian.active? carPrice * 0.0041 + 120 : 0
    let i = cheshenhuahen.active? CheShenHH_regular_person[cheshenhuahen.status] : 0
    // company
    let A = jiaotongqiangzhixian.active? 1100 : 0
    let B = shangyedisanzerenxian.active? ShangYeZR_regular_company[shangyedisanzerenxian.status] : 0
    let C = cheliangsunshixian.active? carPrice * 0.0122 + 368 : 0
    let D = sichengxian.active? (carPrice * 0.0043 * sichengxian.status)/5 : 0
    let E = bujimianpeiteyuexian.active? (carPrice * 0.0122 + 368 +  ShangYeZR_regular_company[shangyedisanzerenxian.status]) * 0.15 : 0
    let F = ziransunshixian.active? carPrice * 0.0015 : 0
    let G = bolidanduposuixian.active? carPrice * BoLiPS_regular_company[bolidanduposuixian.status] : 0
    let H = quanchedaoqiangxian.active? carPrice * 0.0039 + 120 : 0
    let I = cheshenhuahen.active? CheShenHH_regular_person[cheshenhuahen.status] : 0

    return (
      <div className='handleInsuranceComputer'>
        <div className='formList'>
          <span>
            <label>选择车型：</label>
            <Select value = {this.state.carModelNameSelect} style={{ width: '3.15rem', height: '.46rem' }} onChange = {this.handleSelectChange.bind(this, 'carModelSelect')}>
              {
                brandModelsList_RESDATA && brandModelsList_RESDATA.map( (item, index) => {
                  return (
                    <Option value={`${item.cid}*${item.name}`} key = {index}>{item.name}</Option>
                  )
                })
              }
            </Select>
          </span>&nbsp;
          <span>
            <label> 选择配置：&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <Select value = {this.state.carConfigNameSelect} style={{ width: '3.15rem', height: '.46rem' }} onChange = {this.handleSelectChange.bind(this, 'carConfigSelect')}>
              {
                getVersion_RESDATA && getVersion_RESDATA.map( (item, index) => {
                  return (
                    <Option value={`${item.id}*${item.shop_price}*${item.version + item.name.replace('<sup>+</sup>', '+')}`} key = {index}>{item.version + item.name.replace('<sup>+</sup>', '+')}</Option>
                  )
                })
              }
            </Select>
          </span>
          <span>
            <label>价格：</label>
            <i>¥{carPrice}</i>
          </span>
        </div>
        <div className='formList'>
          <span>
            <label>使用性质：</label>
            <Checkbox 
              onChange = {this.handleCheckBoxChange.bind(this, 'personalOrCompany', 'person')} 
              checked = {personalOrCompany === 'person'? true : false}
            >个人</Checkbox>
            <Checkbox 
              onChange = {this.handleCheckBoxChange.bind(this, 'personalOrCompany', 'company')} 
              checked = {personalOrCompany === 'company'? true : false}
            >企业</Checkbox>
          </span>
        </div>
        <div className='formList'>
          <span>
            <label>购车时间：</label>
            <DatePicker
              placeholder='请选择购车时间' 
              // disabledDate={this.disabledDate}
              // onChange = {this.datePickerChange.bind(this)}
              style={{ width: '3.2rem', height: '.46rem' }} 
            />
          </span>
          <span>
            <label>保险开始时间：</label>
            <DatePicker
              placeholder='请选择开始时间' 
              // disabledDate={this.disabledDate}
              // onChange = {this.datePickerChange.bind(this)}
              style={{ width: '3.2rem', height: '.46rem' }} 
            />
          </span>
        </div>
        <ul className='forceInsurance'>
          <li>强制保险</li>
          <li>
            <dl>
              <dd>险种</dd>
              <dd>选项</dd>
              <dd>金额</dd>
              <dd>说明</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dd>交通事故责任强制保险</dd>
              <dd> 
                <Checkbox
                  onChange = {this.handleCheckBoxChange.bind(this, 'jiaotongqiangzhixian', '6座以下')} 
                  checked = {jiaotongqiangzhixian.status === '6座以下'? true : false}
                >6座以下</Checkbox>
                <Checkbox
                  onChange = {this.handleCheckBoxChange.bind(this, 'jiaotongqiangzhixian', '6座及以上')} 
                  checked = {jiaotongqiangzhixian.status === '6座及以上'? true : false}
                >6座及以上</Checkbox>
              </dd>
              <dd>{jiaotongqiangzhixian.status === '6座以下'? 950:1100}元</dd>
              <dd>
                <span>家用6座以下950/年</span>
                <span>家用6座及以上1100/年</span>
              </dd>
            </dl>
          </li>
        </ul>
        <ul className='commercial-insurance'>
          <li>商业保险</li>
          <li>
            <ul>
              <li>险种</li>
              <li>选项</li>
              <li style = {{fontWeight: 'normal'}}>金额</li>
              <li>说明</li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <Checkbox
                  onChange = {this.handleCheckBoxTitleChange.bind(this, 'shangyedisanzerenxian')} 
                  checked = {shangyedisanzerenxian.active? true : false}
                >商业第三者责任险</Checkbox></li>
              <li>
                {/* <span>
                  <Checkbox
                    onChange = {this.handleCheckBoxChange.bind(this, 'shangyedisanzerenxian', '5万')} 
                    checked = {shangyedisanzerenxian.status === '5万'? true : false}
                  > 5 万 </Checkbox>
                </span>
                <span>
                  <Checkbox
                    onChange = {this.handleCheckBoxChange.bind(this, 'shangyedisanzerenxian', '10万')} 
                    checked = {shangyedisanzerenxian.status === '10万'? true : false}
                  >10万</Checkbox>
                </span> */}
                <span>
                  <Checkbox
                    onChange = {this.handleCheckBoxChange.bind(this, 'shangyedisanzerenxian', '20万')} 
                    checked = {shangyedisanzerenxian.status === '20万'? true : false}
                  >20万</Checkbox>
                </span>
                <span>
                  <Checkbox
                    onChange = {this.handleCheckBoxChange.bind(this, 'shangyedisanzerenxian', '30万')} 
                    checked = {shangyedisanzerenxian.status === '30万'? true : false}
                  >30万</Checkbox>
                </span>
                <span>
                  <Checkbox
                    onChange = {this.handleCheckBoxChange.bind(this, 'shangyedisanzerenxian', '50万')} 
                    checked = {shangyedisanzerenxian.status === '50万'? true : false}
                  >50万</Checkbox>
                </span>
                <span>
                  <Checkbox
                    onChange = {this.handleCheckBoxChange.bind(this, 'shangyedisanzerenxian', '100万')} 
                    checked = {shangyedisanzerenxian.status === '100万'? true : false}
                  >100万</Checkbox>
                </span>
              </li>
              <li>{
                personalOrCompany === 'person'?
                  shangyedisanzerenxian.active? 
                  ShangYeZR_regular_person[shangyedisanzerenxian.status] : 0
                :
                  shangyedisanzerenxian.active?
                  ShangYeZR_regular_company[shangyedisanzerenxian.status] : 0
              }元</li>
              <li>车辆发生事故时，赔偿第三方造成的人身及财产损失。</li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <Checkbox
                  onChange = {this.handleCheckBoxTitleChange.bind(this, 'cheliangsunshixian')} 
                  checked = {cheliangsunshixian.active? true : false}
                >车辆损失险</Checkbox></li>
              <li></li>
              <li>{
                personalOrCompany === 'person'?
                  cheliangsunshixian.active?
                  (carPrice * 0.0135 + 566).toFixed(2)  : 0
                : 
                  cheliangsunshixian.active?
                  (carPrice * 0.0122 + 368).toFixed(2) : 0
              }元</li>
              <li>车辆发生碰撞后，由保险公司赔偿爱车损失的费用。</li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <Checkbox
                  onChange = {this.handleCheckBoxTitleChange.bind(this, 'sichengxian')} 
                  checked = {sichengxian.active? true : false}
                >司乘险</Checkbox></li>
              <li>
                <span>
                  <Checkbox
                    onChange = {this.handleCheckBoxChange.bind(this, 'sichengxian', 1)} 
                    checked = {sichengxian.status === 1? true : false}
                  >1人</Checkbox>
                </span>
                <span>
                  <Checkbox
                    onChange = {this.handleCheckBoxChange.bind(this, 'sichengxian', 2)} 
                    checked = {sichengxian.status === 2? true : false}
                  >2人</Checkbox>
                </span>
                <span>
                  <Checkbox
                    onChange = {this.handleCheckBoxChange.bind(this, 'sichengxian', 3)} 
                    checked = {sichengxian.status === 3? true : false}
                  >3人</Checkbox>
                </span>
                <span>
                  <Checkbox
                    onChange = {this.handleCheckBoxChange.bind(this, 'sichengxian', 4)} 
                    checked = {sichengxian.status === 4? true : false}
                  >4人</Checkbox>
                </span>
                <span>
                  <Checkbox
                    onChange = {this.handleCheckBoxChange.bind(this, 'sichengxian', 5)} 
                    checked = {sichengxian.status === 5? true : false}
                  >5人</Checkbox>
                </span>
              </li>
              <li>{
                personalOrCompany === 'person'?
                  sichengxian.active? 
                  ((carPrice * 0.0067 * sichengxian.status)/5).toFixed(2) : 0
                : 
                  sichengxian.active?
                  ((carPrice * 0.0043 * sichengxian.status)/5).toFixed(2) : 0
              }元</li>
              <li>赔偿全车被盗、抢劫、抢夺造成的车辆财产损失。</li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <Checkbox
                  onChange = {this.handleCheckBoxTitleChange.bind(this, 'bujimianpeiteyuexian')} 
                  checked = {bujimianpeiteyuexian.active? true : false}
                >不计免赔特约险</Checkbox>
              </li>
              <li></li>
              <li>{
                personalOrCompany === 'person'?
                  bujimianpeiteyuexian.active?
                  ((carPrice * 0.0135 + 566 +  ShangYeZR_regular_person[shangyedisanzerenxian.status]) *0.15) .toFixed(2) : 0
                : 
                  bujimianpeiteyuexian.active?
                  ((carPrice * 0.0122 + 368 +  ShangYeZR_regular_company[shangyedisanzerenxian.status]) * 0.15) .toFixed(2) : 0
              }元</li>
              <li>当保险事故发生后，保险公司将为您承担全部费用。</li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <Checkbox
                  onChange = {this.handleCheckBoxTitleChange.bind(this, 'ziransunshixian')} 
                  checked = {ziransunshixian.active? true : false}
                >自然损失险</Checkbox>
              </li>
              <li></li>
              <li>{
                ziransunshixian.active?
                (carPrice * 0.0015).toFixed(2) : 0
              }元</li>
              <li>赔偿车子因电器、线路、运载货物等自身原因引发火灾造成的损失。</li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <Checkbox
                  onChange = {this.handleCheckBoxTitleChange.bind(this, 'bolidanduposuixian')} 
                  checked = {bolidanduposuixian.active? true : false}
                >玻璃单独破碎险</Checkbox>
              </li>
              <li>
                <span>
                  <Checkbox
                    onChange = {this.handleCheckBoxChange.bind(this, 'bolidanduposuixian', '进口')} 
                    checked = {bolidanduposuixian.status === '进口'? true : false}
                  >进口</Checkbox>
                </span>
                <span>
                  <Checkbox
                    onChange = {this.handleCheckBoxChange.bind(this, 'bolidanduposuixian', '国产')} 
                    checked = {bolidanduposuixian.status === '国产'? true : false}
                  >国产</Checkbox>
                </span>
              </li>
              <li>{
                personalOrCompany === 'person'?
                  bolidanduposuixian.active?
                  (carPrice * BoLiPS_regular_person[bolidanduposuixian.status]).toFixed(2) : 0
                : 
                  bolidanduposuixian.active?
                  (carPrice * BoLiPS_regular_company[bolidanduposuixian.status]).toFixed(2) : 0
              }元</li>
              <li>赔偿保险车辆在试用过程中，发生车窗、挡风玻璃的单独破碎损失。</li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <Checkbox
                  onChange = {this.handleCheckBoxTitleChange.bind(this, 'quanchedaoqiangxian')} 
                  checked = {quanchedaoqiangxian.active? true : false}
                >全车盗抢险</Checkbox>
              </li>
              <li></li>
              <li>{
                personalOrCompany === 'person'?
                  quanchedaoqiangxian.active?
                  (carPrice * 0.0041 + 120).toFixed(2) : 0
                : 
                  quanchedaoqiangxian.active?
                  (carPrice * 0.0039 + 120).toFixed(2) : 0
              }元</li>
              <li>赔偿全车被盗窃、抢劫、抢夺造成的车辆财产损失。</li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <Checkbox
                  onChange = {this.handleCheckBoxTitleChange.bind(this, 'cheshenhuahen')} 
                  checked = {cheshenhuahen.active? true : false}
                >车身划痕</Checkbox>
              </li>
              <li>
                <span>
                  <Checkbox
                    onChange = {this.handleCheckBoxChange.bind(this, 'cheshenhuahen', '2千')} 
                    checked = {cheshenhuahen.status === '2千'? true : false}
                  >2千</Checkbox>
                </span>
                <span>
                  <Checkbox
                    onChange = {this.handleCheckBoxChange.bind(this, 'cheshenhuahen', '5千')} 
                    checked = {cheshenhuahen.status === '5千'? true : false}
                  >5千</Checkbox>
                </span>
                <span>
                  <Checkbox
                    onChange = {this.handleCheckBoxChange.bind(this, 'cheshenhuahen', '1万')} 
                    checked = {cheshenhuahen.status === '1万'? true : false}
                  >1万</Checkbox>
                </span>
                <span>
                  <Checkbox
                    onChange = {this.handleCheckBoxChange.bind(this, 'cheshenhuahen', '2万')} 
                    checked = {cheshenhuahen.status === '2万'? true : false}
                  >2万</Checkbox>
                </span>
              </li>
              <li>{
                cheshenhuahen.active?
                CheShenHH_regular_person[cheshenhuahen.status] : 0
              }元</li>
              <li>赔偿他人恶意行为造成的保险车辆的车身人为划痕。</li>
            </ul>
          </li>
        </ul>
        <div className='bottompart'>
          <h3>新车保险参考价格:￥<i>{
            // 前提勾选才能合计
            personalOrCompany === 'person'?
            parseFloat(a+b+c+d+e+f+h+g+i).toFixed(2)
            :
            parseFloat(A+B+C+D+E+F+H+G+I).toFixed(2)
            // (
            //   jiaotongqiangzhixian.active? 950 : 0 +
            //   (shangyedisanzerenxian.active? ShangYeZR_regular_person[shangyedisanzerenxian.status] : 0) +
            //   (cheliangsunshixian.active? (carPrice * 0.0135 + 566).toFixed(2) : 0) +
            //   (sichengxian.active? ((carPrice * 0.0067 * sichengxian.status)/5).toFixed(2) : 0) +
            //   bujimianpeiteyuexian.active? (carPrice * 0.0135 + 566 +  ShangYeZR_regular_person[shangyedisanzerenxian.status]).toFixed(2) : 0 +
            //   ziransunshixian.active? (carPrice * 0.0015).toFixed(2) : 0 +
            //   bolidanduposuixian.active? (carPrice * BoLiPS_regular_person[bolidanduposuixian.status]).toFixed(2) : 0 +
            //   quanchedaoqiangxian.active? (carPrice * 0.0041 + 120).toFixed(2) : 0 +
            //   cheshenhuahen.active? CheShenHH_regular_person[cheshenhuahen.status] : 0
            // ).toFixed(2)
            // :
            // (
            //   jiaotongqiangzhixian.active? 1100 : 0 +
            //   shangyedisanzerenxian.active? ShangYeZR_regular_company[shangyedisanzerenxian.status] : 0 +
            //   cheliangsunshixian.active? (carPrice * 0.0122 + 368).toFixed(2) : 0 +
            //   sichengxian.active? ((carPrice * 0.0043 * sichengxian.status)/5).toFixed(2) : 0 +
            //   bujimianpeiteyuexian.active? (carPrice * 0.0122 + 368 +  ShangYeZR_regular_company[shangyedisanzerenxian.status]).toFixed(2) : 0 +
            //   ziransunshixian.active? (carPrice * 0.0015).toFixed(2) : 0 +
            //   bolidanduposuixian.active? (carPrice * BoLiPS_regular_company[bolidanduposuixian.status]).toFixed(2) : 0 +
            //   quanchedaoqiangxian.active? (carPrice * 0.0039 + 120).toFixed(2) : 0 +
            //   cheshenhuahen.active? CheShenHH_regular_person[cheshenhuahen.status] : 0
            // ).toFixed(2)
          }</i></h3>
          <p>注：此保险测算结果仅供参考，实际保费以保单为准</p>
        </div>  
      </div>
    )
  }
}

export default InsuranceComputer