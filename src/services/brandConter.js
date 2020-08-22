import { HTTPGet, HTTPPost, HTTPPut } from '../utils/http'
export const brandConter = {
  // ===================================================== 品牌车型 ==============================================================
  // 品牌中心
  // 企业历程
  companyHistory: (params) => {
    return HTTPPost(`/website/api/companyHistory`, params);
  },
  //活动中心：活动列表
 activitiesList: (page,row,type,component) => {
    return HTTPGet(`/website/Activity/getActivities/page/${page}/row/${row}/type/${type}`);
  },
  //活动中心：活动详情
  ActivitiesContent: (id) => {
    return HTTPGet(`/website/Activity/getDetail/id/${id}`);
  },
  //企业新闻：新闻展示列表
  newsList: (page,row) => {
    return HTTPGet(`/website/News/newsList?page=${page}&row=${row}`);
  },
  //企业新闻：新闻详情
  newsDetail: (id) => {
    return HTTPGet(`/website/News/newsDetail?id=${id}`);
  },
  //粉丝互动：丰巢世界：热门话题列表
  getHotTopic: () => {
    return HTTPGet(`/website/FengChao/getHotTopic`);
  },
  //粉丝互动：丰巢世界：帖子列表
  getPostList: (dir,page) => {
    return HTTPGet(`/website/FengChao/getPostList?dir=${dir}&page=${page}`);
  },
  //粉丝互动：丰巢世界：帖子详情
  getPostDetail: (id) => {
    return HTTPGet(`/website/FengChao/getPostDetail?id=${id}`);
  },
  //粉丝互动：丰巢世界：评论列表
  getRemarkList: (id,page) => {
    return HTTPGet(`/website/FengChao/getRemarkList?id=${id}&page=${page}`);
  },
  //粉丝互动：丰巢世界：个人中心
  getPersonInfo: (id,page) => {
    return HTTPGet(`/website/FengChao/getPersonInfo?id=${id}&page=${page}`);
  },
  //粉丝互动：精彩推荐：文章列表
  getList: (data) => {
    return HTTPPost(`/website/FansArticle/getList`,data);
  },
  //粉丝互动：精彩推荐：文章详情
  getDetail: (data) => {
    return HTTPPost(`/website/FansArticle/getDetail`, data);
  },
  //粉丝互动：文章详情：收藏文章
  collect: (data) => {
    return HTTPPost(`/website/FansArticle/collect`,data);
  },
  //精彩互动：视频专区：收藏视频
  collectVideo: (data) => {
    return HTTPPost(`/website/FansArticle/collectVideo`,data);
  },
  //精彩互动：视频专区：分享、查看视频数
  readVideo: (data) => {
    return HTTPPost(`/website/FansArticle/readVideo`, data);
  }
};
