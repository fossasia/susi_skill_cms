import React, { Component } from 'react';
import $ from 'jquery';
import urls from '../../../utils/urls';
import PropTypes from 'prop-types';
import './Chatbot.css';
import './Preview.css';

const host = window.location.protocol + '//' + window.location.host;
class Preview extends Component {
  constructor() {
    super();
    this.msgNumber = 0;
    this.state = {
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
      this.setState(
        {
          botbuilderBackgroundBody: this.props.designData
            .botbuilderBackgroundBody
            ? this.props.designData.botbuilderBackgroundBody
            : '#ffffff',
          botbuilderBodyBackgroundImg: this.props.designData
            .botbuilderBodyBackgroundImg
            ? this.replaceAll(
                this.props.designData.botbuilderBodyBackgroundImg,
                ' ',
                '%20',
              )
            : '',
          botbuilderUserMessageBackground: this.props.designData
            .botbuilderUserMessageBackground
            ? this.props.designData.botbuilderUserMessageBackground
            : '#0077e5',
          botbuilderUserMessageTextColor: this.props.designData
            .botbuilderUserMessageTextColor
            ? this.props.designData.botbuilderUserMessageTextColor
            : '#ffffff',
          botbuilderBotMessageBackground: this.props.designData
            .botbuilderBotMessageBackground
            ? this.props.designData.botbuilderBotMessageBackground
            : '#f8f8f8',
          botbuilderBotMessageTextColor: this.props.designData
            .botbuilderBotMessageTextColor
            ? this.props.designData.botbuilderBotMessageTextColor
            : '#455a64',
          botbuilderIconColor: this.props.designData.botbuilderIconColor
            ? this.props.designData.botbuilderIconColor
            : '#000000',
          botbuilderIconImg:
            this.props.designData.botbuilderIconImg.length > 0
              ? this.replaceAll(
                  this.props.designData.botbuilderIconImg,
                  ' ',
                  '%20',
                )
              : host + '/customAvatars/0.png',
        },
        () => this.applyTheme(),
      );
    }
  }
  componentDidMount() {
    $('#susi-launcher').click(function() {
      let $el = $('.susi-frame-container-active');
      if ($el.css('display') === 'none') {
        $el.toggle();
        $('#susi-avatar-text').toggle();
        $('#susi-launcher-close').toggle();
      } else {
        $el.fadeToggle();
        $('#susi-avatar-text').fadeToggle();
        $('#susi-launcher-close').fadeToggle();
      }

      document.getElementById('susiTextMessage').focus();
    });

    $('#susi-launcher-close').click(function() {
      $('.susi-frame-container-active').fadeToggle();
      $('#susi-avatar-text').fadeToggle();
      $('#susi-launcher-close').fadeToggle();
    });
    // on input/text enter
    $('#susiTextMessage').on(
      'keyup keypress',
      function(e) {
        const keyCode = e.keyCode || e.which;
        const text = $('#susiTextMessage').val();
        if (keyCode === 13) {
          if (text === '' || $.trim(text) === '') {
            e.preventDefault();
            return false;
          }
          this.setUserResponse(text);
          this.send(text);
          e.preventDefault();
          return false;
        }
      }.bind(this),
    );
    $('.susi-send-button').click(
      function() {
        const text = $('#susiTextMessage').val();
        if (text !== '') {
          $('#chat-input').blur();
          this.setUserResponse(text);
          this.send(text);
        }
      }.bind(this),
    );
  }
  escapeRegExp = str => {
    return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
  };

  replaceAll = (str, find, replace) => {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  };

  // to apply custom theme
  applyTheme = () => {
    // user message container
    $('.susi-comment-by-user .susi-comment-body-container').css(
      'background-color',
      this.state.botbuilderUserMessageBackground,
    );
    $('head').append(
      $(
        `<style>.susi-comment-body-container-user:after {
          border-color: transparent transparent ${
            this.state.botbuilderUserMessageBackground
          } ${this.state.botbuilderUserMessageBackground} !important}</style>`,
      ),
    );
    $('.susi-comment-by-user .susi-comment-body-container').css(
      'color',
      this.state.botbuilderUserMessageTextColor,
    );
    // bot message container
    $('.susi-comment-by-susi .susi-comment-body-container').css(
      'background-color',
      this.state.botbuilderBotMessageBackground,
    );
    $('.susi-comment-by-susi .susi-comment-body-container').css(
      'color',
      this.state.botbuilderBotMessageTextColor,
    );
    $('.susi-comment-avatar').css(
      'background-image',
      "url('" + this.state.botbuilderIconImg + "')",
    );
  };

  // Send request to SUSI API
  send = text => {
    let url = urls.API_URL + '/susi/chat.json?q=' + encodeURIComponent(text);
    url += '&instant=' + encodeURIComponent(this.props.skill);
    if (this.props.botBuilder) {
      const enableDefaultSkillsMatch = this.props.configCode.match(
        /^::enable_default_skills\s(.*)$/m,
      );
      if (enableDefaultSkillsMatch && enableDefaultSkillsMatch[1] === 'no') {
        url += '&excludeDefaultSkills=true';
      }
    }
    const thisMsgNumber = this.msgNumber;
    this.msgNumber++;
    this.setLoadingMessage(thisMsgNumber);
    $.ajax({
      type: 'GET',
      url: url,
      contentType: 'application/json',
      dataType: 'json',
      success: function(data) {
        this.main(data, thisMsgNumber);
      }.bind(this),
      error: function(e) {
        console.log(e);
        this.main(null, thisMsgNumber);
      }.bind(this),
    });
  };

  // Main function
  main = (data, msgNumber) => {
    let ans;
    if (data && data.answers[0]) {
      ans = data.answers[0].actions[0].expression;
    } else {
      ans = 'Sorry, I could not understand what you just said.';
    }

    this.setBotResponse(ans, msgNumber);
  };

  setLoadingMessage = msgNumber => {
    const BotResponse =
      '<div id="susiMsg-' +
      msgNumber +
      '" class="susi-conversation-part susi-conversation-part-grouped-first">' +
      '<div style="background-image: url(' +
      this.state.botbuilderIconImg +
      ')" class="susi-comment-avatar susi-theme-bg">' +
      '</div>' +
      '<div class="susi-comment susi-comment-by-susi">' +
      '<div class="susi-comment-body-container susi-comment-body-container-susi" style="background-color:' +
      this.state.botbuilderBotMessageBackground +
      ';color:' +
      this.state.botbuilderBotMessageTextColor +
      '">' +
      '<div class="susi-comment-body ">' +
      '<div class="susi-comment-content">' +
      '<div class="susi-question-label">' +
      '<div class="susi-msg-content-div"> <img src="' +
      host +
      '/loading.gif" style="height:13px;" /></div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
    $(BotResponse).appendTo('.susi-conversation-parts');
    this.scrollToBottomOfResults();
  };

  // Set bot response
  setBotResponse = (val, msgNumber) => {
    $('#susiMsg-' + msgNumber + ' .susi-msg-content-div').text(val);
    this.scrollToBottomOfResults();
  };

  // Set user response
  setUserResponse = val => {
    const UserResponse =
      '<div class="susi-conversation-part susi-conversation-part-grouped-first">' +
      '<div class=" susi-comment susi-comment-by-user ">' +
      '<div class="susi-comment-body-container susi-comment-body-container-user" style="background-color:' +
      this.state.botbuilderUserMessageBackground +
      ';color:' +
      this.state.botbuilderUserMessageTextColor +
      '">' +
      '<div class="susi-comment-body ">' +
      '<div class="susi-comment-content">' +
      val +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
    $(UserResponse).appendTo('.susi-conversation-parts');
    this.scrollToBottomOfResults();
    $('#susiTextMessage').val('');
  };

  // Scroll to the bottom
  scrollToBottomOfResults = () => {
    let textsDiv = document.querySelector('.susi-sheet-content');
    textsDiv.scrollTop = textsDiv.scrollHeight;
  };

  render() {
    const styles = {
      body: {
        backgroundColor: this.state.botbuilderBackgroundBody,
        backgroundImage: `url(${this.state.botbuilderBodyBackgroundImg})`,
      },
      launcher: {},
      botIcon: {
        backgroundColor: this.state.botbuilderIconColor,
        backgroundImage: `url(${this.state.botbuilderIconImg})`,
      },
    };
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
                                <img src={host + '/send.png'} alt="send" />
                              </pre>
                              <textarea
                                id="susiTextMessage"
                                placeholder="Enter your response"
                                rows="1"
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
              <div id="susi-launcher-close" title="Close" />
            ) : null}
          </div>
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
