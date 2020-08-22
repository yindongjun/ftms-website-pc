import React, {Component} from 'react'
import './index.less'
import {footerApi} from "../../../../services/api";
import {querryStringToObject} from "../../../../utils/util";

class NoticeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addTime: '',
            content: '',
            files: '',
            name: ''
        }
    }
    componentDidMount() {
        const search = this.props.location.search;
        const params = querryStringToObject(search);
        if (params.bid) {
            this.getTenderdetail(params.bid)
        }
    }
    getTenderdetail(bid) {
        footerApi.getTenderdetail(bid).then(res => {
            if (res && res.code === '0') {
                this.setState({
                    addTime: res.data.addtime,
                    content: res.data.content,
                    files: res.data.files,
                    name: res.data.name
                })
            }
        })
    }

    download() {
        window.location.href = this.state.files
    }

  render() {
      const { name, addTime, content, files} = this.state;
      return(
      <div className='handleNoticeDetail'>
        <h1>{name}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        {/*<div>*/}
          {/*<h2>1、项目内容：</h2>*/}
          {/*<h3>1.1 项目名称：一汽丰田汽车销售有限公司2019年度补充医疗招标项目</h3>*/}
          {/*<h3>1.2 具体项目内容：</h3>*/}
          {/*<p>根据一汽丰田汽车销售有限公司员工的具体情况制定合理的医疗保险福利套餐，提供周期性的理赔服务，以及医疗基金管理。其他在增值性服务内容不限。详细内容如下：</p>*/}
          {/*<h3>1.2.1提供保险套餐（包含必选的基本套餐部分和可根据自身情况自选的额外套餐部分）</h3>*/}
          {/*<h3>1.2.2理赔服务（生育、门诊、住院、意外伤害、交通事故、疾病身故等）</h3>*/}
          {/*<h3>1.2.3医疗基金管理（基金收益率，管理费率）</h3>*/}
        {/*</div>*/}
        {/*<div>*/}
          {/*<h2>2、报名资质要求：</h2>*/}
          {/*<h3>2.1 经工商行政管理部门注册核准，允许提供保险理赔类服务，可承担本次招标公告内招业务内容的企业事业单位；</h3>*/}
          {/*<h3>2.2 公司注册时间：2015年1月1日前注册成立；</h3>*/}
          {/*<h3>2.3 经营状况良好，无不良从业记录；</h3>*/}
          {/*<h3>2.4 具备丰富的央企或合资车企业服务经验；</h3>*/}
          {/*<h3>2.5 注册资本2亿人民币以上；</h3>*/}
          {/*<h3>2.6 在全国设有经保监会批复取得营业执照的直属省级分公司，或在当地有直属服务机构并设有专职服务人员。</h3>*/}
        {/*</div>*/}
        {/*<div>*/}
          {/*<h2>3、报名须提供以下资料（请参考附件招募申请书）：</h2>*/}
          {/*<h3>3.1 公司概况介绍，包括单不限于公司规模、分支机构，服务团队等；</h3>*/}
          {/*<h3>3.2 申请表、投标授权书、资质文件真实性承诺书，等：请如实填写公司相关信息，并请法定代表人在资料中指定位置签字并加盖公司公章；</h3>*/}
          {/*<h3>3.3 公司资质：营业执照，税务登记证，增值税一般纳税人资格认定材料、组织机构代码证及其它证明材料；近两年度审计报告；法定代表人身份证、经办人身份证等；</h3>*/}
          {/*<p style={{marginBottom: '.48rem'}}>（注：以上内容请提供复印件；营业执照请加盖公司公章并提供在工商部门官网上的营业执照真伪查询信息）；</p>*/}
          {/*<h3>上述资料和信息必须属实，如查明有虚假资料和信息，将取消其报名资格。</h3>*/}
        {/*</div>*/}
        {/*<div>*/}
          {/*<h2>4、招募流程：</h2>*/}
          {/*<h3>4.1 在FTMS官网公布招募公告；</h3>*/}
          {/*<h3>4.2 接收报名公司资料：</h3>*/}
          {/*<p>符合招募标准且有意愿参与的公司，请将第3条规定的资料的PDF文档，<i>在北京时间2019年1月2日(周四)17:00点前通过邮箱发送至一汽丰田汽车销售有限公司联系人处，纸质原件(密封处加盖公司公章)请通过顺丰快递在1月2日17:00前送达。</i>逾期未送达的资料视为无效。另请以邮件形式通知邮寄时间和运单号，以备查档所需。</p>*/}
          {/*<h3>4.3 相关资料筛选评审；</h3>*/}
          {/*<h3>4.4 如提交资料初审通过，将通知该公司下一步工作。</h3>*/}
          {/*<p>具体通讯地址及联系方式详见下面内容：</p>*/}
          {/*<p>联系人：林志伟</p>*/}
          {/*<p>电话：010-59529928</p>*/}
          {/*<p>Email: linzhiwei@ftms.com.cn</p>*/}
          {/*<p>邮递地址：北京市朝阳区东三环中路1号环球金融中心西塔4层</p>*/}
        {/*</div>*/}
        {/*<div>*/}
          {/*<h2>5、其他事项：</h2>*/}
          {/*<h3>5.1 以上公告为招募公告。</h3>*/}
          {/*<h3>5.2 一汽丰田汽车销售有限公司将从报名的公司中择优选择符合相关资质标准的公司参加招标，后续招标流程（包括招标说明会、招标时间等）另行通知。</h3>*/}
        {/*</div>*/}
        <div>
          {/*<h3>一汽丰田汽车销售有限公司</h3>*/}
          {/*<h3>{addTime}</h3>*/}
        </div>
        <a>
            <span className='downloadbtn' onClick={() => {this.download()}}>下载招募申请书</span>
        </a>
      </div>
    )
  }
}

export default NoticeDetail