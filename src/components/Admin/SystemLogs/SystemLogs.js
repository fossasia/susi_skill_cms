import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Tabs from 'antd/lib/tabs';
import StaticAppBar from '../../StaticAppBar/StaticAppBar.react';
import NotFound from '../../NotFound/NotFound.react';
import Cookies from 'universal-cookie';
import { urls } from '../../../utils';
import * as $ from 'jquery';
import { Alert, Radio, Input } from 'antd';

const cookies = new Cookies();

const TabPane = Tabs.TabPane;

const RadioButton = Radio.Button;

const RadioGroup = Radio.Group;

class SystemLogs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabPosition: 'top',
      logs: '',
      error: false,
      loading: true,
      showCustom: false,
    };
  }

  componentDidMount() {
    this.loadSystemLogs(5);
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
  };

  handleCustom = e => {
    this.loadSystemLogs(e.target.value);
  };

  handleCountChange = e => {
    if (e.target.value !== 'custom') {
      this.setState({
        showCustom: false,
      });
      this.loadSystemLogs(e.target.value);
    }
    if (e.target.value === 'custom') {
      this.setState({
        showCustom: true,
      });
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
                  <TabPane tab="System Logs" key="5">
                    <div>
                      <div style={{ marginBottom: '20px' }}>
                        <RadioGroup
                          onChange={this.handleCountChange}
                          defaultValue="5"
                          size="large"
                        >
                          <RadioButton value="1">1</RadioButton>
                          <RadioButton value="2">2</RadioButton>
                          <RadioButton value="5">5</RadioButton>
                          <RadioButton value="10">10</RadioButton>
                          <RadioButton value="20">20</RadioButton>
                          <RadioButton value="30">30</RadioButton>
                          <RadioButton value="50">50</RadioButton>
                          <RadioButton value="100">100</RadioButton>
                          <RadioButton value="custom">Custom</RadioButton>
                        </RadioGroup>
                        {this.state.showCustom === true ? (
                          <Input
                            style={{
                              width: '116px',
                              marginLeft: '20px',
                              height: '30px',
                            }}
                            onPressEnter={e => this.handleCustom(e)}
                            placeholder="Enter count"
                          />
                        ) : null}
                      </div>
                      <div>
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
                          type={this.state.error === true ? 'error' : 'success'}
                          showIcon
                        />
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
