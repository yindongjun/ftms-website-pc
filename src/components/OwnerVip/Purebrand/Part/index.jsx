import React from 'react'
import './index.less'
import { Form, Input, Select, DatePicker, Modal, message } from 'antd';
import{ carSellHelpInter }from '../../../../services/carSellHelpInter'

class Part extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderId: '',
      phone: '',
      resultFlag: false,
      visible: false,
      resultList: [],
      arrList: []
    }
  }

  componentDidMount(){
    
  }

  handlePartResult(part) {
    const {orderId, phone} = this.state;
    let TEL = /^((13[0-9])|(17[0-9])|(15[^4,\D])|(18[0-9])|(166)|(198)|(199)|(14[57]))\d{8}$/
    if(part) {
      if(orderId == '') {
        message.warning('请输入工单号');
        return;
      }else if (phone== '') {
        message.warning('请输入手机号');
        return;
      }else if (phone!=''&&!TEL.test(phone)) {
        message.warning('您输入的手机号有误，请输入正确的手机号');
        return;
      }else {
        //获取搜索结果
        const data = {
          'phoneno': phone,
          'orderno': orderId,
          'wechataccount': '',
          'tracecode': ''
        };
        carSellHelpInter.searchdetail(data).then((res) => {
          if(res && res.code == 0) {
            if(res.data && res.data.length>0) {
              this.setState({
                resultFlag: true,
                resultList: res.data
              })
              // let arr = [];
              // res.data.map((v,i) => {
              //   if(arr.indexOf(v.partname)==-1) {
              //     arr.push(v.partname);
              //   }
              // })
              // console.log(arr);
              // this.setState({
              //   arrList: [...arr]
              // })
            }else{
              this.setState({
                resultFlag: false,
                resultList: [],
                visible: true
              })
            }
          }else {
            this.setState({
              resultFlag: false,
              resultList: []
            })
          }
        })
      }
    }else {
      this.setState({
        orderId: '',
        phone: '',
        resultFlag: false
      })
    }
  }
  handleChange = (e) => {
    // console.log(e.target.name,e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    })
  }
  handleOk = (e) => {
    // console.log(e);
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
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  render() {
    const Option = Select.Option;
    const { MonthPicker } = DatePicker;
    const { orderId, phone, resultFlag } = this.state
    return (
      <div className="handlePart">
        <div className="search_box">
          <div>
              <label><i>*</i>工单号：</label>
              <input type="text" name="orderId" placeholder="请输入工单号" value={orderId} onChange={this.handleChange} />
            </div>
            <div>
              <label><i>*</i>手机号：</label>
              <input type="text" name="phone" placeholder="请输入手机号" maxLength={11} value={phone} onChange={this.handleChange} />
          </div>
        </div>
        <div className="submit-btn">
          <span onClick={() => this.handlePartResult(true)}>查询</span>
          <span onClick={() => this.handlePartResult(false)}>重置</span>
        </div>
        {
          resultFlag?
          <div className="search_result">
            <ul>
              <li>查询结果</li>
              <li>
                <span>序号</span>
                <span>零件名称</span>
                <span>销售方</span>
                <span>操作</span>
                <span>操作时间</span>
                <span>关联票号</span>
              </li>
              {
                this.state.resultList.map((item,index)=>{
                  return <li key={index}>
                            <span>{item.sortno}</span>
                            {/* <span>{this.state.arrList.indexOf(item.partname)==-1?'':this.state.arrList.indexOf(item.partname)+1}</span> */}
                            <span>{item.partname}</span>
                            <span>{item.businessname}</span>
                            <span>{item.event}</span>
                            <span>{item.operatetime}</span>
                            <span>{item.ticketno}</span>
                          </li>
                })
              }
            </ul>
          </div>
          :null
        }
        <Modal
          title=""
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          centered={true}
          wrapClassName='partModal'
        >
        <div className="partContent">
          <p></p>
          <h3>暂无相关数据，请您稍后重试</h3>
          <span onClick={this.handleOk}>确定</span>
        </div>
        </Modal>
      </div>
    )
  }
}

export default Part