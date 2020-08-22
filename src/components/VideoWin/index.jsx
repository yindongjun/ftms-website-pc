import React,{Component} from 'react'
import './index.less'
// import {YKU} from '@/utils/jsapi'
class VideoWin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            vid:this.props.vid,
            vvid:''
        }
    }
    componentWillReceiveProps(props){
        console.log(props);
        if(props.vid){
            let str=props.vid;
            let a=str.indexOf('embed/');
            let vvid;
            if(str.indexOf('?')==-1){
                vvid=str.substring(a+6,str.length-1);
            }else{
                vvid=str.substring(a+6,str.indexOf('?'));
            }
            
            console.log(vvid)
            let YKU = window.YKU;
            let player = new YKU.Player(this.props.id,{
                styleid: '0',
                client_id: 'eb038334cbb62bb8',
                vid: vvid
            });
        }
        
    }
    componentDidMount(){
        if(this.props.vid){
            let str=this.props.vid;
            let a=str.indexOf('embed/');
            let vvid;
            if(str.indexOf('?')==-1){
                vvid=str.substring(a+6,str.length-1);
            }else{
                vvid=str.substring(a+6,str.indexOf('?'));
            }
            
            console.log(vvid)
            let YKU = window.YKU;
            let player = new YKU.Player(this.props.id,{
                styleid: '0',
                client_id: 'eb038334cbb62bb8',
                vid: vvid
            });
        }
    }


    render(){
        console.log(this.props)
        return(
            <div className="videoiframe" id={this.props.id}>
            </div>
        )
    }
}

export default VideoWin;
