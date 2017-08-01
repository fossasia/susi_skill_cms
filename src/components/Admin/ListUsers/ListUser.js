import React, { Component } from 'react';
import $ from 'jquery';


export default class ListUser extends React.Component {

    componentDidMount() {
        this.fetchUsers();
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
            }.bind(this),
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