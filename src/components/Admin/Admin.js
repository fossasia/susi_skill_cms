import React, {Component} from 'react';
import './Admin.css'
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import Dialog from 'material-ui/Dialog';
import $ from 'jquery'
import Cookies from 'universal-cookie'
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import Tabs from 'react-tabs-navigation'
import ListUser from "./ListUser/ListUser";

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
        url = "http://api.susi.ai/aaa/showAdminService.json?access_token="+cookies.get('loggedIn');
        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback: 'pyfw',
            jsonp: 'callback',
            crossDomain: true,
            success: function (response) {
                console.log(response.showAdmin)
                if (response.showAdmin !== true) {
                    this.setState({
                        showNotAdminDialog: true,
                    })
                } else {
                    this.setState({
                        showNotAdminDialog: false,
                    })
                }
            }.bind(this),
            error: function (errorThrown) {
                this.setState({
                    showNotAdminDialog: false,
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

        const tabStyle = {
            backgroundColor: '#4285F4',
        };

        return(

            <div className="containerDiv">
                <div className="heading">
                    <StaticAppBar {...this.props}/>
                    <h1 className="h1">SUSI.AI Admin Panel</h1>
                </div>
                <div>
                    <Dialog
                        title="Permission Denied"
                        actions={actions}
                        modal={true}
                        open={this.state.showNotAdminDialog}>
                        You do not have permissions to access this page!! :(
                    </Dialog>
                </div>
                <div>
                    <Tabs
                        tabs={[
                            {
                                children: () => (
                                    <div>
                                        This is the first tab content
                                    </div>
                                ),
                                displayName: 'Admin'
                            },
                            {
                                children: () => (
                                    <div>
                                        <ListUser />
                                    </div>
                                ),
                                displayName: 'Users'
                            },
                            {
                                children: () => (
                                    <div>
                                        This is the second tab content
                                    </div>
                                ),
                                displayName: 'Permissions'
                            }
                        ]}
                        lineStyle={tabStyle}
                    />
                </div>
            </div>
        )
    }
}

Admin.propTypes = {
    history: PropTypes.object
};

export default Admin;
