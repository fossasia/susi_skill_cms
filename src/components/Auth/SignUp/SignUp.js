import React, { Component } from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Material-UI */
import PasswordField from 'material-ui-password-field';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

/* Utils */
import Cookies from 'universal-cookie';
import { colors, isEmail } from '../../../utils';
import Recaptcha from 'react-recaptcha';
import actions from '../../../redux/actions/app';

/* CSS */
import './SignUp.css';

const cookies = new Cookies();

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

class SignUp extends Component {
  static propTypes = {
    history: PropTypes.object,
    updateAuthDialog: PropTypes.func,
    updateSnackbar: PropTypes.func,
    closeDialog: PropTypes.func,
    captchaKey: PropTypes.string,
    actions: PropTypes.object,
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

  handleTextFieldChange = event => {
    switch (event.target.name) {
      case 'email': {
        const email = event.target.value.trim();
        this.setState({
          email,
          emailErrorMessage: !isEmail(email)
            ? 'Enter a valid Email Address'
            : '',
          signupErrorMessage: '',
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
          signupErrorMessage: '',
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
          signupErrorMessage: '',
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
    const { updateSnackbar, closeDialog } = this.props;
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
                signupErrorMessage: payload.message,
                success: true,
                loading: false,
              },
              () => {
                updateSnackbar && updateSnackbar(payload.message);
                closeDialog && closeDialog();
              },
            );
          } else {
            this.setState(
              {
                signupErrorMessage: 'Failed. Try Again',
                password: '',
                confirmPassword: '',
                passwordScore: -1,
                passwordStrength: '',
                success: false,
                loading: false,
              },
              () => {
                updateSnackbar && updateSnackbar('Failed. Try Again');
                closeDialog && closeDialog();
              },
            );
          }
        })
        .catch(error => {
          console.log(error);
          this.setState(
            {
              signupErrorMessage: 'Signup Failed. Try Again',
              success: false,
              password: '',
              confirmPassword: '',
              passwordScore: -1,
              passwordStrength: '',
              loading: false,
            },
            () => {
              updateSnackbar && updateSnackbar('Signup Failed. Try Again');
            },
          );
        });
    }
  };

  // Open Login Dialog
  handleLogin = () => this.props.updateAuthDialog('login');

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
    const { captchaKey } = this.props;

    const isValid =
      email &&
      !emailErrorMessage &&
      password &&
      !passwordErrorMessage &&
      confirmPassword &&
      !passwordConfirmErrorMessage &&
      isCaptchaVerified;

    const PasswordClass = [`is-strength-${passwordScore}`];

    return (
      <div className="signupForm">
        <div>Sign Up with SUSI</div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField
              name="email"
              type="email"
              value={email}
              onChange={this.handleTextFieldChange}
              style={styles.emailStyle}
              inputStyle={styles.inputStyle}
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
              style={styles.fieldStyle}
              inputStyle={styles.inputpassStyle}
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
            onClick={this.handleLogin}
          >
            Already have an account? Login here
          </span>
        </form>
      </div>
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
