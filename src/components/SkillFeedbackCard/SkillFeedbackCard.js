// Packages
import React, { Component } from 'react';
import { Paper } from 'material-ui';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import skillActions from '../../redux/actions/skill';
// Components
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
import Emoji from 'react-emoji-render';

// Icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Delete from 'material-ui/svg-icons/action/delete';
import EditBtn from 'material-ui/svg-icons/editor/mode-edit';

// CSS
import './SkillFeedbackCard.css';

import { parseDate, formatDate } from '../../utils';

const iconButtonElement = (
  <IconButton touch={true} tooltip="More" tooltipPosition="bottom-left">
    <MoreVertIcon />
  </IconButton>
);

class SkillFeedbackCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openEditDialog: false,
      openDeleteDialog: false,
      errorText: '',
    };
  }

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
    this.setState({ feedbackValue: feedbackText });
  };

  setFeedback = event => {
    this.setState({ feedbackValue: event.target.value });
  };

  postFeedback = () => {
    const { group, language, skillTag: skill, actions } = this.props;
    const { feedbackValue } = this.state;
    const skillData = {
      model: 'general',
      group,
      language,
      skill,
      feedback: feedbackValue,
    };
    if (feedbackValue.trim()) {
      actions
        .setSkillFeedback(skillData)
        .then(payload => {
          actions.getSkillFeedbacks(skillData);
        })
        .catch(error => {
          console.log(error);
        });
      this.handleEditClose();
    } else {
      this.setState({ errorText: 'Feedback cannot be empty' });
    }
  };

  deleteFeedback = () => {
    const { group, language, skillTag: skill, actions } = this.props;
    const skillData = {
      model: 'general',
      group,
      language,
      skill,
    };
    actions
      .deleteSkillFeedback(skillData)
      .then(payload => actions.getSkillFeedbacks(skillData))
      .catch(error => console.log(error));
    this.handleDeleteClose();
  };

  render() {
    const {
      skillFeedbacks,
      skillTag,
      language,
      email,
      accessToken,
    } = this.props;
    const { errorText, openEditDialog, openDeleteDialog } = this.state;
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
        onClick={this.postFeedback}
      />,
    ];

    const deleteActions = [
      <FlatButton
        key={0}
        label="Cancel"
        primary={true}
        style={{ marginRight: '10px' }}
        onClick={this.handleDeleteClose}
      />,
      <FlatButton
        key={1}
        label="Delete"
        primary={true}
        keyboardFocused={true}
        labelStyle={{ color: '#fff' }}
        backgroundColor={'#ff0000'}
        hoverColor={'rgba(255,0,0,0.7)'}
        onClick={this.deleteFeedback}
      />,
    ];

    let userFeedback = null;
    let userName = '';
    let userAvatarLink = '';
    let userEmail = '';
    let userFeedbackCard = null;
    let feedbackCards;
    if (skillFeedbacks) {
      feedbackCards = skillFeedbacks.map((data, index) => {
        userEmail = data.email;
        userFeedback = data.feedback;
        userAvatarLink = data.avatar;
        userName = data.userName;
        const avatarProps = {
          src: userAvatarLink,
          name: userName === '' ? userEmail : userName,
        };
        if (accessToken && email && userEmail === email) {
          userFeedbackCard = (
            <div key={index}>
              <ListItem
                key={index}
                leftAvatar={<CircleImage {...avatarProps} size="40" />}
                primaryText={
                  <div>
                    <div>{userName === '' ? userEmail : userName}</div>
                    <div className="feedback-timestamp">
                      {formatDate(parseDate(data.timestamp))}
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
                secondaryText={<Emoji text={data.feedback} />}
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
              leftAvatar={<CircleImage {...avatarProps} size="40" />}
              primaryText={
                <div>
                  <div>
                    {userName !== ''
                      ? userName
                      : `${userEmail.slice(0, userEmail.indexOf('@') + 1)}...`}
                  </div>
                  <div className="feedback-timestamp">
                    {formatDate(parseDate(data.timestamp))}
                  </div>
                </div>
              }
              secondaryText={<Emoji text={data.feedback} />}
            />
          );
        }
      });
    }

    if (feedbackCards) {
      if (userFeedbackCard) {
        feedbackCards.splice(4);
      } else {
        feedbackCards.splice(5);
      }
    }

    return (
      <Paper className="margin-b-md margin-t-md">
        <div className="top-section">
          <h1 className="title">Feedback</h1>
        </div>
        {accessToken && !userFeedbackCard ? (
          <div>
            <div className="subTitle">
              {' '}
              Write your invaluable feedback with {skillTag} on SUSI.AI{' '}
            </div>
            <div>
              <div className="feedback-textbox">
                <TextField
                  id="post-feedback"
                  hintText="Skill Feedback"
                  defaultValue=""
                  errorText={errorText}
                  multiLine={true}
                  fullWidth={true}
                  onChange={this.setFeedback}
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
              {(userFeedbackCard && skillFeedbacks.length >= 4) ||
              skillFeedbacks.length >= 5 ? (
                <Link to={`${language}/feedbacks`}>
                  <ListItem
                    className="display-all"
                    primaryText={'Show all reviews'}
                  />
                </Link>
              ) : null}
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
          open={openEditDialog}
          onRequestClose={this.handleEditClose}
        >
          <TextField
            id="edit-feedback"
            hintText="Skill Feedback"
            defaultValue={userFeedback}
            errorText={errorText}
            multiLine={true}
            fullWidth={true}
            onChange={this.editFeedback}
          />
        </Dialog>
        <Dialog
          actions={deleteActions}
          modal={true}
          open={openDeleteDialog}
          onRequestClose={this.handleEditClose}
        >
          Are you sure, you want to delete your feedback?
        </Dialog>
      </Paper>
    );
  }
}

SkillFeedbackCard.propTypes = {
  skillTag: PropTypes.string,
  skillFeedbacks: PropTypes.array,
  language: PropTypes.string,
  group: PropTypes.string,
  feedback: PropTypes.string,
  actions: PropTypes.object,
  accessToken: PropTypes.string,
  email: PropTypes.string,
};

function mapStateToProps(store) {
  return {
    language: store.skill.metaData.language,
    group: store.skill.metaData.group,
    skillTag: store.skill.metaData.skillTag,
    feedback: store.skill.feedback,
    skillFeedbacks: store.skill.skillFeedbacks,
    email: store.app.email,
    accessToken: store.app.accessToken,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(skillActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SkillFeedbackCard);
