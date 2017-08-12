import React, {Component} from 'react';
import './ListUser.css';
import StaticAppBar from '../../StaticAppBar/StaticAppBar.react';
import $ from 'jquery';
import Cookies from 'universal-cookie'
import {Table} from 'antd';
// import Dialog from 'material-ui/Dialog';

const cookies = new Cookies();

const columns = [{
        title: 'Serial Number',
        dataIndex: 'serialNum',
        sorter: true,
        width: '5%',
    },
    {
        title: 'Email ID',
        dataIndex: 'email',
        sorter: true,
        render: name => `${name.first} ${name.last}`,       //make changes here to render data
        width: '30%',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        width: '10%',
    },
    {
        title: 'Signup',
        dataIndex: 'signup',
        width: '20%',
    },
    {
        title: 'Last Login',
        dataIndex: 'lastLogin',
        width: '20%'
    },
    {
        title: 'IP of Last Login',
        dataIndex: 'ipLastLogin',
        width: '15%'
    }
];

export default class ListUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: [],
            data: [],
            pagination: {},
            loading: false,
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
    }

    componentDidMount() {

        let url;
        url = "http://api.susi.ai/aaa/showAdminService.json?access_token=" + cookies.get('loggedIn');
        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback: 'py',
            jsonp: 'callback',
            crossDomain: true,
            success: function (response) {
                console.log(response.showAdmin)
                if (response.showAdmin) {
                    if (this.state.username.length === 0)
                        this.fetchUsers();
                    console.log("Page loading...")
                } else {
                    console.log("Not allowed to access this page!")
                }
            }.bind(this),
            error: function (errorThrown) {
                console.log("Not allowed to access this page!")
                console.log(errorThrown)
            }
        });
    }

    fetchUsers = () => {
        let url;
        url = "http://api.susi.ai/aaa/getAllUsers.json?access_token=" + cookies.get('loggedIn');
        let self = this;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback: 'pu',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data) {
                console.log(data.username)
                data = data.username
                let keys = Object.keys(data);
                let username = keys.map((el, i) => {
                    let name = data[el].replace("email:", "");
                    console.log(name);
                    return (
                        <TableRow key={i}>
                            <TableRowColumn>{++i}</TableRowColumn>
                            <TableRowColumn>{name}</TableRowColumn>
                            <TableRowColumn> </TableRowColumn>
                            <TableRowColumn> </TableRowColumn>
                            <TableRowColumn> </TableRowColumn>
                            <TableRowColumn> </TableRowColumn>
                        </TableRow>
                    )
                });
                self.setState({
                    username: username,
                })
                console.log(self.state)
            },
            error: function (errorThrown) {
                console.log(errorThrown)
            }
        });
    }

    render() {
        return (
            <div>
                <div>
                    <StaticAppBar {...this.props} />
                    <div className="banner">
                        {/*<h1 className="h1">Registered Users</h1>*/}
                    </div>
                    <div>
                        <Table columns={columns}
                               rowKey={record => record.registered}
                               dataSource={this.state.data}
                               pagination={this.state.pagination}
                               loading={this.state.loading}
                               onChange={this.handleTableChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
