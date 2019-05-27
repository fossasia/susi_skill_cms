import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import appActions from '../../../redux/actions/app';
import uiActions from '../../../redux/actions/ui';

/* Material-UI*/
import Close from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import _Button from '@material-ui/core/Button';
import _CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import _Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import styled from 'styled-components';

/* CSS*/
import './ForgotPassword.css';

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

const Button = styled(_Button)`
  margin: 1.5625rem 0 0 0;
`;

const Input = styled(_Input)`
  width: 16rem;
`;

const CircularProgress = styled(_CircularProgress)`
  color: #ffffff;
`;

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

    return (
      <Dialog
        maxWidth={'sm'}
        fullWidth={true}
        open={
          modalProps &&
          modalProps.isModalOpen &&
          modalProps.modalType === 'forgotPassword'
        }
        onClose={actions.closeModal}
        style={{ textAlign: 'center' }}
      >
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <div className="forgotPasswordForm">
            <form onSubmit={this.handleSubmit}>
              <div>
                <FormControl>
                  <InputLabel>Email</InputLabel>
                  <Input
                    name="email"
                    value={email}
                    onChange={this.handleTextFieldChange}
                    aria-describedby="component-error-text"
                  />
                  <FormHelperText
                    id="component-error-text"
                    error={emailErrorMessage !== ''}
                  >
                    {emailErrorMessage}
                  </FormHelperText>
                </FormControl>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!validForm}
                >
                  {loading ? <CircularProgress size={24} /> : undefined}{' '}
                  {!loading ? 'Reset' : ''}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
        <CloseIcon onClick={this.closeDialog} />
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
