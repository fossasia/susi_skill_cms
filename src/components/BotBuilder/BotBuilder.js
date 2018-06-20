import React from 'react';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { Card } from 'material-ui/Card';
import ReactTooltip from 'react-tooltip';
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
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <h1 style={{ padding: '5px 0 0 15px' }}>My bots</h1>
              <div style={{ marginRight: '0', marginLeft: 'auto' }}>
                <div style={styles.newBotBtn}>
                  <Link to="/botbuilder/botwizard">
                    <FloatingActionButton
                      data-tip="Create a new bot"
                      backgroundColor={colors.fabButton}
                      style={styles.select}
                    >
                      <Add />
                    </FloatingActionButton>
                    <ReactTooltip effect="solid" place="bottom" />
                  </Link>
                </div>
              </div>
            </div>
            <Grid>
              <Row>
                <Col xs={12} md={12}>
                  <div className="bot-template-wrap">
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
    padding: '10px 0px 10px 10px',
  },
};

BotBuilder.propTypes = {
  templates: PropTypes.array,
};

export default BotBuilder;
