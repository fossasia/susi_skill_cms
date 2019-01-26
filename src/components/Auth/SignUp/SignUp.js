import React, { Component } from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Material-UI */
import PasswordField from 'material-ui-password-field';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import Close from 'material-ui/svg-icons/navigation/close';

/* Utils */
import { colors, isEmail } from '../../../utils';
import Recaptcha from 'react-recaptcha';
import actions from '../../../redux/actions/app';

/* CSS */
import './SignUp.css';

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
  bodyStyle: {
    padding: 0,
    textAlign: 'center',
  },
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
};

class SignUp extends Component {
  static propTypes = {
    history: PropTypes.object,
    openSnackBar: PropTypes.func,
    captchaKey: PropTypes.string,
    actions: PropTypes.object,
    onRequestCloseDialog: PropTypes.func,
    onRequestOpenLogin: PropTypes.func,
    isSignUpOpen: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailErrorMessage: '',
      password: '',
      passwordErrorMessage: '',
      confirmPassword: '',
      passwordConfirmErrorMessage: '',
      passwordStrength: '',
      passwordScore: -1,
      success: false,
      isCaptchaVerified: false,
      captchaVerifyErrorMessage: '',
      loading: false,
    };
  }

  closeDialog = () => {
    const { onRequestCloseDialog } = this.props;
    this.setState(
      {
        email: '',
        emailErrorMessage: '',
        password: '',
        passwordErrorMessage: '',
        confirmPassword: '',
        passwordConfirmErrorMessage: '',
        passwordStrength: '',
        passwordScore: -1,
        success: false,
        isCaptchaVerified: false,
        captchaVerifyErrorMessage: '',
        loading: false,
      },
      () => {
        onRequestCloseDialog();
      },
    );
  };

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

  handleTextFieldChange = event => {
    let {
      email,
      passwordValue,
      confirmPasswordValue,
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
    } = this.state;

    // eslint-disable-next-line
    switch (event.target.name) {
      case 'email':
        email = event.target.value.trim();
        if (!isEmail(email)) {
          emailErrorMessage = 'Enter a valid Email Address';
        } else {
          emailErrorMessage = '';
        }
        break;

      case 'password':
        passwordValue = event.target.value;
        validPassword = passwordValue.length >= 6;
        let validConfirmPassword = confirmPasswordValue.length >= 1;
        passwordError = !(passwordValue && validPassword);
        passwordConfirmError = !(
          passwordValue === this.state.confirmPasswordValue
        );
        if (passwordError) {
          passwordErrorMessage = 'Minimum 6 characters required';
        } else {
          passwordErrorMessage = '';
        }
        if (passwordConfirmError && validConfirmPassword) {
          passwordConfirmErrorMessage = 'Check your password again';
        } else {
          passwordConfirmErrorMessage = '';
        }
        if (validPassword) {
          let result = zxcvbn(passwordValue);
          passwordScore = result.score;
          let strength = ['Worst', 'Bad', 'Weak', 'Good', 'Strong'];
          passwordStrength = strength[result.score];
        } else {
          passwordStrength = '';
          passwordScore = -1;
        }
        break;

      case 'confirmPassword':
        confirmPasswordValue = event.target.value;
        // let validConfirmPasswordLength = confirmPasswordValue.length >= 6;
        validPassword = confirmPasswordValue === passwordValue;
        passwordConfirmError = !(validPassword && confirmPasswordValue);
        // if (passwordConfirmError && validConfirmPasswordLength) {
        //   passwordConfirmErrorMessage = 'Check your password again';
        // } else {
        //   passwordConfirmErrorMessage = '';
        // }
        if (passwordConfirmError) {
          passwordConfirmErrorMessage = 'Check your password again';
        } else {
          passwordConfirmErrorMessage = '';
        }
        break;
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
    this.setState({
      signupErrorMessage: '',
    });

    const {
      email,
      password,
      emailErrorMessage,
      passwordConfirmErrorMessage,
      isCaptchaVerified,
    } = this.state;

    const { openSnackBar } = this.props;
    const { getSignup } = this.props.actions;

    if (!isCaptchaVerified) {
      this.setState({
        captchaVerifyErrorMessage: 'Please verify that you are a human.',
      });
    }

    if (
      !emailErrorMessage &&
      !passwordConfirmErrorMessage &&
      isCaptchaVerified
    ) {
      this.setState({ loading: true });
      getSignup({
        email,
        password: encodeURIComponent(password),
      })
        .then(({ payload }) => {
          if (payload.accepted) {
            this.setState({
              password: '',
              confirmPassword: '',
              passwordStrength: '',
              passwordScore: -1,
              signupErrorMessage: payload.message,
              success: true,
              loading: false,
            });
          } else {
            this.setState({
              password: '',
              confirmPassword: '',
              passwordScore: -1,
              passwordStrength: '',
              success: false,
              loading: false,
            });
            openSnackBar({
              snackBarMessage: 'Signup Failed. Try Again',
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({
            confirmPassword: '',
            passwordScore: -1,
            passwordStrength: '',
            success: false,
            password: '',
            loading: false,
          });
          openSnackBar({
            snackBarMessage: 'Signup Failed. Try Again',
          });
        });
    }
  };

  render() {
    const {
      email,
      password,
      passwordErrorMessage,
      emailErrorMessage,
      isCaptchaVerified,
      captchaVerifyErrorMessage,
      confirmPassword,
      passwordConfirmErrorMessage,
      signupErrorMessage,
      loading,
      success,
      passwordScore,
    } = this.state;
    const { captchaKey, onRequestOpenLogin, isSignUpOpen } = this.props;
    const {
      bodyStyle,
      emailStyle,
      inputStyle,
      fieldStyle,
      inputpassStyle,
      closingStyle,
    } = styles;

    const isValid =
      email &&
      !emailErrorMessage &&
      password &&
      !passwordErrorMessage &&
      confirmPassword &&
      !passwordConfirmErrorMessage &&
      isCaptchaVerified;

    return (
      <Dialog
        modal={false}
        open={isSignUpOpen}
        onRequestClose={this.closeDialog}
        autoScrollBodyContent={true}
        bodyStyle={bodyStyle}
        contentStyle={{ width: '35%', minWidth: '300px' }}
      >
        <div className="signupForm">
          <div>Sign Up with SUSI</div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <TextField
                name="email"
                type="email"
                value={email}
                onChange={this.handleTextFieldChange}
                style={emailStyle}
                inputStyle={inputStyle}
                underlineStyle={{ display: 'none' }}
                placeholder="Email"
                errorText={emailErrorMessage}
              />
            </div>
            <div className={`is-strength-${passwordScore}`}>
              <PasswordField
                name="password"
                style={fieldStyle}
                inputStyle={inputpassStyle}
                value={password}
                placeholder="Password"
                underlineStyle={{ display: 'none' }}
                onChange={this.handleTextFieldChange}
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
                style={fieldStyle}
                inputStyle={inputpassStyle}
                value={confirmPassword}
                placeholder="Confirm Password"
                underlineStyle={{ display: 'none' }}
                onChange={this.handleTextFieldChange}
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
              {captchaKey && (
                <Recaptcha
                  sitekey={captchaKey}
                  render="explicit"
                  onloadCallback={this.onCaptchaLoad}
                  verifyCallback={this.verifyCaptchaCallback}
                  badge="inline"
                  type="audio"
                  size="normal"
                />
              )}
              {!isCaptchaVerified &&
                captchaVerifyErrorMessage && (
                  <p className="error-message">{captchaVerifyErrorMessage}</p>
                )}
            </div>
            {signupErrorMessage && (
              <div style={{ color: success ? '#388e3c' : '#f44336' }}>
                {signupErrorMessage}
              </div>
            )}
            <div>
              <RaisedButton
                label={!loading && 'Sign Up'}
                type="submit"
                disabled={!isValid || loading}
                backgroundColor={colors.header}
                labelColor="#fff"
                style={{ width: '275px', margin: '10px 0px' }}
                icon={loading && <CircularProgress size={24} />}
              />
            </div>

            <span
              style={{
                display: 'inline-block',
                marginTop: '10px',
              }}
              className="loginLinks"
              onClick={onRequestOpenLogin}
            >
              Already have an account? Login here
            </span>
          </form>
        </div>
        <Close style={closingStyle} onClick={this.closeDialog} />
      </Dialog>
    );
  }
}

function mapStateToProps(store) {
  const { captchaKey } = store.app.apiKeys;
  return {
    captchaKey,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
