import React from 'react'
import './index.less'
import{ brandConter }from '../../../../services/brandConter'

const data = [
  {
    icon: 'house.png',
    desc: '6个大型零件仓库'
  },
  {
    icon: 'm2.png',
    desc: '16万平方米的仓储面积'
  },
  {
    icon: 'hws.png',
    desc: '22万的货位数'
  },
  {
    icon: 'wl.png',
    desc: '24小时不间断物流'
  }
]
class Quality extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ActivitiesList:[]
    }
  }

  componentDidMount(){
    brandConter.activitiesList(1,2,'cate','component').then((res)=>{
      if(res && res.code==='0'){
        console.log(res)
        this.setState({
          ActivitiesList:res.data.list
        })
      }
    })
  }

  render() {
    return (
      <div className="handleQuality">
        <div className="secure-brand">
          <h2>安心品质</h2>
          <div className="textFont">
            <p>纯牌零件满足丰田全球标准，从设计开发到生产都经过了严格的检验。</p>
            <p>针对丰田车辆设计，使得每个零部件和车辆完美结合，使用安心。纯牌零件享有1年或2万公里保修期限。</p>
          </div>
          <div className="car-circle">
            <span><img src={require("../../../../assets/img/purebrand/circlrL.png")} alt="" /></span>
            <span><img src={require("../../../../assets/img/purebrand/circlrR.png")} alt="" /></span>
          </div>
        </div>
        <div className="logistics-brand">
          <h2>物流品质</h2>
          <div className="textFont">
            <p>零件的仓储到物流，我们按照丰田品质标准，及时满足客户需求。从零件供给角度，全国范围内，一汽丰田目前拥有:</p>
          </div>
          <ul className="server-standard">
            {
              data.map((item, index) => {
                return <li key={index}>
                  <i><img src={require(`../../../../assets/img/purebrand/${item.icon}`)} alt="" /></i>
                  <span>{item.desc}</span>
                </li>
              })
            }
          </ul>
        </div>
        <div className="nature-brand" style={{display:'none'}}>
          <h2>纯·真之旅</h2>
          <div className="car-circle">
            {
              this.state.ActivitiesList.map((item, index) => {
                return <a
                  href={item.has_detail ? `/brandcenter/activitycenter/activitydetail?id=${item.id}`+ `&text=activity` : item.url}
                  target='_blank'
                  key={index} >
                  <img src={item.thumb} alt=""/>
                  <h3 className={item.is_sale?'icon_h3':''}>{item.title}</h3>
                  <i>{item.create_time}</i>
                  <p>{item.desc}</p>
                </a>
              })
            }
            {/* <a href="/ownervip/nativetour">
              <span className="circle-left">
                <img src={require("../../../../assets/img/purebrand/czL.png")} alt="" />
                <h3>一汽丰田纯牌零件”纯真之旅“活动在渤海之滨天津成功举办</h3>
                <i>2018-09-16</i>
                <p>2018年9月16日，一汽丰田纯牌零件”纯真之旅“品牌活动在渤海之滨天津成功举办，部分一汽丰田新老客户齐聚天津，让客户近距离的感受到了一汽丰田纯牌零件的安心品质。</p>
              </span>
            </a>
            <a href="/ownervip/thanksteacher">
              <span className="circle-right">
                <img src={require("../../../../assets/img/purebrand/czR.png")} alt="" />
                <h3>感谢师恩，纯牌零件与您重温美好</h3>
                <i>2018-09-10</i>
                <p>教师节，感谢师恩，纯牌零件与您重温那段美好回忆，让一汽丰田原厂轮胎带着大家行万里路去阅尽人间百态，守护你的小确幸。</p>
              </span>
            </a> */}
          </div>
          <a href="/brandcenter/activitycenter" className="joinActivity">参与更多活动</a>
        </div>
      </div>
    )
  }
}

export default Quality