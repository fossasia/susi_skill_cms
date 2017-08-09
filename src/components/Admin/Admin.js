import React, {Component} from 'react';
import './Admin.css'
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import Dialog from 'material-ui/Dialog';
import $ from 'jquery'
import Cookies from 'universal-cookie'
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';

const cookies = new Cookies();

class Admin extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showNotAdminDialog: false,
        }
    }

    componentDidMount() {
        let url;
        url = "http://api.susi.ai/aaa/account-permissions.json?access_token="+cookies.get('loggedIn');
        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback: 'pyfw',
            jsonp: 'callback',
            crossDomain: true,
            success: function (response) {
                console.log(response.userRole)
                if (response.userRole !== "admin") {
                    this.setState({
                        showNotAdminDialog: true,
                    })
                    console.log("user role = " + response.userRole)
                } else {
                    this.setState({
                        showNotAdminDialog: false,
                    })
                }
            }.bind(this),
            error: function (errorThrown) {
                this.setState({
                    showNotAdminDialog: true,
                })
                console.log(errorThrown)
            }.bind(this),
        });
    }

    handleClose = () => {
        this.props.history.push('/');
        window.location.reload();
    }

    render() {

        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return(
            <div className="containerDiv">
                <div className="heading">
                    <StaticAppBar {...this.props}/>
                    <h1 className="h1">SUSI.AI Admin Panel</h1>
                </div>
                <div>
                    <Dialog
                        title="Not an admin"
                        actions={actions}
                        modal={true}
                        open={this.state.showNotAdminDialog}>
                        You are not an admin yet!! :(
                    </Dialog>
                </div>
                <div>

                </div>
            </div>
        )
    }
}

Admin.propTypes = {
    history: PropTypes.object
};

export default Admin;
