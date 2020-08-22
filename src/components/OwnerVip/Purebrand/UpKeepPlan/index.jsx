import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import { Form, Input, Select, DatePicker, Modal, message } from 'antd';
import './index.less'
import { carOwner } from '../../../../services/carOwner'
import moment from 'moment';

const mileageList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
class UpKeepPlan extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowUpkeep: false,
      visible: false,
      carList: [],
      modelType: undefined,//车型
      displacement: '',//排量
      purchaseYear: undefined,//购买年份
      drivingMileage: undefined,//行驶里程数
      lastMaintenanceTime: undefined,//上次保养时间
      resultList: [],
      chaTab:[],
      checkTab:[],
      pathName: ''
    }
  }

  componentDidMount() {
    this.getCarList();
    this.props.form.validateFields();
    this.setState({
      pathName: this.props.location.pathname
    })
  }

  getCarList() {
    carOwner.getMaintainCarType().then((res) => {
      if(res && res.code =='0') {
        this.setState({
          carList:res.data
        })
      }
    })
    console.log(this);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleUpkeepDetail(upkeep) {
    const { modelType, displacement,purchaseYear, drivingMileage,lastMaintenanceTime} = this.state;
    if(upkeep) {
      if(modelType == undefined) {
        message.warn('请选择车型');
        return;
      }else if (drivingMileage == undefined) {
        message.warn('请选择行驶里程数');
        return;
      }else {
        const data = {};
        data.code = modelType;
        data.driveMileage = drivingMileage;
        carOwner.maintain(data).then((res) => {
          if(res && res.code == '0') {
            if(res.data != ''){
              var chaTab = [];
              chaTab.push({ col1: '序号', col2: '更换项目', col3: '操作说明', col4: '配件类型', col5: '操作' });
              if(res.data.changeProjectList.length > 0){
                res.data.changeProjectList.map((item,index)=>{
                  chaTab.push({
                    col1:index + 1,
                    col2:item.projectName,
                    col3:item.operateExplain,
                    col4:item.accessoriesType,
                    col5:'查看配件',
                    col6:item.accessoriesCode,
                  })
                })
              }
              var checkTab = [];
              checkTab.push({ col1: '序号', col2: '检查项目', col3: '操作说明' });
              if(res.data.checkProjectList.length > 0){
                res.data.checkProjectList.map((item,index) => {
                  checkTab.push({
                    col1:index + 1,
                    col2:item.projectName,
                    col3:item.operateExplain
                  })
                })
              }
              this.setState(() => {return{
                resultList:res.data,
                chaTab,
                checkTab
              }},() => {
                this.setState({isShowUpkeep: upkeep})
              })
            }else{
              message.warn('暂无数据');
              this.setState({isShowUpkeep: false})
            }
          }
        })
      }
    }else{
      this.setState({
        isShowUpkeep: false,
        modelType:undefined,
        drivingMileage:undefined,
        displacement:'',
        purchaseYear:undefined,
        lastMaintenanceTime:undefined
      })
    }
  }
  handleModelType(e) {
    this.setState({
      modelType: e
    })
  }
  handleDisplacement(e) {
    this.setState({
      displacement: e.target.value
    })
  }
  handlePurchaseYear(comment,now) {
    this.setState({
      purchaseYear: now
    })
  }
  handleDrivingMileage(e) {
    this.setState({
      drivingMileage: e
    })
  }
  gotobaoyang(){
    window.location.href="/ownervip/serverhall/appointmain?carType="+this.state.modelType+'&mileage='+this.state.drivingMileage;
  }
  handleLastMaintenanceTime(comment,now) {
    this.setState({
      lastMaintenanceTime: now
    })
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
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
  disabledDate=(current)=> {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  }
  gotolist(id,tit){
    window.open('/ownervip/purebrand/goodsshow/detail?id='+id+'&tit='+tit)
    // this.props.history.push({
    //   pathname:'/ownervip/purebrand/goodsshow/detail',
    //   state:{id:id,tit:tit}
    // })
  }

  render() {
    const Option = Select.Option;
    const { MonthPicker } = DatePicker;
    const { chaTab,checkTab,isShowUpkeep,carList,modelType,displacement,drivingMileage,purchaseYear,lastMaintenanceTime } = this.state
    return (
      <div className="handleUpKeep">
        <div className='UpKeepForm'>
          <div>
            <label><i>*</i>车型：</label>
            <Select placeholder="请选择你的车型" value={modelType} onChange={this.handleModelType.bind(this)} style={{ width: '3.68rem', height: '.4rem' }}>
              {
                carList.map((item,idnex) => {
                  return (
                    <Option value={item.code} key = {item.code}>{item.name}</Option>
                  )
                })
              }
            </Select>
          </div>
          {/* <div>
            <label>排量：</label>
            <Input placeholder="请输入排量" value={displacement} onChange={this.handleDisplacement.bind(this)} style={{ width: '3.68rem', height: '.46rem',cursor:'text' }} />
          </div> */}
          <div>
            <label>购买年份：</label>
            <MonthPicker
              value={purchaseYear ? moment(purchaseYear) : undefined}
              placeholder="请选择年款"
              onChange={this.handlePurchaseYear.bind(this)}
              format={'YYYY-MM'}
              disabledDate={this.disabledDate}
              style={{ width: '3.68rem', height: '.4rem' }} />
          </div>
          <div>
            <label><i>*</i>行驶里程数：</label>
            <Select placeholder="请选择行驶里程数" value={drivingMileage} onChange={this.handleDrivingMileage.bind(this)}
                    style={{ width: '3.68rem', height: '.4rem' }}>
              {
                mileageList.map((item)=>{
                  return <Option value={item} key={item}>{item}</Option>
                })
              }
            </Select>
            {/* <span className="add_pad">万公里</span> */}
          </div>



          <div>
            <label>上次保养时间：</label>
            <DatePicker
            value={lastMaintenanceTime ? moment(lastMaintenanceTime) : undefined}
            format="YYYY-MM-DD"
            placeholder="请选择上次保养时间"
            onChange={this.handleLastMaintenanceTime.bind(this)}
            format={'YYYY-MM-DD'}
            disabledDate={this.disabledDate}
            style={{ width: '3.68rem', height: '.4rem' }} />
          </div>
          <span className="add_pad">万公里</span>
        </div>
        <div className="submit-btn">
          <span onClick={() => this.handleUpkeepDetail(true)}>查询</span>
          <span onClick={() => this.handleUpkeepDetail(false)}>重置</span>
        </div>
        {
          isShowUpkeep ?
            <Fragment>
              <table className="changeTab" >
                <thead>
                  <tr>
                    <th colSpan='4'>更换</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    chaTab.length > 0 ? chaTab.map((v, i) => {
                      return <tr key={i}>
                      {/* <div className='ActivityDetailContent' ></div> */}
                        <td>{v.col1}</td>
                        <td dangerouslySetInnerHTML={{__html: v.col2}}></td>
                        <td dangerouslySetInnerHTML={{__html: v.col3}}></td>
                        <td dangerouslySetInnerHTML={{__html: v.col4}}></td>
                        {/* <td>{v.col2}</td> */}
                        {/* <td>{v.col3}</td> */}
                        {/* <td>{v.col4}</td> */}
                        <td>
                        {v.col6?<span onClick={()=>{this.gotolist(v.col6,v.col2)}}>{v.col5}</span>:null}
                        </td>
                      </tr>
                    }) : null
                  }
                </tbody>
              </table>
              <table className="checkTab">
                <thead>
                  <tr>
                    <th colSpan='3'>检查</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    checkTab.length > 0 ? checkTab.map((v, i) => {
                      return <tr key={i}>
                        <td>{v.col1}</td>
                        <td dangerouslySetInnerHTML={{__html: v.col2}}></td>
                        <td dangerouslySetInnerHTML={{__html: v.col3}}></td>
                        {/* <td>{v.col2}</td>
                        <td>{v.col3}</td> */}
                      </tr>
                    }) : null
                  }
                </tbody>
              </table>
              <span className="warnning">
                <p>{this.state.resultList.promptProjectList.length > 0 ? '提示：'+this.state.resultList.promptProjectList[0].tips : ''}</p>
              </span>
              <div className="protectBtn">
                  {
                    'UpKeepPlan'.indexOf(this.state.pathName) <= -1?
                    <span onClick={this.gotobaoyang.bind(this)}>立即预约保养</span>:
                    <Link to={`/ownervip/serverhall/appointmain?carType=${modelType}&mileage=${drivingMileage}`}><span>立即预约保养</span></Link>
                  }
              </div>
            </Fragment>
            :
            null
        }
        <Modal
          title=""
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          wrapClassName="partsdetail"
          centered={true}
        >
          <img src={require("../../../../assets/img/purebrand/shadow.png")} alt="" />
          <h2>一汽丰田汽车机油精品配件 SN/GF-5 0W-20 5.5L</h2>
          <div>
            <p>纯牌机油有多种粘合度可供选择</p>
            <p>OW-20/5W-20/5W-30/5W-40/10W-30</p>
            <p>抗磨降噪，清洁发动机</p>
            <p>卓越的控温能力，提高油品的氧化能力，减少油品在高温下变质问题</p>
          </div>
        </Modal>
      </div>
    )
  }
}

const UpKeepPlan1 = Form.create({})(UpKeepPlan);
export default UpKeepPlan1
