import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import { Menu, Dropdown, Icon } from 'antd'
import {headerApi, loginApi} from '../../../services/api';
import './index.less'
import {common} from "../../../services/common";
import {querryStringToObject} from "../../../utils/util";

const buryCar = (
    <Menu className="HeaderDropdown">
        <Menu.Item>
            <a className='focus1' target="_blank" rel="noopener noreferrer" href="/carSellHelp/CarDigiRoom">数字展厅</a>
        </Menu.Item>
        <Menu.Item>
            <a className='focus2' target="_self" rel="noopener noreferrer" href="/carSellHelp/carBrandModels">品牌车型</a>
        </Menu.Item>
        <Menu.Item>
            <a className='focus3' target="_self" rel="noopener noreferrer" href="/carSellHelp/genuineProduct">纯正用品</a>
        </Menu.Item>
        <Menu.Item>
            <a className='focus4' rel="noopener noreferrer" href="/carSellHelp/financialService">金融服务</a>
        </Menu.Item>
        <Menu.Item>
            <a className='focus5' rel="noopener noreferrer" href="/carSellHelp/financeLease">融资租赁</a>
        </Menu.Item>
        <Menu.Item>
            <a className='focus6' rel="noopener noreferrer" href="/carSellHelp/newCarInsurance/brandinsurance">新车保险</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.ft-ucar.com.cn/">安心二手车</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://mall.ftms.com.cn/">官方商城</a>
        </Menu.Item>
    </Menu>
)
const CarHoster = (
    <Menu className="HeaderDropdown">
        <Menu.Item>
            <a className='focus7' rel="noopener noreferrer" href="/ownervip/serintroduce/honestserver">服务介绍</a>
        </Menu.Item>
        <Menu.Item>
            <a className='focus8' rel="noopener noreferrer" href="/ownervip/serverhall/upkeepplan">服务大厅</a>
        </Menu.Item>
        <Menu.Item>
            <a className='focus9' rel="noopener noreferrer" href="/ownervip/purebrand/quality">纯牌零件</a>
        </Menu.Item>
        <Menu.Item>
            <a className='focus10' rel="noopener noreferrer" href="/ownervip/fengxianghui/queity">丰享汇</a>
        </Menu.Item>
        <Menu.Item>
            <a className='focus11' rel="noopener noreferrer" href="/ownervip/capacitynet/corollanet">智能互联</a>
        </Menu.Item>
    </Menu>
)
const BrandLife = (
    <Menu className="HeaderDropdown">
        <Menu.Item>
            <a className='focus12' rel="noopener noreferrer" href="/brandcenter/enterprisebrand">企业品牌</a>
        </Menu.Item>
        <Menu.Item>
            <a className='focus13' rel="noopener noreferrer" href="/brandcenter/enterpriseintroduce">企业介绍</a>
        </Menu.Item>
        <Menu.Item>
            <a className='focus14' rel="noopener noreferrer" href="/brandcenter/socialResponsibility">社会责任</a>
        </Menu.Item>
        <Menu.Item>
            <a className='focus15' rel="noopener noreferrer" href="/brandcenter/newscenter">企业新闻</a>
        </Menu.Item>
        <Menu.Item>
            <a className='focus16' rel="noopener noreferrer" href="/brandcenter/activitycenter">活动中心</a>
        </Menu.Item>
        <Menu.Item>
            <a className='focus17' rel="noopener noreferrer" href="/brandcenter/fansinteraction">粉丝互动</a>
        </Menu.Item>
    </Menu>
);
const onClick = ({ key }) => {
    if (key === '1') {
        window.location.href = `/personcenter/home`;
    } else {
        const params = {
        };
        loginApi.logout(params).then(res => {
            if (res && res.code === '0') {
                localStorage.removeItem('userInfo')
                window.location.href = `/login`;
            }
        })
    }
};
const personCenter = (
    <Menu onClick={onClick} className="personDropdown">
        <Menu.Item key="1">
            <a>个人中心</a>
        </Menu.Item>
        <Menu.Item key="2">
            <a>退出登录</a>
        </Menu.Item>
    </Menu>
);

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            li_active: 0,
            isShowSearchBox: true,
            searchContent: '',
            isFocus:'',
            isTopFocus: ''
        }
    }
    // 跳转获取地址栏token
    getToken() {
        const search = this.props.location.search;
        const params = querryStringToObject(search);
        if(params.token) {
            const info = {
                accessToken: params.token
            }
            // console.log(info,JSON.stringify(info));
            localStorage.setItem('userInfo',JSON.stringify(info))
            loginApi.getUserInfo().then((res) => {
                // console.log(res);
                if(res && res.code === '0') {
                    localStorage.setItem('userInfo',JSON.stringify(res.data))
                }
            })
        }
    }
    componentWillMount(){
        this.getToken();
        let url = window.location.href
        let url2 = url.split("/")[3] || '';
        let url3 = url.split("/")[4] || '';
        let uerLast = '/' + url2 + '/' + url3;
        switch (uerLast) {
            case '/carSellHelp/CarDigiRoom':
                this.setState({
                    isFocus: 'focus1',
                    isTopFocus: 'isTopFocus1'
                });
                return;
            case '/carSellHelp/carBrandModels':
                this.setState({
                    isFocus: 'focus2',
                    isTopFocus: 'isTopFocus1'
                });
                return;
            case '/carSellHelp/genuineProduct':
                this.setState({
                    isFocus: 'focus3',
                    isTopFocus: 'isTopFocus1'
                });
                return;
            case '/carSellHelp/financialService':
                this.setState({
                    isFocus: 'focus4',
                    isTopFocus: 'isTopFocus1'
                });
                return;
            case '/carSellHelp/financeLease':
                this.setState({
                    isFocus: 'focus5',
                    isTopFocus: 'isTopFocus1'
                });
                return;
            case '/carSellHelp/newCarInsurance':
                this.setState({
                    isFocus: 'focus6',
                    isTopFocus: 'isTopFocus1'
                });
                return;
            case '/ownervip/serintroduce':
                this.setState({
                    isFocus: 'focus7',
                    isTopFocus: 'isTopFocus2'
                });
                return;
            case '/ownervip/serverhall':
                this.setState({
                    isFocus: 'focus8',
                    isTopFocus: 'isTopFocus2'
                });
                return;
            case '/ownervip/purebrand':
                this.setState({
                    isFocus: 'focus9',
                    isTopFocus: 'isTopFocus2'
                });
                return;
            case '/ownervip/fengxianghui':
                this.setState({
                    isFocus: 'focus10',
                    isTopFocus: 'isTopFocus2'
                });
                return;
            case '/ownervip/capacitynet':
                this.setState({
                    isFocus: 'focus11',
                    isTopFocus: 'isTopFocus2'
                });
                return;
            case '/brandcenter/enterprisebrand':
                this.setState({
                    isFocus: 'focus12',
                    isTopFocus: 'isTopFocus3'
                });
                return;
            case '/brandcenter/enterpriseintroduce':
                this.setState({
                    isFocus: 'focus13',
                    isTopFocus: 'isTopFocus3'
                });
                return;
            case '/brandcenter/socialResponsibility':
                this.setState({
                    isFocus: 'focus14',
                    isTopFocus: 'isTopFocus3'
                });
                return;
            case '/brandcenter/newscenter':
                this.setState({
                    isFocus: 'focus15',
                    isTopFocus: 'isTopFocus3'
                });
                return;
            case '/brandcenter/activitycenter':
                this.setState({
                    isFocus: 'focus16',
                    isTopFocus: 'isTopFocus3'
                });
                return;
            case '/brandcenter/fansinteraction':
                this.setState({
                    isFocus: 'focus17',
                    isTopFocus: 'isTopFocus3'
                });
                return;
            default:
                return null;
        }
    }

    componentDidMount() {
        let isTopFocus;
        if (this.state.isTopFocus) {
            isTopFocus = document.getElementsByClassName('ant-dropdown-link ' + this.state.isTopFocus)[0];
        }
        if(isTopFocus) {
            isTopFocus.setAttribute('style', 'color: #d3b078')
        }
    }
    componentDidUpdate(){
        const focus = document.getElementsByClassName(this.state.isFocus)[0];
        if(focus) {
            focus.setAttribute('style', 'color: #d3b078')
        }
    }

    // 输入框值改变
    handleSearchChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        })
    };
    handleEnterSearch(e){
        if (e.which === 13) {
            this.doSearch()
        }
    };
    // 触摸样式置灰
    handleMouseOver(num) {
        this.setState({
            li_active: num
        })
    }
    handleMouseOut() {
        this.setState({
            li_active: 0
        })
    }
    handleShoeSearchBox = () => {
        this.setState({
            isShowSearchBox: true
        })
        const searchbox = document.getElementsByClassName('searchBox')[0];
        if(searchbox) {
          searchbox.setAttribute('style', 'left: 4.5rem')
        }
    }
    handleCloseSearchBox = () => {
      const searchbox = document.getElementsByClassName('searchBox')[0];
      if(searchbox) {
        searchbox.setAttribute('style', 'left: 100%')
      }
    }
    goPersonCenter = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const accessToken = userInfo && userInfo.accessToken
        if(!accessToken) {
            const params = {
                url: '/personcenter/home'
            };
            this.props.history.push('/login');
            localStorage.setItem('loginJump',JSON.stringify(params))
        } else {
            this.props.history.push('/personcenter/home');
        }
    }
    logout = () => {
        const params = {
        };
        loginApi.logout(params).then(res => {
            if (res && res.code === '0') {
                localStorage.removeItem('userInfo')
                this.props.history.push('/login');
            }
        })
    };
    doSearch = () => {
        const params = {
            searchContent: this.state.searchContent,
            beginPage: 1,
            pageSize: 10
        };
        headerApi.search(params).then(res => {
            if (res && res.code === '0') {
                this.setState({
                    isShowSearchBox: false
                });
                this.props.history.push('/search?content=' + this.state.searchContent);
            }
        })
    };

    render() {
        const { isShowSearchBox } = this.state;
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const loginName = userInfo && userInfo.loginName;
        let loginEl;
        if (loginName) {
            loginEl = (
                <li>
                    <Dropdown overlay={personCenter} overlayClassName='persondrop'>
                        <a className="ant-dropdown-link" href="#">
                            <img src={require('../../../assets/img/officislSite/personcenter.png')} alt="" />
                        </a>
                    </Dropdown>
                </li>
            )
        } else {
            loginEl = (
                <li>
                    <a onClick={this.goPersonCenter}>
                        <img src={require('../../../assets/img/officislSite/personcenter.png')} alt="" />
                    </a>
                </li>
            )
        }
        return (
            <div className='header-nav'>
                <ul className='headList'>
                    <li><a href='/'><span></span></a></li>
                        <Dropdown overlay={buryCar} overlayClassName='headerdrop'>
                            <li onMouseOver={this.handleMouseOver.bind(this, 1)} onMouseOut={this.handleMouseOver.bind(this)} className={this.state.li_active === 1 ? 'li_active' : ''}>
                                <a className="ant-dropdown-link isTopFocus1" href="#">
                                    购车支持 <Icon type="down" />
                                </a>
                            </li>
                        </Dropdown>
                        <Dropdown overlay={CarHoster} overlayClassName='headerdrop'>
                            <li onMouseOver={this.handleMouseOver.bind(this, 2)} onMouseOut={this.handleMouseOver.bind(this)} className={this.state.li_active === 2 ? 'li_active' : ''}>
                                <a className="ant-dropdown-link isTopFocus2" href="#">
                                    车主专享 <Icon type="down" />
                                </a>
                            </li>
                        </Dropdown>
                        <Dropdown overlay={BrandLife} overlayClassName='headerdrop'>
                            <li onMouseOver={this.handleMouseOver.bind(this, 3)} onMouseOut={this.handleMouseOver.bind(this)} className={this.state.li_active === 3 ? 'li_active' : ''}>
                                <a className="ant-dropdown-link isTopFocus3" href="#">
                                    品牌中心 <Icon type="down" />
                                </a>    
                            </li>
                        </Dropdown>
                    <li onClick={this.handleShoeSearchBox} ><img src={require('../../../assets/img/officislSite/search.png')} /></li>
                    {
                        loginEl
                    }
                </ul>
                {
                    isShowSearchBox ?
                        <div className='searchBox'>
                            <a href="javascript:void(0)" onKeyDown={this.handleEnterSearch.bind(this)} >
                                <input
                                    type="search"
                                    name="searchContent"
                                    onChange={this.handleSearchChange}
                                    placeholder='请输入你想要搜索的内容，并按回车键搜索'
                                />
                            </a>
                            <Icon onClick={this.handleCloseSearchBox} type="close" />
                        </div>
                        :
                        null
                }
                <div className='rightMask'></div>
            </div>
        )
    }
}

export default withRouter(Header)
