import React, { Component } from 'react'
import FengchaoWorld from '../../../../components/OwnerVip/FengcahoWord'
import './index.less'

const NewsPage = [
  {
    character: [
      { textpage: '时间匆忙而过' },
      { textpage: '我们早已毕业' },
      { textpage: '但我们还是会常常想起那些可爱的老师' },
      { textpage: '是他们的教导和严厉才成就了今天的我们' },
      { textpage: '教师节，感谢师恩' },
      { textpage: '纯牌零件与您重温那段美好的回忆！'},
    ],
    img: 'pic-1.png'
  },
  {
    character: [
      { textpage: '你一定经常听到这样的话' },
      { textpage: '“整个楼层就我们班最吵”' },
      { textpage: '“你们是我教过最差的一届学生”' },
      { textpage: '“再努力努力，坚持到大学就自由了”' }
    ],
    img: 'pic-2.png'
  },
  {
    character: [
      { textpage: '你一定做过这样的事情' },
      { textpage: '“科目小测默写时在桌子里留个小抄”' },
      { textpage: '“在不喜欢的学科课上睡觉或者画画”' },
      { textpage: '“老师叫同学回答问题立马埋头看书”' }
    ],
    img: 'pic-3.png'
  },
  {
    character: [
      { textpage: '他很热心，喜欢管每件“闲”事' },
      { textpage: '他时常教导我们要做一个诚实的孩子' },
      { textpage: '他时常唠叨我们不努力以后怎么在社会立足' }
    ],
    img: 'pic-4.png'
  },
  {
    character: [
      { textpage: '有些话' },
      { textpage: '总是后知后觉' },
      { textpage: '有些人' },
      { textpage: '总是分开才会想念' },
      { textpage: '怀念熟悉的教师' },
      { textpage: '怀念那萦绕耳边的读书声和' },
      { textpage: '课间嘈杂的欢闹声' },
      { textpage: '以及沙沙作响的做题声......' }
    ],
    img: 'pic-5.png'
  },
  {
    character: [
      { textpage: '恩师在三尺讲台的敦敦教诲' },
      { textpage: '正如纯牌零件空调滤芯一样' },
      { textpage: '剔除糟粕，净化尘埃，给人以清晰，守护纯净空间' },
      { textpage: '也如纯牌机油一样' },
      { textpage: '油润内在，荡漾心灵，给人以丝滑畅快' },
      { textpage: '以防锈蚀灼心' },
      { textpage: '还如一汽丰田原厂轮胎一样' },
      { textpage: '一路呵护，防患于未然，给人以安心' },
      { textpage: '让人生的旅途变得坦荡' }
    ],
    img: 'pic-6.png'
  },
  {
    character: [
      { textpage: '人生这条路' },
      { textpage: '感谢恩师的保驾护航' },
      { textpage: '教会我们读万卷书' },
      { textpage: '以后就让' },
      { textpage: '一汽丰田原厂轮胎带着大家行万里路' },
      { textpage: '去阅尽人间百态，守护你的小确辛' }
    ],
    img: 'pic-6.png'
  }
]
class ThankTeacher extends Component {
  render() {
    return (
      <div className="handleThank">
          <div className="Thank-Teacher">
            <div className="thankheader">
              <h2>感谢师恩，纯牌零件与您重温美好</h2>
              <span>2018-09-10</span>
            </div>
            <div className="wordpage">
              {
                NewsPage.map((item, index) => {
                  return <div key={index}>
                    {
                      item.character.map((v, i) => {
                        return <p key={i}>{v.textpage}</p>
                      })
                    }
                    <img src={require(`../../../../assets/img/purebrand/news2/${item.img}`)} alt=""/>
                  </div>
                })
              }
            </div>
            <h3 className="adviseThank">爱他，就给他最纯·真的！</h3>
            <FengchaoWorld/>
          </div>
      </div>
    )
  }
}
export default ThankTeacher
