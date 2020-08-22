import React, { Component } from 'react'
import './index.less'

const dealerConditionList = [
  {
    type: '大规模店',
    grand: 'A',
    square: '8,000~',
    width: '68~',
    regfund: '1,000万~',
    rufund: '2,000万~',
    cost: '1,800~2,000万'
  },
  {
    type: '中规模店',
    grand: 'B',
    square: '7,000~',
    width: '64~',
    regfund: '1,000万~',
    rufund: '2,000万~',
    cost: '1,200~1,400万'
  },
  {
    type: '小规模店',
    grand: 'C',
    square: '5,000~',
    width: '55~',
    regfund: '1,000万~',
    rufund: '2,000万~',
    cost: '800~1,000万'
  },
  {
    type: 'MINI店',
    grand: 'D',
    square: '2,400~',
    width: '40~',
    regfund: '1,000万~',
    rufund: '2,000万~',
    cost: '500~600万'
  },
  {
    type: 'MINI店',
    grand: 'E',
    square: '2,300~',
    width: '40~',
    regfund: '1,000万~',
    rufund: '2,000万~',
    cost: '300~400万'
  }
]

class DealerRecruit extends Component {
  render() {
    return (
        <div className='handleDealerRecruit'>
          <img src={require('../../../assets/img/footerlink/dealer.jpg')} alt="" />
          <div className='DealerRecruitConect'>
            <div className='RecruitHeader'>
              <h1>一汽丰田汽车销售有限公司经销商招募函（4S店）</h1>
              <p>一汽丰田汽车销售有限公司成立于2003年，是由中国第一汽车股份有限公司和丰田汽车公司等公司合资组建的汽车销售公司。</p>
              <p>一汽丰田汽车销售有限公司目前经营销售以下系列产品: CROWN皇冠、AVALON亚洲龙、COROLLA卡罗拉、</p>
              <p>COROLLA卡罗拉（双擎）、COROLLA卡罗拉（双擎E+）、VIOS威驰、威驰FS、PRADO普拉多、RAV4荣放、</p>
              <p>IZOA奕泽、COASTER柯斯达以及进口的PREVIA普瑞维亚、HIACE。</p>
              <p>一汽丰田汽车销售有限公司秉承客户至上客户利益最大化的汽车价值观，将继续以“专业对车、诚意待人”的服务理念，为消费者提供完善、满意、真诚的购车体验和服务体验。</p>
              <p>现向全社会公开招募经销商，申请具体条件及流程请参考下记表述。</p>
            </div>
            <div className='RecruitConect'>
              <div className='principle'>
                <h2>一、总原则</h2>
                <p>1、申请人自愿接受一汽丰田汽车销售有限公司按标准对其进行的评审、考核及最终认定结果</p>
                <p>2、申请人被认定后自愿遵守一汽丰田汽车销售有限公司对其进行的各项指导、管理和违约处罚</p>
                <p>3、申请及面试过程中涉及的一切费用由申请人自理，一汽丰田汽车销售有限公司不予承担</p>
              </div>
              <div className='basecondition'>
                <h2>二、申请经销商基本条件</h2>
                <p>1、申请人需诚信守法，产权清晰，无违法记录</p>
                <p>2、申请人愿意成立独立的法人单位，仅用于从事一汽丰田汽车销售有限公司项目经营，注册资金不低于1000万元</p>
                <p>3、申请人需确保土地以建设符合一汽丰田汽车销售有限公司标准的4S店</p>
                <p>4、申请人需确保2000万元以上的流动资金和一定的融资能力</p>
                <div>
                  <p>●目前一汽丰田汽车销售有限公司有大、中、小以及MINI店共5种类型4S店标准，各类型具体标准如下：（一汽丰田汽车销售有限公司所提供的建店成本为预估值，仅供参考!）</p>
                  <p>申请人自愿遵守一汽丰田汽车销售有限公司的经销店设计标准建成4S店。</p>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th colSpan='2'>店铺类型</th>
                      <th>土地面积m²</th>
                      <th>面宽</th>
                      <th>注册资本</th>
                      <th>流动资金</th>
                      <th>建店成本预估（不含土地）</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dealerConditionList.map((v, i) => {
                        return <tr key={i}>
                          <td>{v.type}</td>
                          <td>{v.grand}</td>
                          <td>{v.square}</td>
                          <td>{v.width}</td>
                          <td>{v.regfund}</td>
                          <td>{v.rufund}</td>
                          <td>{v.cost}</td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
              </div>
              <div className='applyflow'>
                <h2>三、申请流程</h2>
                <span><img src={require('../../../assets/img/footerlink/lct.png')} alt="" /></span>
                <p>*申请人必须提供申请表格中涉及的所有资料。在评价过程中，如有需要我公司会通知申请人补充表格以外的材料，请申请人理解和积极配合。</p>
              </div>
              <div className='investplace'>
                <h2>四、招商地区</h2>
                <p>●18年4S店招募工作暂时结束，待19年新招募工作开始后会公布招募地区等其他细节，现暂不受理相关申请。</p>
                <p>感谢您对一汽丰田的信任，希望您继续保持关注。</p>
              </div>
            </div>
            <div className='step-five-and-six'>
              <span>
                <h2>五、申请材料邮寄地址</h2>
                <div>
                  <p>北京市朝阳区东三环中路1号环球金融中心西楼3F</p>
                  <p>邮编：100020</p>
                </div>
                <div>一汽丰田汽车销售有限公司 网络部 网络开发室</div>
                <div>
                  <p>电话：010-59529569/9351/9605</p>
                  <p>Email：wangluokaifashi@ftms.com.cn</p>
                </div>
              </span>
              <span>
                <h2>六、纪检部门联系方式</h2>
                <div>
                  <p>一汽丰田汽车销售有限公司纪委：</p>
                  <p>电话：010-59529129</p>
                  <p>邮箱：jc@ftms.com.cn</p>
                </div>
                <div>
                  <p>一汽集团纪委</p>
                  <p>电话：0413-85903333</p>
                  <p>邮箱：xfs_jjw@faw.com.cn</p>
                </div>
              </span>
            </div>
          </div>
        </div>
    )
  }
}

export default DealerRecruit