import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import Paper from 'material-ui/Paper';
import Tabs from 'antd/lib/tabs';
import StaticAppBar from '../../StaticAppBar/StaticAppBar.react';
import NotFound from '../../NotFound/NotFound.react';
import Cookies from 'universal-cookie';
import { urls } from '../../../utils';
import * as $ from 'jquery';
import { Spin, Alert } from 'antd';

const cookies = new Cookies();

const TabPane = Tabs.TabPane;

class SystemLogs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabPosition: 'top',
      logs: '',
      error: false,
      loading: true,
      currentCount: '1000',
    };
  }

  componentDidMount() {
    this.loadSystemLogs(1000);
  }

  loadSystemLogs = count => {
    let url;
    url = `${urls.API_URL}/log.txt?count=${count}`;
    $.ajax({
      url: url,
      dataType: 'text',
      crossDomain: true,
      success: function(response) {
        let error = false;
        if (response.indexOf('WARN root') !== -1) {
          error = true;
        }
        this.setState({
          error: error,
          logs: response,
          loading: false,
        });
      }.bind(this),
      error: function(errorThrown) {
        console.log(errorThrown);
      },
    });
  };

  handleTabChange = activeKey => {
    if (activeKey === '1') {
      this.props.history.push('/admin');
    }
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

  handleCountChange = (event, index, value) => {
    this.setState({
      currentCount: value,
      loading: true,
    });
    this.loadSystemLogs(value);
  };

  render() {
    const tabStyle = {
      width: '100%',
      animated: false,
      textAlign: 'left',
      display: 'inline-block',
    };

    const blueThemeColor = { color: 'rgb(66, 133, 244)' };
    const themeForegroundColor = '#272727';
    const themeBackgroundColor = '#fff';

    return (
      <div>
        {cookies.get('showAdmin') === 'true' ? (
          <div>
            <div className="heading">
              <StaticAppBar {...this.props} />
              <h2 className="h2">System Logs</h2>
            </div>
            <div className="tabs">
              <Paper style={tabStyle} zDepth={0}>
                <Tabs
                  defaultActiveKey="5"
                  onTabClick={this.handleTabChange}
                  tabPosition={this.state.tabPosition}
                  animated={false}
                  type="card"
                  style={{ minHeight: '500px' }}
                >
                  <TabPane tab="Admin" key="1" />
                  <TabPane tab="Users" key="2" />
                  <TabPane tab="Skills" key="3" />
                  <TabPane tab="System Settings" key="4" />
                  <TabPane tab="System Logs" key="5">
                    <div>
                      <div style={{ height: '50px', width: '100%' }}>
                        <DropDownMenu
                          selectedMenuItemStyle={blueThemeColor}
                          labelStyle={{ color: themeForegroundColor }}
                          menuStyle={{
                            backgroundColor: themeBackgroundColor,
                          }}
                          menuItemStyle={{ color: themeForegroundColor }}
                          onChange={this.handleCountChange}
                          value={this.state.currentCount}
                          style={{
                            width: '180px',
                            margin: '-20px -20px 0',
                            float: 'right',
                          }}
                          autoWidth={false}
                        >
                          <MenuItem
                            primaryText="Last 10 logs"
                            value="10"
                            className="setting-item"
                          />
                          <MenuItem
                            primaryText="Last 20 logs"
                            value="20"
                            className="setting-item"
                          />
                          <MenuItem
                            primaryText="Last 50 logs"
                            value="50"
                            className="setting-item"
                          />
                          <MenuItem
                            primaryText="Last 100 logs"
                            value="100"
                            className="setting-item"
                          />
                          <MenuItem
                            primaryText="Last 200 logs"
                            value="200"
                            className="setting-item"
                          />
                          <MenuItem
                            primaryText="Last 500 logs"
                            value="500"
                            className="setting-item"
                          />
                          <MenuItem
                            primaryText="Last 1000 logs"
                            value="1000"
                            className="setting-item"
                          />
                        </DropDownMenu>
                      </div>
                      <div>
                        <Spin
                          tip="Loading logs..."
                          spinning={this.state.loading}
                          size="large"
                        >
                          <Alert
                            description={
                              <p
                                style={{
                                  fontSize: '18px',
                                  lineHeight: '2',
                                  overflowWrap: 'break-word',
                                }}
                              >
                                {this.state.logs}
                              </p>
                            }
                            type={
                              this.state.error === true ? 'error' : 'success'
                            }
                            showIcon
                          />
                        </Spin>
                      </div>
                    </div>
                  </TabPane>
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

SystemLogs.propTypes = {
  history: PropTypes.object,
};
export default SystemLogs;
