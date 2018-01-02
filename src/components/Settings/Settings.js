import React from 'react';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import * as $ from 'jquery';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Paper } from 'material-ui';
import colors from '../../Utils/colors';
import urls from '../../Utils/urls'
const cookies = new Cookies();
let BASE_URL = urls.API_URL;

class Settings extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            theme: 'light'
        }
    }
    handleSelectChange= (event, index, value) => {
        this.setState({theme:value});
    }
    implementSettings = () => {
        this.props.history.push('/');
        window.location.reload();
    }
    handleSubmit = () => {
        let vals = {
            theme:this.state.theme
        }

        if(cookies.get('loggedIn')===null||
          cookies.get('loggedIn')===undefined) {
            let settings = Object.assign({}, vals);
            settings.LocalStorage = true;
            // Store in cookies for anonymous user
            cookies.set('settings',settings);
            this.implementSettings();
        }
        else{
        // Send settings to server
        let url = BASE_URL+'/aaa/changeUserSettings.json?'
          +'&access_token='+cookies.get('loggedIn')+'&count=1&key1=theme&value1='+this.state.theme
        $.ajax({
                url: url,
                jsonpCallback: 'pa',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {
                    let settings = Object.assign({}, vals);
                    cookies.set('settings',settings);
                    this.implementSettings();
                }.bind(this)
        });
        }
    }
    componentDidMount(){
        let state = this.state;
        let url = BASE_URL+'/aaa/listUserSettings.json?'
            +'access_token='+cookies.get('loggedIn');
        // For Anonymous Users
        if(cookies.get('loggedIn')===null||
            cookies.get('loggedIn')===undefined){
            let settings = cookies.get('settings');
            if(settings!==undefined&&settings.hasOwnProperty('LocalStorage')){
              // Check if the settings are set in the cookie
                this.setState({
                    theme: settings.theme
                });
            }
        }
        // For Logged in users
        else{
            $.ajax({
                    url: url,
                    jsonpCallback: 'pa',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    crossDomain: true,
                    success: function (data) {
                        if(!data.settings){
                            debugger;
                            state.theme = 'light';
                        }
                        else{
                            state.theme = data.settings.theme;
                        }
                        this.setState(state);
                    }.bind(this)
            });
        }
    }

    render() {
        const style = {
          width: '100%',
          padding: '20px',
          textAlign: 'center',
          marginTop:'20px'
        };
        const flex= {
            'display':'inline-flex',
            'textAlign':'center'
        };
        const head ={
            'marginBottom':'0px',
           'lineHeight': '56px'
        }
        return(
            <div>
              <StaticAppBar {...this.props} />
              <div style={styles.home}>
              <Paper style={style} zDepth={1}>
              <h1 style={styles.bg}>Settings</h1>
              <div style={flex}>
              <h3 style={head}>Change Theme</h3>
              <DropDownMenu
                label='Default Theme'
                value={this.state.theme}
                onChange={this.handleSelectChange}>
                <MenuItem value={'light'} primaryText='Light' />
                <MenuItem value={'dark'} primaryText='Dark'  />
              </DropDownMenu>
              </div>
              <br/>
              <RaisedButton
                label='Save'
                backgroundColor={colors.header}
                labelColor='#fff'
                onClick={this.handleSubmit}
              />
              </Paper>
              </div>
            </div>
       )
    }
}

const styles = {
    home: {
        width: '100%',
        padding: '40px 30px 30px',
    },
    bg: {
        textAlign: 'center',
        padding: '30px',
    }
};

Settings.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
};

export default Settings;
