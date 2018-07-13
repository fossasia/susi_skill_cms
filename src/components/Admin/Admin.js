import React, { Component } from 'react';
import './Admin.css';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
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
      tabPosition: 'top',
      isAdmin: false,
    };
  }

  componentDidMount() {
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
            isAdmin: true,
          });
        } else {
          this.setState({
            isAdmin: false,
          });
        }
      }.bind(this),
      error: function(errorThrown) {
        this.setState({
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
        {this.state.isAdmin ? (
          <div>
            <div className="heading">
              <StaticAppBar {...this.props} />
              <h2 className="h2">Admin Panel</h2>
            </div>
            <div className="tabs">
              <Paper style={styles.tabStyle} zDepth={0}>
                <Tabs
                  tabPosition={this.state.tabPosition}
                  animated={false}
                  type="card"
                >
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
          <div>
            <StaticAppBar {...this.props} />
            <div>
              <h1 style={styles.notAllowed}>404 :(</h1>
              <h2 style={{ textAlign: 'center' }}>Not Found</h2>
            </div>
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
  },
  notAllowed: {
    lineHeight: '90px',
    textAlign: 'center',
    fontSize: '80px',
    padding: '100px 30px 30px',
  },
};

Admin.propTypes = {
  history: PropTypes.object,
};

export default Admin;
