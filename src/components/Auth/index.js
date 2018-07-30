import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Login from './Login/Login.js';
import SignUp from './SignUp/SignUp.js';

/* Material-UI*/
import Close from 'material-ui/svg-icons/navigation/close';
import Dialog from 'material-ui/Dialog';
import ForgotPassword from '../Auth/ForgotPassword/ForgotPassword';
import Snackbar from 'material-ui/Snackbar';

const styles = {
  closingStyle: {
    position: 'absolute',
    zIndex: 1200,
    fill: '#444',
    width: '26px',
    height: '26px',
    right: '10px',
    top: '10px',
    cursor: 'pointer',
  },
  bodyStyle: {
    padding: 0,
    textAlign: 'center',
  },
};

class Auth extends Component {
  static propTypes = {
    closeAuth: PropTypes.func,
    showAuth: PropTypes.bool,
    defaultAuthSection: PropTypes.string.isRequired,
    history: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      authDialogSection: props.defaultAuthSection,
      openSnackbar: false,
      message: '',
    };
  }

  updateAuthDialog = authDialogSection => this.setState({ authDialogSection });

  updateMessage = message => this.setState({ message });

  updateSnackbar = message => {
    this.setState({
      openSnackbar: true,
      message,
    });
  };

  render() {
    const { closingStyle, bodyStyle } = styles;
    let { authDialogSection } = this.state;
    let mainContent = null;

    if (authDialogSection === 'login') {
      mainContent = (
        <Login
          updateAuthDialog={this.updateAuthDialog}
          updateSnackbar={this.updateSnackbar}
          history={this.props.history}
        />
      );
    } else if (authDialogSection === 'ForgotPassword') {
      mainContent = (
        <ForgotPassword
          updateAuthDialog={this.updateAuthDialog}
          updateSnackbar={this.updateSnackbar}
          history={this.props.history}
        />
      );
    } else {
      mainContent = (
        <SignUp
          updateAuthDialog={this.updateAuthDialog}
          updateSnackbar={this.updateSnackbar}
          history={this.props.history}
        />
      );
    }

    return (
      <div>
        <Dialog
          modal={false}
          open={this.props.showAuth}
          onRequestClose={this.props.closeAuth}
          autoScrollBodyContent={true}
          bodyStyle={bodyStyle}
          contentStyle={{ width: '35%', minWidth: '300px' }}
        >
          {mainContent}
          <Close style={closingStyle} onTouchTap={this.props.closeAuth} />
        </Dialog>
        <Snackbar
          open={this.state.openSnackbar}
          message={this.state.message}
          autoHideDuration={2000}
          onRequestClose={() => {
            this.setState({ openSnackbar: false });
          }}
        />
      </div>
    );
  }
}

export default Auth;
