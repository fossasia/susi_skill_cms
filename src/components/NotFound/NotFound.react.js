import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import './NotFound.css';
import LogoImg from '../../images/susi-logo.svg';
import Login from '../Auth/Login/Login';
import SignUp from '../Auth/SignUp/SignUp';
import Dialog from 'material-ui/Dialog';
import ForgotPassword from '../Auth/ForgotPassword/ForgotPassword';
import Close from 'material-ui/svg-icons/navigation/close';

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
  closingStyleLogin: {
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

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loginOpen: false,
      openForgotPassword: false,
    };
  }
  // Open Sign Up Dialog
  handleOpen = () => {
    this.setState({ open: true });
  };
  // Close all dialog boxes
  handleClose = () => {
    this.setState({
      open: false,
      loginOpen: false,
      openForgotPassword: false,
    });
  };
  // Open Login Dialog
  handleLoginOpen = () => {
    const { accessToken } = this.props;
    if (accessToken) {
      window.location = '/';
    } else {
      this.setState({
        loginOpen: true,
        open: false,
        openForgotPassword: false,
      });
    }
  };
  // Close Login Dialog
  handleLoginClose = () => {
    this.setState({
      loginOpen: false,
    });
  };
  // Close Login Dialog and open Forgot Password dialog
  handleForgotPassword = () => {
    this.setState({
      openForgotPassword: true,
      loginOpen: false,
    });
  };
  render() {
    const { closingStyle, closingStyleLogin, bodyStyle } = styles;
    return (
      <div>
        <div className="container-fluid not-found-banner">
          <h2>
            <a className="susilogo">
              <img src={LogoImg} to={'/'} alt="Page Not Found" />
            </a>
          </h2>
          <h1>404</h1>
          <h2>Page not found</h2>
          <div className="button-wrapper">
            <a href="https://chat.susi.ai/" className="actionButton">
              <RaisedButton
                className="notfound-button"
                label="Chat With SUSI"
                backgroundColor="#4285f4"
                labelColor="#fff"
              />
            </a>
            <br />
            <RaisedButton
              onClick={this.handleOpen}
              className="notfound-button"
              label="SignUp to SUSI"
              backgroundColor="#4285f4"
              labelColor="#fff"
            />
            <br />
            <RaisedButton
              onClick={this.handleLoginOpen}
              className="notfound-button"
              label="LogIn to SUSI"
              backgroundColor="#4285f4"
              labelColor="#fff"
            />
            <br />
          </div>
        </div>
        {/* Login */}
        <Dialog
          className="dialogStyle"
          modal={true}
          open={this.state.loginOpen}
          autoScrollBodyContent={true}
          bodyStyle={bodyStyle}
          contentStyle={{ width: '35%', minWidth: '300px' }}
          onRequestClose={this.handleClose}
        >
          <Login
            {...this.props}
            handleForgotPassword={this.handleForgotPassword}
          />
          <Close style={closingStyleLogin} onClick={this.handleClose} />
        </Dialog>
        {/* SignUp */}
        <Dialog
          className="dialogStyle"
          modal={true}
          open={this.state.open}
          autoScrollBodyContent={true}
          bodyStyle={bodyStyle}
          contentStyle={{ width: '35%', minWidth: '300px' }}
          onRequestClose={this.handleClose}
        >
          <SignUp
            {...this.props}
            onRequestClose={this.handleClose}
            onLoginSignUp={this.handleLoginOpen}
          />
          <Close style={closingStyle} onClick={this.handleClose} />
        </Dialog>
        <Dialog
          className="dialogStyle"
          modal={false}
          open={this.state.openForgotPassword}
          autoScrollBodyContent={true}
          contentStyle={{ width: '35%', minWidth: '300px' }}
          onRequestClose={this.handleClose}
        >
          <ForgotPassword
            {...this.props}
            showForgotPassword={this.showForgotPassword}
          />
          <Close style={closingStyle} onClick={this.handleClose} />
        </Dialog>
      </div>
    );
  }
}

NotFound.propTypes = {
  accessToken: PropTypes.string,
};

function mapStateToProps(store) {
  return {
    accessToken: store.app.accessToken,
  };
}

export default connect(
  mapStateToProps,
  null,
)(NotFound);
