import React, { Component } from 'react';
import NotFound from '../NotFound/NotFound.react';
import './Admin.css';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import CircularProgress from 'material-ui/CircularProgress';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Tabs from 'antd/lib/tabs';
import { Avatar } from 'antd';
import {
  getAdmin,
  fetchAdminUserStats,
  fetchAdminUserSkill,
} from '../../api/index';

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
      loading: true,
    };
  }

  componentDidMount() {
    document.title = 'SUSI.AI - Admin';
    getAdmin()
      .then(payload => {
        const { showAdmin } = payload;
        if (showAdmin) {
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
      })
      .catch(error => {
        this.setState({
          loading: false,
          isAdmin: false,
        });
        console.log(error);
      });

    fetchAdminUserStats({ getUserStats: 'true' })
      .then(payload => {
        const { userStats } = payload;
        this.setState({
          userStats,
          loadingUsers: false,
        });
      })
      .catch(error => {
        console.log(error);
      });

    fetchAdminUserSkill()
      .then(payload => {
        const { skillStats } = payload;
        this.setState({
          skillStats,
          loadingSkills: false,
        });
      })
      .catch(error => {
        console.log(error);
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
    if (activeKey === '5') {
      this.props.history.push('/admin/logs');
    }
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
                    <Tabs
                      onTabClick={this.handleTabChange}
                      tabPosition="top"
                      animated={false}
                      type="card"
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
                              System Skills:{' '}
                              {this.state.skillStats.systemSkills
                                ? this.state.skillStats.systemSkills
                                : 0}
                            </p>
                            <p>
                              Staff Picks:{' '}
                              {this.state.skillStats.staffPicks
                                ? this.state.skillStats.staffPicks
                                : 0}
                            </p>
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
                          </Card>
                        </span>
                      </TabPane>
                      <TabPane tab="Users" key="2" />
                      <TabPane tab="Skills" key="3" />
                      <TabPane tab="System Settings" key="4" />
                      <TabPane tab="System Logs" key="5" />
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
