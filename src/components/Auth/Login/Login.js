// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import _CircularProgress from '@material-ui/core/CircularProgress';
import PasswordField from 'material-ui-password-field';
import _Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import _OutlinedInput from '@material-ui/core/OutlinedInput';
import Cookies from 'universal-cookie';
import Close from '@material-ui/icons/Close';
import { isProduction } from '../../../utils';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import isEmail from '../../../utils/isEmail';
import appActions from '../../../redux/actions/app';
import skillActions from '../../../redux/actions/skills';
import uiActions from '../../../redux/actions/ui';
import styled from 'styled-components';

// Static assets
import './Login.css';

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

const OutlinedInput = styled(_OutlinedInput)`
  width: 17rem;
  height: 2.5rem;
`;

const Dialog = styled(_Dialog)`
  text-align: center;
`;

const Div = styled.div`
  max-height: 4.375rem;
`;

const CircularProgress = styled(_CircularProgress)`
  color: #ffffff;
`;

const authStyles = {
  passwordFieldStyle: {
    height: '2.5rem',
    borderRadius: 4,
    border: '.0625rem solid #ced4da',
    fontSize: 16,
    padding: '0rem .625rem',
    width: '15.625rem',
    marginTop: '.625rem',
  },
};

const cookies = new Cookies();
const cookieDomain = isProduction() ? '.susi.ai' : '';

const urlPropsQueryConfig = {
  token: { type: UrlQueryParamTypes.string },
};

class Login extends Component {
  static propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object,
    openSnackBar: PropTypes.func,
    location: PropTypes.object,
    languageValue: PropTypes.array,
    modalProps: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailErrorMessage: '',
      password: '',
      passwordErrorMessage: '',
      success: false,
      loading: false,
    };
  }

  closeDialog = () => {
    const { actions } = this.props;
    this.setState({
      email: '',
      emailErrorMessage: '',
      password: '',
      passwordErrorMessage: '',
      success: false,
      loading: false,
    });
    actions.closeModal();
  };

  handleSubmit = e => {
    e.preventDefault();
    let { email, password } = this.state;
    const { location, history, actions, languageValue } = this.props;

    if (!email || !password) {
      return;
    }
    if (isEmail(email)) {
      this.setState({ loading: true });
      actions
        .getLogin({ email, password: encodeURIComponent(password) })
        .then(({ payload }) => {
          let snackBarMessage;
          if (payload.accepted) {
            console.log(payload);
            snackBarMessage = payload.message;
            this.setCookies({ ...payload, email });
            // eslint-disable-next-line camelcase
            actions
              // eslint-disable-next-line camelcase
              .getAdmin({ access_token: payload.accessToken })
              // eslint-disable-next-line
              .then(({ payload }) => {
                this.setState({
                  success: true,
                  loading: false,
                });
                this.closeDialog();
                if (location.pathname !== '/') {
                  history.push('/');
                } else {
                  actions.initializeSkillData().then(() => {
                    actions.getLanguageOptions({ groupValue: 'All' });
                    actions.getGroupOptions();
                    actions.getMetricsSkills({
                      languageValue: languageValue,
                    });
                  });
                }
              });
          } else {
            snackBarMessage = 'Login Failed. Try Again';
            this.setState({
              password: '',
              loading: false,
            });
          }
          actions.openSnackBar({ snackBarMessage, snackBarDuration: 4000 });
        })
        .catch(error => {
          console.log(error);
          const message = 'Login Failed. Try Again';
          actions.openSnackBar({
            snackBarMessage: message,
            snackBarDuration: 4000,
          });
          this.setState({
            password: '',
            loading: false,
          });
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
        const passwordError = !(password.length >= 6 && password);
        this.setState({
          password,
          passwordErrorMessage: passwordError
            ? 'Minimum 6 characters required'
            : '',
        });
        break;
      }
      default:
        break;
    }
  };

  setCookies = ({ email, accessToken, uuid, validSeconds }) => {
    cookies.set('loggedIn', accessToken, {
      path: '/',
      maxAge: validSeconds,
      domain: cookieDomain,
    });
    cookies.set('uuid', uuid, {
      path: '/',
      maxAge: validSeconds,
      domain: cookieDomain,
    });
    cookies.set('emailId', email, {
      path: '/',
      maxAge: validSeconds,
      domain: cookieDomain,
    });
    this.props.history.push('/');
  };

  render() {
    const { passwordFieldStyle } = authStyles;
    const {
      email,
      password,
      emailErrorMessage,
      passwordErrorMessage,
      loading,
    } = this.state;
    const { modalProps, actions } = this.props;

    const isValid =
      email && !emailErrorMessage && password && !passwordErrorMessage;

    return (
      <Dialog
        maxWidth={'sm'}
        fullWidth={true}
        open={modalProps && modalProps.modalType === 'login'}
        onClose={actions.closeModal}
      >
        <DialogTitle>Log into SUSI</DialogTitle>
        <DialogContent>
          <div className="loginForm">
            <form onSubmit={this.handleSubmit}>
              <Div>
                <FormControl error={emailErrorMessage !== ''}>
                  <OutlinedInput
                    labelWidth={0}
                    name="email"
                    value={email}
                    onChange={this.handleTextFieldChange}
                    aria-describedby="email-error-text"
                    placeholder="Email"
                  />
                  <FormHelperText error={emailErrorMessage !== ''}>
                    {emailErrorMessage}
                  </FormHelperText>
                </FormControl>
              </Div>

              <Div>
                <FormControl error={passwordErrorMessage !== ''}>
                  <PasswordField
                    name="password"
                    style={passwordFieldStyle}
                    value={password}
                    placeholder="Password"
                    onChange={this.handleTextFieldChange}
                  />
                  <FormHelperText error={passwordErrorMessage !== ''}>
                    {passwordErrorMessage}
                  </FormHelperText>
                </FormControl>
              </Div>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!isValid}
                style={{ width: '17.1875rem', margin: '0.625rem 0rem' }}
              >
                {loading ? <CircularProgress size={24} /> : undefined}{' '}
                {!loading ? 'Log In' : undefined}
              </Button>

              <div className="loginLinksSection" id="loginLinks">
                <span
                  className="forgotPassword"
                  onClick={() =>
                    actions.openModal({ modalType: 'forgotPassword' })
                  }
                >
                  Forgot Password?
                </span>
                <span
                  className="signup"
                  onClick={() => actions.openModal({ modalType: 'signUp' })}
                >
                  Sign up for SUSI
                </span>
              </div>
            </form>
          </div>
        </DialogContent>
        <CloseIcon onClick={this.closeDialog} />
      </Dialog>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { ...appActions, ...skillActions, ...uiActions },
      dispatch,
    ),
  };
}

function mapStateToProps(store) {
  return {
    ...store.skills,
    ...store.ui,
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(addUrlProps({ urlPropsQueryConfig })(Login)),
);
