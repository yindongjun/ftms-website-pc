import React, { Component, Fragment } from 'react'
import VsInfoBar from '../../../components/VsInfoBar'
import './index.less'
import{ carSellHelpInter }from '../../../services/carSellHelpInter'
import { message } from 'antd';
import { add, del, getAll, delAll } from '../../../redux/vsCarList.redux'
import { connect } from 'react-redux'

@connect(
    state => state,
    { add, del, getAll, delAll }
)
class CarBrandModels extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vsInfoBoxIsShow: false,
            checkAnchor_name: '',
            isVSBarShow: false,
            vsInfoBoxDDisplayNum: '',
            // === 接口数据 ===
            brandModelsList_RESDATA: [],
            getVersion_RESDATA: [],
            isFixed: false,
            ancFirst: false,
            ancSecond: false,
            ancThird: false,
            ancFourth: false,
            exc: ['12','35'], //不加入对比的车型
            disableCompare: true, //是否关闭加入对比功能
        }
    }
    handleScroll(e) {
        let scTop = document.documentElement.scrollTop||document.body.scrollTop
        // console.log(scTop)
        if (scTop > 10) {
            this.setState({
                isFixed: true
            })
        } else {
            this.setState({
                isFixed: false
            })
        }
        this.handleTop()
    }
    // 头部的标签滚动对应
    handleTop() {
        const ele1 = document.getElementById('jiaoche');
        const ele2 = document.getElementById('SUV');
        const ele3 = document.getElementById('keche');
        const ele4 = document.getElementById('jinkou');
        let top1;
        let top2;
        let top3;
        let top4;
        if(ele1 && ele2 && ele3) {
             top1 = ele1.getBoundingClientRect().top;
             top2 = ele2.getBoundingClientRect().top;
             top3 = ele3.getBoundingClientRect().top;
             top4 = ele4.getBoundingClientRect().top;
        }
        // console.log(top1, top2, top3,top4);
        this.setState({
            checkAnchor_name: ''
        })
        if (top1 <= 260) {
            this.setState({
                ancFirst: true,
                ancSecond: false,
                ancThird: false,
                ancFourth: false,
            })
        }
        if (top2 <= 320 && top2 >= top1 && top2 <= top3) {
            this.setState({
                ancFirst: false,
                ancSecond: true,
                ancThird: false,
                ancFourth: false,
            })
        }
        if(top3 <= 320 && top3 >= top2 && top3 <= top4) {
            this.setState({
                ancFirst: false,
                ancSecond: false,
                ancThird: true,
                ancFourth: false
            })
        }
        if(top4 <= 320 && top4 >= top3) {
            this.setState({
                ancFirst: false,
                ancSecond: false,
                ancThird: false,
                ancFourth: true
            })
        }
        // console.log(this.state.ancFirst, this.state.ancSecond, this.state.ancThird, this.state.ancFourth);
    }
    // 生命周期
    componentDidMount() {
        this.brandModelsList()
        window.addEventListener('scroll',this.handleScroll.bind(this))
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this))
    }

    // ================================================== 接口函数 ==================================================
    // 品牌车型：车型展示列表
    brandModelsList() {
      carSellHelpInter.brandModelsList().then((res) => {
        if (res && res.code === '0') {
            this.setState({
                brandModelsList_RESDATA: res.data,
                checkAnchor_name:res.data[0].title
            })
        }
      })
    }
    // 品牌车型：获取车型的价格和版本
    getVersion(cid) {
        carSellHelpInter.getVersion(cid).then((res) => {
          if (res && res.code === '0') {
                this.setState({
                    getVersion_RESDATA: res.data
                })
            }
        })
    }
    // ============================================================================================================
    // 加入对比
    addRow(addIndex, e) {
        e.stopPropagation();
        let parent, imgUrl, h3, p
        if (e.target.nodeName === 'I' || e.target.nodeName === 'STRONG' || e.target.nodeName === 'SPAN') {
            parent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode
            imgUrl = parent.children[2].attributes.src.value
            h3 = parent.children[3].innerText
            p = e.target.parentNode.children[2].innerText
        } else {
            parent = e.target.parentNode.parentNode.parentNode.parentNode
            imgUrl = parent.children[2].attributes.src.value
            h3 = parent.children[3].innerText
            p = e.target.children[2].innerText
        }
        // 要对添加的对比车型进行 加入 redux 状态管理  obj 是 redux里面 对比车型的信息存储格式
        let obj = Object.assign(addIndex[0], { cartype : addIndex[1], carTitle: h3, carPrice: p, carImage: imgUrl} )
        // console.log(obj)

        // 添加之前 先和已有的做对比 重复选择的车型不让填入对比
        for (let i = 0; i < this.props.compare.vsCarListInfo.length; i++) {
            if (obj.id === this.props.compare.vsCarListInfo[i].id) {
                message.warn('请选择不同版本')
                return
            }
        }

        if (this.props.compare.vsCarListInfo.length >= 4) {
            message.warn('最多只能添加4款车型')
            return
        } else {
            this.props.add(obj)
            message.success('添加成功')
            this.setState({
                isVSBarShow: true
            })
        }
        this.forceUpdate()
    }
    // 跳转车辆详情
    toCarDetail(carAlias, e) {
        e.stopPropagation()
        if(e.target.className === 'joinVSBtn' || e.target.className === 'joinVSBtnMask') return
        this.props.history.push(`/buycar/cartype/detail/${carAlias}`)
        let parent
        if (e.target.className === 'listItem') {
            parent = e.target
        } else {
            parent = e.target.parentNode
        }
        const imgUrl = parent.children[2].attributes.src.value
        const h3 = parent.children[3].innerText
        const p = parent.children[4].innerText
        let carInfo_session = {
            carTitle: h3,
            carPrice: p.replace(/价格：/, ''),
            carImage: imgUrl
        }
        // 还要将这种格式存到sessionStorage里面 进入详情里也有个加入对比要取到这个对象
        localStorage.setItem('carInfo_session', JSON.stringify(carInfo_session))
    }
    // 跳转车辆对比详情
    toVsCarPage() {
        this.props.history.push(`/carSellHelp/vsCarPage`)
        // window.open(`/carSellHelp/vsCarPage`)
    }
    // 对比盒子点击时获取数据
    vsInfoBoxChange(cid, e) {
        e.stopPropagation()
        if(e.target.className === 'joinVSBtn') {
            this.setState({
                vsInfoBoxDDisplayNum: cid,
                getVersion_RESDATA: []
            })
            this.getVersion(cid)
        }
    }
    // 关闭对比盒子
    vslistClose() {
        this.setState({
            vsInfoBoxDDisplayNum: '',
            getVersion_RESDATA: []
        })
    }
    // 题头锚点 选中后的样式
    checkAnchor(type) {
        console.log(type);
        this.setState({
            checkAnchor_name : type,
            ancFirst: false,
            ancSecond: false,
            ancThird: false,
            ancFourth: false,
        })
    }
    // 车型对比栏
    show() {
        this.setState( (pre) => {
            return {
                isVSBarShow: !pre.isVSBarShow
            }
        })
    }
    // 去3D
    go3D(cid) {
        if(Number(cid) === 33){
            window.open('/carSellHelp/digiAvalon');
        }else if(Number(cid) === 34){
            window.open('/carSellHelp/digiCorolla');
        }else if(Number(cid) === 32){
            window.open('/carSellHelp/digiIzoa');
        }
    }
    handleItemClick(is3d,cid,carAlias,e) {
        if(is3d) {
            this.go3D(cid)
        } else {
            this.toCarDetail(carAlias,e)
        }
    }
    //判断是否属于不加入对比的车型
    isExc(excId){
        return this.state.exc.indexOf(''+excId)!=-1;
    }
    render() {
        const {brandModelsList_RESDATA, getVersion_RESDATA} = this.state
        // console.log(brandModelsList_RESDATA);
        return (
            <div className = 'carBrandModels' onClick = {this.vslistClose.bind(this)}>
                <div className = 'carModels'>
                    <div className = {this.state.isFixed ? 'bigTitle none' : 'bigTitle'}>品牌车型</div>
                    <div className = {this.state.isFixed ? 'checkAnchor fixed' : 'checkAnchor'}>
                        {
                            brandModelsList_RESDATA.map( (item, index) => {
                                if (index === brandModelsList_RESDATA.length - 1) {
                                    return (
                                        item.car_series.length === 0 ?
                                        <a href = {`#anchor_${item.title}`} key = {index}
                                           style={{width: `${90/brandModelsList_RESDATA.length}%`}}
                                           onClick = {this.checkAnchor.bind(this, item.title)}
                                           className = {this.state.checkAnchor_name === item.title || this.state.ancFourth? 'checkAnchor_active': ''}  className = 'yuanzhuangjinkouBox'>
                                            <i>原装进口</i>
                                            <span>原装进口(敬请期待)</span>
                                        </a>
                                        :
                                        <a href = {`#anchor_${item.title}`} key = {index}
                                           style={{width: `${90/brandModelsList_RESDATA.length}%`}}
                                           onClick = {this.checkAnchor.bind(this, item.title)}
                                           className = {this.state.checkAnchor_name === item.title || this.state.ancFourth? 'checkAnchor_active': ''}>原装进口</a>
                                    )
                                } else {
                                    return (
                                        <a href = {`#anchor_${item.title}`} key = {index}
                                           style={{width: `${90/brandModelsList_RESDATA.length}%`}}
                                           onClick = {this.checkAnchor.bind(this, item.title)}
                                           className = {this.state.checkAnchor_name === item.title ||
                                            (index === 0 ? this.state.ancFirst :
                                              (index === 1 ? this.state.ancSecond :
                                                (index === 2 ? this.state.ancThird : null))) ? 'checkAnchor_active': ''}>
                                            {item.title}
                                        </a>
                                    )
                                }
                            })
                        }
                        {/* <a href = '#anchor_jiaoche'>轿车</a>
                        <a href = '#anchor_SUV'>SUV</a>
                        <a href = '#anchor_zhongxingkeche'>中型客车</a>
                        <a href = 'javascript:void(0)'>原装进口(敬请期待)</a> */}
                    </div>
                    {
                        brandModelsList_RESDATA.map( (item, index) => {
                            return (
                                <Fragment key = {index}>
                                    {
                                        item.car_series.length === 0? null :
                                        <Fragment>
                                            <div id = {`anchor_${item.title}`} style={{'height': 0, 'position': 'relative', 'top': '-1.8rem', 'overflow': 'hidden'}}></div>
                                            <div id = {index === 0 ? "jiaoche" : (index === 1 ? 'SUV' : (index === 2 ? 'keche' : 'jinkou'))}>
                                                <div className={index === 0 ? "jiaoche" : (index === 1 ? 'SUV' : 'keche')}>{item.title}</div>
                                                <ul className="jiaocheList">
                                                    {
                                                        item.car_series.map( (item2, index2) => {
                                                            if(index2 === 1 && item.title === '轿车' ) {
                                                                return (
                                                                  <Fragment key = {index2}>
                                                                      <li className='itemMask'>
                                                                          <div className='listItem' onClick={this.handleItemClick.bind(this,item2.is3d, item2.cid, item2.alias)}>
                                                                              <i className = {item2.isnew === 0 ? '' : 'carMark_new'}></i>
                                                                              <span className = {item2.is3d === 0 ?'' : 'carMark_attr'}></span>
                                                                              <img src = {item2.thumb} alt=""/>
                                                                              <h3>{item2.name}</h3>
                                                                              {
                                                                                  item2.price?
                                                                                    <p>价格：{item2.price}</p>
                                                                                    :
                                                                                    <p>价格请咨询当地经销商</p>
                                                                              }
                                                                              <div className = 'detailBtn' style =  {this.state.disableCompare || this.isExc(item2.cid)?{'margin-left':'0.8rem'}:{}} onClick = {this.toCarDetail.bind(this, item2.alias)}>
                                                                                  <em></em>&nbsp;查看详情
                                                                              </div>
                                                                              {
                                                                                this.state.disableCompare || this.isExc(item2.cid)? null:
                                                                                <div className = 'joinVSBtn' onClick = {this.vsInfoBoxChange.bind(this, item2.cid)}>
                                                                                <em></em>&nbsp;加入对比
                                                                                <div className = 'vsInfoBox' style =  {{display: this.state.vsInfoBoxDDisplayNum === item2.cid? 'block':'none'}}>
                                                                                    <i></i>
                                                                                    <ul className="vsInfoList">
                                                                                        {
                                                                                            getVersion_RESDATA.map( (item3, index) => {
                                                                                                return (
                                                                                                <li key = {index} onClick = {this.addRow.bind(this, [item3, item2.name] )}>
                                                                                                    <i>+</i>
                                                                                                    <span dangerouslySetInnerHTML={{ __html:item3.version + item3.name}} title = {item3.version + item3.name.replace('<sup>+</sup>', '+')}></span>
                                                                                                    <strong>{item3.price}</strong>
                                                                                                </li>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </ul>
                                                                                    <h5>提示：点击选择增加车型对比</h5>
                                                                                </div>
                                                                                </div>
                                                                            }
                                                                          </div>
                                                                      </li><br/>
                                                                  </Fragment>
                                                                )
                                                            } else {
                                                                return (
                                                                  <li className='itemMask' key = {index2}>
                                                                      <div className='listItem' onClick={this.handleItemClick.bind(this,item2.is3d, item2.cid, item2.alias)}>
                                                                          <i className = {item2.isnew === 0 ? '' : 'carMark_new'}></i>
                                                                          <span  className = {item2.is3d === 0 ?'' : 'carMark_attr'}></span>
                                                                          <img src = {item2.thumb} alt=""/>
                                                                          <h3>{item2.name}</h3>
                                                                          {
                                                                              item2.price?
                                                                                <p>价格：{item2.price}</p>
                                                                                :
                                                                                <p>价格请咨询当地经销商</p>
                                                                          }
                                                                          <div className = 'detailBtn' style =  {this.state.disableCompare || this.isExc(item2.cid)?{'margin-left':'0.8rem'}:{}} onClick = {this.toCarDetail.bind(this, item2.alias)}>
                                                                              <em></em>&nbsp;查看详情
                                                                          </div>
                                                                          {
                                                                            this.state.disableCompare || this.isExc(item2.cid)?null:
                                                                            <div className = 'joinVSBtn' onClick = {this.vsInfoBoxChange.bind(this, item2.cid)}>
                                                                                <em></em>&nbsp;加入对比
                                                                                <div className = 'vsInfoBox' style =  {{display: this.state.vsInfoBoxDDisplayNum === item2.cid? 'block':'none'}}>
                                                                                    <i></i>
                                                                                    <ul className="vsInfoList">
                                                                                        {
                                                                                            getVersion_RESDATA.map( (item3, index) => {
                                                                                                return (
                                                                                                <li key = {index} onClick = {this.addRow.bind(this, [item3, item2.name] )}>
                                                                                                    <i>+</i>
                                                                                                    <span dangerouslySetInnerHTML={{ __html:item3.version + item3.name}} title = {item3.version + item3.name.replace('<sup>+</sup>', '+')}></span>
                                                                                                    <strong>{item3.price}</strong>
                                                                                                </li>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </ul>
                                                                                    <h5>提示：点击选择增加车型对比</h5>
                                                                                </div>
                                                                            </div>
                                                                          }
                                                                      </div>
                                                                  </li>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </Fragment>
                                    }
                                </Fragment>
                            )
                        })
                    }
                </div>
                { this.state.disableCompare?null:
                    <VsInfoBar toVsCarPage = {this.toVsCarPage.bind(this)} isVSBarShow = {this.state.isVSBarShow} show = {this.show.bind(this)}/>
                }
            </div>
        )
    }
}

export default CarBrandModels