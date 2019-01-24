import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../../redux/actions/app';

/* Material-UI*/
import Close from 'material-ui/svg-icons/navigation/close';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';

/* Utils*/
import { colors } from '../../../utils';

/* CSS*/
import './ForgotPassword.css';

const styles = {
  containerStyle: {
    width: '100%',
    textAlign: 'center',
    padding: '10px',
  },
  underlineFocusStyle: {
    color: colors.header,
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
  bodyStyle: {
    padding: 0,
    textAlign: 'center',
  },
};

class ForgotPassword extends Component {
  static propTypes = {
    history: PropTypes.object,
    openSnackBar: PropTypes.func,
    onRequestCloseDialog: PropTypes.func,
    isForgotPasswordOpen: PropTypes.bool,
    actions: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      success: false,
      checked: false,
      emailError: true,
      validEmail: true,
      validForm: false,
      loading: false,
      emailErrorMessage: '',
    };
  }

  closeDialog = () => {
    const { onRequestCloseDialog } = this.props;
    this.setState(
      {
        email: '',
        success: false,
        checked: false,
        emailError: true,
        validEmail: true,
        validForm: false,
        loading: false,
        emailErrorMessage: '',
      },
      () => {
        onRequestCloseDialog();
      },
    );
  };

  handleTextFieldChange = event => {
    let {
      email,
      validEmail,
      emailError,
      emailErrorMessage,
      validForm,
    } = this.state;

    if (event.target.name === 'email') {
      email = event.target.value.trim();
      validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
      emailError = !(validEmail && email);
    }

    if (emailError) {
      if (!email) {
        emailErrorMessage = 'This Field Is Required';
      } else if (!validEmail) {
        emailErrorMessage = 'Invalid Email';
      }
      validForm = false;
    } else {
      emailErrorMessage = '';
      validForm = true;
    }

    this.setState({
      email,
      validEmail,
      emailError,
      emailErrorMessage,
      validForm,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { openSnackBar, actions } = this.props;
    let { email } = this.state;
    email = email.trim();
    let validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    this.setState({ loading: true });

    if (email && validEmail) {
      this.setState({ loading: true });
      actions
        .getForgotPassword({ email })
        .then(({ payload }) => {
          let snackBarMessage = payload.message;
          let success;
          if (payload.accepted) {
            success = true;
          } else {
            success = false;
            snackBarMessage = 'Please Try Again';
          }
          this.setState(
            {
              success,
              loading: false,
            },
            () => {
              if (success) {
                setTimeout(() => {
                  this.closeDialog();
                }, 2000);
              }
            },
          );
          openSnackBar({
            snackBarMessage,
          });
        })
        .catch(error => {
          debugger;
          this.setState({
            loading: false,
            success: false,
          });
          if (error.statusCode === 422) {
            openSnackBar({
              snackBarMessage: 'Email does not exist.',
            });
          } else {
            openSnackBar({
              snackBarMessage: 'Failed. Try Again',
            });
          }
        });
    }
  };

  render() {
    const { email, emailErrorMessage, validForm, loading } = this.state;
    const { isForgotPasswordOpen } = this.props;
    const {
      containerStyle,
      underlineFocusStyle,
      closingStyle,
      bodyStyle,
    } = styles;

    return (
      <Dialog
        modal={false}
        open={isForgotPasswordOpen}
        onRequestClose={this.closeDialog}
        autoScrollBodyContent={true}
        bodyStyle={bodyStyle}
        contentStyle={{ width: '35%', minWidth: '300px' }}
      >
        <div className="forgotPasswordForm">
          <Paper zDepth={0} style={containerStyle}>
            <h3>Forgot Password?</h3>
            <form onSubmit={this.handleSubmit}>
              <div>
                <TextField
                  name="email"
                  floatingLabelText="Email"
                  errorText={emailErrorMessage}
                  value={email}
                  underlineFocusStyle={underlineFocusStyle}
                  floatingLabelFocusStyle={underlineFocusStyle}
                  onChange={this.handleTextFieldChange}
                />
              </div>
              <div>
                <RaisedButton
                  type="submit"
                  label={!loading ? 'Reset' : ''}
                  backgroundColor={colors.header}
                  labelColor="#fff"
                  style={{ margin: '25px 0 0 0 ' }}
                  disabled={!validForm}
                  icon={loading ? <CircularProgress size={24} /> : undefined}
                />
              </div>
            </form>
          </Paper>
        </div>
        <Close style={closingStyle} onClick={this.closeDialog} />
      </Dialog>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(ForgotPassword);
