import { HTTPGet, HTTPPost } from '../utils/http'
export const carOwner = {
  // ===================================================== 车主专享 ==============================================================
  // 服务介绍：服务产品：延保计算器
  extenInSur: (params) => {
    return HTTPPost(`/website/api/extentionCalculator`,params);
  },
  //服务大厅：获取保养计划车型列表
  getMaintainCarType: () => {
    return HTTPGet(`/website/api/getMaintainCarType`);
  },
  // 服务大厅：保养计划查询
  maintain: (params) => {
    return HTTPPost(`/website/api/maintainPlan`,params);
  },
  // 服务大厅：违章查询带入用户车架号
  getCarCode: () => {
    return HTTPGet(`/website/api/getCarCode`);
  },
  // 服务大厅：违章查询
  TrafficViolationsList: (params) => {
    return HTTPPost(`/website/api/TrafficViolationsList`,params);
  },
  // 服务活动：文章列表
  carList: (page,row) => {
    return HTTPGet(`/website/News/carList?page=${page}&row=${row}`);
  },
  // 服务活动：文章详情
  carDetail: (id) => {
    return HTTPGet(`/website/News/carDetail?id=${id}`);
  },
  // 纯牌零件：零件列表
  getList: (id) => {
    return HTTPGet(`/website/Component/getList/id/${id}`);
  },
  // 纯牌零件：零件详情
  getDetail: (id) => {
    return HTTPGet(`/website/Component/getDetail/id/${id}`);
  },
  // 纯牌零件：一级分类
  getFirstClassify: () => {
    return HTTPGet(`/website/Component/getFirstClassify`);
  },
  // 纯牌零件：二级分类
  getSecondClassify: (data) => {
    return HTTPPost(`/website/Component/getSecondClassify`,data);
  },
  // 丰享汇：最新活动列表
  CurActivityList: () => {
    return HTTPGet(`/website/api/CurActivityList`);
  },
  // 丰享汇：往期活动列表
  PastActivityList: (data) => {
    return HTTPPost(`/website/api/PastActivityList`,data);
  },
  // 丰享汇：活动详情
  ActivityDetail: (id) => {
    return HTTPGet(`/website/api/ActivityDetail/${id}`);
  },
  // 服务活动：杂志列表
  getMagazineList: (data) => {
    return HTTPPost(`/website/api/getMagazineList`,data);
  },
  // 服务活动：杂志详情
  getMagazineDetail: (magazineId) => {
    return HTTPGet(`/website/api/getMagazineDetail/${magazineId}`);
  },
  // 服务大厅：预约保养、预约维修获取用户登录信息与爱车信息
  getUserInfo: (accessToken) => {
    return HTTPPost(`/website/Maintenance/getUserInfo`,accessToken);
  },
  // 服务大厅：预约保养：发短信


  // 服务大厅：预约保养：立即预约
  addMaintenance: (data) => {
    return HTTPPost(`/website/Maintenance/addMaintenance`,data);
  },
  // 服务大厅：预约维修：立即预约
  repair: (data) => {
    return HTTPPost(`/website/Maintenance/repair`,data);
  },
  // 服务大厅：违章查询：省份简称列表（车牌号码）
  getProvinceBrief: (data) => {
    return HTTPGet('/website/api/getProvinceBrief');
  },
  // 丰享汇：车主入会列表
  getOwnerStory: (data) => {
    return HTTPGet('/website/News/getOwnerStory?type=story&page=1&row=10');
  },
  // 丰享汇：车主入会详情
  getOwnerStoryDetail: (id) => {
   return HTTPGet(`/website/News/getOwnerStoryDetail/id/${id}`)
  }
  






  
};
