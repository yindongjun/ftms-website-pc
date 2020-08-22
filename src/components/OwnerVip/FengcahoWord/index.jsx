import React,{Component} from 'react'
import './index.less'
class FengchaoWorld extends Component {
  render(){
    return (
      <div className="warningWord">
        <p>注意</p>
        <p>扫码进入丰潮世界</p>
        <p>让未来的科技生活，提前到来</p>
        <img src={require("../../../assets/img/purebrand/news1/code.png")} alt=""/>
      </div>
    )
  }
}
export default FengchaoWorld