import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Select } from 'antd'
import './index.less'
import TextArea from 'antd/lib/input/TextArea';

class OrderDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
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

  render() {
    const Option = Select.Option;
    return (
      <div className='handleOrderDetail'>
        <h2>订单详情</h2>
        <Link to='/personcenter/home'>返回个人中心</Link>
        <ul className='OrderDetail'>
          <li>订单号：<i>8083838777747474 2018-12-21 19:00:00</i></li>
          <li>
            <h3>待支付</h3>
            <div>
              <h4>意向金：<i>￥800.00</i></h4>
              <p>还剩余 23时43分37秒 进行支付，若未及时付款，系统将自动取消</p>
            </div>
            <span>
              <button >立即支付</button>
              <button onClick={this.showModal}>取消订单</button>
            </span>
          </li>
          <li>
            <h3>提车信息</h3>
            <div>
              <h4>经销商信息</h4>
              <p>经销商名称：北京三元桥</p>
              <p>提车地址：010-84541072 | 010-84541073</p>
              <p>联系电话：北京市朝阳区左家庄路2号</p>
            </div>
            <div>
              <h4>购车人信息</h4>
              <p>姓名：张三</p>
              <p>联系电话：13811900089</p>
            </div>
          </li>
          <li>
            <h3>订单跟踪</h3>
            <div>
              <h4>提交订单，待支付意向金</h4>
              <p>2018-09-08 19:00:00</p>
            </div>
          </li>
          <li>
            <h3>车款详情</h3>
            <div>
              <ul>
                <li>
                  <img src={require('../../../assets/img/personsenter/car.png')} alt="" />
                  <img src={require('../../../assets/img/personsenter/room.png')} alt="" />
                  <img src={require('../../../assets/img/personsenter/appre.png')} alt="" />
                </li>
                <li>
                  <span>亚洲龙2.5L自然吸气</span>
                  <span>外观颜色：黑</span>
                  <span>内饰：红+黑</span>
                </li>
                <li>
                  <span>￥800.00</span>
                  <span>￥0.00</span>
                  <span>￥0.00</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div className='Total'>
          <h3>意向金：<i>￥800.00</i></h3>
          <h3>应付金额：<i>￥800.00</i></h3>
        </div>
        <Modal
          title=""
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          centered={true}
          wrapClassName='cancelOrderMadal'
        >
          <div>
            <label>取消原因：</label>
            <Select placeholder='请选择' style={{ width: '3rem',height: '.4rem' }}>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
            </Select>
          </div>
          <div>
            <label>其他原因：</label>
            <TextArea style={{ width: '3rem', height:'.8rem' }}/>
          </div>
          <div>
            <span>保存</span>
            <span>关闭</span>
          </div>
        </Modal>
      </div>
    )
  }
}
export default OrderDetail