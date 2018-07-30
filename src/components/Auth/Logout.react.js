import { Component } from 'react';
import PropTypes from 'prop-types';
import { isProduction } from '../../utils';

const cookieDomain = isProduction() ? '.susi.ai' : '';

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
    deleteCookie('loggedIn', { domain: cookieDomain, path: '/' });
    deleteCookie('serverUrl', { domain: cookieDomain, path: '/' });
    deleteCookie('emailId', { domain: cookieDomain, path: '/' });
    deleteCookie('showAdmin', { domain: cookieDomain, path: '/' });
    deleteCookie('username', { domain: cookieDomain, path: '/' });
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
