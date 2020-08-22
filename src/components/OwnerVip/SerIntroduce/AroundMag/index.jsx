import React, { Component } from 'react'
import {Icon} from 'antd'
import{ carOwner }from '../../../../services/carOwner'
import './index.less'

let n=1;
class AroundMag extends Component{
  constructor(props){
    super(props)
    this.state={
      Magazinelist:[],
      hasNextPage:false,//是否有更多
    }
  }

  componentWillMount(){
    this.getlistdata(1);
  }
  getlistdata(n){
    let data={
        "beginPage": n,//开始页面
        "pageSize": "6"//页面尺寸
    }
    carOwner.getMagazineList(data).then((res)=>{
      if(res && res.code ==='0'){
        this.setState({
          Magazinelist:[...this.state.Magazinelist,...res.data.dataList],
          hasNextPage:res.data.hasNextPage,
        })
      }
    })
  }
  gengduo(){
    this.getlistdata(++n);
  }


  render(){
    return(
      <div className='handleAroundMag'>
        <h2>身边杂志</h2>
        <ul className='MagnizationNav'> 
          {
            this.state.Magazinelist.map((v, i) => {
              return <li key={i} >
                <img src={v.smallImg} alt=""/>
                <div>
                  <h1>{v.title}</h1>
                  <i>更新时间：<br/>{v.createAt}</i>
                  <span>
                    <a href={'/ownervip/circletran?id='+v.magazineId+'&text=zazhi'} target="_blank">
                    在线阅读
                    </a>
                  </span>
                </div>
              </li>
            })
          }
        </ul>
        {this.state.hasNextPage?
          <span onClick={this.gengduo.bind(this)} className='lookingMore'>查看更多<Icon type="down" /></span>:''
        }
        <div className="fiximg">
          <img src={require('../../../../assets/img/serviceIntroduce/shenbian.png')} alt=""/>
        </div>
      </div>
    )
  }
}

export default AroundMag