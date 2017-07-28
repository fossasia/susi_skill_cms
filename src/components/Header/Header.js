import React from 'react';
import Button from "antd/es/button/button";
import Cookies from 'universal-cookie';
import Dialog from 'material-ui/Dialog';
import Login from "../Auth/Login/Login";
import SignUp from "../Auth/SignUp/SignUp";
import colors from "../../Utils/colors";
import Close from 'material-ui/svg-icons/navigation/close';
var deleteCookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
const cookies = new Cookies();

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showLogout: false,
            open:false,
            openSignUp:false
        }
    }

    componentDidMount() {
        console.log(cookies.get('loggedIn'))
        if(!cookies.get('loggedIn')) {
            this.setState({showLogout: false});
        }
        else
            this.setState({open: false, openSignUp:false, showLogout:true});
    }
    handleOpen = () => {
        this.setState({open: true, openSignUp: false });
      
    };
    handleOpenSignUp = () => {
        this.setState({openSignUp: true, open: false});
      
    };

    handleClose = () => {
        this.setState({ open: false, openSignUp: false });
    };

    logout = () => {
        deleteCookie('loggedIn');
        deleteCookie('serverUrl');
        deleteCookie('email');
        window.location.reload();
    };

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
        return (

            <div style={styles.header}>
                { !this.state.showLogout ?
                    <div>
                        <Button onClick={this.handleOpenSignUp} style={styles.buttonMargin}>Register</Button>
                        <Button onClick={this.handleOpen} style={styles.buttonMargin}>Login</Button>
                    </div>
                    :
                    <Button onClick={this.logout} style={styles.buttonMargin}>Logout</Button>

                }

                <Dialog
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <Login {...this.props} />
                    <Close style={closingStyle}
                           onTouchTap={this.handleClose} />
                </Dialog>
                <Dialog
                    modal={false}
                    open={this.state.openSignUp}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <SignUp {...this.props} />
                    <Close style={closingStyle}
                           onTouchTap={this.handleClose} />
                </Dialog>
            </div>
        );
    }
}

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
    buttonMargin:{
        margin:"10px"
    }
};
