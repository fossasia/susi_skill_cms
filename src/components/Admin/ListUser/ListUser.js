import React, {Component} from 'react';
import './ListUser.css';
import $ from 'jquery';
import Cookies from 'universal-cookie'
import Table from 'antd/lib/table';
import urls from '../../../Utils/urls.js'

const cookies = new Cookies();

const columns = [{
    title: 'S.No.',
    dataIndex: 'serialNum',
    sorter: false,
    width: '5%',
},
    {
        title: 'Email ID',
        dataIndex: 'email',
        sorter: false,
        width: '25%',
    },
    {
        title: 'Activation Status',
        dataIndex: 'confirmed',
        sorter: false,
        width: '15%',
    },
    {
        title: 'Signup',
        dataIndex: 'signup',
        width: '15%',
    },
    {
        title: 'Last Login',
        dataIndex: 'lastLogin',
        width: '15%'
    },
    {
        title: 'IP of Last Login',
        dataIndex: 'ipLastLogin',
        width: '15%'
    },
    {
        title: 'User Role',
        dataIndex: 'userRole',
        sorter: false,
        width: '10%',
    }
];

export default class ListUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: [],
            data: [],
            middle: '50',
            pagination: {},
            loading: false
        }
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    };

    componentDidMount() {
        const pagination = { ...this.state.pagination };
        let url;
        url = `${urls.API_URL}/aaa/showAdminService.json?access_token=` + cookies.get('loggedIn');
        $.ajax({
            url: url,
            dataType: 'json',
            success: function (response) {
                // console.log(response.showAdmin);
                if (response.showAdmin) {
                    let getPagesUrl = `${urls.API_URL}/aaa/getUsers.json?access_token=` + cookies.get('loggedIn')
                        + '&getUserCount=true';
                    $.ajax({
                        url: getPagesUrl,
                        dataType: 'json',
                        success: function (data) {
                            // console.log(data);
                            pagination.total = data.userCount;
                            pagination.pageSize = 50;
                            this.setState({
                                loading: false,
                                pagination,
                            });
                            // console.log(pagination);
                            this.fetch();
                        }.bind(this),
                        error: function (errorThrown) {
                            console.log(errorThrown)
                        }
                    });
                } else {
                    console.log('Not allowed to access this page!')
                }
            }.bind(this),
            error: function (errorThrown) {
                console.log('Not allowed to access this page!');
                console.log(errorThrown)
            }
        });


    }

    fetch = (params = {}) => {
        let url;
        let page;
        if(params.page!==undefined){
            // console.log(params.page);
            page = params.page;
        }
        else{
            page =1;
        }
        url = urls.API_URL + '/aaa/getUsers.json?access_token=' + cookies.get('loggedIn')
            + '&page='+page;
        $.ajax({
            url: url,
            dataType: 'json',
            success: function (response) {
                // console.log(response.users);
                let userList = response.users;
                let users =[];
                userList.map((data,i)=>{
                    let user = {
                        serialNum:++i + (page-1) *50,
                        email:data.name,
                        confirmed:data.confirmed,
                        signup:data.signupTime,
                        lastLogin:data.lastLoginTime,
                        ipLastLogin:data.lastLoginIP,
                        userRole:data.userRole
                    };

                    if(user.confirmed) {
                        user.confirmed = 'Activated'
                    }
                    else {
                        user.confirmed = 'Not Activated'
                    }

                    users.push(user);
                    return 1
                });
                // console.log(users);
                this.setState({
                    data:users
                })
            }.bind(this),
            error: function (errorThrown) {
                console.log(errorThrown)
            }
        });
        // Read total count from server
        // pagination.total = data.totalCount;

    };

    render() {
        return (
            <div className='table'>
                <Table columns={columns}
                       rowKey={record => record.registered}
                       dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       onChange={this.handleTableChange}
                />
            </div>
        );
    }
}
