// 粉丝互动
import React, {Component} from 'react'
import { Tabs } from 'antd';
import FengChaoWorld from '../../../components/BrandCenter/FansInteraction/FengChaoWorld'
import WonderfulRecom from '../../../components/BrandCenter/FansInteraction/WonderfulRecom'
import './index.less'

class FansInteraction extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      display_FengChaoWorld: 'block', //此状态机为display的取值
      display_WonderfulRecom: 'none'
    }
  }
  render(){
    const TabPane = Tabs.TabPane;
    let _this = this
    function checkBox (ev) {
      console.log(ev)
      ev === '1' && show1()
      ev === '2' && show2()
    }
    function show1() {
      _this.setState({
        display_FengChaoWorld: 'block', //此状态机为display的取值
        display_WonderfulRecom: 'none'
      })
    }
    function show2() {
      _this.setState({
        display_FengChaoWorld: 'none', //此状态机为display的取值
        display_WonderfulRecom: 'block'
      })
    }
    return(
      <div className='handleFansInteraction'>
      <div className="NewsCenter">
            <div className='headerPic'>
              <span>
                <h1>粉丝互动</h1>
                <i></i>
              </span>
            </div>
        <div className='FansInteraction'>
          {/* <img className="headImg" src={require('../../../assets/img/brandcenter/fansinteraction/banner.png')} alt="" /> */}
            <Tabs className="link-navbar" defaultActiveKey="1" onTabClick = {checkBox}>
              <TabPane tab="丰潮世界" key="1"></TabPane>
              <TabPane tab="精彩推荐" key="2"></TabPane>
            </Tabs>
            <div style={{ display: this.state.display_FengChaoWorld }}>
              <FengChaoWorld/>
            </div>
            <div style={{ display: this.state.display_WonderfulRecom }}>
              <WonderfulRecom/>
            </div>
        </div>
        </div>
      </div>
    )
  }
}

export default FansInteraction