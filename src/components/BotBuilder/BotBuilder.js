import React from 'react';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';
import Add from 'material-ui/svg-icons/content/add';
import Delete from 'material-ui/svg-icons/action/delete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { FloatingActionButton, Paper } from 'material-ui';
import './BotBuilder.css';
import { urls, colors } from '../../utils';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uiActions from '../../redux/actions/ui';
import Cookies from 'universal-cookie';
import * as $ from 'jquery';

const cookies = new Cookies();
let BASE_URL = urls.API_URL;

const styles = {
  home: {
    margin: '0px 10px',
  },
  paperStyle: {
    width: '100%',
    marginTop: '20px',
    overflow: 'overlay',
  },
  loggedInError: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: '100px',
    fontSize: '50px',
    marginTop: '300px',
  },
  newBotBtn: {
    color: 'white',
    fontFamily: 'Helvetica',
    fontSize: '16px',
    paddingTop: '20px',
  },
  heading: {
    color: 'rgba(0,0,0,.65)',
    padding: '20px 0px 0px 20px',
  },
};

class BotBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatbots: [],
      drafts: [],
      deleteAlert: null,
    };
    this.getChatbots();
    this.getDrafts();
  }

  getChatbots = () => {
    const { actions } = this.props;
    if (cookies.get('loggedIn')) {
      let url =
        BASE_URL +
        '/cms/getSkillList.json?' +
        'private=1&access_token=' +
        cookies.get('loggedIn');
      $.ajax({
        url: url,
        jsonpCallback: 'p',
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(data) {
          this.setState({ chatbots: data.chatbots });
          this.getBotImages();
        }.bind(this),
        error: function(error) {
          if (error.status !== 404) {
            actions.openSnackBar({
              snackBarMessage:
                "Couldn't get your chatbots. Please reload the page.",
              snackBarDuration: 2000,
            });
          }
        },
      });
    }
  };

  getBotImages = () => {
    const { actions } = this.props;
    let bots = this.state.chatbots;
    if (bots) {
      bots.forEach((bot, index) => {
        let name = bot.name;
        let language = bot.language;
        let group = bot.group;
        let url =
          BASE_URL +
          '/cms/getSkill.json?group=' +
          group +
          '&language=' +
          language +
          '&skill=' +
          name +
          '&private=1&access_token=' +
          cookies.get('loggedIn');
        $.ajax({
          url: url,
          dataType: 'jsonp',
          crossDomain: true,
          success: function(data) {
            let image_match = data.text.match(/^::image\s(.*)$/m);
            if (image_match) {
              bot.image = image_match[1];
            }
            bots[index] = bot;
            this.setState({ chatbots: bots });
          }.bind(this),
          error: function(error) {
            if (error.status !== 404) {
              actions.openSnackBar({
                snackBarMessage:
                  "Couldn't get your chatbot image. Please reload the page.",
                snackBarDuration: 2000,
              });
            }
          },
        });
      });
    }
  };

  showChatbots = () => {
    let chatbots = [];
    let bots = this.state.chatbots;
    if (bots) {
      bots.forEach(bot => {
        let imageUrl;
        let { protocol, host } = window.location;
        if (bot.image === 'images/<image_name>') {
          imageUrl = `${protocol}//${host}/customAvatars/1.png`;
        } else if (bot.image === 'images/<image_name_event>') {
          imageUrl = `${protocol}//${host}/botTemplates/event-registration.jpg`;
        } else if (bot.image === 'images/<image_name_job>') {
          imageUrl = `${protocol}//${host}/botTemplates/job-application.jpg`;
        } else if (bot.image === 'images/<image_name_contact>') {
          imageUrl = `${protocol}//${host}/botTemplates/contact-us.png`;
        } else {
          imageUrl = bot.image
            ? `${BASE_URL}/cms/getImage.png?access_token=${cookies.get(
                'loggedIn',
              )}&language=${bot.language}&group=${bot.group.replace(
                / /g,
                '%20',
              )}&image=${bot.image.replace(/ /g, '%20')}`
            : null;
        }
        chatbots.push(
          <Card
            key={bot.name}
            className="bot-template-card"
            style={{
              backgroundImage: 'url(' + imageUrl + ')',
              backgroundSize: 'cover',
            }}
          >
            <Link
              to={
                '/botbuilder/botwizard?name=' +
                bot.name +
                '&language=' +
                bot.language +
                '&group=' +
                bot.group
              }
            >
              <RaisedButton
                label={bot.name}
                labelPosition="before"
                labelStyle={{ verticalAlign: 'middle' }}
                backgroundColor={colors.header}
                labelColor="#fff"
              />
            </Link>
            <div className="bot-delete">
              <Delete
                color="rgb(255, 255, 255)"
                onClick={() =>
                  this.openDeleteAlert('bot', [
                    bot.name,
                    bot.language,
                    bot.group,
                  ])
                }
              />
            </div>
          </Card>,
        );
      });
    }
    return chatbots;
  };

  deleteBot = (name, language, group) => {
    const { actions } = this.props;
    let url =
      BASE_URL +
      '/cms/deleteSkill.json?access_token=' +
      cookies.get('loggedIn') +
      '&private=1&group=' +
      group +
      '&language=' +
      language +
      '&skill=' +
      name;
    $.ajax({
      url: url,
      jsonpCallback: 'p',
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        actions
          .openSnackBar({
            snackBarMessage: 'Unable to delete your chatbot. Please try again.',
            snackBarDuration: 2000,
          })
          .then(() => {
            this.closeDeleteAlert();
            this.getChatbots();
          });
      }.bind(this),
      error: function(error) {
        this.setState({
          deleteAlert: null,
        });
        actions.openSnackBar({
          snackBarMessage: 'Unable to delete your chatbot. Please try again.',
          snackBarDuration: 2000,
        });
      }.bind(this),
    });
  };

  getDrafts = () => {
    const { actions } = this.props;
    let url = BASE_URL + '/cms/readDraft.json';
    $.ajax({
      url: url,
      dataType: 'jsonp',
      crossDomain: true,
      success: function(data) {
        this.showDrafts(data.drafts);
      }.bind(this),
      error: function(error) {
        actions.openSnackBar({
          snackBarMessage: "Couldn't get your drafts. Please reload the page.",
          snackBarDuration: 2000,
        });
      },
    });
  };

  showDrafts = drafts => {
    if (drafts) {
      let draftsOfBots = [];
      for (let draft in drafts) {
        let imageUrl;
        let { protocol, host } = window.location;
        if (drafts[draft].image === 'images/<image_name>') {
          imageUrl = `${protocol}//${host}/customAvatars/1.png`;
        } else if (drafts[draft].image === 'images/<image_name_event>') {
          imageUrl = `${protocol}//${host}/botTemplates/event-registration.jpg`;
        } else if (drafts[draft].image === 'images/<image_name_job>') {
          imageUrl = `${protocol}//${host}/botTemplates/job-application.jpg`;
        } else if (drafts[draft].image === 'images/<image_name_contact>') {
          imageUrl = `${protocol}//${host}/botTemplates/contact-us.png`;
        } else {
          imageUrl = drafts[draft].image
            ? `${BASE_URL}/cms/getImage.png?access_token=${cookies.get(
                'loggedIn',
              )}&language=${drafts[draft].language}&group=${drafts[
                draft
              ].group.replace(/ /g, '%20')}&image=${drafts[draft].image.replace(
                / /g,
                '%20',
              )}`
            : null;
        }
        draftsOfBots.push(
          <Card
            key={draft}
            className="bot-template-card"
            style={{
              backgroundImage: 'url(' + imageUrl + ')',
              backgroundSize: 'cover',
            }}
          >
            <Link to={'/botbuilder/botwizard?draftID=' + draft}>
              <RaisedButton
                label={drafts[draft].name === '' ? draft : drafts[draft].name}
                labelPosition="before"
                labelStyle={{ verticalAlign: 'middle' }}
                backgroundColor={colors.header}
                labelColor="#fff"
              />
            </Link>
            <div className="bot-delete">
              <Delete
                color="rgb(255, 255, 255)"
                onClick={() => this.openDeleteAlert('draft', [draft])}
              />
            </div>
          </Card>,
        );
      }
      this.setState({ drafts: draftsOfBots });
    }
  };

  deleteDrafts = id => {
    const { actions } = this.props;
    let url = BASE_URL + '/cms/deleteDraft.json?id=' + id;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      crossDomain: true,
      success: function(data) {
        actions
          .openSnackBar({
            snackBarMessage: 'Draft successfully deleted.',
            snackBarDuration: 2000,
          })
          .then(() => {
            this.closeDeleteAlert();
            this.getDrafts();
          });
      }.bind(this),
      error: function(error) {
        actions.openSnackBar({
          snackBarMessage: 'Unable to delete your draft. Please try again.',
          snackBarDuration: 2000,
        });
        this.setState({
          deleteAlert: null,
        });
      }.bind(this),
    });
  };

  openDeleteAlert = (type, params) => {
    this.setState({ deleteAlert: { type, params } });
  };

  closeDeleteAlert = () => {
    this.setState({ deleteAlert: null });
  };

  handleDelete = () => {
    const { type, params } = this.state.deleteAlert;
    if (type === 'bot') {
      this.deleteBot(...params);
    } else if (type === 'draft') {
      this.deleteDrafts(...params);
    }
  };

  render() {
    const { home, paperStyle, heading, loggedInError, newBotBtn } = styles;
    const { drafts, deleteAlert } = this.state;
    if (!cookies.get('loggedIn')) {
      return (
        <div>
          <StaticAppBar {...this.props} />
          <div>
            <p style={loggedInError}>Please login to create a skill bot.</p>
          </div>
        </div>
      );
    }

    return (
      <div>
        <StaticAppBar {...this.props} />
        <div style={home} className="botbuilder-page-wrapper">
          <Paper style={paperStyle} className="botBuilder-page-card" zDepth={1}>
            <h1 style={heading}>Pick a template</h1>
            <div className="bot-template-wrap">
              {this.props.templates.map(template => {
                return (
                  <Link
                    key={template.id}
                    to={'/botbuilder/botwizard?template=' + template.id}
                  >
                    <Card
                      className="bot-template-card"
                      style={{
                        backgroundImage: 'url(' + template.image + ')',
                        backgroundSize: 'cover',
                      }}
                    >
                      <RaisedButton
                        label={template.name}
                        backgroundColor={colors.header}
                        labelColor="#fff"
                      />
                    </Card>
                  </Link>
                );
              })}
            </div>
          </Paper>
          <Paper style={paperStyle} className="botBuilder-page-card" zDepth={1}>
            <h1 style={heading}>My bots</h1>
            <br />
            <h2 style={heading}>Saved Bots</h2>
            <div className="bot-template-wrap">
              <Link to="/botbuilder/botwizard">
                <Card
                  className="bot-template-card"
                  style={{
                    backgroundImage: 'url(/botTemplates/chat-bot.jpg)',
                    backgroundSize: 'cover',
                  }}
                >
                  <FloatingActionButton
                    backgroundColor={colors.fabButton}
                    mini={true}
                    style={{
                      boxShadow:
                        'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
                    }}
                  >
                    <Add
                      style={{
                        height: '40px',
                      }}
                    />
                  </FloatingActionButton>
                  <CardText style={newBotBtn}>Create a new bot</CardText>
                </Card>
              </Link>
              {this.showChatbots()}
            </div>
            <h2 style={heading}>Drafts</h2>
            <div className="bot-template-wrap">
              {drafts.length > 0 ? (
                drafts
              ) : (
                <p style={{ fontSize: '18px', paddingLeft: '10px' }}>
                  No drafts to display.
                </p>
              )}
            </div>
          </Paper>
        </div>
        <Dialog
          actions={[
            <FlatButton
              label="Cancel"
              onClick={this.closeDeleteAlert}
              key={'Cancel'}
              primary={true}
              style={{ marginRight: '10px' }}
            />,
            <FlatButton
              label="Delete"
              onClick={this.handleDelete}
              key={'Delete'}
              backgroundColor={'#ff0000'}
              primary={true}
              labelStyle={{ color: '#fff' }}
              hoverColor={'rgba(255,0,0,0.7)'}
            />,
          ]}
          modal={false}
          open={deleteAlert !== null}
          onRequestClose={this.closeDeleteAlert}
        >
          {`Are you sure you want to delete this ${
            deleteAlert !== null ? deleteAlert.type : ''
          }?`}
        </Dialog>
      </div>
    );
  }
}

BotBuilder.propTypes = {
  templates: PropTypes.array,
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
)(BotBuilder);
