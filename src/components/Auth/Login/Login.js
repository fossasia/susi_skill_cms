import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './Login.css';
import PasswordField from 'material-ui-password-field';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import Cookies from 'universal-cookie';
import urls from '../../../Utils/urls';
import CircularProgress from 'material-ui/CircularProgress';
import colors from '../../../Utils/colors';
import { isProduction } from '../../../Utils/helperFunctions';
import Dialog from 'material-ui/Dialog';
const cookies = new Cookies();

const urlPropsQueryConfig = {
  token: { type: UrlQueryParamTypes.string },
};

const cookieDomain = isProduction() ? '.susi.ai' : '';

class Login extends Component {
  static propTypes = {
    // URL props are automatically decoded and passed in based on the config
    token: PropTypes.string,
    // change handlers are automatically generated when given a config.
    // By default they update that single query parameter and maintain existing
    // values in the other parameters.
    onChangeToken: PropTypes.func,
  };

  static defaultProps = {
    token: 'null',
  };
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isFilled: false,
      success: false,
      validForm: false,
      emailError: true,
      passwordError: false,
      checked: false,
      loading: false,
      showDialog: false,
    };
    this.emailErrorMessage = '';
    this.passwordErrorMessage = '';
  }

  componentDidMount() {
    if (cookies.get('loggedIn')) {
      this.props.history.push('/home', { open: false });
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    var email = this.state.email.trim();
    var password = this.state.password.trim();

    let BASE_URL = urls.API_URL;

    if (!email || !password) {
      return this.state.isFilled;
    }

    let validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    let loginEndPoint =
      BASE_URL +
      '/aaa/login.json?type=access-token&login=' +
      this.state.email +
      '&password=' +
      encodeURIComponent(this.state.password);

    if (email && validEmail) {
      this.setState({ loading: true });
      $.ajax({
        url: loginEndPoint,
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(response) {
          if (response.accepted) {
            cookies.set('serverUrl', BASE_URL, {
              path: '/',
              domain: cookieDomain,
            });
            console.log(cookies.get('serverUrl'));
            let accessToken = response.access_token;
            let uuid = response.uuid;
            let state = this.state;
            let time = response.valid_seconds;

            state.isFilled = true;
            state.accessToken = accessToken;
            state.success = true;
            state.msg = response.message;
            state.time = time;
            this.setState(state);

            this.handleOnSubmit(email, accessToken, uuid, time);
            let msg = 'You are logged in';
            state.msg = msg;
            this.setState(state);
          } else {
            let state = this.state;
            state.msg = 'Login Failed. Try Again';
            state.password = '';
            state.showDialog = true;
            this.setState(state);
          }
        }.bind(this),
        error: function(errorThrown) {
          let state = this.state;
          state.msg = 'Login Failed. Try Again';
          state.password = '';
          state.showDialog = true;
          this.setState(state);
        }.bind(this),
        complete: function(jqXHR, textStatus) {
          this.setState({ loading: false });
        }.bind(this),
      });
    }
  };

  handleChange = event => {
    let email;
    let password;
    let state = this.state;

    if (event.target.name === 'email') {
      email = event.target.value.trim();
      let validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
      state.email = email;
      state.emailError = !(email && validEmail);
    } else if (event.target.name === 'password') {
      password = event.target.value;
      let validPassword = password.length >= 6;
      state.password = password;
      state.passwordError = !(password && validPassword);
    }
    if (this.state.emailError) {
      this.emailErrorMessage = 'Enter a valid Email Address';
    } else {
      this.emailErrorMessage = '';
    }
    if (this.state.passwordError) {
      this.passwordErrorMessage = 'Minimum 6 characters required';
    } else {
      this.passwordErrorMessage = '';
    }
    if (
      !state.emailError &&
      !state.passwordError &&
      !state.serverFieldError &&
      this.state.password !== '' &&
      this.state.email !== ''
    ) {
      state.validForm = true;
    } else {
      state.validForm = false;
    }
    this.setState(state);
  };

  handleOnSubmit = (email, loggedIn, uuid, time) => {
    let state = this.state;
    if (state.success) {
      cookies.set('loggedIn', loggedIn, {
        path: '/',
        maxAge: time,
        domain: cookieDomain,
      });
      cookies.set('uuid', uuid, {
        path: '/',
        maxAge: time,
        domain: cookieDomain,
      });
      cookies.set('emailId', this.state.email, {
        path: '/',
        maxAge: time,
        domain: cookieDomain,
      });
      this.props.history.push('/', { showLogin: false });
      window.location.reload();
    } else {
      this.setState({
        error: true,
        accessToken: '',
        success: false,
      });
    }
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleSignUp = () => {
    this.setState({
      email: '',
      password: '',
      isFilled: false,
      success: false,
      validForm: false,
      emailError: true,
      passwordError: true,
      checked: false,
    });
    this.props.onSignUpLogin();
  };

  handleForgotPassword = () => {
    this.setState({
      email: '',
      password: '',
      isFilled: false,
      success: false,
      validForm: false,
      emailError: true,
      passwordError: true,
      checked: false,
    });
    this.props.onForgotPwdLogin();
  };

  handleClose = event => {
    this.setState({ showDialog: false });
  };

  render() {
    const styles = {
      width: '100%',
      textAlign: 'center',
    };

    const fieldStyle = {
      height: '37px',
      borderRadius: 4,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '0px 10px',
      width: '272px',
      marginTop: '10px',
    };

    const passFieldStyle = {
      height: '37px',
      borderRadius: 4,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '0px 10px',
      width: '250px',
      marginTop: '10px',
    };

    const inputStyle = {
      height: '35px',
      marginBottom: '10px',
    };

    const inputpassStyle = {
      height: '35px',
      marginBottom: '10px',
      marginRight: '50px',
      width: '90%',
    };

    const actions = (
      <RaisedButton
        label="OK"
        backgroundColor={colors.header}
        labelStyle={{ color: '#fff' }}
        onTouchTap={this.handleClose}
      />
    );

    return (
      <div className="loginForm">
        <Paper zDepth={0} style={styles}>
          <div id="loginHeading">Log into SUSI</div>
          <form onSubmit={this.handleSubmit}>
            <div style={{ maxHeight: '70px' }}>
              <TextField
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
                style={fieldStyle}
                inputStyle={inputStyle}
                placeholder="Email"
                underlineStyle={{ display: 'none' }}
                errorText={this.emailErrorMessage}
              />
            </div>

            <div style={{ maxHeight: '70px' }}>
              <PasswordField
                name="password"
                style={passFieldStyle}
                inputStyle={inputpassStyle}
                value={this.state.password}
                placeholder="Password"
                underlineStyle={{ display: 'none' }}
                onChange={this.handleChange}
                errorText={this.passwordErrorMessage}
                visibilityButtonStyle={{
                  marginTop: '-3px',
                }}
                visibilityIconStyle={{
                  marginTop: '-3px',
                }}
                textFieldStyle={{ padding: '0px' }}
              />
            </div>

            <RaisedButton
              label={!this.state.loading ? 'Log In' : undefined}
              type="submit"
              backgroundColor="#4285f4"
              labelColor="#fff"
              disabled={!this.state.validForm}
              style={{ width: '275px', margin: '10px 0px' }}
              icon={
                this.state.loading ? <CircularProgress size={24} /> : undefined
              }
            />

            <div className="login-links-section" id="login-links">
              <span className="fgtpwd" onClick={this.handleForgotPassword}>
                Forgot Password?
              </span>
              <span className="signUp" onClick={this.handleSignUp}>
                Sign up for SUSI
              </span>
            </div>
          </form>
        </Paper>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.showDialog}
          onRequestClose={this.handleClose}
        >
          {this.state.msg}
        </Dialog>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
  onForgotPwdLogin: PropTypes.func,
  onSignUpLogin: PropTypes.func,
};

export default addUrlProps({ urlPropsQueryConfig })(Login);
