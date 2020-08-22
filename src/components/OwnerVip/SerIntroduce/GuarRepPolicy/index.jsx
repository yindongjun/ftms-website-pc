import React, { Component } from 'react'
import './index.less'

const guardateList = [
  { col1: '大对象', col2: '详细对象', col3: '保修期', col4: '说明' },
  { col1: '整车保修', col2: '全车型', col3: '3年或10万公里', col4: '两者以先到者为准' },
  { col1: '皇冠', col2: '12年7月26以后生产', col3: '4年或10万公里', col4: '两者以先到者为准' },
  { col1: '出租车', col2: '花冠EX', col3: '1年或10万公里', col4: '两者以先到者为准' },
  { col1: '双擎HEV电池', col2: '普锐斯（新）', col3: '5年或20万公里', col4: '两者以先到者为准' },
  { col1: '', col2: '卡罗拉双擎', col3: '8年或20万公里', col4: '两者以先到者为准' },
  { col1: '发动机', col2: '皇冠2.0T', col3: '6年或10万公里', col4: '两者以先到者为准' },
  { col1: '蓄电池', col2: '全车型', col3: '2年或5万公里', col4: '第二年维修半价、两者以先到者为准' },
  { col1: '', col2: '花冠EX出租车', col3: '1年或10万公里', col4: '两者以先到者为准' },
  { col1: '零件保修', col2: '', col3: '1年或2万公里', col4: '两者以先到者为准' },
  { col1: '易损件', col2: '', col3: '6个月或1万公里', col4: '两者以先到者为准' }
]
class GuarRepPolicy extends Component {
  render(){
    return(
      <div className='handleGuarRepPolicy'>
        <div className='GuarReqDefined'>
          <h2>保修的定义</h2>
          <p>保修是由品质问题引起的，在保修期内，由经销店实施的免费修理。</p>
        </div>
        <div className='GuarReqObject'>
          <h2>保修的对象和范围</h2>
          <img src={require('../../../../assets/img/serviceIntroduce/guarreq.png')} alt=""/>
        </div>
        <table className="guardate">
          <thead>
            <tr>
              <th colSpan='4'>
                <span>保修期</span>
                <span>2017年1月22日</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              guardateList.map((v, i) => {
                return <tr key={i}>
                  <td>{v.col1}</td>
                  <td>{v.col2}</td>
                  <td>{v.col3}</td>
                  <td>{v.col4}</td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}
export default GuarRepPolicy