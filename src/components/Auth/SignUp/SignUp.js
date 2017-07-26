import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import './SignUp.css';
import PasswordField from 'material-ui-password-field';
import Dialog from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import Login from '../../Auth/Login/Login';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import zxcvbn from 'zxcvbn';
import Close from 'material-ui/svg-icons/navigation/close';

const urlPropsQueryConfig = {
    token: { type: UrlQueryParamTypes.string },
};

class SignUp extends Component {
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
            isEmail: false,
            emailError: true,
            passwordError: true,
            passwordConfirmError: true,
            passwordValue: '',
            confirmPasswordValue: '',
            msg: '',
            success: false,
            open: false,
            openLogin: false,
            validForm: false,
            serverUrl: '',
            checked:false,
            msgOpen: false,
            serverFieldError: false
        };

        this.emailErrorMessage = '';
        this.passwordErrorMessage = '';
        this.passwordConfirmErrorMessage = '';
        this.customServerMessage = '';

        if (document.cookie.split('=')[0] === 'loggedIn') {
            window.location.reload();
        }
    }

    handleClose = () => {
        let state = this.state;
        if (state.success) {
            this.setState({
                msgOpen: false,
            });
            this.props.onRequestClose();
        }
        else {
            this.setState({
                email: '',
                isEmail: false,
                emailError: true,
                passwordError: true,
                passwordConfirmError: true,
                passwordValue: '',
                passwordStrength: '',
                passwordScore: -1,
                confirmPasswordValue: '',
                msg: '',
                success: false,
                validForm: false,
                serverUrl: '',
                checked:false,
                serverFieldError: false,
                open: false,
                msgOpen: false
            });
        }
    }

    handleServeChange=(event)=>{
        if(this.state.emailError||
        this.state.passwordError||
        this.state.passwordConfirmError){
            this.setState({validForm: false});
        }
        else{
            this.setState({validForm: true});
        }
    }

    handleChange = (event) => {
        let email;
        let password;
        let confirmPassword;
        // let serverUrl;
        let state = this.state
        if (event.target.name === 'email') {
            email = event.target.value.trim();
            let validEmail =
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
            state.email = email;
            state.isEmail = validEmail;
            state.emailError = !(email || validEmail)
        }
        else if (event.target.name === 'password') {
            password = event.target.value;
            let validPassword = password.length >= 6;
            state.passwordValue=password;
            state.passwordError = !(password && validPassword);
            if(validPassword) {
              let result = zxcvbn(password);
              state.passwordScore=result.score;
              let strength = [
                'Worst',
                'Bad',
                'Weak',
                'Good',
                'Strong'
              ];
              state.passwordStrength=strength[result.score];
            }
            else {
              state.passwordStrength='';
              state.passwordScore=-1;
            }
        }
        else if (event.target.name === 'confirmPassword') {
            password = this.state.passwordValue;
            confirmPassword = event.target.value;
            let validPassword = confirmPassword === password;
            state.confirmPasswordValue = confirmPassword;
            state.passwordConfirmError = !(validPassword && confirmPassword);
        }

        if (!this.state.emailError
            && !this.state.passwordError
            && !this.state.passwordConfirmError) {
            state.validForm = true;
        }
        else {
            state.validForm = false;
        }

        this.setState(state);

        if (this.state.emailError) {
            this.emailErrorMessage = 'Enter a valid Email Address';
        }
        else if (this.state.passwordError) {
            this.emailErrorMessage = '';
            this.passwordErrorMessage
                = 'Minimum 6 characters required';
            this.passwordConfirmErrorMessage = '';

        }
        else if (this.state.passwordConfirmError) {
            this.emailErrorMessage = '';
            this.passwordErrorMessage = '';
            this.passwordConfirmErrorMessage = 'Check your password again';
        }
        else {
            this.emailErrorMessage = '';
            this.passwordErrorMessage = '';
            this.passwordConfirmErrorMessage = '';
        }

        if(this.state.emailError||
        this.state.passwordError||
        this.state.passwordConfirmError||
        this.state.serverFieldError){
            this.setState({validForm: false});
        }
        else{
            this.setState({validForm: true});
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let BASE_URL ="http://api.susi.ai";

        let signupEndPoint =
            BASE_URL+'/aaa/signup.json?signup=' + this.state.email +
            '&password=' + encodeURIComponent(this.state.passwordValue);

        if (!this.state.emailError && !this.state.passwordConfirmError) {
            $.ajax({
                url: signupEndPoint,
                dataType: 'jsonp',
                crossDomain: true,
                timeout: 3000,
                async: false,
                statusCode: {
                    422: function() {
                      let msg = 'Email already taken. Please try with another email.';
                      let state = this.state;
                      state.msg = msg;
                      this.setState(state);
                    }
                },
                success: function (response) {
                    let msg = response.message;
                    let state = this.state;
                    state.msg = msg;
                    state.success = true;
                    state.msgOpen = true;
                    this.setState(state);

                }.bind(this),
                error: function(jqXHR, textStatus, errorThrown) {
                    let jsonValue =  jqXHR.status;
                    let msg
                    if (jsonValue === 404) {
                      msg = 'Email already taken. Please try with another email.';
                    }
                    else {
                    msg = 'Failed. Try Again';
                    }
                   /* if (status === 'timeout') {
                      msg = 'Please check your internet connection';
                    }*/

                    let state = this.state;
                    state.msg = msg;
                    state.msgOpen = true;
                    state.success = false;
                    this.setState(state);
                }.bind(this)
            });
        }

    }

    handleOpen = () => {
        this.setState(
            {
            open: true,
            msgOpen: false,
            email: '',
            isEmail: false,
            emailError: true,
            passwordError: true,
            passwordConfirmError: true,
            passwordValue: '',
            confirmPasswordValue: '',
            msg: '',
            success: false,
            validForm: false,
            serverUrl: '',
            checked:false,
            serverFieldError: false
        });
    };

    render() {

        const styles = {
            'width': '100%',
            'textAlign': 'center',
            'padding': '10px'
        }
        const fieldStyle={
            'width':'256px'
        }
        const closingStyle ={
          position: 'absolute',
          zIndex: 1200,
          fill: '#444',
          width: '26px',
          height: '26px',
          right: '10px',
          top: '10px',
          cursor:'pointer'
        }
        const underlineFocusStyle= {
            color: '#4285f4'
        }

        const PasswordClass=[`is-strength-${this.state.passwordScore}`];

        return (
            <div className="signUpForm">
                <Paper zDepth={0} style={styles}>
                    <h3>Sign Up with SUSI</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <TextField
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                errorText={this.emailErrorMessage}
                                underlineFocusStyle={underlineFocusStyle}
                                floatingLabelFocusStyle={underlineFocusStyle}
                                floatingLabelText="Email" />
                        </div>
                        <div className={PasswordClass.join(' ')}>
                            <PasswordField
                                name="password"
                                style={fieldStyle}
                                value={this.state.passwordValue}
                                onChange={this.handleChange}
                                errorText={this.passwordErrorMessage}
                                underlineFocusStyle={underlineFocusStyle}
                                floatingLabelFocusStyle={underlineFocusStyle}
                                floatingLabelText="Password" />
                              <div className="ReactPasswordStrength-strength-bar" />
                              <div>
                                <p>
                                  {this.state.passwordStrength}
                                </p>
                              </div>
                        </div>
                        <div>
                            <PasswordField
                                name="confirmPassword"
                                style={fieldStyle}
                                value={this.state.confirmPasswordValue}
                                onChange={this.handleChange}
                                errorText={this.passwordConfirmErrorMessage}
                                underlineFocusStyle={underlineFocusStyle}
                                floatingLabelFocusStyle={underlineFocusStyle}
                                floatingLabelText="Confirm Password" />
                        </div>
                        <div>
                            <RaisedButton
                                label="Sign Up"
                                type="submit"
                                disabled={!this.state.validForm}
                                backgroundColor="#19314B"
                                labelColor="#fff"
                                style={{margin:'15px 0 0 0 '}} />
                        </div>
                        <h4 style={{
                            margin: '5px 0'
                        }}>OR</h4>
                        <div>
                            <h4 style={{
                            margin: '5px 0'
                        }}>If you have an Account Please Login</h4>
                            <RaisedButton
                                onTouchTap={this.handleOpen}
                                label='Login'
                                backgroundColor="#19314B"
                                labelColor="#fff" />
                        </div>
                    </form>
                </Paper>
                {this.state.msg && (
                    <div><Dialog
                        modal={false}
                        open={this.state.msgOpen}
                        onRequestClose={this.handleClose}
                    >
                        {this.state.msg}
                    </Dialog></div>
                )}
                <Dialog
                  className='dialogStyle'
                  modal={false}
                  open={this.state.open}
                  autoScrollBodyContent={true}
                  contentStyle={{width: '35%',minWidth: '300px'}}>
                  <Login {...this.props} />
                  <Close style={closingStyle}
                    onTouchTap={this.handleClose} />
                </Dialog>
            </div>
        );
    };
}

SignUp.propTypes = {
    history: PropTypes.object
}

export default addUrlProps({ urlPropsQueryConfig })(SignUp);