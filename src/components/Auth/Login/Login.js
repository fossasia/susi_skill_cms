import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Material-UI */
import CircularProgress from 'material-ui/CircularProgress';
import PasswordField from 'material-ui-password-field';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/* Utils */
import $ from 'jquery';
import Cookies from 'universal-cookie';
import { urls, isProduction } from '../../../utils';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';

/* CSS */
import './Login.css';

const cookies = new Cookies();
const cookieDomain = isProduction() ? '.susi.ai' : '';

const urlPropsQueryConfig = {
  token: { type: UrlQueryParamTypes.string },
};

const styles = {
  fieldStyle: {
    height: '37px',
    borderRadius: 4,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '0px 10px',
    width: '272px',
    marginTop: '10px',
  },
  passwordFieldStyle: {
    height: '37px',
    borderRadius: 4,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '0px 10px',
    width: '250px',
    marginTop: '10px',
  },
  inputStyle: {
    height: '35px',
    marginBottom: '10px',
    webkitTextFillColor: 'unset',
  },
  inputPasswordStyle: {
    height: '35px',
    marginBottom: '10px',
    marginRight: '50px',
    width: '90%',
    webkitTextFillColor: 'unset',
  },
};

class Login extends Component {
  static propTypes = {
    // URL props are automatically decoded and passed in based on the config
    token: PropTypes.string,
    // change handlers are automatically generated when given a config.
    // By default they update that single query parameter and maintain existing
    // values in the other parameters.
    onChangeToken: PropTypes.func,
    history: PropTypes.object,
    updateAuthDialog: PropTypes.func,
    updateSnackbar: PropTypes.func,
    closeDialog: PropTypes.func,
  };

  static defaultProps = {
    token: 'null',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      success: false,
      validForm: false,
      emailError: true,
      passwordError: false,
      checked: false,
      loading: false,
      showDialog: false,
      emailErrorMessage: '',
      passwordErrorMessage: '',
    };
  }

  componentDidMount() {
    if (cookies.get('loggedIn')) {
      this.props.history.push('/home', { open: false });
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    let { email, password, validEmail } = this.state;
    const { updateSnackbar, closeDialog } = this.props;
    let BASE_URL = urls.API_URL;

    email = email.trim();
    password = password.trim();

    if (!email || !password) {
      return;
    }

    let loginEndPoint =
      BASE_URL +
      '/aaa/login.json?type=access-token&login=' +
      this.state.email +
      '&password=' +
      encodeURIComponent(this.state.password);
    validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

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
            let accessToken = response.access_token;
            let uuid = response.uuid;
            let time = response.valid_seconds;
            let success = true;
            this.setState({ accessToken, time, success });
            this.setCookies(email, accessToken, uuid, time);
            let message = 'You are logged in';
            updateSnackbar && updateSnackbar(message);
            closeDialog && closeDialog();
          } else {
            password = '';
            let message = 'Login Failed. Try Again';
            this.setState({ password });
            updateSnackbar && updateSnackbar(message);
          }
        }.bind(this),
        error: function(errorThrown) {
          password = '';
          let message = 'Login Failed. Try Again';
          this.setState({ password });
          updateSnackbar && updateSnackbar(message);
        }.bind(this),
        complete: function(jqXHR, textStatus) {
          this.setState({ loading: false });
        }.bind(this),
      });
    }
  };

  handleChange = event => {
    let {
      email,
      password,
      validEmail,
      validPassword,
      emailError,
      passwordError,
      emailErrorMessage,
      passwordErrorMessage,
      validForm,
    } = this.state;

    if (event.target.name === 'email') {
      email = event.target.value.trim();
      validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
      emailError = !(email && validEmail);
    } else if (event.target.name === 'password') {
      password = event.target.value;
      validPassword = password.length >= 6;
      passwordError = !(password && validPassword);
    }

    if (emailError) {
      emailErrorMessage = 'Enter a valid Email Address';
    } else {
      emailErrorMessage = '';
    }
    if (passwordError) {
      passwordErrorMessage = 'Minimum 6 characters required';
    } else {
      passwordErrorMessage = '';
    }
    if (!emailError && !passwordError && password !== '' && email !== '') {
      validForm = true;
    } else {
      validForm = false;
    }

    this.setState({
      email,
      password,
      validEmail,
      validPassword,
      emailError,
      passwordError,
      emailErrorMessage,
      passwordErrorMessage,
      validForm,
    });
  };

  setCookies = (email, loggedIn, uuid, time) => {
    let { success } = this.state;
    if (success) {
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
      this.props.history.push('/');
      window.location.reload();
    } else {
      this.setState({
        error: true,
        accessToken: '',
        success: false,
      });
    }
  };

  handleSignUp = () => this.props.updateAuthDialog('signup');

  handleForgotPassword = () => this.props.updateAuthDialog('forgotPassword');

  render() {
    const {
      fieldStyle,
      passwordFieldStyle,
      inputStyle,
      inputPasswordStyle,
    } = styles;
    const {
      email,
      password,
      passwordErrorMessage,
      emailErrorMessage,
      loading,
      validForm,
    } = this.state;

    return (
      <div className="loginForm">
        <div id="loginHeading">Log into SUSI</div>
        <form onSubmit={this.handleSubmit}>
          <div style={{ maxHeight: '70px' }}>
            <TextField
              name="email"
              type="email"
              value={email}
              onChange={this.handleChange}
              style={fieldStyle}
              inputStyle={inputStyle}
              placeholder="Email"
              underlineStyle={{ display: 'none' }}
              errorText={emailErrorMessage}
            />
          </div>

          <div style={{ maxHeight: '70px' }}>
            <PasswordField
              name="password"
              style={passwordFieldStyle}
              inputStyle={inputPasswordStyle}
              value={password}
              placeholder="Password"
              underlineStyle={{ display: 'none' }}
              onChange={this.handleChange}
              errorText={passwordErrorMessage}
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
            label={!loading ? 'Log In' : undefined}
            type="submit"
            backgroundColor="#4285f4"
            labelColor="#fff"
            disabled={!validForm}
            style={{ width: '275px', margin: '10px 0px' }}
            icon={loading ? <CircularProgress size={24} /> : undefined}
          />

          <div className="loginLinksSection" id="loginLinks">
            <span
              className="forgotPassword"
              onClick={this.handleForgotPassword}
            >
              Forgot Password?
            </span>
            <span className="signup" onClick={this.handleSignUp}>
              Sign up for SUSI
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default addUrlProps({ urlPropsQueryConfig })(Login);
