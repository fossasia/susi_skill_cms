import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import urls from '../../../utils/urls';
import Send from 'material-ui/svg-icons/content/send';
import loadingGIF from '../../../images/loading.gif';
import './Chatbot.css';
import './Preview.css';

const host = window.location.protocol + '//' + window.location.host;
class Preview extends Component {
  constructor() {
    super();
    this.msgNumber = 1;
    this.state = {
      messages: [{ message: 'Hi, I am SUSI', author: 'SUSI', loading: false }],
      message: '',
      previewChat: true,
      botbuilderBackgroundBody: '#ffffff',
      botbuilderBodyBackgroundImg: '',
      botbuilderUserMessageBackground: '#0077e5',
      botbuilderUserMessageTextColor: '#ffffff',
      botbuilderBotMessageBackground: '#f8f8f8',
      botbuilderBotMessageTextColor: '#455a64',
      botbuilderIconColor: '#000000',
      botbuilderIconImg: host + '/customAvatars/0.png',
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.designData !== prevProps.designData) {
      const {
        botbuilderBackgroundBody,
        botbuilderBodyBackgroundImg,
        botbuilderUserMessageBackground,
        botbuilderUserMessageTextColor,
        botbuilderBotMessageBackground,
        botbuilderBotMessageTextColor,
        botbuilderIconColor,
        botbuilderIconImg,
      } = this.props.designData;
      this.setState({
        botbuilderBackgroundBody: botbuilderBackgroundBody
          ? botbuilderBackgroundBody
          : '#ffffff',
        botbuilderBodyBackgroundImg: botbuilderBodyBackgroundImg
          ? this.replaceAll(botbuilderBodyBackgroundImg, ' ', '%20')
          : '',
        botbuilderUserMessageBackground: botbuilderUserMessageBackground
          ? botbuilderUserMessageBackground
          : '#0077e5',
        botbuilderUserMessageTextColor: botbuilderUserMessageTextColor
          ? botbuilderUserMessageTextColor
          : '#ffffff',
        botbuilderBotMessageBackground: botbuilderBotMessageBackground
          ? botbuilderBotMessageBackground
          : '#f8f8f8',
        botbuilderBotMessageTextColor: botbuilderBotMessageTextColor
          ? botbuilderBotMessageTextColor
          : '#455a64',
        botbuilderIconColor: botbuilderIconColor
          ? botbuilderIconColor
          : '#000000',
        botbuilderIconImg:
          botbuilderIconImg.length > 0
            ? this.replaceAll(botbuilderIconImg, ' ', '%20')
            : host + '/customAvatars/0.png',
      });
    }
  }

  togglePreview = () => {
    this.setState(prevState => ({
      previewChat: !prevState.previewChat,
    }));
  };

  // Send request to SUSI API
  sendMessage = () => {
    if (this.state.message.trim().length > 0) {
      let url = `${urls.API_URL}/susi/chat.json?q=${encodeURIComponent(
        this.state.message,
      )}&instant=${encodeURIComponent(this.props.skill)}`;
      const enableDefaultSkillsMatch = this.props.configCode.match(
        /^::enable_default_skills\s(.*)$/m,
      );
      if (enableDefaultSkillsMatch && enableDefaultSkillsMatch[1] === 'no') {
        url += '&excludeDefaultSkills=true';
      }
      this.msgNumber++;
      this.addMessage(this.state.message, 'You');
      let self = this;
      $.ajax({
        type: 'GET',
        url: url,
        contentType: 'application/json',
        dataType: 'json',
        success: function(data) {
          debugger;
          let index;
          for (var i = 0; i < self.state.messages.length; i++) {
            if (self.state.messages[i].loading === true) {
              index = i;
              break;
            }
          }

          let message;
          if (data.answers[0]) {
            message = {
              message: data.answers[0].actions[0].expression,
              author: 'SUSI',
              loading: false,
            };
          } else {
            message = {
              message: 'Sorry, I could not understand what you just said.',
              author: 'SUSI',
              loading: false,
            };
          }
          self.setState(prevState => ({
            messages: [
              ...prevState.messages.slice(0, index),
              message,
              ...prevState.messages.slice(index + 1),
            ],
          }));
        },
        error: function(e) {
          console.log(e);
        },
      });
      this.setState({ message: '' });
    }
  };

  addMessage = (message, author, loading = false) => {
    const messageObj = { message, author, loading };
    const loadingObj = {
      message: (
        <img
          src={loadingGIF}
          style={{ height: '10px', width: 'auto' }}
          alt="please wait.."
        />
      ),
      author: 'SUSI',
      loading: true,
    };
    this.setState({
      messages: [...this.state.messages, messageObj, loadingObj],
    });
  };

  escapeRegExp = str => {
    return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
  };

  replaceAll = (str, find, replace) => {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  };

  // Scroll to the bottom
  scrollToBottomOfResults = () => {
    var textsDiv = document.querySelector('.susi-sheet-content');
    textsDiv.scrollTop = textsDiv.scrollHeight;
  };

  render() {
    console.log(this.state.messages, 'MESSAGES');
    const styles = {
      body: {
        backgroundColor: this.state.botbuilderBackgroundBody,
        backgroundImage: `url(${this.state.botbuilderBodyBackgroundImg})`,
      },
      botIcon: {
        backgroundColor: this.state.botbuilderIconColor,
        backgroundImage: `url(${this.state.botbuilderIconImg})`,
      },
    };
    let messages = null;
    if (this.state.messages.length) {
      messages = this.state.messages.map((message, index) => {
        if (message.author === 'You') {
          return (
            <div
              key={index}
              className="susi-conversation-part susi-conversation-part-grouped-first"
            >
              <div className="susi-comment susi-comment-by-user">
                <style
                  dangerouslySetInnerHTML={{
                    __html: [
                      '.susi-comment-body-container.susi-comment-body-container-user:after {',
                      `border-color: transparent transparent ${
                        this.state.botbuilderUserMessageBackground
                      } ${this.state.botbuilderUserMessageBackground}`,
                      '}',
                    ].join('\n'),
                  }}
                />
                <div
                  className="susi-comment-body-container susi-comment-body-container-user"
                  style={{
                    backgroundColor: this.state.botbuilderUserMessageBackground,
                    color: this.state.botbuilderUserMessageTextColor,
                  }}
                >
                  <div className="susi-comment-body ">
                    <div className="susi-comment-content">
                      {message.message}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div
            key={index}
            id="susiMsg"
            className="susi-conversation-part susi-conversation-part-grouped-first"
          >
            <div
              className="susi-comment-avatar susi-theme-bg"
              style={{
                backgroundImage: `url(${this.state.botbuilderIconImg})`,
              }}
            />
            <div className="susi-comment susi-comment-by-susi">
              <div
                className="susi-comment-body-container susi-comment-body-container-susi"
                style={{
                  backgroundColor: this.state.botbuilderBotMessageBackground,
                  color: this.state.botbuilderBotMessageTextColor,
                }}
              >
                <div className="susi-comment-body ">
                  <div className="susi-comment-content">{message.message}</div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return null;
    }
    return (
      <div className="preview-component" style={{ marginTop: '10px' }}>
        {this.props.botBuilder ? (
          <div style={{ textAlign: 'right' }}>
            <div
              id="susi-launcher-container"
              className=" susi-avatar-launcher susi-launcher-enabled"
            >
              <div
                id="susi-launcher"
                className="susi-launcher susi-launcher-active"
                style={styles.launcher}
              >
                <div
                  id="susi-launcher-button"
                  className="susi-launcher-button"
                  style={styles.botIcon}
                />
              </div>
            </div>
          </div>
        ) : null}
        <div>
          <div
            id="susi-frame-container"
            className="susi-frame-container-active"
          >
            <div id="susi-frame-wrap">
              <div id="susi">
                <div id="susi-container" className="susi-container susi-reset">
                  <div id="susi-chatbox" className="susi-chatbox">
                    <div
                      id="susi-conversation"
                      className="susi-conversation susi-sheet susi-sheet-active susi-active"
                    >
                      <div className="susi-sheet-content">
                        <div
                          className="susi-sheet-content-container"
                          style={styles.body}
                        >
                          <div className="susi-conversation-parts-container">
                            <div
                              id="susi-message"
                              className="susi-conversation-parts"
                            />
                          {messages}
                              </div>
                            </div>

                          </div>
                        </div>
                        <div className="susi-composer-container">
                          <div id="susi-composer" className="susi-composer ">
                            <div className="susi-composer-textarea-container">
                              <div
                                className="susi-composer-textarea"
                                id="chat-input"
                              >
                                <pre className="susi-send-button">
                                  <Send
                                    onClick={this.sendMessage}
                                    className="chat-input-send"
                                    style={{
                                      fill: '0180C1',
                                      width: '30',
                                      height: '30',
                                    }}
                                  />
                                </pre>
                                <textarea
                                  id="susiTextMessage"
                                  placeholder="Enter your response"
                                  rows="1"
                                  value={this.state.message}
                                  onChange={ev =>
                                    this.setState({ message: ev.target.value })
                                  }
                                  onKeyDown={event => {
                                    if (event.keyCode === 13) {
                                      this.sendMessage();
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {this.props.botBuilder ? (
                <div
                  id="susi-launcher-close"
                  title="Close"
                  onClick={this.togglePreview}
                />
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Preview.propTypes = {
  designData: PropTypes.object,
  skill: PropTypes.string,
  configCode: PropTypes.string,
  botBuilder: PropTypes.bool,
};
export default Preview;
