import React, { Component, Fragment } from 'react'
import { Timeline, Icon } from 'antd'
import{ brandConter }from '../../../../services/brandConter'
import './index.less'
let n=1;
class BrandHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
      lcdata:[],
      page:{
        "beginPage": 0,//开始页码
        "pageSize": 500//页面大小
      }
    }
  }
  handleWatchMore = () => {
    this.getlistdata(++n);
  }
  componentDidMount(){
    this.getlistdata(1);
  }
  getlistdata(n){
    let page={
      "beginPage":n,//开始页码
      "pageSize": 500//页面大小
    }
    brandConter.companyHistory(page).then((res)=>{
      console.log(res);
      if(res && res.code==='0'){
        this.setState({
          lcdata: [...this.state.lcdata,...res.data.dataList],
        })
        if(res.data.hasNextPage==true){
          this.setState({
            isShow: true
          })
        }else{
          this.setState({
            isShow: false
          })
        }
      }
    })
  }


  render() {
    const { isShow } = this.state
    return (
      // 品牌历程
      <div className='handleBrandHistory'>
        <Timeline mode="alternate" >
        <Timeline.Item pending={false} dot={<i></i>}></Timeline.Item>
        {
          this.state.lcdata.map((item,index)=>{
            return(
              <Timeline.Item dot={<span>{item.year}</span>} key={index}>
                <ul>
                  {
                    item.detailList.map((listdata,i)=>{
                      return(
                        <li key={i} className={listdata.isTop=='1'?'li_top':''}>{listdata.content}</li>
                      )
                    })
                  }
                </ul>

              </Timeline.Item>
            )
          })
        }
        <Timeline.Item pending={false} dot={<i></i>}></Timeline.Item>
        </Timeline>
        {/* <Timeline mode="alternate">
          <Timeline.Item dot={<span>2018</span>}>
            <ul>
              <li>奕泽IZOA，基于TNGA丰巢概念下的首款SUV炫酷上市发布。</li>
              <li>一汽丰田15周年15年感恩之夜</li>
            </ul>
          </Timeline.Item>
          <Timeline.Item dot={<span>2017</span>}>
            <h1>一汽丰田14周年累计销售600万辆达成</h1>
            <ul>
              <li>第四代PRODA普拉多改款。</li>
              <li>威驰家族15周年感恩庆典活动。</li>
            </ul>
          </Timeline.Item>
          <Timeline.Item dot={<span>2016</span>}>
            <h1>一汽丰田13周年累计销售500万辆达成</h1>
            <ul>
              <li>第五代LAND CRUISR兰德酷路泽荣耀上市。</li>
              <li>第三代新威驰改款上市。</li>
              <li>第十一代全新COROLLA卡罗拉上市发布。</li>
            </ul>
          </Timeline.Item>
          <Timeline.Item dot={<span>2015</span>}>
            <ul>
              <li>第十四代CROWN皇冠普上市发布。</li>
              <li>第一代COROLLA HYBRID卡罗拉双擎上市发布。</li>
            </ul>
          </Timeline.Item>
          <Timeline.Item dot={<span>2014</span>}>
            <h1>一汽丰田11周年累计销售400万辆达成</h1>
            <ul>
              <li>第十代COROLLA卡罗拉上市发布。</li>
              <li>“一汽丰田2014世界田径挑战暨爱跑北京”活动启动仪式在北京鸟巢举行。</li>
            </ul>
          </Timeline.Item>
          <Timeline.Item dot={<span>2013</span>}>
            <ul>
              <li>第三代VIOS威驰上市发布。</li>
              <li>导入丰田进口跑车86销售。</li>
              <li>第二代REIZ锐志改款上市发布。</li>
              <li>第四代RAV4上市发布。</li>
            </ul>
          </Timeline.Item>
          <Timeline.Item dot={<span>2012</span>}>
            <h1>一汽丰田9周年累计销售300万辆达成</h1>
            <ul>
              <li>第三代PRIUS普锐斯上市发布。</li>
              <li>与青少年发展基金会合作，引入“教师培训”计划。</li>
              <li>发布“品质于心大爱于行”企业社会责任公益主题。</li>
            </ul>
          </Timeline.Item>
          {
            isShow ?
              <Fragment>
                <Timeline.Item dot={<span>2011</span>} className=''>
                  <ul>
                    <li>一汽丰田讲“3年或10万公里”保修政策确立为全系固定保养政策。</li>
                  </ul>
                </Timeline.Item>
                <Timeline.Item dot={<span>2010</span>} className='ant-timeline-item-left'>
                  <h1>一汽丰田7周年累计销售200万辆达成</h1>
                  <ul>
                    <li>第四代PRADO普拉多霸气上市发布。</li>
                    <li>第二代REIZ锐志优雅升级。</li>
                    <li>一汽丰田系统向玉树灾区捐款500万元。</li>
                  </ul>
                </Timeline.Item>
                <Timeline.Item dot={<span>2009</span>}>
                  <ul>
                    <li>第三代RAV4上市发布。</li>
                    <li>一汽丰田成都培训中心启动。</li>
                    <li>第十三代CROWN皇冠新品上市发布。</li>
                  </ul>
                </Timeline.Item>
                <Timeline.Item dot={<span>2008</span>} className='ant-timeline-item-left'>
                  <h1>一汽丰田5周年累计销售100万辆达成</h1>
                  <ul>
                    <li>第二代VIOS威驰上市发布。</li>
                    <li>一汽丰田诚信服务QM60’快速保养项目启动。</li>
                    <li>一汽与丰田及双方合资公司向汶川地震捐款1000万元。</li>
                  </ul>
                </Timeline.Item>
                <Timeline.Item dot={<span>2007</span>}>
                  <ul>
                    <li>第十代COROLLA卡罗拉在中国迎来全球首发。</li>
                    <li>CROWN皇冠中国累计销量10万台。</li>
                    <li>一汽丰田SMILE认证二手车1号店开业仪式。</li>
                  </ul>
                </Timeline.Item>
                <Timeline.Item dot={<span>2006</span>} className='ant-timeline-item-left'>
                  <ul>
                    <li>一汽丰田第一款混合动力车型PRIUS普锐斯上市发布。</li>
                    <li>一汽丰田荣获环保“地球奖”。</li>
                    <li>一汽丰田与中国宋庆龄基金签署协议，捐建“一汽丰田爱心图书室”</li>
                  </ul>
                </Timeline.Item>
                <Timeline.Item dot={<span>2005</span>}>
                  <h1>一汽丰田2周年累计销售10万辆达成</h1>
                  <ul>
                    <li>第十二代CROWN皇冠轿车实现国产。</li>
                    <li>第一代REIZ锐志轿车下线。</li>
                    <li>一汽丰田工会、党委成立。</li>
                  </ul>
                </Timeline.Item>
                <Timeline.Item dot={<span>2004</span>} className='ant-timeline-item-left'>
                  <ul>
                    <li>第一代威驰上市发布。</li>
                    <li>第九代COROLLA花冠上市发布。</li>
                    <li>中国T-TEP10周年及T-TEP师范学校成立庆典。</li>
                  </ul>
                </Timeline.Item>
                <Timeline.Item dot={<span>2003</span>}>
                  <ul>
                    <li>9月一汽丰田销售有限公司成立。</li>
                    <li>第一代PRADO普拉多登场。</li>
                    <li>第三代LAND CRUISER陆地巡洋舰来临。</li>
                  </ul>
                </Timeline.Item>
                <Timeline.Item dot={<span>2002</span>} className='ant-timeline-item-left'>
                  <ul>
                    <li>第一辆TOYATA丰田品牌国产轿车VIOS威驰下线。</li>
                  </ul>
                </Timeline.Item>
              </Fragment>
              :
              ''
          }
          <Timeline.Item color='#d3b078'></Timeline.Item>
        </Timeline> */}
        {/* {
          isShow ?
            <span className='watchmore' onClick={this.handleWatchMore} >查看更多<Icon type="down" /></span>
            :
            ''
        } */}
      </div>
    )
  }
}

export default BrandHistory
