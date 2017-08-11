import React from 'react';
import { Icon } from 'antd';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import {Paper, RaisedButton, TextField} from "material-ui";
import AceEditor from 'react-ace';
import Cookies from 'universal-cookie';
import 'brace/mode/markdown';
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/twilight';
import 'brace/theme/xcode';
import 'brace/mode/java';
import 'brace/theme/textmate';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';
import 'brace/theme/terminal';
import * as $ from "jquery";
import {notification} from 'antd';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
const models = [];
const groups = [];
const languages = [];
const fontsizes =[];
const codeEditorThemes =[];
const cookies = new Cookies();
let self,fromListing,url,skill_relative_path;
export default class Container extends React.Component {

    componentDidMount() {
        self = this;
        self.loadmodels()
        console.log(this.props)
            if (this.props.location.state) {
            url = this.props.location.state.url;
            console.log(url)
            skill_relative_path = this.props.location.state.url.match(/\?(.*)/)[1];
            fromListing = this.props.location.state.fromListing;
            console.log(fromListing)
            let self = this;
            $.ajax({
                url: url,
                jsonpCallback: 'pcc',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {
                    self.updateCode(data.text)
                }
            });
        }
    }
    onChange(newValue) {
        self.updateCode(newValue)
    }

    constructor(props) {
        fromListing = false;
        super(props);
        this.state = {
            commitMessage:null, modelValue: null, groupValue:null, languageValue:null, expertValue:null,code:"::name <Skill_name>\n::author <author_name>\n::author_url <author_url>\n::description <description> \n::dynamic_content <Yes/No>\n::developer_privacy_policy <link>\n::image <image_url>\n::terms_of_use <link>\n\n\nUser query1|query2|quer3....\n!example:<The question that should be shown in public skill displays>\n!expect:<The answer expected for the above example>\nAnswer for the user query", fontSizeCode:14, editorTheme:"github"
        };
        let fonts = [
            14,16,18,20,24,28,32,40
        ];
        let themes =[
            "monokai","github","tomorrow","kuroir","twilight","xcode","textmate","solarized_dark","solarized_light","terminal"
        ];
        for (let i = 0; i < fonts.length; i++) {
            fontsizes.push(<MenuItem value={fonts[i]} key={fonts[i]} primaryText={`${fonts[i]}`}/>);
        }
        for (let i = 0; i < themes.length; i++) {
            codeEditorThemes.push(<MenuItem value={themes[i]} key={themes[i]} primaryText={`${themes[i]}`}/>);
        }

    }

    loadmodels()
    {
        if(models.length===0) {
            $.ajax({
                url: "http://api.susi.ai/cms/getModel.json",
                jsonpCallback: 'pa',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (d) {
                    console.log(d);
                    for (let i = 0; i < d.length; i++) {
                        models.push(<MenuItem value={i} key={d[i]} primaryText={`${d[i]}`}/>);
                    }
                }
            });
        }
    }

    updateCode = (newCode) => {
        this.setState({
            code: newCode,
        });
    }

    handleModelChange = (event, index, value) => {
        this.setState({modelValue: value});
        if(groups.length===0) {
            $.ajax({
                url: "http://api.susi.ai/aaa/getGroups.json",
                jsonpCallback: 'pb',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {
                    console.log(data);

                    for (let i = 0; i < data.length; i++) {
                        groups.push(<MenuItem value={i} key={data[i]} primaryText={`${data[i]}`}/>);
                    }
                }
            });
        }
    }

    handleExpertChange = (event) => {
        console.log(event.target.value);
        this.setState({
            expertValue: event.target.value,
        });

    };

    handleCommitMessageChange = (event) => {
        console.log(event.target.value);
        this.setState({
            commitMessage: event.target.value,
        });

    };

    handleGroupChange = (event, index, value) => {
        this.setState({groupValue: value});
        if(languages.length===0) {
            $.ajax({
                url: "http://api.susi.ai/cms/getAllLanguages.json",
                jsonpCallback: 'pc',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        languages.push(<MenuItem value={i} key={data[i]} primaryText={`${data[i]}`}/>);
                    }
                    console.log("languages ", languages)
                }
            });
        }
    }

    handleLanguageChange = (event, index, value) => this.setState({languageValue: value});
    handleFontChange = (event, index, value) => this.setState({fontSizeCode: value});
    handleThemeChange = (event, index, value) => {this.setState({editorTheme: value});
    console.log(this.state.editorTheme)}

    saveClick = () => {

        if(!cookies.get('loggedIn')) {
            notification.open({
                message: 'Not logged In',
                description: 'Please login and then try to create/edit a skill',
                icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
            });
            return 0;
        }

        let url= "http://api.susi.ai/cms/modifySkill.json?"+skill_relative_path+"&content="+encodeURIComponent(this.state.code)+"&changelog="+this.state.commitMessage+"&access_token="+cookies.get('loggedIn');

        console.log(url)

            $.ajax({
                url:url,
                jsonpCallback: 'pc',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {
                    console.log(data);
                    if(data.accepted===true){
                        notification.open({
                            message: 'Accepted',
                            description: 'Your Skill has been uploaded to the server',
                            icon: <Icon type="check-circle" style={{ color: '#00C853' }} />,
                        });
                    }
                    else{
                        notification.open({
                            message: 'Error Processing your Request',
                            description: 'Please select a model, group, language and a skill',
                            icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
                        });
                    }
                },
                error: function(e) {
                    console.log(e);
                    notification.open({
                        message: 'Error Processing your Request',
                        description: 'Error in processing the request. Please try with some other skill',
                        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
                    });
                }
            });
    }


    render() {
        const style = {
            width: "100%",
            padding: "10px"
        };
        return (
          <div>
            <StaticAppBar {...this.props} />
            <div style={styles.home}>
                <Paper style={style} zDepth={1}>
                  <div>Currently Editing : <h3>{url}</h3></div>
                </Paper>

                <div style={styles.codeEditor}>

                    <div style={styles.toolbar}>
                        <span style={styles.button}><Icon type="cloud-download" style={styles.icon}/>Download as text</span>
                        <span style={styles.button}>Size <SelectField
                            style={{width:'60px'}}
                            onChange={this.handleFontChange}
                        >
                            {fontsizes}
                        </SelectField></span>

                        <span style={styles.button}>Theme <SelectField
                            style={{width:'150px'}}
                            onChange={this.handleThemeChange}
                        >
                            {codeEditorThemes}
                        </SelectField></span>

                    </div>
                    <AceEditor
                        mode="java"
                        theme={this.state.editorTheme}
                        width="100%"
                        fontSize={this.state.fontSizeCode}
                        height= "400px"
                        value={this.state.code}
                        showPrintMargin={false}
                        name="skill_code_editor"
                        onChange={this.onChange}
                        editorProps={{$blockScrolling: true}}
                    />
                    {/*<Chatbox />*/}
                </div>

                <div style={{display: "flex",alignItems:"center",textAlign:"center",justifyContent:"center", marginTop:10}}>
                    <Paper style={{width:"100%",padding:10,display: "flex",alignItems:"center",textAlign:"center",justifyContent:"center"}} zDepth={1}>

                    <TextField
                        floatingLabelText="Commit message"
                        floatingLabelFixed={true}
                        hintText="Enter Commit Message"
                        style={{width:"80%"}}
                        onChange={this.handleCommitMessageChange}
                    />
                    <RaisedButton label="Save" backgroundColor="#4285f4" labelColor="#fff" style={{marginLeft:10}}  onTouchTap={this.saveClick} />
                    </Paper>
                </div>
            </div>
          </div>
        );
    }
}

const styles = {
    home: {
        width: '100%',
        padding: "80px 30px 30px",
    },
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    codeEditor:{
        width: "100%",
        marginTop: "20px"
    },
    dropdownDiv:{
        display: "flex",
        alignItems: "center"

    },
    toolbar: {
        width: "100%",
        height: "50px",
        background: "#fff",
        borderBottom: "2px solid #eee",
        display: "none",
        alignItems: "stretch",
        padding: "0 25px",
        fontSize: "14px",
    },
    button: {
        display: "flex",
        marginRight: "30px",
        alignItems: "center",
        cursor: "pointer"
    },
    icon: {
        marginRight: "5px"
    },
    customWidth: {
        width: 50,
    },
    exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
}
