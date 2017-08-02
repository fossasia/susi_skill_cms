import React, {Component} from 'react';
import $ from 'jquery';
import {Card, CardTitle} from 'material-ui/Card';
// import Dialog from 'material-ui/Dialog';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';


export default class ListUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: []
        }
    }

    componentDidMount() {

        let url;
        url = "http://api.susi.ai/aaa/account-permissions.json";
        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback: 'py',
            jsonp: 'callback',
            crossDomain: true,
            success: function (response) {
                console.log(response.userRole)
                if (response.userRole !== "admin") {
                    console.log("Not an admin")
                } else {
                    this.fetchUsers();
                    console.log("Admin")
                }
            }.bind(this),
            error: function (errorThrown) {
                console.log(errorThrown)
            }
        });
    }

    fetchUsers = () => {
        let url;
        url = "http://api.susi.ai/aaa/getAllUsers.json";
        let self = this;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback: 'pu',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data) {
                console.log(data.username)
                data = data.username
                let keys = Object.keys(data);
                let username = keys.map((el, i) => {
                    return (
                        <div>
                        </div>
                    )
                });
                self.setState({
                    username : username,
                })
                console.log(self.state)
            },
            error: function (errorThrown) {
                console.log(errorThrown)
            }
        });
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}
