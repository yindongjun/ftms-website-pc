import React from 'react'
import { Input, Checkbox } from 'antd';
import{ carOwner }from '../../../../services/carOwner'
import './index.less'

//纯牌零件
class GoodsShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topNav:[],
      GoodList:[],
      datanum:'',
      checkedList:'',
      cl:'',
      sstit:'',
      title: '',
      sszhuangtai:false,//搜索状态
      checkValue:0,
      xianshi:false,
      chunpailingjian: [
        {
          active: true,
          title: '全部零件',// 这里有个奇怪的需求 必须注释 这里的全部 不是全部 是不限的意思 和其他选项要独立区分
          id: ''
        }
      ],
    }
  }
  showGoodsDetail(id,tit) {//查看详情
    window.location.href='/ownervip/purebrand/goodsshow/detail?id='+id+'&tit='+tit;
  }
  checkboxicon = (e) => {
    this.setState({checkValue:e.target.value})
    if(e.target.checked){
      let tit='';
      if(e.target.value=='0'){
        this.getSecondClassify(tit,'isno');
      }else{
        let tit={
          id:e.target.value
        }
        this.getSecondClassify(tit,'isno');
      }
      
    }
    
  }
  inputvalue(e){//搜索框数据
    this.setState({
      sstit:e.target.value
    })
  }
  sousuoClick(){//点击搜索框

    this.setState({
      title: this.state.sstit
    })

    let classify = []
      for (let i = 1; i < this.state.chunpailingjian.length; i++) {
        if(this.state.chunpailingjian[i].active) {
          classify.push(this.state.chunpailingjian[i].id)
        }
      }

      let postData = {
        'id':classify,
        'title': this.state.sstit
      }

    this.getSecondClassify(postData,'yes');
  }
  getSecondClassify(tit,isno){
    carOwner.getSecondClassify(tit).then((res)=>{//获取二级分类列表
      if(res && res.code==='0'){
        this.setState({
          GoodList:res.data.list,
          datanum:res.data.sum
        })
        if(res.data.list.length>0){
          this.setState({
            xianshi:false
          })
        }else{
          this.setState({
            xianshi:true
          })
        }
       if(isno=='isno'){
          this.setState({
            sszhuangtai:false
          })
        }else if(isno=='yes'){
          this.setState({
            sszhuangtai:true
          })


          // if(this.state.sstit){
          //   this.setState({
          //     sszhuangtai:true
          //   })
          // }else{
          //   this.setState({
          //     sszhuangtai:false
          //   })
          // }
        } 
      }
    })
    
  }
  componentDidMount(){
    
    carOwner.getFirstClassify().then((res)=>{//获取一级分类列表
      if(res && res.code==='0'){
        this.setState({
          topNav:res.data,
        })


        for ( let i = 0; i < res.data.length; i++) {
          let chunpailingjian_obj = {
            active: false,
            title: res.data[i].title,
            id: res.data[i].id
          }
          this.state.chunpailingjian.push(chunpailingjian_obj)
          this.setState({})
        }
      }
    })
    this.getSecondClassify('','isno');
  }
  keyupvalue(e){
    if(e.which===13){
      this.sousuoClick();
    }
  }

  // 分类切换样式
  chunpailingjian_Check(index) {
    console.log(index)
    const name = this.state.chunpailingjian[index].id
    // 全选
    if (index === 0) {
      // 当点击全选的时候 要清楚其他所有选项
      if (!this.state.chunpailingjian[0].active) {
        this.state.chunpailingjian[0].active = true;
        for(let i = 1; i < this.state.chunpailingjian.length; i++) {
          this.state.chunpailingjian[i].active = false;
        }
      }

      let postData = {
        'id':[],
        'title': this.state.title
      }
      this.getSecondClassify(postData, 'yes');
    } else {
      // 其他选项 要影响全选状态 有一个存在 全选就不能亮起（哪怕是都勾选了）
      this.state.chunpailingjian[index].active = !this.state.chunpailingjian[index].active;
      this.state.chunpailingjian[0].active = false;

      let classify = []
      for (let i = 1; i < this.state.chunpailingjian.length; i++) {
        if(this.state.chunpailingjian[i].active) {
          classify.push(this.state.chunpailingjian[i].id)
        }
      }

      console.log('classify: '+classify);
      if(classify.length==0) {
          this.state.chunpailingjian[0].active = true
      }
      let postData = {
        'id':classify,
        'title': this.state.title
      }

      this.getSecondClassify(postData, 'yes');
      // 下面的逻辑保留 避免奇怪的需求变动
      // let check_arr = []
      // for(let i = 1; i < this.state.yongpinfenlei.length; i++) {
      //   if(this.state.yongpinfenlei[i].active) {
      //     check_arr.push(1)
      //   }
      // }
      // if(check_arr.length === this.state.yongpinfenlei.length - 1) {
      //   this.state.yongpinfenlei[0].active = true
      // } else {
      //   this.state.yongpinfenlei[0].active = false
      // }
    }
  }

  render() {
    // console.log(this.props)
    return (
      <div className="handleGoodsShows">
        <ul className="topNav">
          {
            this.state.chunpailingjian.map((item, index) => {
              return (
                <li key={index}>
                  <Checkbox checked={item.active} onClick={this.chunpailingjian_Check.bind(this, index)} value={item.id}>
                    {item.title}
                  </Checkbox>
                </li>
              )
            })
          }
        </ul>
        <div className="searchBox">
          <input onChange={this.inputvalue.bind(this)} onKeyDown={this.keyupvalue.bind(this)} type="text" placeholder="请输入部件名称" />
          <button onClick={this.sousuoClick.bind(this)}><a>
            <img src={require("../../../../assets/img/purebrand/search.png")} alt="" />
          </a></button>
          {
            this.state.sszhuangtai?
            <span>共找到<i>{this.state.datanum}</i>条<i>{this.state.title?this.state.title:'  '}</i>相关信息结果</span>:''
          }
        </div>
        <div className="GoosList">
          <ul>
            {
              this.state.GoodList.map((v, i) => {
                return <a href='javascript:void(0)' key={v.id} onClick={()=>{this.showGoodsDetail(v.id,v.title)}}>
                  <li>
                    <img src={v.picture} alt="" />
                    <span>【{v.title}】</span>
                  </li>
                </a>
              })
            }
            
          </ul>
          {
              this.state.xianshi?<p className="tishi_p">抱歉，暂无搜索结果</p>:null
          }
        </div>
      </div>
    )
  }
}

export default GoodsShow