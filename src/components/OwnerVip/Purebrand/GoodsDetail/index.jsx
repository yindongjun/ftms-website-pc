import React, { Component } from 'react'
import { Modal, Button } from 'antd';
import{ carOwner }from '../../../../services/carOwner'
import './index.less'
import {querryStringToObject} from '../../../../utils/util'
//纯牌零件详情

const goodsdetail = [
  {
    imgUrl: 'oil.png',
    label: 'label.png',
    title: '一汽丰田汽车机油精品配件',
    standard: 'SN/GF 0W-20 5.5L',
    detailBtn: '查看详情'
  },
  {
    imgUrl: 'oil.png',
    label: 'label.png',
    title: '一汽丰田汽车机油精品配件',
    standard: 'SN/GF 0W-20 5.5L',
    detailBtn: '查看详情'
  },
  {
    imgUrl: 'oil.png',
    label: 'label.png',
    title: '一汽丰田汽车机油精品配件',
    standard: 'SN/GF 0W-20 5.5L',
    detailBtn: '查看详情'
  },
  {
    imgUrl: 'oil.png',
    label: 'label.png',
    title: '一汽丰田汽车机油精品配件',
    standard: 'SN/GF 0W-20 5.5L',
    detailBtn: '查看详情'
  }
]

class GoodsDetail extends Component {
  constructor(props){
    super(props)
    const search = this.props.location.search;
    const params = querryStringToObject(search);
    this.state={
      visible: false,
      id:params.id,
      goodsdetail:[],
      detail:{},
      imgdata:[],
      tit:params.tit
    }
   
  }
  componentWillMount(){
    let id=this.state.id;
    carOwner.getList(id).then((res)=>{//零件列表
     if(res && res.code==='0'){
       this.setState({
         goodsdetail:res.data
       })
     }
   })
  }
  showModal = (id) => {
    this.setState({
      visible: true,
    },()=>{
      carOwner.getDetail(id).then((res)=>{//零件列表
        if(res && res.code==='0'){
          this.setState({
            detail:res.data[0],
            imgdata:res.data[0].extra_pic
          })
        }
      })
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  showGoodsDetail(){
    this.props.history.push('/ownervip/purebrand/goodsshow')
  }

  componentDidMount(){
    
  }

  render() {
    const {detail,imgdata}=this.state;
    return (
      <div className="handleGoodsDetail">
        <div className="goodstitle">
          <a href='javascript:void(0)' onClick={this.showGoodsDetail.bind(this)}>返回产品展示</a>
          <h2>{this.state.tit}</h2>
        </div>
        <ul className="GoodsDetailList">
          {
             this.state.goodsdetail.map((v, i) => {
              return <li key={v.id}>
                <img className="imgdesc" src={v.main_pic} alt="" />
                <div className="wordnote">
                  <img src={require(`../../../../assets/img/purebrand/lingjian.png`)} alt="" />
                  <h2>{v.name}</h2>
                  {/* <h2>{v.standard}</h2> */}
                </div>
                <Button onClick={()=>{this.showModal(v.id)}}>查看详情</Button>
              </li>
            }) 
            /* goodsdetail.map((v, i) => {
              return <li key={i}>
                <img className="imgdesc" src={require(`../../../../assets/img/purebrand/${v.imgUrl}`)} alt="" />
                <div className="wordnote">
                  <img src={require(`../../../../assets/img/purebrand/${v.label}`)} alt="" />
                  <h2>{v.title}</h2>
                  <h2>{v.standard}</h2>
                </div>
                <Button onClick={this.showModal}>{v.detailBtn}</Button>
              </li>
            }) */
            
          }
        </ul>
        <Modal
          title=""
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          className="goodsdetail"
          centered={true}
        >
          <img style={{width:'9rem',height:'5.16rem'}} src={detail.main_pic} alt=""/>
          {
             imgdata!==''?<ul>
            {
              imgdata.map((v,index)=>{
                return(
                  <li key={index}>
                    <img src={v} alt=""/>
                  </li>
                )
              })
            }
          </ul>:'' 
          
          }
          <h2>{detail.name}</h2>
          <div dangerouslySetInnerHTML={{ __html:detail.description}}>
            
            {/* <p>纯牌机油有多种粘合度可供选择</p>
            <p>OW-20/5W-20/5W-30/5W-40/10W-30</p>
            <p>抗磨降噪，清洁发动机</p>
            <p>卓越的控温能力，提高油品的氧化能力，减少油品在高温下变质问题</p> */}
          </div>
        </Modal>
      </div>
    )
  }
}

export default GoodsDetail