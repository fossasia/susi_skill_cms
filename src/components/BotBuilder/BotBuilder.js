import React from 'react';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';
import Add from 'material-ui/svg-icons/content/add';
import Delete from 'material-ui/svg-icons/action/delete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { FloatingActionButton, Paper } from 'material-ui';
import './BotBuilder.css';
import { urls, colors } from '../../utils';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import * as $ from 'jquery';

const cookies = new Cookies();
let BASE_URL = urls.API_URL;

class BotBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatbots: [],
      drafts: [],
      openSnackbar: false,
      msgSnackbar: '',
      deleteAlert: null,
    };
    this.getChatbots();
    this.getDrafts();
  }

  getChatbots = () => {
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
          this.showChatbots(data.chatbots);
        }.bind(this),
        error: function(error) {
          if (error.status !== 404) {
            this.setState({
              openSnackbar: true,
              msgSnackbar:
                "Couldn't get your chatbots. Please reload the page.",
            });
          }
        }.bind(this),
      });
    }
  };

  showChatbots = bots => {
    let chatbots = [];
    this.setState({
      chatbots: [],
    });
    if (bots) {
      bots.forEach(bot => {
        chatbots.push(
          <Card key={bot.name} className="bot-template-card">
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
    this.setState({
      chatbots: chatbots,
    });
  };

  deleteBot = (name, language, group) => {
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
        this.setState(
          {
            openSnackbar: true,
            msgSnackbar: 'Successfully ' + data.message,
          },
          () => {
            this.closeDeleteAlert();
            this.getChatbots();
          },
        );
      }.bind(this),
      error: function(error) {
        this.setState({
          openSnackbar: true,
          msgSnackbar: 'Unable to delete your chatbot. Please try again.',
          deleteAlert: null,
        });
      }.bind(this),
    });
  };

  getDrafts = () => {
    let url = BASE_URL + '/cms/readDraft.json';
    $.ajax({
      url: url,
      dataType: 'jsonp',
      crossDomain: true,
      success: function(data) {
        this.showDrafts(data.drafts);
      }.bind(this),
      error: function(error) {
        this.setState({
          openSnackbar: true,
          msgSnackbar: "Couldn't get your drafts. Please reload the page.",
        });
      }.bind(this),
    });
  };

  showDrafts = drafts => {
    if (drafts) {
      let draftsOfBots = [];
      for (let draft in drafts) {
        draftsOfBots.push(
          <Card key={draft} className="bot-template-card">
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
    let url = BASE_URL + '/cms/deleteDraft.json?id=' + id;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      crossDomain: true,
      success: function(data) {
        this.setState(
          {
            openSnackbar: true,
            msgSnackbar: 'Draft successfully deleted.',
          },
          () => {
            this.closeDeleteAlert();
            this.getDrafts();
          },
        );
      }.bind(this),
      error: function(error) {
        this.setState({
          openSnackbar: true,
          msgSnackbar: 'Unable to delete your draft. Please try again.',
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
    if (!cookies.get('loggedIn')) {
      return (
        <div>
          <StaticAppBar {...this.props} />
          <div>
            <p style={styles.loggedInError}>
              Please login to create a skill bot.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div>
        <StaticAppBar {...this.props} />
        <div style={styles.home} className="botbuilder-page-wrapper">
          <Paper
            style={styles.paperStyle}
            className="botBuilder-page-card"
            zDepth={1}
          >
            <h1 style={styles.heading}>Pick a template</h1>
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
          <Paper
            style={styles.paperStyle}
            className="botBuilder-page-card"
            zDepth={1}
          >
            <h1 style={styles.heading}>My bots</h1>
            <br />
            <h2 style={styles.heading}>Saved Bots</h2>
            <div className="bot-template-wrap">
              <Link to="/botbuilder/botwizard">
                <Card className="bot-template-card">
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
                  <CardText style={styles.newBotBtn}>Create a new bot</CardText>
                </Card>
              </Link>
              {this.state.chatbots}
            </div>
            <h2 style={styles.heading}>Drafts</h2>
            <div className="bot-template-wrap">{this.state.drafts}</div>
          </Paper>
        </div>
        <Snackbar
          open={this.state.openSnackbar}
          message={this.state.msgSnackbar}
          autoHideDuration={2000}
          onRequestClose={() => {
            this.setState({ openSnackbar: false });
          }}
        />
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
              backgroundColor={'#f50057'}
              labelStyle={{ color: '#fff' }}
              hoverColor={'#ff1744'}
            />,
          ]}
          modal={false}
          open={this.state.deleteAlert !== null}
          onRequestClose={this.closeDeleteAlert}
        >
          {`Are you sure you want to delete this ${
            this.state.deleteAlert !== null ? this.state.deleteAlert.type : ''
          }?`}
        </Dialog>
      </div>
    );
  }
}

const styles = {
  home: {
    width: '100%',
  },
  bg: {
    textAlign: 'center',
    padding: '30px',
  },
  paperStyle: {
    width: '100%',
    marginTop: '20px',
    overflow: 'overlay',
  },
  tabStyle: {
    color: 'rgb(91, 91, 91)',
  },
  previewButtonStyle: {
    width: '100px',
    marginTop: '50px',
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
    paddingLeft: '20px',
  },
};

BotBuilder.propTypes = {
  templates: PropTypes.array,
};

export default BotBuilder;
