import React, {Component, Fragment} from 'react'
import {Menu, Dropdown, Icon, Modal} from 'antd';
import classNames from 'classnames'
import {carSellHelpInter} from '../../../services/carSellHelpInter'
import {querryStringToObject} from '../../../utils/util'
import './index.less'

//储存旋转汽车图片
let catArrt = [
  //0：荣放
  [
    require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/D0W.png'),
    require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/D180W.png'),
    require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/D360W.png')
  ],
  //1：卡罗拉
  [
    require('./../../../assets/img/carSellHelp/purerav4/chexingimg/kaluola_boutique/D0C.png'),
    require('./../../../assets/img/carSellHelp/purerav4/chexingimg/kaluola_boutique/D360C.png'),
    require('./../../../assets/img/carSellHelp/purerav4/chexingimg/kaluola_boutique/D180C.png')
  ],
  //2：全新威驰
  [
    require('./../../../assets/img/carSellHelp/purerav4/chexingimg/weichi_boutique/D0A.png'),
    require('./../../../assets/img/carSellHelp/purerav4/chexingimg/weichi_boutique/D360A.png'),
    require('./../../../assets/img/carSellHelp/purerav4/chexingimg/weichi_boutique/D180A.png')
  ],
  //3：威驰
  [
    require('./../../../assets/img/carSellHelp/purerav4/chexingimg/vios_fs/chexingpeijian/D0B.png'),
    require('./../../../assets/img/carSellHelp/purerav4/chexingimg/vios_fs/chexingpeijian/D360B.png'),
    require('./../../../assets/img/carSellHelp/purerav4/chexingimg/vios_fs/chexingpeijian/D180B.png')
  ],
  //4：普拉多
  [
    require('./../../../assets/img/carSellHelp/purerav4/chexingimg/puladuo_boutique/D0B.png'),
    require('./../../../assets/img/carSellHelp/purerav4/chexingimg/puladuo_boutique/D180B.png'),
    require('./../../../assets/img/carSellHelp/purerav4/chexingimg/puladuo_boutique/D360B.png')
  ]


]

//储存内容和缩略图图片
let decorateArrt = [
  /*---------------------------------------rav4-----------------------------------------------*/
  [
    {
      title: '雾灯装饰罩',  //表达题名字
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/chexingpeijian/wzjp_front_2.png'), //装饰缩略图
      status: false,//是否显示装饰
      angle: [ //角度的装饰
        false,//falsh代码这个角度没有该装饰
        {
          vec3Transform: [2.15, 2.55, 0.55],   //当前角度装饰的top, left ,width
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/chexingpeijian/dadengpj_img.png'),//当前角度的装饰图片
        }, false
      ]
    },
    {
      title: '尾灯装饰罩 PZD38-0R015',
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/chexingpeijian/houchedeng.jpg'),
      status: false,
      angle: [
        false,
        false, {
          vec3Transform: [0.84, 2.99, 2.5],
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/chexingpeijian/wzjp_behind_1_3.png'),
        }
      ]
    },
    {
      title: '侧门踏板 PZD50-0R030',
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/chexingpeijian/wzjp_front_4.png'),
      status: false,
      angle: [
        false,
        {
          vec3Transform: [2.3, 4.25, 1.5],
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/chexingpeijian/wzjp_front_1_4.png'),
        }, {
          vec3Transform: [2.2, 0.56, 1.5],
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/chexingpeijian/wzjp_behind_1_8.png'),
        }
      ]
    },
    {
      title: '车窗侧挡雨板 PZD33-0R020',
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/chexingpeijian/wzjp_front_5.png'),
      status: false,
      angle: [
        false,
        {
          vec3Transform: [0.19, 4.4, 1.1],
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/chexingpeijian/wzjp_front_1_5.png'),
        }, {
          vec3Transform: [0.28, 0.9, 1.72],
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/chexingpeijian/wzjp_behind1_5.png'),
        }
      ]
    },
    {
      title: '车身彩贴 PZD35-0R030',
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/chexingpeijian/wzjp_front_3.png'),
      status: false,
      angle: [
        false,
        {
          vec3Transform: [0.8, 4, 2.4],
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/chexingpeijian/wzjp_front_1_3.png'),
        }, {
          vec3Transform: [0.97, 0.48, 2.36],
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/chexingpeijian/wzjp_behind_1_7.png'),
        }
      ]
    },
    {
      title: '挡泥板 PZD44-0R050',
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/chexingpeijian/dangniban.jpg'),
      status: false,
      angle: [
        false,
        false, {
          vec3Transform: [2.32, 2.85, 0.3],
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/chexingpeijian/dangniban.png'),
        }
      ]
    },
    {
      title: '轮毂（17寸） PZD40-0R001',
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/chexingpeijian/20270423.jpg'),
      status: false,
      angle: false
    },
    {
      title: '前保险杠扰流板    PZD30-0R050',
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/chexingpeijian/rav4-img1.jpg'),
      status: false,
      angle: false
    },
    {
      title: '后保险杠扰流板    PZD30-0R051',
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/chexingpeijian/rav4-img2.jpg'),
      status: false,
      angle: false
    },
    {
      title: '后门踏板护板    PZD51-0R041',
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/chexingpeijian/rav4-img3.jpg'),
      status: false,
      angle: false
    }
  ],

  //--------------------------------------卡罗拉--------------------------------------
  [
    {
      title: '排气管尾喉    PZD47-02004',  //表达题名字
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/kaluola_boutique/chexingpeijian/wzjp_front_big_5.jpg'), //装饰缩略图
      status: false,//是否显示装饰
      angle: [ //角度的装饰
        false,
        false, //falsh代码这个角度没有该装饰
        {
          vec3Transform: [2.55, 5.6, 0.5],   //当前角度装饰的top, left ,width
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/kaluola_boutique/chexingpeijian/wzjp_front_5_c01.png'),//当前角度的装饰图片
        }
      ]
    },
    {
      title: '鲨鱼鳍    PZD34-02001',  //表达题名字
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/kaluola_boutique/chexingpeijian/wzjp_front_big_4.jpg'), //装饰缩略图
      status: false,//是否显示装饰
      angle: [ //角度的装饰
        false,
        false, //falsh代码这个角度没有该装饰
        {
          vec3Transform: [0.49, 3.8, 0.2],   //当前角度装饰的top, left ,width
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/kaluola_boutique/chexingpeijian/wzjp_front_4_c01A.png'),//当前角度的装饰图片
        }
      ]
    },
    {
      title: '行李箱装饰条    PZD38-02070',  //表达题名字
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/kaluola_boutique/chexingpeijian/wzjp_front_big_3.jpg'), //装饰缩略图
      status: false,//是否显示装饰
      angle: [ //角度的装饰
        false,
        false, //falsh代码这个角度没有该装饰
        {
          vec3Transform: [1.82, 5.15, 0.9],   //当前角度装饰的top, left ,width
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/kaluola_boutique/chexingpeijian/wzjp_front_3_c01.png'),//当前角度的装饰图片
        }
      ]
    },
    {
      title: '车窗侧挡雨板    PZD33-02030',  //表达题名字
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/kaluola_boutique/chexingpeijian/wzjp_front_big_2.jpg'), //装饰缩略图
      status: false,//是否显示装饰
      angle: [ //角度的装饰
        false,//falsh代码这个角度没有该装饰
        {
          vec3Transform: [0.45, 3.96, 1.35],   //当前角度装饰的top, left ,width
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/kaluola_boutique/chexingpeijian/wzjp_Middle1_1.png'),//当前角度的装饰图片
        }, false
      ]
    }
  ],

  //--------------------------------------全新威驰--------------------------------------
  [
    {
      title: '前格栅装饰条    PZD39-0D030',  //表达题名字
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/weichi_boutique/chexingpeijian/wzjp_front_big_2.jpg'), //装饰缩略图
      status: false,//是否显示装饰
      angle: [ //角度的装饰
        false, //falsh代码这个角度没有该装饰
        {
          vec3Transform: [1.93, 0.8, 2.15],   //当前角度装饰的top, left ,width
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/weichi_boutique/chexingpeijian/xiantiao_img.png'),//当前角度的装饰图片
        },
        false
      ]
    },
    {
      title: '挡泥板    PZD44-0D020',  //表达题名字
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/weichi_boutique/chexingpeijian/wzjp_front_big_4.jpg'), //装饰缩略图
      status: false,//是否显示装饰
      angle: [ //角度的装饰
        false,
        false, //falsh代码这个角度没有该装饰
        {
          vec3Transform: [2.9, 2.8, 0.4],   //当前角度装饰的top, left ,width
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/weichi_boutique/chexingpeijian/dangnib_img.png'),//当前角度的装饰图片
        }
      ]
    },
    {
      title: '门把手装饰条    PZD38-0D020',  //表达题名字
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/weichi_boutique/chexingpeijian/wzjp_front_big_5.jpg'), //装饰缩略图
      status: false,//是否显示装饰
      angle: [ //角度的装饰
        false, //falsh代码这个角度没有该装饰
        {
          vec3Transform: [1.68, 5.05, 0.7],   //当前角度装饰的top, left ,width
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/weichi_boutique/chexingpeijian/wzjp_front_5_b01.png'),//当前角度的装饰图片
        },
        {
          vec3Transform: [1.83, 1.09, 1.1],   //当前角度装饰的top, left ,width
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/weichi_boutique/chexingpeijian/wzjp_front_5_c01.png'),//当前角度的装饰图片
        }
      ]
    },
    {
      title: '后门装饰条    PZD38-0D009',  //表达题名字
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/weichi_boutique/chexingpeijian/wzjp_front_big_6.jpg'), //装饰缩略图
      status: false,//是否显示装饰
      angle: [ //角度的装饰
        false,
        false, //falsh代码这个角度没有该装饰
        {
          vec3Transform: [1.75, 4.23, 1.65],   //当前角度装饰的top, left ,width
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/weichi_boutique/chexingpeijian/wzjp_front_6_c01.png'),//当前角度的装饰图片
        }
      ]
    }
  ],
  //--------------------------------------威驰--------------------------------------
  [
    {
      title: '挡泥板    PZD44-0D030',  //表达题名字
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/vios_fs/chexingpeijian/voisfs-img1.jpg'), //装饰缩略图
      status: false,//是否显示装饰
      angle: [ //角度的装饰
        false,
        false, //falsh代码这个角度没有该装饰
        {
          vec3Transform: [1.66, 0.67, 3.3],   //当前角度装饰的top, left ,width
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/vios_fs/chexingpeijian/wzjp_front_4_c01.png'),//当前角度的装饰图片
        }
      ]
    },
    {
      title: '前格栅装饰条    PZD39-0D031',  //表达题名字
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/vios_fs/chexingpeijian/voisfs-img3.jpg'), //装饰缩略图
      status: false,//是否显示装饰
      angle: [ //角度的装饰
        {
          vec3Transform: [1.73, 1.3, 3.65],   //当前角度装饰的top, left ,width
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/vios_fs/chexingpeijian/qiannl.png'),//当前角度的装饰图片
        }, //falsh代码这个角度没有该装饰
        {
          vec3Transform: [1.79, 1.1, 0.65],   //当前角度装饰的top, left ,width
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/vios_fs/chexingpeijian/wzjp_front_3_b01.png'),//当前角度的装饰图片
        },
        false
      ]
    },
    {
      title: '门把手贴 PZD38-0D020',  //表达题名字
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/vios_fs/chexingpeijian/voisfs-img2.jpg'), //装饰缩略图
      status: false,//是否显示装饰
      angle: [ //角度的装饰
        false, //falsh代码这个角度没有该装饰
        {
          vec3Transform: [1.04, 4.59, 1.05],   //当前角度装饰的top, left ,width
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/vios_fs/chexingpeijian/wzjp_front_5_c01.png'),//当前角度的装饰图片
        },
        false
      ]
    }/*,
    {
      title: '迎宾踏板    PZD64-0D050',  //表达题名字
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/vios_fs/chexingpeijian/12951798.png'), //装饰缩略图
      status: false,//是否显示装饰
      angle: false
    }*/
  ],
  //--------------------------------普拉多----------------------------
  [
    {
      title: '专用车身装饰套件    PZD45-0P01F',  //表达题名字
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/puladuo_boutique/74510746.jpg'), //装饰缩略图
      status: false,//是否显示装饰
      angle: false
    },
    {
      title: '备胎罩彩贴(都市款)    PZD35-60071',  //表达题名字
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/puladuo_boutique/csct-ds.png'), //装饰缩略图
      status: false,//是否显示装饰
      angle: [ //角度的装饰
        {
          vec3Transform: [1.16, 2.64, 1.25],   //当前角度装饰的top, left ,width
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/puladuo_boutique/chexingpeijian/btct-ds-icon.png'),//当前角度的装饰图片
        },
        false,
        false
      ]
    },
    {
      title: '车身彩贴(都市款)    PZD35-60070',  //表达题名字
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/puladuo_boutique/btct-ds.png'), //装饰缩略图
      status: false,//是否显示装饰
      angle: [ //角度的装饰
        false,
        {
          vec3Transform: [0.85, 3.4, 2.3],   //当前角度装饰的top, left ,width
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/puladuo_boutique/chexingpeijian/csct-ds-icon2.png'),//当前角度的装饰图片
        }, //falsh代码这个角度没有该装饰
        {
          vec3Transform: [1.23, 0.3, 4.85],   //当前角度装饰的top, left ,width
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/puladuo_boutique/chexingpeijian/csct-yy-icon.png'),//当前角度的装饰图片
        }
      ]
    },
    {
      title: '备胎罩彩贴(越野款)    PZD35-60061',  //表达题名字
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/puladuo_boutique/csct-yy.png'), //装饰缩略图
      status: false,//是否显示装饰
      angle: [ //角度的装饰
        {
          vec3Transform: [1.16, 2.64, 1.25],   //当前角度装饰的top, left ,width
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/puladuo_boutique/chexingpeijian/btct-yy-icon.png'),//当前角度的装饰图片
        },
        false,
        false
      ]
    },
    {
      title: '车身彩贴(越野款)    PZD35-60060',  //表达题名字
      pic: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/puladuo_boutique/btct-yy.png'), //装饰缩略图
      status: false,//是否显示装饰
      angle: [ //角度的装饰
        false,
        {
          vec3Transform: [0.94, 3.4, 2.4],   //当前角度装饰的top, left ,width
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/puladuo_boutique/chexingpeijian/csct-yy-icon2.png'),//当前角度的装饰图片
        }, //falsh代码这个角度没有该装饰
        {
          vec3Transform: [1.23, 0.8, 4.85],   //当前角度装饰的top, left ,width
          decorate: require('./../../../assets/img/carSellHelp/purerav4/chexingimg/puladuo_boutique/chexingpeijian/csct-yy-icon.png'),//当前角度的装饰图片
        }
      ]
    }
  ]

]


//储存各个id。用来识别切换
let propsSearchnId = [
  //荣放
  {
    classify_id: 9,
    product_id: 159,
    arrt_id: 0,
    name: '荣放'
  },
  //卡罗拉
  {
    classify_id: 6,
    product_id: 245,
    arrt_id: 1,
    name: '卡罗拉'
  },
  //全新威驰
  {
    classify_id: 31,
    product_id: 160,
    arrt_id: 2,
    name: '威驰'
  },
  //威驰
  {
    classify_id: 8,
    product_id: 252,
    arrt_id: 3,
    name: '全新威驰'
  },
  //普拉多
  {
    classify_id: 11,
    product_id: 193,
    arrt_id: 4,
    name: '普拉多'
  }
]

class PureRAV4 extends Component {
  constructor(props) {
    super(props)
    const search = this.props.location.search;
    const params = querryStringToObject(search);
    let ids;
    //获取地址栏参数，得到数组中的第几个
    if (params.id) {
      for (let i = 0; i < propsSearchnId.length; i++) {
        if (propsSearchnId[i].classify_id == params.id) {
          ids = propsSearchnId[i].arrt_id
          break;
        }
      }
    } else {
      ids = 0
    }
    //console.log(ids)
    this.state = {
      produceType: 'outside',  //显示类型，外观装用品为 outside
      carType: ids,//此车型在数组中是第几个数组
      carName: propsSearchnId[ids].name,//车型名称
      current: 0,  //点击的配件第几个
      listMarginTop: 0,  //上下滑动的个数
      catPic: catArrt[ids][0], //require('./../../../assets/img/carSellHelp/purerav4/chexingimg/rav4_boutique/D180W.png'), //显示的汽车图片
      anglesIndex: 0,  //当前角度
      catArrts: catArrt[0],//汽车角度图片
      anglePic: [], //角度图片
      thisCurrent: [[], [], []],//当前显示状态储存
      dataRes: [],//接口数据储存
      abcderf: [1,2,3],
      decorateArrt: decorateArrt,//静态内容数组储存
      productDetail_RESDATA: {},
      infoPicVisible: false,
      allPrice: 0  //总价储存
    }
  }
  componentWillMount() {
    //接口内容
    carSellHelpInter.gitViewLoadingEffect(propsSearchnId[this.state.carType].product_id).then((res) => {
      if (res && res.code === '0') {
        //将接口内容和本地的内容合并
        let waizhuang;
        //找到外装精品这个栏目
        for (let i = 0; i < 4; i++) {
          //console.log(res.data.pureProductsList)
          if (res.data.pureProductsList[i].code === 'Exterior') {
            waizhuang = res.data.pureProductsList[i]
            for (let i = 0; i < waizhuang.list.length; i++) {
              decorateArrt[this.state.carType][i].title = waizhuang.list[i].name
              decorateArrt[this.state.carType][i].pic = waizhuang.list[i].thumb
              decorateArrt[this.state.carType][i].price = waizhuang.list[i].price || 0
              decorateArrt[this.state.carType][i].id = waizhuang.list[i].id
              console.log(decorateArrt[this.state.carType][i].price)
            }
            break
          }
        }
        //更新合并后的内容
        this.setState({
          dataRes: res.data.pureProductsList,
          decorateArrt: decorateArrt
        })
        console.log(this.state.decorateArrt)

        const search = this.props.location.search;
        const params = querryStringToObject(search);
        const peijian_id = params.peijian
        for(let i = 0; i<decorateArrt[this.state.carType].length; i++){
          //console.log(decorateArrt[this.state.carType][i].id)
          if(peijian_id === decorateArrt[this.state.carType][i].id){
            this.handleChecked(0,i,decorateArrt[this.state.carType][i].price)
            return;
          }
        }

      }
    })


  }

//切换用品分类
  handleSwitchType(type) {
    this.setState({
      produceType: type
    })
  }

  handleChecked(type, num, price,v) {
    // console.log(v.price)
    let thisCurrents = this.state.thisCurrent
    thisCurrents[type][num] = !thisCurrents[type][num]
    let prices = this.price(price, thisCurrents[type][num])
    //判断图片角度
    if (type === 0) {
      for (let i = 0; i < 3; i++) {
        if (this.state.decorateArrt[this.state.carType][num].angle[i]) {
          let decorateArrt = this.state.decorateArrt
          decorateArrt[this.state.carType][num].status = !this.state.decorateArrt[this.state.carType][num].status;
          let arrts = this.angleDecorate(i);
          this.setState({ // 更新数据
            anglesIndex: i,
            catPic: catArrt[this.state.carType][i],
            current: num,   //更新当前选中状态
            anglePic: arrts,
            thisCurrent: thisCurrents,
            allPrice: prices,
            decorateArrt: decorateArrt
          })
          break;
        }
      }
    }
    //更新数据
    this.setState({
      thisCurrent: thisCurrents,
      allPrice: prices
    })
  }

  //价格计算
  price(num, jia) {
    if (jia){
      return this.state.allPrice + parseInt(num.replace(/[^0-9]/ig,""))
    }
    else
      return parseInt(this.state.allPrice) - parseInt(num.replace(/[^0-9]/ig,""))
  }

//角度切换
  angleTab(i) {
    let arrts = this.angleDecorate(i);
    this.setState({
      anglesIndex: i,
      catPic: catArrt[this.state.carType][i],
      anglePic: arrts
    })
  }

//遍历装饰图片
  angleDecorate(angle) {
    let arrts = [];
    for (let i = 0; i < this.state.decorateArrt[this.state.carType].length; i++) {
      if (this.state.decorateArrt[this.state.carType][i].angle[angle] && this.state.decorateArrt[this.state.carType][i].status) {
        arrts[i] = this.state.decorateArrt[this.state.carType][i].angle[angle]
      }
    }
    return arrts
  }

//装饰列表向上滑动
  listTopSlide(num) {
    if (num >= 0.0) return;
    num = num + 5.2;
    this.setState({
      listMarginTop: parseFloat(num)
    })
  }
//装饰列表向下滑动
  listFootSlide(num) {
    let len = this.state.produceType === 'outside' ? 0 :
              this.state.produceType === 'inside' ? 1 :
                this.state.produceType === 'electronic' ? 2 : null
    let ind = 0;
    if(len === 0){
      ind = this.state.decorateArrt[this.state.carType].length
    }else{
      ind = this.state.dataRes[len].list.length
    }
    // console.log(`${num} < ${-ind/4*5.2}`)
    num = num - 5.2;
    if(num <= -ind/4*5.2 ){
      num = num + 5.2;
      return;
    }
    this.setState({
      listMarginTop: parseFloat(num)
    })
  }



  // 查看详情弹框
  infoPicOpenOrClose(id, classify) {
    if (Object.prototype.toString.call(id) !== '[object Object]') this.getDetailPureProducts(id)
    this.setState( (pre, props) => {
      return {
        infoPicVisible: !pre.infoPicVisible,
      }
    })
  }


  // 纯正用品：用品详情
  getDetailPureProducts(id) {
    carSellHelpInter.getDetailPureProducts(id).then( (res) => {
      if(res && res.code === '0') {
        this.setState({
          productDetail_RESDATA: res.data
        })
      }
    })
  }


  render() {
    const menu = (
      <Menu>
        <Menu.Item key="9">
          <a href="?id=9">RAV4 荣放</a>
        </Menu.Item>
        <Menu.Item key="6">
          <a href="?id=6">COROLLA 卡罗拉</a>
        </Menu.Item>
        <Menu.Item key="31">
          <a href="?id=31">VIOS 威驰</a>
        </Menu.Item>
        <Menu.Item key="8">
          <a href="?id=8">VIOS FS 威驰FS</a>
        </Menu.Item>
        <Menu.Item key="11">
          <a href="?id=11">PRADO 普拉多</a>
        </Menu.Item>
      </Menu>
    );
    const {produceType, current, listMarginTop, catPic, catArrt} = this.state
    return (
      <div className='handlePureRAV4'>
        <img src={require('../../../assets/img/carSellHelp/purerav4/bg_mm1_02.jpg')}/>
        <div className='PureRAV4'>
          <div className='name-total'>
            <Dropdown overlay={menu} trigger={['click']} overlayClassName='PureRAV4Drop'>
              <a className="ant-dropdown-link">
                {this.state.carName}<Icon type="down"/>
              </a>
            </Dropdown>
            {/* <h2>总计：<strong>￥{this.state.allPrice}</strong></h2> */}
          </div>
          <div className='content'>
            <ul className='typeNav'>

              <li onClick={this.handleSwitchType.bind(this, 'outside')}
                  className={classNames({'sel-type': produceType === 'outside'})}>外装类
              </li>

              <li onClick={this.handleSwitchType.bind(this, 'inside')}
                  className={classNames({'sel-type': produceType === 'inside'})}>内装类
              </li>
              <li onClick={this.handleSwitchType.bind(this, 'electronic')}
                  className={classNames({'sel-type': produceType === 'electronic'})}>电子类
              </li>

              <li onClick={()=>{window.location.href="/carSellHelp/genuineProduct"}}
                  className={classNames({'sel-type': produceType === 'other'})}>通用类
              </li>


            </ul>
            <div className='decorate'>
              <img src={catPic} alt=""/>
              <div>
                {
                  this.state.anglePic.length !== 0 ?
                    this.state.anglePic.map((v, i) => {
                      return <img src={v.decorate} style={{
                        top: v.vec3Transform[0] + 'rem',
                        left: v.vec3Transform[1] + 'rem',
                        width: v.vec3Transform[2] + 'rem'
                      }} alt='' key={i}/>
                    })
                    : ''
                }
              </div>
            </div>
            <div className='angles'>
              <span onClick={this.angleTab.bind(this, 0)} className='a0'> </span>
              <span onClick={this.angleTab.bind(this, 1)} className='a180'> </span>
              <span onClick={this.angleTab.bind(this, 2)} className='a360'> </span>
            </div>
            <span className='produceList'>
              <i onClick={this.listTopSlide.bind(this, listMarginTop)}><Icon type="up"/></i>
              <ul>
                {
                  produceType === 'outside' ?
                    <Fragment>
                      {
                        this.state.decorateArrt[this.state.carType].map((v, i) => {
                          return <li key={i}
                                     className={this.state.thisCurrent[0][i] ? 'showBorder' : ''}
                                     style={{marginTop: i === 0 ? listMarginTop + 'rem' : null}}
                          >
                            <img src={v.pic} alt=""
                                 onClick={this.handleChecked.bind(this, 0, i, v.price || 0 ,v)}/>

                            <span onClick={this.infoPicOpenOrClose.bind(this,v.id)}>查看详情</span>
                            <i>{v.title}</i>
                          </li>
                        })
                      }
                    </Fragment>
                    :
                    produceType === 'inside' ?
                      <Fragment>
                        {
                          this.state.dataRes[1].list.map((v, i) => {
                            return <li key={i}
                                       className={this.state.thisCurrent[1][i] ? 'showBorder' : ''}>
                              <img src={v.thumb} alt="" onClick={this.handleChecked.bind(this, 1, i, v.price,v)}/>
                              <i>{v.name}</i>
                              <span onClick={this.infoPicOpenOrClose.bind(this,v.id)}>查看详情</span>
                            </li>
                          })
                        }
                      </Fragment>
                      :
                      produceType === 'electronic' ?
                        <Fragment>
                          {
                            this.state.dataRes[2].list.map((v, i) => {
                              return <li key={i} className={this.state.thisCurrent[2][i] ? 'showBorder' : ''}>
                                <img src={v.thumb} alt="" onClick={this.handleChecked.bind(this, 2, i, v.price,v)}/>
                                <i>{v.name}</i>
                                <span onClick={this.infoPicOpenOrClose.bind(this,v.id)}>查看详情</span>
                              </li>
                            })
                          }
                        </Fragment>
                        :
                        null
                }
              </ul>
              <i onClick={this.listFootSlide.bind(this, listMarginTop)}><Icon type="down"/></i>
            </span>
          </div>
        </div>
        <Modal
          className = 'infoPicModal'
          title=""
          visible={this.state.infoPicVisible}
          onCancel={this.infoPicOpenOrClose.bind(this)}
          footer = {null}
        >
          <div className = 'picture'>
            <img src={this.state.productDetail_RESDATA.thumb} alt=""/>
          </div>
          {/* <h2>{this.state.productDetail_RESDATA.name}<span>建议零售价：<i>{this.state.productDetail_RESDATA.price}</i></span></h2> */}
          <h2 className="msgBox">
            <div className="msgName">{this.state.productDetail_RESDATA.name}</div>
            <div className="msgMuch">建议零售价：<i>请咨询当地经销商</i></div>
          </h2>
          <div className="magCarName">适用车型：<span>{this.state.productDetail_RESDATA.carName}</span></div>
          <p>{this.state.productDetail_RESDATA.description}</p>
        </Modal>
      </div>

    )
  }
}

export default PureRAV4
