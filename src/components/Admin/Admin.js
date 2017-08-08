import React, {Component} from 'react';
import './Admin.css'
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';


export default class Admin extends Component {


    render() {


        return(
            <div className="containerDiv">
                <div className="heading">
                    <StaticAppBar {...this.props}/>
                </div>
            </div>
        )
    }
}