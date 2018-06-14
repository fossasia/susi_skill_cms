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
import EditBtn from 'material-ui/svg-icons/editor/mode-edit';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

// CSS
import './SkillFeedbackCard.css';

const cookies = new Cookies();

class SkillFeedbackCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openDialog: false,
      errorText: '',
    };
  }

  handleOpen = () => {
    this.setState({ openDialog: true });
  };

  handleClose = () => {
    this.setState({
      openDialog: false,
      errorText: '',
    });
  };

  editFeedback = () => {
    let feedbackText = document.getElementById('edit-feedback').value;
    if (!feedbackText) {
      this.setState({ errorText: 'Feedback cannot be empty' });
    } else {
      this.props.postFeedback(feedbackText);
      this.handleClose();
    }
  };

  postFeedback = () => {
    let feedbackText = document.getElementById('post-feedback').value;
    if (!feedbackText) {
      this.setState({ errorText: 'Feedback cannot be empty' });
    } else {
      this.props.postFeedback(feedbackText);
      this.handleClose();
    }
  };

  render() {
    const actions = [
      <FlatButton
        key={0}
        label="Cancel"
        labelStyle={{ color: '#4285f4' }}
        onClick={this.handleClose}
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
              primaryText={data.email}
              rightIconButton={
                <IconButton touch={true} onClick={this.handleOpen}>
                  <EditBtn />
                </IconButton>
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
            primaryText={data.email}
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
          actions={actions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleClose}
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
      </Paper>
    );
  }
}

SkillFeedbackCard.propTypes = {
  skill_name: PropTypes.string,
  skill_feedback: PropTypes.array,
  postFeedback: PropTypes.func,
};

export default SkillFeedbackCard;
