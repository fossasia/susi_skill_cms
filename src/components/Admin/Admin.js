import React, {Component} from 'react';
import './Admin.css'
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import Dialog from 'material-ui/Dialog';
import $ from 'jquery'
import Cookies from 'universal-cookie'
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import {Tabs} from 'antd';
import ListUser from "./ListUser/ListUser";
// import ListUser from "./ListUser/ListUser";

const cookies = new Cookies();

const TabPane = Tabs.TabPane;

class Admin extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tabPosition: 'top',
            showNotAdminDialog: false,
        }
    }

    componentDidMount() {
        let url;
        url = "http://api.susi.ai/aaa/showAdminService.json?access_token=" + cookies.get('loggedIn');
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
            width: '100%',
            animated: false,
            textAlign: 'center',
            display: 'inline-block',
        };

        return (

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
                <div className="temp">
                    <Paper>
                        <div className="tabs">
                            <Tabs tabPosition={this.state.tabPosition}  animated={false}>
                                <TabPane tab="Admin" key="1">Tab for Admin Content</TabPane>
                                <TabPane tab="Users" key="2">
                                    <ListUser />
                                </TabPane>
                                <TabPane tab="Permissions" key="3">Permission Content Tab</TabPane>
                            </Tabs>
                            <Paper style={tabStyle} zDepth={5}>

                            </Paper>
                        </div>
                    </Paper>
                </div>
            </div>
        )
    }
}

Admin.propTypes = {
    history: PropTypes.object
};

export default Admin;
