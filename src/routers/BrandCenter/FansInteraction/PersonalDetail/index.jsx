import React, { Component } from 'react'
import { brandConter } from '../../../../services/brandConter'
import { Modal } from 'antd';
import FCWorld from '../../../../components/Common/FCWorld';
import { querryStringToObject } from '../../../../utils/util'
import $ from 'jquery'
import './index.less'
class PersonalDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      personInfo: {},
      postList: [],
      moreBtnShow: true,
      visible: false,
    }
  }
  componentDidMount() {
    this.getPersonInfo(this.state.page);
  }
  getPersonInfo(page) {
    page++;
    const search = this.props.location.search;
    const params = querryStringToObject(search);
    brandConter.getPersonInfo(params.id,page).then((res) => {
      if(res && res.code =='0') {
        if(res.data.list.length>0) {
          this.setState({
            personInfo: res.data,
            postList: [...this.state.postList,...res.data.list],
            page:page
          })
          if(page>=res.data.totalpage) {
            this.setState({
              moreBtnShow: false
          })
          }
          this.waterFall();
        }else {
          this.setState({
            personInfo: res.data,
            page:page
          })
        }
      }
    })
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  waterFall () {
    let top1=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    var allBox = $('#ullist > .libox');
    var boxWidth = $(allBox).eq(0).outerWidth();
    var boxH=$(allBox).eq(0).outerHeight();
    var screenWidth = this.refs.ullist.offsetWidth;//大容器宽度
    var cols=2;//
    var heightArr = [];
    var maxhight=0;
    var mh=0;
    $.each(allBox,function (index,value) {
        var boxHeight = $(value).outerHeight();
        if(index < cols)
        {
            heightArr[index] = boxHeight;
        }
        else 
        {
            var minBoxHeight = Math.min.apply(null,heightArr);
            var minBoxIndex = $.inArray(minBoxHeight,heightArr);
            if(minBoxIndex){
              $(value).css({
                'position':'absolute',
                'top':minBoxHeight + 'px',
                'left':minBoxIndex * boxWidth +10+ 'px'
            });
            }else{
              $(value).css({
                'position':'absolute',
                'top':minBoxHeight + 'px',
                'left':minBoxIndex * boxWidth+ 'px'
            });
            }
            mh=minBoxHeight+boxHeight;
            if(mh>maxhight){
              maxhight=mh;
            }
            $('#ullist').height(maxhight);
            heightArr[minBoxIndex] += boxHeight;
            window.scrollTo(0, top1);
        }
    })
  }
  render() {
    const {postList, personInfo, page, moreBtnShow} = this.state;
    return (
      <div className='handlePersonalDetail'>
          <div className='PersonalDetail'>
          {
            <div className='personalInfo'>
              <span className='personalInfoLeft'>
                <img src={personInfo.avatarurl} alt="" />
                <div>
                  <h2>{personInfo.nickname}<i>{personInfo.city}</i></h2>
                  <p>{personInfo.sign}</p>
                </div>
              </span>
              <span className='personalInfoRight'>
                <div>
                  <span>粉丝<i>{personInfo.fans}</i></span>
                  <span>关注<i>{personInfo.attention}</i></span>
                </div>
                <button onClick={this.showModal}>关注</button>
              </span>
            </div>
          }
            
            
            <div className='PostsList'  id="ullist" ref="ullist">
              {this.getPostTag()}
            </div>
            {
              moreBtnShow?
              <span className='watchmore' onClick={this.getPersonInfo.bind(this,page)}>查看更多</span>:
              null
            }
          </div>
          <Modal
          title=" "
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          wrapClassName='FCWorld'
          centered={true}
        >
          <FCWorld/>
        </Modal>
      </div>
    )
  }
  getPostTag() {
    const {postList} = this.state;
    return postList.map((item,index)=> {
      return (
        <a className="libox" key={item.id+'_'+index} href={`/brandcenter/fansinteraction/postsdetail?id=`+item.id}>
          <div>
            <div className='ListHeader'>
              <a href="#">
                <img src={item.authorinfo.avatarurl} alt="" />
                <h1>{item.authorinfo.nickname}</h1>
              </a>
              {
                item.authorinfo.tags.map((ii,vv)=> {
                    return (
                    <i key={vv}>{ii.label}</i>)
                })
              }
              {item.authorinfo.isowner==1?<i>认证车主</i>:null}
            </div>
            <span className='activityTitle'>{item.title}</span>
            {item.thumbs.length>0?
            <div className='imgshow'>
              {item.thumbs.map((v,i)=> {
                return (
                  item.thumbs.length==1?
                      <img className="imgshow_1" key ={i} src={v} />:item.thumbs.length==2?
                      <img className="imgshow_2" key ={i} src={v} />:item.thumbs.length>=3?
                      <img className="imgshow_3" key ={i} src={v} />:''
                )
              })}
            </div>:null}
            <div className='ListBottomIcon'>
              <span>{item.createtime}</span>
              <span>
                <i>{item.view}</i>
                <i>{item.reply}</i>
                <i>{item.zan}</i>
                <i>{item.share}</i>
              </span>
            </div>
          </div>
        </a>
      )
    })
  }
}

export default PersonalDetail