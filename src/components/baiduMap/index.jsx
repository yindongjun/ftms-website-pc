import React, { Component } from 'react';
 
class BaiduMap extends Component {
 
  componentDidMount() {

		// const { BMap, BMAP_STATUS_SUCCESS } = window

		// var map = new BMap.Map("allmap");          // 创建地图实例
		// var initLat = 36.916527;
		// var initLng = 116.397128;
		// var point = new BMap.Point(initLng, initLat);  // 创建点坐标  
		// map.centerAndZoom(point, 11);                 // 初始化地图，设置中心点坐标和地图级别  


		//  let mk = new BMap.Marker(point);        // 创建标注    
		//  //map.addOverlay(marker);                     // 将标注添加到地图中

		// map.enableScrollWheelZoom();                            // 启用滚轮放大缩小 
		// map.addControl(new BMap.NavigationControl());           // 启用放大缩小 尺
		
		// //获取当前位置
		// var geolocation = new BMap.Geolocation();  
		// geolocation.getCurrentPosition(function(r){  
		//     if(this.getStatus() == BMAP_STATUS_SUCCESS){  
		//         mk = new BMap.Marker(r.point);  
		//         mk.addEventListener("dragend", showInfo);
		//         mk.enableDragging();    //可拖拽
						
		//         getAddress(r.point);

		//         map.addOverlay(mk);//把点添加到地图上  
		//         map.panTo(r.point); 

		//     }else {  
		//         alert('failed'+this.getStatus());  
		//     }  
		// });
		
		// //绑定Marker的拖拽事件
		// function showInfo(e){
		//     var gc = new BMap.Geocoder();
		//     gc.getLocation(e.point, function(rs){
		//         var addComp = rs.addressComponents;
		//         var address = addComp.province +  addComp.city + addComp.district + addComp.street + addComp.streetNumber;//获取地址
						
		//         //画图 ---》显示地址信息
		//         var label = new BMap.Label(address,{offset:new BMap.Size(20,-10)});
		//         map.removeOverlay(mk.getLabel());//删除之前的label 

		//         mk.setLabel(label);
		//         //alert(e.point.lng + ", " + e.point.lat + ", "+address);
		//      });
		// }
		
		// //获取地址信息，设置地址label
		// function getAddress(point){
		//     var gc = new BMap.Geocoder();
				
		//     gc.getLocation(point, function(rs){
		//         var addComp = rs.addressComponents;
		//         var address =  addComp.province +  addComp.city + addComp.district + addComp.street + addComp.streetNumber;//获取地址
						
		//         //画图 ---》显示地址信息
		//         var label = new BMap.Label(address,{offset:new BMap.Size(20,-10)});
		//         map.removeOverlay(mk.getLabel());//删除之前的label 

		//         mk.setLabel(label);
						
		//      });
					
		// }
		


		// var map = new BMap.Map("allmap"); // 创建Map实例
		

		// var point = new BMap.Point(116.331398,39.897445);
		// map.centerAndZoom(point,12);

		// map.centerAndZoom(point,12);

		// function myFun(result){
		//     var cityName = result.name;
		//     console.info(result)
		//     map.setCenter(cityName);
		//     map.setCurrentCity(); // 设置地图显示的城市 此项是必须设置的
		// }
		// var myCity = new BMap.LocalCity();
		// myCity.get(myFun); 

		// var geolocation = new BMap.Geolocation();
		// geolocation.getCurrentPosition(function(r){
		//     if(this.getStatus() == BMAP_STATUS_SUCCESS){
		//         var mk = new BMap.Marker(r.point);
		//         map.addOverlay(mk);
		//         map.panTo(r.point);
		//         map.centerAndZoom(new BMap.Point(point.lng, point.lat), 11); // 初始化地图,设置中心点坐标和地图级别
		//         map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
						
		//         map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
		//     }
		//     else {
		//         alert('failed'+this.getStatus());
		//     }        
		// });
	}

  componentWillReceiveProps (nextProps) {

		console.log(nextProps)

		/**
		 * author: WangRenguang
		 * time: 2018-12-11
		 * 
		 */
		if(nextProps.identifying === 0) {
			const { BMap, BMAP_STATUS_SUCCESS } = window
			let { lng, lat, city, dealerList, zoom } = nextProps
			var map = new BMap.Map('allmap')  // 创建Map实例
            if (lng == null || lng == undefined || lng == '') {
                map.centerAndZoom(city, zoom)  // 地址显示位置
            } else {
                map.centerAndZoom(new BMap.Point(lng, lat), zoom)  // 经纬度显示位置
            }
			// 展示全部标点
			let mapArr = []
			dealerList.map((item, ind) => {
				var pointA = new BMap.Point(item.lng, item.lat)
				var marker = new BMap.Marker(pointA)  // 创建标注



				map.addOverlay(marker);
				mapArr.push([item.lng, item.lat, item.address, item.name, item.phone_seal, item.phone_service])
			})

			var opts = {
				width : 300,  // 信息窗口宽度
				// height: 150,  // 信息窗口高度
				// title : '信息窗口' ,  // 信息窗口标题
				enableMessage:true  //设置允许信息窗发送短息
			}

			for(var i = 0; i < mapArr.length; i++) {
				var marker = new BMap.Marker(new BMap.Point(mapArr[i][0], mapArr[i][1]))
				var content = `<h2 style="font-weight: bolder;">${mapArr[i][3]}</h2>
												<span style="font-size: 13px;display:block">
													<b style="display: inline-block; font-weight: normal; vertical-align: top">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</b>
													<i style="display: inline-block;width:2rem">${mapArr[i][2]}</i>
												</span><br/>
												<span style="font-size: 13px;display:block; margin-bottom: -15px">
													<b style="display: inline-block; font-weight: normal; vertical-align: top">销售热线：</b>
													<i style="display: inline-block;width:2rem">${mapArr[i][4]}</i>
												</span><br/>
												<span style="font-size: 13px;;display:block">
													<b style="display: inline-block; font-weight: normal; vertical-align: top">服务热线：</b>
													<i style="display: inline-block;width:2rem">${mapArr[i][5]}</i>
												</span><br/>`
				map.addOverlay(marker)
				var label = new BMap.Label(mapArr[i][3], { offset: new BMap.Size(20, -10) })
				marker.setLabel(label)
				addClickHandler(content, marker)


				var theSize
				if (i>8) {
					theSize = new BMap.Size(1, 4)
				} else {
					theSize = new BMap.Size(5, 4)
				}
				var label2 = new BMap.Label(i+1, {
					offset : theSize
				});
				label2.setStyle({
					background:'none',color:'#fff',border:'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
				});
				marker.setLabel(label2);//显示地理名称 a 
			}

			function addClickHandler(content, marker) {
				marker.addEventListener('click', function(e) {
					openInfo(content, e)
				})
			}

			function openInfo(content, e) {
				var p = e.target
				var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
				var infoWindow = new BMap.InfoWindow(content, opts)
				map.openInfoWindow(infoWindow, point)
			}

			map.enableScrollWheelZoom(true)  //开启鼠标滚轮缩放

			map.addControl(new BMap.ScaleControl())  // 距离
		}
		return false
	}

	render() {
		return (
			<div id="allmap" style={{ position: "absolute", top: 0, left: 0, width: '100%', height: '100%' }}></div>
		);
	}
}
export default BaiduMap;
