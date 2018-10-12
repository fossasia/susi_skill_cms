import React, { Component } from 'react';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import CodeView from './SkillViews/CodeView';
import ConversationView from './SkillViews/ConversationView';
import TreeView from './SkillViews/TreeView';
import Preview from '../BotBuilder/Preview/Preview';
import { urls } from '../../utils';
import CircularProgress from 'material-ui/CircularProgress';
import { Link } from 'react-router-dom';
import ISO6391 from 'iso-639-1';
import ReactTooltip from 'react-tooltip';
import { Grid, Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import * as $ from 'jquery';

// Material-UI Components
import { Paper, RaisedButton, TextField } from 'material-ui';
import DropDownMenu from 'material-ui/DropDownMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

// Material-UI Icons
import Info from 'material-ui/svg-icons/action/info';
import Code from 'material-ui/svg-icons/action/code';
import QA from 'material-ui/svg-icons/action/question-answer';
import Timeline from 'material-ui/svg-icons/action/timeline';
import Add from 'material-ui/svg-icons/content/add';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

// Ant Design Components
import notification from 'antd/lib/notification';
import Icon from 'antd/lib/icon';

const cookies = new Cookies();
const languages = [];
let self;

export default class SkillCreator extends Component {
  constructor(props) {
    super(props);
    let skillBuildCode =
      '::name <Skill_name>\n::category <Category>\n::language <Language>\n::author <author_name>\n::author_url <author_url>\n::description <description> \n::dynamic_content <Yes/No>\n::developer_privacy_policy <link>\n::image <image_url>\n::terms_of_use <link>\n\n\nUser query1|query2|quer3....\n!example:<The question that should be shown in public skill displays>\n!expect:<The answer expected for the above example>\nAnswer for the user query';
    if (this.props.botBuilder) {
      skillBuildCode = this.props.botBuilder.code;
    }
    this.state = {
      code: skillBuildCode,
      codeView: true,
      conversationView: false,
      treeView: false,
      groupSelect: true,
      languageSelect: true,
      expertSelect: true,
      showImage: false,
      loading: false,
      file: null,
      loadViews: false,
      imageUrl: '<image_url>',
      commitMessage: '',
      modelValue: null,
      groupValue: null,
      languageValue: null,
      expertValue: '',
      groups: [],
      slideState: 1, // 1 means in middle, 2 means preview collapsed
      colSkill: 8,
      colPreview: 4,
      prevButton: 0, // 0 means disappear, 1 means appear
      anchorOrigin: {
        horizontal: 'left',
        vertical: 'bottom',
      },
    };
  }

  componentDidMount = () => {
    document.title = 'SUSI.AI - Create Skill';
    self = this;
    self.loadgroups();
    // send code to CodeView in botbuilder
    if (this.props.botBuilder) {
      this.setState({
        slideState: 0,
        colSkill: 12,
        colPreview: 0,
        prevButton: 0,
      });
      if (
        this.props.botBuilder.category &&
        this.props.botBuilder.language &&
        this.props.botBuilder.name
      ) {
        // set group, language and name while editing a saved bot
        this.setState(
          {
            groupValue: this.props.botBuilder.category,
            languageValue: this.props.botBuilder.language,
            expertValue: this.props.botBuilder.name,
            imageUrl: '',
            showImage: true,
            groupSelect: false,
            languageSelect: false,
            expertSelect: false,
            loadViews: true,
          },
          () => this.handleGroupChange(null, 0, this.props.botBuilder.category),
        );
      }
      if (this.props.botBuilder.image) {
        this.setState({
          showImage: true,
          image: this.props.botBuilder.image,
          file: this.props.botBuilder.imageFile,
          imageUrl: this.props.botBuilder.imageUrl,
          loadViews: true,
        });
      }
    } else {
      this.setState({ loadViews: true });
    }
    this.prefillCode();
  };

  handlePreviewToggle = () => {
    let { slideState } = this.state;
    if (slideState === 2) {
      this.setState({
        slideState: 1,
        colSkill: 8,
        colPreview: 4,
        prevButton: 0,
      });
    } else if (slideState === 1) {
      this.setState({
        slideState: 2,
        colSkill: 12,
        colPreview: 0,
        prevButton: 1,
      });
    }
  };

  prefillCode = () => {
    if (cookies.get('username')) {
      const code = this.state.code.replace(
        /^::author\s(.*)$/m,
        '::author ' + cookies.get('username'),
      );

      this.setState(
        {
          code,
        },
        () => this.handleReload(),
      );
    }

    if (cookies.get('emailId')) {
      $.ajax({
        url: 'https://api.github.com/search/users?q=' + cookies.get('emailId'),
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(data) {
          if (data.data.items) {
            data = data.data.items;
            for (let i = 0; i < data.length; i++) {
              if (data[i].type === 'User') {
                const code = this.state.code.replace(
                  /^::author_url\s(.*)$/m,
                  '::author_url ' + data[i].html_url,
                );
                this.setState(
                  {
                    code,
                  },
                  () => this.handleReload(),
                );
                break;
              }
            }
          }
        }.bind(this),
        error: function(e) {
          console.log('Error while fetching github url', e);
        },
      });
    }
  };

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

  handleExpertChange = event => {
    const expertValue = event.target.value;
    const code = this.state.code.replace(
      /^::name\s(.*)$/m,
      `::name ${expertValue}`,
    );
    let commitMessage = 'Created Skill ' + expertValue;
    this.setState(
      {
        expertValue,
        code,
        commitMessage,
      },
      () => self.handleReload(),
      this.sendInfoToProps(),
    );
  };

  handleGroupChange = (event, index, value) => {
    const code = this.state.code.replace(
      /^::category\s(.*)$/m,
      `::category ${value}`,
    );
    this.setState(
      {
        groupValue: value,
        groupSelect: false,
        languageSelect: false,
        code,
      },
      () => this.handleReload(),
      this.sendInfoToProps(),
    );
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
              this.handleLanguageChange(null, 0, 'en');
              this.setState({ expertSelect: false });
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
    const code = this.state.code.replace(
      /^::language\s(.*)$/m,
      `::language ${value}`,
    );
    this.setState(
      {
        languageValue: value,
        expertSelect: false,
        code,
      },
      () => self.handleReload(),
      self.sendInfoToProps(),
    );
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
        description: 'Image must be in format of images/imageName.jpg',
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
    if (this.props.botBuilder) {
      this.props.botBuilder.onImageChange();
    }
    let file = this.file.files[0];
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ image: e.target.result }, () => this.sendInfoToProps());
      };
      reader.readAsDataURL(event.target.files[0]);
      self.setState({
        showImage: true,
      });
    }
    this.setState(
      {
        file: file,
      },
      () => this.sendInfoToProps(),
    );
    // console.log(file) // Would see a path?
    let imgUrl = file.name;
    this.setState(
      {
        imageUrl: imgUrl,
      },
      () => this.sendInfoToProps(),
    );
    const pattern = /^::image\s(.*)$/m;
    const code = this.state.code.replace(pattern, `::image images/${imgUrl}`);
    this.setState(
      {
        code,
      },
      () => this.handleReload(),
    );
  };

  handleReload = () => {
    let codeState = this.state.codeView;
    if (codeState) {
      this.setState(
        {
          codeView: !codeState,
        },
        () => this.setState({ codeView: codeState }, this.sendInfoToProps),
      );
    }
  };

  sendInfoToProps = value => {
    if (value) {
      this.setState(
        {
          code: value.code ? value.code : this.state.code,
          expertValue: value.expertValue
            ? value.expertValue
            : this.state.expertValue,
          groupValue: value.groupValue
            ? value.groupValue
            : this.state.groupValue,
          languageValue: value.languageValue
            ? value.languageValue
            : this.state.groupValue,
          imageUrl: value.imageUrl ? value.imageUrl : this.state.imageUrl,
        },
        () => {
          if (this.props.botBuilder) {
            this.props.botBuilder.sendInfoToProps({
              code: this.state.code,
              expertValue: this.state.expertValue,
              imageUrl: this.state.imageUrl,
              image: this.state.image,
              groupValue: this.state.groupValue,
              languageValue: this.state.languageValue,
              file: this.state.file,
            });
          }
        },
      );
    } else if (this.props.botBuilder) {
      this.props.botBuilder.sendInfoToProps({
        code: this.state.code,
        expertValue: this.state.expertValue,
        imageUrl: this.state.imageUrl,
        image: this.state.image,
        groupValue: this.state.groupValue,
        languageValue: this.state.languageValue,
        file: this.state.file,
      });
    }
  };

  render() {
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
        <div
          style={{
            padding: this.props.botBuilder ? '0px' : '40px 30px 30px',
            width: '100%',
          }}
        >
          {this.props.botBuilder ? null : <StaticAppBar {...this.props} />}
          <Grid fluid>
            <Row>
              <Col
                md={this.state.colSkill}
                style={{
                  display: this.state.colSkill === 0 ? 'none' : 'block',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    paddingTop: this.props.botBuilder ? '0px' : '28px',
                  }}
                >
                  {this.props.botBuilder ? (
                    <h1 style={{ lineHeight: '50px' }}>
                      1. Add a new skill to your bot
                    </h1>
                  ) : (
                    <div style={styles.heading}>Create a SUSI Skill</div>
                  )}
                  <div
                    style={{
                      marginLeft: 'auto',
                      marginRight: this.props.botBuilder ? '0px' : '30px',
                    }}
                  >
                    <IconButton
                      tooltip="Code View"
                      onTouchTap={() => {
                        this.setState({
                          codeView: true,
                          conversationView: false,
                          treeView: false,
                        });
                      }}
                      disableTouchRipple={true}
                    >
                      <Code
                        color={
                          this.state.codeView
                            ? 'rgb(66, 133, 244)'
                            : 'rgb(158, 158, 158)'
                        }
                      />
                    </IconButton>
                    <IconButton
                      tooltip="Conversation View"
                      onTouchTap={() => {
                        this.setState({
                          codeView: false,
                          conversationView: true,
                          treeView: false,
                        });
                      }}
                      disableTouchRipple={true}
                    >
                      <QA
                        color={
                          this.state.conversationView
                            ? 'rgb(66, 133, 244)'
                            : 'rgb(158, 158, 158)'
                        }
                      />
                    </IconButton>
                    <IconButton
                      tooltip="Tree View"
                      onTouchTap={() => {
                        this.setState({
                          codeView: false,
                          conversationView: false,
                          treeView: true,
                        });
                      }}
                      disableTouchRipple={true}
                    >
                      <Timeline
                        color={
                          this.state.treeView
                            ? 'rgb(66, 133, 244)'
                            : 'rgb(158, 158, 158)'
                        }
                      />
                    </IconButton>
                  </div>
                </div>
                <ReactTooltip
                  effect="solid"
                  place="bottom"
                  className="tooltipSkill"
                  delayHide={500}
                  html={true}
                />
                <Paper style={styles.paperStyle} zDepth={1}>
                  <Info
                    style={styles.helpIcon}
                    data-tip={`Learn more about <a href=${urls.CMS_GITHUB_URL +
                      '/blob/master/docs/Skill_Tutorial.md'} rel="noopener noreferrer" target="_blank" >SUSI Skill Language</a>`}
                  />
                  <div style={styles.center}>
                    <div style={styles.dropdownDiv}>
                      <div>
                        <span
                          style={{
                            fontSize: 15,
                            paddingTop: '43px',
                            paddingLeft: '10px',
                          }}
                        >
                          Category:
                        </span>
                        <DropDownMenu
                          value={this.state.groupValue}
                          onChange={this.handleGroupChange}
                          anchorOrigin={this.state.anchorOrigin}
                          autoWidth={true}
                          maxHeight={300}
                          style={{
                            position: 'relative',
                            top: '15px',
                            width: '250px',
                          }}
                        >
                          {this.state.groups}
                        </DropDownMenu>
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: 15,
                            paddingTop: '8px',
                            marginLeft: '10px',
                          }}
                        >
                          Language:
                        </span>

                        <DropDownMenu
                          disabled={this.state.languageSelect}
                          value={this.state.languageValue}
                          anchorOrigin={this.state.anchorOrigin}
                          onChange={this.handleLanguageChange}
                          autoWidth={true}
                          maxHeight={300}
                          style={{
                            position: 'relative',
                            top: '15px',
                            width: '250px',
                          }}
                        >
                          {languages}
                        </DropDownMenu>
                      </div>
                      <TextField
                        disabled={this.state.expertSelect}
                        floatingLabelText={
                          this.props.botBuilder ? 'Bot Name' : 'Skill Name'
                        }
                        floatingLabelFixed={false}
                        value={this.state.expertValue}
                        hintText={
                          this.props.botBuilder ? 'Bot Name' : 'Skill Name'
                        }
                        style={{ marginLeft: 10, marginRight: 10 }}
                        onChange={this.handleExpertChange}
                      />
                      <div style={{ paddingTop: 20 }}>
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
                        {this.props.botBuilder ? (
                          <form style={{ display: 'inline-block' }}>
                            <label
                              title="Upload bot image"
                              style={styles.uploadCircularButton}
                            >
                              <input
                                type="file"
                                ref={c => {
                                  this.file = c;
                                }}
                                name="user[image]"
                                multiple="false"
                                onChange={this._onChange}
                              />
                              <Add
                                style={{
                                  height: '30px',
                                  marginTop: '15px',
                                  color: 'rgb(66, 133, 245)',
                                }}
                              />
                            </label>
                          </form>
                        ) : (
                          <RaisedButton
                            label="Choose an Image"
                            labelPosition="before"
                            secondary={true}
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
                        )}
                      </div>
                    </div>
                  </div>
                </Paper>
                {!this.state.loadViews ? (
                  <div className="center" style={{ padding: 10 }}>
                    <CircularProgress size={62} color="#4285f5" />
                    <h4>Loading</h4>
                  </div>
                ) : null}
                {this.state.codeView && this.state.loadViews ? (
                  <CodeView
                    skillCode={this.state.code}
                    sendInfoToProps={this.sendInfoToProps}
                  />
                ) : null}
                {this.state.conversationView && this.state.loadViews ? (
                  <ConversationView skillCode={this.state.code} />
                ) : null}
                {this.state.treeView && this.state.loadViews ? (
                  <TreeView skillCode={this.state.code} botbuilder={false} />
                ) : null}
                {this.props.botBuilder ? null : (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
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
                        label={
                          this.state.loading ? (
                            <CircularProgress color="#ffffff" size={32} />
                          ) : (
                            'Save'
                          )
                        }
                        secondary={true}
                        labelColor="#fff"
                        style={{ marginLeft: 10 }}
                        onTouchTap={this.saveClick}
                      />
                      <Link to="/">
                        <RaisedButton
                          label="Cancel"
                          secondary={true}
                          labelColor="#fff"
                          style={{ marginLeft: 10 }}
                        />
                      </Link>
                    </Paper>
                    {this.state.prevButton === 1 ? (
                      <div className="preview-button" style={{ top: '68px' }}>
                        <span title="See Preview">
                          <ChevronLeft
                            onClick={this.handlePreviewToggle}
                            style={styles.chevronButton}
                          />
                        </span>
                      </div>
                    ) : null}
                  </div>
                )}
              </Col>
              {this.props.botBuilder ? null : (
                <Col
                  xs={12}
                  md={this.state.colPreview}
                  style={{
                    display: this.state.colPreview === 0 ? 'none' : 'block',
                    paddingTop: '15px',
                  }}
                >
                  <Paper style={styles.paperStyle} zDepth={1}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <span title="collapse preview">
                        <ChevronRight
                          onClick={this.handlePreviewToggle}
                          style={styles.chevron}
                        />
                      </span>
                      <h2 style={{ margin: 'auto' }}>Preview</h2>
                    </div>
                    <div
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        marginTop: '20px',
                      }}
                    >
                      <Preview skill={this.state.code} botBuilder={false} />
                    </div>
                  </Paper>
                </Col>
              )}
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

const styles = {
  paperStyle: {
    width: '100%',
    marginTop: '20px',
    padding: '20px 30px 30px',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownDiv: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  loggedInError: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: '100px',
    fontSize: '50px',
    marginTop: '300px',
  },
  heading: {
    color: 'rgba(0,0,0,.65)',
    fontSize: '27px',
    fontWeight: '500',
    paddingLeft: '30px',
    paddingTop: '10px',
  },
  helpIcon: {
    position: 'relative',
    float: 'right',
    height: '20px',
    width: '20px',
    cursor: 'pointer',
    color: 'rgb(158, 158, 158)',
  },
  uploadCircularButton: {
    borderRadius: '50%',
    height: '60px',
    width: '60px',
    backgroundColor: '#eee',
    textAlign: 'center',
    float: 'left',
    cursor: 'pointer',
  },
  chevron: {
    position: 'relative',
    left: '-20px',
    top: '-10px',
    width: '35px',
    height: '35px',
    color: 'rgb(158, 158, 158)',
    cursor: 'pointer',
    display: window.innerWidth < 769 ? 'none' : 'inherit',
  },
  chevronButton: {
    position: 'absolute',
    left: '4px',
    top: '4px',
    width: '35px',
    height: '35px',
    color: 'white',
    cursor: 'pointer',
    display: window.innerWidth < 769 ? 'none' : 'inherit',
  },
};

SkillCreator.propTypes = {
  botBuilder: PropTypes.object,
};
