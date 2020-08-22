import React from 'react'
import classNames from 'classnames'
import ProtectCourse from './ProtectCourse';
import CarUseDoubt from './CarUseDoubt';
import './index.less'

class LikeCourse extends React.Component{
  constructor(props){
    super(props)
    this.state={
      CourseOption: 'COURSE'  // 爱车养护课堂  DOUBT 汽车使用答疑
    }
  }
  handleSwitch(option){
    this.setState({
      CourseOption: option
    })
  }
  render(){
    const {CourseOption}=this.state
    let showCoursePage;
    if(CourseOption==='COURSE'){
      showCoursePage = <ProtectCourse/>
    }else if(CourseOption==='DOUBT'){
      showCoursePage = <CarUseDoubt/>
    }
    return (
      <div className='handleLikeCourse'>
        <ul className='LikeCourseNav'>
          <li onClick={() => this.handleSwitch('COURSE')} className={classNames({'sel-option-type':CourseOption === 'COURSE'})}>爱车养护课堂</li>
          <li onClick={() => this.handleSwitch('DOUBT')} className={classNames({'sel-option-type':CourseOption === 'DOUBT'})}>汽车使用答疑</li>
        </ul>
        {
          showCoursePage
        }
      </div>
    )
  }
}
export default LikeCourse