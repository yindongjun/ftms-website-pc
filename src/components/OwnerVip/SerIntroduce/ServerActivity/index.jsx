import React, { Component, Fragment } from 'react'
import AroundMag from '../AroundMag';
import LikeCourse from '../LikeCourse';
import './index.less'

class ServerActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      obviseDetail: 'SERVERPAGE'  // SERVERPAGE 服务活动首页  AROUNDMAG 身边杂志  LIKECOURSE 爱车课堂 
    }
  }

  obviseDetail(servertype) {
    if(servertype==='AROUNDMAG') {
      this.props.history.push('/ownervip/serintroduce/serveractivity/aroundmag')
    }
    if(servertype==='LIKECOURSE'){
      this.props.history.push('/ownervip/serintroduce/serveractivity/likecarcourse')
    }
  }

  render() {
    const { obviseDetail } = this.state
    let showServerActPage;
    const ServerAct = <div className='handleServerActivity'>
      <div className='ServerActivityTop'>
        <span>
          <img src={require('../../../../assets/img/serviceIntroduce/zz.png')} alt="" />
          <h1>身边杂志</h1>
          <a href='javascript:void(0)' onClick={()=>{this.obviseDetail('AROUNDMAG')}}>查看详情</a>
          <i></i>
          <p>精彩文章、活动资讯、微刊小程序......您身边的诚信服务。</p>
        </span>
        <span>
          <img src={require('../../../../assets/img/serviceIntroduce/course.png')} alt="" />
          <h1>爱车课堂</h1>
          <a href='javascript:void(0)' onClick={() => {this.obviseDetail('LIKECOURSE')}}>查看详情</a>
          <i></i>
          <p>爱车更懂车。</p>
        </span>
      </div>
      <div className='ServerActivityBox'>
        <span>
          <img src={require('../../../../assets/img/serviceIntroduce/fwj.png')} alt="" />
          <h1>服务节</h1>
          <i></i>
          <p>每年定期开展春夏秋冬四季服务节，向车主提供不同季节需求的服务项目优惠及客户关爱。</p>
        </span>
        <span>
          <img src={require('../../../../assets/img/serviceIntroduce/jnh.png')} alt="" />
          <h1>服务嘉年华</h1>
          <i></i>
          <p>展现一汽丰田诚信服务品牌魅力的大型展示体验类活动。</p>
          <p>服务嘉年华户外体验活动旨在使消费者在各项互动体验中感受经销店售后服务的内容、流程，寓教于乐中收获快乐与知识。</p>
        </span>
        <span>
          <img src={require('../../../../assets/img/serviceIntroduce/kfr.png')} alt="" />
          <h1>经销商开放日</h1>
          <i></i>
          <p>邀请车主走进经销店，通过亲身参观体验售后的服务项目，让车主真正理解一汽丰田经销店的高水平及差异化服务标准。</p>
        </span>
        <span>
          <img src={require('../../../../assets/img/serviceIntroduce/smfw.png')} alt="" />
          <h1>上门服务</h1>
          <i></i>
          <p>为因距离4S店远而无法享受到专业化服务的客户，提供便利的维修保养服务，提高远距离客户的满意度。</p>
        </span>
      </div>
    </div>
    if (obviseDetail === 'AROUNDMAG') {
      showServerActPage = <AroundMag />
    } else if (obviseDetail === 'LIKECOURSE') {
      showServerActPage = <LikeCourse/>
    } else if(obviseDetail==='SERVERPAGE'){
      showServerActPage = ServerAct
    }
    return (
      <Fragment>
        {
          showServerActPage
        }
      </Fragment>
    )
  }
}

export default ServerActivity