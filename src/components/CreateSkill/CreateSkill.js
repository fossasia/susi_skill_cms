import React from 'react';
import Icon from 'antd/lib/icon';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import ISO6391 from 'iso-639-1';
import { Paper, RaisedButton, TextField } from 'material-ui';
import AceEditor from 'react-ace';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
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
import colors from '../../Utils/colors';
import urls from '../../Utils/urls';
const languages = [];
const fontsizes = [];
const codeEditorThemes = [];
const cookies = new Cookies();

let self;
export default class CreateSkill extends React.Component {
  componentDidMount() {
    self = this;
    self.loadgroups();
    // send code to CodeView in botbuilder
    if (this.props.botBuilder) {
      this.setState({ code: this.props.botBuilder.code });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      groupSelect: true,
      languageSelect: true,
      expertSelect: true,
      showImage: false,
      loading: false,
      file: null,
      imageUrl: '<image_url>',
      commitMessage: null,
      modelValue: null,
      groupValue: null,
      languageValue: null,
      expertValue: '',
      code:
        '::name <Skill_name>\n::author <author_name>\n::author_url <author_url>\n::description <description> \n::dynamic_content <Yes/No>\n::developer_privacy_policy <link>\n::image <image_url>\n::terms_of_use <link>\n\n\nUser query1|query2|quer3....\n!example:<The question that should be shown in public skill displays>\n!expect:<The answer expected for the above example>\nAnswer for the user query',
      fontSizeCode: 14,
      editorTheme: 'github',
      groups: [],
    };
    let fonts = [14, 16, 18, 20, 24, 28, 32, 40];
    let themes = [
      'monokai',
      'github',
      'tomorrow',
      'kuroir',
      'twilight',
      'xcode',
      'textmate',
      'solarized_dark',
      'solarized_light',
      'terminal',
    ];
    for (let i = 0; i < fonts.length; i++) {
      fontsizes.push(
        <MenuItem
          value={fonts[i]}
          key={fonts[i]}
          primaryText={`${fonts[i]}`}
        />,
      );
    }
    for (let i = 0; i < themes.length; i++) {
      codeEditorThemes.push(
        <MenuItem
          value={themes[i]}
          key={themes[i]}
          primaryText={`${themes[i]}`}
        />,
      );
    }
  }

  onChange(newValue) {
    const match = newValue.match(/^::image\s(.*)$/m);
    const nameMatch = newValue.match(/^::name\s(.*)$/m);

    if (nameMatch) {
      self.setState({
        expertValue: nameMatch[1],
      });
    }

    if (match !== null) {
      self.setState({
        imageUrl: match[1],
      });
    }
    self.updateCode(newValue);
  }

  loadgroups() {
    if (this.state.groups.length === 0) {
      $.ajax({
        url: urls.API_URL + '/cms/getGroups.json',
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(data) {
          if (data.groups) {
            data = data.groups;
            data.sort();
            let groups = [];
            for (let i = 0; i < data.length; i++) {
              groups.push(
                <MenuItem
                  value={data[i]}
                  key={data[i]}
                  primaryText={`${data[i]}`}
                />,
              );
            }
            this.setState({ groups });
          }
        }.bind(this),
        error: function(e) {
          console.log('Error while fetching groups', e);
        },
      });
    }
  }

  updateCode = newCode => {
    this.setState({
      code: newCode,
    });
    if (this.props.botBuilder) {
      this.props.botBuilder.onSkillChange(newCode);
    }
  };

  handleExpertChange = event => {
    const expertValue = event.target.value;
    const code = this.state.code.replace(
      /^::name\s(.*)$/m,
      `::name ${expertValue}`,
    );
    this.setState({
      expertValue,
      code,
    });
  };

  handleCommitMessageChange = event => {
    this.setState({
      commitMessage: event.target.value,
    });
  };

  handleGroupChange = (event, index, value) => {
    this.setState({
      groupValue: value,
      groupSelect: false,
      languageSelect: false,
    });
    if (languages.length === 0) {
      $.ajax({
        url: urls.API_URL + '/cms/getAllLanguages.json',
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(data) {
          data = data.languagesArray;
          this.setState({ languages: data });
          for (let i = 0; i < data.length; i++) {
            if (ISO6391.getNativeName(data[i])) {
              languages.push(
                <MenuItem
                  value={data[i]}
                  key={data[i]}
                  primaryText={ISO6391.getNativeName(data[i])}
                />,
              );
            } else {
              languages.push(
                <MenuItem
                  value={data[i]}
                  key={data[i]}
                  primaryText={'Universal'}
                />,
              );
            }
            if (data[i] === 'en') {
              this.setState({ languageValue: 'en', expertSelect: false });
            }
          }
          languages.sort(function(a, b) {
            if (a.props.primaryText < b.props.primaryText) {
              return -1;
            }
            if (a.props.primaryText > b.props.primaryText) {
              return 1;
            }
            return 0;
          });
        }.bind(this),
        error: function(e) {
          console.log('Error while fetching languages', e);
        },
      });
    }
  };

  handleLanguageChange = (event, index, value) => {
    this.setState({
      languageValue: value,
      expertSelect: false,
    });
  };

  handleFontChange = (event, index, value) => {
    this.setState({
      fontSizeCode: value,
    });
  };

  handleThemeChange = (event, index, value) => {
    this.setState({
      editorTheme: value,
    });
  };

  saveClick = () => {
    let groups = this.state.groups;
    let code = this.state.code;
    code = '::author_email ' + cookies.get('emailId') + '\n' + code;
    if (this.props.botBuilder) {
      code = '::protected Yes\n' + code;
    } else {
      code = '::protected No\n' + code;
    }
    if (!cookies.get('loggedIn')) {
      notification.open({
        message: 'Not logged In',
        description: 'Please login and then try to create/edit a skill',
        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
      });
      return 0;
    }
    if (
      groups.length === 0 ||
      languages.length === 0 ||
      this.state.expertValue === null
    ) {
      notification.open({
        message: 'Error Processing your Request',
        description: 'Please select a group, language and a skill',
        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
      });
      return 0;
    }

    if (!new RegExp(/.+\.\w+/g).test(self.state.imageUrl)) {
      notification.open({
        message: 'Error Processing your Request',
        description: 'image must be in format of images/imageName.jpg',
        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
      });
      return 0;
    }
    if (this.state.file === null) {
      notification.open({
        message: 'Error Processing your Request',
        description: 'Image Not Given',
        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
      });
      return 0;
    }

    this.setState({
      loading: true,
    });

    let form = new FormData();
    form.append('model', 'general');
    form.append('group', this.state.groupValue);
    form.append('language', this.state.languageValue);
    form.append('skill', this.state.expertValue.trim().replace(/\s/g, '_'));
    form.append('image', this.state.file);
    form.append('content', code);
    form.append('image_name', this.state.imageUrl.replace('images/', ''));
    form.append('access_token', cookies.get('loggedIn'));
    if (this.props.botBuilder) {
      form.append('private', '1');
    }

    let settings = {
      async: true,
      crossDomain: true,
      url: urls.API_URL + '/cms/createSkill.json',
      method: 'POST',
      processData: false,
      contentType: false,
      mimeType: 'multipart/form-data',
      data: form,
    };

    /*
        Uncomment to check the form values
        console.log(this.state.groupValue);
        console.log(this.state.languageValue);
        console.log(this.state.expertValue.trim().replace(/\s/g,'_'));
        console.log(this.state.file);
        console.log(this.state.code);
        console.log(this.state.imageUrl.replace('images/',''));
        */

    $.ajax(settings)
      .done(function(response) {
        self.setState({
          loading: false,
        });
        let data = JSON.parse(response);
        if (data.accepted === true) {
          self.props.history.push({
            pathname:
              '/' +
              self.state.groupValue +
              '/' +
              self.state.expertValue.trim().replace(/\s/g, '_') +
              '/' +
              self.state.languageValue,
            state: {
              from_upload: true,
              expertValue: self.state.expertValue,
              groupValue: self.state.groupValue,
              languageValue: self.state.languageValue,
            },
          });

          notification.open({
            message: 'Accepted',
            description: 'Your Skill has been uploaded to the server',
            icon: <Icon type="check-circle" style={{ color: '#00C853' }} />,
          });
        } else {
          self.setState({
            loading: false,
          });
          notification.open({
            message: 'Error Processing your Request',
            description: String(data.message),
            icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
          });
        }
      })
      .fail(function(jqXHR, textStatus) {
        self.setState({
          loading: false,
        });
        notification.open({
          message: 'Error Processing your Request',
          description: String(textStatus),
          icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
        });
      });
  };

  _onChange = event => {
    // Assuming only image
    let file = this.file.files[0];
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ image: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
      self.setState({
        showImage: true,
      });
    }
    this.setState({
      file: file,
    });
    // console.log(file) // Would see a path?
    let imgUrl = file.name;
    this.setState({
      imageUrl: imgUrl,
    });
    // console.log(this.state.imageUrl);
    const pattern = /^::image\s(.*)$/m;
    const code = this.state.code.replace(pattern, `::image images/${imgUrl}`);
    this.setState({
      code,
    });
  };

  render() {
    const style = {
      width: '100%',
      padding: '10px',
    };
    if (!cookies.get('loggedIn')) {
      return (
        <div>
          <StaticAppBar {...this.props} />
          <div>
            <p style={styles.loggedInError}>Please login to create a skill.</p>
          </div>
        </div>
      );
    }
    return (
      <div>
        {!this.props.botBuilder && <StaticAppBar {...this.props} />}
        <div
          style={{
            width: '100%',
            padding: this.props.botBuilder ? '0px' : '80px 30px 30px',
          }}
        >
          <Paper style={style} zDepth={1}>
            <div style={styles.center}>
              <div style={styles.dropdownDiv}>
                <SelectField
                  floatingLabelText="Category"
                  style={{ width: 300, marginLeft: 10, marginRight: 10 }}
                  value={this.state.groupValue}
                  onChange={this.handleGroupChange}
                >
                  {this.state.groups}
                </SelectField>
                <SelectField
                  floatingLabelText="Language"
                  autoWidth={true}
                  fullWidth={true}
                  disabled={this.state.languageSelect}
                  style={{ width: '125px', marginLeft: 10, marginRight: 10 }}
                  value={this.state.languageValue}
                  onChange={this.handleLanguageChange}
                >
                  {languages}
                </SelectField>
                <TextField
                  disabled={this.state.expertSelect}
                  floatingLabelText={
                    this.props.botBuilder ? 'Bot Name' : 'Skill Name'
                  }
                  floatingLabelFixed={false}
                  value={this.state.expertValue}
                  hintText={this.props.botBuilder ? 'Bot Name' : 'Skill Name'}
                  style={{ marginLeft: 10, marginRight: 10 }}
                  onChange={this.handleExpertChange}
                />
                {this.state.showImage && (
                  <img
                    alt="preview"
                    id="target"
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      marginRight: 20,
                      border: 0,
                    }}
                    src={this.state.image}
                  />
                )}
                <RaisedButton
                  label="Choose an Image"
                  labelPosition="before"
                  backgroundColor={colors.header}
                  containerElement="label"
                  labelColor="#fff"
                >
                  <input
                    type="file"
                    style={{
                      cursor: 'pointer',
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      right: 0,
                      left: 0,
                      width: '100%',
                      opacity: 0,
                    }}
                    ref={c => {
                      this.file = c;
                    }}
                    name="user[image]"
                    multiple="false"
                    onChange={this._onChange}
                  />
                </RaisedButton>
              </div>
            </div>
          </Paper>

          <div style={styles.codeEditor}>
            {this.state.loading && (
              <LinearProgress mode="indeterminate" color={colors.header} />
            )}
            <div style={styles.toolbar}>
              <span style={styles.button}>
                <Icon type="cloud-download" style={styles.icon} />Download as
                text
              </span>
              <span style={styles.button}>
                Size{' '}
                <SelectField
                  style={{ width: '60px' }}
                  onChange={this.handleFontChange}
                >
                  {fontsizes}
                </SelectField>
              </span>

              <span style={styles.button}>
                Theme{' '}
                <SelectField
                  style={{ width: '150px' }}
                  onChange={this.handleThemeChange}
                >
                  {codeEditorThemes}
                </SelectField>
              </span>
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
              scrollPastEnd={false}
              wrapEnabled={true}
              editorProps={{ $blockScrolling: true }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}
          >
            {!this.props.botBuilder && (
              <Paper
                style={{
                  width: '100%',
                  padding: 10,
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  justifyContent: 'center',
                }}
                zDepth={1}
              >
                <TextField
                  floatingLabelText="Commit message"
                  floatingLabelFixed={true}
                  hintText="Enter Commit Message"
                  style={{ width: '80%' }}
                  onChange={this.handleCommitMessageChange}
                />
                <RaisedButton
                  label="Save"
                  backgroundColor={colors.header}
                  labelColor="#fff"
                  style={{ marginLeft: 10 }}
                  onTouchTap={this.saveClick}
                />
                <Link to="/">
                  <RaisedButton
                    label="Cancel"
                    backgroundColor={colors.header}
                    labelColor="#fff"
                    style={{ marginLeft: 10 }}
                  />
                </Link>
              </Paper>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeEditor: {
    width: '100%',
    marginTop: '20px',
  },
  dropdownDiv: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
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
  loggedInError: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: '100px',
    fontSize: '50px',
    marginTop: '300px',
  },
  button: {
    display: 'flex',
    marginRight: '30px',
    alignItems: 'center',
    cursor: 'pointer',
  },
  icon: {
    marginRight: '5px',
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
CreateSkill.propTypes = {
  botBuilder: PropTypes.object,
};
