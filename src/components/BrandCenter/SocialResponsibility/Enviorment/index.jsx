import React,{Component} from 'react'
import{ common }from '../../../../services/common'
import './index.less'
import { Modal } from 'antd'
import VideoWin from '@/components/VideoWin'

class Enviorment extends Component{
  constructor(props){
    super(props)
    this.state ={
      videodata: '',
      vediovisible:false
    }
  }
  componentDidMount(){
    common.getVideoUrl('Environment').then((res)=>{
      if(res && res.code==='0'){
        this.setState({
          videodata:res.data[0],
        })
      }
    })
  }
  showVedio = (e) => {
    this.setState({
      vediovisible: true,
    });
  }
  handleShow = (e) => {
    console.log(e);
    this.setState({
      vediovisible: false,  
    });
  }
  handleHide = (e) => {
    console.log(e);
    this.setState({
      vediovisible: false,
    });
  }

  render(){
    return(
      <div className='handleEnviorment'>
        <span>2018年藏东“丁青”雪豹守护行动</span>
        <ul className='Enviormentdesc'>
          <li>西藏丁青县布托湖湿地景观恢复项目由一汽丰田、中国绿化基金会发起，丁青县人民政府、丁青县林业局、山水自然保护中心负责执行，项目希望从科学研究、生态修复、社区发展和自然体验四个角度出发，保障澜沧江上游最重要的水源涵养地——布托湖国家级湿地公园的生态健康，促进整个景观生态系统的保护，并从基础研究和在地保护行动出发，为青藏高原东部草地恢复、水源涵养以及雪豹研究与保护等保护政策提供科学指导。</li>
          <li></li>
          <li></li>
          <li><i>布托湖国家级湿地公园：</i>位于西藏昌都市丁青县，距昌都机场4小时车程，约260公里。澜沧江支流色曲河上源湖盆区域，是澜沧江上游最大的湖泊。行政区范围属于丁青县丁青镇布托村和仲柏村，湿地公园规划总面积9763.06公顷。</li>
          <li>
            中国拥有全球60%的雪豹栖息地。丁青县地处青藏高原腹地，是澜沧江的发源地，这里是中国雪豹分布的中心，也是面积最大的连续雪豹栖息地。丁青县与临近的玉树州一起，拥有全国最大最连续的雪豹栖息地澜沧江源区雪豹景观。
            <p>图为丁青县与玉树州连接在一起，拥有全国最大最连续的一片雪豹栖息地：澜沧江源区雪豹景观</p>
          </li>
          <li></li>
        </ul>
        <h3>三年项目总目标</h3>
        <ul className='TotalTarget'>
          <li>
            <h4><i>01</i>科学研究</h4>
            <p>开展草地管理与恢复、水源涵养以及雪豹种群等三个课题的研究。通过召开研讨会等形式，为青藏高原草地恢复以及雪豹研究与保护等保护政策提供科学的建议；</p>
          </li>
          <li>
          <h4><i>02</i>野生动物野外保护与救护</h4>
            <p>加强雪豹等野生动植物的巡护与管理。全面监控县域内雪豹种群状况及伴生动物状况、以雪豹为主的野生动物栖息地变化情况和植被群落状况、县域存在的干扰状况。分组、分时段、分区域、分职能进行野外巡护。与执行机构共同合作开展野生动物救助，联合经验丰富的动物园或救助机构进行饲养，在康复之后开展野外放归行动；</p>
          </li>
          <li>
          <h4><i>03</i>生态修复</h4>
            <p>对2000亩重度退化的草场进行植被恢复，并评估其水源涵养能力；对8000亩轻度退化的草场，通过草地管理，提高生物多样性和生产效率，评估出好的放牧方式；开展反盗猎巡护等工作，三年内实现区域内雪豹种群稳定；</p>
          </li>
          <li>
          <h4><i>04</i>社区发展</h4>
            <p>通过建立人兽冲突基金、提高防护能力等，补偿牧民因为生态保护而受的损失，增加农牧民对于野生动物肇事的容忍度，实现人与野生动物和谐共生；</p>
          </li>
          <li>
          <h4><i>05</i>自然体验</h4>
            <p>基于水鸟、植被以及雪豹等生物多样性调查，完善自然体验产品，建立自然体验基地，提高牧民参与生态保护的积极性；提供自然体验的机会，在规范游客影响的同时，让更多公众体验到优质的生态产品。</p>
          </li>
        </ul>
        <h3>雪豹视频</h3>
        <div className='vedio' onClick={this.showVedio.bind(this)}>
          {/* {
            this.state.videodata!==''?
            <VideoWin id={'xuebao'} vid={this.state.videodata.videoUrl} ></VideoWin>:''
          } */}
          <img src={this.state.videodata.picture} alt=""/>
          <img src={require('../../../../assets/img/brandcenter/fansinteraction/play-icon.png')} alt="" />
        </div>
        {/* 视频弹框 */}
        <Modal
          title=""
          visible={this.state.vediovisible}
          onOk={this.handleShow}
          onCancel={this.handleHide}
          footer={null}
          forceRender={true}
          getContainer={() => document.body}
          wrapClassName='showdDetailVedio'
          centered={true}
        >
          <div className='box'>
            <VideoWin id={'shipin'} vid={this.state.videodata.videoUrl}></VideoWin>
           </div>
        </Modal>
      </div>
    )
  }
}

export default Enviorment