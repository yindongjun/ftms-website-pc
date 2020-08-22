// 企业风采
import React, { Component } from 'react'
import './index.less'

class EnterpriseMien extends Component {
  render() {
    return (
      <div className='handleEnterpriseMien'>
        <div className='EnterpriseMienHeader'>
          <div>
            <img src={require('../../../../assets/img/brandcenter/enterpriseintroduce/fc1.jpeg')} alt="" />
            <div>
              <h1>整合营销 &nbsp;全面精彩</h1>
              <p>一汽丰田坚持企业的崇高使命，以“客户第一”为经营理念，始终如一为客户提供更便捷、更优质的服务，让更多客户体验拥有汽车的快乐，为推动汽车社会的发展贡献力量。</p>
              <i></i>
            </div>
          </div>
          <div>
            <div>
              <h1>魅力商品 惊喜体验</h1>
              <p>一汽丰田近几年产品体系年轻化，以年轻人对汽车外观、内部性能以及社交精神层面的高需求为导向，打造全新的人·车·生活全程呵护体系，更加注重体验感，价值感。</p>
              <i></i>
            </div>
            <img src={require('../../../../assets/img/brandcenter/enterpriseintroduce/fc2.jpeg')} alt="" />
          </div>
          <div>
            <img src={require('../../../../assets/img/brandcenter/enterpriseintroduce/fc3.png')} alt="" />
            <div>
              <h1>社会公益活动</h1>
              <p>一汽丰田汽车销售有限公司秉持“安全、环保、育人”理念，积极开展社会公益活动，践行企业社会责任。2017年9月5日，一汽丰田援建的第十八所希望学校正式启用，标志着这个凝聚了爱与希望的公益项目取得了阶段性成果。</p>
              <i></i>
            </div>
          </div>
        </div>
        <div className='EnterpriseMienFooter' style={{display:'none'}}>
          <div>
            <img src={require('../../../../assets/img/brandcenter/enterpriseintroduce/fc4.png')} alt=""/>
            <div>
              <h2>创意恒久 沟通无限</h2>
              <p>一汽丰田汽车销售有限公司通过开展各项活动，积极与客户、政府、媒体沟通交流，为让客户真正体验到安心、舒适的汽车生活而不断努力。</p>
            </div>
            <img src={require('../../../../assets/img/brandcenter/enterpriseintroduce/fc5.png')} alt=""/>
            <div>
              <h2>培育人才</h2>
              <p>一汽丰田汽车销售有限公司通过开展各项活动，积极与客户、政府、媒体沟通交流，为让客户真正体验到安心、舒适的汽车生活而不断努力。</p>
            </div>
          </div>
          <div>
            <div>
              <h2>团队优先</h2>
              <p>一汽丰田汽车销售有限公司在切实保障员工权益、丰富员工生活的同时不忘增强员工的团队精神、协作精神、助人精神及社会责任感，使其真正领会企业的真谛。</p>
            </div>
            <img src={require('../../../../assets/img/brandcenter/enterpriseintroduce/fc6.png')} alt=""/>
            <div>
              <h2>工会介绍</h2>
              <p>一汽丰田汽车销售有限公司重视人才培养，除统一组织新入职员工培训、升职人员培训、能力的同时，不忘增强员工的团队凝聚力，使其真正体会企业文化的内涵。</p>
            </div>
            <img src={require('../../../../assets/img/brandcenter/enterpriseintroduce/fc7.png')} alt=""/>
          </div>
        </div>
      </div>
    )
  }
}

export default EnterpriseMien