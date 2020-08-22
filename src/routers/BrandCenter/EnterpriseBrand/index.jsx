import React, { Component } from 'react'
import Excellent  from '../../../components/BrandCenter/EnterpriseBrand/Excellent'
import { Tabs } from 'antd';
import BrandSystem from '../../../components/BrandCenter/EnterpriseBrand/BrandSystem';
import './index.less'

class EnterPriseBrand extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display_exc: 'block', //此状态机为display的取值
      display_bra: 'none',
    }
    this.tabChange = this.tabChange.bind(this)
  }
  componentDidMount() {
    this.setState({
      currentActiveKey: '1'
    })
  }
  tabChange(e) {
    this.setState({
      currentActiveKey: e
    })
  }
  render() {
    const TabPane = Tabs.TabPane;
    let _this = this
        function checkBox (ev) {
        console.log(ev)
        ev === '1' && show1()
        ev === '2' && show2()
        }
        function show1() {
            _this.setState({
                display_exc: 'block', //此状态机为display的取值
                display_bra: 'none',
            })
        }
        function show2() {
            _this.setState({
                display_exc: 'none', //此状态机为display的取值
                display_bra: 'block',
            })
        }
    return (
      <div className='handleEnterprise'>
        <div className="NewsCenter">
            <div className='headerPic'>
              <span>
                <h1>企业品牌</h1>
                <i></i>
              </span>
            </div>
          <div className='Enterprise'>
            {/* <img className="headImg" src={require('../../../assets/img/brandcenter/enterprisebrand/banner.png')} alt="" /> */}
            <Tabs className="link-navbar" defaultActiveKey="1" onTabClick = { checkBox }>
              <TabPane tab="致真至极" key="1"></TabPane>
              <TabPane tab="品牌体系" key="2"></TabPane>
            </Tabs>
            <div style={{display: this.state.display_exc}}>
              <Excellent/>
            </div>
            <div style={{display: this.state.display_bra}}>
              <BrandSystem/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EnterPriseBrand
