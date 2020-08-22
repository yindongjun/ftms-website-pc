import React,{Component} from 'react'
import { querryStringToObject } from '../../utils/util'
import './index.less'
import {headerApi} from "../../services/api";
import {Icon} from "antd";

class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searchContent: '',
            findContent: '',
            dataList: [],
            totalRows: '',
            pageNum: 0,
            row: 10,
            hasNextPage: true,
        }
    }
    componentDidMount () {
        const search = this.props.location.search;
        const params = querryStringToObject(search);
        if (params.content) {
            this.doSearch(params.content, this.state.pageNum, this.state.row);
            this.setState({
                searchContent: params.content
            })
        }
    }
    // 回车搜索
    handleEnterSearch(e){
        if (e.which === 13) {
            this.setState({
                dataList: []
            });
            this.doSearch(this.state.searchContent, 0, 10)
        }
    };
    // 输入框值改变
    handleSearchChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        })
    };

    goSearch(content) {
        this.setState({
            dataList: []
        });
        this.doSearch(content, 0, 10)
    }

    doSearch(content,page,row) {
        page++;
        const params = {
            searchContent: content,
            beginPage: page,
            pageSize: row
        };
        headerApi.search(params).then(res => {
            if (res && res.code === '0') {
                this.setState({
                    dataList: [...this.state.dataList,...res.data.dataList],
                    totalRows: res.data.totalRows,
                    findContent: content,
                    hasNextPage: res.data.hasNextPage

                })
            }
        })
        this.setState({
            pageNum: page
        })
    }

    /**
     * 全局搜索结果的跳转类型
     * type值对应：
     * 1、车型信息 ，跳转车详情页
     * 2、活动-活动中心 ，跳转活动详情页
     * 3、活动-丰享汇 ，跳转活动详情页
     * 4、文章-爱车课堂 ，跳转爱车课堂文章详情页
     * 5、企业新闻 ，跳转到新闻详情页
     * 6、文章-粉丝互动 ，跳转到粉丝互动文章详情页
     * */
    goType(type, id, url, description) {
        switch(type){
            case '1':
                this.props.history.push('/buycar/cartype/detail/' + url);
            break;
            case '2':
                if (url !== '' && url !== null && url !== undefined) {
                    window.open(url, '_blank');
                } else {
                    this.props.history.push('/brandcenter/activitycenter/activitydetail?id=' + id + '&text=activity')
                }
            break;
            case '3':
                if (url !== '' && url !== null && url !== undefined) {
                    window.open(url, '_blank');
                } else {
                    this.props.history.push('/brandcenter/activitycenter/activitydetail?id=' + id + '&text=feng')
                }
            break;
            case '4':
                if (url !== '' && url !== null && url !== undefined) {
                    window.open(url, '_blank');
                } else {
                    this.props.history.push('/ownervip/circletran?id=' + id + '&text=wenzhang');
                }
                break;
            case '5':
                if (url !== '' && url !== null && url !== undefined) {
                    window.open(url, '_blank');
                } else {
                    this.props.history.push('/brandcenter/newscenter/newsdetail?id=' + id);
                }
                break;
            case '6':
                if (url !== '' && url !== null && url !== undefined) {
                    window.open(url, '_blank');
                } else {
                    this.props.history.push('/brandcenter/fansinteraction/articledetail?id=' + id);
                }
                break;
            default:
                console.log(type);
        }
    }

    render(){
        const { searchContent, findContent, totalRows, dataList, hasNextPage, pageNum, row } = this.state;
        return(
            <div className='handleSearch'>
                <div className='searchBox' onKeyDown={this.handleEnterSearch.bind(this)}>
                    <input
                        type="search"
                        name="searchContent"
                        onChange={this.handleSearchChange}
                        placeholder='请输入您想要查询的内容'
                    />
                    <a onClick = {this.goSearch.bind(this, searchContent)}><img src={require("../../assets/img/purebrand/search.png")} alt="" /></a>
                </div>
                <ul>
                    <li>共找到<i>{totalRows}</i>条关于<i>{findContent}</i>的结果</li>
                    {
                        dataList.map((item,index)=>{
                            return <a>
                                <li key={index} onClick={this.goType.bind(this, item.type, item.id, item.url, item.description)}>
                                    {item.type === '1' ? <h3>{item.title}</h3> : <h2>{item.title}</h2>}
                                    {
                                        item.type === '1' ? null :  <p>{item.description}</p>
                                    }
                                    {/*<span>http://www.baidu.com</span>*/}
                                </li>
                            </a>
                        })
                    }
                </ul>
                {
                    hasNextPage?
                        <span onClick={() => {this.doSearch(searchContent, pageNum,row)}}>查看更多<Icon type="down" /></span>
                        :null
                }
            </div>
        )
    }
}

export default Search