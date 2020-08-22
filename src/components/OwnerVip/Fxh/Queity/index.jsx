import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import{ common }from '../../../../services/common'
import './index.less'
import { Modal } from 'antd';
import VideoWin from '@/components/VideoWin'

const vipQueityList = [
  {
    imgurl: 'pic-3.png',
    title: '基础权益',
    // desc: <p>加入丰享汇，入会即享<i>100积分</i>，到店消费即享丰厚积分返还，积分可抵扣现金</p>
  },
  {
    imgurl: 'pic-4.png',
    title: '专享福利',
    // desc: <p>节点活动积分翻倍</p>
  },
  {
    imgurl: 'pic-2.png',
    title: '积分获取',
    // desc: <p>生日当月赠送<i>50%</i>，维修保养工时费积分</p>
  },
  {
    imgurl: 'pic-5.png',
    title: '积分使用',
    // desc: <p>推荐购车1~3台，可获取<i>3000积分</i>/台；推荐购车4~5台，可获得<i>4500积分</i>/台</p>
  }
]

const cardNav = [
  {
    cardicon: '普通卡-灰.png',
    cardicon2: '普通卡.png',
    title: '普通卡',
    cardName: 'COMMON'
  },
  {
    cardicon: 'ry-icon.png',
    cardicon2: '荣耀卡.png',
    title: '荣耀卡',
    cardName: 'GLORY'
  },
  {
    cardicon: 'zx-icon.png',
    cardicon2: '尊享卡.png',
    title: '尊享卡',
    cardName: 'ENJOY'
  },
  {
    cardicon: 'zz-icon.png',
    cardicon2: '至尊卡.png',
    title: '至尊卡',
    cardName: 'EXTREME'
  },
  {
    cardicon: 'cj-icon.png',
    cardicon2: '超级VIP卡.png',
    title: '超级VIP',
    cardName: 'SUPERVIP'
  }
]

class Queity extends Component {

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      videodata:{},
      vediovisible:false,
      carType: 'SUPERVIP',
    }
  }

  handleOnFold(num) {
    window.scrollTo(0,0);
    this.setState({
      current: num
    })
   
  }
  handleSwitch(type) {
    this.setState({
      carType: type
    })
  }

  componentWillMount(){
    common.getVideoUrl('LegalRight').then((res)=>{
      if(res && res.code==='0'){
        this.setState({
          videodata:res.data[0]
        })
      }
    })
  }
  showVedio = (e) => {
    this.setState({
      vediovisible: true,
    });
  }
  handleShow = (e) => {
    console.log(e);
    this.setState({
      vediovisible: false,  
    });
  }
  handleHide = (e) => {
    console.log(e);
    this.setState({
      vediovisible: false,
    });
  }

  render() {
    const { current,videodata, carType } = this.state;
    console.log(videodata.videoUrl);
    return (
      
      <div className='handleQueity'>
        <div className='QueitySuprise'>
          <h2 className="pad_t_0">加入我们，见证每一次惊喜</h2>
          <div className='suprisefont'>
            {/* <p>一汽丰田丰享汇以全心全意服务每一位会员为目标，为每一位会员提供更尊贵、更便利、更实惠、更丰富的人性化用车生活体验!</p>
            <p>“丰享汇”于2016年12月开始筹备，旨在搭建官方车主会员俱乐部管理平台，在经销店现有政策基础上增加厂家政策，使得客户成为会员后权益增加，</p>
            <p>同时享受经销商门店权益和品牌厂商权益，整合各界资源为车主提供优质服务和极致体验。</p>
            <p>2017年6月会员管理平台正式上线，丰享汇车主俱乐部正式成立。2018 年丰享汇会员已达百万。</p> */}
          </div>
          <div className='videoPlay' onClick={this.showVedio.bind(this)}>
            <img src={this.state.videodata.picture} alt=""/>
            <img src={require('../../../../assets/img/brandcenter/fansinteraction/play-icon.png')} alt="" />
            {/* <VideoWin id={"huiyuan"} vid={videodata.videoUrl} ></VideoWin> */}
          </div>
        </div>
        <div className='joinvipway'>
          <div className='joinvipcontent'>
            <img src={require('../../../../assets/img/fxh/pic-6.png')} alt="" />
            <div className='contentRight'>
              {/* <h3><img src={require('../../../../assets/img/fxh/mi.png')} />入会方式</h3> */}
              <h3>入会方式</h3>
              <div className='vipways'>
                <p>① 在“<b>一汽丰田丰享汇</b>”公众号下“<b>享我</b>”菜单中找到“<b>会员中心</b>”并点击进入</p>
                <p>② 完成个人信息填写点击“<b>下一步</b>”按钮进入“<b>会员中心</b>”</p>
                {/* <p>2、一汽丰田官网注册入会。</p> */}
                <p>③ 在“<b>会员中心</b>”页面找到“<b>我的爱车</b>”按钮点击进入</p>
                <p>④ 在“<b>我的爱车</b>”页面点击下方“<b>认证爱车</b>”按钮，提交相关资料完成车辆认证</p>
              </div>
              <div className="vipimg">
                <img src={require('../../../../assets/img/brandcenter/fansinteraction/vipimg.png')} alt="" />
              </div>
              {/* <div className='vipbtn'>
                <span>扫码入会</span>
              </div> */}
            </div>
          </div>
        </div>
        
        <div className='QueitySuprise'>
          <h2>一分钟了解丰享汇</h2>
          <div className="descripe">
            一汽丰田丰享汇是一汽丰田官方车主俱乐部，加入丰享汇不仅可以体验触手可及的专业服务，还能享受跨平台、高价值的会员尊享权益，参加多样化的福利活动，为您的用车生活带来全方位的深度改变。快来加入我们，前方有更多惊喜等您来开启。
          </div>
          <div className="showList">
            <div className="left">
              <img src={require('../../../../assets/img/brandcenter/fansinteraction/showList_1.png')} alt=""/>
            </div>
            <div className="right pad_t_60">
              <div>
                <h3>① 注册认证</h3>
                <span>用户注册成为一汽丰田丰享汇会员并完成车主认证，即可获得积分奖励，其中：</span>
                <span>荣耀卡会员奖励100积分</span>
                <span>尊享卡会员奖励1000积分</span>
                <span>至尊卡会员奖励3000积分</span>
              </div>
              <div>
                <h3>② 推荐购车</h3>
                <span>所有会员（包含普通卡会员）成功推荐购车即可获得积分奖励，其中：</span>
                <span>推荐购车1-3台奖励3000积分／台</span>
                <span>推荐购车4-5台奖励4500积分／台</span>
                <span>推荐购车6-10台奖励6000积分／台</span>
                <span>推荐购车10台以上奖励9000积分／台</span>
              </div>
            </div>
          </div>
          <div className="showList">
            <div className="right pad_t_66">
              <div>
                <h3>③	增换购</h3>
                <span>荣耀卡、尊享卡和至尊卡会员增购或换购一汽丰田车辆，每台获得10000积分</span>
              </div>
              <div>
                <h3>④ 参加厂家活动</h3>
                <span>会员参加厂商发布的活动，可获得积分奖励</span>
              </div>
              <div>
                <h3>⑤ 平台签到</h3>
                <span>每日签到可获得1积分</span>
              </div>
              <div>
                <h3>⑥ 平台完善资料</h3>
                <span>完善“我的资料”，可获得50积分</span>
              </div>
            </div>
            <div className="left">
              <img src={require('../../../../assets/img/brandcenter/fansinteraction/showList_2.png')} alt=""/>
            </div>
          </div>
          <div className="showList">
            <div className="left">
              <img src={require('../../../../assets/img/brandcenter/fansinteraction/showList_3.png')} alt=""/>
            </div>
            <div className="right pad_t_81">
              <div>
                <h3><i></i>积分如何使用</h3>
                <span>① 兑换积分商城的商品和纯牌零件等</span>
                <span>② 兑换活动特权</span>
                <span>③	在认证经销店返厂维修保养，积分可抵现金（不含保险事故车）和工时费</span>
                <span>④ 购买延保产品抵现金</span>
                <span>⑤ 续保抵现金</span>
                <span>⑥ 店端指定商品及服务消费抵现金</span>
                <span>⑦ 厂家其他服务抵用现金</span>
                <span><i>*</i>积分商城兑换订单可在“商城订单”中查询，维保订单可在“服务订单”中查询</span>
              </div>
            </div>
          </div>
        </div>

        <div className='QueitySuprise'>
          <h2>会员等级体系</h2>
          <div className='vipgrand-content'>
            <div className='grandHeader'>
              <div className='grandHeaderLeft'>
                {
                  carType === 'COMMON' ?
                    <Fragment>
                      <img src={require('../../../../assets/img/fxh/commoncard.png')} alt="" />
                      <h3>未购车客户，完成会员注册即可成为普通卡会员</h3>
                    </Fragment>
                    :
                    carType === 'GLORY' ?
                      <Fragment>
                        <img src={require('../../../../assets/img/fxh/ry.png')} alt="" />
                        <h3>车主名下认证1台车辆或车辆一年累计1200积分以下</h3>
                      </Fragment>
                      :
                      carType === 'ENJOY' ?
                        <Fragment>
                          <img src={require('../../../../assets/img/fxh/zxcard.png')} alt="" />
                          <h3>车主名下认证2台车辆或车辆一年累计1200积分以上、5000积分以下</h3>
                        </Fragment>
                        :
                        carType === 'EXTREME' ?
                          <Fragment>
                            <img src={require('../../../../assets/img/fxh/zz.png')} alt="" />
                            <h3>车主名下认证3台及以上车辆或车辆一年累计5000积分以上</h3>
                          </Fragment>
                          :
                          <Fragment>
                            <img src={require('../../../../assets/img/fxh/vip.png')} alt="" />
                            <h3>经销店推荐认证车主（每个店只有1个名额）</h3>
                          </Fragment>
                }
              </div>
              <div className='grandHeaderRight'>
                {
                  carType === 'COMMON' ?
                    <Fragment>
                      {/* <p className='title'>受邀参加FTMS举行的会员活动</p> */}
                      <span>
                        {/* <i>阶梯性赠送：</i> */}
                        <div>
                          <p>1. 受邀参加FTMS举行的会员活动</p>
                          {/* <p>2. 1~3台推荐购车赠送3000积分/台，4~5台推荐购车赠送4500积分/台，6~10台推荐购车赠送6000积分/台，10台以上推荐购车赠送9000积分/台</p> */}
                          <p>2. 1~3台推荐购车赠送3000积分/台，</p>
                          <p><b></b>4~5台推荐购车赠送4500积分/台，</p>
                          <p><b></b>6~10台推荐购车赠送6000积分/台，</p>
                          <p><b></b>10台以上推荐购车赠送9000积分/台</p>
                        </div>
                      </span>
                    </Fragment>
                    :
                    carType === 'GLORY' ?
                      <Fragment>
                        {/* <p className='title'>受邀参加一汽丰田举行的会员活动</p>
                        <p className='title'>消费积分赠送（消费额20%）</p> */}
                        <span>
                          {/* <i>阶梯性赠送：</i> */}
                          <div>
                            <p>1. 受邀参加FTMS举行的会员活动</p>
                            <p>2. 增换购本品牌赠送10000积分</p>
                            <p>3. 消费积分赠送(消耗额20%)</p>
                            <p>4. 节点活动积分翻倍</p>
                            <p>5. 生日当月赠送50%维修保养工时费积分</p>
                            <p>6. 经销商根据自店情况设置客户权益</p>
                            <p>7. 购买价值链卡券</p>
                            <p>8. 包含普通卡会员所有权益</p>
                          </div>
                        </span>
                        {/* <p >生日当月回厂赠送积分翻倍</p> */}
                      </Fragment>
                      :
                      carType === 'ENJOY' ?
                        <Fragment>
                          {/* <p className='title'>受邀参加一汽丰田举行的会员活动</p>
                          <p className='title'>消费积分赠送（消费额40%）</p> */}
                          <span>
                            {/* <i>阶梯性赠送：</i> */}
                            <div>
                              <p>1. 受邀参加FTMS举行的会员活动</p>
                              <p>2. 增换购本品牌赠送10000积分</p>
                              <p>3. 消费积分赠送(消耗额40%)</p>
                              <p>4. 节点活动积分翻倍</p>
                              <p>5. 生日当月赠送50%维修保养工时费积分</p>
                              <p>6. 经销商根据自店情况设置客户权益</p>
                              <p>7. 购买价值链卡券</p>
                              <p>8. 包含普通卡会员所有权益</p>
                            </div>
                          </span>
                          {/* <p>生日当月回厂赠送积分翻倍</p> */}
                        </Fragment>
                        :
                        carType === 'EXTREME' ?
                          <Fragment>
                            {/* <p className='title'>受邀参加一汽丰田举行的会员活动</p>
                            <p className='title'>消费积分赠送（消费额60%）</p> */}
                            <span>
                              {/* <i>阶梯性赠送：</i> */}
                              <div>
                                <p>1. 受邀参加FTMS举行的会员活动</p>
                                <p>2. 增换购本品牌赠送10000积分</p>
                                <p>3. 消费积分赠送(消耗额60%)</p>
                                <p>4. 节点活动积分翻倍</p>
                                <p>5. 生日当月赠送50%维修保养工时费积分</p>
                                <p>6. 经销商根据自店情况设置客户权益</p>
                                <p>7. 购买价值链卡券</p>
                                <p>8. 包含普通卡会员所有权益</p>
                              </div>
                            </span>
                            {/* <p>生日当月回厂赠送积分翻倍</p> */}
                          </Fragment>
                          :
                          <Fragment>
                            {/* <p className='title'>优先参加一汽丰田举行的大型活动</p>
                            <p className='title'>消费积分赠送（消费额80%）</p> */}
                            <span>
                              {/* <i>阶梯性赠送：</i> */}
                              <div>
                                <p>1. 受邀参加FTMS举行的会员活动</p>
                                <p>2. 增换购本品牌赠送10000积分</p>
                                <p>3. 消费积分赠送(消耗额80%)</p>
                                <p>4. 节点活动积分翻倍</p>
                                <p>5. 生日当月赠送50%维修保养工时费积分</p>
                                <p>6. 经销商根据自店情况设置客户权益</p>
                                <p>7. 购买价值链卡券</p>
                                <p>8. 包含普通卡会员所有权益</p>
                              </div>
                            </span>
                            {/* <p className='title'>机场休息区免费服务（部分城市）</p>
                            <p className='title'>绿色保养维修服务【无需等待（部分城市）】</p>
                            <p>生日当月回厂赠送积分翻倍</p> */}
                          </Fragment>
                }
              </div>
            </div>
            <ul className='grandMiddle'>
              {
                cardNav.map((v, i) => {
                  return <li key={i} onClick={() => { this.handleSwitch(v.cardName) }} className={classNames({ 'sel-cardType': carType === v.cardName })}>
                    {
                      carType === v.cardName?
                      <img src={require(`../../../../assets/img/fxh/${v.cardicon2}`)} alt="" /> :
                      <img src={require(`../../../../assets/img/fxh/${v.cardicon}`)} alt="" />
                    }
                    <span>{v.title}</span>
                  </li>
                })
              }
            </ul>
          </div>
        </div>

        {/* 视频弹框 */}
        <Modal
          title=""
          visible={this.state.vediovisible}
          onOk={this.handleShow}
          onCancel={this.handleHide}
          footer={null}
          forceRender={true}
          getContainer={() => document.body}
          wrapClassName='showdDetailVedio'
          centered={true}
        >
          <div className='box'>
            <VideoWin id={'shipin'} vid={this.state.videodata.videoUrl}></VideoWin>
           </div>
        </Modal>
      </div>
    )
  }
}

export default Queity
