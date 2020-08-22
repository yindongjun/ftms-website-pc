import React, {Component} from 'react'
import moment from 'moment'
import {brandConter} from '../../../../services/brandConter'
import {carOwner, getOwnerStoryDetail} from '../../../../services/carOwner'
import {querryStringToObject} from '../../../../utils/util'
import './index.less'

// 最新活动详情、过期活动详情

class ActivityDetail extends Component {
  constructor(props) {
    super(props)

    const search = this.props.location.search;
    const params = querryStringToObject(search);
    this.state = {
      id: params.id,
      condata: '',
      text:params.text
    }
  }

  componentWillMount() {
    let id = this.state.id;
    if(this.state.text=='activity'){
      brandConter.ActivitiesContent(id).then((res) => {
        if (res && res.code === '0') {
          this.setState({
            condata: res.data
          })
        }
      })
    }else if(this.state.text=='feng'){
      carOwner.ActivityDetail(id).then((res) => {
        if (res && res.code === '0') {
          this.setState({
            condata: res.data
          })
        }
      })
    }else if (this.state.text=='owner') {
      carOwner.getOwnerStoryDetail(id).then((res) => {
        if(res && res.code === '0') {
          this.setState({
            condata: res.data
          })
        }
      })
    }
    
  }

  render() {
    return (
      <div className='handleActivityDetail'>
        {
          this.state.text=='activity'?<div className='ActivityDetail'>
          <div className='ActivityTitle'>
            <h2>{this.state.condata.title}</h2>
            <i>{moment(this.state.condata.create_time).format('YYYY-MM-DD')}</i>
            <p>{this.state.condata.desc}</p>
          </div>
          <div className='ActivityDetailContent' dangerouslySetInnerHTML={{__html: this.state.condata.content}}>

          </div>
        </div>
        :
        <div className='ActivityDetail'>
          <div className='ActivityTitle'>
            <h2>{this.state.condata.title}</h2>
            <i>{this.state.text=='owner' ? this.state.condata.addtime1 : moment(this.state.condata.activityBeginTime).format('YYYY-MM-DD')    }</i>
            <p>{this.state.condata.description}</p>
          </div>
          <div className='ActivityDetailContent' dangerouslySetInnerHTML={{__html: this.state.condata.content}}>

          </div>
        </div>
        }
      </div>
    )
  }
}

export default ActivityDetail
