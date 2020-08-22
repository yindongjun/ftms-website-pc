import React, { Component } from 'react'
import './index.less'

class  FixedGuarantee extends Component {
  render(){
    return(
      <div className='handleFixed'>
        <div className='fixedGuar'>
          <h2>定保通</h2>
          <div>
            <p>忧客户所忧，以客户第一为理念，以为用户省钱、省时、省心为宗旨，以专业、诚意为源点，一汽丰田为客户量身打造的“定保通”项目。</p>
            <p>所谓“定保通”就是一汽丰田为用户提供的一种打包的多次定期保养服务项目，用户只需预先在卡里储存一些资金，</p>
            <p>就可享受一汽丰田授权特约经销店( 4S店)提供的较低养护价格及各种免费增值服务，同时省去咨询保养事项、了解保养内容的烦恼，可谓用户爱车的“贴身管家”。</p>
            <p>对用户而言，“定保通” 具备省钱、省时、省心三大特点。</p>
          </div>
        </div>
        <div className='threeNature'>
          <div>
            <p style = {{fontSize: '0.22rem', marginBottom: '0.3rem'}}>所谓<i>省钱，</i></p>
            <p style = {{textAlign: 'left'}}>用户仅需在定保通储值卡中预先存储一定费用，即可轻松享受更低套餐折扣的养护服务与多项免费增值服务。</p>
          </div>
          <div>
            <p style = {{fontSize: '0.22rem', marginBottom: '0.3rem'}}>所谓<i>省时，</i></p>
            <p style = {{textAlign: 'left'}}>省去用户咨询保养事项、了解保养内容的时间，还具有服务优先权，通过电话预约进店保养，随到随办，节省了到店排队等候的时间，同时，由于是预付保养，也省去了交款出单等繁琐流程。</p>
          </div>
          <div>
            <p style = {{fontSize: '0.22rem', marginBottom: '0.3rem'}}>所谓<i>省心，</i></p>
            <p style = {{textAlign: 'left'}}>确保用户透明保养，透明消费，并签署购买协议，充分保障消费者权益。定保通的具体项目与作业时间，根据各经销商实际情况会有所不同，详细可咨询当地经销商。</p>
          </div>
        </div>
        <div className='fixedImg'>
          <img src={require('../../../../../assets/img/serviceIntroduce/fixedgrau.png')} alt=""/>
          <img src={require('../../../../../assets/img/serviceIntroduce/fixedgrau2.png')} alt=""/>
        </div>
        
      </div>
    )
  }
}
export default FixedGuarantee