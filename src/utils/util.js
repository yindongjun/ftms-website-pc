import { message } from 'antd';

export const translateParams = (params) => {
  let paramString = '';
  if (params) {
    const validParams = Object.keys(params).filter((key) => params[key]);
    // console.log(validParams)
    paramString = validParams.map((key) => {
      return key + '=' + encodeURIComponent(params[key]);
    }).join('&');
  }
  return paramString;
}

export const querryStringToObject = (str) => {
  const search = str.replace(/^\s+/, '').replace(/\s+$/, '').match(/([^?#]*)(#.*)?$/)
  if (!search) {
    return {}
  }
  const searchStr = search[1]
  const searchHash = searchStr.split('&')

  const ret = {}
  searchHash.forEach((pair) => {
    const temp = (pair.split('=', 1))[0]
    const key = decodeURIComponent(temp)
    let value = pair.substring(key.length + 1)
    if (value !== undefined) {
      value = decodeURIComponent(value)
    }
    if (key in ret) {
      if (ret[key].constructor !== Array) {
        ret[key] = [ret[key]]
      }
      ret[key].push(value)
    } else {
      ret[key] = value
    }
  })
  return ret;
}
export const locUtil = function(){
    return new Promise((resolve,reject)=>{
        const AMap = window.AMap;
        var geolocation = '';
        var currentLoca = [];
        var options = {
            'showButton': false,        //是否显示定位按钮
            'showMarker': false,        //是否显示定位点
        }
        AMap.plugin(['AMap.Geolocation'],function(){
            geolocation = new AMap.Geolocation(options);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete);    //返回定位信息
            AMap.event.addListener(geolocation, 'error', onError);          //返回定位出错信息
            //解析定位结果
            function onComplete(data) {
                currentLoca = [data.position.lng,data.position.lat];
                // sessionStorage.setItem('lnglat', JSON.stringify(currentLoca));
                // map.setZoomAndCenter(16,currentLoca);  //同时设置地图层级与中心点
                resolve({currentLoca});
            };
            //解析定位错误信息
            function onError(data) {
                message.warning('定位失败');
                reject();
            }
        })
    })
}