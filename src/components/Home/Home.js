import React from 'react';
import { Icon } from 'antd';
import Chatbox from "../Chatbox/Chatbox";
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import {TextField} from "material-ui";
import RaisedButton from 'material-ui/RaisedButton';
import AceEditor from 'react-ace';
import Cookies from 'universal-cookie';
import 'brace/mode/markdown';
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/twilight';
import 'brace/theme/xcode';
import 'brace/theme/textmate';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';
import 'brace/theme/terminal';
import * as $ from "jquery";

const models = [];
const groups = [];
const languages = [];
const fontsizes =[];
const codeEditorThemes =[];
const cookies = new Cookies();

export default class Container extends React.Component {

    componentDidMount() {
        console.log(cookies.get('loggedIn'))
    }



    constructor(props) {
        super(props);
        this.state = {
            modelValue: null, groupValue:null, languageValue:null, expertValue:null,code:"// code", fontSizeCode:14, editorTheme:"github"
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
        console.log(this.state.code);
    }

    handleModelChange = (event, index, value) => {
        this.setState({modelValue: value});
        if(groups.length===0) {
            $.ajax({
                url: "http://api.susi.ai/cms/getGroups.json",
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


    buttonClick = () => {

        let url = "http://api.susi.ai/cms/getSkill.json?model="+models[this.state.modelValue].key+"&group="+groups[this.state.groupValue].key+"&language="+languages[this.state.languageValue].key+"&skill="+this.state.expertValue;
        console.log(url);
        let self = this;
        $.ajax({
            url: url,
            jsonpCallback: 'pc',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data) {
                self.updateCode(data.text)
            }
        });

    }

    render() {
        return (

            <div style={styles.home}>
                <div style={styles.dropdownDiv}>
                <SelectField
                    floatingLabelText="Model"
                    style={{width:'130px'}}
                    value={this.state.modelValue}
                    onMouseEnter={this.loadmodels}
                    onChange={this.handleModelChange}
                >
                    {models}
                </SelectField>
                <SelectField
                    floatingLabelText="Group"
                    style={{width:'160px'}}
                    value={this.state.groupValue}
                    onChange={this.handleGroupChange}
                >
                    {groups}
                </SelectField>
                <SelectField
                    floatingLabelText="Language"
                    style={{width:'90px'}}
                    value={this.state.languageValue}
                    onChange={this.handleLanguageChange}
                >
                    {languages}
                </SelectField>
                <TextField
                    hintText="Hint Text"
                    floatingLabelText="Fixed Floating Label Text"
                    floatingLabelFixed={true}
                    onChange={this.handleExpertChange}
                />

                        <RaisedButton labelPosition="before" label="Create" style={{height:52}} backgroundColor="#607D8B" labelColor="#ffffff" >
                            <input  style={styles.exampleImageInput} onClick={this.buttonClick}/>
                        </RaisedButton>
                </div>
                <div style={styles.codeEditor}>

                    <div style={styles.toolbar}>
                        <span style={styles.button}><Icon type="caret-right" style={styles.icon} />Run</span>
                        <span style={styles.button}><Icon type="cloud-download" style={styles.icon}/>Save</span>
                        <span style={styles.button}><Icon type="menu-unfold" style={styles.icon} />Indent</span>
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
                        mode="markdown"
                        theme={this.state.editorTheme}
                        width="100%"
                        fontSize={this.state.fontSizeCode}
                        height= "400px"
                        value={this.state.code}
                        name="skill_code_editor"
                        editorProps={{$blockScrolling: true}}
                    />

                    <Chatbox />

                </div>
            </div>

        );
    }
}

const styles = {
    home: {
        width: '100%'
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
        display: "flex",
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
