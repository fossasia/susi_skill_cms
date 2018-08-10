import React, { Component } from 'react';
import StaticAppBar from '../../StaticAppBar/StaticAppBar.react.js';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Tabs from 'antd/lib/tabs';
import NotFound from '../../NotFound/NotFound.react';

const cookies = new Cookies();

const TabPane = Tabs.TabPane;

class SystemSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabPosition: 'top',
      apiKeys: [],
      loading: true,
    };
  }

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
              <h2 className="h2">System Settings</h2>
            </div>
            <div className="tabs">
              <Paper style={tabStyle} zDepth={0}>
                <Tabs
                  defaultActiveKey="4"
                  onTabClick={this.handleTabChange}
                  tabPosition={this.state.tabPosition}
                  animated={false}
                  type="card"
                  style={{ minHeight: '500px' }}
                >
                  <TabPane tab="Admin" key="1" />
                  <TabPane tab="Users" key="2" />
                  <TabPane tab="Skills" key="3" />
                  <TabPane tab="System Settings" key="4">
                    Tab for config keys
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

SystemSettings.propTypes = {
  history: PropTypes.object,
};

export default SystemSettings;
