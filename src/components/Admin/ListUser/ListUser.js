import React, { Component } from 'react';
import './ListUser.css';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import Table from 'antd/lib/table';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import { urls } from '../../../utils';
import 'antd/lib/table/style/index.css';

const cookies = new Cookies();

export default class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: [],
      data: [],
      middle: '50',
      pagination: {},
      loading: false,
      showEditDialog: false,
      changeRoleDialog: false,
    };
    this.columns = [
      {
        title: 'S.No.',
        dataIndex: 'serialNum',
        sorter: false,
        width: '5%',
      },
      {
        title: 'Email ID',
        dataIndex: 'email',
        sorter: false,
        width: '22%',
        key: 'email',
      },
      {
        title: 'Activation Status',
        dataIndex: 'confirmed',
        sorter: false,
        width: '13%',
      },
      {
        title: 'Signup',
        dataIndex: 'signup',
        width: '15%',
      },
      {
        title: 'Last Login',
        dataIndex: 'lastLogin',
        width: '15%',
      },
      {
        title: 'IP of Last Login',
        dataIndex: 'ipLastLogin',
        width: '15%',
      },
      {
        title: 'User Role',
        dataIndex: 'userRole',
        sorter: false,
        width: '10%',
      },
      {
        title: 'Action',
        sorter: false,
        width: '5%',
        key: 'action',
        render: (text, record) => {
          return (
            <span>
              <div
                style={{ cursor: 'pointer', color: '#4285f4' }}
                onClick={() => this.editUserRole(record.email, record.userRole)}
              >
                Edit
              </div>
            </span>
          );
        },
      },
    ];
  }

  apiCall = () => {
    let url =
      `${urls.API_URL}/aaa/changeRoles.json?user=` +
      this.state.userEmail +
      '&role=' +
      this.state.userRole +
      '&access_token=' +
      cookies.get('loggedIn');

    let self = this;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      statusCode: {
        401: function(xhr) {
          if (window.console) {
            console.log(xhr.responseText);
            console.log('Error 401: Permission Denied!');
          }
        },
        503: function(xhr) {
          if (window.console) {
            console.log(xhr.responseText);
          }
          console.log('Error 503: Server not responding!');
          document.location.reload();
        },
      },
      crossDomain: true,
      timeout: 3000,
      async: false,
      success: function(response) {
        console.log(response);
        self.setState({ changeRoleDialog: true });
      },
      error: function(errorThrown) {
        console.log(errorThrown);
      },
    });
  };

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
    document.title = 'SUSI.AI - User Detail List';
    const pagination = { ...this.state.pagination };
    let url;
    url =
      `${urls.API_URL}/aaa/showAdminService.json?access_token=` +
      cookies.get('loggedIn');
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(response) {
        // console.log(response.showAdmin);
        if (response.showAdmin) {
          let getPagesUrl =
            `${urls.API_URL}/aaa/getUsers.json?access_token=` +
            cookies.get('loggedIn') +
            '&getUserCount=true';
          $.ajax({
            url: getPagesUrl,
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function(data) {
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
            error: function(errorThrown) {
              console.log(errorThrown);
            },
          });
        } else {
          console.log('Not allowed to access this page!');
        }
      }.bind(this),
      error: function(errorThrown) {
        console.log('Not allowed to access this page!');
        console.log(errorThrown);
      },
    });
  }

  editUserRole = (email, userRole) => {
    this.setState({
      userEmail: email,
      userRole: userRole,
      showEditDialog: true,
    });
  };

  handleChange = () => {
    this.apiCall();
    this.setState({
      showEditDialog: false,
    });
  };

  handleSuccess = () => {
    this.setState({
      changeRoleDialog: false,
    });
    document.location.reload();
  };

  handleClose = () => {
    this.setState({
      showEditDialog: false,
    });
  };

  handleUserRoleChange = (event, index, value) => {
    this.setState({
      userRole: value,
    });
  };

  fetch = (params = {}) => {
    let url;
    let page;
    if (params.page !== undefined) {
      // console.log(params.page);
      page = params.page;
    } else {
      page = 1;
    }
    url =
      `${urls.API_URL}/aaa/getUsers.json?access_token=` +
      cookies.get('loggedIn') +
      '&page=' +
      page;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(response) {
        // console.log(response.users);
        let userList = response.users;
        let users = [];
        userList.map((data, i) => {
          let user = {
            serialNum: ++i + (page - 1) * 50,
            email: data.name,
            confirmed: data.confirmed,
            signup: data.signupTime,
            lastLogin: data.lastLoginTime,
            ipLastLogin: data.lastLoginIP,
            userRole: data.userRole,
          };

          if (user.confirmed) {
            user.confirmed = 'Activated';
          } else {
            user.confirmed = 'Not Activated';
          }

          users.push(user);
          return 1;
        });
        // console.log(users);
        this.setState({
          data: users,
        });
      }.bind(this),
      error: function(errorThrown) {
        console.log(errorThrown);
      },
    });
    // Read total count from server
    // pagination.total = data.totalCount;
  };

  render() {
    const actions = [
      <FlatButton
        key={1}
        label="Change"
        labelStyle={{ color: '#4285f4' }}
        onTouchTap={this.handleChange}
      />,
      <FlatButton
        key={2}
        label="Cancel"
        primary={false}
        onTouchTap={this.handleClose}
      />,
    ];

    const blueThemeColor = { color: 'rgb(66, 133, 244)' };
    const themeForegroundColor = '#272727';
    const themeBackgroundColor = '#fff';

    return (
      <div className="table">
        <div>
          <Dialog
            title="Change User Role"
            actions={actions}
            modal={true}
            open={this.state.showEditDialog}
          >
            <div>
              Select new User Role for
              <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>
                {this.state.userEmail}
              </span>
            </div>
            <div>
              <DropDownMenu
                selectedMenuItemStyle={blueThemeColor}
                onChange={this.handleUserRoleChange}
                value={this.state.userRole}
                labelStyle={{ color: themeForegroundColor }}
                menuStyle={{ backgroundColor: themeBackgroundColor }}
                menuItemStyle={{ color: themeForegroundColor }}
                style={{
                  width: '250px',
                  marginLeft: '-20px',
                }}
                autoWidth={false}
              >
                <MenuItem
                  primaryText="USER"
                  value="user"
                  className="setting-item"
                />
                <MenuItem
                  primaryText="REVIEWER"
                  value="reviewer"
                  className="setting-item"
                />
                <MenuItem
                  primaryText="OPERATOR"
                  value="operator"
                  className="setting-item"
                />
                <MenuItem
                  primaryText="ADMIN"
                  value="admin"
                  className="setting-item"
                />
                <MenuItem
                  primaryText="SUPERADMIN"
                  value="superadmin"
                  className="setting-item"
                />
              </DropDownMenu>
            </div>
          </Dialog>
          <Dialog
            title="Success"
            actions={
              <FlatButton
                key={1}
                label="Ok"
                labelStyle={{ color: '#4285f4' }}
                onTouchTap={this.handleSuccess}
              />
            }
            modal={true}
            open={this.state.changeRoleDialog}
          >
            <div>
              User role of
              <span style={{ fontWeight: 'bold', margin: '0 5px' }}>
                {this.state.userEmail}
              </span>
              is changed to
              <span style={{ fontWeight: 'bold', margin: '0 5px' }}>
                {this.state.userRole}
              </span>
              successfully!
            </div>
          </Dialog>
        </div>

        <Table
          columns={this.columns}
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
