import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import Dialog from 'material-ui/Dialog';
import Login from '../Auth/Login/Login';
import SignUp from '../Auth/SignUp/SignUp';
import List from 'material-ui/svg-icons/action/list';
import ForgotPassword from '../Auth/ForgotPassword/ForgotPassword';
import Close from 'material-ui/svg-icons/navigation/close';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Popover from 'material-ui/Popover';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import Extension from 'material-ui/svg-icons/action/extension';
import LoginIcon from 'material-ui/svg-icons/action/account-circle';
import Info from 'material-ui/svg-icons/action/info';
import Chat from 'material-ui/svg-icons/communication/chat';
import SKillIcon from 'material-ui/svg-icons/action/dashboard';
import MenuItem from 'material-ui/MenuItem';
import Settings from 'material-ui/svg-icons/action/settings';
import { Link } from 'react-router-dom';
import susiWhite from '../images/SUSIAI-white.png';
import colors from '../../Utils/colors';
import urls from '../../Utils/colors';
import $ from 'jquery';
import './StaticAppBar.css';
// import ListUser from '../Admin/ListUser/ListUser';

const cookies = new Cookies();

let TopRightMenuItems = (props) => (
    <div>
        <MenuItem
            href='http://chat.susi.ai/overview'
            rightIcon={<Info />}>
            About
        </MenuItem>
        <MenuItem
            href='http://chat.susi.ai/'
            rightIcon={<Chat />}>
            Chat
        </MenuItem>
        <Link to = "/">
          <MenuItem
              rightIcon={<SKillIcon />}>
              Skills
          </MenuItem>
        </Link>
    </div>
);

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
            leftGap: '0px'
        }
    }

    handleScroll = (event) => {
        let scrollTop = event.pageY || event.target.body.scrollTop,
            itemTranslate = scrollTop > 60;
        if (itemTranslate) {
            this.closeOptions();
        }
    };

    componentDidMount() {
        if (this.props.location.pathname !== '/') {

            document.getElementById('appBar').classList.add('topAppBarFix');
        }

        window.addEventListener('scroll', this.handleScroll);
        let url;
        url = urls.API_URL + '/aaa/showAdminService.json?access_token=' + cookies.get('loggedIn');
        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback: 'pfns',
            jsonp: 'callback',
            crossDomain: true,
            success: function (newResponse) {
                let ShowAdmin = newResponse.showAdmin;
                cookies.set('showAdmin', ShowAdmin);
                this.setState({
                    showAdmin: ShowAdmin,
                });
                // console.log(newResponse.showAdmin)
            }.bind(this),
            error: function (newErrorThrown) {
                console.log(newErrorThrown)
            }
        });

        var didScroll;
        var lastScrollTop = 0;
        var delta = 5;
        this.setState({
            showAdmin: cookies.get('showAdmin'),
        });
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
            // This is necessary so you never see what is 'behind' the navbar.
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
        var p = $('#rightIconButton').width();
        var screenWidth = $(window).width();
        this.setState({ leftGap: ((screenWidth - p) / 2) + p - (cookies.get('loggedIn')?170:130) })
        event.preventDefault();
        this.setState({
            showOptions: true,
            anchorEl: event.currentTarget
        })
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
            showLogin: true,
            showSignUp: false,
            showForgotPassword: false,
            showOptions: false,
        });
    };

    handleSignUp = () => {
        this.setState({
            showSignUp: true,
            showLogin: false,
            showForgotPassword: false,
            showOptions: false,
        });
    };

    handleForgotPassword = () => {
        this.setState({
            showSignUp: false,
            showLogin: false,
            showForgotPassword: true,
            showOptions: false,
        });
    };

    handleClose = () => {
        this.setState({
            showOptions: false,
            showLogin: false,
            showSignUp: false,
            showForgotPassword: false,
        })
    };

    render() {

        const closingStyle = {
            position: 'absolute',
            zIndex: 1200,
            fill: '#444',
            width: '26px',
            height: '26px',
            right: '10px',
            top: '10px',
            cursor: 'pointer'
        };
        var leftGap = this.state.leftGap;

        const bodyStyle = {
            'padding': 0,
            textAlign: 'center'
        };
        const headerStyle = {
            'background': colors.header
        };
        let TopRightMenu = (props) => (
            <div onScroll={this.handleScroll}>
                <div>
                    {cookies.get('loggedIn') ?
                        (<label
                            style={{color: 'white', fontSize: '16px', verticalAlign:'super'}}>
                            {cookies.get('emailId')}
                            </label>) :
                        (<label>
                            </label>)
                    }
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
                        style={{ float: 'left', position: 'relative', marginTop: '46px', marginLeft: leftGap }}
                        open={this.state.showOptions}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                        onRequestClose={this.closeOptions}
                    >
                        <TopRightMenuItems />
                        {
                            this.state.showAdmin === true ?
                                (<MenuItem primaryText='Admin'
                                    containerElement={<Link to='/admin' />}
                                    rightIcon={<List />} />) :
                                (
                                    console.log('Admin page allowed ' + cookies.get('showAdmin'))
                                )

                        }
                        {cookies.get('loggedIn') ?
                            (<MenuItem primaryText='Botbuilder'
                                containerElement={<Link to='/botbuilder' />}
                                rightIcon={<Extension />} />) :
                            null
                        }
                        <MenuItem primaryText='Settings'
                            onTouchTap={this.handleClose}
                            containerElement={<Link to='/settings' />}
                            rightIcon={<Settings />} />
                        {cookies.get('loggedIn') ?
                            (<MenuItem primaryText='Logout'
                                containerElement={<Link to='/logout' />}
                                rightIcon={<Exit />} />) :
                            (<MenuItem primaryText='Login'
                                onTouchTap={this.handleLogin}
                                rightIcon={<LoginIcon />} />)
                        }
                    </Popover>
                </div>
            </div>
        );

        return (
            <div>
                <header className='nav-down' style={headerStyle} id='headerSection'>
                    <AppBar
                        className='topAppBar'
                        id='appBar'
                        title={<div id='rightIconButton' ><Link to='/' style={{ float: 'left', marginTop: '-10px',height:'25px',width:'122px' }}>
                            <img src={susiWhite} alt='susi-logo' className='siteTitle' /></Link></div>}
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
                        onSignUpLogin={this.handleSignUp} />
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

StaticAppBar.propTypes = {
  location: PropTypes.object
};

export default StaticAppBar;
