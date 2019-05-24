import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import appActions from '../../../redux/actions/app';
import uiActions from '../../../redux/actions/ui';

/* Material-UI*/
import Close from 'material-ui/svg-icons/navigation/close';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';

/* Utils*/
import { colors } from '../../../utils';

/* Styled Component*/
import authStyles from '../../../styledComponents/authStyles';

/* CSS*/
import './ForgotPassword.css';

class ForgotPassword extends Component {
  static propTypes = {
    history: PropTypes.object,
    openSnackBar: PropTypes.func,
    actions: PropTypes.object,
    modalProps: PropTypes.object,
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
    const { actions } = this.props;
    this.setState({
      email: '',
      success: false,
      checked: false,
      emailError: true,
      validEmail: true,
      validForm: false,
      loading: false,
      emailErrorMessage: '',
    });
    actions.closeModal();
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

    const { actions } = this.props;
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
                this.closeDialog();
                actions.openSnackBar({
                  snackBarMessage,
                  snackBarDuration: 4000,
                });
              }
            },
          );
        })
        .catch(error => {
          debugger;
          this.setState({
            loading: false,
            success: false,
          });
          if (error.statusCode === 422) {
            actions.openSnackBar({
              snackBarMessage: 'Email does not exist.',
              snackBarDuration: 4000,
            });
          } else {
            actions.openSnackBar({
              snackBarMessage: 'Failed. Try Again',
              snackBarDuration: 4000,
            });
          }
        });
    }
  };

  render() {
    const { email, emailErrorMessage, validForm, loading } = this.state;
    const { modalProps, actions } = this.props;
    const {
      containerStyle,
      underlineFocusStyle,
      closingStyle,
      bodyStyle,
    } = authStyles;

    return (
      <Dialog
        modal={false}
        open={
          modalProps &&
          modalProps.isModalOpen &&
          modalProps.modalType === 'forgotPassword'
        }
        onRequestClose={actions.closeModal}
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

function mapStateToProps(store) {
  return {
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
)(ForgotPassword);
