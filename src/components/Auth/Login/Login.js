// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import CircularProgress from 'material-ui/CircularProgress';
import PasswordField from 'material-ui-password-field';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Cookies from 'universal-cookie';
import Close from 'material-ui/svg-icons/navigation/close';
import { isProduction } from '../../../utils';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import isEmail from '../../../utils/isEmail';
import appActions from '../../../redux/actions/app';
import skillActions from '../../../redux/actions/skills';

// Static assets
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

class Login extends Component {
  static propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object,
    isLoginOpen: PropTypes.bool,
    onRequestCloseDialog: PropTypes.func,
    onRequestOpenSignUp: PropTypes.func,
    onRequestOpenForgotPassword: PropTypes.func,
    openSnackBar: PropTypes.func,
    location: PropTypes.object,
    languageValue: PropTypes.array,
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
    const { onRequestCloseDialog } = this.props;
    this.setState(
      {
        email: '',
        emailErrorMessage: '',
        password: '',
        passwordErrorMessage: '',
        success: false,
        loading: false,
      },
      () => {
        onRequestCloseDialog();
      },
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    let { email, password } = this.state;
    const {
      openSnackBar,
      location,
      history,
      actions,
      languageValue,
    } = this.props;

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
          openSnackBar({ snackBarMessage });
        })
        .catch(error => {
          console.log(error);
          const message = 'Login Failed. Try Again';
          openSnackBar({ snackBarMessage: message });
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
    console.log(email, accessToken, uuid, validSeconds);
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
    const {
      fieldStyle,
      passwordFieldStyle,
      inputStyle,
      inputPasswordStyle,
      bodyStyle,
      closingStyle,
    } = styles;
    const {
      email,
      password,
      emailErrorMessage,
      passwordErrorMessage,
      loading,
    } = this.state;
    const {
      isLoginOpen,
      onRequestOpenForgotPassword,
      onRequestOpenSignUp,
    } = this.props;

    const isValid =
      email && !emailErrorMessage && password && !passwordErrorMessage;

    return (
      <Dialog
        modal={false}
        open={isLoginOpen}
        onRequestClose={this.closeDialog}
        autoScrollBodyContent={true}
        bodyStyle={bodyStyle}
        contentStyle={{ width: '35%', minWidth: '300px' }}
      >
        <div className="loginForm">
          <div id="loginHeading">Log into SUSI</div>
          <form onSubmit={this.handleSubmit}>
            <div style={{ maxHeight: '70px' }}>
              <TextField
                name="email"
                type="email"
                value={email}
                onChange={this.handleTextFieldChange}
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
                errorText={passwordErrorMessage}
                underlineStyle={{ display: 'none' }}
                onChange={this.handleTextFieldChange}
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
              disabled={!isValid}
              style={{ width: '275px', margin: '10px 0px' }}
              icon={loading ? <CircularProgress size={24} /> : undefined}
            />

            <div className="loginLinksSection" id="loginLinks">
              <span
                className="forgotPassword"
                onClick={onRequestOpenForgotPassword}
              >
                Forgot Password?
              </span>
              <span className="signup" onClick={onRequestOpenSignUp}>
                Sign up for SUSI
              </span>
            </div>
          </form>
        </div>
        <Close style={closingStyle} onClick={this.closeDialog} />
      </Dialog>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...appActions, ...skillActions }, dispatch),
  };
}

function mapStateToProps(store) {
  return {
    ...store.skills,
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(addUrlProps({ urlPropsQueryConfig })(Login)),
);
