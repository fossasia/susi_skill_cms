import React from 'react';
import Cookies from 'universal-cookie';
import Dialog from 'material-ui/Dialog';
import Login from "../Auth/Login/Login";
import SignUp from "../Auth/SignUp/SignUp";
import colors from "../../Utils/colors";
import Close from 'material-ui/svg-icons/navigation/close';
import Snackbar from 'material-ui/Snackbar';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Popover from 'material-ui/Popover';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import SignUpIcon from 'material-ui/svg-icons/action/account-circle';
import MenuItem from 'material-ui/MenuItem';
import PropTypes  from 'prop-types';
import Settings from 'material-ui/svg-icons/action/settings';
import {Link} from 'react-router-dom';
import {Icon} from 'antd';
import susiLogo from '../images/susi-white.svg';
import $ from 'jquery';

var deleteCookie = function (name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
const cookies = new Cookies();

let TopRightMenu = (props) => (
    <IconMenu
        {...props}
        iconButtonElement={
            <IconButton
                iconStyle={{fill: 'white'}}><MoreVertIcon/></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
    </IconMenu>
)

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showLogin: false,
            showSignUp: false,
            showOptions: false,
            anchorEl: null,
        }
    }

    componentDidMount() {
        // dummy setState to update the top right menu
        this.setState({
            populateTopRightMenu: true,
        });
        // Check Logged in
        console.log(cookies.get('loggedIn'));
        if (cookies.get('loggedIn')) {
            TopRightMenu = (props) => (
                <div>
                    <IconButton
                        {...props}
                        iconStyle={{fill: 'white'}}
                        onTouchTap={this.showOptions}>
                        <MoreVertIcon/>
                    </IconButton>
                    <Popover
                        {...props}
                        style={{marginLeft: '-15px'}}
                        open={this.state.showOptions}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        onRequestClose={this.closeOptions}
                    >
                        <MenuItem primaryText="Settings"
                                  onTouchTap={this.handleClose}
                                  containerElement={<Link to="/settings"/>}
                                  rightIcon={<Settings/>}/>
                        <MenuItem primaryText="Skill Editor"
                                  onTouchTap={this.handleClose}
                                  containerElement={<Link to="/skillEditor"/>}
                                  rightIcon={<Icon type="code"/>}/>
                        <MenuItem primaryText="List Users"
                                  onTouchTap={this.handleListUsers()}/>
                        <MenuItem primaryText="Logout"
                                  onTouchTap={this.logout}
                                  rightIcon={<Exit/>}/>
                    </Popover>
                </div>
            )
            return <TopRightMenu/>
        }

        // If Not Logged In
        TopRightMenu = (props) => (
            <div>
                <IconButton
                    {...props}
                    iconStyle={{fill: 'white'}}
                    onTouchTap={this.showOptions}>
                    <MoreVertIcon/>
                </IconButton>
                <Popover
                    {...props}
                    style={{marginLeft: '-15px'}}
                    open={this.state.showOptions}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    onRequestClose={this.closeOptions}
                >
                    <MenuItem primaryText="Settings"
                              onTouchTap={this.handleClose}
                              containerElement={<Link to="/settings"/>}
                              rightIcon={<Settings/>}/>
                    <MenuItem primaryText="Skill Editor"
                              onTouchTap={this.handleClose}
                              containerElement={<Link to="/skillEditor"/>}
                              rightIcon={<Icon type="code"/>}/>
                    <MenuItem primaryText="Login"
                              onTouchTap={this.handleLogin}/>
                    <MenuItem primaryText="Sign Up"
                              onTouchTap={this.handleSignUp}
                              rightIcon={<SignUpIcon/>}/>
                </Popover>
            </div>
        )
        return <TopRightMenu/>
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

    handleListUsers = () => {
        let url;
        url = "http://api.susi.ai/aaa/account-permissions.json";
        $.ajax({
           url: url,
           dataType: 'jsonp',
            jsonpCallback: 'py',
            jsonp: 'callback',
            crossDomain: true,
            success: function (response) {
               let keys = Object.keys(response)
                console.log(response.userRole)
                if(response.userRole!=="admin") {
                   console.log("Not an admin")
                } else {
                   this.props.history.push('/listUser');
                   console.log("Admin")
                }
            }.bind(this),
            error: function (errorThrown) {
                console.log(errorThrown)
            }
        });
    }

    handleLogin = () => {
        this.setState({
            showLogin: true,
            showSignUp: false,
            showOptions: false,
        });
    }

    handleSignUp = () => {
        this.setState({
            showSignUp: true,
            showLogin: false,
            showOptions: false,
        });
    }

    handleClose = () => {
        this.setState({
            showOptions: false,
            showLogin: false,
            showSignUp: false,
        })
    }

    logout = () => {
        deleteCookie('loggedIn');
        deleteCookie('serverUrl');
        deleteCookie('email');
        window.location.reload();
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
        }

        const bodyStyle = {
            'padding': 0,
            textAlign: 'center'
        }

        return (

            <div>
                <AppBar
                    style={styles.header}
                    iconElementLeft={<div><Link to="/">
                        <img style={styles.logo} src={susiLogo} alt=""/>
                    </Link></div>}
                    iconStyleRight={{marginTop: '-2px'}}
                    iconElementRight={<TopRightMenu/>}
                />

                <Dialog
                    modal={false}
                    open={this.state.showLogin}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                    bodyStyle={bodyStyle}
                    contentStyle={{width: '35%', minWidth: '300px'}}
                >
                    <Login {...this.props}
                           onSignUpLogin={this.handleSignUp}/>
                    <Close style={closingStyle}
                           onTouchTap={this.handleClose}/>
                </Dialog>
                <Dialog
                    modal={false}
                    open={this.state.showSignUp}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                    bodyStyle={bodyStyle}
                    contentStyle={{width: '35%', minWidth: '300px'}}
                >
                    <SignUp {...this.props}
                            onRequestClose={this.handleClose}
                            onLoginSignUp={this.handleLogin}/>
                    <Close style={closingStyle}
                           onTouchTap={this.handleClose}/>
                </Dialog>
            </div>
        );
    }
}
Header.propTypes = {
    history: PropTypes.object
};
const styles = {
    header: {
        width: "100%",
        height: "50px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        background: colors.header,
        zIndex: 9,
        padding: "0 30px",
        color: "#fff",
        fontSize: "16px",
    },
    logo: {
        width: '150px',
        padding: '20px'
    }
};
