import React from 'react';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';
import Add from 'material-ui/svg-icons/content/add';
import { FloatingActionButton, Paper } from 'material-ui';
import colors from '../../Utils/colors';
import './BotBuilder.css';
import urls from '../../Utils/urls';
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
      openSnackbar: false,
      msgSnackbar: '',
    };
    this.getChatbots();
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
          console.log(error);
          this.setState({
            openSnackbar: true,
            msgSnackbar: "Couldn't get your chatbots. Please reload the page.",
          });
        }.bind(this),
      });
    }
  };

  showChatbots = bots => {
    let chatbots = [];
    this.setState({
      chatbots: [],
    });
    bots.map(bot => {
      chatbots.push(
        <Card className="bot-template-card">
          <RaisedButton
            label={bot.name}
            labelPosition="before"
            labelStyle={{ verticalAlign: 'middle' }}
            backgroundColor={colors.header}
            labelColor="#fff"
          />
        </Card>,
      );
    });
    this.setState({
      chatbots: chatbots,
    });
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
