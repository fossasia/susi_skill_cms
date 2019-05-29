// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ISO6391 from 'iso-639-1';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components
import skillActions from '../../redux/actions/skill';
import uiActions from '../../redux/actions/ui';
import AuthorSkills from '../AuthorSkills/AuthorSkills';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import SkillUsageCard from '../SkillUsageCard/SkillUsageCard';
import SkillRatingCard from '../SkillRating/SkillRatingCard';
import SkillFeedbackCard from '../SkillFeedbackCard/SkillFeedbackCard';
import Footer from '../Footer/Footer.react';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Ratings from 'react-ratings-declarative';

// Static Assets
import CircleImage from '../CircleImage/CircleImage';
import EditBtn from '@material-ui/icons/BorderColor';
import VersionBtn from '@material-ui/icons/History';
import DeleteBtn from '@material-ui/icons/Delete';
import NavigateDown from '@material-ui/icons/ExpandMore';
import NavigateUp from '@material-ui/icons/ExpandLess';
import ReactTooltip from 'react-tooltip';
import { urls, colors, parseDate, testExample } from '../../utils';
import { reportSkill } from '../../api';
import styled from 'styled-components';

import './SkillListing.css';

const HomeDiv = styled.div`
  font-size: 0.875rem;
`;

const AuthorSpan = styled.span`
  cursor: pointer;
  texttransform: capitalize;
`;

class SkillListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAuthorSkills: false,
      skillFeedback: [],
      showReportDialog: false,
      feedbackMessage: '',
      showDeleteDialog: false,
      skillExampleCount: 4,
      seeMoreSkillExamples: true,
    };

    this.groupValue = this.props.location.pathname.split('/')[1];
    this.skillTag = this.props.location.pathname.split('/')[2];
    this.languageValue = this.props.location.pathname.split('/')[3];
    this.skillData = {
      model: 'general',
      group: this.groupValue,
      language: this.languageValue,
      skill: this.skillTag,
    };
    this.skillName = this.skillTag
      ? this.skillTag
          .split('_')
          .map(data => {
            const s = data.charAt(0).toUpperCase() + data.substring(1);
            return s;
          })
          .join(' ')
      : '';
  }

  componentDidMount() {
    document.title = `SUSI.AI - ${this.skillName} Skills`;
    this.fetchSkillData();
  }

  fetchSkillData = () => {
    const { actions, accessToken } = this.props;
    actions.getSkillMetaData(this.skillData);
    if (accessToken) {
      actions.getUserRating(this.skillData);
    }
    actions.getDateWiseSkillUsage(this.skillData);
    actions.getCountryWiseSkillUsage(this.skillData);
    actions.getDeviceWiseSkillUsage(this.skillData);
    actions.getRatingsOverTime(this.skillData);
    actions.getSkillFeedbacks(this.skillData);
  };

  openAuthorSkills = () => {
    if (this.author) {
      this.setState({ showAuthorSkills: true });
    }
  };

  closeAuthorSkills = () => {
    this.setState({ showAuthorSkills: false });
  };

  handleReportToggle = () => {
    const { showReportDialog } = this.state;
    this.setState({
      showReportDialog: !showReportDialog,
    });
  };

  handleReportSubmit = () => {
    const { actions } = this.props;
    const { feedbackMessage } = this.state;
    reportSkill({ ...this.skillData, feedback: feedbackMessage })
      .then(payload => {
        this.handleReportToggle();
        actions.openSnackBar({
          snackBarMessage: 'Skill has been reported successfully.',
          snackBarDuration: 3000,
        });
      })
      .catch(error => {
        this.handleReportToggle();
        actions.openSnackBar({
          snackBarMessage: 'Failed to report the skill.',
          snackBarDuration: 3000,
        });
      });
  };

  saveReportFeedback = feedbackMessage => {
    this.setState({
      feedbackMessage,
    });
  };

  handleDeleteToggle = () => {
    this.setState(prevState => ({
      showDeleteDialog: !prevState.showDeleteDialog,
    }));
  };

  deleteSkill = () => {
    const { actions, history } = this.props;
    actions.setSkillLoading().then(response => {
      actions
        .deleteSkill(this.skillData)
        .then(payload => {
          this.handleDeleteToggle();
          history.push('/');
        })
        .catch(error => {
          console.log(error);
          this.handleReportToggle();
          actions.openSnackBar({
            snackMessage: 'Failed to delete the skill.',
          });
        });
    });
  };

  toggleSkillExamples = () => {
    this.setState(prevState => ({
      seeMoreSkillExamples: !prevState.seeMoreSkillExamples,
      skillExampleCount:
        prevState.skillExampleCount === 4
          ? prevState.examples && prevState.examples.length
          : 4,
    }));
  };

  render() {
    const {
      showDeleteDialog,
      skillExampleCount,
      showReportDialog,
      showAuthorSkills,
    } = this.state;

    const {
      image,
      author,
      descriptions: _descriptions,
      skillName: _skillName,
      supportedLanguages,
      lastModifiedTime,
      developerPrivacyPolicy,
      termsOfUse,
      dynamicContent,
      examples,
      skillRatings,
    } = this.props.metaData;

    const { loadingSkill, isAdmin, accessToken } = this.props;

    const imgUrl = !image
      ? '/favicon-512x512.jpg'
      : `${urls.API_URL}/cms/getImage.png?model=general&language=${
          this.languageValue
        }&group=${this.groupValue}&image=${image}`;

    const descriptions =
      _descriptions === null ? 'No Description Provided' : _descriptions;

    const skillName = _skillName === null ? 'No Name Given' : _skillName;

    let { seeMoreSkillExamples } = this.state;

    const reportDialogActions = [
      <Button
        key={0}
        color="secondary"
        onClick={this.handleReportSubmit}
        disabled={
          !(
            this.state.feedbackMessage !== undefined &&
            this.state.feedbackMessage.trim()
          )
        }
      >
        Report
      </Button>,
      <Button key={1} color="primary" onClick={this.handleReportToggle}>
        Cancel
      </Button>,
    ];

    const deleteDialogActions = [
      <Button key={0} color="secondary" onClick={this.deleteSkill}>
        Delete
      </Button>,
      <Button key={1} color="primary" onClick={this.handleDeleteToggle}>
        Cancel
      </Button>,
    ];

    let renderElement = null;
    if (examples.length > 4) {
      seeMoreSkillExamples = seeMoreSkillExamples ? (
        <div className="skill-read-more-container">
          <p style={{ fontSize: '0.75rem' }}>See more examples</p>
          <NavigateDown
            style={{ fill: '#555656', width: '0.75rem' }}
            className="skill-example-more-icon"
          />
        </div>
      ) : (
        <div className="skill-read-more-container">
          <p style={{ fontSize: '0.75rem' }}>Less</p>
          <NavigateUp
            style={{ fill: '#555656', width: '0.75rem' }}
            className="skill-example-more-icon"
          />
        </div>
      );
    }
    if (loadingSkill === true) {
      renderElement = (
        <div>
          <StaticAppBar {...this.props} />
          <h1 className="skill_loading_container">
            <div className="center">
              <CircularProgress size={62} color="primary" />
              <h4>Loading</h4>
            </div>
          </h1>
        </div>
      );
    } else {
      renderElement = (
        <div>
          <StaticAppBar {...this.props} />
          <HomeDiv className="skill_listing_container">
            <div className="avatar">
              {!image ? (
                <CircleImage name={skillName.toUpperCase()} size="250" />
              ) : (
                <img className="avatar-img" alt="Thumbnail" src={imgUrl} />
              )}
            </div>
            <div className="skillHeaderContainer">
              <div>
                <h1 className="name">{this.skillName}</h1>
                <h4>
                  by{' '}
                  <AuthorSpan onClick={this.openAuthorSkills}>
                    {author}
                  </AuthorSpan>
                </h4>
                <a className="singleRating" href="#rating">
                  <Ratings
                    rating={skillRatings.avgStar}
                    widgetRatedColors="#ffbb28"
                    widgetDimensions="1.25rem"
                    widgetSpacings="0rem"
                  >
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                  </Ratings>
                  <div className="ratingLabel">{skillRatings.totalStar}</div>
                </a>
              </div>
              <div className="linkButtons">
                {isAdmin === 'true' && (
                  <div className="skillDeleteBtn">
                    <Fab
                      onClick={this.handleDeleteToggle}
                      data-tip="Delete Skill"
                      backgroundColor={colors.warningColor}
                    >
                      <DeleteBtn />
                    </Fab>
                    <ReactTooltip effect="solid" place="bottom" />
                    <Dialog
                      open={showDeleteDialog}
                      onClose={this.handleDeleteToggle}
                      maxWidth={'sm'}
                      fullWidth={true}
                    >
                      <DialogContent>
                        <DialogTitle>Delete Skill</DialogTitle>
                        <DialogContentText>
                          Are you sure about deleting{' '}
                          <span style={{ fontWeight: 'bold' }}>
                            {skillName}
                          </span>?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>{deleteDialogActions}</DialogActions>
                    </Dialog>
                  </div>
                )}
                <div>
                  <Link
                    to={{
                      pathname: `/${this.groupValue}/${this.skillTag}/edit/${
                        this.languageValue
                      }`,
                    }}
                  >
                    <Fab data-tip="Edit Skill" backgroundColor={colors.header}>
                      <EditBtn color="primary" />
                    </Fab>
                    <ReactTooltip effect="solid" place="bottom" />
                  </Link>
                </div>
                <div>
                  <Link
                    to={{
                      pathname: `/${this.groupValue}/${
                        this.skillTag
                      }/versions/${this.languageValue}`,
                    }}
                  >
                    <div className="skillVersionBtn">
                      <Fab
                        data-tip="Skill Versions"
                        backgroundColor={colors.header}
                      >
                        <VersionBtn color="primary" />
                      </Fab>
                      <ReactTooltip effect="solid" place="bottom" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="avatar-meta margin-b-md">
              <div className="example-container">
                {examples &&
                  examples[Object.keys(examples)[0]] &&
                  examples.slice(0, skillExampleCount).map((data, index) => {
                    return (
                      <div
                        key={index}
                        className="example-comment"
                        onClick={event => testExample(event, data)}
                      >
                        <q>{data}</q>
                      </div>
                    );
                  })}
              </div>
              <div
                className="skill-example-see-more"
                onClick={this.toggleSkillExamples}
              >
                {seeMoreSkillExamples}
              </div>
            </div>
            <Paper className="margin-b-md margin-t-md">
              <div className="desc margin-b-md margin-t-md">
                <h1 className="title">Description</h1>
                <p className="card-content">{descriptions}</p>
                {dynamicContent && (
                  <div className="card-content">
                    <ul>
                      <li>
                        This skill contains dynamic content that is updated in
                        real time based on inputs from the user.
                      </li>
                    </ul>
                  </div>
                )}

                {termsOfUse && (
                  <div className="card-content">
                    <ul>
                      <li>
                        <a
                          href={termsOfUse}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Terms & Conditions
                        </a>
                      </li>
                    </ul>
                  </div>
                )}

                {termsOfUse && (
                  <div className="card-content">
                    <ul>
                      <li>
                        <a
                          href={developerPrivacyPolicy}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Developer Privacy Policy
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </Paper>
            <Paper className="margin-b-md margin-t-md">
              <div className="desc margin-b-md margin-t-md">
                <h1 className="title">Skill Details</h1>
                <div className="card-content">
                  <table>
                    <tbody>
                      <tr>
                        <td>Category: </td>
                        <td>
                          <Link to={`/category/${this.groupValue}`}>
                            {this.groupValue}
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Language: </td>
                        <td>
                          <Link to={`/language/${this.languageValue}`}>
                            {ISO6391.getNativeName(this.languageValue)}
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Updated on: </td>
                        <td>{` ${parseDate(lastModifiedTime)}`}</td>
                      </tr>
                      <tr>
                        <td>Languages supported:</td>
                        <td>
                          {supportedLanguages.map((data, index) => {
                            const delimiter =
                              supportedLanguages.length === index + 1
                                ? null
                                : ', ';
                            return (
                              <Link
                                key={index}
                                onClick={this.forceUpdate}
                                to={`/${this.groupValue}/${data.name}/${
                                  data.language
                                }`}
                              >
                                {ISO6391.getNativeName(data.language)}
                                {delimiter}
                              </Link>
                            );
                          })}
                        </td>
                      </tr>
                      {accessToken && (
                        <tr>
                          <td>Report: </td>
                          <td>
                            <div
                              style={{ color: '#108ee9', cursor: 'pointer' }}
                              onClick={this.handleReportToggle}
                            >
                              Flag as inappropriate
                            </div>
                          </td>
                          <Dialog
                            open={showReportDialog}
                            onClose={this.handleReportToggle}
                            maxWidth={'sm'}
                            fullWidth={true}
                          >
                            <DialogTitle>Flag as inappropriate</DialogTitle>
                            <DialogContent>
                              <TextField
                                multiline={true}
                                fullWidth={true}
                                onChange={(event, val) =>
                                  this.saveReportFeedback(event.target.value)
                                }
                                label="Feedback message"
                                placeholder="Leave a feedback message"
                              />
                            </DialogContent>
                            <DialogActions>{reportDialogActions}</DialogActions>
                          </Dialog>
                        </tr>
                      )}
                      <tr>
                        <td>Content Rating: </td>
                        <td>4+ age</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Paper>
            <SkillRatingCard />
            <SkillFeedbackCard />
            <SkillUsageCard />
          </HomeDiv>
        </div>
      );
    }

    return (
      <div
        style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}
      >
        <div style={{ flex: '1 0 auto' }}>{renderElement}</div>
        <div>
          <AuthorSkills
            ref={c => {
              this.author = c;
            }}
            open={showAuthorSkills}
            requestClose={this.closeAuthorSkills}
          />
        </div>
        <div style={{ minWidth: '40rem' }}>
          <Footer />
        </div>
      </div>
    );
  }
}

SkillListing.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  actions: PropTypes.object,
  metaData: PropTypes.object,
  loadingSkill: PropTypes.bool,
  openSnack: PropTypes.bool,
  snackMessage: PropTypes.string,
  accessToken: PropTypes.string,
  isAdmin: PropTypes.bool,
};

function mapStateToProps(store) {
  return {
    ...store.skill,
    isAdmin: store.app.isAdmin,
    accessToken: store.app.accessToken,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...skillActions, ...uiActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SkillListing);
