import React from 'react';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';
import Add from 'material-ui/svg-icons/content/add';
import { FloatingActionButton, Paper } from 'material-ui';
import colors from '../../Utils/colors';
import './BotBuilder.css';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class BotBuilder extends React.Component {
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
            <Grid>
              <Row>
                <Col xs={12} md={12}>
                  <h1>Pick a template</h1>
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
                </Col>
              </Row>
            </Grid>
          </Paper>
          <Paper
            style={styles.paperStyle}
            className="botBuilder-page-card"
            zDepth={1}
          >
            <Grid>
              <Row>
                <Col xs={12} md={12}>
                  <h1>My bots</h1>
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
                        <CardText style={styles.newBotBtn}>
                          Create a new bot
                        </CardText>
                      </Card>
                    </Link>
                    <Card className="bot-template-card">
                      <RaisedButton
                        label={'Sample Bot 1'}
                        labelPosition="before"
                        labelStyle={{ verticalAlign: 'middle' }}
                        backgroundColor={colors.header}
                        labelColor="#fff"
                      />
                    </Card>
                    <Card className="bot-template-card">
                      <RaisedButton
                        label={'Sample Bot 2'}
                        labelPosition="before"
                        labelStyle={{ verticalAlign: 'middle' }}
                        backgroundColor={colors.header}
                        labelColor="#fff"
                      />
                    </Card>
                    <Card className="bot-template-card">
                      <RaisedButton
                        label={'Sample Bot 3'}
                        labelPosition="before"
                        labelStyle={{ verticalAlign: 'middle' }}
                        backgroundColor={colors.header}
                        labelColor="#fff"
                      />
                    </Card>
                  </div>
                </Col>
              </Row>
            </Grid>
          </Paper>
        </div>
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
};

BotBuilder.propTypes = {
  templates: PropTypes.array,
};

export default BotBuilder;
