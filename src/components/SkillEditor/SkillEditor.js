import React from 'react';
import Icon from 'antd/lib/icon';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { Paper, RaisedButton, TextField } from "material-ui";
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
import notification from 'antd/lib/notification';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
const groups = [];
const languages = [];
const fontsizes = [];
const codeEditorThemes = [];
const cookies = new Cookies();

let self, url ;
export default class Container extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showImage: true,
            image: '',
            commitMessage: null,
            modelValue: 'general',
            file: null,
            codeChanged: false,
             groupValue: this.props.location.pathname.split('/')[1],
            oldGroupValue: this.props.location.pathname.split('/')[1],
            languageValue: this.props.location.pathname.split('/')[4],
            expertValue: this.props.location.pathname.split('/')[2],
            oldExpertValue: this.props.location.pathname.split('/')[2],
            oldImageUrl: '',
            imageUrl: '',
            image_name_changed: false,
            code: "::name <Skill_name>\n::author <author_name>\n::author_url <author_url>\n::description <description> \n::dynamic_content <Yes/No>\n::developer_privacy_policy <link>\n::image <image_url>\n::terms_of_use <link>\n\n\nUser query1|query2|quer3....\n!example:<The question that should be shown in public skill displays>\n!expect:<The answer expected for the above example>\nAnswer for the user query",
            fontSizeCode: 14,
            editorTheme: "github"
        };
        console.log(this.state);
        let fonts = [
            14, 16, 18, 20, 24, 28, 32, 40
        ];
        let themes = [
            "monokai", "github", "tomorrow", "kuroir", "twilight", "xcode", "textmate", "solarized_dark", "solarized_light", "terminal"
        ];
        for (let i = 0; i < fonts.length; i++) {
            fontsizes.push(<MenuItem value={fonts[i]} key={fonts[i]
            } primaryText={`${fonts[i]}`} />);
        }
        for (let i = 0; i < themes.length; i++) {
            codeEditorThemes.push(<MenuItem value={themes[i]} key={themes[i]} primaryText={`${themes[i]}`} />);
        }

    }
    updateData(skillData) {
        this.imgUrl = 'https://raw.githubusercontent.com/fossasia/susi_skill_data/master/models/general/' + this.state.groupValue + '/' + this.state.languageValue + '/' + skillData.image;
        console.log('imgUrl - editor', this.imgUrl);
        this.setState({
            'image': this.imgUrl
        });
    }
    loadgroups() {
        if (groups.length === 0) {
            $.ajax({
                url: "http://api.susi.ai/cms/getGroups.json",
                jsonpCallback: 'pa',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (d) {
                    d = d.groups;
                    for (let i = 0; i < d.length; i++) {
                        groups.push(<MenuItem value={d[i]} key={d[i]} primaryText={`${d[i]}`} />);
                    }
                }
            });
        }
    }
    loadlanguages() {
        if (languages.length === 0) {
            $.ajax({
                url: "http://api.susi.ai/cms/getAllLanguages.json",
                jsonpCallback: 'pc',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {
                    data = data.languagesArray;
                    for (let i = 0; i < data.length; i++) {
                        languages.push(<MenuItem value={data[i]} key={data[i]} primaryText={`${data[i]}`} />);
                    }
                }
            });
        }
    }


    componentDidMount() {
        let self = this;
        self.loadgroups();

        self.loadlanguages();
        this.setState({
            groupValue: this.props.location.pathname.split('/')[1],
            languageValue: this.props.location.pathname.split('/')[4],
            expertValue: this.props.location.pathname.split('/')[2],
            imageUrl: this.state.image
        });

        let baseUrl = 'http://api.susi.ai/cms/getSkillMetadata.json';

        let modelValue = "general";
        let groupValue = this.props.location.pathname.split('/')[1];
        let languageValue = this.props.location.pathname.split('/')[4];
        let expertValue = this.props.location.pathname.split('/')[2];

        let url = baseUrl + '?model=' + modelValue + '&group=' + groupValue + '&language=' + languageValue + '&skill=' + expertValue;

        console.log('metadata', url);
        $.ajax({
            url: url,
            jsonpCallback: 'pd',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data) {
                self.updateData(data.skill_metadata)
            }
        });

        url = 'http://api.susi.ai/cms/getSkill.json?skill=' + this.props.location.pathname.split('/')[2];
        console.log('SkillEditor', url);
/*         skill_relative_path = this.props.location.pathname.split('/')[2];
 */        $.ajax({
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
    onChange(newValue) {
        const match = newValue.match(/^::image\s(.*)$/m);
        if (match !== null) {
            console.log(match[1]);

            self.setState({
                imageUrl: match[1],
                codeChanged: true
            });
        }
        self.updateCode(newValue)
    }

    updateCode = (newCode) => {
        this.setState({
            code: newCode
        });
    };

    handleModelChange = (event, index, value) => {
        this.setState({ modelValue: value });
        if (groups.length === 0) {
            $.ajax({
                url: "http://api.susi.ai/aaa/getGroups.json",
                jsonpCallback: 'pb',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {
                    for (let i = 0; i < data.length; i++) {
                        groups.push(<MenuItem value={data[i]} key={data[i]} primaryText={`${data[i]}`} />);
                    }
                }
            });
        }
    };

    handleExpertChange = (event) => {
        this.setState({
            expertValue: event.target.value,
        });
    };

    handleCommitMessageChange = (event) => {
        this.setState({
            commitMessage: event.target.value,
        });
    };

    handleGroupChange = (event, index, value) => {
        this.setState({ groupValue: value });
        if (languages.length === 0) {
            $.ajax({
                url: "http://api.susi.ai/cms/getAllLanguages.json",
                jsonpCallback: 'pc',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {
                    console.log(data);
                    data = data.languagesArray;
                    for (let i = 0; i < data.length; i++) {
                        languages.push(<MenuItem value={data[i]} key={data[i]} primaryText={`${data[i]}`} />);
                    }
                }
            });
        }
    };

    _onChange = (event) => {
        // Assuming only image
        let file = this.refs.file.files[0];
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ image: e.target.result });
            };
            reader.readAsDataURL(event.target.files[0]);
            this.setState({
                showImage: true,
                image_name_changed: true
            });
        }
        console.log(file);
        this.setState({
            file: file
        });
    };


    handleLanguageChange = (event, index, value) => this.setState({ languageValue: value });
    handleFontChange = (event, index, value) => this.setState({ fontSizeCode: value });
    handleThemeChange = (event, index, value) => this.setState({ editorTheme: value });

    saveClick = () => {
        this.setState({
            loading: true
        });

        if (!cookies.get('loggedIn')) {
            notification.open({
                message: 'Not logged In',
                description: 'Please login and then try to create/edit a skill',
                icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
            });
            self.setState({
                loading: false
            });
            return 0;
        }
        console.log(this.state);
        if (!new RegExp(/images\/\w+\.\w+/g).test(self.state.imageUrl)) {
            notification.open({
                message: 'Error Processing your Request',
                description: 'image must be in format of images/imageName.jpg',
                icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
            });
            self.setState({
                loading: false
            });
            return 0;
        }
        if (this.state.commitMessage === null) {
            notification.open({
                message: 'Please add a commit message',
                icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
            });
            self.setState({
                loading: false
            });
            return 0;
        }
        if (this.state.oldGroupValue === this.state.groupValue && this.state.oldExpertValue === this.state.expertValue && this.state.oldLanguageValue === this.state.languageValue
            && !this.state.codeChanged && !this.state.image_name_changed) {
            notification.open({
                message: 'Please make some changes to save the Skill',
                icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
            });
            self.setState({
                loading: false
            });
            return 0;
        }
        let file;

        let form = new FormData();

        form.append("OldModel", "general");
        form.append("OldGroup", this.state.oldGroupValue);
        form.append("OldLanguage", this.state.oldLanguageValue);
        form.append("OldSkill", this.state.oldExpertValue);
        form.append("NewModel", "general");
        form.append("NewGroup", this.state.groupValue);
        form.append("NewLanguage", this.state.languageValue);
        form.append("NewSkill", this.state.expertValue);
        form.append("changelog", this.state.commitMessage);
        form.append("content", this.state.code);
        form.append("imageChanged", this.state.image_name_changed);
        form.append("old_image_name", this.state.oldImageUrl.replace("images/", ""));
        form.append("new_image_name", this.state.imageUrl.replace("images/", ""));
        form.append("image_name_changed", this.state.image_name_changed);
        form.append('access_token', cookies.get('loggedIn'));

        if (this.state.image_name_changed) {
            file = this.state.file;
            form.append("image", file);
        }

        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://api.susi.ai/cms/modifySkill.json",
            "method": "POST",
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        };
        console.log(settings);
        for (let pair of form.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        $.ajax(settings)
            .done(function (response) {
                self.setState({
                    loading: false
                });
                let data = JSON.parse(response);
                if (data.accepted === true) {
                    notification.open({
                        message: 'Accepted',
                        description: 'Your Skill has been uploaded to the server',
                        icon: <Icon type="check-circle" style={{ color: '#00C853' }} />
                    });
                }
                else {
                    self.setState({
                        loading: false
                    });
                    notification.open({
                        message: 'Error Processing your Request',
                        description: String(data.message),
                        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />
                    });
                }
            })
            .fail(function (jqXHR, textStatus) {
                self.setState({
                    loading: false
                });
                notification.open({
                    message: 'Error Processing your Request',
                    description: String(textStatus),
                    icon: <Icon type="close-circle" style={{ color: '#f44336' }} />
                })
            });
    };

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
                        <div style={styles.center}>
                            <div style={styles.dropdownDiv}>
                                <SelectField
                                    floatingLabelText="Category"
                                    style={{ width: '160px', marginLeft: 10, marginRight: 10 }}
                                    value={this.state.groupValue}
                                    onChange={this.handleGroupChange}
                                >
                                    {groups}
                                </SelectField>
                                <SelectField
                                    floatingLabelText="Language"
                                    style={{ width: '90px', marginLeft: 10, marginRight: 10 }}
                                    value={this.state.languageValue}
                                    onChange={this.handleLanguageChange}
                                >
                                    {languages}
                                </SelectField>
                                <TextField
                                    floatingLabelText="Enter Skill name"
                                    floatingLabelFixed={true}
                                    style={{ marginLeft: 10, marginRight: 10 }}
                                    value={this.state.expertValue}
                                    onChange={this.handleExpertChange}
                                />
                                {this.state.showImage && <img alt="preview" id="target" style={{ width: 60, height: 60, borderRadius: "50%", marginRight: 20, border: 0 }} src={this.state.image} />}
                                <RaisedButton
                                    label="Choose an Image"
                                    labelPosition="before"
                                    backgroundColor="#4285f4"
                                    containerElement="label"
                                    labelColor="#fff"
                                >
                                    <input type="file" style={{
                                        cursor: 'pointer',
                                        position: 'absolute',
                                        top: 0,
                                        bottom: 0,
                                        right: 0,
                                        left: 0,
                                        width: '100%',
                                        opacity: 0,
                                    }}
                                        ref="file"
                                        name="user[image]"
                                        multiple="false"
                                        onChange={this._onChange} />
                                </RaisedButton>
                            </div>
                        </div>
                    </Paper>

                    <div style={styles.codeEditor}>

                        <div style={styles.toolbar}>
                            <span style={styles.button}><Icon type="cloud-download" style={styles.icon} />Download as text</span>
                            <span style={styles.button}>Size <SelectField
                                style={{ width: '60px' }}
                                onChange={this.handleFontChange}
                            >
                                {fontsizes}
                            </SelectField></span>

                            <span style={styles.button}>Theme <SelectField
                                style={{ width: '150px' }}
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
                            height="400px"
                            value={this.state.code}
                            showPrintMargin={false}
                            name="skill_code_editor"
                            onChange={this.onChange}
                            editorProps={{ $blockScrolling: true }}
                        />
                        {/*<Chatbox />*/}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center", marginTop: 10 }}>
                        <Paper style={{ width: "100%", padding: 10, display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center" }} zDepth={1}>

                            <TextField
                                floatingLabelText="Commit message"
                                floatingLabelFixed={true}
                                hintText="Enter Commit Message"
                                style={{ width: "80%" }}
                                onChange={this.handleCommitMessageChange}
                            />
                            <RaisedButton label={this.state.loading ? "Saving" : "Save"} disabled={this.state.loading} backgroundColor="#4285f4" labelColor="#fff" style={{ marginLeft: 10 }} onTouchTap={this.saveClick} />
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
    codeEditor: {
        width: "100%",
        marginTop: "20px"
    },
    dropdownDiv: {
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
};

