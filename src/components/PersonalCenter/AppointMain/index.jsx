import React,{Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import { Modal, Pagination, Button } from 'antd'
import moment from 'moment';
import { personalInfo, updateServiceStatus} from '../../../services/personalInfo' 
import { querryStringToObject } from '../../../utils/util'
import './index.less'

class AppointMain extends Component {
  constructor(props){
    super(props)
    this.state={
      visible: false,
      tainList: [],
      showTagName: '',
      cancelId: '',
      page: 0,
      current: 1,
      drivePageSize: 0,
      otherPageSize: 0,
      pageSize: 6
    }
  }
  componentDidMount() {
    this.queryMainTainList(this.state.page);
  }
  queryMainTainList(page, cur) {
    if(cur) {

    }else {
      page++;
    }
    console.log(page,cur)
    const search = this.props.location.search;
    const params = querryStringToObject(search);
    this.setState({
      showTagName: params.name
    })
    if(params.name==3) {
      const data = {};
      data.beginPage = cur?cur:page;
      data.pageSize = this.state.pageSize;
      data.mallMemberId = '';
      personalInfo.queryDriveList(data).then((res) => {
        if(res && res.code =='0') {
          this.setState({
            tainList: res.data.dataList?res.data.dataList:[],
            drivePageSize: res.data.totalRows
          })
        }
      })
    }else {
      const data = {};
      data.beginPage = cur?cur:page;
      data.pageSize = this.state.pageSize;
      data.serviceType = params.name;
      personalInfo.queryMainTainList(data).then((res) => {
        if(res && res.code =='0') {
          this.setState({
            tainList: res.data.dataList?res.data.dataList:[],
            otherPageSize: res.data.totalRows
          })
        }
      })
    }
  }
  pageChange(page) {
    this.setState({
      current: page
    })
    this.queryMainTainList(this.state.page, page);
  }
  updateServiceStatus(id) {
    this.setState({
      visible: true,
      cancelId: id
    });
    console.log(id);
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    // console.log(e);
    const {cancelId, showTagName} = this.state;
    if(showTagName==3) {
      personalInfo.updateSubscribeStatus(cancelId).then((res)=> {
        if(res && res.code =='0') {
          this.queryMainTainList();
        }
      })
    }else {
      personalInfo.updateServiceStatus(cancelId).then((res)=>{
        if(res && res.code =='0') {
          this.queryMainTainList();
        }
      })
    }
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }
  repairInfo(id) {
    const {showTagName} = this.state;
    if(showTagName==1) {
      window.location.href = '/ownervip/serverhall/appointmain?id='+id
    }else if (showTagName==2) {
      window.location.href = '/ownervip/serverhall/apponitfixed?id='+id
    }else if (showTagName==3) {
      window.location.href = '/carSellHelp/appointmentDrive?id='+id
    }
  }
  subAgain() {
    const {showTagName} = this.state;
    if(showTagName==1) {
      window.location.href = '/ownervip/serverhall/appointmain'
    }else if (showTagName==2) {
      window.location.href = '/ownervip/serverhall/apponitfixed'
    }else if (showTagName==3) {
      window.location.href = '/carSellHelp/appointmentDrive'
    }
  }

  render(){
    const { tainList,showTagName, current, page, drivePageSize, otherPageSize, pageSize } = this.state; 
    return (
      <div className='handleAppointMain'>
        <h2>{showTagName==1?'预约保养':showTagName==2?'预约维修':showTagName==3?'预约试驾':''}</h2>
        <Link to='/personcenter/home'>返回个人中心</Link>
        <ul className='maintainList'>
          <li>
            {
              showTagName==3?
                  tainList.map((item,index)=>{
                   return <div key={item.id}>
                            <ul>
                                <li>车系车型</li>
                                <li>联系人</li>
                                <li>手机号</li>
                                <li>经销商</li>
                                <li>预约到店时间</li>
                                <li>状态</li>
                                <li>预计购车时间</li>
                                <li className="add_spec">操作</li>
                            </ul>
                            <div><span>预约编号：<b>{item.no}</b></span><span>预约时间：<b>{moment(Number(item.addTime)).format('YYYY-MM-DD HH:mm:ss')}</b></span></div>
                            <ul>
                              <li>{item.productname}</li>
                              <li>{item.name}</li>
                              <li>{item.mobile}</li>
                              <li>{item.dealerName}</li>
                              <li>{moment(Number(item.driveDate)).format('YYYY-MM-DD HH:mm:ss')}</li>
                              <li>{item.subscribeStatus=='COMMIT'?'已提交':item.subscribeStatus=='LOST_EFFICACY'?'已过期':item.subscribeStatus=='CANCEL'?'已取消':''}</li>
                              <li>{item.planShoppingTime}</li>
                              {
                                item.subscribeStatus=='COMMIT'?
                                <li className="add_spec">
                                  <span onClick={this.updateServiceStatus.bind(this,item.id)}>取消预约</span>
                                  <span onClick={this.repairInfo.bind(this,item.id)}>修改</span>
                                </li>:
                                item.subscribeStatus=='CANCEL'?
                                <li className="add_spec">
                                  <span onClick={this.subAgain.bind(this)}>再次预约</span>
                                </li>
                                :
                                <li className="add_spec"></li>
                            }
                            </ul>
                        </div>
            })
              :
              tainList.map((item,index)=>{
                return <div key={item.id}>
                         <ul>
                             <li>车系车型</li>
                             <li>联系人</li>
                             <li>手机号</li>
                             <li>经销商</li>
                             <li>预约到店时间</li>
                             <li>状态</li>
                             <li className="add_spec">操作</li>
                         </ul>
                         <div>
                           <span>预约编号：<b>{item.orderNo}</b></span>
                           <span>预约时间：<b>{moment(Number(item.createtime*1000)).format('YYYY-MM-DD HH:mm:ss')}</b></span>
                        </div>
                         <ul>
                           <li>{item.clationname}</li>
                           <li>{item.name}</li>
                           <li>{item.mobile}</li>
                           <li>{item.dealername}</li>
                           <li>{item.gotime}</li>
                           <li>{item.serviceStatus==0?'已提交':item.serviceStatus==5?'已取消':item.serviceStatus==7?'已过期':''}</li>
                           {/* <li>{item.planShoppingTime}</li> */}
                           {
                             item.serviceStatus==0?
                             <li className="add_spec">
                               <span onClick={this.updateServiceStatus.bind(this,item.id)}>取消预约</span>
                               <span onClick={this.repairInfo.bind(this,item.id)}>修改</span>
                             </li>:
                             item.serviceStatus==5?
                             <li className="add_spec">
                               <span onClick={this.subAgain.bind(this)}>再次预约</span>
                             </li>:
                             <li className="add_spec"></li>
                         }
                         </ul>
                     </div>
         })
            }
          </li>
        </ul>
        <Modal
          title=""
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          centered={true}
          wrapClassName='cancelmodalbox'
          footer={[
            // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
            // <Button key="back" onClick={this.handleCancel}></Button>,
            <Button class="ant-btn" id="confir" type="button" onClick={this.handleOk}>
              <span>确定</span>
            </Button>,          ]}

        >
          <img src={require('../../../assets/img/personsenter/doubt-icon.png')} alt=""/>
          <p>确定要取消预约吗？</p>
        </Modal>
        {
          showTagName == 3?//试驾分页
            <Pagination onChange={this.pageChange.bind(this)} current={current} showQuickJumper pageSize={pageSize} defaultCurrent={1} total={drivePageSize} />
          :
          <Pagination onChange={this.pageChange.bind(this)} current={current} showQuickJumper pageSize={pageSize} defaultCurrent={1} total={otherPageSize} />
        }
      </div>
    )
  }
}

export default AppointMain