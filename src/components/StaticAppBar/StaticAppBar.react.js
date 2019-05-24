import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import styled from 'styled-components';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Settings from '@material-ui/icons/Settings';
import Exit from '@material-ui/icons/ExitToApp';
import SignUp from '@material-ui/icons/AccountCircle';
import Info from '@material-ui/icons/Info';
import List from '@material-ui/icons/List';
import Chat from '@material-ui/icons/Chat';
import Extension from '@material-ui/icons/Extension';
import Assessment from '@material-ui/icons/Assessment';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import susiWhite from '../../images/SUSIAI-white.png';
import CircleImage from '../CircleImage/CircleImage';
import appActions from '../../redux/actions/app';
import uiActions from '../../redux/actions/ui';
import urls from '../../utils/urls';
import { getAvatarProps } from '../../utils';
import AppBar from '@material-ui/core/AppBar';

const SusiLogo = styled.img`
  height: 1.5rem;
  display: block;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserDetail = styled.label`
  font-size: 1rem;
  color: white;
  @media (max-width: 512px) {
    display: None;
  }
`;

class StaticAppBar extends Component {
  static propTypes = {
    handleChangePassword: PropTypes.func,
    handleOptions: PropTypes.func,
    handleRequestClose: PropTypes.func,
    handleToggle: PropTypes.func,
    header: PropTypes.string,
    email: PropTypes.string,
    accessToken: PropTypes.string,
    userName: PropTypes.string,
    isAdmin: PropTypes.bool,
    actions: PropTypes.object,
  };

  static defaultProps = {
    email: '',
    userName: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  openModal = name => {
    const { actions } = this.props;
    this.handleClose();
    actions.openModal({ modalType: name });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { email, accessToken, userName, isAdmin } = this.props;

    let avatarProps = null;
    if (accessToken && email) {
      avatarProps = getAvatarProps(email, accessToken);
    }

    return (
      <AppBar position="static">
        <StyledToolbar variant="dense">
          <div style={{ outline: '0' }}>
            <Link to="/" style={{ outline: '0' }}>
              <SusiLogo src={susiWhite} alt="SUSI.AI Logo" />
            </Link>
          </div>

          <div style={{ display: 'flex' }}>
            <div>
              {accessToken && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: '0.5rem',
                  }}
                >
                  <CircleImage {...avatarProps} size="32" />
                  <UserDetail>{userName ? userName : email}</UserDetail>
                </div>
              )}
            </div>
            {/* Pop over menu */}
            <IconButton
              aria-owns={open ? 'menu-popper' : undefined}
              aria-haspopup="true"
              color="inherit"
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="menu-popper"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              getContentAnchorEl={null}
            >
              <MenuItem key="placeholder" style={{ display: 'none' }} />
              {accessToken && (
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={this.handleClose}>
                    <ListItemIcon>
                      <Assessment />
                    </ListItemIcon>
                    <ListItemText>Dashboard</ListItemText>
                  </MenuItem>
                </Link>
              )}
              <a href={`${urls.CHAT_URL}`} style={{ textDecoration: 'none' }}>
                <MenuItem onClick={this.handleClose}>
                  <ListItemIcon>
                    <Chat />
                  </ListItemIcon>
                  <ListItemText>Chat</ListItemText>
                </MenuItem>
              </a>
              {accessToken && (
                <Link to="/botbuilder" style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={this.handleClose}>
                    <ListItemIcon>
                      <Extension />
                    </ListItemIcon>
                    <ListItemText>Botbuilder</ListItemText>
                  </MenuItem>
                </Link>
              )}
              {accessToken && (
                <a
                  href={`${urls.ACC_URL}/settings`}
                  style={{ textDecoration: 'none' }}
                >
                  <MenuItem onClick={this.handleClose}>
                    <ListItemIcon>
                      <Settings />
                    </ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                  </MenuItem>
                </a>
              )}
              <a
                href={`${urls.CHAT_URL}/overview`}
                style={{ textDecoration: 'none' }}
              >
                <MenuItem onClick={this.handleClose}>
                  <ListItemIcon>
                    <Info />
                  </ListItemIcon>
                  <ListItemText>About</ListItemText>
                </MenuItem>
              </a>
              {accessToken &&
                isAdmin && (
                  <a
                    href={`${urls.ACCOUNT_URL}/admin`}
                    style={{ textDecoration: 'none' }}
                  >
                    <MenuItem onClick={this.handleClose}>
                      <ListItemIcon>
                        <List />
                      </ListItemIcon>
                      <ListItemText>Admin</ListItemText>
                    </MenuItem>
                  </a>
                )}
              {accessToken ? (
                <Link to="/logout" style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={this.handleClose}>
                    <ListItemIcon>
                      <Exit />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </MenuItem>
                </Link>
              ) : (
                <MenuItem onClick={() => this.openModal('login')}>
                  <ListItemIcon>
                    <SignUp />
                  </ListItemIcon>
                  <ListItemText>Login</ListItemText>
                </MenuItem>
              )}
            </Menu>
          </div>
        </StyledToolbar>
      </AppBar>
    );
  }
}

function mapStateToProps(store) {
  const { email, accessToken, userName, isAdmin } = store.app;
  return {
    email,
    accessToken,
    userName,
    isAdmin,
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
)(StaticAppBar);
