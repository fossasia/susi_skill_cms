import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as $ from 'jquery';
import Cookies from 'universal-cookie';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';
import colors from '../../../Utils/colors';
import urls from '../../../Utils/urls';
import { SketchPicker } from 'react-color';
const cookies = new Cookies();
let BASE_URL = urls.API_URL;
class Design extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            botbuilderBackgroundBody:'',
            botbuilderBodyBackgroundImg:'',
            botbuilderUserMessageBackground:'',
            botbuilderUserMessageTextColor:'',
            botbuilderBotMessageBackground:'',
            botbuilderBotMessageTextColor:'',
            botbuilderIconColor:'',
            botbuilderIconImg:'',
            saving:false,
            openSnackbar:false,
            msgSnackbar:'',
        }
        this.getSettings();
    }

    handleChangeComplete = (component,color) =>{
        this.setState({[component]:color.hex});
    }

    handleChangeBodyBackgroundImage = (botbuilderBodyBackgroundImg) =>{
        this.setState({botbuilderBodyBackgroundImg});
    }
    handleRemoveUrlBody = () =>{
        this.setState({botbuilderBodyBackgroundImg:''});
    }
    handleChangeIconImage = (botbuilderIconImg) =>{
        this.setState({botbuilderIconImg});
    }
    handleRemoveUrlIcon = () =>{
        this.setState({botbuilderIconImg:''});
    }
    implementSettings = () =>{
        // implement settings locally
    }
    handleSave = () =>{
        // send settings to server
        if(cookies.get('loggedIn')===null||
        cookies.get('loggedIn')===undefined) {
            return;
        }
        let settings = [
            {
                key:'botbuilderBackgroundBody',
                value:this.state.botbuilderBackgroundBody.substring(1)
            },
            {
                key:'botbuilderBodyBackgroundImg',
                value:this.state.botbuilderBodyBackgroundImg
            },
            {
                key:'botbuilderUserMessageBackground',
                value:this.state.botbuilderUserMessageBackground.substring(1)
            },
            {
                key:'botbuilderUserMessageTextColor',
                value:this.state.botbuilderUserMessageTextColor.substring(1)
            },
            {
                key:'botbuilderBotMessageBackground',
                value:this.state.botbuilderBotMessageBackground.substring(1)
            },
            {
                key:'botbuilderBotMessageTextColor',
                value:this.state.botbuilderBotMessageTextColor.substring(1)
            },
            {
                key:'botbuilderIconColor',
                value:this.state.botbuilderIconColor.substring(1)
            },
            {
                key:'botbuilderIconImg',
                value:this.state.botbuilderIconImg
            }
        ];
        let url = BASE_URL+'/aaa/changeUserSettings.json?'
        +'&access_token='+cookies.get('loggedIn');

        settings.forEach((obj,index) => {
            url += '&key'+(index+1).toString()+'='+obj.key
            +'&value'+(index+1).toString()+'='+(obj.value).toString();
        });
        url += '&count='+((settings).length).toString();
        this.setState({saving:true});
        $.ajax({
            url: url,
            jsonpCallback: 'pa',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data) {
                // successfully stored
                this.setState({
                    saving:false,
                    openSnackbar:true,
                    msgSnackbar:'Success! Saved settings'
                });
            }.bind(this)
        });
    }

    getSettings = () =>{
        let url = BASE_URL+'/aaa/listUserSettings.json?'
        +'&access_token='+cookies.get('loggedIn');
        $.ajax({
            url: url,
            jsonpCallback: 'pa',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data) {
                if(data.settings){
                    let settings = data.settings;
                    this.setState({
                        botbuilderBackgroundBody:'#'+settings.botbuilderBackgroundBody,
                        botbuilderBodyBackgroundImg:settings.botbuilderBodyBackgroundImg,
                        botbuilderUserMessageBackground:'#'+settings.botbuilderUserMessageBackground,
                        botbuilderUserMessageTextColor:'#'+settings.botbuilderUserMessageTextColor,
                        botbuilderBotMessageBackground:'#'+settings.botbuilderBotMessageBackground,
                        botbuilderBotMessageTextColor:'#'+settings.botbuilderBotMessageTextColor,
                        botbuilderIconColor:'#'+settings.botbuilderIconColor,
                        botbuilderIconImg:settings.botbuilderIconImg,
                    })
                }
            }.bind(this)
        });
    }

    render() {
        // Custom Theme feature Component
        const customiseOptionsList = [
            {'id':1, 'component':'botbuilderBackgroundBody', 'name': 'Body background'},
            {'id':2, 'component': 'botbuilderUserMessageBackground', 'name': 'User\'s message box background'},
            {'id':3, 'component': 'botbuilderUserMessageTextColor', 'name': 'User\'s message text color'},
            {'id':4, 'component': 'botbuilderBotMessageBackground', 'name': 'Bot\'s message box background'},
            {'id':5, 'component': 'botbuilderBotMessageTextColor', 'name': 'Bot\'s message text color'},
            {'id':6, 'component':'botbuilderIconColor', 'name': 'Bot Icon'}
        ];
        const customizeComponents = customiseOptionsList.map((component) => {
            return <div key={component.id} className='circleChoose'>
                <h2>Color of {component.name}:</h2>
                <div className='center'>
                    <SketchPicker
                        className='center'
                        color={ this.state[component.component] }
                        onChangeComplete={(color)=>
                            this.handleChangeComplete(component.component,color) }
                        />
                    </div>
                    {component.component === 'botbuilderBackgroundBody' && <div>
                        <TextField
                            name='backgroundImg'
                            onChange={(e,value)=>
                                this.handleChangeBodyBackgroundImage(value) }
                                value={this.state.botbuilderBodyBackgroundImg}
                                floatingLabelText='Body Background Image URL'
                            />
                            <RaisedButton
                                name='removeBackgroundBody'
                                key={'RemoveBody'}
                                backgroundColor={colors.header}
                                style={{marginLeft:'5px'}}
                                label='Remove URL'
                                labelColor='#fff'
                                onTouchTap={this.handleRemoveUrlBody}
                            />
                        </div>}
                        {component.component === 'botbuilderIconColor' && <div>
                            <TextField
                                name='iconImg'
                                onChange={(e,value)=>this.handleChangeIconImage(value) }
                                value={this.state.botbuilderIconImg}
                                floatingLabelText='Icon URL'
                            />
                            <RaisedButton
                                name='removeIconUrl'
                                key={'RemoveIconUrl'}
                                backgroundColor={colors.header}
                                style={{marginLeft:'5px'}}
                                label='Remove URL'
                                labelColor='#fff'
                                onTouchTap={this.handleRemoveUrlIcon}
                            />
                        </div>}

                        <br/>
                    </div>
                })
                return(
                    <div className="center menu-page">
                        <div className='design-box'>
                            {customizeComponents}
                            <div className='center'>
                                <RaisedButton
                                    name='save'
                                    backgroundColor={colors.header}
                                    onTouchTap={this.handleSave}
                                    labelColor='#fff'
                                    label={this.state.saving?<CircularProgress color="#ffffff" size={32}/>:'Save Changes'}
                                />
                            </div>
                        </div>
                        <Snackbar
                            open={this.state.openSnackbar}
                            message={this.state.msgSnackbar}
                            autoHideDuration={2000}
                            onRequestClose={()=>{this.setState({openSnackbar:false})}}
                        />
                    </div>
                )
            }
        }


        Design.propTypes = {
        };

        export default Design;
