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

  parseDate = dtstr => {
    if (dtstr) {
      // replace anything but numbers by spaces
      dtstr = dtstr.replace(/\D/g, ' ');
      // trim any hanging white space
      dtstr = dtstr.replace(/\s+$/, '');
      // split on space
      var dtcomps = dtstr.split(' ');
      // not all ISO 8601 dates can convert, as is
      // unless month and date specified, invalid
      if (dtcomps.length < 3) {
        return 'Invalid date';
      }
      // if time not provided, set to zero
      if (dtcomps.length < 4) {
        dtcomps[3] = 0;
        dtcomps[4] = 0;
        dtcomps[5] = 0;
      }
      // modify month between 1 based ISO 8601 and zero based Date
      dtcomps[1]--;
      const convdt = new Date(
        Date.UTC(
          dtcomps[0],
          dtcomps[1],
          dtcomps[2],
          dtcomps[3],
          dtcomps[4],
          dtcomps[5],
        ),
      );
      return convdt.toUTCString();
    }
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
    let feedbackCards = this.props.skill_feedback.map((data, index) => {
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
                    {this.parseDate(data.timestamp)}
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
                  {this.parseDate(data.timestamp)}
                </div>
              </div>
            }
            secondaryText={<p>{data.feedback}</p>}
          />
        );
      }
    });

    return (
      <Paper className="margin-b-md margin-t-md">
        <h1 className="title">Feedback</h1>
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
        {feedbackCards.length > 0 ? (
          <List>
            {userFeedbackCard}
            {feedbackCards}
          </List>
        ) : (
          <div className="feedback-default-message">
            No feedback present for this skill!
          </div>
        )}
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
