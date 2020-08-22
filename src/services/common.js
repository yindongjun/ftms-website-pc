import { HTTPGet, HTTPPost, HTTPPut } from '../utils/http'
export const common = {
  // ===================================================== 公共接口 ==============================================================
  //轮播图
  getSlideshow: (type) => {
    return HTTPGet(`/website/api/slideshow/${type}`);
  },
  //车型列表
  getVehicleList: (data) => {
    return HTTPGet(`/website/api/getExtentionCarType`);
  },
  //公共车型列表
  getVehicleList_com: (data) => {
    return HTTPGet(`/website/Maintenance/getVehicleList`);
  },
  //所有车型列表
  getAllVehicleList: () => {
    return HTTPGet(`/website/Maintenance/getAllVehicleList`);
  },
  //获取视频链接地址
  getVideoUrl: (type) => {
    return HTTPGet(`/website/api/getVideoUrl/${type}`);
  },
  //获取视频链接地址（分页展示）
  getVideoPage: (data) => {
    return HTTPPost(`/website/api/getVideoUrlByPaging`,data);
  },
};
