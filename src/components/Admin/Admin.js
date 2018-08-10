import React, { Component } from 'react';
import NotFound from '../NotFound/NotFound.react';
import './Admin.css';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import CircularProgress from 'material-ui/CircularProgress';
import $ from 'jquery';
import { Card } from 'antd';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Tabs from 'antd/lib/tabs';
import ListUser from './ListUser/ListUser';
import ListSkills from './ListSkills/ListSkills';
import { Avatar } from 'antd';
import { urls } from '../../utils';

const cookies = new Cookies();

const TabPane = Tabs.TabPane;

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userStats: {},
      skillStats: {},
      loadingUsers: true,
      loadingSkills: true,
      isAdmin: false,
    };
  }

  componentDidMount() {
    document.title = 'SUSI.AI - Admin';
    let url;
    url =
      urls.API_URL +
      '/aaa/showAdminService.json?access_token=' +
      cookies.get('loggedIn');
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(response) {
        if (response.showAdmin) {
          this.setState({
            loading: false,
            isAdmin: true,
          });
        } else {
          this.setState({
            loading: false,
            isAdmin: false,
          });
        }
      }.bind(this),
      error: function(errorThrown) {
        this.setState({
          loading: false,
          isAdmin: false,
        });
        console.log(errorThrown);
      }.bind(this),
    });

    url =
      urls.API_URL +
      '/aaa/getUsers.json?getUserStats=true&access_token=' +
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

  render() {
    return (
      <div>
        <StaticAppBar {...this.props} />
        {this.state.loading ? (
          <div className="center" style={{ marginTop: '100px' }}>
            <CircularProgress size={62} color="#4285f5" />
            <h4>Loading</h4>
          </div>
        ) : (
          <div>
            {this.state.isAdmin ? (
              <div>
                <h2 className="h2">Admin Panel</h2>
                <div style={styles.tabStyle} className="tabs">
                  <Paper style={styles.tabStyle} zDepth={0}>
                    <Tabs tabPosition="top" animated={false} type="card">
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
                            loading={this.state.loadingUsers}
                            className="flexCard"
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
                      <TabPane tab="Users" key="2">
                        <ListUser />
                      </TabPane>
                      <TabPane tab="Skills" key="3">
                        <ListSkills />
                      </TabPane>
                    </Tabs>
                  </Paper>
                </div>
              </div>
            ) : (
              <NotFound />
            )}
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  tabStyle: {
    width: '100%',
    animated: false,
    textAlign: 'left',
    display: 'inline-block',
    marginTop: '10px',
  },
};

Admin.propTypes = {
  history: PropTypes.object,
};

export default Admin;
