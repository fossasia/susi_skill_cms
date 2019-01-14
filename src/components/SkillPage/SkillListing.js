// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import ISO6391 from 'iso-639-1';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components
import skillActions from '../../redux/actions/skill';
import AuthorSkills from '../AuthorSkills/AuthorSkills';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import SkillUsageCard from '../SkillUsageCard/SkillUsageCard';
import SkillRatingCard from '../SkillRating/SkillRatingCard';
import SkillFeedbackCard from '../SkillFeedbackCard/SkillFeedbackCard';
import Footer from '../Footer/Footer.react';
import { FloatingActionButton, Paper } from 'material-ui';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Ratings from 'react-ratings-declarative';

// Static Assets
import CircleImage from '../CircleImage/CircleImage';
import EditBtn from 'material-ui/svg-icons/editor/mode-edit';
import VersionBtn from 'material-ui/svg-icons/action/history';
import DeleteBtn from 'material-ui/svg-icons/action/delete';
import NavigateDown from 'material-ui/svg-icons/navigation/expand-more';
import NavigateUp from 'material-ui/svg-icons/navigation/expand-less';
import ReactTooltip from 'react-tooltip';
import { urls, colors, parseDate, testExample } from '../../utils';
import { reportSkill } from '../../api';

import './SkillListing.css';

const cookies = new Cookies();

const styles = {
  home: {
    width: '500%',
    fontSize: '14px',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '10px',
  },
  paper_full_width: {
    width: '100%',
    marginBottom: 10,
    display: 'inline-block',
  },
  authorStyle: {
    cursor: 'pointer',
    textTransform: 'capitalize',
  },
};

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
    const { actions } = this.props;
    actions.getSkillMetaData(this.skillData);
    if (cookies.get('loggedIn')) {
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
          snackMessage: 'Skill has been reported successfully.',
        });
      })
      .catch(error => {
        this.handleReportToggle();
        actions.openSnackBar({
          snackMessage: 'Failed to report the skill.',
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
    const showAdmin = cookies.get('showAdmin');
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

    const { loadingSkill, actions, openSnack, snackMessage } = this.props;

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
      <FlatButton
        label="Report"
        key="submit"
        style={{ color: colors.warningColor }}
        onClick={this.handleReportSubmit}
      />,
      <FlatButton
        label="Cancel"
        key="cancel"
        style={{ color: 'rgb(66, 133, 244)' }}
        onClick={this.handleReportToggle}
      />,
    ];

    const deleteDialogActions = [
      <FlatButton
        label="Delete"
        key="delete"
        style={{ color: colors.warningColor }}
        onClick={this.deleteSkill}
      />,
      <FlatButton
        label="Cancel"
        key="cancel"
        style={{ color: 'rgb(66, 133, 244)' }}
        onClick={this.handleDeleteToggle}
      />,
    ];

    let renderElement = null;
    if (examples.length > 4) {
      seeMoreSkillExamples = seeMoreSkillExamples ? (
        <div className="skill-read-more-container">
          <p style={{ fontSize: '12px' }}>See more examples</p>
          <NavigateDown
            style={{ fill: '#555656', width: '12px' }}
            className="skill-example-more-icon"
          />
        </div>
      ) : (
        <div className="skill-read-more-container">
          <p style={{ fontSize: '12px' }}>Less</p>
          <NavigateUp
            style={{ fill: '#555656', width: '12px' }}
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
              <CircularProgress size={62} color="#4285f5" />
              <h4>Loading</h4>
            </div>
          </h1>
        </div>
      );
    } else {
      renderElement = (
        <div>
          <StaticAppBar {...this.props} />
          <div className="skill_listing_container" style={styles.home}>
            <div className="avatar">
              {image == null ? (
                <CircleImage name={skillName.toUpperCase()} size="250" />
              ) : (
                <img className="avatar-img" alt="Thumbnail" src={imgUrl} />
              )}
            </div>
            <div className="linkButtons">
              {showAdmin === 'true' && (
                <div className="skillDeleteBtn">
                  <FloatingActionButton
                    onClick={this.handleDeleteToggle}
                    data-tip="Delete Skill"
                    backgroundColor={colors.warningColor}
                  >
                    <DeleteBtn />
                  </FloatingActionButton>
                  <ReactTooltip effect="solid" place="bottom" />
                  <Dialog
                    title="Delete Skill"
                    actions={deleteDialogActions}
                    modal={false}
                    open={showDeleteDialog}
                    onRequestClose={this.handleDeleteToggle}
                  >
                    <div>
                      Are you sure about deleting{' '}
                      <span style={{ fontWeight: 'bold' }}>{skillName}</span>?
                    </div>
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
                  <FloatingActionButton
                    data-tip="Edit Skill"
                    backgroundColor={colors.header}
                  >
                    <EditBtn />
                  </FloatingActionButton>
                  <ReactTooltip effect="solid" place="bottom" />
                </Link>
              </div>
              <div>
                <Link
                  to={{
                    pathname: `/${this.groupValue}/${this.skillTag}/versions/${
                      this.languageValue
                    }`,
                  }}
                >
                  <div className="skillVersionBtn">
                    <FloatingActionButton
                      data-tip="Skill Versions"
                      backgroundColor={colors.header}
                    >
                      <VersionBtn />
                    </FloatingActionButton>
                    <ReactTooltip effect="solid" place="bottom" />
                  </div>
                </Link>
              </div>
            </div>
            <div className="meta">
              <h1 className="name">{this.skillName}</h1>
              <h4>
                by{' '}
                <span
                  style={styles.authorStyle}
                  onClick={this.openAuthorSkills}
                >
                  {author}
                </span>
              </h4>
              <a className="singleRating" href="#rating">
                <Ratings
                  rating={skillRatings.avgStar}
                  widgetRatedColors="#ffbb28"
                  widgetDimensions="20px"
                  widgetSpacings="0px"
                >
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                </Ratings>
                <div className="ratingLabel">{skillRatings.totalStar}</div>
              </a>
              <div className="avatar-meta margin-b-md">
                <div className="example-container">
                  {typeof examples === 'undefined' ||
                  examples === null ||
                  typeof examples[Object.keys(examples)[0]] === 'undefined'
                    ? ''
                    : examples
                        .slice(0, skillExampleCount)
                        .map((data, index) => {
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
            </div>
            <Paper className="margin-b-md margin-t-md">
              <div className="desc margin-b-md margin-t-md">
                <h1 className="title">Description</h1>
                <p className="card-content">{descriptions}</p>
                {dynamicContent ? (
                  <div className="card-content">
                    <ul>
                      <li>
                        This skill contains dynamic content that is updated in
                        real time based on inputs from the user.
                      </li>
                    </ul>
                  </div>
                ) : null}

                {termsOfUse == null ? (
                  ''
                ) : (
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

                {termsOfUse == null ? (
                  ''
                ) : (
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
                          let delimiter =
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
                    {cookies.get('loggedIn') ? (
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
                          title="Flag as inappropriate"
                          actions={reportDialogActions}
                          modal={false}
                          open={showReportDialog}
                          onRequestClose={this.handleReportToggle}
                        >
                          <TextField
                            hintText="Leave a feedback message"
                            floatingLabelText="Feedback message"
                            multiLine
                            floatingLabelFocusStyle={{
                              color: 'rgb(66, 133, 244)',
                            }}
                            underlineFocusStyle={{
                              borderColor: 'rgb(66, 133, 244)',
                            }}
                            fullWidth
                            onChange={(event, val) =>
                              this.saveReportFeedback(val)
                            }
                          />
                        </Dialog>
                      </tr>
                    ) : (
                      ''
                    )}
                    <tr>
                      <td>Content Rating: </td> <td>4+ age</td>
                    </tr>
                  </table>
                </div>
              </div>
            </Paper>
            <SkillRatingCard />
            <SkillFeedbackCard />
            <SkillUsageCard />
          </div>
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
        <Snackbar
          open={openSnack}
          message={snackMessage}
          autoHideDuration={3000}
          onRequestClose={actions.closeSnackBar}
        />
        <Footer />
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
};

function mapStateToProps(store) {
  return {
    ...store.skill,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(skillActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SkillListing);
