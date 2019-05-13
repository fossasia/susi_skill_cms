import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import List from 'material-ui/svg-icons/action/list';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Popover from 'material-ui/Popover';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import Extension from 'material-ui/svg-icons/action/extension';
import Assessment from 'material-ui/svg-icons/action/assessment';
import LoginIcon from 'material-ui/svg-icons/action/account-circle';
import Info from 'material-ui/svg-icons/action/info';
import Settings from 'material-ui/svg-icons/action/settings';
import MenuItem from 'material-ui/MenuItem';
import Chat from 'material-ui/svg-icons/communication/chat';
import SkillIcon from 'material-ui/svg-icons/action/dashboard';
import CircleImage from '../CircleImage/CircleImage';
import susiWhite from '../../images/SUSIAI-white.png';
// import Auth from '../Auth/';
import { urls, colors } from '../../utils';
import './StaticAppBar.css';
import { bindActionCreators } from 'redux';
import uiActions from '../../redux/actions/ui';

const cookies = new Cookies();

const styles = {
  headerStyle: {
    background: colors.header,
  },
  circleImageWrapperStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleImageLabelStyle: {
    color: 'white',
    fontSize: '16px',
    marginRight: '5px',
  },
  appbarTitleStyle: {
    float: 'left',
    marginTop: '-10px',
    height: '25px',
    width: '122px',
  },
  appbarStyle: {
    backgroundColor: colors.header,
    height: '46px',
    boxShadow: 'none',
    margin: '0 auto',
  },
  popoverStyle: {
    float: 'right',
    position: 'relative',
    marginTop: '46px',
    marginRight: '8px',
  },
};

class StaticAppBar extends Component {
  static propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
    accessToken: PropTypes.string,
    isAdmin: PropTypes.bool,
    userName: PropTypes.string,
    email: PropTypes.string,
    actions: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
      anchorEl: null,
      timestamp: new Date().getTime(),
    };
    this.mounted = false;
  }

  handleScroll = event => {
    const scrollTop = event.pageY || event.target.body.scrollTop;
    const itemTranslate = scrollTop > 60;
    if (itemTranslate) {
      this.closeOptions();
    }
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    window.addEventListener('scroll', this.handleScroll);

    let didScroll;
    let lastScrollTop = 0;
    let delta = 5;
    let windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    let headerElement = document.getElementsByTagName('header')[0];
    const navbarHeight = headerElement.offsetHeight;

    window.addEventListener('scroll', () => {
      didScroll = true;
      if (this.mounted) {
        this.setState({ showOptions: false });
      }
    });

    const hasScrolled = () => {
      let st = document.scrollingElement.scrollTop;
      // Make sure they scroll more than delta
      if (Math.abs(lastScrollTop - st) <= delta) {
        return;
      }
      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is 'behind' the navbar.
      if (st > lastScrollTop && st > navbarHeight + 400 && this.mounted) {
        this.setState({ scroll: 'nav-up' });
      } else if (
        st + windowHeight < document.body.scrollHeight &&
        this.mounted
      ) {
        // Scroll Down
        this.setState({ scroll: 'nav-down' });
      }
      lastScrollTop = st;
    };

    setInterval(() => {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 500);
  }

  showOptions = event => {
    event.preventDefault();
    this.setState({
      showOptions: true,
      anchorEl: event.currentTarget,
    });
  };

  closeOptions = () => {
    const { showOptions } = this.state;
    if (showOptions) {
      this.setState({
        showOptions: false,
      });
    }
  };

  render() {
    const { timestamp, showOptions, anchorEl, scroll } = this.state;
    const { accessToken, isAdmin, userName, email } = this.props;

    const TopRightMenuItems = props => {
      const avatarProps = accessToken && {
        name: cookies.get('emailId'),
        src: `${
          urls.API_URL
        }/getAvatar.png?access_token=${accessToken}&q=${timestamp}`,
      };

      return (
        <div className="topRightMenu" onScroll={this.handleScroll}>
          {accessToken && (
            <div style={styles.circleImageWrapperStyle}>
              <CircleImage {...avatarProps} size="32" />
              <label className="useremail" style={styles.circleImageLabelStyle}>
                {!userName ? email : userName}
              </label>
            </div>
          )}
          <IconMenu
            iconButtonElement={
              <IconButton iconStyle={{ fill: 'white' }}>
                <MoreVertIcon />
              </IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            onTouchTap={this.showOptions}
          />
          <Popover
            animated={false}
            style={styles.popoverStyle}
            open={showOptions}
            anchorEl={anchorEl}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            onRequestClose={this.closeOptions}
          >
            {accessToken && (
              <MenuItem
                primaryText="Dashboard"
                containerElement={<Link to="/dashboard" />}
                rightIcon={<Assessment />}
              />
            )}
            <div>
              <MenuItem href={urls.CHAT_URL} rightIcon={<Chat />}>
                Chat
              </MenuItem>
              <Link to="/">
                <MenuItem rightIcon={<SkillIcon />}>Skills</MenuItem>
              </Link>
              {!accessToken && (
                <MenuItem
                  href={urls.CHAT_URL + '/overview'}
                  rightIcon={<Info />}
                >
                  About
                </MenuItem>
              )}
            </div>
            {accessToken && (
              <MenuItem
                primaryText="Botbuilder"
                containerElement={<Link to="/botbuilder" />}
                rightIcon={<Extension />}
              />
            )}
            {accessToken && (
              <MenuItem
                href={urls.ACC_URL + '/settings'}
                rightIcon={<Settings />}
              >
                Settings
              </MenuItem>
            )}
            {accessToken && (
              <MenuItem href={urls.CHAT_URL + '/overview'} rightIcon={<Info />}>
                About
              </MenuItem>
            )}
            {isAdmin && (
              <MenuItem
                primaryText="Admin"
                containerElement={<Link to="/admin" />}
                rightIcon={<List />}
              />
            )}
            {accessToken ? (
              <MenuItem
                primaryText="Logout"
                containerElement={<Link to="/logout" />}
                rightIcon={<Exit />}
              />
            ) : (
              <MenuItem
                primaryText="Login"
                onClick={() =>
                  this.props.actions.openModal({ modalType: 'login' })
                }
                rightIcon={<LoginIcon />}
                onTouchTap={() =>
                  this.props.actions.openModal({ modalType: 'login' })
                }
              />
            )}
          </Popover>
        </div>
      );
    };

    return (
      <div>
        <header
          className={scroll}
          style={styles.headerStyle}
          id="headerSection"
        >
          <AppBar
            className="topAppBar"
            id="appBar"
            title={
              <div id="rightIconButton">
                <Link to="/" style={styles.appbarTitleStyle}>
                  <img src={susiWhite} alt="susi-logo" className="siteTitle" />
                </Link>
              </div>
            }
            style={styles.appbarStyle}
            iconStyleRight={{ marginTop: '-2px' }}
            iconElementRight={<TopRightMenuItems />}
          />
        </header>
      </div>
    );
  }
}

const mapStateToProps = ({ app }) => {
  return {
    ...app,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(uiActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StaticAppBar);
