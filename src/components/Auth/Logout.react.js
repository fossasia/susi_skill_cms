import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isProduction } from '../../utils';
import appActions from '../../redux/actions/app';
import uiActions from '../../redux/actions/ui';

const cookieDomain = isProduction() ? '.susi.ai' : '';

const deleteCookie = function(name, options = {}) {
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
    const { actions, history } = this.props;
    actions.logout().then(() => {
      actions.openSnackBar({
        snackBarMessage: 'You have logged out successfully',
        snackBarDuration: 4000,
      });
    });
    deleteCookie('loggedIn', { domain: cookieDomain, path: '/' });
    deleteCookie('serverUrl', { domain: cookieDomain, path: '/' });
    deleteCookie('emailId', { domain: cookieDomain, path: '/' });
    deleteCookie('username', { domain: cookieDomain, path: '/' });
    history.push('/');
  }
  render() {
    return null;
  }
}

Logout.propTypes = {
  history: PropTypes.object,
  actions: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...appActions, ...uiActions }, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Logout);
