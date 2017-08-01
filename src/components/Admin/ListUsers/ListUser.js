import React, { Component } from 'react';
import $ from 'jquery';
// import Dialog from 'material-ui/Dialog';



export default class ListUser extends Component {

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
                if(response.userRole!=="admin") {
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
        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback: 'pu',
            jsonp: 'callback',
            crossDomain: true,
            success: function (response) {
                console.log(response.username)
            },
            error: function (errorThrown) {
                console.log(errorThrown)
            }
        });
    }

    render() {
        return(
            <div>
            </div>
        );
    }
}
