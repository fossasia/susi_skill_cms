import React from 'react';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { Card } from 'material-ui/Card';
import { Paper } from 'material-ui';
import Add from 'material-ui/svg-icons/content/add';
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
                        <RaisedButton
                          label={'Create new'}
                          labelPosition="before"
                          icon={<Add />}
                          labelStyle={{ verticalAlign: 'middle' }}
                          backgroundColor={colors.header}
                          labelColor="#fff"
                        />
                      </Card>
                    </Link>
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
};

BotBuilder.propTypes = {
  templates: PropTypes.array,
};

export default BotBuilder;
