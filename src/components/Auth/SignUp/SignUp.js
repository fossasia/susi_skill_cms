import React, { Component } from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';

/* Material-UI */
import PasswordField from 'material-ui-password-field';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/* Utils */
import $ from 'jquery';
import Cookies from 'universal-cookie';
import { colors, urls } from '../../../utils';
import Recaptcha from 'react-recaptcha';
import KEY from '../../../utils/config';

/* CSS */
import './SignUp.css';

const cookies = new Cookies();

export default class SignUp extends Component {
  static propTypes = {
    history: PropTypes.object,
    updateAuthDialog: PropTypes.func,
    updateSnackbar: PropTypes.func,
    closeDialog: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      isEmail: false,
      emailError: true,
      emailErrorMessage: '',
      passwordValue: '',
      passwordError: true,
      passwordErrorMessage: '',
      passwordConfirmError: true,
      confirmPasswordValue: '',
      passwordConfirmErrorMessage: '',
      passwordStrength: '',
      passwordScore: -1,
      success: false,
      open: false,
      openLogin: false,
      openForgotPassword: false,
      isCaptchaVerified: false,
      captchaVerifyErrorMessage: '',
      validForm: false,
      serverUrl: '',
      msgOpen: false,
      serverFieldError: false,
    };

    if (cookies.get('loggedIn')) {
      window.location.reload();
    }
  }

  onCaptchaLoad = () => {
    this.setState({
      isCaptchaVerified: false,
      captchaVerifyErrorMessage: '',
    });
  };

  verifyCaptchaCallback = response => {
    if (response) {
      this.setState({
        isCaptchaVerified: true,
        captchaVerifyErrorMessage: '',
      });
    }
  };

  handleChange = event => {
    let {
      email,
      passwordValue,
      confirmPasswordValue,
      isEmail,
      emailError,
      validPassword,
      passwordError,
      passwordConfirmError,
      emailErrorMessage,
      passwordErrorMessage,
      passwordConfirmErrorMessage,
      validForm,
      passwordStrength,
      passwordScore,
      isCaptchaVerified,
      // eslint-disable-next-line
      captchaVerifyErrorMessage,
    } = this.state;

    if (event.target.name === 'email') {
      email = event.target.value.trim();
      isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
      emailError = !(email && isEmail);
    } else if (event.target.name === 'password') {
      passwordValue = event.target.value;
      validPassword = passwordValue.length >= 6 && passwordValue.length <= 64;
      passwordError = !(passwordValue && validPassword);
      passwordConfirmError = !(
        passwordValue === this.state.confirmPasswordValue
      );
      if (validPassword) {
        let result = zxcvbn(passwordValue);
        passwordScore = result.score;
        let strength = ['Worst', 'Bad', 'Weak', 'Good', 'Strong'];
        passwordStrength = strength[result.score];
      } else {
        passwordStrength = '';
        passwordScore = -1;
      }
    } else if (event.target.name === 'confirmPassword') {
      confirmPasswordValue = event.target.value;
      validPassword = confirmPasswordValue === passwordValue;
      passwordConfirmError = !(validPassword && confirmPasswordValue);
    }

    if (emailError) {
      emailErrorMessage = 'Enter a valid Email Address';
    } else if (passwordError) {
      emailErrorMessage = '';
      passwordErrorMessage = 'Allowed password length is 6 to 64 characters';
      passwordConfirmErrorMessage = '';
      captchaVerifyErrorMessage = '';
    } else if (passwordConfirmError) {
      emailErrorMessage = '';
      passwordErrorMessage = '';
      passwordConfirmErrorMessage = 'Check your password again';
      captchaVerifyErrorMessage = '';
    } else if (!isCaptchaVerified) {
      emailErrorMessage = '';
      passwordErrorMessage = '';
      passwordConfirmErrorMessage = '';
      captchaVerifyErrorMessage = 'Please confirm you are a human';
    } else {
      emailErrorMessage = '';
      passwordErrorMessage = '';
      passwordConfirmErrorMessage = '';
      captchaVerifyErrorMessage = '';
    }

    if (!emailError && !passwordError && !passwordConfirmError) {
      validForm = true;
    } else {
      validForm = false;
    }

    this.setState({
      email,
      passwordValue,
      confirmPasswordValue,
      isEmail,
      emailError,
      validPassword,
      passwordError,
      passwordConfirmError,
      emailErrorMessage,
      passwordErrorMessage,
      passwordConfirmErrorMessage,
      validForm,
      passwordStrength,
      passwordScore,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const {
      email,
      passwordValue,
      emailError,
      passwordConfirmError,
      isCaptchaVerified,
    } = this.state;
    const { updateSnackbar, closeDialog } = this.props;

    let API_ENDPOINT = `${
      urls.API_URL
    }/aaa/signup.json?signup=${email}&password=${encodeURIComponent(
      passwordValue,
    )}`;
    let message = '';
    let success = false;

    if (!isCaptchaVerified) {
      this.setState({
        captchaVerifyErrorMessage: 'Please verify that you are a human.',
      });
    }

    if (!emailError && !passwordConfirmError && isCaptchaVerified) {
      $.ajax({
        url: API_ENDPOINT,
        dataType: 'jsonp',
        crossDomain: true,
        timeout: 3000,
        async: false,
        statusCode: {
          422: function() {
            message = 'Email already taken. Please try with another email.';
            updateSnackbar && updateSnackbar(message);
          },
        },
        success: function(response) {
          message = response.message;
          success = true;
          this.setState(
            {
              message,
              success,
            },
            () => {
              updateSnackbar && updateSnackbar(message);
              closeDialog && closeDialog();
            },
          );
        }.bind(this),
        error: function(jqXHR, textStatus, errorThrown) {
          const jsonValue = jqXHR.status;
          if (jsonValue === 404) {
            message = 'Email already taken. Please try with another email.';
          } else {
            message = 'Failed. Try Again';
          }
          success = false;
          this.setState({ message, success }, () => {
            updateSnackbar && updateSnackbar(message);
          });
        }.bind(this),
      });
    }
  };

  // Open Login Dialog
  handleLogin = () => this.props.updateAuthDialog('login');

  render() {
    const styles = {
      emailStyle: {
        height: '35px',
        borderRadius: 4,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '0px 10px',
        width: '272px',
        marginTop: '10px',
      },
      fieldStyle: {
        height: '35px',
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
      inputpassStyle: {
        height: '35px',
        marginBottom: '10px',
        marginRight: '50px',
        width: '90%',
        webkitTextFillColor: 'unset',
      },
    };

    const PasswordClass = [`is-strength-${this.state.passwordScore}`];

    const {
      email,
      passwordValue,
      passwordErrorMessage,
      emailErrorMessage,
      validForm,
      isCaptchaVerified,
      captchaVerifyErrorMessage,
      confirmPasswordValue,
      passwordConfirmErrorMessage,
    } = this.state;

    return (
      <div className="signupForm">
        <div>Sign Up with SUSI</div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField
              name="email"
              type="email"
              value={email}
              onChange={this.handleChange}
              style={styles.emailStyle}
              inputStyle={styles.inputStyle}
              labelText={{ color: '#878faf' }}
              underlineStyle={{ display: 'none' }}
              placeholder="Email"
              errorText={emailErrorMessage}
            />
          </div>
          <div className={PasswordClass.join(' ')}>
            <PasswordField
              name="password"
              style={styles.fieldStyle}
              inputStyle={styles.inputpassStyle}
              value={passwordValue}
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
            <div className="ReactPasswordStrength-strength-bar" />
            <div>
              <p>{this.state.passwordStrength}</p>
            </div>
          </div>
          <div>
            <PasswordField
              name="confirmPassword"
              style={styles.fieldStyle}
              inputStyle={styles.inputpassStyle}
              value={confirmPasswordValue}
              placeholder="Confirm Password"
              underlineStyle={{ display: 'none' }}
              onChange={this.handleChange}
              errorText={passwordConfirmErrorMessage}
              visibilityButtonStyle={{
                marginTop: '-3px',
              }}
              visibilityIconStyle={{
                marginTop: '-3px',
              }}
              textFieldStyle={{ padding: '0px' }}
            />
          </div>
          <div style={{ width: '304px', margin: '10px auto 0' }}>
            <Recaptcha
              sitekey={KEY.CAPTCHA_KEY}
              render="explicit"
              onloadCallback={this.onCaptchaLoad}
              verifyCallback={this.verifyCaptchaCallback}
              badge="inline"
              type="audio"
              size="normal"
            />
            {!isCaptchaVerified &&
              captchaVerifyErrorMessage && (
                <p className="error-message">{captchaVerifyErrorMessage}</p>
              )}
          </div>
          <div>
            <RaisedButton
              label="Sign Up"
              type="submit"
              disabled={!validForm || !isCaptchaVerified}
              backgroundColor={colors.header}
              labelColor="#fff"
              style={{ width: '275px', margin: '10px 0px' }}
            />
          </div>

          <span
            style={{
              display: 'inline-block',
              marginTop: '10px',
            }}
            className="loginLinks"
            onClick={this.handleLogin}
          >
            Already have an account? Login here
          </span>
        </form>
      </div>
    );
  }
}
