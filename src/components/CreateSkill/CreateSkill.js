import React from  'react';
import Icon from 'antd/lib/icon';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import isoConv from 'iso-language-converter';
import {Paper, RaisedButton, TextField} from 'material-ui';
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
import * as $ from 'jquery';
import notification from 'antd/lib/notification';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import LinearProgress from 'material-ui/LinearProgress';
const groups = [];
const languages = [];
const fontsizes =[];
const codeEditorThemes =[];
const cookies = new Cookies();

let self;
export default class CreateSkill extends React.Component {

    componentDidMount() {
        self = this;
        self.loadgroups()
    }


    constructor(props) {
        super(props);
        this.state = {
            groupSelect:true,
            languageSelect:true,
            expertSelect:true,
            showImage:false,
            loading:false,
            file:null,
            imageUrl:'<image_url>',
            commitMessage:null,
            modelValue: null,
            groupValue:null,
            languageValue:null,
            expertValue:null,
            code:'::name <Skill_name>\n::author <author_name>\n::author_url <author_url>\n::description <description> \n::dynamic_content <Yes/No>\n::developer_privacy_policy <link>\n::image <image_url>\n::terms_of_use <link>\n\n\nUser query1|query2|quer3....\n!example:<The question that should be shown in public skill displays>\n!expect:<The answer expected for the above example>\nAnswer for the user query',
            fontSizeCode:14,
            editorTheme:'github'
        };
        let fonts = [
            14,16,18,20,24,28,32,40
        ];
        let themes =[
            'monokai','github','tomorrow','kuroir','twilight','xcode','textmate','solarized_dark','solarized_light','terminal'
        ];
        for (let i = 0; i < fonts.length; i++) {
            fontsizes.push(<MenuItem value={fonts[i]}
                                     key={fonts[i]}
                                     primaryText={`${fonts[i]}`}/>);
        }
        for (let i = 0; i < themes.length; i++) {
            codeEditorThemes.push(<MenuItem value={themes[i]}
                                            key={themes[i]}
                                            primaryText={`${themes[i]}`}/>);
        }
    }

    onChange(newValue) {
        const match = newValue.match(/^::image\s(.*)$/m);
        const nameMatch = newValue.match(/^::name\s(.*)$/m);
        console.log(nameMatch);
        if(nameMatch) {
            self.setState({
                expertValue: nameMatch[1]
            });
            console.log(self.state.expertValue)
        }

        if(match!==null) {
            console.log(match[1]);

            self.setState({
                imageUrl: match[1]
            });
            console.log(new RegExp(/images\/\w+\.\w+/g).test(self.state.imageUrl));
        }
        self.updateCode(newValue)
    }

    loadgroups() {
        if(groups.length===0) {
            $.ajax({
                url: 'http://api.susi.ai/cms/getGroups.json',
                jsonpCallback: 'pa',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (d) {
                    console.log(d);
                    d= d.groups;
                    for (let i = 0; i < d.length; i++) {
                        groups.push(<MenuItem value={i}
                                              key={d[i]}
                                              primaryText={`${d[i]}`}/>);
                    }
                }
            });
        }
    }

    updateCode = (newCode) => {
        this.setState({
            code: newCode,
        });
    };

    handleExpertChange = (event) => {
        console.log(event.target.value);
        const expertValue = event.target.value;
        const code = this.state.code.replace(/^::name\s(.*)$/m, `::name ${expertValue}`);
        this.setState({
            expertValue,
            code
        });

    };

    handleCommitMessageChange = (event) => {
        console.log(event.target.value);
        this.setState({
            commitMessage: event.target.value,
        });

    };

    handleGroupChange = (event, index, value) => {
        this.setState({ groupValue: value, groupSelect: false, languageSelect: false });
        if (languages.length === 0) {
            $.ajax({
                url: 'http://api.susi.ai/cms/getAllLanguages.json',
                jsonpCallback: 'pc',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {

                    data = data.languagesArray
                    this.setState({ languages: data });
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        if (isoConv(data[i])) {
                            languages.push(<MenuItem  value={data[i]}
                                                      key={data[i]}
                                                      primaryText={isoConv(data[i])} />);
                        }
                        else {
                            languages.push(<MenuItem  value={data[i]}
                                                      key={data[i]}
                                                      primaryText={'Universal'} />);
                        }
                    }
                }.bind(this)
            });
        }
    };

    handleLanguageChange = (event, index, value) => {
      this.setState({
        languageValue: value,
        expertSelect:false
      });
    }

    handleFontChange = (event, index, value) => {
      this.setState({
        fontSizeCode: value
      });
    }

    handleThemeChange = (event, index, value) => {
      this.setState({
        editorTheme: value
      });
    }

    saveClick = () => {


        if(!cookies.get('loggedIn')) {
            notification.open({
                message: 'Not logged In',
                description: 'Please login and then try to create/edit a skill',
                icon: <Icon type='close-circle' style={{ color: '#f44336' }} />,
            });
            return 0;
        }
        if(groups.length===0||languages.length===0||this.state.expertValue===null){
            notification.open({
                message: 'Error Processing your Request',
                description: 'Please select a group, language and a skill',
                icon: <Icon type='close-circle' style={{ color: '#f44336' }} />,
            });
            return 0;
        }
        console.log(this.state.imageUrl);
        if(!new RegExp(/images\/\w+\.\w+/g).test(self.state.imageUrl)){
            notification.open({
                message: 'Error Processing your Request',
                description: 'image must be in format of images/imageName.jpg',
                icon: <Icon type='close-circle' style={{ color: '#f44336' }} />,
            });
            return 0;
        }
        if(this.state.file===null){
            notification.open({
                message: 'Error Processing your Request',
                description: 'Image Not Given',
                icon: <Icon type='close-circle' style={{ color: '#f44336' }} />,
            });
            return 0;
        }

        this.setState({
            loading:true
        });

        let form = new FormData();
        form.append('model', 'general');
        form.append('group', groups[this.state.groupValue].key);
        form.append('language', languages[this.state.languageValue].key);
        form.append('skill', this.state.expertValue.trim().replace(/\s/g,'_'));
        form.append('image', this.state.file);
        form.append('content', this.state.code);
        form.append('image_name', this.state.imageUrl.replace('images/',''));
        form.append('access_token', cookies.get('loggedIn'));

        let settings = {
            'async': true,
            'crossDomain': true,
            'url': 'http://api.susi.ai/cms/createSkill.json',
            'method': 'POST',
            'processData': false,
            'contentType': false,
            'mimeType': 'multipart/form-data',
            'data': form
        };

        $.ajax(settings)
            .done(function (response) {
                self.setState({
                    loading:false
                });
                let   data = JSON.parse(response);
                console.log(response);
                if(data.accepted===true){
                    self.props.history.push({
                        pathname: '/' + groups[self.state.groupValue].key  +
                                  '/' + self.state.expertValue.trim().replace(/\s/g,'_') +
                                  '/' +languages[self.state.languageValue].key,
                        state: {
                            from_upload: true,
                            expertValue:  self.state.expertValue,
                            groupValue: groups[self.state.groupValue].key ,
                            languageValue: languages[self.state.languageValue].key,
                        }});

                    notification.open({
                        message: 'Accepted',
                        description: 'Your Skill has been uploaded to the server',
                        icon: <Icon type='check-circle' style={{ color: '#00C853' }} />,
                    });

                }
                else{
                    self.setState({
                        loading:false
                    });
                    notification.open({
                        message: 'Error Processing your Request',
                        description: String(data.message),
                        icon: <Icon type='close-circle' style={{ color: '#f44336' }} />,
                    });
                }})
            .fail(function (jqXHR, textStatus) {
                self.setState({
                    loading:false
                });
                notification.open({
                    message: 'Error Processing your Request',
                    description: String(textStatus),
                    icon: <Icon type='close-circle' style={{ color: '#f44336' }} />,
                });
            });
    };


    _onChange =(event)=> {
        // Assuming only image
        let file = this.file.files[0];
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({image: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
            self.setState({
                showImage:true
            })
        }
        this.setState({
            file:file
        });
        console.log(file) // Would see a path?
        // TODO: concat files for setState
    };

    render() {
        const style = {
            width: '100%',
            padding: '10px'
        };
        return (
            <div>
                <StaticAppBar {...this.props} />
                <div style={styles.home}>

                    <Paper style={style} zDepth={1}>
                        <div style={styles.center}>
                            <div style={styles.dropdownDiv}>
                                <SelectField
                                    floatingLabelText="Category"
                                    style={{ width: 300,marginLeft:10,marginRight:10 }}
                                    value={this.state.groupValue}
                                    onChange={this.handleGroupChange}
                                >
                                    {groups}
                                </SelectField>
                                <SelectField
                                    floatingLabelText='Language'
                                    disabled={this.state.languageSelect}
                                    style={{ width:'125px',marginLeft:10,marginRight:10 }}
                                    value={this.state.languageValue}
                                    onChange={this.handleLanguageChange}
                                >
                                    {languages}
                                </SelectField>
                                <TextField
                                    disabled={this.state.expertSelect}
                                    floatingLabelText='Skill name'
                                    floatingLabelFixed={false}
                                    value={this.state.expertValue}
                                    hintText='Skill name'
                                    style={{marginLeft:10,marginRight:10}}
                                    onChange={this.handleExpertChange}
                                />
                                { this.state.showImage &&  <img alt='preview' id='target' style={{width:60,height:60,borderRadius:'50%',marginRight:20,border: 0}}src={this.state.image}/> }
                                <RaisedButton
                                    label='Choose an Image'
                                    labelPosition='before'
                                    backgroundColor='#4285f4'
                                    containerElement='label'
                                    labelColor='#fff'
                                >
                                    <input type='file' style={{
                                        cursor: 'pointer',
                                        position: 'absolute',
                                        top: 0,
                                        bottom: 0,
                                        right: 0,
                                        left: 0,
                                        width: '100%',
                                        opacity: 0,
                                    }}
                                           ref={(c) => { this.file = c; }}
                                           name='user[image]'
                                           multiple='false'
                                           onChange={this._onChange}/>
                                </RaisedButton>
                            </div>
                        </div>
                    </Paper>

                    <div style={styles.codeEditor}>
                        {this.state.loading && <LinearProgress mode='indeterminate' color='#4285f4' />}
                        <div style={styles.toolbar}>
                            <span style={styles.button}><Icon type='cloud-download' style={styles.icon}/>Download as text</span>
                            <span style={styles.button}>Size <SelectField
                                style={{ width:'60px' }}
                                onChange={this.handleFontChange}
                            >
                            {fontsizes}
                        </SelectField></span>

                            <span style={styles.button}>Theme <SelectField
                                style={{ width:'150px' }}
                                onChange={this.handleThemeChange}
                            >
                            {codeEditorThemes}
                        </SelectField></span>

                        </div>
                        <AceEditor
                            mode='java'
                            theme={this.state.editorTheme}
                            width='100%'
                            fontSize={this.state.fontSizeCode}
                            height= '400px'
                            value={this.state.code}
                            showPrintMargin={false}
                            name='skill_code_editor'
                            onChange={this.onChange}
                            scrollPastEnd={false}
                            wrapEnabled={true}
                            editorProps={{$blockScrolling: true}}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',marginTop:10 }}>
                            <Paper
                              style={{
                                width: '100%',
                                padding: 10,
                                display: 'flex',
                                alignItems: 'center',
                                textAlign: 'center',
                                justifyContent: 'center' }}
                              zDepth={1}>

                                <TextField
                                    floatingLabelText='Commit message'
                                    floatingLabelFixed={true}
                                    hintText="Enter Commit Message"
                                    style={{ width: '80%' }}
                                    onChange={this.handleCommitMessageChange}
                                />
                                <RaisedButton label='Save' backgroundColor='#4285f4' labelColor='#fff' style={{marginLeft:10}}  onTouchTap={this.saveClick} />
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
        padding: '80px 30px 30px',
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    codeEditor:{
        width: '100%',
        marginTop: '20px'
    },
    dropdownDiv:{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap'

    },
    toolbar: {
        width: '100%',
        height: '50px',
        background: '#fff',
        borderBottom: '2px solid #eee',
        display: 'none',
        alignItems: 'stretch',
        padding: '0 25px',
        fontSize: '14px',
    },
    button: {
        display: 'flex',
        marginRight: '30px',
        alignItems: 'center',
        cursor: 'pointer'
    },
    icon: {
        marginRight: '5px'
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
};
