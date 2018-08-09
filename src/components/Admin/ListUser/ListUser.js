import React, { Component } from 'react';
import './ListUser.css';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import Table from 'antd/lib/table';
import { Input } from 'antd';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import { urls } from '../../../utils';
import 'antd/lib/table/style/index.css';

const cookies = new Cookies();

const Search = Input.Search;

export default class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: [],
      data: [],
      middle: '50',
      pagination: {},
      loading: false,
      search: false,
      showEditDialog: false,
      showDeleteDialog: false,
      changeRoleDialog: false,
      deleteSuccessDialog: false,
      deleteFailedDialog: false,
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
        width: '20%',
        key: 'email',
      },
      {
        title: 'User Name',
        dataIndex: 'userName',
        width: '12%',
      },
      {
        title: 'Activation Status',
        dataIndex: 'confirmed',
        sorter: false,
        width: '10%',
      },
      {
        title: 'Signup',
        dataIndex: 'signup',
        width: '12%',
      },
      {
        title: 'Last Login',
        dataIndex: 'lastLogin',
        width: '15%',
      },
      {
        title: 'IP of Last Login',
        dataIndex: 'ipLastLogin',
        width: '10%',
      },
      {
        title: 'User Role',
        dataIndex: 'userRole',
        sorter: false,
        width: '8%',
      },
      {
        title: 'Action',
        sorter: false,
        width: '8%',
        key: 'action',
        render: (text, record) => {
          return (
            <span>
              <span
                style={{ cursor: 'pointer', color: '#4285f4' }}
                onClick={() => this.editUserRole(record.email, record.userRole)}
              >
                Edit
              </span>
              <span style={{ marginLeft: '5px', marginRight: '5px' }}> | </span>
              <span
                style={{ cursor: 'pointer', color: '#4285f4' }}
                onClick={() => this.handleDelete(record.email)}
              >
                Delete
              </span>
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

  deleteUser = () => {
    let url = `${urls.API_URL}/aaa/deleteUserAccount.json?email=${
      this.state.userEmail
    }&access_token=${cookies.get('loggedIn')}`;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      crossDomain: true,
      timeout: 3000,
      async: false,
      success: response => {
        this.setState({ deleteSuccessDialog: true });
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        this.setState({ deleteFailedDialog: true });
      },
    });
  };

  handleDelete = email => {
    this.setState({
      userEmail: email,
      showDeleteDialog: true,
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

  handleSearch = value => {
    this.setState({
      search: true,
    });
    let url;
    url = `${urls.API_URL}/aaa/getUsers.json?access_token=${cookies.get(
      'loggedIn',
    )}&search=${value}`;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonpCallback: 'pvsdu',
      jsonp: 'callback',
      crossDomain: true,
      success: function(response) {
        let userList = response.users;
        let users = [];
        userList.map((data, dataIndex) => {
          let devices = [];
          let keys = Object.keys(data.devices);
          keys.forEach(deviceIndex => {
            let device = {
              macid: deviceIndex,
              devicename: data.devices[deviceIndex].name,
              room: data.devices[deviceIndex].room,
              latitude: data.devices[deviceIndex].geolocation.latitude,
              longitude: data.devices[deviceIndex].geolocation.longitude,
            };
            devices.push(device);
          });
          let user = {
            serialNum: ++dataIndex,
            email: data.name,
            signup: data.signupTime,
            lastLogin: data.lastLoginTime,
            ipLastLogin: data.lastLoginIP,
            userRole: data.userRole,
            devices: devices,
          };

          if (data.confirmed) {
            user.confirmed = 'Activated';
          } else {
            user.confirmed = 'Not Activated';
          }

          users.push(user);
          return 1;
        });
        this.setState({
          data: users,
          loading: false,
        });
      }.bind(this),
      error: function(errorThrown) {
        console.log(errorThrown);
      },
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
      showDeleteDialog: false,
      deleteFailedDialog: false,
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
            userName: data.userName,
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
    const deleteActions = [
      <FlatButton
        key={1}
        label="Delete"
        labelStyle={{ color: '#4285f4' }}
        onTouchTap={this.deleteUser}
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
            className="dialogText"
          >
            <div className="dialogText">
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
            title="Delete User Account"
            actions={deleteActions}
            modal={true}
            open={this.state.showDeleteDialog}
            className="dialogText"
          >
            <div className="dialogText">
              Are you sure you want to delete the account associated with
              <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>
                {this.state.userEmail}
              </span>
              ?
            </div>
          </Dialog>
          <Dialog
            title="Success"
            className="dialogText"
            actions={
              <FlatButton
                key={1}
                label="Ok"
                labelStyle={{ color: '#4285f4' }}
                onTouchTap={this.handleSuccess}
              />
            }
            modal={true}
            open={this.state.deleteSuccessDialog}
          >
            <div className="dialogText">
              Account associated with
              <span style={{ fontWeight: 'bold', margin: '0 5px' }}>
                {this.state.userEmail}
              </span>
              is deleted successfully!
            </div>
          </Dialog>
          <Dialog
            title="Failed"
            className="dialogText"
            actions={
              <FlatButton
                key={1}
                label="Ok"
                labelStyle={{ color: '#4285f4' }}
                onTouchTap={this.handleClose}
              />
            }
            modal={true}
            open={this.state.deleteFailedDialog}
          >
            <div className="dialogText">
              Account associated with
              <span style={{ fontWeight: 'bold', margin: '0 5px' }}>
                {this.state.userEmail}
              </span>
              cannot be deleted!
            </div>
          </Dialog>
          <Dialog
            className="dialogText"
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
            <div className="dialogText">
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

        <Search
          placeholder="Search by email"
          style={{ margin: '5px 25% 20px 25%', width: '50%', height: '38px' }}
          size="large"
          onSearch={value => this.handleSearch(value)}
        />
        {this.state.search ? (
          <Table
            columns={this.columns}
            rowKey={record => record.serialNum}
            dataSource={this.state.data}
            loading={this.state.loading}
            pagination={false}
          />
        ) : (
          <Table
            columns={this.columns}
            rowKey={record => record.registered}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
          />
        )}
      </div>
    );
  }
}
