import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'
import moment from 'moment'
import './index.less'
import config from '../../../config.json'
import { personalInfo } from "../../../services/personalInfo";

const orderStatus = {
    "COMMIT": "待支付",
    "PAID": "已支付",
    "REFUND": "退款中",
    "REFUNDED": "已退款",
    "COMPLETED": "已完成",
    "CANCELED": "已取消"
};

class MyOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderObjectData: {}, // 所有订单列表数据
            orderListData: [], // 所有订单数据,包括了后台的页码数据和订单列表
            current: 1,
            accessToken: ''
        }
    }
    componentDidMount() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const accessToken = userInfo && userInfo.accessToken
        this.setState({
            accessToken: accessToken
        })
        // 获取所有订单列表
        this.queryOrderList()
    }
    queryOrderList(status, pageNum) {
        if(!status) {
            status = ''
        }
        if(!pageNum) {
            pageNum = '1'
        }
        const params = {
            "beginPage": pageNum,
            "memberId": "",
            "orderStatus": '',
            "orderType": status,
            "pageSize": "10"
        }
        personalInfo.orderList(params).then(res => {
            if (res && res.code === '0') {
                const data = res.data;
                this.setState({
                    orderObjectData: data || {},
                    orderListData: data.dataList || []
                })
            }
        })
    }
    goOrderDetail = (orderNo) => {
        console.log(orderNo)
        window.open(`${config.mallServerPath}/account/orderList/Payfor?id=` + orderNo + '&token=' + this.state.accessToken, '_blank'); //
    }
    goPay = (orderNo) => {
        console.log(orderNo)
        window.open(`${config.mallServerPath}/avalon/success/` + orderNo + '?token=' + this.state.accessToken, '_blank'); //
    }
    goRefund = (orderNo, refundNo) => {
        console.log(orderNo)
        window.open(`${config.mallServerPath}/account/recedeOrder/detail?refundNo=` + refundNo + '&orderNo=' + orderNo + '&token=' + this.state.accessToken, '_blank'); //
    }

    // 页码筛选
    onChange = (pageNumber) => {
        this.queryOrderList('', pageNumber)
    };

  render() {
      const { orderListData, orderObjectData } = this.state;

      return (
      <div className='handleMyOrder'>
        <h2>我的订单</h2>
        <Link to='/personcenter/home'>返回个人中心</Link>
        <div className='MyOrderList'>
          <ul className='orderTitle'>
            <li>商品</li>
            {/*<li>价格</li>*/}
            <li>订单金额</li>
            <li>订单状态</li>
            <li>操作</li>
          </ul>
            {
                orderObjectData.totalPages === 0 ? <div className='noData'>
                    <img src={require('../../../assets/img/personsenter/nothing.jpg')} alt=""/>
                    <div className='tip'>暂无记录</div>
                </div> : null
            }
          <ul className='orderList'>
            {
                orderListData.map((item, index) => {
                return <li key={index}>
                  < div>
                    <span>订单号：<i>{item.orderNo} {moment(item.commitTime).format('YYYY-MM-DD HH:mm:ss')}</i></span>
                    <span>{item.dealerName}</span>
                  </div>
                  <ul>
                    <li>
                        <img src={item.goodsImg} alt=""/>
                      <span>
                        <h3>{item.goodsName}</h3>
                        <p>{item.attrs[1].attributeName}：{item.attrs[1].attributeValueName}</p>
                        <p>{item.attrs[2].attributeName}：{item.attrs[2].attributeValueName}</p>
                      </span>
                    </li>
                    {/*<li>￥268,800.00</li>*/}
                    <li>￥{item.depositPrice}</li>
                    <li>{orderStatus[item.orderStatus]}</li>
                    <li>
                      {/*<button>立即支付</button>*/}
                      {/*<Link to='/personcenter/orderdetail'>订单详情</Link>*/}

                        {
                            item.orderStatus === 'COMMIT' ? (
                                <React.Fragment>
                                    <a>
                                        <button onClick={this.goPay.bind(this, item.orderNo)}>立即支付</button>
                                    </a>
                                    <a>
                                        <span onClick={this.goOrderDetail.bind(this, item.orderNo)}>订单详情</span>
                                    </a>
                                </React.Fragment>
                            ) : item.orderStatus === 'PAID' ? (
                                <React.Fragment>
                                    <a>
                                        <button onClick={this.goOrderDetail.bind(this, item.orderNo)}>订单详情</button>
                                    </a>
                                </React.Fragment>
                            ) : item.orderStatus === 'REFUND' ? (
                                <React.Fragment>
                                    <a>
                                        <button onClick={this.goRefund.bind(this, item.orderNo, item.refundNo)}>查看退款</button>
                                    </a>
                                    <a>
                                        <span onClick={this.goOrderDetail.bind(this, item.orderNo)}>订单详情</span>
                                    </a>
                                </React.Fragment>
                            ) : item.orderStatus === 'CANCELED' ? (
                                <React.Fragment>
                                    <a>
                                        <button onClick={this.goOrderDetail.bind(this, item.orderNo)}>订单详情</button>
                                    </a>
                                </React.Fragment>
                            ) : item.orderStatus === 'COMPLETED' && item.isAssess !== 'Y' ? (
                                <React.Fragment>
                                    <a>
                                        <button onClick={this.goOrderDetail.bind(this, item.orderNo)}>订单详情</button>
                                    </a>
                                </React.Fragment>
                                ) :
                                <a>
                                    <button onClick={this.goOrderDetail.bind(this, item.orderNo)}>订单详情</button>
                                </a>

                        }

                    </li>
                  </ul>
                </li>
              })
            }
          </ul>
            {
                orderObjectData.totalPages === 0 ? null : <Pagination showQuickJumper defaultCurrent={orderObjectData.currentPage || 1} total={orderObjectData.totalRows} onChange={this.onChange} />
            }
        </div>
      </div>
    )
  }
}

export default MyOrder