// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import $ from 'jquery';
import ISO6391 from 'iso-639-1';

// Components
import AuthorSkills from '../AuthorSkills/AuthorSkills';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import SkillUsageCard from '../SkillUsageCard/SkillUsageCard';
import SkillRatingCard from '../SkillRatingCard/SkillRatingCard';
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
import 'brace/mode/markdown';
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/twilight';
import 'brace/theme/xcode';
import 'brace/theme/textmate';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';
import 'brace/theme/terminal';
import CircleImage from '../CircleImage/CircleImage';
import EditBtn from 'material-ui/svg-icons/editor/mode-edit';
import VersionBtn from 'material-ui/svg-icons/action/history';
import DeleteBtn from 'material-ui/svg-icons/action/delete';
import NavigateDown from 'material-ui/svg-icons/navigation/expand-more';
import NavigateUp from 'material-ui/svg-icons/navigation/expand-less';
import ReactTooltip from 'react-tooltip';
import { urls, colors, parseDate } from '../../utils';

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
      fontSizeCode: 14,
      editorTheme: 'github',
      image: '',
      author: '',
      authorUrl: '',
      developerPrivacyPolicy: '',
      termsOfUse: '',
      dynamic_content: '',
      examples: '',
      languagesSupported: [],
      descriptions: '',
      skillName: '',
      skillTag: '',
      lastModifiedTime: '',
      lastAccessTime: '',
      showAuthorSkills: false,
      dataReceived: false,
      imgUrl: null,
      commits: [],
      commitsChecked: [],
      avgRating: 0,
      totalStar: 0,
      skillRatings: [],
      skillUsage: [],
      countryWiseSkillUsage: [],
      rating: 0,
      openSnack: false,
      snackMessage: '',
      skillFeedback: [],
      deviceUsageData: [],
      ratingsOverTime: [],
      showReportDialog: false,
      feedbackMessage: '',
      editStatus: true,
      showDeleteDialog: false,
      skillExampleCount: 4,
      seeMoreSkillExamples: true,
    };

    const clickedSkill = this.props.location.pathname.split('/')[2];
    this.skillName = clickedSkill;
    this.name = null;
    this.url = urls.API_URL + '/cms/getSkillList.json?group=Knowledge';
    if (this.url !== undefined) {
      const url = this.url;
      if (url.indexOf('model') < 0) {
        this.urlCode = `${url}?skill=${this.skillName}`;
      } else {
        this.urlCode = `${url}&skill=${this.skillName}`;
      }

      this.urlCode = this.urlCode.toString();
      this.urlCode = this.urlCode.replace('getSkillList', 'getSkill');
    }
  }

  componentDidMount() {
    document.title = `SUSI.AI - ${
      this.skillName
        ? this.skillName
            .split('_')
            .map(data => {
              const s = data.charAt(0).toUpperCase() + data.substring(1);
              return s;
            })
            .join(' ')
        : ''
    } Skills`;
    if (this.url !== undefined) {
      const baseUrl = `${urls.API_URL}/cms/getSkillMetadata.json`;

      const modelValue = 'general';
      this.groupValue = this.props.location.pathname.split('/')[1];
      this.languageValue = this.props.location.pathname.split('/')[3];

      const url = `${baseUrl}?model=${modelValue}&group=${
        this.groupValue
      }&language=${this.languageValue}&skill=${this.skillName}`;

      const userSkillRatingUrl = `${
        urls.API_URL
      }/cms/getRatingByUser.json?model=${modelValue}&group=${
        this.groupValue
      }&language=${this.languageValue}&skill=${
        this.skillName
      }&access_token=${cookies.get('loggedIn')}`;

      const skillUsageUrl = `${
        urls.API_URL
      }/cms/getSkillUsage.json?model=${modelValue}&group=${
        this.groupValue
      }&language=${this.languageValue}&skill=${this.skillName}`;

      const countryWiseSkillUsageUrl = `${
        urls.API_URL
      }/cms/getCountryWiseSkillUsage.json?model=${modelValue}&group=${
        this.groupValue
      }&language=${this.languageValue}&skill=${this.skillName}`;

      const deviceUsageUrl = `${
        urls.API_URL
      }/cms/getDeviceWiseSkillUsage.json?model=${modelValue}&group=${
        this.groupValue
      }&language=${this.languageValue}&skill=${this.skillName}`;

      const ratingOverTimeUrl = `${
        urls.API_URL
      }/cms/getRatingsOverTime.json?model=${modelValue}&group=${
        this.groupValue
      }&language=${this.languageValue}&skill=${this.skillName}`;

      $.ajax({
        url: url,
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: data => {
          this.setState({
            editStatus: data.skill_metadata.editable,
          });
          this.updateData(data.skill_metadata);
        },
      });
      // Fetch user ratings for the visited skill if logged-in
      if (cookies.get('loggedIn')) {
        $.ajax({
          url: userSkillRatingUrl,
          dataType: 'jsonp',
          jsonp: 'callback',
          crossDomain: true,
          success: data => {
            if (data.ratings) {
              this.setState({
                rating: parseInt(data.ratings.stars, 10),
              });
            }
          },
          error: e => {
            console.log(e);
          },
        });
      }
      // Fetch skill usage of the visited skill
      $.ajax({
        url: skillUsageUrl,
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'callback',
        success: data => {
          if (data.skill_usage) {
            const skillUsage = data.skill_usage.filter(
              day => day !== undefined,
            );
            this.saveSkillUsage(skillUsage);
          }
        },
        error: e => {
          this.saveSkillUsage();
        },
      });
      // Fetch country wise skill usage of the visited skill
      $.ajax({
        url: countryWiseSkillUsageUrl,
        dataType: 'json',
        crossDomain: true,
        success: data => {
          if (data.skill_usage) {
            this.saveCountryWiseSkillUsage(data.skill_usage);
          }
        },
        error: e => {
          this.saveCountryWiseSkillUsage();
        },
      });

      // Fetch device wise skill usage data
      $.ajax({
        url: deviceUsageUrl,
        dataType: 'json',
        crossDomain: true,
        success: data => {
          if (data.skill_usage) {
            this.saveDeviceUsageData(data.skill_usage);
          }
        },
        error: e => {
          this.saveDeviceUsageData();
        },
      });

      // Fetch the skill ratings over time
      $.ajax({
        url: ratingOverTimeUrl,
        dataType: 'json',
        crossDomain: true,
        success: data => {
          if (data.ratings_over_time) {
            const ratingData = data.ratings_over_time.map(item => {
              return {
                rating: item.rating,
                count: item.count,
                timestamp: parseDate(item.timestamp)
                  .split(' ')
                  .slice(2, 4)
                  .join(' '),
              };
            });
            this.saveRatingOverTime(ratingData);
          }
        },
        error: e => {
          console.log(e);
          this.saveRatingOverTime();
        },
      });

      this.getFeedback();
    }
  }

  saveSkillRatings = skillRatings => {
    // Added 10 as radix to remove warnings
    const ratings_data = [
      { name: '5.0 ⭐', value: parseInt(skillRatings.five_star, 10) || 0 },
      { name: '4.0 ⭐', value: parseInt(skillRatings.four_star, 10) || 0 },
      { name: '3.0 ⭐', value: parseInt(skillRatings.three_star, 10) || 0 },
      { name: '2.0 ⭐', value: parseInt(skillRatings.two_star, 10) || 0 },
      { name: '1.0 ⭐', value: parseInt(skillRatings.one_star, 10) || 0 },
    ];

    const avgRating = parseFloat(skillRatings.avg_star);
    this.setState({
      skillRatings: ratings_data,
      avgRating: parseFloat(avgRating.toFixed(2)),
      totalStar: parseInt(skillRatings.total_star, 10),
    });
  };

  saveSkillUsage = (skillUsage = []) => {
    // eslint-disable-next-line
    const data = skillUsage.map(usage => {
      if (usage !== null) {
        usage.count = parseInt(usage.count, 10);
        return usage;
      }
    });
    this.setState({
      skillUsage: data,
    });
  };

  saveCountryWiseSkillUsage = (countryWiseSkillUsage = []) => {
    // Add sample data to test
    const data = countryWiseSkillUsage.map(country => [
      country.country_code,
      parseInt(country.count, 10),
    ]);

    this.setState({
      countryWiseSkillUsage: data,
    });
  };

  saveSkillFeedback = (skillFeedback = []) => {
    this.setState({
      skillFeedback,
    });
  };

  saveDeviceUsageData = (deviceUsageData = []) => {
    if (deviceUsageData.length) {
      deviceUsageData.map(device => {
        switch (device.device_type) {
          case 'Web Client':
            device.color = '#0088FE';
            break;
          case 'Android':
            device.color = '#00C49F';
            break;
          case 'iOS':
            device.color = '#FFBB28';
            break;
          case 'Smart Speaker':
            device.color = '#FF8042';
            break;
          case 'Others':
            device.color = '#EA4335';
            break;
          default:
            device.color = '#673AB7';
            break;
        }
        return null;
      });
    }
    this.setState({
      deviceUsageData,
    });
  };

  // Save ratings over time data in the component state
  saveRatingOverTime = (ratingsOverTime = []) => {
    this.setState({
      ratingsOverTime,
    });
  };

  updateData = skillData => {
    if (skillData.skill_rating) {
      this.saveSkillRatings(skillData.skill_rating.stars);
    }
    let imgUrl = `${urls.API_URL}/cms/getImage.png?model=general&language=${
      this.languageValue
    }&group=${this.groupValue}&image=${skillData.image}`;
    if (!skillData.image) {
      imgUrl = '/favicon-512x512.jpg';
    }
    const descriptions =
      skillData.descriptions === null
        ? 'No Description Provided'
        : skillData.descriptions;
    const skillName =
      skillData.skill_name === null ? 'No Name Given' : skillData.skill_name;
    const {
      image,
      author,
      author_url,
      developer_privacy_policy,
      terms_of_use,
      dynamic_content,
      examples,
    } = skillData;
    this.name = skillName;
    this.setState({
      imgUrl,
      descriptions,
      skillName,
      lastModifiedTime: skillData.lastModifiedTime,
      lastAccessTime: skillData.lastAccessTime,
      dataReceived: true,
      image,
      author,
      authorUrl: author_url,
      developerPrivacyPolicy: developer_privacy_policy,
      termsOfUse: terms_of_use,
      dynamic_content,
      examples,
      languagesSupported: skillData.supported_languages,
      skillModel: skillData.model,
      skillGroup: skillData.group,
      skillLanguage: skillData.language,
      skillTag: skillData.skill_tag,
    });
  };

  changeRating = newRating => {
    const baseUrl = `${urls.API_URL}/cms/fiveStarRateSkill.json`;
    const modelValue = 'general';
    this.groupValue = this.props.location.pathname.split('/')[1];
    this.languageValue = this.props.location.pathname.split('/')[3];
    const changeRatingUrl = `${baseUrl}?model=${modelValue}&group=${
      this.groupValue
    }&language=${this.languageValue}&skill=${
      this.skillName
    }&stars=${newRating}&access_token=${cookies.get('loggedIn')}`;
    $.ajax({
      url: changeRatingUrl,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: data => {
        this.saveSkillRatings(data.ratings);
        this.setState({
          openSnack: true,
          snackMessage: 'The skill was successfully rated!',
        });
      },
      error: e => {
        console.log(e);
      },
    });

    this.setState({
      rating: parseInt(newRating, 10),
    });
  };

  handleSnackRequestClose = () => {
    this.setState({
      openSnack: false,
    });
  };

  getFeedback = () => {
    let getFeedbackUrl = `${urls.API_URL}/cms/getSkillFeedback.json`;
    const modelValue = 'general';
    this.groupValue = this.props.location.pathname.split('/')[1];
    this.languageValue = this.props.location.pathname.split('/')[3];
    getFeedbackUrl = `${getFeedbackUrl}?model=${modelValue}&group=${
      this.groupValue
    }&language=${this.languageValue}&skill=${this.skillName}`;

    // Get skill feedback of the visited skill
    $.ajax({
      url: getFeedbackUrl,
      dataType: 'jsonp',
      crossDomain: true,
      jsonp: 'callback',
      success: data => {
        this.saveSkillFeedback(data.feedback);
      },
      error: e => {
        console.log(e);
      },
    });
  };

  postFeedback = newFeedback => {
    const baseUrl = `${urls.API_URL}/cms/feedbackSkill.json`;
    const modelValue = 'general';
    this.groupValue = this.props.location.pathname.split('/')[1];
    this.languageValue = this.props.location.pathname.split('/')[3];
    const postFeedbackUrl = `${baseUrl}?model=${modelValue}&group=${
      this.groupValue
    }&language=${this.languageValue}&skill=${
      this.skillName
    }&feedback=${newFeedback}&access_token=${cookies.get('loggedIn')}`;
    $.ajax({
      url: postFeedbackUrl,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: data => {
        this.getFeedback();
      },
      error: e => {
        console.log(e);
      },
    });
  };

  deleteFeedback = () => {
    const baseUrl = `${urls.API_URL}/cms/removeFeedback.json`;
    const modelValue = 'general';
    this.groupValue = this.props.location.pathname.split('/')[1];
    this.languageValue = this.props.location.pathname.split('/')[3];
    const deleteFeedbackUrl = `${baseUrl}?model=${modelValue}&group=${
      this.groupValue
    }&language=${this.languageValue}&skill=${
      this.skillName
    }&access_token=${cookies.get('loggedIn')}`;
    $.ajax({
      url: deleteFeedbackUrl,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: data => {
        this.getFeedback();
      },
      error: e => {
        console.log(e);
      },
    });
  };

  openAuthorSkills = () => {
    const { author } = this.state;
    if (this.author) {
      this.author.loadSkillCards(author);
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
    const {
      skillGroup,
      skillTag,
      skillLanguage,
      feedbackMessage,
      skillModel,
    } = this.state;

    const reportUrl = `${
      urls.API_URL
      // eslint-disable-next-line
    }/cms/reportSkill.json?model=${skillModel}&group=${skillGroup}&language=${skillLanguage}&skill=${skillTag}&feedback=${feedbackMessage}&access_token=${cookies.get(
      'loggedIn',
    )}`;
    $.ajax({
      url: reportUrl,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: data => {
        this.handleReportToggle();
        console.log(data);
        this.setState({
          openSnack: true,
          snackMessage: 'Skill has been reported successfully.',
        });
      },
      error: e => {
        this.handleReportToggle();
        this.setState({
          openSnack: true,
          snackMessage: 'Failed to report the skill.',
        });
      },
    });
  };

  saveReportFeedback = feedbackMessage => {
    this.setState({
      feedbackMessage,
    });
  };

  handleDeleteToggle = () => {
    const { showDeleteDialog } = this.state;
    this.setState({
      showDeleteDialog: !showDeleteDialog,
    });
  };

  deleteSkill = () => {
    const { skillModel, skillGroup, skillName, skillLanguage } = this.state;
    this.setState({
      dataReceived: false,
    });

    const deleteUrl = `${
      urls.API_URL
      // eslint-disable-next-line
    }/cms/deleteSkill.json?model=${skillModel}&group=${skillGroup}&language=${skillLanguage}&skill=${skillName}&access_token=${cookies.get(
      'loggedIn',
    )}`;
    $.ajax({
      url: deleteUrl,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: data => {
        // redirect to the index page since the skill page won't be accessible
        this.handleDeleteToggle();
        this.setState({
          dataReceived: true,
        });
        this.props.history.push('/');
      },
      error: err => {
        console.log(err);
        this.handleReportToggle();
        this.setState({
          openSnack: true,
          snackMessage: 'Failed to delete the skill.',
        });
      },
    });
  };

  toggleSkillExamples = () => {
    const { seeMoreSkillExamples, examples, skillExampleCount } = this.state;
    this.setState({
      seeMoreSkillExamples: !seeMoreSkillExamples,
      skillExampleCount: skillExampleCount === 4 ? examples.length : 4,
    });
  };

  testExample = (e, exampleText) => {
    const link = `${urls.CHAT_URL}/?testExample=${exampleText}`;
    window.open(link, '_blank');
  };

  render() {
    const showAdmin = cookies.get('showAdmin');
    const {
      imgUrl,
      image,
      examples,
      dataReceived,
      skillName,
      showDeleteDialog,
      author,
      avgRating,
      totalStar,
      skillExampleCount,
      descriptions,
      dynamic_content,
      termsOfUse,
      developerPrivacyPolicy,
      lastModifiedTime,
      languagesSupported,
      showReportDialog,
      rating,
      ratingsOverTime,
      skillFeedback,
      skillUsage,
      deviceUsageData,
      countryWiseSkillUsage,
      skillRatings,
      showAuthorSkills,
      authorUrl,
      openSnack,
      snackMessage,
    } = this.state;
    let { seeMoreSkillExamples } = this.state;
    const { location } = this.props;

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
    let oldGroupValue = location.pathname.split('/')[1];
    let oldLanguageValue = location.pathname.split('/')[3];
    let oldImageValue = imgUrl;
    let imageValue = image;
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
    if (!dataReceived) {
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
                    pathname: `/${this.groupValue}/${this.skillName}/edit/${
                      this.languageValue
                    }`,
                    state: {
                      url: this.urlCode,
                      name: this.name,
                      oldExpertValue: this.skillName,
                      oldGroupValue: oldGroupValue,
                      oldLanguageValue: oldLanguageValue,
                      oldImageUrl: oldImageValue,
                      oldImageValue: imageValue,
                    },
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
                    pathname: `/${this.groupValue}/${this.skillName}/versions/${
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
              <h1 className="name">
                {this.skillName && this.skillName.split('_').join(' ')}
              </h1>
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
                  rating={avgRating}
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
                <div className="ratingLabel">{totalStar}</div>
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
                              onClick={event => this.testExample(event, data)}
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

                {dynamic_content ? (
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
                        {languagesSupported.map((data, index) => {
                          let delimiter =
                            languagesSupported.length === index + 1
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
            <SkillRatingCard
              skillName={skillName}
              skillRatings={skillRatings}
              rating={rating}
              avgRating={avgRating}
              totalStar={totalStar}
              changeRating={this.changeRating}
              ratingsOverTime={ratingsOverTime}
            />
            <SkillFeedbackCard
              skill_name={skillName}
              skill_feedback={skillFeedback}
              postFeedback={this.postFeedback}
              deleteFeedback={this.deleteFeedback}
              skill_language={this.languageValue}
            />
            <SkillUsageCard
              skillUsage={skillUsage}
              deviceUsageData={deviceUsageData}
              countryWiseSkillUsage={countryWiseSkillUsage}
            />
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
            author={author}
            authorUrl={authorUrl}
          />
        </div>
        <Snackbar
          open={openSnack}
          message={snackMessage}
          autoHideDuration={3000}
          onRequestClose={this.handleSnackRequestClose}
        />
        <Footer />
      </div>
    );
  }
}

SkillListing.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default SkillListing;
