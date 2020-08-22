import React, { Component } from 'react'
import { Tabs } from 'antd';
import EnterpriseProfile from '../../../components/BrandCenter/EnterpriseIntroduce/EnterpriseProfile'
import EnterproseMien from '../../../components/BrandCenter/EnterpriseIntroduce/EnterpriseMien'
import BrandHistory from '../../../components/BrandCenter/EnterpriseIntroduce/BrandHistory'
import './index.less'

class Introduce extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          display_gk: 'block', //此状态机为display的取值
          display_fc: 'none',
          display_lc: 'none'
        }
      }
    
    render() {
        const TabPane = Tabs.TabPane;
        let _this = this
        function checkBox (ev) {
        console.log(ev)
        ev === '1' && show1()
        ev === '2' && show2()
        ev === '3' && show3()
        }
        function show1() {
            _this.setState({
                display_gk: 'block', //此状态机为display的取值
                display_fc: 'none',
                display_lc: 'none'
            })
        }
        function show2() {
            _this.setState({
                display_gk: 'none', //此状态机为display的取值
                display_fc: 'block',
                display_lc: 'none'
            })
        }
        function show3() {
            _this.setState({
                display_gk: 'none', //此状态机为display的取值
                display_fc: 'none',
                display_lc: 'block'
            })
        }
        return (
            <div className="handleEnterPriseIntroduce">
                    <div className="EnterPriseIntroduce">
                        <div className='topBanner'>
                            <img className="headImg" src={require('../../../assets/img/companyprofile/banner.png')} alt="" />
                            <span className='tit'>企业介绍</span>
                            <i className='underLine'></i>
                        </div>
                        <Tabs className="link-navbar" defaultActiveKey="1" onTabClick= {checkBox}>
                            <TabPane tab="企业概况" key="1"></TabPane>
                            <TabPane tab="企业风采" key="2"></TabPane>
                            <TabPane tab="品牌历程" key="3"></TabPane>
                        </Tabs>
                        <div style={{display: this.state.display_gk}}>
                            <EnterpriseProfile />
                        </div>
                        <div style={{display: this.state.display_fc}}>
                            <EnterproseMien />
                        </div>
                        <div style={{display: this.state.display_lc}}>
                            <BrandHistory />
                        </div>
                        <div className="joinus">
                            <img src={require('../../../assets/img/brandcenter/enterpriseintroduce/joinus-icon.png')} alt=""/>
                            <a href="http://www.hotjob.cn/wt/FTMS/web/index?brandCode=null" target="_blank">加入我们</a>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Introduce
