import { HTTPGet, HTTPPost, HTTPPut } from '../utils/http'
const pix = '/api';

export const headerApi = {
  // ===================================================== 首页接口 ==============================================================
  // 全局搜索
  search: (params) => {
    return HTTPPost(`/website/api/search`, params);
  },
  // 预约试驾：带入信息
  getTestDriveInfo: (params) => {
    return HTTPPost(`/website/TestDrive/getTestDriveInfo`, params);
  },
  // 预约试驾：立即预约
  addTestDrive: (params) => {
    return HTTPPost(`/website/TestDrive/addTestDrive`, params);
  },
  // 广告位置
  getAdvertisement: () => {
    return HTTPGet(`/website/Tender/getAdvertisement/position/pc`);
  },
};
export const footerApi = {
  // ===================================================== 尾页接口 ==============================================================
  // 友情链接列表
  getLinkList: () => {
    return HTTPGet(`/website/Link/getLinkList`);
  },
  // 招标广告列表
  getTenderList: (params) => {
    return HTTPGet(`/website/Tender/tenderList?page=${params.page}&row=${params.row}`);
  },
  // 招标广告列表
  getTenderdetail: (bid) => {
    return HTTPGet(`/website/Tender/detail?bid=${bid}`);
  },
};
export const loginApi = {
  // ===================================================== 登录注册接口 ==============================================================
  // 获取图形验证码
  getImageCode: () => {
    return HTTPGet(`/website/api/getImageCode`);
  },
  // getImageCode: () => {
  //   let codekey = ''
  //   return fetch(`/website${pix}/getImageCode`).then(res => {
  //     codekey = res.headers.get('codekey')
  //     return res.json()
  //   }).then(data => {
  //     return {...data, codekey}
  //   })
  // },
  // 验证图形验证码
  checkImageCode: (params) => {
    return HTTPGet(`/website/api/checkImageCode`, params);
  },
  // 发短信验证码
  sendMobileCode: (params) => {
    return HTTPPost(`/website/api/sendMobileCode`, params);
  },
  // 快捷登录
  mobileLogin: (params) => {
    return HTTPPost(`/website/api/mobileLogin`, params);
  },
  // 账号登录
  userNameLogin: (params) => {
    return HTTPPost(`/website/api/userNameLogin`, params);
  },
  // 注册
  register: (params) => {
    return HTTPPost(`/website/api/register`, params);
  },
  // 忘记密码参数校验接口
  findPasswordCheck: (params) => {
    return HTTPPost(`/website/api/findPasswordCheck`, params);
  },
  // 忘记密码
  findPassword: (params) => {
    return HTTPPost(`/website/api/findPassword`, params);
  },
  // 退出登录
  logout: (params) => {
    return HTTPPost(`/website/api/logout`, params);
  },
  getUserInfo: (token) => {
    return HTTPGet(`/website/api/userInfo`)
  }
};
export const publicApi = {
  // ===================================================== 公共接口 ==============================================================
  // 下拉框省份列表
  getProvince: () => {
    return HTTPGet(`/website/Maintenance/getProvince`);
  },
  // 下拉框城市列表
  getCity: (provinceId) => {
    return HTTPGet(`/website/Maintenance/getCity?cid=${provinceId}`);
  },
  // 下拉框经销商列表
  getDealer: (cityId) => {
    return HTTPGet(`/website/Maintenance/getDealer?cid=${cityId}`);
  },
  // 经销商查询
  searchDealer: (params) => {
    return HTTPPost(`/website/Dealer/getDealer`, params);
  },

  // 经销商查询_预约保养_预约维修
  searchDealer_a: (params) => {
    return HTTPGet(`/website/Dealer/getDealer?${params}`);
  },
  // 抽奖活动是否开始
  luckyDrawHasOrNot: (params) => {
    return HTTPGet(`/website/api/getIsActiviting/yzl_activity_time`);
  }
};
