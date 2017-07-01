import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import './Login.css';
import PasswordField from 'material-ui-password-field'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
// import UserPreferencesStore from '../../../stores/UserPreferencesStore';

export default class Login extends React.Component {


    render() {

        const styles = {
            'width': '100%',
            'textAlign': 'center',
            'padding': '60px'
        }
        const fieldStyle={
            'width':'256px'
        }

        const style = {
            loginform: {
                background: '#000',
            }
        }
        const bg = {
            width: "100%",
            height: "100%",
            background: "#ddd",
            zIndex: 11,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
        const radioButtonStyles = {
            block: {
                maxWidth: 250,
            },
            radioButton: {
                marginBottom: 16,
            },
        };
        return(
            <div style={bg}>
            <div className={style.loginform}>
                <Paper zDepth={0} style={styles}>
                    <h1>Login to SUSI</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <TextField name="email"
                                       onChange={this.handleChange}
                                       errorText={this.emailErrorMessage}
                                       floatingLabelText="Email" />
                        </div>
                        <div>
                            <PasswordField
                                name='password'
                                style={fieldStyle}
                                onChange={this.handleChange}
                                errorText={this.passwordErrorMessage}
                                floatingLabelText='Password' />
                        </div>
                        <div>
                            <div>
                                <RadioButtonGroup style={{display: 'flex',
                                    marginTop: '10px',
                                    maxWidth:'200px',
                                    flexWrap: 'wrap',
                                    margin: 'auto'}}
                                                  name="server" onChange={this.handleChange}
                                                  defaultSelected="standardServer">
                                    <RadioButton
                                        value="customServer"
                                        label="Custom Server"
                                        labelPosition="left"
                                        style={radioButtonStyles.radioButton}
                                    />
                                    <RadioButton
                                        value="standardServer"
                                        label="Standard Server"
                                        labelPosition="left"
                                        style={radioButtonStyles.radioButton}
                                    />
                                </RadioButtonGroup>
                            </div>
                        </div>
                        <div>
                            {/*{hidden}*/}
                        </div>
                        <div>
                            <RaisedButton
                                label="Login"
                                type="submit"
                                 backgroundColor={'#607D8B'}
                                //     UserPreferencesStore.getTheme()==='light' ? '#607D8B' : '#19314B'}
                                labelColor="#fff"
                           />
                        </div>
                        <span>{}</span>
                        <h1>OR</h1>
                        <div>
                            <Link to='/forgotpwd'
                                  className="forgotpwdlink">
                                <b>Forgot Password?</b>
                            </Link>
                        </div>

                    </form>
                </Paper>
            </div>
            </div>);

    };

}

const styles = {
    bg: {
        height: '90px',
        lineHeight:'90px',
        textAlign: 'center',
        fontSize:'200px',
        marginLeft:'80px'
    }
}
