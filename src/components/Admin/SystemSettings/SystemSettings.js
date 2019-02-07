import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';
import Paper from 'material-ui/Paper';
import Table from 'antd/lib/table';
import Tabs from 'antd/lib/tabs';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import NotFound from '../../NotFound/NotFound.react';
import StaticAppBar from '../../StaticAppBar/StaticAppBar.react';
import { urls } from '../../../utils';

const TabPane = Tabs.TabPane;

const styles = {
  tabStyle: {
    width: '100%',
    animated: false,
    textAlign: 'left',
    display: 'inline-block',
  },
};

class SystemSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiKeys: [],
      loading: true,
    };

    this.keysColumns = [
      {
        title: 'S.No.',
        dataIndex: 'serialNum',
        width: '10%',
      },
      {
        title: 'Key Name',
        dataIndex: 'keyName',
        width: '30%',
      },
      {
        title: 'Value',
        dataIndex: 'value',
        width: '60%',
      },
    ];
  }

  componentDidMount() {
    const url = `${urls.API_URL}/aaa/getApiKeys.json`;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonpCallback: 'pyfw',
      jsonp: 'callback',
      crossDomain: true,
      success: function(response) {
        let apiKeys = [];
        let i = 1;
        let keys = Object.keys(response.keys);
        keys.forEach(j => {
          const apiKey = {
            serialNum: i,
            keyName: j,
            value: response.keys[j],
          };
          ++i;
          apiKeys.push(apiKey);
        });
        this.setState({
          apiKeys: apiKeys,
          loading: false,
        });
      }.bind(this),
      error: function(errorThrown) {
        console.log(errorThrown);
      },
    });
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
    if (activeKey === '5') {
      this.props.history.push('/admin/logs');
    }
  };

  render() {
    const { tabStyle } = styles;
    const { isAdmin } = this.props;
    return (
      <div>
        {isAdmin ? (
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
                  tabPosition="top"
                  animated={false}
                  type="card"
                  style={{ minHeight: '500px' }}
                >
                  <TabPane tab="Admin" key="1" />
                  <TabPane tab="Users" key="2" />
                  <TabPane tab="Skills" key="3" />
                  <TabPane tab="System Settings" key="4">
                    <div className="table">
                      <h3 className="h3">Config Keys</h3>
                      <LocaleProvider locale={enUS}>
                        <Table
                          bordered
                          columns={this.keysColumns}
                          locale={{ emptyText: 'No config keys found!' }}
                          rowKey={record => record.serialNum}
                          dataSource={this.state.apiKeys}
                          loading={this.state.loading}
                          pagination={false}
                          style={{
                            width: '50%',
                          }}
                        />
                      </LocaleProvider>
                    </div>
                  </TabPane>
                  <TabPane tab="System Logs" key="5" />
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
  isAdmin: PropTypes.bool,
};

function mapStateToProps(store) {
  return {
    isAdmin: store.app.isAdmin,
  };
}

export default connect(
  mapStateToProps,
  null,
)(SystemSettings);
