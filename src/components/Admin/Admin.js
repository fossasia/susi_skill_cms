import React, { Component } from 'react';
import './Admin.css';
import $ from 'jquery';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react.js';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { Card } from 'antd';
import Tabs from 'antd/lib/tabs';
import 'antd/lib/tabs/style/index.css';
import { Avatar } from 'antd';
import NotFound from './../NotFound/NotFound.react';

import { urls } from '../../utils';

const cookies = new Cookies();

const TabPane = Tabs.TabPane;

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabPosition: 'top',
      userStats: {},
      skillStats: {},
      loadingUsers: true,
      loadingSkills: true,
    };
  }

  componentDidMount() {
    let url;
    url =
      `${urls.API_URL}/aaa/getUsers.json?getUserStats=true&access_token=` +
      cookies.get('loggedIn');
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonpCallback: 'pyfw',
      jsonp: 'callback',
      crossDomain: true,
      success: function(response) {
        this.setState({
          userStats: response.userStats,
          loadingUsers: false,
        });
      }.bind(this),
      error: function(errorThrown) {
        console.log(errorThrown);
      },
    });

    url = `${urls.API_URL}/cms/getSkillList.json?access_token=${cookies.get(
      'loggedIn',
    )}`;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(response) {
        this.setState({
          skillStats: response.skillStats,
          loadingSkills: false,
        });
      }.bind(this),
      error: function(errorThrown) {
        console.log(errorThrown);
      },
    });
  }

  handleClose = () => {
    this.props.history.push('/');
    window.location.reload();
  };

  handleTabChange = activeKey => {
    if (activeKey === '2') {
      this.props.history.push('/admin/users');
    }
    if (activeKey === '3') {
      this.props.history.push('/admin/skills');
    }
    if (activeKey === '4') {
      this.props.history.push('/admin/settings');
    }
  };

  render() {
    const tabStyle = {
      width: '100%',
      animated: false,
      textAlign: 'left',
      display: 'inline-block',
    };

    return (
      <div>
        {cookies.get('showAdmin') === 'true' ? (
          <div>
            <div className="heading">
              <StaticAppBar {...this.props} />
              <h2 className="h2">Admin Panel</h2>
            </div>
            <div className="tabs">
              <Paper style={tabStyle} zDepth={0}>
                <Tabs
                  onTabClick={this.handleTabChange}
                  tabPosition={this.state.tabPosition}
                  animated={false}
                  type="card"
                  style={{ minHeight: '500px' }}
                >
                  <TabPane tab="Admin" key="1">
                    <span
                      style={{
                        fontSize: '18px',
                        fontWeight: '5000',
                        float: 'left',
                        marginRight: '20px',
                      }}
                    >
                      <Card
                        loading={this.state.loadingUsers}
                        title={
                          <span
                            style={{ fontSize: '18px', fontWeight: 'bold' }}
                          >
                            User Roles
                          </span>
                        }
                        style={{
                          width: '300px',
                          height: '310px',
                          marginBottom: '20px',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          lineHeight: '2',
                        }}
                      >
                        <p>
                          Anonymous:{' '}
                          {this.state.userStats.anonymous
                            ? this.state.userStats.anonymous
                            : 0}
                        </p>
                        <p>
                          Users:{' '}
                          {this.state.userStats.users
                            ? this.state.userStats.users
                            : 0}
                        </p>
                        <p>
                          Reviewers:{' '}
                          {this.state.userStats.reviewers
                            ? this.state.userStats.reviewers
                            : 0}
                        </p>
                        <p>
                          Operators:{' '}
                          {this.state.userStats.operators
                            ? this.state.userStats.operators
                            : 0}
                        </p>
                        <p>
                          Admins:{' '}
                          {this.state.userStats.admins
                            ? this.state.userStats.admins
                            : 0}
                        </p>
                        <p>
                          Super Admins:{' '}
                          {this.state.userStats.superAdmins
                            ? this.state.userStats.superAdmins
                            : 0}
                        </p>
                      </Card>
                    </span>

                    <span
                      style={{
                        fontSize: '18px',
                        fontWeight: '5000',
                        float: 'left',
                        marginRight: '20px',
                      }}
                    >
                      <Card
                        className="flexCard"
                        loading={this.state.loadingUsers}
                        title={
                          <span
                            style={{ fontSize: '18px', fontWeight: 'bold' }}
                          >
                            Users
                          </span>
                        }
                      >
                        <span
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '50px',
                          }}
                        >
                          <span>
                            <p>Total</p>
                            <Avatar
                              style={{
                                backgroundColor: 'orange',
                                verticalAlign: 'middle',
                                marginLeft: '2px',
                              }}
                              size="large"
                              shape="square"
                            >
                              {' '}
                              {this.state.userStats.totalUsers
                                ? this.state.userStats.totalUsers
                                : 0}
                            </Avatar>
                          </span>
                          <span>
                            <p>Active</p>
                            <Avatar
                              style={{
                                backgroundColor: 'green',
                                verticalAlign: 'middle',
                                marginLeft: '7px',
                              }}
                              size="large"
                              shape="square"
                            >
                              {this.state.userStats.activeUsers
                                ? this.state.userStats.activeUsers
                                : 0}
                            </Avatar>
                          </span>
                          <span>
                            <p>Inactive</p>
                            <Avatar
                              style={{
                                backgroundColor: 'red',
                                verticalAlign: 'middle',
                                marginLeft: '13px',
                              }}
                              size="large"
                              shape="square"
                            >
                              {' '}
                              {this.state.userStats.inactiveUsers
                                ? this.state.userStats.inactiveUsers
                                : 0}
                            </Avatar>
                          </span>
                        </span>
                      </Card>
                    </span>

                    <span
                      style={{
                        fontSize: '18px',
                        fontWeight: '5000',
                        float: 'left',
                        marginRight: '20px',
                      }}
                    >
                      <Card
                        className="flexCard"
                        loading={this.state.loadingSkills}
                        title={
                          <span
                            style={{ fontSize: '18px', fontWeight: 'bold' }}
                          >
                            Skills
                          </span>
                        }
                      >
                        <span
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '50px',
                          }}
                        >
                          <span>
                            <p>Total</p>
                            <Avatar
                              style={{
                                backgroundColor: 'orange',
                                verticalAlign: 'middle',
                                marginLeft: '2px',
                              }}
                              size="large"
                              shape="square"
                            >
                              {this.state.skillStats.totalSkills
                                ? this.state.skillStats.totalSkills
                                : 0}
                            </Avatar>
                          </span>
                          <span>
                            <p>Reviewed</p>
                            <Avatar
                              style={{
                                backgroundColor: 'green',
                                verticalAlign: 'middle',
                                marginLeft: '25px',
                              }}
                              size="large"
                              shape="square"
                            >
                              {this.state.skillStats.reviewedSkills
                                ? this.state.skillStats.reviewedSkills
                                : 0}
                            </Avatar>
                          </span>
                          <span>
                            <p>Not Reviewed</p>
                            <Avatar
                              style={{
                                backgroundColor: 'red',
                                verticalAlign: 'middle',
                                marginLeft: '45px',
                              }}
                              size="large"
                              shape="square"
                            >
                              {' '}
                              {this.state.skillStats.nonReviewedSkills
                                ? this.state.skillStats.nonReviewedSkills
                                : 0}
                            </Avatar>
                          </span>
                        </span>
                      </Card>
                    </span>

                    <span
                      style={{
                        fontSize: '18px',
                        fontWeight: '5000',
                        float: 'left',
                        marginRight: '20px',
                      }}
                    >
                      <Card
                        loading={this.state.loadingSkills}
                        title={
                          <span
                            style={{ fontSize: '18px', fontWeight: 'bold' }}
                          >
                            Skill Types
                          </span>
                        }
                        style={{
                          width: '300px',
                          height: '310px',
                          marginBottom: '20px',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          lineHeight: '2',
                        }}
                      >
                        <p>
                          Editable:{' '}
                          {this.state.skillStats.editableSkills
                            ? this.state.skillStats.editableSkills
                            : 0}
                        </p>
                        <p>
                          Non Editable:{' '}
                          {this.state.skillStats.nonEditableSkills
                            ? this.state.skillStats.nonEditableSkills
                            : 0}
                        </p>
                        <p>
                          Staff Picks :{' '}
                          {this.state.skillStats.staffPicks
                            ? this.state.skillStats.staffPicks
                            : 0}
                        </p>
                      </Card>
                    </span>
                  </TabPane>
                  <TabPane tab="Users" key="2" />
                  <TabPane tab="Skills" key="3" />
                  <TabPane tab="System Settings" key="4" />
                </Tabs>
              </Paper>
            </div>
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    );
  }
}

Admin.propTypes = {
  history: PropTypes.object,
};

export default Admin;
