import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _Button from '@material-ui/core/Button';
import './NotFound.css';
import LogoImg from '../../images/susi-logo.svg';
import Login from '../Auth/Login/Login';
import SignUp from '../Auth/SignUp/SignUp';
import Dialog from '@material-ui/core/Dialog';
import ForgotPassword from '../Auth/ForgotPassword/ForgotPassword';
import Close from '@material-ui/icons/Close';
import styled from 'styled-components';

const Button = styled(_Button)`
  &&& {
    margin: 0.625rem;
    width: 18.75rem;
  }
`;

const CloseIcon = styled(Close)`
  && {
    position: absolute;
    z-index: 1200;
    fill: #444;
    width: 1.625rem;
    height: 1.625rem;
    right: 0.625rem;
    top: 0.625rem;
    cursor: pointer;
  }
`;

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
              <Button variant="contained" color="primary">
                Chat With SUSI
              </Button>
            </a>
            <br />
            <Button
              onClick={this.handleOpen}
              variant="contained"
              color="primary"
            >
              SignUp to SUSI
            </Button>
            <br />
            <Button
              onClick={this.handleLoginOpen}
              variant="contained"
              color="primary"
            >
              LogIn to SUSI
            </Button>
            <br />
          </div>
        </div>
        {/* Login */}
        <Dialog
          className="dialogStyle"
          open={this.state.loginOpen}
          onClose={this.handleClose}
          aria-labelledby="log-in-dialog"
        >
          <Login
            {...this.props}
            handleForgotPassword={this.handleForgotPassword}
          />
          <CloseIcon onClick={this.handleClose} />
        </Dialog>
        {/* SignUp */}
        <Dialog
          className="dialogStyle"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="sign-up-dialog"
        >
          <SignUp
            {...this.props}
            onRequestClose={this.handleClose}
            onLoginSignUp={this.handleLoginOpen}
          />
          <CloseIcon onClick={this.handleClose} />
        </Dialog>
        <Dialog
          className="dialogStyle"
          open={this.state.openForgotPassword}
          onClose={this.handleClose}
          aria-labelledby="forgot-password-dialog"
        >
          <ForgotPassword
            {...this.props}
            showForgotPassword={this.showForgotPassword}
          />
          <CloseIcon onClick={this.handleClose} />
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
