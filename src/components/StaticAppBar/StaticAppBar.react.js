import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import Auth from '../Auth/';
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
import Chat from 'material-ui/svg-icons/communication/chat';
import SkillIcon from 'material-ui/svg-icons/action/dashboard';
import CircleImage from '../CircleImage/CircleImage';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import susiWhite from '../../images/SUSIAI-white.png';
import { urls, colors, isProduction } from '../../utils';
import $ from 'jquery';
import './StaticAppBar.css';
// import ListUser from '../Admin/ListUser/ListUser';

const cookieDomain = isProduction() ? '.susi.ai' : '';

const cookies = new Cookies();

let TopRightMenuItems = props => (
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
    let scrollTop = event.pageY || event.target.body.scrollTop,
      itemTranslate = scrollTop > 60;
    if (itemTranslate) {
      this.closeOptions();
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    let url;
    if (cookies.get('loggedIn')) {
      url =
        urls.API_URL +
        '/aaa/showAdminService.json?access_token=' +
        cookies.get('loggedIn');

      $.ajax({
        url: url,
        dataType: 'jsonp',
        jsonpCallback: 'pfns',
        jsonp: 'callback',
        crossDomain: true,
        success: function(newResponse) {
          let ShowAdmin = newResponse.showAdmin;
          cookies.set('showAdmin', ShowAdmin, {
            path: '/',
            domain: cookieDomain,
          });
          this.setState({
            showAdmin: ShowAdmin,
          });
          // console.log(newResponse.showAdmin)
        }.bind(this),
        error: function(newErrorThrown) {
          console.log(newErrorThrown);
        },
      });

      $.ajax({
        url:
          urls.API_URL +
          '/aaa/listUserSettings.json?access_token=' +
          cookies.get('loggedIn'),
        jsonpCallback: 'pc',
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(data) {
          let userName = '';
          if (data.settings && data.settings.userName) {
            userName = data.settings.userName;
          }
          cookies.set('username', userName, {
            path: '/',
            domain: cookieDomain,
          });
        },
        error: function(errorThrown) {
          console.log(errorThrown);
        },
      });
    }

    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    this.setState({
      showAdmin: cookies.get('showAdmin'),
    });
    var navbarHeight = $('header').outerHeight();
    $(window).scroll(event => {
      didScroll = true;
      this.setState({ showOptions: false });
    });

    setInterval(function() {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 500);

    function hasScrolled() {
      var st = $(window).scrollTop();
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
    }
  }

  showOptions = event => {
    event.preventDefault();
    this.setState({
      showOptions: true,
      anchorEl: event.currentTarget,
    });
  };

  closeOptions = () => {
    if (this.state.showOptions) {
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
    const headerStyle = {
      background: colors.header,
    };

    const isLoggedIn = !!cookies.get('loggedIn');
    let avatarProps = null;
    if (isLoggedIn) {
      avatarProps = {
        name: cookies.get('emailId'),
        src: `${urls.API_URL}/getAvatar.png?access_token=${cookies.get(
          'loggedIn',
        )}&q=${this.state.timestamp}`,
      };
    }

    let TopRightMenu = props => (
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
          open={this.state.showOptions}
          anchorEl={this.state.anchorEl}
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
          {this.state.showAdmin === true ? (
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
                <Link
                  to="/"
                  style={{
                    float: 'left',
                    marginTop: '-10px',
                    height: '25px',
                    width: '122px',
                  }}
                >
                  <img src={susiWhite} alt="susi-logo" className="siteTitle" />
                </Link>
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
        {this.state.showAuth ? (
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

StaticAppBar.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

export default StaticAppBar;
