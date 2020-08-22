import React, { Component } from 'react'
import FengchaoWorld from '../../../../components/OwnerVip/FengcahoWord'
import './index.less'

class NativeTour extends Component{
  render(){
    return (
      <div className="handlePureTour">
          <div className="PureTour">
            <div className="tourheader">
              <h2>开启“纯真之旅”一汽丰田纯牌零件“纯真之旅”品牌活动-天津站、郑州站成功举办</h2>
              <span>2018-09-16</span>
            </div>
            <div className="headfontdesc">
              <p>2018年9月16日，一汽丰田纯牌零件“纯真之旅”品牌活动在渤海之滨天津成功举办。部分一汽丰田新老客户齐聚天津，参观了一汽丰田在亚洲最大的零件仓库———天津零件中心，让客户近距离的感受一汽丰田纯牌零件的安心品质。</p>
              <p>4月14日-4月15日，一汽丰田将开启经销店开放日活动，以“诚信服务六项承诺”作为主题，邀请新老车主莅临现场参与并体验各个服务项目。届时，一汽丰田将开设MINI课堂，由用车专家为车主带来干货满满的用车知识，同时，还将由专业技术人员进行现场QM演示。对于车主来说，最关注的莫过于产品品质，在活动现场，一汽丰田设置了纯牌零件品鉴区，极具科技感并拥有超高品质的一汽丰田纯牌零件，将为车主带来全新的认知。除了讲解和品鉴，一汽丰田还为车主带来了DIY体验环节，车主将有机会在专业人员的协助下，亲自动手体验简单的维修保养操作，通过实践加深对爱车的了解。同时，一汽丰田还将为车主带来钣喷/美容展示。</p>
            </div>
            <div className="imgdesc-12">
              <span><img src={require("../../../../assets/img/purebrand/news1/pic-1.png")} alt=""/></span>
              <span><img src={require("../../../../assets/img/purebrand/news1/pic-2.png")} alt=""/></span>
            </div>
            <p>纯牌零件是针对一汽丰田车型研发，拥有卓越性能和高品质，保证了它的耐用性。相对于市面上的副厂零件品质参差不齐，安全没有保障，纯牌零件不仅品质有保障，在透明化的价格上更是让客户买的安心，用的放心。</p>
            <div className="imgdesc-34">
              <span><img src={require("../../../../assets/img/purebrand/news1/pic-3.png")} alt=""/></span>
              <span><img src={require("../../../../assets/img/purebrand/news1/pic-4.png")} alt=""/></span>
            </div>
            <p>之后，客户参观了天津零件中心。这是一个全面了解一汽丰田纯牌零件的好时机，也是干货满满的知识的小课堂，众人是看得全神贯注，听得津津有味。客户也了解到,无论酷暑寒冬，一汽丰田零件团队，都会按照丰田作业标准，及时送达零件到客户手中。通过这些讲解，现场嘉宾都对一汽丰田纯牌零件供应充满了信赖！</p>
            <div className="imgdesc-4">
              <span><img src={require("../../../../assets/img/purebrand/news1/pic-5.png")} alt=""/></span>
              <span><img src={require("../../../../assets/img/purebrand/news1/pic-6.png")} alt=""/></span>
              <span><img src={require("../../../../assets/img/purebrand/news1/pic-7.png")} alt=""/></span>
              <span><img src={require("../../../../assets/img/purebrand/news1/pic-8.png")} alt=""/></span>
            </div>
            <p>同期9月15日，郑州奕泽粉丝节，纯真之旅大FUN奕彩。纯牌零件给现场来宾带来了不一样的体验，通过资深讲师的现场讲解和互动体验，现场嘉宾了解了更多原厂零件知识，深刻体验到原厂零件的安心品质。</p>
            <div className="lengthImg">
              <img src={require("../../../../assets/img/purebrand/news1/pic-9.png")} alt=""/>
            </div>
            <div className="footImg">
              <p>一汽丰田纯·真之旅活动期间，正值一汽丰田销售有限公司成立15周年，零件部特推出“黄金客户 感恩回馈”活动。</p>
              <img src={require("../../../../assets/img/purebrand/news1/pic-10.png")} alt=""/>
            </div>
            <p className="endText">此次一汽丰田“纯真之旅”不仅让一汽丰田客户更加深入了解了纯牌零件的卓绝品质，还为嘉宾们建立起一座了解和友谊的桥梁，进一步强化了纯牌零件的品牌信赖与认可。丰田纯牌零件无论是在质量、耐用度还是和车辆的匹配度上都经得住考验。能够满足广大消费者的全方位需求。</p>
            <div className="adviseNative">
              <h3>爱她，就给她最纯真的！</h3>
              <h3>纯牌零件，感恩有你！</h3>
            </div>
            <FengchaoWorld/>
          </div>
      </div>
    )
  }
}
export default NativeTour
