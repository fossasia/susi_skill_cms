import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Material-UI */
import PasswordField from 'material-ui-password-field';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/* Utils */
import $ from 'jquery';
import Cookies from 'universal-cookie';
import { colors, urls } from '../../../utils';

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
      success: false,
      open: false,
      openLogin: false,
      openForgotPassword: false,
      validForm: false,
      serverUrl: '',
      msgOpen: false,
      serverFieldError: false,
    };

    if (cookies.get('loggedIn')) {
      window.location.reload();
    }
  }

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
    } = this.state;

    if (event.target.name === 'email') {
      email = event.target.value.trim();
      isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
      emailError = !(email && isEmail);
    } else if (event.target.name === 'password') {
      passwordValue = event.target.value;
      validPassword = passwordValue.length >= 6;
      passwordError = !(passwordValue && validPassword);
      passwordConfirmError = !(
        passwordValue === this.state.confirmPasswordValue
      );
    } else if (event.target.name === 'confirmPassword') {
      confirmPasswordValue = event.target.value;
      validPassword = confirmPasswordValue === passwordValue;
      passwordConfirmError = !(validPassword && confirmPasswordValue);
    }

    if (emailError) {
      emailErrorMessage = 'Enter a valid Email Address';
    } else if (passwordError) {
      emailErrorMessage = '';
      passwordErrorMessage = 'Minimum 6 characters required';
      passwordConfirmErrorMessage = '';
    } else if (passwordConfirmError) {
      emailErrorMessage = '';
      passwordErrorMessage = '';
      passwordConfirmErrorMessage = 'Check your password again';
    } else {
      emailErrorMessage = '';
      passwordErrorMessage = '';
      passwordConfirmErrorMessage = '';
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
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const {
      email,
      passwordValue,
      emailError,
      passwordConfirmError,
    } = this.state;
    const { updateSnackbar, closeDialog } = this.props;

    let API_ENDPOINT = `${
      urls.API_URL
    }/aaa/signup.json?signup=${email}&password=${encodeURIComponent(
      passwordValue,
    )}`;
    let message = '';
    let success = false;

    if (!emailError && !passwordConfirmError) {
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

    const {
      email,
      passwordValue,
      passwordErrorMessage,
      emailErrorMessage,
      validForm,
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
              className="textFields"
              onChange={this.handleChange}
              style={styles.emailStyle}
              inputStyle={styles.inputStyle}
              labelText={{ color: '#878faf' }}
              underlineStyle={{ display: 'none' }}
              placeholder="Email"
              errorText={emailErrorMessage}
            />
          </div>
          <div>
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
          </div>
          <div>
            <PasswordField
              name="confirmPassword"
              style={styles.fieldStyle}
              className="textFields"
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

          <div>
            <RaisedButton
              label="Sign Up"
              type="submit"
              disabled={!validForm}
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
