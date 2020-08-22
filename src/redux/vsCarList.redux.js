
const ADD = 'ADD'
const DEL = 'DEL'
const FIX = 'FIX'
const DELALL = 'DELALL'
const GETALL = 'GETALL'
const initState = {
  vsCarListInfo: [
    // carImage: "http://homesite.ftms.devbmsoft.cn/Public/Uploads/Picture/images/2019/03/118359325131333226673684116314.jpg" 获取dom强行获取的数据
    // carPrice: "价格¥254800 ～ 价格¥ 381800" 获取dom强行获取的数据
    // carTitle: "CROWN 皇冠" 获取dom强行获取的数据
    // cartype: "CROWN 皇冠"  获取dom强行获取的数据
    // cid: "30"
    // id: "7"
    // name: "2.0T<sup>+</sup>"
    // price: "254800"
    // shop_price: "264800"
    // version: "先锋版"
  ]
}


export function compare(state = initState, action) {
    switch (action.type) {
        case ADD:
            if(action.param) state.vsCarListInfo.push(action.param);
            localStorage.setItem('carVSBOX', JSON.stringify(state))
            return state
        case DEL:
            console.log('index is ',action.param);
            if(action.param || action.param === 0) state.vsCarListInfo.splice(action.param, 1);
            console.log(state)
            localStorage.setItem('carVSBOX', JSON.stringify(state))
            return state
        case FIX:
            console.log('index is ',action.param);
            if(action.param) {
              state.vsCarListInfo[action.param.ind].cid = action.param.v.split('*')[0]
              state.vsCarListInfo[action.param.ind].id = action.param.v.split('*')[1]
              state.vsCarListInfo[action.param.ind].name = action.param.v.split('*')[2]
              state.vsCarListInfo[action.param.ind].price = action.param.v.split('*')[3]
              state.vsCarListInfo[action.param.ind].shop_price = action.param.v.split('*')[4]
              state.vsCarListInfo[action.param.ind].version = action.param.v.split('*')[5]
            }
            console.log(state)
            localStorage.setItem('carVSBOX', JSON.stringify(state))
            return state
        case DELALL:
            state.vsCarListInfo = [];
            localStorage.setItem('carVSBOX', JSON.stringify(state))
            return state
        case GETALL:
            state = localStorage.getItem('carVSBOX')? JSON.parse(localStorage.getItem('carVSBOX')) : state
            return state
        default:
            state = localStorage.getItem('carVSBOX')? JSON.parse(localStorage.getItem('carVSBOX')) : state
            return state
    }
}

export const add = (data) => {
  return { type: ADD, param: data}
}
export const del = (data) => {
  return { type: DEL, param: data}
}
export const fix = (data) => {
    return { type: FIX, param: data}
}
export const delAll = () => {
  return { type: DELALL}
}
export const getAll = () => {
  return (dispatch, getState) => {
      return getState()['compare']
  }
}