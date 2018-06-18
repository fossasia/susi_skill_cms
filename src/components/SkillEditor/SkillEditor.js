import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'antd/lib/icon';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { Dialog, Paper, RaisedButton, TextField } from 'material-ui';
import AceEditor from 'react-ace';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import 'brace/mode/markdown';
import ISO6391 from 'iso-639-1';
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
import { red500 } from 'material-ui/styles/colors';
import colors from '../../Utils/colors';
import urls from '../../Utils/urls';
const groups = [];
const languages = [];
const fontsizes = [];
const codeEditorThemes = [];
const cookies = new Cookies();

let self;
class SkillEditor extends Component {
  constructor(props) {
    super(props);
    if (this.props.hasOwnProperty('revertingCommit')) {
      this.setState({
        commitMessage: 'Reverting to commit - ' + this.props.revertingCommit,
      });
    } else if (this.props.location.pathname.split('/')[5]) {
      this.setState({
        commitMessage:
          'Reverting to commit - ' + this.props.location.pathname.split('/')[5],
      });
    }
    this.state = {
      showImage: true,
      image: '',
      skillUrl: null,
      commitMessage: null,
      modelValue: 'general',
      file: null,
      codeChanged: false,
      showDeleteBox: false,
      groupValue: this.props.location.pathname.split('/')[1],
      oldGroupValue: this.props.location.pathname.split('/')[1],
      languageValue: this.props.location.pathname.split('/')[4],
      oldLanguageValue: this.props.location.pathname.split('/')[4],
      expertValue: this.props.location.pathname.split('/')[2],
      oldExpertValue: this.props.location.pathname.split('/')[2],
      commitId: this.props.location.pathname.split('/')[5],
      date: '',
      author: '',
      oldImageUrl: '',
      imageUrl: '',
      image_name_changed: false,
      code:
        '::name <Skill_name>\n::author <author_name>\n::author_url <author_url>\n::description <description> \n::dynamic_content <Yes/No>\n::developer_privacy_policy <link>\n::image <image_url>\n::terms_of_use <link>\n\n\nUser query1|query2|quer3....\n!example:<The question that should be shown in public skill displays>\n!expect:<The answer expected for the above example>\nAnswer for the user query',
      fontSizeCode: 14,
      editorTheme: 'github',
      showAdmin: false,
      deleteDisabled: true,
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
  updateData(skillData) {
    if (skillData.image) {
      this.imgUrl = `https://raw.githubusercontent.com/fossasia/susi_skill_data/master/models/general/${
        this.state.groupValue
      }/${this.state.languageValue}/${skillData.image}`;
    } else {
      this.imgUrl =
        'https://pbs.twimg.com/profile_images/904617517489979392/6Hff65Th.jpg';
    }
    this.setState({
      image: this.imgUrl,
    });
  }
  loadgroups() {
    if (groups.length === 0) {
      $.ajax({
        url: urls.API_URL + '/cms/getGroups.json',
        jsonpCallback: 'pa',
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(data) {
          data = data.groups;
          data.sort();
          for (let i = 0; i < data.length; i++) {
            groups.push(
              <MenuItem
                value={data[i]}
                key={data[i]}
                primaryText={`${data[i]}`}
              />,
            );
          }
        },
      });
    }
  }
  loadlanguages() {
    if (languages.length === 0) {
      $.ajax({
        url: urls.API_URL + '/cms/getAllLanguages.json',
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(data) {
          data = data.languagesArray;
          this.setState({ languages: data });
          // console.log(data);
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
          }
        }.bind(this),
      });
    }
  }

  componentDidMount() {
    // Check if admin is logged in or not
    if (cookies.get('showAdmin') === true) {
      this.setState({
        showAdmin: true,
      });
    }
    self = this;
    self.loadgroups();

    self.loadlanguages();
    if (this.state.commitId) {
      let baseUrl = urls.API_URL + '/cms/getFileAtCommitID.json';
      let skillAtCommitIDUrl =
        baseUrl +
        '?model=' +
        this.state.modelValue +
        '&group=' +
        this.state.groupValue +
        '&language=' +
        this.state.languageValue +
        '&skill=' +
        this.state.expertValue +
        '&commitID=' +
        this.state.commitId;
      $.ajax({
        url: skillAtCommitIDUrl,
        jsonpCallback: 'p',
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(data) {
          self.setState({
            code: data.file,
            author: data.author,
            date: data.commitDate,
          });
          self.updateCode(data.file);
        },
      });
      baseUrl = urls.API_URL + '/cms/getSkillMetadata.json';
      let url =
        baseUrl +
        '?model=' +
        this.state.modelValue +
        '&group=' +
        this.state.groupValue +
        '&language=' +
        this.state.languageValue +
        '&skill=' +
        this.state.expertValue;
      this.setState({
        skillUrl: url,
      });
      $.ajax({
        url: url,
        jsonpCallback: 'pd',
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(data) {
          self.updateData(data.skill_metadata);
        },
      });
      return 0;
    }
    this.setState({
      groupValue: this.props.location.pathname.split('/')[1],
      languageValue: this.props.location.pathname.split('/')[4],
      expertValue: this.props.location.pathname.split('/')[2],
      imageUrl: this.state.image,
    });

    let baseUrl = urls.API_URL + '/cms/getSkillMetadata.json';

    let modelValue = 'general';
    let groupValue = this.props.location.pathname.split('/')[1];
    let languageValue = this.props.location.pathname.split('/')[4];
    let expertValue = this.props.location.pathname.split('/')[2];

    let url =
      baseUrl +
      '?model=' +
      modelValue +
      '&group=' +
      groupValue +
      '&language=' +
      languageValue +
      '&skill=' +
      expertValue;
    this.setState({
      skillUrl: url,
    });
    $.ajax({
      url: url,
      jsonpCallback: 'pd',
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        self.updateData(data.skill_metadata);
      },
    });

    url = url.replace('getSkillMetadata', 'getSkill');
    /*         skill_relative_path = this.props.location.pathname.split('/')[2];
 */ $.ajax(
      {
        url: url,
        jsonpCallback: 'pcc',
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(data) {
          self.updateCode(data.text);
          const match = data.text.match(/^::image\s(.*)$/m);
          if (match !== null) {
            this.setState({
              imageUrl: match[1],
              codeChanged: true,
            });
          }
        }.bind(this),
      },
    );
  }
  handleChange(newValue) {
    const match = newValue.match(/^::image\s(.*)$/m);
    if (match !== null) {
      this.setState({
        imageUrl: match[1],
        codeChanged: true,
      });
    }
    this.updateCode(newValue);
  }

  updateCode = newCode => {
    this.setState({
      code: newCode,
    });
  };

  handleDeleteText = event => {
    const name = this.state.code.match(/^::name\s(.*)$/m);
    // console.log(name[1])
    if (event.target.value === name[1]) {
      this.setState({
        deleteDisabled: false,
      });
    } else {
      this.setState({
        deleteDisabled: true,
      });
    }
  };

  handleModelChange = (event, index, value) => {
    this.setState({ modelValue: value });
    if (groups.length === 0) {
      $.ajax({
        url: urls.API_URL + '/aaa/getGroups.json',
        jsonpCallback: 'pb',
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(data) {
          for (let i = 0; i < data.length; i++) {
            groups.push(
              <MenuItem
                value={data[i]}
                key={data[i]}
                primaryText={`${data[i]}`}
              />,
            );
          }
        },
      });
    }
  };

  handleExpertChange = event => {
    this.setState({
      expertValue: event.target.value,
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
          // console.log(data);
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
          }
        }.bind(this),
      });
    }
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
      this.setState({
        showImage: true,
        image_name_changed: true,
      });
    }
    this.setState({
      file: file,
    });
  };

  handleLanguageChange = (event, index, value) => {
    this.setState({
      languageValue: value,
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

  deleteSkill = () => {
    this.setState({
      deleteDisabled: true,
    });
    // console.log('http://127.0.0.1:4000/cms/deleteSkill.txt?skill='+this.name+'&group='+this.groupValue+'&language='+this.languageValue);
    $.ajax({
      url:
        urls.API_URL +
        '/cms/deleteSkill.json?skill=' +
        this.state.oldExpertValue +
        '&group=' +
        this.state.oldGroupValue +
        '&language=' +
        this.state.oldLanguageValue,
      jsonpCallback: 'pa',
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(d) {
        if (d.accepted === true) {
          notification.open({
            message: 'Deleted',
            description: 'This Skill has been deleted',
            icon: <Icon type="check-circle" style={{ color: '#00C853' }} />,
          });
          this.setState({
            loading: false,
          });
          this.props.history.push({
            pathname: '/',
            state: {},
          });
        } else {
          notification.open({
            message: 'Failed',
            description: d.message,
            icon: <Icon type="check-circle" style={{ color: red500 }} />,
          });
          this.props.history.push({
            pathname: '/',
            state: {},
          });
        }
      }.bind(this),
    });
  };

  saveClick = () => {
    this.setState({
      loading: true,
    });
    // Check whether the User has entered a Commit Message or not
    if (this.state.commitMessage === null) {
      notification.open({
        message: 'Please add a commit message',
        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
      });

      this.setState({
        loading: false,
      });
      return 0;
    }

    // Detect whether the User is in a logged in state
    if (!cookies.get('loggedIn')) {
      notification.open({
        message: 'Not logged in',
        description: 'Please login and then try to create/edit a Skill',
        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
      });
      this.setState({
        loading: false,
      });
      return 0;
    }
    // Check whether the image uploaded by the User
    // matches the format of the Skill image to be stored
    if (!new RegExp(/images\/\w+\.\w+/g).test(this.state.imageUrl)) {
      notification.open({
        message: 'Error processing your request',
        description: 'Image path must be in format of images/imageName.jpg',
        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
      });
      this.setState({
        loading: false,
      });
      return 0;
    }
    // Check whether the request needs to be sent or not,
    // depending on whether all the new values are same
    // as the old values or not.
    if (
      this.state.oldGroupValue === this.state.groupValue &&
      this.state.oldExpertValue === this.state.expertValue &&
      this.state.oldLanguageValue === this.state.languageValue &&
      !this.state.codeChanged &&
      !this.state.image_name_changed
    ) {
      notification.open({
        message: 'Please make some changes to save the Skill',
        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
      });
      self.setState({
        loading: false,
      });
      return 0;
    }
    let file;

    // Create a form object
    let form = new FormData();

    // Append the following fields from the Skill component
    form.append('OldModel', 'general');
    form.append('OldGroup', this.state.oldGroupValue);
    form.append('OldLanguage', this.state.oldLanguageValue);
    form.append('OldSkill', this.state.oldExpertValue);
    form.append('NewModel', 'general');
    form.append('NewGroup', this.state.groupValue);
    form.append('NewLanguage', this.state.languageValue);
    form.append('NewSkill', this.state.expertValue);
    form.append('changelog', this.state.commitMessage);
    form.append('content', this.state.code);
    form.append('imageChanged', this.state.image_name_changed);
    form.append(
      'old_image_name',
      this.state.oldImageUrl.replace('images/', ''),
    );
    form.append('new_image_name', this.state.imageUrl.replace('images/', ''));
    form.append('image_name_changed', this.state.image_name_changed);
    form.append('access_token', cookies.get('loggedIn'));

    if (this.state.image_name_changed) {
      file = this.state.file; // append file to image
      form.append('image', file);
    }
    // console.log(this.state)

    let settings = {
      async: true,
      crossDomain: true,
      url: urls.API_URL + '/cms/modifySkill.json',
      method: 'POST',
      processData: false,
      contentType: false,
      mimeType: 'multipart/form-data',
      data: form,
    };

    // Send a POST request to the server and
    // show the notification to the user accordingly,
    // whether the changes to the Skill Data have been updated or not
    $.ajax(settings)
      .done(
        function(response) {
          this.setState({
            loading: false,
          });
          let data = JSON.parse(response);
          if (data.accepted === true) {
            notification.open({
              message: 'Accepted',
              description: 'Your Skill has been uploaded to the server',
              icon: <Icon type="check-circle" style={{ color: '#00C853' }} />,
            });
            setTimeout(() => {
              this.props.history.push(
                '/' +
                  this.state.groupValue +
                  '/' +
                  this.state.expertValue +
                  '/' +
                  this.state.languageValue,
              );
            }, 1000);
          } else {
            this.setState({
              loading: false,
            });
            notification.open({
              message: 'Error processing your request',
              description: String(data.message),
              icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
            });
          }
        }.bind(this),
      )
      .fail(
        function(jqXHR, textStatus) {
          this.setState({
            loading: false,
          });
          notification.open({
            message: 'Error processing your request',
            description: String(textStatus),
            icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
          });
        }.bind(this),
      );
  };
  openDelete = () => {
    this.setState({ showDeleteBox: true });
  };

  closeDelete = () => {
    this.setState({ showDeleteBox: false });
  };

  render() {
    const style = {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
    };
    const bold = {
      fontSize: '14px',
    };
    var showTopBar = true;
    if (this.props.hasOwnProperty('showTopBar')) {
      showTopBar = this.props.showTopBar;
    }
    if (!cookies.get('loggedIn')) {
      return (
        <div>
          <StaticAppBar {...this.props} />
          <div style={styles.home}>
            <p style={styles.titleStyle}>
              YOU DO NOT HAVE PERMISSION TO EDIT THIS PAGE, SINCE YOU ARE NOT
              LOGGED IN.
            </p>
            <p style={styles.description}>
              The code is shown below in a read only mode.
            </p>
            <div style={styles.codeEditor}>
              <div style={styles.toolbar}>
                <span style={styles.button}>
                  <Icon type="cloud-download" style={styles.icon} />
                  Download as text
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
                onChange={this.handleChange.bind(this)}
                scrollPastEnd={false}
                readOnly={true}
                wrapEnabled={true}
                editorProps={{ $blockScrolling: true }}
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <StaticAppBar {...this.props} />
        <div style={styles.home}>
          {this.state.commitId &&
            showTopBar && (
              <Paper style={style} zDepth={1}>
                <div>
                  {'You are currently editing an older version of the Skill: '}
                  <b style={bold}>{this.state.expertValue}</b>
                  <br />
                  <span>
                    Author: <b style={bold}>{this.state.author}</b>
                  </span>
                  <br />
                  <span>
                    commitID: <b>{this.state.commitId}</b>
                  </span>
                  <br />
                  <span>
                    Revision as of <b>{this.state.date}</b>
                  </span>
                </div>
              </Paper>
            )}
          <Paper style={style} zDepth={1}>
            <div style={styles.center}>
              <div style={styles.dropdownDiv}>
                <SelectField
                  floatingLabelText="Category"
                  style={{
                    width: 300,
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                  value={this.state.groupValue}
                  onChange={this.handleGroupChange}
                >
                  {groups}
                </SelectField>
                <SelectField
                  floatingLabelText="Language"
                  style={{ width: '125px', marginLeft: 10, marginRight: 10 }}
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
                {this.state.showImage && (
                  <img
                    alt="preview"
                    id="target"
                    style={styles.image}
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
            <div style={styles.toolbar}>
              <span style={styles.button}>
                <Icon type="cloud-download" style={styles.icon} />
                Download as text
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
              onChange={this.handleChange.bind(this)}
              scrollPastEnd={false}
              wrapEnabled={true}
              editorProps={{ $blockScrolling: true }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}
          >
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
                value={this.state.commitMessage}
                onChange={this.handleCommitMessageChange}
              />
              <RaisedButton
                label={this.state.loading ? 'Saving' : 'Save'}
                disabled={this.state.loading}
                backgroundColor={colors.header}
                labelColor="#fff"
                style={{ marginLeft: 10 }}
                onTouchTap={this.saveClick}
              />
              <Link
                to={{
                  pathname:
                    '/' +
                    this.state.groupValue +
                    '/' +
                    this.state.expertValue +
                    '/' +
                    this.state.languageValue,
                }}
              >
                <RaisedButton
                  label="Cancel"
                  backgroundColor={colors.header}
                  labelColor="#fff"
                  style={{ marginLeft: 10 }}
                />
              </Link>
            </Paper>
          </div>
          {this.state.showAdmin && (
            <Paper
              style={{
                width: '100%',
                border: '1px solid red',
                marginTop: 20,
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
              zDepth={1}
            >
              <div style={{ margineft: '0px' }}>
                <strong>
                  <p>Delete this Skill</p>
                </strong>
                {'Once you delete a skill, only admins can' +
                  'undo this action before 30 days of deletion. Please be certain.'}
              </div>
              <RaisedButton
                label="Delete"
                backgroundColor={red500}
                labelColor="#fff"
                style={{ marginLeft: 10 }}
                onTouchTap={this.openDelete}
              />
            </Paper>
          )}
        </div>
        <div>
          <Dialog
            modal={false}
            open={this.state.showDeleteBox}
            autoScrollBodyContent={true}
            contentStyle={{ width: '50%', minWidth: '300px' }}
            onRequestClose={this.closeDelete}
          >
            <div>
              <TextField
                floatingLabelText="Enter Skill Name"
                floatingLabelFixed={true}
                hintText="Skill Name"
                style={{ width: '80%' }}
                onChange={this.handleDeleteText}
              />
              <RaisedButton
                label="Delete"
                disabled={this.state.deleteDisabled}
                backgroundColor={red500}
                labelColor="#fff"
                style={{ marginLeft: 10 }}
                onTouchTap={this.deleteSkill}
              />
            </div>
          </Dialog>
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
  titleStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '30px',
    fontSize: '20px',
    marginTop: '20px',
  },
  description: {
    textAlign: 'center',
    fontSize: '15px',
    marginTop: '30px',
  },
  codeEditor: {
    width: '100%',
    marginTop: '50px',
  },
  dropdownDiv: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    marginRight: 20,
    border: 0,
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

SkillEditor.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  showTopBar: PropTypes.bool,
  revertingCommit: PropTypes.string,
};

export default SkillEditor;
