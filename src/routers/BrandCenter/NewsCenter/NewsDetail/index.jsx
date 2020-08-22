import React, {Component} from 'react'
import './index.less'
import { querryStringToObject } from '../../../../utils/util'
import { brandConter } from '../../../../services/brandConter'

class NewsDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      content: {}
    }
  }
  componentDidMount () {
    this.newsDetail();
  }
  newsDetail() {
    const search = this.props.location.search;
    const params = querryStringToObject(search);
    brandConter.newsDetail(params.id).then((res) => {
      if(res && res.code === '0') {
        this.setState({
          content: res.data
        })
      }
    })
  }
  render(){
    const { content } = this.state;
    return(
      <div className='handleNewsDetail'>
            <div className='NewsDetail'>
              <div className='title'>
                <h2>{content.title}</h2>
                <span>{content.addtime1}</span>
              </div>
              <div className='NewsDetailContent'>
                {/* <p>{content.description}</p> */}
                <p dangerouslySetInnerHTML={{ __html:content.content}}></p>
              </div>
            </div>
      </div>
    )
  }
}
export default NewsDetail