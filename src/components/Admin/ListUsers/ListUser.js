

import * as React from "react";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import { FloatingActionButton, Paper} from "material-ui";
import ContentAdd from "material-ui/svg-icons/navigation/arrow-forward";
import {Card, CardTitle} from 'material-ui/Card';
import * as $ from "jquery";
import Link from "react-router-dom/es/Link";
//import colors from "../../../Utils/colors";
//import CircleImage from "../..*CircleImage/CircleImage";

export default class ListUser extends React.Component{
    constructor(props){
        super(props);

    }

    componentDidMount(){
        this.fetchUsers();
    }

    fetchUsers = () => {
        let url;
        url = "http://127.0.0.1:4000/aaa/getAllUsers.json";
        let self = this;
        $.ajax({
            url: url,
            jsonpCallback: 'pxcd',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data) {
                console.log(data);
            }
        });
    }
}