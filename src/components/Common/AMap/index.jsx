import React, { PureComponent } from 'react';
import { Map,Marker } from 'react-amap';
import { locUtil } from '@/utils/util'
import { Spin } from 'antd';
import './index.less'

class AMapBox extends PureComponent{
	constructor(props){
		super(props)
		this.state = {
			// spinFlag:true
		}
		//map地图对象
		this.mapInstance = '';      
		// map的事件监听
		this.events = {
			created: (map) => {
				map.setMapStyle('amap://styles/whitesmoke');
				this.mapInstance = map;
				this.props.mapInstance(this.mapInstance);
				this.location();
			},
			click:() => {}
		};
		// marker的时间监听
		this.distributorEvents = {
			created:(marker) => {
				this.mapInstance.setFitView();
			},
		}
	}
	render() {
		return (
			// <Spin spinning={this.state.spinFlag}>
				<Map version={'1.4.2'} events={this.events} amapkey={'34e05aa7e2bada6d26b6d5571521ce9d'}>
					{this.distributorMarkers(this.props.distributorList)}
				</Map>
			// </Spin>
		)
	}
	location = () => {
		locUtil().then(res=>{
			console.log(res)
		});
	}
	distributorMarkers = (distributorList) => {
		if(distributorList !== ''){
			var distributorArea = [];
			for(var i=0;i<distributorList.length;i++) {
				distributorArea.push(
					<Marker key={i} 
						// offset={{x:-37,y:-37}}
						position={{longitude: distributorList[i].lng, latitude: distributorList[i].lat}} 
						events={this.distributorEvents}
					/>
				)
			}
			return (distributorArea)
		}
	}
}
export default AMapBox