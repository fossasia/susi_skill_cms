import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Dialog from 'material-ui/Dialog';
import Login from "../Auth/Login/Login";
import SignUp from "../Auth/SignUp/SignUp";
import List from 'material-ui/svg-icons/action/list';
import ForgotPassword from "../Auth/ForgotPassword/ForgotPassword";
import Close from 'material-ui/svg-icons/navigation/close';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Popover from 'material-ui/Popover';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import LoginIcon from 'material-ui/svg-icons/action/account-circle';
import Info from 'material-ui/svg-icons/action/info';
import Chat from 'material-ui/svg-icons/communication/chat';
import SKillIcon from 'material-ui/svg-icons/action/dashboard';
import MenuItem from 'material-ui/MenuItem';
import Settings from 'material-ui/svg-icons/action/settings';
import { Link } from 'react-router-dom';
import susiWhite from '../images/SUSIAI-white.png';
import $ from 'jquery';
import './StaticAppBar.css';

const cookies = new Cookies();

let TopRightMenuItems = (props) => (
    <div>
      <MenuItem
        href="http://chat.susi.ai/overview"
        rightIcon={<Info/>}>
        About
      </MenuItem>
      <MenuItem
        href="http://chat.susi.ai/"
        rightIcon={<Chat/>}>
        Chat
      </MenuItem>
      <MenuItem
        href="http://skills.susi.ai/"
        rightIcon={<SKillIcon/>}>
        Skills
      </MenuItem>
      <MenuItem primaryText="List Users"
          onTouchTap={this.handleClose}
          containerElement={<Link to="/listUser" />}
                rightIcon={<List/>}
      />
      <MenuItem primaryText="Settings"
        onTouchTap={this.handleClose}
        containerElement={<Link to="/settings" />}
        rightIcon={<Settings/>}/>
    </div>
)

class StaticAppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showLogin: false,
          showSignUp: false,
          showForgotPassword: false,
          showOptions: false,
          showAdmin: false,
          anchorEl: null,
        }
    }

    handleScroll = (event) => {
        let scrollTop = event.srcElement.body.scrollTop,
            itemTranslate = scrollTop > 60;
        if (itemTranslate) {
            this.closeOptions();
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);

        var didScroll;
        var lastScrollTop = 0;
        var delta = 5;
        var navbarHeight = $('header').outerHeight();
        $(window).scroll(function (event) {
            didScroll = true;
        });

        setInterval(function () {
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
            // This is necessary so you never see what is "behind" the navbar.
            if (st > lastScrollTop && st > navbarHeight + 400) {
                // Scroll Down
                $('header').removeClass('nav-down').addClass('nav-up');
            } else if (st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up').addClass('nav-down');
            }

            lastScrollTop = st;
        }
    }

    showOptions = (event) => {
  		this.setState({
        showOptions: true,
  			anchorEl: event.currentTarget,
      });
  	}

  	closeOptions = () => {
  		this.setState({
        showOptions: false,
      });
  	}

    handleLogin = () => {
      this.setState({
        showLogin: true,
        showSignUp: false,
        showForgotPassword: false,
        showOptions: false,
      });
    }

    handleSignUp = () => {
      this.setState({
        showSignUp: true,
        showLogin: false,
        showForgotPassword: false,
        showOptions: false,
      });
    }

    handleForgotPassword = () => {
      this.setState({
        showSignUp: false,
        showLogin: false,
        showForgotPassword: true,
        showOptions: false,
      });
    }

    handleClose = ()  => {
  		this.setState({
  			showOptions: false,
  			showLogin: false,
  			showSignUp: false,
        showForgotPassword: false,
  		})
  	}

    render() {

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

      const bodyStyle = {
        'padding': 0,
        textAlign: 'center'
      }

      let TopRightMenu = (props) => (
        <div onScroll={this.handleScroll}>
          <div>
            <IconMenu
            {...props}
              iconButtonElement={
                <IconButton
                  iconStyle={{ fill: 'white' }}><MoreVertIcon /></IconButton>
              }
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              onTouchTap={this.showOptions}
              >
            </IconMenu>
            <Popover
            {...props}
              style={{ float: 'right', position: 'relative', right: '0px', margin: '46px 20px 0 0' }}
              open={this.state.showOptions}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              onRequestClose={this.closeOptions}
            >
              <TopRightMenuItems />
              {cookies.get('loggedIn') ?
               (<MenuItem primaryText="Logout"
                containerElement={<Link to="/logout" />}
                rightIcon={<Exit />}/>) :
               (<MenuItem primaryText="Login"
                onTouchTap={this.handleLogin}
                rightIcon={<LoginIcon/>} />)
              }
            </Popover>
          </div>
        </div>
      )

        return (
            <div>
                <header className="nav-down" id="headerSection">
                    <AppBar
                        className="topAppBar"
                        title={<div style={{ float: 'left', marginTop: '-10px' }}><Link to="/" >
                            <img src={susiWhite} alt="susi-logo" className="siteTitle" /></Link></div>}
                        style={{
                            backgroundColor: '#4285f4', height: '46px',
                            boxShadow: 'none'
                        }}
                        iconStyleRight={{marginTop: '-2px'}}
                        iconElementRight={<TopRightMenu />}
                    />
                </header>
                {/* Login */}
                <Dialog
                    modal={false}
                    open={this.state.showLogin}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                    bodyStyle={bodyStyle}
                    contentStyle={{ width: '35%', minWidth: '300px' }}
                >
                    <Login {...this.props}
                      onForgotPwdLogin={this.handleForgotPassword}
                      onSignUpLogin={this.handleSignUp}/>
                    <Close style={closingStyle}
                           onTouchTap={this.handleClose} />
                </Dialog>
                {/* SignUp */}
                <Dialog
                    modal={false}
                    open={this.state.showSignUp}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                    bodyStyle={bodyStyle}
                    contentStyle={{ width: '35%', minWidth: '300px' }}
                >
                    <SignUp {...this.props}
                      onRequestClose={this.handleClose}
                      onLoginSignUp={this.handleLogin} />
                    <Close style={closingStyle}
                           onTouchTap={this.handleClose} />
                </Dialog>
                {/* Forgot Password */}
                <Dialog
                    modal={false}
                    open={this.state.showForgotPassword}
                    autoScrollBodyContent={true}
                    bodyStyle={bodyStyle}
                    contentStyle={{ width: '35%', minWidth: '300px' }}
                    onRequestClose={this.handleClose}
                >
                    <ForgotPassword {...this.props}
                      onRequestClose={this.handleClose} />
                    <Close style={closingStyle}
                        onTouchTap={this.handleClose} />
                </Dialog>
            </div>
        );
    }

}

export default StaticAppBar;
