import React from 'react';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import * as $ from 'jquery';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Paper , FlatButton , Dialog} from 'material-ui';
import colors from '../../Utils/colors';
import urls from '../../Utils/urls';
import Colors from './../CustomThemes/colors';
const cookies = new Cookies();
let BASE_URL = urls.API_URL;

class Settings extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            theme: 'light',
            initialTheme: 'light',
            open: false
        }
    }
    handleSelectChange= (event, index, value) => {
        this.setState({theme:value});
    }
    implementSettings = () => {
        this.props.history.push('/');
        window.location.reload();
    }
    checkThemeChange = () => {
        let changed = true;
        if(this.state.initialTheme===this.state.theme) {
            changed = false;
        }
        return changed;
    }
    handleSubmit = () => {
        let vals = {
            theme:this.state.theme,
            initialTheme: this.state.theme
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
          +'&access_token='+cookies.get('loggedIn')+'&count=2&key1=theme&value1='+this.state.theme
          +'&key2=initialTheme&value2='+this.state.theme
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
                    theme: settings.theme,
                    initialTheme: settings.theme
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

    handleOpen = () => {
        this.setState({open: true});
      };

      handleClose = () => {
        this.setState({open: false});
      };

    handleCloseReset = () => {
        this.setState({open: false});
        localStorage.setItem('backgroundColor', '');
    };

    render() {
        const style = {
          width: '100%',
          padding: '30px',
          textAlign: 'center',
          marginTop:'20px'
        };
        const actions = [
            <FlatButton
              label="Reset"
              primary={true}
              onClick={this.handleCloseReset}
              key="1"
            />,
            <FlatButton
              label="Apply"
              primary={true}
              onClick={this.handleClose}
              key="2"
            />,
          ];
        const flex= {
            'display':'inline-flex',
            'textAlign':'center'
        };
        const head ={
            'marginBottom':'0px',
           'lineHeight': '56px'
        };
        var changed = this.checkThemeChange();
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
              <br/><br/>
              <RaisedButton
                label='Save'
                backgroundColor={colors.header}
                disabled={!changed}
                labelColor='#fff'
                onClick={this.handleSubmit}
              />
              <h3 style={head}>OR</h3>
              <div>
              <div>
                <RaisedButton label="Custom Themes" onClick={this.handleOpen} />
                <Dialog
                title="Custom Themes"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                >
              <h3 style={{colors:'black'}}>Background Color</h3>
              <Colors name="backgroundColor" />
                </Dialog>
                </div>
             </div>
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
