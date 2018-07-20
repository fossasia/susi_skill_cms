import React, { Component } from 'react';
import NotFound from '../NotFound/NotFound';
import './Admin.css';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import CircularProgress from 'material-ui/CircularProgress';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Tabs from 'antd/lib/tabs';
import ListUser from './ListUser/ListUser';
import ListSkills from './ListSkills/ListSkills';
import urls from '../../Utils/urls';

const cookies = new Cookies();

const TabPane = Tabs.TabPane;

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
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
        console.log(response.showAdmin);
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
                        Tab for Admin Content
                      </TabPane>
                      <TabPane tab="Users" key="2">
                        <ListUser />
                      </TabPane>
                      <TabPane tab="Skills" key="3">
                        <ListSkills />
                      </TabPane>
                      <TabPane tab="Permissions" key="4">
                        Permission Content Tab
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
    textAlign: 'center',
    display: 'inline-block',
    marginTop: '10px',
  },
};

Admin.propTypes = {
  history: PropTypes.object,
};

export default Admin;
