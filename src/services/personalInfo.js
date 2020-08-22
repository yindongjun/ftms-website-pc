import { HTTPGet, HTTPPost, HTTPPut } from '../utils/http'
export const personalInfo = {
    //个人中心
    //卡券列表
    cardList: (params) => {//
        return HTTPPost (`/website/api/cardList`, params);
    },
    //上传头像
    uploadMemberLogo: (params) => {//
        return HTTPPost (`/website/User/changeThumb`, params);
    },
    //获取订单列表
    orderList: (params) => {
        return HTTPPost (`/website/api/orderList`, params);
    },
    //获取订单详情
    ordrDetail: (orderNo) => {
        return HTTPGet(`/website/api/orderDetail/${orderNo}`);
    },
    //新增订单评价
    insertAssessment: (params) => {
        return HTTPPost(`/website/api/insertAssessment`, params);
    },
    //查询核销码
    couponInfo: (params) => {
        return HTTPPost('/api/coupon/info', params);
    },
    //取消订单
    cancelOrder: (params) => {
        return HTTPPost(`/website/api/cancelOrder`, params);
    },
    //申请退款
    refundApply: (params) => {
        return HTTPPost(`/website/api/refund/apply`, params);
    },
    //取消退款
    refundCancel: (params) => {
        return HTTPPost(`/website/api/refund/cancel`, params);
    },
    //退款详情
    refundDetail: (params) => {
        return HTTPPost(`/website/api/refund/detail`, params);
    },
    //提交银行卡信息
    insertBankCard: (params) => {
        return HTTPPost(`/website/api/insert/bankCard`, params);
    },
    //用户基本信息
    userInfo: () => {//
        return HTTPGet(`/website/api/userInfo`);
    },
    //会员信息修改
    updateUserInfo: (params) => {//
        return HTTPPost(`/website/api/updateUserInfo`, params);
    },
    //我的足记
    personalFootPrint: (params) => {//
        return HTTPPost(`/website/api/personalFootPrint`, params);
    },
    //修改密码
    updatePassword: (params) => {
        return HTTPPost(`/website/api/updatePassword`, params);
    },
    //设置密码
    updateFcUserPassword: (params) => {
        return HTTPPost(`/website/api/updateFcUserPassword`,params);
    },
    //更换个人手机号
    updateMobile: (params) => {
        return HTTPPost(`/website/api/updateMobile`, params);
    },
    //预约试驾列表
    queryDriveList: (params) => {//
        return HTTPPost(`/website/api/queryDriveList`, params);
    },
    //取消试驾预约
    updateSubscribeStatus: (id) => {//
        return HTTPGet(`/website/api/updateSubscribeStatus/${id}`);
    },
    //预约保养、维修列表
    queryMainTainList: (params) => {//
        return HTTPPost(`/website/api/queryMainTainList` ,params);
    },
    //预约保养or维修取消
    updateServiceStatus: (id) => {//
        return HTTPGet(`/website/api/updateServiceStatus/${id}`);
    },
    //爱车列表
    loveCarList: () => {
        return HTTPGet(`/website/api/loveCarList`);
    },
    //积分展示
    scoreList: () => {
        return HTTPGet(`/website/api/scoreList`);
    },
    //获取积分数
    getFcUserMemberScore: (params) => {//
        return HTTPPost(`/website/api/getFcUserMemberScore`, params);
    },
    //添加爱车
    bindCar: (params) => {
        return HTTPGet(`/website/Vehicle/bindCar`,params);
    },
    carInfo: (carCode,mobile) => {
        return HTTPGet(`/website/Vehicle/carInfo?carCode=${carCode}&mobile=${mobile}`);
    },
    //修改爱车
    updateCar: (params) => {
        return HTTPPost(`/website/api/updateCarInfo`,params);
    }
}