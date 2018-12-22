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
    switch (event.target.name) {
      case 'email': {
        const email = event.target.value.trim();
        this.setState({
          email,
          emailErrorMessage: !isEmail(email)
            ? 'Enter a valid Email Address'
            : '',
        });
        break;
      }
      case 'password': {
        const password = event.target.value.trim();
        const passwordScore = zxcvbn(password).score;
        const strength = ['Worst', 'Bad', 'Weak', 'Good', 'Strong'];
        const passwordError = !(password.length >= 6 && password);
        this.setState({
          password,
          passwordErrorMessage: passwordError
            ? 'Minimum 6 characters required'
            : '',
          passwordScore: passwordError ? -1 : passwordScore,
          passwordStrength: passwordError ? '' : strength[passwordScore],
        });
        break;
      }
      case 'confirmPassword': {
        const { password } = this.state;
        const confirmPassword = event.target.value;
        const passwordConfirmError = !(
          confirmPassword === password && confirmPassword
        );
        this.setState({
          confirmPassword,
          passwordConfirmErrorMessage: passwordConfirmError
            ? 'Password does not match'
            : '',
        });
        break;
      }
      default:
        break;
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      email,
      password,
      emailError,
      passwordConfirmError,
      isCaptchaVerified,
    } = this.state;
    const { openSnackBar } = this.props;
    const { getSignup } = this.props.actions;

    if (!isCaptchaVerified) {
      this.setState({
        captchaVerifyErrorMessage: 'Please verify that you are a human.',
      });
    }

    if (!emailError && !passwordConfirmError && isCaptchaVerified) {
      this.setState({ loading: true });
      getSignup({
        email,
        password: encodeURIComponent(password),
      })
        .then(({ payload }) => {
          if (payload.accepted) {
            this.setState(
              {
                success: true,
                loading: false,
              },
              () => {
                openSnackBar({ snackBarMessage: payload.message });
                this.closeDialog();
              },
            );
          } else {
            this.setState(
              {
                password: '',
                confirmPassword: '',
                passwordScore: -1,
                passwordStrength: '',
                success: false,
                loading: false,
              },
              () => {
                openSnackBar({ snackBarMessage: 'Failed. Try Again' });
              },
            );
          }
        })
        .catch(error => {
          console.log(error);
          this.setState(
            {
              success: false,
              password: '',
              confirmPassword: '',
              passwordScore: -1,
              passwordStrength: '',
              loading: false,
            },
            () => {
              openSnackBar({ snackBarMessage: 'Signup Failed. Try Again' });
            },
          );
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
      loading,
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
