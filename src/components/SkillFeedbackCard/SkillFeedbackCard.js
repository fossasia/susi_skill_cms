// Packages
import React, { Component } from 'react';
import { Paper } from 'material-ui';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';

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

// Icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Delete from 'material-ui/svg-icons/action/delete';
import EditBtn from 'material-ui/svg-icons/editor/mode-edit';

// CSS
import './SkillFeedbackCard.css';

import { parseDate } from '../../Utils/helperFunctions';

const cookies = new Cookies();

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
      show_all_feedback: false,
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

  toggleShowAll = () => {
    this.setState({
      show_all_feedback: !this.state.show_all_feedback,
    });
  };

  editFeedback = () => {
    let feedbackText = document.getElementById('edit-feedback').value;
    if (!feedbackText) {
      this.setState({ errorText: 'Feedback cannot be empty' });
    } else {
      this.props.postFeedback(feedbackText);
      this.handleEditClose();
    }
  };

  postFeedback = () => {
    let feedbackText = document.getElementById('post-feedback').value;
    if (!feedbackText) {
      this.setState({ errorText: 'Feedback cannot be empty' });
    } else {
      this.props.postFeedback(feedbackText);
      this.handleEditClose();
    }
  };

  deleteFeedback = () => {
    this.props.deleteFeedback();
    this.handleDeleteClose();
  };

  formatDate = timestamp => {
    timestamp = timestamp.split(' ').slice(1, 4);
    timestamp[1] = `${timestamp[1]},`;
    return timestamp.join(' ');
  };

  render() {
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
    if (this.props.skill_feedback) {
      feedbackCards = this.props.skill_feedback.map((data, index) => {
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

    if (!this.state.show_all_feedback && feedbackCards) {
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
        {loggedIn && !userFeedbackCard ? (
          <div>
            <div className="subTitle">
              {' '}
              Write your invaluable feedback with {this.props.skill_name} on
              SUSI.AI{' '}
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
                  primary={true}
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
            <List>
              {userFeedbackCard}
              {feedbackCards}
              {(userFeedbackCard && this.props.skill_feedback.length >= 4) ||
              this.props.skill_feedback.length >= 5 ? (
                <ListItem
                  className="display-all"
                  primaryText={`Show ${
                    this.state.show_all_feedback ? 'less' : 'all'
                  } reviews`}
                  onClick={this.toggleShowAll}
                />
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
    );
  }
}

SkillFeedbackCard.propTypes = {
  skill_name: PropTypes.string,
  skill_feedback: PropTypes.array,
  postFeedback: PropTypes.func,
  deleteFeedback: PropTypes.func,
};

export default SkillFeedbackCard;
