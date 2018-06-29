import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import { Step, Stepper, StepButton } from 'material-ui/Stepper';
import { Grid, Col, Row } from 'react-flexbox-grid';
import colors from '../../Utils/colors';
import Build from './BotBuilderPages/Build';
import PropTypes from 'prop-types';
import Design from './BotBuilderPages/Design';
import Configure from './BotBuilderPages/Configure';
import Deploy from './BotBuilderPages/Deploy';
import Snackbar from 'material-ui/Snackbar';
import { Paper } from 'material-ui';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class BotWizard extends React.Component {
  constructor(props) {
    super(props);
    let startCode = '';
    if (this.getQueryStringValue('template')) {
      for (let template of this.props.templates) {
        if (template.id === this.getQueryStringValue('template')) {
          startCode = template.code;
        }
      }
    }
    this.state = {
      finished: false,
      stepIndex: 0,
      startCode,
      themeSettingsString: '{}',
      openSnackbar: false,
      msgSnackbar: '',
      slideState: 1, // 0 means preview full, 1 means in middle, 2 means preview collapsed
      colBuild: 8,
      colPreview: 4,
      designCode:
        '::design\n  color\n    bodyBackground #ffffff,\n    userMessageBoxBackground #0077e5,\n    userMessageTextColor #ffffff,\n    botMessageBoxBackground #f8f8f8,\n    botMessageTextColor #455a64,\n    botIconColor #000000',
      configCode:
        '!Write the status of each website you want to enable or disable the bot below.\n::sites_enabled website1.com, website2.com\n::sites_disabled website3.com',
    };
  }

  getQueryStringValue = key => {
    return decodeURIComponent(
      window.location.search.replace(
        new RegExp(
          '^(?:.*[&\\?]' +
            encodeURIComponent(key).replace(/[.+*]/g, '\\$&') +
            '(?:\\=([^&]*))?)?.*$',
          'i',
        ),
        '$1',
      ),
    );
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 3,
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  updateSettings = themeSettingsString => {
    this.setState({ themeSettingsString });
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Build code={this.state.startCode} />;
      case 1:
        return (
          <Design
            updateSettings={this.updateSettings}
            code={this.state.designCode}
          />
        );
      case 2:
        return <Configure code={this.state.configCode} />;
      case 3:
        return <Deploy />;
      default:
    }
  }

  setStep = stepIndex => {
    this.setState({ stepIndex });
  };

  handleBuildToggle = () => {
    let { slideState } = this.state;
    if (slideState === 0 || slideState === 2) {
      this.setState({
        slideState: 1,
        colBuild: 8,
        colPreview: 4,
      });
    } else if (slideState === 1) {
      this.setState({
        slideState: 0,
        colBuild: 0,
        colPreview: 12,
      });
    }
  };
  handlePreviewToggle = () => {
    let { slideState } = this.state;
    if (slideState === 0 || slideState === 2) {
      this.setState({
        slideState: 1,
        colBuild: 8,
        colPreview: 4,
      });
    } else if (slideState === 1) {
      this.setState({
        slideState: 2,
        colBuild: 12,
        colPreview: 0,
      });
    }
  };

  render() {
    if (!cookies.get('loggedIn')) {
      return (
        <div>
          <StaticAppBar {...this.props} />
          <div>
            <p style={styles.loggedInError}>
              Please login to create the Web Bot.
            </p>
          </div>
        </div>
      );
    }
    const { stepIndex } = this.state;
    const contentStyle = { margin: '0 16px' };
    const locationBot =
      '/BotPreview.html?access=' +
      cookies.get('loggedIn') +
      '&type=botWindow' +
      '&themeSettings=' +
      encodeURIComponent(this.state.themeSettingsString);
    return (
      <div>
        <StaticAppBar {...this.props} />
        <div style={styles.home} className="botbuilder-page-wrapper">
          <Grid fluid>
            <Row>
              <Col
                className="botbuilder-col"
                md={this.state.colBuild}
                style={{
                  overflowX: 'auto',
                  display: this.state.colBuild === 0 ? 'none' : 'block',
                }}
              >
                <Paper
                  style={styles.paperStyle}
                  className="botBuilder-page-card"
                  zDepth={1}
                >
                  <span title="collapse builder">
                    <ChevronLeft
                      className="botbuilder-chevron"
                      onClick={this.handleBuildToggle}
                      style={styles.chevronBuild}
                    />
                  </span>
                  <Stepper activeStep={stepIndex} linear={false}>
                    <Step>
                      <StepButton onClick={() => this.setStep(0)}>
                        Build
                      </StepButton>
                    </Step>
                    <Step>
                      <StepButton onClick={() => this.setStep(1)}>
                        Design
                      </StepButton>
                    </Step>
                    <Step>
                      <StepButton onClick={() => this.setStep(2)}>
                        Configure
                      </StepButton>
                    </Step>
                    <Step>
                      <StepButton onClick={() => this.setStep(3)}>
                        Deploy
                      </StepButton>
                    </Step>
                  </Stepper>
                  <div style={contentStyle}>
                    <div>{this.getStepContent(stepIndex)}</div>
                    <div style={{ marginTop: '20px' }}>
                      <RaisedButton
                        label="Back"
                        disabled={stepIndex === 0}
                        backgroundColor={colors.header}
                        labelColor="#fff"
                        onTouchTap={this.handlePrev}
                        style={{ marginRight: 12 }}
                      />
                      {stepIndex < 3 ? (
                        <RaisedButton
                          label={stepIndex === 2 ? 'Save and Deploy' : 'Next'}
                          backgroundColor={colors.header}
                          labelColor="#fff"
                          onTouchTap={this.handleNext}
                        />
                      ) : (
                        <p
                          style={{
                            padding: '20px 0px 0px 0px',
                            fontFamily: 'sans-serif',
                            fontSize: '14px',
                          }}
                        >
                          You&apos;re all done. Thanks for using SUSI Bot.
                        </p>
                      )}
                    </div>
                  </div>
                </Paper>
              </Col>

              <Col
                className="botbuilder-col"
                xs={12}
                md={this.state.colPreview}
                style={{
                  display: this.state.colPreview === 0 ? 'none' : 'block',
                }}
              >
                <Paper
                  style={styles.paperStyle}
                  className="botBuilder-page-card"
                  zDepth={1}
                >
                  <span title="collapse preview">
                    <ChevronRight
                      className="botbuilder-chevron"
                      onClick={this.handlePreviewToggle}
                      style={styles.chevronPreview}
                    />
                  </span>
                  <br className="display-mobile-only" />
                  <h2 className="center">Preview</h2>
                  <br />
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <iframe
                      title="botPreview"
                      name="frame-1"
                      id="frame-1"
                      src={locationBot}
                      height="600"
                      width="100%"
                    />
                  </div>
                </Paper>
              </Col>
            </Row>
          </Grid>
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
    position: 'relative',
  },
  tabStyle: {
    color: 'rgb(91, 91, 91)',
  },
  loggedInError: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: '100px',
    fontSize: '50px',
    marginTop: '300px',
  },
  chevronBuild: {
    position: 'absolute',
    right: '0',
    top: '0',
    width: '35px',
    height: '35px',
    cursor: 'pointer',
    display: window.innerWidth < 769 ? 'none' : 'inherit',
  },
  chevronPreview: {
    position: 'absolute',
    left: '0',
    top: '0',
    width: '35px',
    height: '35px',
    cursor: 'pointer',
    display: window.innerWidth < 769 ? 'none' : 'inherit',
  },
};
BotWizard.propTypes = {
  templates: PropTypes.array,
};

export default BotWizard;
