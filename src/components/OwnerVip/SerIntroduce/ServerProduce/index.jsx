import React, { Component } from 'react'
import classNames from 'classnames'
import FixedGuarantee from './FixedGuarantee';
import PutoffServer from './PutoffServer';
import PutoffCom from './PutoffCom'
import './index.less'

class ServerProduce extends Component {
  constructor(props) {
    super(props)
    this.state={
      ServerProduceOption:'FIXED'
    }  
  }
  handleSwitch(option){
    this.setState({
      ServerProduceOption: option
    })
  }
  
  render() {
    const {ServerProduceOption}=this.state
    let ServerProduceContent; 
    if(ServerProduceOption==='PUTOFF'){
      ServerProduceContent = <PutoffServer/>
    }else if(ServerProduceOption==='PUTCOM'){
      ServerProduceContent = <PutoffCom/>
    }else {
      ServerProduceContent = <FixedGuarantee/>
    }
    return (
      <div className='handleServerProduce'>
        <ul className='ServerProduceNav'>
          <li onClick={() => this.handleSwitch('FIXED')} className={classNames({'sel-option-type':ServerProduceOption === 'FIXED'})}>定保通</li>
          <li onClick={() => this.handleSwitch('PUTOFF')} className={classNames({'sel-option-type':ServerProduceOption === 'PUTOFF'})}>延保服务</li>
          <li onClick={() => this.handleSwitch('PUTCOM')} className={classNames({'sel-option-type':ServerProduceOption === 'PUTCOM'})}>延保计算器</li>
        </ul>
        {
          ServerProduceContent
        }
      </div>
    )
  }
}

export default ServerProduce