import React, { Component } from 'react';
import { Paper } from 'material-ui';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import Person from 'material-ui/svg-icons/social/person';
import CircularProgress from 'material-ui/CircularProgress';
import { urls } from '../../../utils';
import './ConversationView.css';
import $ from 'jquery';

class ConversationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackbar: false,
      msgSnackbar: '',
      code: this.props.skillCode,
      conversationsData: [],
      loaded: false,
    };
  }

  componentDidMount = () => {
    this.getResponses(0);
  };

  getResponses = responseNumber => {
    let skillData = this.props.skillData;
    let i = skillData.children[responseNumber];
    let conversationsData = this.state.conversationsData;
    if (i) {
      let url = urls.API_URL + '/susi/chat.json?q=';
      conversationsData.push({
        type: 'user',
        name: i.name,
        id: 'u' + responseNumber,
      });
      url += `${encodeURIComponent(i.name)}&instant=${encodeURIComponent(
        this.state.code,
      )}`;
      $.ajax({
        type: 'GET',
        url: url,
        contentType: 'application/json',
        dataType: 'json',
        success: function(data) {
          let answer;
          if (data.answers[0]) {
            answer = data.answers[0].actions[0].expression;
          } else {
            answer = 'Sorry, I could not understand what you just said.';
          }
          conversationsData.push({
            type: 'bot',
            name: answer,
            id: 'b' + responseNumber,
          });
          if (responseNumber + 1 === skillData.children.length) {
            this.setState({ loaded: true });
          }
          this.setState({ conversationsData }, () =>
            this.getResponses(++responseNumber),
          );
        }.bind(this),
        error: function(err) {
          console.log(err);
          this.setState({
            openSnackbar: true,
            msgSnackbar: 'Unable to load conversation view. Please try again.',
          });
        }.bind(this),
      });
    }
  };

  render() {
    let conversationsData = this.state.conversationsData;
    return (
      <div
        style={{
          paddingTop: '20px',
        }}
      >
        <Paper id="message-container" style={styles.paperStyle} zDepth={1}>
          {!this.state.loaded ? (
            <div className="center">
              <CircularProgress size={62} color="#4285f5" />
              <h4>Loading</h4>
            </div>
          ) : (
            conversationsData.map(item => {
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
                </div>
              );
            })
          )}
        </Paper>
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
  paperStyle: {
    width: '100%',
    padding: '20px 20px 20px 20px',
  },
  botIcon: {
    height: '33px',
    paddingTop: '9px',
    width: '21px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
};
ConversationView.propTypes = {
  skillCode: PropTypes.string,
  skillData: PropTypes.object,
};
export default ConversationView;
