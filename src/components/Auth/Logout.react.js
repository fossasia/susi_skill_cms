import { Component } from 'react';
import PropTypes from 'prop-types';

var deleteCookie = function(name, options = {}) {
  let cookieString = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  if (options.domain) {
    cookieString = `${cookieString}domain=${options.domain};`;
  }
  if (options.path) {
    cookieString = `${cookieString}path=${options.path};`;
  }
  document.cookie = cookieString;
};

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: '',
      showAdmin: '',
    };
  }

  componentDidMount() {
    deleteCookie('loggedIn', { domain: '.susi.ai', path: '/' });
    deleteCookie('serverUrl', { domain: '.susi.ai', path: '/' });
    deleteCookie('emailId', { domain: '.susi.ai', path: '/' });
    deleteCookie('showAdmin', { path: '/' });
    deleteCookie('username', { domain: '.susi.ai', path: '/' });
    this.props.history.push('/');
    window.location.reload();
  }
  render() {
    return null;
  }
}

Logout.propTypes = {
  history: PropTypes.object,
};

export default Logout;
