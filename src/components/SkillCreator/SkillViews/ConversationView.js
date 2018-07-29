import React, { Component } from 'react';
import colors from '../../../Utils/colors';
import { Paper } from 'material-ui';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Person from 'material-ui/svg-icons/social/person';
import Delete from 'material-ui/svg-icons/action/delete';
import './ConversationView.css';

class ConversationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      textType: 'user',
      textBoxValue: '',
      openSnackbar: false,
      msgSnackbar: '',
    };
  }

  handleChange = event => {
    this.setState({
      value: event.target.value,
      textBoxValue: event.target.value,
    });
  };

  handleSubmit = event => {
    if (this.state.value !== '') {
      if (this.state.textType === 'bot') {
        this.setState({ textType: 'user' });
      } else if (this.state.textType === 'user') {
        this.setState({ textType: 'bot' });
      }
      this.setState({ textBoxValue: '', value: '' });
      event.preventDefault();
    }
  };

  handleDeleteNode = node => {
    this.props.handleDeleteNode(node);
  };

  render() {
    let skillData = this.props.skillData;
    let conversationsData = [];
    if (skillData) {
      for (let i of skillData.children) {
        conversationsData.push({
          type: 'user',
          name: i.name,
          id: i.id,
        });

        if (i.children) {
          for (let j of i.children) {
            conversationsData.push({
              type: 'bot',
              name: j.name,
              id: j.id,
            });
          }
        }
      }
    }
    return (
      <div
        style={{
          padding: this.props.botbuilder ? '10px 10px 20px 10px' : '30px',
        }}
      >
        <Paper id="message-container" style={styles.paperStyle} zDepth={1}>
          {conversationsData.map(item => {
            let text = item.name;
            let messageArr = text.match(/.{1,28}/g);
            let message = [];
            if (messageArr && messageArr.length > 0) {
              for (let i = 0; i < messageArr.length; i++) {
                message.push(<div>{messageArr[i]}</div>);
              }
            }
            if (item.type === 'user') {
              return (
                <div
                  key={item.id}
                  style={{ display: 'flex', flexDirection: 'row' }}
                >
                  <Delete
                    style={styles.deleteUser}
                    onClick={() => this.handleDeleteNode(item)}
                  />
                  <div className="user-text-box">{message}</div>
                  <Person style={{ height: '40px' }} />
                </div>
              );
            }
            return (
              <div
                key={item.id}
                style={{ display: 'flex', flexDirection: 'row' }}
              >
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIISURBVFhH7di/S5VRHMfxa0RG0A+kKCGkIkhHazEKatAGB0EhCIeQhgajbBBqqSmJgiASKxpqkNZwcBBdRHELyoZESpD8A5QITNT0/TG/8CXO/eG9Hp8LPR94Dc+X5+F8eTj3nPPczP+U43iHGxtXZZinWMMyKlUot7yEGpSDKpRDDuAORvAL1uAUXuEcEksH5mFNZfMBR7FjqcALhJrJ5gfOYEfyAKEm8lGTVYgazakVhBooxHtEzQBssFk046GreZNoQq+rraIOUXII/u31wPITVje3oOyHrz9ClLTAD/Qdl9Dtat5HnMcTV5MJREkn/EDFmkOU3EdoQHmDWpzapLm5gNC9qkdJA+5lEVo+WhG69y7SlEVOQyeUL5iJ4BuGcB27sKVcxW+EJnkMw9iHgnIWS7CHtWNk+0WWYhqL7rofBUXHI3uoCzq9jLvadrmIk1Cjuv4DLVV5YwdPv+LHalDxO9RtFXLF75uvVdhMzAZPwGp+fw9G3xJ2s37BlpgN1sBqj1XIlbRBp6gG98DWPz8fYjaol6KDrGraq/OmDc9xeOPqb8bw7wClugBLO56h6O/pPoQGKZY2Av8CSs4xfEZosK1Sczex7dmNejSW4DKOII1lL+yYH6KpkWi0VITmmRlEotH/LaHGjP7QTDQ6CX9CqDm5gsRTjbf4CjvOj+Ia0qTJnUxmHfGs+A6k/UOLAAAAAElFTkSuQmCC"
                  alt="bot icon"
                  style={styles.botIcon}
                />
                <div className="bot-text-box">{message}</div>
                <Delete
                  style={styles.deleteBot}
                  onClick={() => this.handleDeleteNode(item)}
                />
              </div>
            );
          })}
        </Paper>
        <form onSubmit={this.handleSubmit} style={{ marginTop: '15px' }}>
          <label>
            {this.state.textType === 'user' ? (
              <div style={{ fontSize: '14px' }}>Type the user message:</div>
            ) : (
              <div style={{ fontSize: '14px' }}>Type the bot response:</div>
            )}
            <input
              id="text-box"
              type="text"
              placeholder={
                this.state.textType === 'user'
                  ? 'Enter the user message'
                  : 'Enter the bot response'
              }
              value={this.state.textBoxValue}
              onChange={this.handleChange}
              style={styles.textBox}
            />
          </label>
          <RaisedButton
            label="Submit"
            backgroundColor={colors.header}
            labelColor="#fff"
            onTouchTap={this.handleSubmit}
            style={{ marginTop: 10 }}
          />
        </form>
        <Snackbar
          open={this.state.openSnackbar}
          message={this.state.msgSnackbar}
          autoHideDuration={2000}
          onRequestClose={() => {
            this.setState({ openSnackbar: false });
          }}
        />
      </div>
    );
  }
}

const styles = {
  textBox: {
    width: '100%',
    fontSize: '14px',
    padding: '12px 20px',
    margin: '8px 0',
    display: 'inline-block',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  paperStyle: {
    width: '100%',
    padding: '20px 20px 20px 20px',
  },
  submitButton: {
    width: '40px',
    backgroundColor: 'rgb(66, 133, 244)',
    color: 'white',
    padding: '14px 20px',
    margin: '8px 0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  botIcon: {
    height: '33px',
    paddingTop: '9px',
    width: '21px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  deleteUser: {
    height: '33px',
    marginLeft: 'auto',
    paddingTop: '10px',
    paddingRight: '10px',
    width: '32px',
    cursor: 'pointer',
  },
  deleteBot: {
    height: '31px',
    marginRight: 'auto',
    paddingTop: '8px',
    paddingLeft: '10px',
    width: '32px',
    cursor: 'pointer',
  },
};
ConversationView.propTypes = {
  skillData: PropTypes.object,
  handleDeleteNode: PropTypes.func,
  botbuilder: PropTypes.bool,
};
export default ConversationView;
