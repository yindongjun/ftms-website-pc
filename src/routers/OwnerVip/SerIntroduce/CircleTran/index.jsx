import React from 'react'
import './index.less'
import { querryStringToObject } from '../../../../utils/util'
import { carOwner } from '../../../../services/carOwner'
//杂志详情
class CircleTran extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      article: {},
      params:{}
    }
  }
  componentDidMount () {
    this.carDetail();
  }
  carDetail() {
    // const id = (id);
    const search = this.props.location.search;
    const params = querryStringToObject(search);
    this.setState({
      params:params
    })
    if(params.text=='wenzhang'){
      carOwner.carDetail(params.id).then((res) => {
        if(res && res.code === '0') {
          this.setState({
            article:res.data,
          })
        }
      })
    }else if(params.text=='zazhi'){
      carOwner.getMagazineDetail(params.id).then((res)=>{
        if(res && res.code === '0') {
          this.setState({
            article:res.data,
          })
        }
      })
    }
    
  }
  render() {
    const { article ,params} = this.state;
    return (
        <div className='handleCircleTran'>
          {
            params.text=='wenzhang' ? 
            <div>
                <div className='CircleTranTitle'>
                  <h2>{article.title}</h2>
                  <span>{article.addtime}</span>
                </div>
                <div className='CircleContent'>
                  <div dangerouslySetInnerHTML={{ __html:article.content}}>
                    {/* <h3>{article.description}</h3> */}
                  
                  </div>
                </div>
            </div>
            :
            <div>
              <div className='CircleTranTitle'>
                <h2>{article.title}</h2>
                <span>{article.createAt}</span>
              </div>
              <div className='CircleContent'>
                <div dangerouslySetInnerHTML={{ __html:article.content}}>
                  
                </div>
              </div>
            </div>
            
          }
        </div>
    )
  }
}
export default CircleTran