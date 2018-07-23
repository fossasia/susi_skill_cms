import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Paper } from 'material-ui';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import $ from 'jquery';

import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import Footer from '../Footer/Footer.react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import CircleImage from '../CircleImage/CircleImage';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import AuthorSkills from '../AuthorSkills/AuthorSkills';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Delete from 'material-ui/svg-icons/action/delete';
import EditBtn from 'material-ui/svg-icons/editor/mode-edit';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

import '../SkillFeedbackCard/SkillFeedbackCard.css';
import './SkillFeedbackPage.css';
import urls from '../../Utils/urls';

import { parseDate } from '../../Utils/helperFunctions';

const cookies = new Cookies();

const defaultNullSkillList = ['image', 'author', 'author_url'];
// eslint-disable-next-line
let name;

const iconButtonElement = (
  <IconButton touch={true} tooltip="More" tooltipPosition="bottom-left">
    <MoreVertIcon />
  </IconButton>
);

class SkillFeedbackPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openEditDialog: false,
      openDeleteDialog: false,
      errorText: '',
      skill_feedback: [],
      imgUrl: null,
      dataReceived: false,
      showAuthorSkills: false,
    };
    let clickedSkill = this.props.location.pathname.split('/')[2];
    this.name = clickedSkill;
    this.url = '';
  }

  componentDidMount() {
    if (this.url !== undefined) {
      let baseUrl = urls.API_URL + '/cms/getSkillMetadata.json';
      let url = this.url;
      let modelValue = 'general';
      this.groupValue = this.props.location.pathname.split('/')[1];
      this.languageValue = this.props.location.pathname.split('/')[3];
      url =
        baseUrl +
        '?model=' +
        modelValue +
        '&group=' +
        this.groupValue +
        '&language=' +
        this.languageValue +
        '&skill=' +
        this.name;
      let self = this;
      $.ajax({
        url: url,
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(data) {
          self.updateData(data.skill_metadata);
        },
      });
      this.getFeedback();
    }
  }

  updateData = skillData => {
    let imgUrl = `https://raw.githubusercontent.com/fossasia/susi_skill_data/master/models/general/${
      this.groupValue
    }/${this.languageValue}/${skillData.image}`;
    if (!skillData.image) {
      imgUrl =
        'https://pbs.twimg.com/profile_images/904617517489979392/6Hff65Th.jpg';
    }
    this.setState({
      imgUrl,
    });

    defaultNullSkillList.forEach(data => {
      this.setState({
        [data]: skillData[data],
      });
    });
    let skill_name =
      skillData.skill_name === null ? 'No Name Given' : skillData.skill_name;
    this.setState({
      skill_name,
    });
    name = skill_name;
    this.setState({
      dataReceived: true,
    });
  };

  saveSkillFeedback = (skill_feedback = []) => {
    this.setState({
      skill_feedback,
    });
  };

  getFeedback = () => {
    let getFeedbackUrl = `${urls.API_URL}/cms/getSkillFeedback.json`;
    let modelValue = 'general';
    this.groupValue = this.props.location.pathname.split('/')[1];
    this.languageValue = this.props.location.pathname.split('/')[3];
    getFeedbackUrl =
      getFeedbackUrl +
      '?model=' +
      modelValue +
      '&group=' +
      this.groupValue +
      '&language=' +
      this.languageValue +
      '&skill=' +
      this.name;

    let self = this;
    // Get skill feedback of the visited skill
    $.ajax({
      url: getFeedbackUrl,
      dataType: 'jsonp',
      crossDomain: true,
      jsonp: 'callback',
      success: function(data) {
        self.saveSkillFeedback(data.feedback);
      },
      error: function(e) {
        console.log(e);
      },
    });
  };

  postFeedbackApi = newFeedback => {
    let baseUrl = urls.API_URL + '/cms/feedbackSkill.json';
    let modelValue = 'general';
    this.groupValue = this.props.location.pathname.split('/')[1];
    this.languageValue = this.props.location.pathname.split('/')[3];
    let postFeedbackUrl =
      baseUrl +
      '?model=' +
      modelValue +
      '&group=' +
      this.groupValue +
      '&language=' +
      this.languageValue +
      '&skill=' +
      this.name +
      '&feedback=' +
      newFeedback +
      '&access_token=' +
      cookies.get('loggedIn');
    let self = this;
    $.ajax({
      url: postFeedbackUrl,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        self.getFeedback();
      },
      error: function(e) {
        console.log(e);
      },
    });
  };

  deleteFeedbackApi = () => {
    let baseUrl = urls.API_URL + '/cms/removeFeedback.json';
    let modelValue = 'general';
    this.groupValue = this.props.location.pathname.split('/')[1];
    this.languageValue = this.props.location.pathname.split('/')[3];
    let deleteFeedbackUrl =
      baseUrl +
      '?model=' +
      modelValue +
      '&group=' +
      this.groupValue +
      '&language=' +
      this.languageValue +
      '&skill=' +
      this.name +
      '&access_token=' +
      cookies.get('loggedIn');
    let self = this;
    $.ajax({
      url: deleteFeedbackUrl,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        self.getFeedback();
      },
      error: function(e) {
        console.log(e);
      },
    });
  };

  handleEditOpen = () => {
    this.setState({ openEditDialog: true });
  };

  handleDeleteOpen = () => {
    this.setState({ openDeleteDialog: true });
  };

  handleEditClose = () => {
    this.setState({
      openEditDialog: false,
      errorText: '',
    });
  };

  handleDeleteClose = () => {
    this.setState({
      openDeleteDialog: false,
    });
  };

  editFeedback = () => {
    let feedbackText = document.getElementById('edit-feedback').value;
    if (!feedbackText) {
      this.setState({ errorText: 'Feedback cannot be empty' });
    } else {
      this.postFeedbackApi(feedbackText);
      this.handleEditClose();
    }
  };

  postFeedback = () => {
    let feedbackText = document.getElementById('post-feedback').value;
    if (!feedbackText) {
      this.setState({ errorText: 'Feedback cannot be empty' });
    } else {
      this.postFeedbackApi(feedbackText);
      this.handleEditClose();
    }
  };

  deleteFeedback = () => {
    this.deleteFeedbackApi();
    this.handleDeleteClose();
  };

  formatDate = timestamp => {
    timestamp = timestamp.split(' ').slice(1, 4);
    timestamp[1] = `${timestamp[1]},`;
    return timestamp.join(' ');
  };

  openAuthorSkills = () => {
    if (this.author) {
      this.author.loadSkillCards(this.state.author);
      this.setState({ showAuthorSkills: true });
    }
  };

  closeAuthorSkills = () => {
    this.setState({ showAuthorSkills: false });
  };

  render() {
    const styles = {
      home: {
        marginTop: '50px',
        width: '100%',
        fontSize: '14px',
      },
    };
    const editActions = [
      <FlatButton
        key={0}
        label="Cancel"
        labelStyle={{ color: '#4285f4' }}
        onClick={this.handleEditClose}
      />,
      <FlatButton
        key={1}
        label="Edit"
        primary={true}
        keyboardFocused={true}
        labelStyle={{ color: '#4285f4' }}
        onClick={this.editFeedback}
      />,
    ];

    const deleteActions = [
      <FlatButton
        key={1}
        label="Yes"
        primary={true}
        keyboardFocused={true}
        labelStyle={{ color: '#4285f4' }}
        onClick={this.deleteFeedback}
      />,
      <FlatButton
        key={0}
        label="No"
        labelStyle={{ color: '#4285f4' }}
        onClick={this.handleDeleteClose}
      />,
    ];

    let userFeedback = null;
    let userFeedbackCard = null;
    let emailId = cookies.get('emailId');
    let loggedIn = cookies.get('loggedIn');
    let feedbackCards;
    if (this.state.skill_feedback != null) {
      feedbackCards = this.state.skill_feedback.map((data, index) => {
        if (loggedIn && emailId && data.email === emailId) {
          userFeedback = data.feedback;
          userFeedbackCard = (
            <div key={index}>
              <ListItem
                key={index}
                leftAvatar={
                  <CircleImage name={data.email.toUpperCase()} size="40" />
                }
                primaryText={
                  <div>
                    <div>{data.email}</div>
                    <div className="feedback-timestamp">
                      {this.formatDate(parseDate(data.timestamp))}
                    </div>
                  </div>
                }
                rightIconButton={
                  <IconMenu iconButtonElement={iconButtonElement}>
                    <MenuItem
                      onClick={this.handleEditOpen}
                      leftIcon={<EditBtn />}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleDeleteOpen}
                      leftIcon={<Delete />}
                    >
                      Delete
                    </MenuItem>
                  </IconMenu>
                }
                secondaryText={<p>{data.feedback}</p>}
              />
              <Divider inset={true} />
            </div>
          );
          return null;
        }
        // eslint-disable-next-line
        else {
          return (
            <ListItem
              key={index}
              leftAvatar={
                <CircleImage name={data.email.toUpperCase()} size="40" />
              }
              primaryText={
                <div>
                  <div>{data.email}</div>
                  <div className="feedback-timestamp">
                    {this.formatDate(parseDate(data.timestamp))}
                  </div>
                </div>
              }
              secondaryText={<p>{data.feedback}</p>}
            />
          );
        }
      });
    }

    let renderElement = null;

    if (this.state.dataReceived) {
      renderElement = (
        <div>
          <StaticAppBar {...this.props} />
          <div className="skill_listing_container" style={styles.home}>
            <Paper className="margin-b-md margin-t-md">
              <p style={{ marginLeft: 10 }}>
                <Link
                  to={`/${this.groupValue}/${this.name}/${this.languageValue}`}
                  style={{ color: '#000000' }}
                >
                  {this.state.skill_name}
                </Link>
                <NavigationChevronRight style={{ paddingTop: 10 }} />
                Feedback
              </p>
              <div className="feedback-skill-detail">
                <div className="feedback-avatar">
                  <Link
                    to={`/${this.groupValue}/${this.name}/${
                      this.languageValue
                    }`}
                  >
                    {this.state.image == null ? (
                      <CircleImage
                        name={this.state.skill_name.toUpperCase()}
                        size="60"
                      />
                    ) : (
                      <img
                        className="feedback-avatar-img"
                        alt="Thumbnail"
                        src={this.state.imgUrl}
                      />
                    )}
                  </Link>
                </div>
                <div className="feedback-skill-name-author">
                  <h1 className="feedback-name">
                    <Link
                      to={`/${this.groupValue}/${this.name}/${
                        this.languageValue
                      }`}
                    >
                      {this.name &&
                        this.name
                          .split(' ')
                          .map(data => {
                            var s =
                              data.charAt(0).toUpperCase() + data.substring(1);
                            return s;
                          })
                          .join(' ')}
                    </Link>
                  </h1>
                  <div>
                    by{' '}
                    <span
                      className="feedback-author"
                      onClick={this.openAuthorSkills}
                    >
                      {this.state.author}
                    </span>
                  </div>
                </div>
              </div>
              <h1 className="title">Feedback</h1>
              {loggedIn && !userFeedbackCard ? (
                <div>
                  <div className="subTitle">
                    {`Write your invaluable feedback with
                    ${this.state.skill_name} on SUSI.AI`}
                  </div>
                  <div>
                    <div className="feedback-textbox">
                      <TextField
                        id="post-feedback"
                        hintText="Skill Feedback"
                        defaultValue=""
                        errorText={this.state.errorText}
                        multiLine={true}
                        fullWidth={true}
                      />
                      <RaisedButton
                        label="Post"
                        labelStyle={{ color: 'white' }}
                        backgroundColor={'#4285f4'}
                        style={{ margin: 10 }}
                        onClick={this.postFeedback}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
              {feedbackCards &&
                (feedbackCards.length > 0 ? (
                  <List style={{ padding: '8px 0px 0px 0px' }}>
                    {userFeedbackCard}
                    {feedbackCards}
                  </List>
                ) : (
                  <div className="feedback-default-message">
                    No feedback present for this skill!
                  </div>
                ))}
              <Dialog
                title="Edit Feedback"
                actions={editActions}
                modal={false}
                open={this.state.openEditDialog}
                onRequestClose={this.handleEditClose}
              >
                <TextField
                  id="edit-feedback"
                  hintText="Skill Feedback"
                  defaultValue={userFeedback}
                  errorText={this.state.errorText}
                  multiLine={true}
                  fullWidth={true}
                />
              </Dialog>
              <Dialog
                title="Delete Feedback"
                actions={deleteActions}
                modal={true}
                open={this.state.openDeleteDialog}
                onRequestClose={this.handleEditClose}
              >
                Are you sure, you want to delete your feedback ?
              </Dialog>
            </Paper>
          </div>
          <Footer />
        </div>
      );
    } else {
      renderElement = (
        <div>
          <StaticAppBar {...this.props} />
          <h1 className="skill_loading_container">
            <div className="center">
              <CircularProgress size={62} color="#4285f5" />
              <h4>Loading</h4>
            </div>
          </h1>
        </div>
      );
    }

    return (
      <div>
        {renderElement}
        <div>
          <AuthorSkills
            ref={c => {
              this.author = c;
            }}
            open={this.state.showAuthorSkills}
            close={this.closeAuthorSkills}
            author={this.state.author}
            authorUrl={this.state.author_url}
          />
        </div>
      </div>
    );
  }
}

SkillFeedbackPage.propTypes = {
  location: PropTypes.object,
};

export default SkillFeedbackPage;
