import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './Login.css';
import PasswordField from 'material-ui-password-field'
import $ from 'jquery';
import PropTypes  from 'prop-types';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const urlPropsQueryConfig = {
    token: { type: UrlQueryParamTypes.string },
};

class Login extends Component {
    static propTypes = {
        // URL props are automatically decoded and passed in based on the config
        token: PropTypes.string,
        // change handlers are automatically generated when given a config.
        // By default they update that single query parameter and maintain existing
        // values in the other parameters.
        onChangeToken: PropTypes.func,
    }

    static defaultProps = {
        token: "null",
    }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isFilled: false,
            success: false,
            validForm: false,
            emailError: true,
            passwordError: true,
            checked: false
        };
        this.emailErrorMessage = '';
        this.passwordErrorMessage = '';
    }

    componentDidMount() {
        // const {
        //     token
        // } = this.props;
        console.log(cookies.get('loggedIn'))
        if(cookies.get('loggedIn')) {
            this.props.history.push('/home', { open: false });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        var email = this.state.email.trim();
        var password = this.state.password.trim();

        let BASE_URL ="http://api.susi.ai";

        if (!email || !password) { return this.state.isFilled; }

        let validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
        let loginEndPoint =
            BASE_URL + '/aaa/login.json?type=access-token&login=' +
            this.state.email + '&password=' + this.state.password;

        if (email && validEmail) {
            $.ajax({
                url: loginEndPoint,
                dataType: 'jsonp',
                jsonpCallback: 'p',
                jsonp: 'callback',
                crossDomain: true,
                success: function (response) {
                    cookies.set('serverUrl', BASE_URL, { path: '/' });
                    console.log(cookies.get('serverUrl'));
                    let accessToken = response.access_token;
                    let state = this.state;
                    let time = response.valid_seconds;
                    let showAdmin = false;
                    state.isFilled = true;
                    state.accessToken = accessToken;
                    state.success = true;
                    state.msg = response.message;
                    state.time = time;
                    this.setState(state);
                    let newUrl;
                    newUrl = "http://api.susi.ai/aaa/showAdminService.json?access_token="+accessToken;
                    $.ajax({
                        url: newUrl,
                        dataType: 'jsonp',
                        jsonpCallback: 'pasdg',
                        jsonp: 'callback',
                        crossDomain: true,
                        success: function (newResponse) {
                            showAdmin = newResponse.showAdmin;
                            console.log(newResponse.showAdmin)
                        },
                        error: function (newErrorThrown) {
                            showAdmin = false;
                            console.log(newErrorThrown)
                        }
                    });
                    this.handleOnSubmit(email, accessToken, showAdmin, time);
                    let msg = 'You are loggedin';
                    state.msg = msg;
                    this.setState(state);
                }.bind(this),
                error: function (errorThrown) {
                    let msg = 'Login Failed. Try Again';
                    let state = this.state;
                    state.msg = msg;
                    this.setState(state);
                }.bind(this)
            });
        }
    }

    handleChange = (event) => {
        let email;
        let password;
        let state = this.state;

        if (event.target.name === 'email') {
            email = event.target.value.trim();
            let validEmail =
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
            state.email = email;
            state.emailError = !(email && validEmail)
        }
        else if (event.target.name === 'password') {
            password = event.target.value;
            let validPassword = password.length >= 6;
            state.password = password;
            state.passwordError = !(password && validPassword);
        }

        if (this.state.emailError) {
            this.emailErrorMessage = 'Enter a valid Email Address';
        }
        else {
            this.emailErrorMessage = '';
        }

        if (this.state.passwordError) {
            this.passwordErrorMessage
                = 'Minimum 6 characters required';
        }
        else{
            this.passwordErrorMessage='';
        }
        if (!state.emailError && !state.passwordError)
        {
            state.validForm = true;
        }
        else {
            state.validForm = false;
        }

        this.setState(state);
    }

    handleOnSubmit = (email, loggedIn, showAdmin, time) => {
        let state = this.state;
        if (state.success) {
            cookies.set('loggedIn', loggedIn, { path: '/', maxAge: time });
            cookies.set('emailId', email, { path: '/', maxAge: time });
            cookies.set('showAdmin', showAdmin, { path: '/', maxAge: time });
            window.location.reload();

        }
        else {
            this.setState({
                error: true,
                accessToken: '',
                success: false
            });
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleSignUp = () => {
        this.setState(
            {
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
      this.setState(
          {
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
    }

    render() {
        // const { token } = this.props;

        const styles = {
            'width': '100%',
            'padding': '10px',
            'textAlign': 'center'
        }
        const fieldStyle={
            'width':'256px'
        }
        return (
            <div>

                <div>

                </div>
                <div className="loginForm">
                    <Paper zDepth={0}style={styles}>
                        <h3>Login to SUSI</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <TextField name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    errorText={this.emailErrorMessage}
                                    floatingLabelText="Email" />
                            </div>
                            <div>
                                <PasswordField
                                    name='password'
                                    style={fieldStyle}
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    errorText={this.passwordErrorMessage}
                                    floatingLabelText='Password' />
                            </div>
                            <span style={{
                              margin: '3px 0'
                            }}>{this.state.msg}</span>
                            <div>
                                <RaisedButton
                                    label="Login"
                                    type="submit"
                                    backgroundColor="#4285f4"
                                    labelColor="#fff"
                                    disabled={!this.state.validForm}
                                    style={{margin:'15px 0 '}}/>
                            </div>
                            <span className="forgotpwdlink"
                              onClick={this.handleForgotPassword}>
                              Forgot Password?
                            </span>
                            <br />
                            <h4 style={{
                              margin: '7px 0'
                            }}>OR</h4>
                            <div>
                                <h4>If you do not have an account, Please SignUp</h4>
                                    <RaisedButton
                                        label='SignUp'
                                        onTouchTap={this.handleSignUp}
                                        backgroundColor="#4285f4"
                                        labelColor="#fff"
                                        style={{margin:'15px 0 0 0'}}/>
                            </div>
                        </form>
                    </Paper>
                </div>
            </div>
        );

    };
}

Login.propTypes = {
    history: PropTypes.object,
    onForgotPwdLogin: PropTypes.func,
    onSignUpLogin: PropTypes.func,
};

export default addUrlProps({ urlPropsQueryConfig })(Login);
