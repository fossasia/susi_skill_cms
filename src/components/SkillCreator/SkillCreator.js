import React, { Component } from 'react';
import { connect } from 'react-redux';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import CodeView from './SkillViews/CodeView';
import ConversationView from './SkillViews/ConversationView';
import TreeView from './SkillViews/TreeView';
import Preview from '../BotBuilder/Preview/Preview';
import { urls, colors, searchURLPath, getQueryStringValue } from '../../utils';
import createActions from '../../redux/actions/create';
import CircularProgress from 'material-ui/CircularProgress';
import { Link } from 'react-router-dom';
import ISO6391 from 'iso-639-1';
import ReactTooltip from 'react-tooltip';
import { Grid, Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

import {
  fetchAllGroupOptions,
  fetchAllLanguageOptions,
  fetchSkillMetaData,
  deleteSkill,
  modifySkill,
  createSkill,
} from '../../api/index.js';

import './SkillCreator.css';
import './Animation.min.css';

// Material-UI Components
import { Dialog, Paper, RaisedButton, TextField } from 'material-ui';
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
import { bindActionCreators } from 'redux';
let languages = [];

const styles = {
  paperStyle: {
    width: '100%',
    marginTop: '20px',
    padding: '20px 30px 30px',
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
    left: '-2px',
    top: '-3px',
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
  home: {
    width: '100%',
    padding: '40px 10px 0',
  },
  titleStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '20px',
    fontSize: '20px',
    marginTop: '15px',
  },
  subtitleStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '20px',
    fontSize: '16px',
    marginTop: '15px',
  },
  description: {
    textAlign: 'center',
    fontSize: '15px',
    marginTop: '20px',
  },
  button: {
    display: 'flex',
    marginRight: '30px',
    alignItems: 'center',
    cursor: 'pointer',
  },
  editpaperStyle: {
    width: '100%',
    padding: '10px',
    margin: '30px 0 0',
  },
  bold: {
    fontSize: '14px',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  anchorOrigin: {
    horizontal: 'left',
    vertical: 'bottom',
  },
};

class SkillCreator extends Component {
  constructor(props) {
    super(props);

    this.isBotBuilder = window.location.pathname.split('/')[1] === 'botbuilder';

    let commonState = {
      groups: [],
      loadViews: false,
      editable: true,
    };

    if (
      searchURLPath('name') &&
      searchURLPath('group') &&
      searchURLPath('language')
    ) {
      this.expertValue = getQueryStringValue('name');
      this.groupValue = getQueryStringValue('group');
      this.languageValue = getQueryStringValue('language');
    }

    if (
      this.props.location &&
      this.props.location.pathname.split('/')[3] === 'edit'
    ) {
      const { pathname } = this.props.location;
      this.mode = 'edit';
      this.groupValue = pathname.split('/')[1];
      this.languageValue = pathname.split('/')[4];
      this.expertValue = pathname.split('/')[2];
      this.commitId = pathname.split('/')[5];

      let commitMessage = `Updated Skill ${this.expertValue}`;
      if (this.props.hasOwnProperty('revertingCommit')) {
        commitMessage = 'Reverting to commit - ' + this.props.revertingCommit;
      } else if (this.commitId) {
        commitMessage = `Reverting to commit - ${this.commitId}`;
      }
      this.state = {
        ...commonState,
        loading: false,
        showImage: true,
        commitMessage,
        codeChanged: false,
        showDeleteBox: false,
        groupSelect: false,
        languageSelect: false,
        expertSelect: false,
        date: '',
        author: '',
        oldImageUrl: '',
        image_name_changed: false,
        showAdmin: false,
        deleteDisabled: true,
        slideState: 1, // 1 means in middle, 2 means preview collapsed
        colSkill: this.props.hasOwnProperty('revertingCommit') ? 12 : 8,
        colPreview: this.props.hasOwnProperty('revertingCommit') ? 0 : 4,
        prevButton: 0, // 0 means disappear, 1 means appear
      };
    } else {
      this.mode = 'create';
      this.state = {
        ...commonState,
        showImage: false,
        loading: false,
        commitMessage: '',
        groupSelect: true,
        expertSelect: true,
        slideState: 1, // 1 means in middle, 2 means preview collapsed
        colSkill: 8,
        colPreview: 4,
        prevButton: 0, // 0 means disappear, 1 means appear
      };
    }
  }

  loadlanguages() {
    if (languages.length === 0) {
      fetchAllLanguageOptions()
        .then(payload => {
          const data = payload.languagesArray;
          this.setState({ languages: data });
          languages = data.map(language => {
            if (ISO6391.getNativeName(language)) {
              return (
                <MenuItem
                  value={language}
                  key={language}
                  primaryText={ISO6391.getNativeName(language)}
                />
              );
            }
            return (
              <MenuItem
                value={language}
                key={language}
                primaryText={'Universal'}
              />
            );
          });
        })
        .catch(error => {
          console.log('Error while fetching languages', error);
        });
    }
  }

  componentWillUnmount() {
    if (!this.isBotBuilder) {
      const { actions } = this.props;
      actions.resetCreateStore();
    }
  }

  componentDidMount = () => {
    // Check if admin is logged in or not
    const { isAdmin, actions } = this.props;
    if (isAdmin) {
      this.setState({
        showAdmin: true,
      });
    }

    if (this.isBotBuilder) {
      this.setState({
        slideState: 0,
        colSkill: 12,
        colPreview: 0,
        prevButton: 0,
      });
    }

    this.loadgroups();

    if (
      this.mode === 'edit' ||
      (searchURLPath('name') &&
        searchURLPath('group') &&
        searchURLPath('language'))
    ) {
      let payload = {
        skill: this.expertValue,
        group: this.groupValue,
        language: this.languageValue,
        model: 'general',
      };
      this.loadlanguages();

      fetchSkillMetaData(payload)
        .then(payload => {
          this.setState({
            editable: payload.skillMetadata.editable,
            loadViews: true,
          });
        })
        .catch(error => {
          console.log('Error while fetching skill metadata', error);
        });

      actions.setSkillData({
        name: this.expertValue,
        category: this.groupValue,
        language: this.languageValue,
      });

      if (this.mode === 'edit') {
        document.title = 'SUSI.AI - Edit Skill';
        if (this.commitId) {
          actions
            .getSkillByCommitId({
              ...payload,
              commitID: this.commitId,
            })
            .then(payload => {
              this.setState({
                author: payload.author,
                date: payload.commitDate,
                loadViews: true,
              });
              const match = payload.file.match(/^::image\s(.*)$/m);
              if (match != null) {
                this.setState({ codeChanged: true });
              }
            });
        }
        // Edit already existing Skill
        actions
          .getSkillCode(payload)
          .then(payload => {
            const {
              payload: { text: code },
            } = payload;
            const match = code.match(/^::image\s(.*)$/m);
            if (match !== null) {
              this.setState({
                codeChanged: true,
                loadViews: true,
              });
            }
          })
          .catch(error => {
            console.log('Error while fetching skill', error);
          });
      } else if (
        searchURLPath('name') &&
        searchURLPath('group') &&
        searchURLPath('language')
      ) {
        this.setState({ showImage: true });
        payload = { ...payload, private: 1 };
        actions
          .getBotBuilderCode(payload)
          .then(payload => {
            const {
              payload: { text: code },
            } = payload;
            const match = code.match(/^::image\s(.*)$/m);
            if (match !== null) {
              this.setState({
                codeChanged: true,
                loadViews: true,
              });
            }
          })
          .catch(error => {
            console.log('Error while fetching skill', error);
          });
      }
    } else {
      document.title = 'SUSI.AI - Create Skill';
      this.setState({ loadViews: true });
      this.prefillCode();
    }
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
    const { userName, email, actions } = this.props;
    let { code } = this.props;
    if (userName) {
      code = code.replace(/^::author\s(.*)$/m, '::author ' + userName);
      actions.setSkillData({ code });
    }

    if (email) {
      actions.getAuthorUrl({ email });
    }
  };

  loadgroups() {
    if (this.state.groups.length === 0) {
      fetchAllGroupOptions()
        .then(payload => {
          if (payload.groups) {
            const data = payload.groups;
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
        })
        .catch(error => {
          console.log('Error while fetching groups', error);
        });
    }
  }

  handleExpertChange = event => {
    const { actions } = this.props;
    let { code } = this.props;
    const { value: name } = event.target;
    code = code.replace(/^::name\s(.*)$/m, `::name ${name}`);
    let commitMessage = 'Created Skill ' + name;
    this.setState({
      commitMessage,
    });
    actions.setSkillData({ name, code });
  };

  handleGroupChange = (event, index, value) => {
    const { actions } = this.props;
    let { code } = this.props;
    code = code.replace(/^::category\s(.*)$/m, `::category ${value}`);
    this.setState({
      groupSelect: false,
      languageSelect: false,
    });
    actions.setSkillData({ category: value, code });
    if (languages.length === 0) {
      fetchAllLanguageOptions()
        .then(payload => {
          const data = payload.languagesArray;
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
              this.setState({ languageSelect: false, expertSelect: false });
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
        })
        .catch(error => {
          console.log('Error while fetching languages', error);
        });
    }
  };

  handleLanguageChange = (event, index, value) => {
    const { actions } = this.props;
    let { code } = this.props;
    code = code.replace(/^::language\s(.*)$/m, `::language ${value}`);
    this.setState({
      expertSelect: false,
    });
    actions.setSkillData({ language: value, code });
  };

  handleExpertChange = event => {
    const { actions } = this.props;
    let { code } = this.props;
    const { value: name } = event.target;
    code = code.replace(/^::name\s(.*)$/m, `::name ${name}`);
    let commitMessage = 'Created Skill ' + name;
    this.setState({
      commitMessage,
    });
    actions.setSkillData({ name, code });
  };

  handleDeleteText = event => {
    const { code } = this.props;
    const name = code.match(/^::name\s(.*)$/m);
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

  saveClick = () => {
    const {
      email,
      accessToken,
      category,
      language,
      name,
      file,
      imageUrl,
    } = this.props;
    let { code } = this.props;
    code = '::author_email ' + email + '\n' + code;
    if (this.isBotBuilder) {
      code = '::protected Yes\n' + code;
    } else {
      code = '::protected No\n' + code;
    }

    if (this.state.commitMessage === null) {
      notification.open({
        message: 'Please add a commit message',
        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
      });

      return 0;
    }

    if (!accessToken) {
      notification.open({
        message: 'Not logged In',
        description: 'Please login and then try to create/edit a skill',
        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
      });
      return 0;
    }
    if (category === null || language === '' || name === '') {
      notification.open({
        message: 'Error Processing your Request',
        description: 'Please select a group, language and a skill',
        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
      });
      return 0;
    }
    if (!new RegExp(/.+\.\w+/g).test(imageUrl)) {
      notification.open({
        message: 'Error Processing your Request',
        description: 'Image must be in format of images/imageName.jpg',
        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
      });
      return 0;
    }
    if (this.mode === 'create' && file === null) {
      notification.open({
        message: 'Error Processing your Request',
        description: 'Image Not Given',
        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
      });
      return 0;
    }

    if (this.mode === 'edit' && name === '') {
      notification.open({
        message: 'Error Processing your Request',
        description: 'Skill name cannot be empty',
        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
      });
      return 0;
    }

    this.setState({
      loading: true,
    });

    if (
      this.mode === 'edit' &&
      this.groupValue === category &&
      this.expertValue === name &&
      this.languageValue === language &&
      !this.state.codeChanged &&
      !this.state.image_name_changed
    ) {
      notification.open({
        message: 'Please make some changes to save the Skill',
        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
      });
      this.setState({
        loading: false,
      });
      return 0;
    }
    let form = new FormData();
    if (this.mode === 'create') {
      form.append('model', 'general');
      form.append('group', category);
      form.append('language', language);
      form.append('skill', name.trim().replace(/\s/g, '_'));
      form.append('image', file);
      form.append('content', code);
      form.append('image_name', imageUrl.replace('images/', ''));
      form.append('access_token', accessToken);
      if (this.isBotBuilder) {
        form.append('private', '1');
      }
      createSkill(form)
        .then(payload => {
          if (payload.accepted === true) {
            if (this.mode === 'create') {
              notification.open({
                message: 'Accepted',
                description: 'Your Skill has been uploaded to the server',
                icon: <Icon type="check-circle" style={{ color: '#00C853' }} />,
              });
            }
            if (!this.props.hasOwnProperty('revertingCommit')) {
              this.props.history.push({
                pathname:
                  '/' +
                  category +
                  '/' +
                  name.trim().replace(/\s/g, '_') +
                  '/' +
                  language,
              });
            }
          } else {
            this.setState({
              loading: false,
            });
            notification.open({
              message: 'Error Processing your Request',
              description: String(payload.message),
              icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
            });
          }
        })
        .catch(error => {
          this.setState({
            loading: false,
          });
          notification.open({
            message: 'Error Processing your Request',
            description: String(error),
            icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
          });
        });
    } else {
      let file;
      form.append('OldModel', 'general');
      form.append('OldGroup', this.groupValue);
      form.append('OldLanguage', this.languageValue);
      form.append('OldSkill', this.expertValue);
      form.append('NewModel', 'general');
      form.append('NewGroup', category);
      form.append('NewLanguage', language);
      form.append('NewSkill', name);
      form.append('changelog', this.state.commitMessage);
      form.append('content', code);
      form.append('imageChanged', this.state.image_name_changed);
      form.append(
        'old_image_name',
        this.state.oldImageUrl.replace('images/', ''),
      );
      form.append('new_image_name', imageUrl.replace('images/', ''));
      form.append('image_name_changed', this.state.image_name_changed);
      form.append('access_token', accessToken);

      if (this.state.image_name_changed) {
        // append file to image
        form.append('image', file);
      }

      modifySkill(form)
        .then(payload => {
          if (payload.accepted === true) {
            notification.open({
              message: 'Accepted',
              description: 'Skill has been updated at the server.',
              icon: <Icon type="check-circle" style={{ color: '#00C853' }} />,
            });
            if (!this.props.hasOwnProperty('revertingCommit')) {
              this.props.history.push({
                pathname:
                  '/' +
                  category +
                  '/' +
                  name.trim().replace(/\s/g, '_') +
                  '/' +
                  language,
              });
            }
          } else {
            this.setState({
              loading: false,
            });
            notification.open({
              message: 'Error Processing your Request',
              description: String(payload.message),
              icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
            });
          }
        })
        .catch(error => {
          this.setState({
            loading: false,
          });
          notification.open({
            message: 'Error Processing your Request',
            description: String(error),
            icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
          });
        });
    }

    // Uncomment to check the form values
    // console.log(category);
    // console.log(language);
    // console.log(name.trim().replace(/\s/g, '_'));
    // console.log(file);
    // console.log(code);
    // console.log(imageUrl.replace('images/', ''));
  };

  _onChange = event => {
    const { actions } = this.props;
    let { code } = this.props;
    // Assuming only image
    let payload = {};
    let file = this.file.files[0];
    const image = window.URL.createObjectURL(file);
    // console.log(file) // Would see a path?
    if (event.target.files && event.target.files[0]) {
      this.setState({
        showImage: true,
      });
    }
    let imageUrl = file.name;
    const pattern = /^::image\s(.*)$/m;
    code = code.replace(pattern, `::image images/${imageUrl}`);
    payload = { ...payload, file, imageUrl, code, image };
    actions.setSkillData(payload);
  };

  openDelete = () => {
    this.setState({ showDeleteBox: true });
  };

  closeDelete = () => {
    this.setState({ showDeleteBox: false });
  };

  handleCommitMessageChange = event => {
    this.setState({
      commitMessage: event.target.value,
    });
  };

  deleteSkill = () => {
    this.setState({
      deleteDisabled: true,
    });
    deleteSkill()
      .then(payload => {
        if (payload.accepted === true) {
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
            description: payload.message,
            icon: (
              <Icon
                type="check-circle"
                style={{ color: colors.warningColor }}
              />
            ),
          });
          this.props.history.push({
            pathname: '/',
            state: {},
          });
        }
      })
      .catch(error => {
        console.log('Error while deleting skill', error);
      });
  };

  handleLabel = () => {
    if (this.mode === 'edit') {
      return 'Update';
    }
    return 'Save';
  };

  render() {
    const {
      accessToken,
      actions,
      view,
      category,
      language,
      name,
      image,
    } = this.props;
    const {
      bold,
      paperStyle,
      editpaperStyle,
      description,
      subtitleStyle,
      titleStyle,
      home,
      chevronButton,
      chevron,
      uploadCircularButton,
      helpIcon,
      heading,
      loggedInError,
      dropdownDiv,
      center,
      anchorOrigin,
    } = styles;
    const { showImage, loadViews } = this.state;
    let showTopBar = true;
    if (this.props.hasOwnProperty('showTopBar')) {
      showTopBar = this.props.showTopBar;
    }
    if (this.mode === 'create' && !accessToken) {
      if (this.mode === 'create') {
        return (
          <div>
            <StaticAppBar {...this.props} />
            <div>
              <p style={loggedInError}>Please login to create a skill.</p>
            </div>
          </div>
        );
      }
    }

    return (
      <div>
        <div
          style={{
            padding: this.isBotBuilder ? '0px' : '40px 30px 30px',
            width: '100%',
          }}
        >
          {this.isBotBuilder ? null : <StaticAppBar {...this.props} />}
          <Grid fluid>
            <Row>
              <Col
                md={this.state.colSkill}
                style={{
                  display: this.state.colSkill === 0 ? 'none' : 'block',
                }}
              >
                {this.mode === 'edit' &&
                  accessToken &&
                  !this.props.revertingCommit &&
                  this.commitId &&
                  showTopBar && (
                    <Paper style={editpaperStyle} zDepth={1}>
                      <div>
                        {
                          'You are currently editing an older version of the Skill: '
                        }
                        <b style={bold}>{this.expertValue}</b>
                        <br />
                        <span>
                          Author: <b style={bold}>{this.state.author}</b>
                        </span>
                        <br />
                        <span>
                          commitID: <b>{this.commitId}</b>
                        </span>
                        <br />
                        <span>
                          Revision as of <b>{this.state.date}</b>
                        </span>
                      </div>
                    </Paper>
                  )}
                {!accessToken && (
                  <div>
                    <StaticAppBar {...this.props} />
                    <div style={home}>
                      <p style={titleStyle}>
                        YOU DO NOT HAVE PERMISSION TO EDIT THIS PAGE, SINCE YOU
                        ARE NOT LOGGED IN.
                      </p>
                      <p style={description}>
                        The code is shown below in a read only mode.
                      </p>
                    </div>
                  </div>
                )}
                {accessToken &&
                  this.mode === 'edit' &&
                  !this.state.editable &&
                  !this.state.showAdmin && (
                    <div style={home}>
                      <p style={titleStyle}>
                        THIS SKILL IS NOT EDITABLE. IT IS CURRENTLY LOCKED BY
                        ADMINS. YOU CAN STILL SEE THE CODE OF THE SKILL.
                      </p>
                      <p style={subtitleStyle}>
                        There can be various reasons for non-editable skills.{' '}
                        <br />For example if the skill is a standard skill, if
                        there was vandalism happening in the skill or if there
                        is a dispute about the skill.
                      </p>
                      <p style={description}>
                        The code is shown below in a read only mode.
                      </p>
                    </div>
                  )}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    paddingTop: this.isBotBuilder ? '0px' : '28px',
                  }}
                >
                  {this.isBotBuilder ? (
                    <h1 style={{ lineHeight: '50px' }}>
                      1. Add a new skill to your bot
                    </h1>
                  ) : (
                    this.mode === 'create' && (
                      <div style={heading}>Create a SUSI Skill</div>
                    )
                  )}
                  <div
                    style={{
                      marginLeft: 'auto',
                      marginRight: this.isBotBuilder ? '0px' : '30px',
                    }}
                  >
                    <IconButton
                      className="iconbutton"
                      tooltip="Code View"
                      onClick={() => actions.setView({ view: 'code' })}
                      disableTouchRipple={true}
                    >
                      <Code
                        color={
                          view === 'code'
                            ? 'rgb(66, 133, 244)'
                            : 'rgb(158, 158, 158)'
                        }
                      />
                    </IconButton>
                    <IconButton
                      className="iconbutton"
                      tooltip="Conversation View"
                      onClick={() => actions.setView({ view: 'conversation' })}
                      disableTouchRipple={true}
                    >
                      <QA
                        color={
                          view === 'conversation'
                            ? 'rgb(66, 133, 244)'
                            : 'rgb(158, 158, 158)'
                        }
                      />
                    </IconButton>
                    <IconButton
                      className="iconbutton"
                      tooltip="Tree View"
                      onClick={() => actions.setView({ view: 'tree' })}
                      disableTouchRipple={true}
                    >
                      <Timeline
                        color={
                          view === 'tree'
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
                {accessToken &&
                  this.state.editable && (
                    <Paper style={paperStyle} zDepth={1}>
                      <Info
                        style={helpIcon}
                        data-tip={`Learn more about <a href=${urls.CMS_GITHUB_URL +
                          '/blob/master/docs/Skill_Tutorial.md'} rel="noopener noreferrer" target="_blank" >SUSI Skill Language</a>`}
                      />
                      <div style={center}>
                        <div style={dropdownDiv}>
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
                              value={category}
                              onChange={this.handleGroupChange}
                              anchorOrigin={anchorOrigin}
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
                              value={language}
                              anchorOrigin={anchorOrigin}
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
                              this.isBotBuilder ? 'Bot Name' : 'Skill Name'
                            }
                            floatingLabelFixed={false}
                            value={name}
                            hintText={
                              this.isBotBuilder ? 'Bot Name' : 'Skill Name'
                            }
                            style={{ marginLeft: 10, marginRight: 10 }}
                            onChange={this.handleExpertChange}
                          />
                          <div style={{ paddingTop: 20 }}>
                            {showImage && (
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
                                src={image}
                              />
                            )}
                            <form style={{ display: 'inline-block' }}>
                              <label
                                title="Upload bot image"
                                style={uploadCircularButton}
                              >
                                <input
                                  accept="image/*"
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
                          </div>
                        </div>
                      </div>
                    </Paper>
                  )}
                {!loadViews ? (
                  <div className="center" style={{ padding: 10 }}>
                    <CircularProgress size={62} color="#4285f5" />
                    <h4>Loading</h4>
                  </div>
                ) : null}
                {view === 'code' && loadViews ? (
                  <CodeView editable={this.state.editable && accessToken} />
                ) : null}
                {view === 'conversation' && loadViews ? (
                  <ConversationView />
                ) : null}
                {view === 'tree' && loadViews ? (
                  <TreeView botbuilder={false} />
                ) : null}
                {!this.isBotBuilder &&
                  accessToken &&
                  this.state.editable && (
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
                              this.handleLabel()
                            )
                          }
                          backgroundColor={colors.header}
                          labelColor="#fff"
                          style={{ marginLeft: 10 }}
                          onClick={this.saveClick}
                        />
                        <Link
                          to={
                            this.mode === 'create'
                              ? '/'
                              : {
                                  pathname:
                                    '/' +
                                    category +
                                    '/' +
                                    name +
                                    '/' +
                                    language,
                                }
                          }
                        >
                          <RaisedButton
                            label="Cancel"
                            backgroundColor={colors.header}
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
                              style={chevronButton}
                            />
                          </span>
                        </div>
                      ) : null}
                    </div>
                  )}
                {this.mode === 'edit' &&
                  this.state.showAdmin && (
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
                        backgroundColor={colors.warningColor}
                        labelColor="#fff"
                        style={{ marginLeft: 10 }}
                        onClick={this.openDelete}
                      />
                    </Paper>
                  )}
              </Col>
              {this.isBotBuilder ? null : (
                <Col
                  className="skillcreator-col"
                  id="skillcreator-col"
                  xs={12}
                  md={this.state.colPreview}
                  style={{
                    display: this.state.colPreview === 0 ? 'none' : 'block',
                  }}
                >
                  <Paper
                    style={
                      (paperStyle,
                      {
                        height: '99.9%',
                        marginTop: '20px',
                        position: 'relative',
                      })
                    }
                    zDepth={1}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <span title="collapse preview">
                        <ChevronRight
                          onClick={this.handlePreviewToggle}
                          style={chevron}
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
                      <Preview botBuilder={false} />
                    </div>
                  </Paper>
                </Col>
              )}
            </Row>
          </Grid>
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
                  backgroundColor={colors.warningColor}
                  labelColor="#fff"
                  style={{ marginLeft: 10 }}
                  onClick={this.deleteSkill}
                />
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    );
  }
}

SkillCreator.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  showTopBar: PropTypes.bool,
  revertingCommit: PropTypes.string,
  botBuilder: PropTypes.object,
  accessToken: PropTypes.string,
  email: PropTypes.string,
  userName: PropTypes.string,
  isAdmin: PropTypes.bool,
  actions: PropTypes.object,
  code: PropTypes.string,
  view: PropTypes.string,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  language: PropTypes.string,
  category: PropTypes.string,
  image: PropTypes.object,
  file: PropTypes.object,
};

function mapStateToProps(store) {
  return {
    userName: store.app.userName,
    accessToken: store.app.accessToken,
    isAdmin: store.app.isAdmin,
    email: store.app.email,
    skill: store.create.skill,
    view: store.create.view,
    category: store.create.skill.category,
    language: store.create.skill.language,
    name: store.create.skill.name,
    imageUrl: store.create.skill.imageUrl,
    image: store.create.skill.image,
    code: store.create.skill.code,
    file: store.create.skill.file,
  };
}

function mapDispatchToActions(dispatch) {
  return {
    actions: bindActionCreators(createActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToActions,
)(SkillCreator);
