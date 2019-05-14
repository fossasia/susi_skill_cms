import React, { Component } from 'react';
import { Paper } from 'material-ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uiActions from '../../../redux/actions/ui';
import PropTypes from 'prop-types';
import Person from 'material-ui/svg-icons/social/person';
import CircularProgress from 'material-ui/CircularProgress';
import './ConversationView.css';
import { fetchConversationResponse } from '../../../api/index';

class ConversationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.skillCode,
      userInputs: [],
      conversationsData: [],
      loaded: false,
    };
  }

  componentDidMount = () => {
    this.fetchUserInputs();
  };

  fetchUserInputs = () => {
    let code = this.state.code;
    let userInputs = [];
    let userQueries = [];
    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (
        line &&
        !line.startsWith('::') &&
        !line.startsWith('!') &&
        !line.startsWith('#') &&
        !line.startsWith('{') &&
        !line.startsWith('}') &&
        !line.startsWith('"')
      ) {
        let user_query = line;
        while (true) {
          i++;
          if (i >= lines.length) {
            break;
          }
          line = lines[i];
          if (
            line &&
            !line.startsWith('::') &&
            !line.startsWith('!') &&
            !line.startsWith('#')
          ) {
            break;
          }
        }
        userQueries.push(user_query);
      }
    }
    for (let i = 0; i < userQueries.length; i++) {
      let queries = userQueries[i];
      let queryArray = queries.trim().split('|');
      for (let j = 0; j < queryArray.length; j++) {
        userInputs.push(queryArray[j]);
      }
    }
    this.setState({ userInputs }, () => this.getResponses(0));
  };

  getResponses = responseNumber => {
    const { actions } = this.props;
    let userInputs = this.state.userInputs;
    let userQuery = userInputs[responseNumber];
    let conversationsData = this.state.conversationsData;
    if (userQuery) {
      conversationsData.push({
        type: 'user',
        name: userQuery,
        id: 'u' + responseNumber,
      });
      const query = encodeURIComponent(userQuery);
      const instant = encodeURIComponent(this.state.code);
      fetchConversationResponse({ query, instant })
        .then(payload => {
          let answer;
          if (payload.answers[0]) {
            answer = payload.answers[0].actions[0].expression;
          } else {
            answer = 'Sorry, I could not understand what you just said.';
          }
          conversationsData.push({
            type: 'bot',
            name: answer,
            id: 'b' + responseNumber,
          });
          this.setState(
            prevState => ({
              loaded:
                responseNumber + 1 === userInputs.length
                  ? true
                  : prevState.loaded,
              conversationsData,
            }),
            () => this.getResponses(++responseNumber),
          );
        })
        .catch(error => {
          actions.openSnackBar({
            snackBarMessage:
              'Unable to load conversation view. Please try again.',
            snackBarDuration: 2000,
          });
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
  actions: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(uiActions, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(ConversationView);
