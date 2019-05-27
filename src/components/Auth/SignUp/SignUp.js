import React, { Component } from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debounce } from 'lodash';

/* Material-UI */
import PasswordField from 'material-ui-password-field';
import _Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import _CircularProgress from '@material-ui/core/CircularProgress';
import Close from '@material-ui/icons/Close';

/* Utils */
import { isEmail } from '../../../utils';
import Recaptcha from 'react-recaptcha';
import appActions from '../../../redux/actions/app';
import uiActions from '../../../redux/actions/ui';
import { getEmailExists } from '../../../api';
import styled from 'styled-components';

/* CSS */
import './SignUp.css';

const CloseIcon = styled(Close)`
  position: absolute;
  z-index: 1200;
  fill: #444;
  width: 1.625rem;
  height: 1.625rem;
  right: 0.625rem;
  top: 0.625rem;
  cursor: pointer;
`;

const Dialog = styled(_Dialog)`
  text-align: center;
`;

const CircularProgress = styled(_CircularProgress)`
  color: #ffffff;
`;

const Span = styled.span`
  display: inline-block;
  margintop: 0.625rem;
`;

const Div = styled.div`
  width: 19rem;
  margin: 0.625rem auto 0;
`;

const authStyles = {
  fieldStyle: {
    height: '2.5rem',
    borderRadius: 4,
    border: '.0625rem solid #ced4da',
    fontSize: 16,
    padding: '0rem .625rem',
    width: '15.625rem',
    marginTop: '.625rem',
  },
};

class SignUp extends Component {
  static propTypes = {
    history: PropTypes.object,
    openSnackBar: PropTypes.func,
    captchaKey: PropTypes.string,
    actions: PropTypes.object,
    modalProps: PropTypes.object,
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

    this.debouncedIsEmailAvailable = debounce(this.isEmailAvailable, 700);
  }

  closeDialog = () => {
    const { actions } = this.props;
    this.setState({
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
    });
    actions.closeModal();
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

  isEmailAvailable = () => {
    const { email, emailErrorMessage } = this.state;
    if (!emailErrorMessage) {
      getEmailExists({
        email,
      }).then(payload => {
        const { exists } = payload;
        this.setState({
          emailErrorMessage: exists
            ? 'Email ID already taken, please use another account'
            : '',
        });
      });
    }
  };

  handleTextFieldChange = event => {
    switch (event.target.name) {
      case 'email': {
        const email = event.target.value.trim();
        this.setState(
          {
            email,
            emailErrorMessage: !isEmail(email)
              ? 'Enter a valid Email Address'
              : '',
          },
          this.debouncedIsEmailAvailable,
        );
        break;
      }
      case 'password': {
        const { confirmPassword, passwordConfirmErrorMessage } = this.state;
        const password = event.target.value.trim();
        const passwordScore = zxcvbn(password).score;
        const strength = ['Worst', 'Bad', 'Weak', 'Good', 'Strong'];
        const passwordError = !(password.length >= 6 && password);
        const passwordConfirmError =
          (confirmPassword || passwordConfirmErrorMessage) &&
          !(confirmPassword === password);
        this.setState({
          password,
          passwordErrorMessage: passwordError
            ? 'Minimum 6 characters required'
            : '',
          passwordScore: passwordError ? -1 : passwordScore,
          passwordStrength: passwordError ? '' : strength[passwordScore],
          passwordConfirmErrorMessage: passwordConfirmError
            ? 'Password does not match'
            : '',
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
        });
        break;
      }
      default:
        break;
    }
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

    const { getSignup, openSnackBar } = this.props.actions;

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
              snackBarDuration: 4000,
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
          let snackBarMessage;
          if (error.statusCode === 422) {
            snackBarMessage =
              'Already registered. Please signup with a different email account';
          } else {
            snackBarMessage = 'Signup Failed. Try Again';
          }
          openSnackBar({
            snackBarMessage,
            snackBarDuration: 4000,
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
    const { modalProps, actions, captchaKey } = this.props;
    const { fieldStyle } = authStyles;

    const isValid =
      email &&
      !emailErrorMessage &&
      password &&
      !passwordErrorMessage &&
      confirmPassword &&
      !passwordConfirmErrorMessage &&
      (isCaptchaVerified || !captchaKey);

    return (
      <Dialog
        maxWidth={'sm'}
        fullWidth={true}
        open={
          modalProps &&
          modalProps.isModalOpen &&
          modalProps.modalType === 'signUp'
        }
        onClose={actions.closeModal}
      >
        <DialogTitle>Sign Up with SUSI</DialogTitle>
        <DialogContent>
          <div className="signupForm">
            <form onSubmit={this.handleSubmit}>
              <div>
                <FormControl error={emailErrorMessage !== ''}>
                  <OutlinedInput
                    labelWidth={0}
                    name="email"
                    value={email}
                    onChange={this.handleTextFieldChange}
                    aria-describedby="email-error-text"
                    style={{ width: '17rem', height: '2.5rem' }}
                    placeholder="Email"
                  />
                  <FormHelperText error={emailErrorMessage !== ''}>
                    {emailErrorMessage}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className={`is-strength-${passwordScore}`}>
                <FormControl error={passwordErrorMessage !== ''}>
                  <PasswordField
                    name="password"
                    style={fieldStyle}
                    value={password}
                    placeholder="Password"
                    onChange={this.handleTextFieldChange}
                  />
                  <FormHelperText error={passwordErrorMessage !== ''}>
                    {passwordErrorMessage}
                  </FormHelperText>
                </FormControl>
                <div className="ReactPasswordStrength-strength-bar" />
                <div>
                  <p>{this.state.passwordStrength}</p>
                </div>
              </div>
              <div>
                <FormControl error={passwordConfirmErrorMessage !== ''}>
                  <PasswordField
                    name="confirmPassword"
                    style={fieldStyle}
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={this.handleTextFieldChange}
                  />
                  <FormHelperText error={passwordConfirmErrorMessage !== ''}>
                    {passwordConfirmErrorMessage}
                  </FormHelperText>
                </FormControl>
              </div>
              <Div>
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
              </Div>
              {signupErrorMessage && (
                <div style={{ color: success ? '#388e3c' : '#f44336' }}>
                  {signupErrorMessage}
                </div>
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!isValid || loading}
                style={{
                  width: '17.1875rem',
                  margin: '.625rem 0rem',
                }}
              >
                {loading && <CircularProgress size={24} />}{' '}
                {!loading && 'Sign Up'}
              </Button>

              <Span
                className="loginLinks"
                onClick={() => actions.openModal({ modalType: 'login' })}
              >
                Already have an account? Login here
              </Span>
            </form>
          </div>
        </DialogContent>
        <CloseIcon onClick={this.closeDialog} />
      </Dialog>
    );
  }
}

function mapStateToProps(store) {
  const { captchaKey } = store.app.apiKeys;
  return {
    captchaKey,
    ...store.ui,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...appActions, ...uiActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
