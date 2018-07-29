import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import './ForgotPassword.css';
import $ from 'jquery';
import colors from '../../../Utils/colors';
import urls from '../../../Utils/urls';
import Close from 'material-ui/svg-icons/navigation/close';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      msg: '',
      success: false,
      checked: false,
      emailError: true,
      validEmail: true,
      validForm: false,
      loading: false,
    };

    this.emailErrorMessage = '';
  }

  handleClose = () => {
    let state = this.state;
    if (state.success) {
      this.setState({
        msg: '',
      });
      this.props.onRequestClose();
    } else {
      this.setState({
        email: '',
        msg: '',
        success: false,
        checked: false,
        emailError: true,
        validEmail: false,
        validForm: false,
      });
    }
  };

  handleChange = event => {
    let email;
    let state = this.state;
    if (event.target.name === 'email') {
      email = event.target.value.trim();
      let validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
      state.email = email;
      state.validEmail = validEmail;
      state.emailError = !(validEmail && email);
    }

    if (state.emailError) {
      if (!state.email) {
        this.emailErrorMessage = 'This Field Is Required';
      } else if (!state.validEmail) {
        this.emailErrorMessage = 'Invalid Email';
      }
    } else {
      this.emailErrorMessage = '';
    }

    if (!state.emailError) {
      state.validForm = true;
    } else {
      state.validForm = false;
    }

    this.setState(state);
  };

  handleSubmit = event => {
    event.preventDefault();

    let email = this.state.email.trim();
    let validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    let BASE_URL = urls.API_URL;

    this.setState({ loading: true });

    if (email && validEmail) {
      $.ajax({
        url: BASE_URL + '/aaa/recoverpassword.json?forgotemail=' + email,
        dataType: 'jsonp',
        crossDomain: true,
        timeout: 3000,
        async: false,
        statusCode: {
          422: function() {
            let msg = 'Email does not exist';
            let state = this.state;
            state.msg = msg;
            state.loading = false;
            this.setState(state);
          },
        },
        success: function(response) {
          let msg = response.message;
          let state = this.state;
          state.msg = msg;
          if (response.accepted) {
            state.success = true;
          } else {
            state.success = false;
            state.msg += 'Please Try Again';
          }
          state.loading = false;
          this.setState(state);
        }.bind(this),
        error: function(jqXHR, textStatus, errorThrown) {
          let jsonValue = jqXHR.status;
          let msg = '';
          if (jsonValue === 404) {
            msg = 'Email does not exist';
          } else {
            msg = 'Failed. Try Again';
          }
          // if (status === 'timeout') {
          //  msg = 'Please check your internet connection';
          // }
          let state = this.state;
          state.msg = msg;
          state.loading = false;
          this.setState(state);
        }.bind(this),
      });
    }
  };

  render() {
    const styles = {
      width: '100%',
      textAlign: 'center',
      padding: '10px',
    };

    const underlineFocusStyle = {
      color: colors.header,
    };

    const closingStyle = {
      position: 'absolute',
      zIndex: 1200,
      fill: '#444',
      width: '26px',
      height: '26px',
      right: '10px',
      top: '10px',
      cursor: 'pointer',
    };

    return (
      <div className="forgotPwdForm">
        <Paper zDepth={0} style={styles}>
          <h3>Forgot Password?</h3>
          <form onSubmit={this.handleSubmit}>
            <div>
              <TextField
                name="email"
                floatingLabelText="Email"
                errorText={this.emailErrorMessage}
                value={this.state.email}
                underlineFocusStyle={underlineFocusStyle}
                floatingLabelFocusStyle={underlineFocusStyle}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <RaisedButton
                type="submit"
                label={this.state.loading ? '' : 'Reset'}
                backgroundColor={colors.header}
                labelColor="#fff"
                style={{ margin: '25px 0 0 0 ' }}
                disabled={!this.state.validForm}
              >
                {this.state.loading ? (
                  <CircularProgress
                    size={24}
                    thickness={2}
                    style={{ marginTop: 5 }}
                    color={'#FFF'}
                  />
                ) : null}
              </RaisedButton>
            </div>
          </form>
        </Paper>
        {this.state.msg && (
          <div>
            <Dialog modal={false} open={true} onRequestClose={this.handleClose}>
              {this.state.msg}

              <Close style={closingStyle} onTouchTap={this.handleClose} />
            </Dialog>
          </div>
        )}
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  history: PropTypes.object,
  onRequestClose: PropTypes.func,
};

export default ForgotPassword;
