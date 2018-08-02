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
    defaultAuthSection: PropTypes.string.isRequired,
    updateParentOpenState: PropTypes.func,
    history: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      authDialogSection: props.defaultAuthSection || 'login',
      openSnackbar: false,
      message: '',
      showAuth: true,
    };
  }

  componentWillUnmount = () => {
    this.setState({ showAuth: false });
  };

  updateAuthDialog = authDialogSection => this.setState({ authDialogSection });

  requestAuthClose = () => {
    const { updateParentOpenState } = this.props;

    this.setState({ showAuth: false }, () => {
      updateParentOpenState && updateParentOpenState();
    });
  };

  updateMessage = message => this.setState({ message });

  updateSnackbar = message => {
    this.setState({
      openSnackbar: true,
      message,
    });
  };

  render() {
    const { closingStyle, bodyStyle } = styles;
    let { authDialogSection, showAuth } = this.state;
    let mainContent = null;

    if (authDialogSection === 'login') {
      mainContent = (
        <Login
          updateAuthDialog={this.updateAuthDialog}
          updateSnackbar={this.updateSnackbar}
          closeDialog={this.requestAuthClose}
          history={this.props.history}
        />
      );
    } else if (authDialogSection === 'forgotPassword') {
      mainContent = (
        <ForgotPassword
          updateAuthDialog={this.updateAuthDialog}
          updateSnackbar={this.updateSnackbar}
          closeDialog={this.requestAuthClose}
          history={this.props.history}
        />
      );
    } else {
      mainContent = (
        <SignUp
          updateAuthDialog={this.updateAuthDialog}
          updateSnackbar={this.updateSnackbar}
          closeDialog={this.requestAuthClose}
          history={this.props.history}
        />
      );
    }

    return (
      <div>
        {showAuth && (
          <Dialog
            modal={false}
            open={showAuth}
            onRequestClose={this.requestAuthClose}
            autoScrollBodyContent={true}
            bodyStyle={bodyStyle}
            contentStyle={{ width: '35%', minWidth: '300px' }}
          >
            {mainContent}
            <Close style={closingStyle} onClick={this.requestAuthClose} />
          </Dialog>
        )}
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
