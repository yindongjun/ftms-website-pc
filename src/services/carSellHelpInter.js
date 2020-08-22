import { HTTPGet, HTTPPost, HTTPPut } from '../utils/http'
export const carSellHelpInter = {
  // ===================================================== 品牌车型 ==============================================================
  // 品牌车型：加入对比
  VehicleAttributeVS: (arr) => { // modelIds 车型ID，数组格式[105,120,108]
    return HTTPGet(`/website/Vehicle/attribute?modelIds=${arr}`);
  },
  // 品牌车型：车型详情 (差一个车logo)
  getCarDetailInfo: (aliasName) => {
    return HTTPGet(`/website/api/getCarDetailInfo/${aliasName}`);
  },
  // 品牌车型：车型详情：更多车型
  getMoreCars: (aliasName) => {
    return HTTPGet(`/website/Car/getMoreCars/alias/${aliasName}`);
  },
  // 品牌车型：车型展示列表
  brandModelsList: () => {
    return HTTPGet(`/website/Car/brandModels`);
  },
  // 品牌车型：获取车型的价格和版本
  getVersion: (cid) => {
    return HTTPGet(`/website/Car/getVersion/cid/${cid}`);
  },
  // ===================================================== 纯正用品 ==============================================================
  // 纯正用品：用品分类
  gitViewLoadingEffect: (id) => {
    return HTTPGet(`/website/PureProducts/viewLoadingEffect/id/${id}`);
  },
  getClassifyPureProducts: () => {
    return HTTPGet(`/website/PureProducts/getClassify`);
  },
  // 纯正用品：用品列表  (调整中)
  getListPureProducts: (data) => {
    return HTTPPost(`/website/PureProducts/getList`, data);
  },
  // 纯正用品：用品详情
  getDetailPureProducts: (id) => {
    return HTTPGet(`/website/PureProducts/getDetail/id/${id}`);
  },
  // 纯正用品：我要咨询-提交
  consult: (data) => {
    return HTTPPost(`/website/PureProducts/consult`, data);
  },
  // 纯正用品：我要咨询：带入信息
  getUserInfoPureProducts: (data) => {
    return HTTPPost(`/website/PureProducts/getUserInfo/id/accessToken`, data);
  },
  // ===================================================== 下载中心 ==============================================================
  // 保存下载记录 (成功之后的提示语 是 查询成功 是否需要改正？)
  insertDownLoadRecord: (data) => {
    return HTTPPost(`/website/api/insertDownLoadRecord`, data);
  },
  // 下载中心：获取壁纸
  getWallpaper: (cid) => {
    return HTTPGet(`/website/api/getWallpaper/${cid}`);
  },
  // ===================================================== 金融服务 ==============================================================
  // 金融服务 融资租赁：促销活动列表 0金融促销活动，1融资租赁促销活动
  getFinanceActiveList: (type) => {
    return HTTPGet(`/website/api/getFinanceActiveList/${type}`);
  },
  // 金融服务：车型列表
  financeVehicleList: () => {
    return HTTPGet(`/website/api/financeVehicleList`);
  },
  // 金融服务：车型配置和价格
  VehicleVersionList: (cid) => {
    return HTTPGet(`/website/api/vehicleVersionList/${cid}`);
  },
  // 金融服务：获取金融机构
  financeOrganList: (cid) => {
    return HTTPGet(`/website/api/financeOrganList/${cid}`);
  },
  // 金融服务：获取产品类型
  financeProductTypeList: (versionid, organId) => {
    return HTTPGet(`/website/api/financeProductTypeList/${versionid}/${organId}`);
  },
  // 金融服务：获取产品列表
  financeProductList: (typeId, organId, versionId) => {
    return HTTPGet(`/website/api/financeProductList/${typeId}/${organId}/${versionId}`);
  },
  // 金融服务：产品详情
  financeProductDetail: (productId, versionId) => {
    return HTTPGet(`/website/api/financeProductDetail/${productId}/${versionId}`);
  },
  // 金融服务：生成方案
  financeProgram: (data) => {
    return HTTPPost(`/website/api/financeProgram`, data);
  },
  // ===================================================== 新车保险 ==============================================================
  // 新车保险、延保促销活动列表 促销活动分类type 0新车保险，1延保服务
  getInsuranceActiveList: (type) => {
    return HTTPGet(`/website/api/getInsuranceActiveList/${type}`);
  },
  // ===================================================== 融资租赁 ==============================================================
  // 融资租赁：易租贷计算器--丰田租赁
  toyotaLease: (data) => {
    return HTTPPost(`/website/api/toyotaLease`, data);
  },
  // 融资租赁：易租贷计算器--一汽租赁
  fawLease: (data) => {
    return HTTPPost(`/website/api/fawLease`, data);
  },
  // 融资租赁：易租贷计算器--易鑫租赁
  yiXinLease: (data) => {
    return HTTPPost(`/website/api/yiXinLease`, data);
  },
  // 融资租赁：易租贷计算器--获取租赁配置信息 code值为：丰田租赁：toyota_lease 一汽租赁：faw_lease
  getLeaseConfig: (code) => {
    return HTTPGet(`/website/api/getLeaseConfig/${code}`);
  },
  //零件溯源
  searchdetail: (data) => {
    return HTTPPost(`/website/Pures/searchDetail`, data);
  }
};
