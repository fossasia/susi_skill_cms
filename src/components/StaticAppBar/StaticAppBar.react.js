import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import $ from 'jquery';
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
import Auth from '../Auth/';
import { urls, colors, isProduction } from '../../utils';
import './StaticAppBar.css';

const cookieDomain = isProduction() ? '.susi.ai' : '';

const cookies = new Cookies();

const headerStyle = {
  background: colors.header,
};

const TopRightMenuItems = props => (
  <div>
    <MenuItem href={urls.CHAT_URL} rightIcon={<Chat />}>
      Chat
    </MenuItem>
    <Link to="/">
      <MenuItem rightIcon={<SkillIcon />}>Skills</MenuItem>
    </Link>
    {!cookies.get('loggedIn') ? (
      <MenuItem href={urls.CHAT_URL + '/overview'} rightIcon={<Info />}>
        About
      </MenuItem>
    ) : null}
  </div>
);

class StaticAppBar extends Component {
  static propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      showAuth: false,
      showOptions: false,
      showAdmin: false,
      anchorEl: null,
      timestamp: new Date().getTime(),
    };
  }

  handleScroll = event => {
    const scrollTop = event.pageY || event.target.body.scrollTop;
    const itemTranslate = scrollTop > 60;
    if (itemTranslate) {
      this.closeOptions();
    }
  };

  initializeShowAdminService = () => {
    $.ajax({
      url: `${
        urls.API_URL
      }/aaa/showAdminService.json?access_token=${cookies.get('loggedIn')}`,
      dataType: 'jsonp',
      jsonpCallback: 'pfns',
      jsonp: 'callback',
      crossDomain: true,
      success: newResponse => {
        const showAdmin = newResponse.showAdmin;
        cookies.set('showAdmin', showAdmin, {
          path: '/',
          domain: cookieDomain,
        });
        this.setState({
          showAdmin,
        });
      },
      error: newErrorThrown => {
        console.log(newErrorThrown);
      },
    });
  };

  initializeListUserSettings = () => {
    $.ajax({
      url: `${
        urls.API_URL
      }/aaa/listUserSettings.json?access_token=${cookies.get('loggedIn')}`,
      jsonpCallback: 'pc',
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: data => {
        let userName = '';
        if (data.settings && data.settings.userName) {
          userName = data.settings.userName;
        }
        cookies.set('username', userName, {
          path: '/',
          domain: cookieDomain,
        });
      },
      error: errorThrown => {
        console.log(errorThrown);
      },
    });
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    if (cookies.get('loggedIn')) {
      this.initializeShowAdminService();
      this.initializeListUserSettings();
    }

    let didScroll;
    let lastScrollTop = 0;
    let delta = 5;
    this.setState({
      showAdmin: cookies.get('showAdmin'),
    });
    const navbarHeight = $('header').outerHeight();
    $(window).scroll(event => {
      didScroll = true;
      this.setState({ showOptions: false });
    });

    const hasScrolled = () => {
      let st = $(window).scrollTop();
      // Make sure they scroll more than delta
      if (Math.abs(lastScrollTop - st) <= delta) {
        return;
      }

      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is 'behind' the navbar.
      if (st > lastScrollTop && st > navbarHeight + 400) {
        // Scroll Down
        $('header')
          .removeClass('nav-down')
          .addClass('nav-up');
      } else if (st + $(window).height() < $(document).height()) {
        $('header')
          .removeClass('nav-up')
          .addClass('nav-down');
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

  handleLogin = () => {
    this.setState({
      showAuth: true,
      showOptions: false,
    });
  };

  closeAuthDialog = () => this.setState({ showAuth: false });

  render() {
    const {
      timestamp,
      showOptions,
      anchorEl,
      showAdmin,
      showAuth,
    } = this.state;

    const isLoggedIn = !!cookies.get('loggedIn');
    let avatarProps = null;
    if (isLoggedIn) {
      avatarProps = {
        name: cookies.get('emailId'),
        src: `${urls.API_URL}/getAvatar.png?access_token=${cookies.get(
          'loggedIn',
        )}&q=${timestamp}`,
      };
    }

    const TopRightMenu = props => (
      <div className="topRightMenu" onScroll={this.handleScroll}>
        {isLoggedIn && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <CircleImage {...avatarProps} size="32" />
            <label
              className="useremail"
              style={{
                color: 'white',
                fontSize: '16px',
                marginRight: '5px',
              }}
            >
              {cookies.get('username') === '' ||
              cookies.get('username') === 'undefined'
                ? cookies.get('emailId')
                : cookies.get('username')}
            </label>
          </div>
        )}
        <IconMenu
          {...props}
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
          {...props}
          animated={false}
          style={{
            float: 'right',
            position: 'relative',
            marginTop: '46px',
            marginRight: '8px',
          }}
          open={showOptions}
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.closeOptions}
        >
          {cookies.get('loggedIn') ? (
            <MenuItem
              primaryText="Dashboard"
              containerElement={<Link to="/dashboard" />}
              rightIcon={<Assessment />}
            />
          ) : null}
          <TopRightMenuItems />
          {cookies.get('loggedIn') ? (
            <MenuItem
              primaryText="Botbuilder"
              containerElement={<Link to="/botbuilder" />}
              rightIcon={<Extension />}
            />
          ) : null}
          {cookies.get('loggedIn') ? (
            <MenuItem
              href={urls.ACC_URL + '/settings'}
              rightIcon={<Settings />}
            >
              Settings
            </MenuItem>
          ) : null}
          {cookies.get('loggedIn') ? (
            <MenuItem href={urls.CHAT_URL + '/overview'} rightIcon={<Info />}>
              About
            </MenuItem>
          ) : null}
          {showAdmin === true ? (
            <MenuItem
              primaryText="Admin"
              containerElement={<Link to="/admin" />}
              rightIcon={<List />}
            />
          ) : null}
          {cookies.get('loggedIn') ? (
            <MenuItem
              primaryText="Logout"
              containerElement={<Link to="/logout" />}
              rightIcon={<Exit />}
            />
          ) : (
            <MenuItem
              primaryText="Login"
              onClick={this.handleLogin}
              rightIcon={<LoginIcon />}
            />
          )}
        </Popover>
      </div>
    );

    return (
      <div>
        <header className="nav-down" style={headerStyle} id="headerSection">
          <AppBar
            className="topAppBar"
            id="appBar"
            title={
              <div id="rightIconButton">
                <a
                  href="https://skills.susi.ai/"
                  style={{
                    float: 'left',
                    marginTop: '-10px',
                    height: '25px',
                    width: '122px',
                  }}
                >
                  <img src={susiWhite} alt="susi-logo" className="siteTitle" />
                </a>
              </div>
            }
            style={{
              backgroundColor: colors.header,
              height: '46px',
              boxShadow: 'none',
              margin: '0 auto',
            }}
            iconStyleRight={{ marginTop: '-2px' }}
            iconElementRight={<TopRightMenu />}
          />
        </header>
        {/* Auth */}
        {showAuth ? (
          <Auth
            history={this.props.history}
            defaultAuthSection="login"
            updateParentOpenState={this.closeAuthDialog}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ app }) => {
  return {
    app,
  };
};

export default connect(
  mapStateToProps,
  null,
)(StaticAppBar);
