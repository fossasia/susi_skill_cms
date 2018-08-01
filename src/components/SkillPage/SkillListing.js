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
import ReactTooltip from 'react-tooltip';
import { urls, colors, parseDate } from '../../utils';

import './SkillListing.css';

const cookies = new Cookies();

let urlCode, name;

class SkillListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontSizeCode: 14,
      editorTheme: 'github',
      image: '',
      author: '',
      author_url: '',
      developer_privacy_policy: '',
      terms_of_use: '',
      dynamic_content: '',
      examples: '',
      languagesSupported: [],
      descriptions: '',
      skill_name: '',
      skillTag: '',
      positive_rating: 0,
      negative_rating: 0,
      last_modified_time: '',
      last_access_time: '',
      showAuthorSkills: false,
      dataReceived: false,
      imgUrl: null,
      commits: [],
      commitsChecked: [],
      avg_rating: 0,
      total_star: 0,
      skill_ratings: [],
      skill_usage: [],
      country_wise_skill_usage: [],
      rating: 0,
      openSnack: false,
      snackMessage: '',
      skill_feedback: [],
      device_usage_data: [],
      ratings_over_time: [],
      showReportDialog: false,
      feedbackMessage: '',
      editStatus: true,
      showDeleteDialog: false,
    };

    let clickedSkill = this.props.location.pathname.split('/')[2];
    this.name = clickedSkill;
    this.url = urls.API_URL + '/cms/getSkillList.json?group=Knowledge';
    if (this.url !== undefined) {
      let url = this.url;
      if (url.indexOf('model') < 0) {
        urlCode = url + '?skill=' + this.name;
      } else {
        urlCode = url + '&skill=' + this.name;
      }

      urlCode = urlCode.toString();
      urlCode = urlCode.replace('getSkillList', 'getSkill');
      // console.log(urlCode);
    }
  }

  componentDidMount() {
    document.title = `SUSI.AI - ${
      this.name
        ? this.name
            .split('_')
            .map(data => {
              var s = data.charAt(0).toUpperCase() + data.substring(1);
              return s;
            })
            .join(' ')
        : ''
    } Skills`;
    if (this.url !== undefined) {
      let baseUrl = urls.API_URL + '/cms/getSkillMetadata.json';
      let userSkillRatingUrl = `${urls.API_URL}/cms/getRatingByUser.json`;
      let skillUsageUrl = `${urls.API_URL}/cms/getSkillUsage.json`;
      let ratingOverTimeUrl = `${urls.API_URL}/cms/getRatingsOverTime.json`;
      let deviceUsageUrl = `${urls.API_URL}/cms/getDeviceWiseSkillUsage.json`;
      let countryWiseSkillUsageUrl = `${
        urls.API_URL
      }/cms/getCountryWiseSkillUsage.json`;
      let url = this.url;

      let modelValue = 'general';
      this.groupValue = this.props.location.pathname.split('/')[1];
      this.languageValue = this.props.location.pathname.split('/')[3];
      url =
        baseUrl +
        '?model=' +
        modelValue +
        '&group=' +
        this.groupValue +
        '&language=' +
        this.languageValue +
        '&skill=' +
        this.name;
      userSkillRatingUrl =
        userSkillRatingUrl +
        '?model=' +
        modelValue +
        '&group=' +
        this.groupValue +
        '&language=' +
        this.languageValue +
        '&skill=' +
        this.name +
        '&access_token=' +
        cookies.get('loggedIn');
      skillUsageUrl =
        skillUsageUrl +
        '?model=' +
        modelValue +
        '&group=' +
        this.groupValue +
        '&language=' +
        this.languageValue +
        '&skill=' +
        this.name;
      countryWiseSkillUsageUrl =
        countryWiseSkillUsageUrl +
        '?model=' +
        modelValue +
        '&group=' +
        this.groupValue +
        '&language=' +
        this.languageValue +
        '&skill=' +
        this.name;
      deviceUsageUrl =
        deviceUsageUrl +
        '?model=' +
        modelValue +
        '&group=' +
        this.groupValue +
        '&language=' +
        this.languageValue +
        '&skill=' +
        this.name;
      ratingOverTimeUrl =
        ratingOverTimeUrl +
        '?model=' +
        modelValue +
        '&group=' +
        this.groupValue +
        '&language=' +
        this.languageValue +
        '&skill=' +
        this.name;
      // console.log('Url:' + url);
      let self = this;
      $.ajax({
        url: url,
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(data) {
          self.setState({
            editStatus: data.skill_metadata.editable,
          });
          self.updateData(data.skill_metadata);
        },
      });
      // Fetch user ratings for the visited skill if logged-in
      if (cookies.get('loggedIn')) {
        $.ajax({
          url: userSkillRatingUrl,
          dataType: 'jsonp',
          jsonp: 'callback',
          crossDomain: true,
          success: function(data) {
            if (data.ratings) {
              self.setState({
                rating: parseInt(data.ratings.stars, 10),
              });
            }
          },
          error: function(e) {
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
        success: function(data) {
          if (data.skill_usage) {
            const skillUsage = data.skill_usage.filter(
              day => day !== undefined,
            );
            self.saveSkillUsage(skillUsage);
          }
        },
        error: function(e) {
          self.saveSkillUsage();
        },
      });
      // Fetch country wise skill usage of the visited skill
      $.ajax({
        url: countryWiseSkillUsageUrl,
        dataType: 'json',
        crossDomain: true,
        success: function(data) {
          if (data.skill_usage) {
            self.saveCountryWiseSkillUsage(data.skill_usage);
          }
        },
        error: function(e) {
          self.saveCountryWiseSkillUsage();
        },
      });

      // Fetch device wise skill usage data
      $.ajax({
        url: deviceUsageUrl,
        dataType: 'json',
        crossDomain: true,
        success: function(data) {
          if (data.skill_usage) {
            self.saveDeviceUsageData(data.skill_usage);
          }
        },
        error: function(e) {
          self.saveDeviceUsageData();
        },
      });

      // Fetch the skill ratings over time
      $.ajax({
        url: ratingOverTimeUrl,
        dataType: 'json',
        crossDomain: true,
        success: function(data) {
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
            self.saveRatingOverTime(ratingData);
          }
        },
        error: function(e) {
          console.log(e);
          self.saveRatingOverTime();
        },
      });

      this.getFeedback();
    }
  }

  saveSkillRatings = skill_ratings => {
    // Added 10 as radix to remove warnings
    const ratings_data = [
      { name: '5.0 ⭐', value: parseInt(skill_ratings.five_star, 10) || 0 },
      { name: '4.0 ⭐', value: parseInt(skill_ratings.four_star, 10) || 0 },
      { name: '3.0 ⭐', value: parseInt(skill_ratings.three_star, 10) || 0 },
      { name: '2.0 ⭐', value: parseInt(skill_ratings.two_star, 10) || 0 },
      { name: '1.0 ⭐', value: parseInt(skill_ratings.one_star, 10) || 0 },
    ];

    let avg_rating = parseFloat(skill_ratings.avg_star);
    this.setState({
      skill_ratings: ratings_data,
      avg_rating: parseFloat(avg_rating.toFixed(2)),
      total_star: parseInt(skill_ratings.total_star, 10),
    });
  };

  saveSkillUsage = (skill_usage = []) => {
    // eslint-disable-next-line
    let data = skill_usage.map(usage => {
      if (usage !== null) {
        usage.count = parseInt(usage.count, 10);
        return usage;
      }
    });
    this.setState({
      skill_usage: data,
    });
  };

  saveCountryWiseSkillUsage = (country_wise_skill_usage = []) => {
    // Add sample data to test
    let data = country_wise_skill_usage.map(country => [
      country.country_code,
      parseInt(country.count, 10),
    ]);

    this.setState({
      country_wise_skill_usage: data,
    });
  };

  saveSkillFeedback = (skill_feedback = []) => {
    this.setState({
      skill_feedback,
    });
  };

  saveDeviceUsageData = (device_usage_data = []) => {
    if (device_usage_data.length) {
      device_usage_data.map(device => {
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
      device_usage_data,
    });
  };

  // Save ratings over time data in the component state
  saveRatingOverTime = (ratings_over_time = []) => {
    this.setState({
      ratings_over_time,
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
    let descriptions =
      skillData.descriptions === null
        ? 'No Description Provided'
        : skillData.descriptions;
    let skill_name =
      skillData.skill_name === null ? 'No Name Given' : skillData.skill_name;
    let {
      image,
      author,
      author_url,
      developer_privacy_policy,
      terms_of_use,
      dynamic_content,
      examples,
    } = skillData;
    name = skill_name;
    this.setState({
      imgUrl,
      descriptions,
      skill_name,
      last_modified_time: skillData.lastModifiedTime,
      last_access_time: skillData.lastAccessTime,
      dataReceived: true,
      image,
      author,
      author_url,
      developer_privacy_policy,
      terms_of_use,
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
    let baseUrl = urls.API_URL + '/cms/fiveStarRateSkill.json';
    let modelValue = 'general';
    this.groupValue = this.props.location.pathname.split('/')[1];
    this.languageValue = this.props.location.pathname.split('/')[3];
    let changeRatingUrl =
      baseUrl +
      '?model=' +
      modelValue +
      '&group=' +
      this.groupValue +
      '&language=' +
      this.languageValue +
      '&skill=' +
      this.name +
      '&stars=' +
      newRating +
      '&access_token=' +
      cookies.get('loggedIn');
    // console.log('Url:' + url);
    let self = this;
    $.ajax({
      url: changeRatingUrl,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        self.saveSkillRatings(data.ratings);
        self.setState({
          openSnack: true,
          snackMessage: 'The skill was successfully rated!',
        });
      },
      error: function(e) {
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
    let modelValue = 'general';
    this.groupValue = this.props.location.pathname.split('/')[1];
    this.languageValue = this.props.location.pathname.split('/')[3];
    getFeedbackUrl =
      getFeedbackUrl +
      '?model=' +
      modelValue +
      '&group=' +
      this.groupValue +
      '&language=' +
      this.languageValue +
      '&skill=' +
      this.name;

    let self = this;
    // Get skill feedback of the visited skill
    $.ajax({
      url: getFeedbackUrl,
      dataType: 'jsonp',
      crossDomain: true,
      jsonp: 'callback',
      success: function(data) {
        self.saveSkillFeedback(data.feedback);
      },
      error: function(e) {
        console.log(e);
      },
    });
  };

  postFeedback = newFeedback => {
    let baseUrl = urls.API_URL + '/cms/feedbackSkill.json';
    let modelValue = 'general';
    this.groupValue = this.props.location.pathname.split('/')[1];
    this.languageValue = this.props.location.pathname.split('/')[3];
    let postFeedbackUrl =
      baseUrl +
      '?model=' +
      modelValue +
      '&group=' +
      this.groupValue +
      '&language=' +
      this.languageValue +
      '&skill=' +
      this.name +
      '&feedback=' +
      newFeedback +
      '&access_token=' +
      cookies.get('loggedIn');
    let self = this;
    $.ajax({
      url: postFeedbackUrl,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        self.getFeedback();
      },
      error: function(e) {
        console.log(e);
      },
    });
  };

  deleteFeedback = () => {
    let baseUrl = urls.API_URL + '/cms/removeFeedback.json';
    let modelValue = 'general';
    this.groupValue = this.props.location.pathname.split('/')[1];
    this.languageValue = this.props.location.pathname.split('/')[3];
    let deleteFeedbackUrl =
      baseUrl +
      '?model=' +
      modelValue +
      '&group=' +
      this.groupValue +
      '&language=' +
      this.languageValue +
      '&skill=' +
      this.name +
      '&access_token=' +
      cookies.get('loggedIn');
    let self = this;
    $.ajax({
      url: deleteFeedbackUrl,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        self.getFeedback();
      },
      error: function(e) {
        console.log(e);
      },
    });
  };

  openAuthorSkills = () => {
    if (this.author) {
      this.author.loadSkillCards(this.state.author);
      this.setState({ showAuthorSkills: true });
    }
  };

  closeAuthorSkills = () => {
    this.setState({ showAuthorSkills: false });
  };

  handleReportToggle = () => {
    this.setState({
      showReportDialog: !this.state.showReportDialog,
    });
  };

  handleReportSubmit = () => {
    let reportUrl = `${urls.API_URL}/cms/reportSkill.json?model=${
      this.state.skillModel
    }&group=${this.state.skillGroup}&language=${
      this.state.skillLanguage
    }&skill=${this.state.skillTag}&feedback=${
      this.state.feedbackMessage
    }&access_token=${cookies.get('loggedIn')}`;
    let self = this;
    $.ajax({
      url: reportUrl,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        self.handleReportToggle();
        console.log(data);
        self.setState({
          openSnack: true,
          snackMessage: 'Skill has been reported successfully.',
        });
      },
      error: function(e) {
        self.handleReportToggle();
        self.setState({
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
    this.setState({
      showDeleteDialog: !this.state.showDeleteDialog,
    });
  };

  deleteSkill = () => {
    this.setState({
      dataReceived: false,
    });
    let deleteUrl =
      `${urls.API_URL}/cms/deleteSkill.json?` +
      'model=' +
      this.state.skillModel +
      '&group=' +
      this.state.skillGroup +
      '&language=' +
      this.state.skillLanguage +
      '&skill=' +
      this.state.skill_name +
      '&access_token=' +
      cookies.get('loggedIn');
    $.ajax({
      url: deleteUrl,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        // redirect to the index page since the skill page won't be accessible
        this.handleDeleteToggle();
        this.setState({
          dataReceived: true,
        });
        this.props.history.push('/');
      }.bind(this),
      error: function(err) {
        console.log(err);
        this.handleReportToggle();
        this.setState({
          openSnack: true,
          snackMessage: 'Failed to delete the skill.',
        });
      }.bind(this),
    });
  };

  testExample = (e, exampleText) => {
    let link = urls.CHAT_URL + '/?testExample=' + exampleText;
    window.open(link, '_blank');
  };

  render() {
    const authorStyle = {
      cursor: 'pointer',
      textTransform: 'capitalize',
    };

    const styles = {
      home: {
        width: '100%',
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
    };

    const reportDialogActions = [
      <FlatButton
        label="Cancel"
        key="cancel"
        style={{ color: 'rgb(66, 133, 244)' }}
        onClick={this.handleReportToggle}
      />,
      <FlatButton
        label="Submit"
        key="submit"
        style={{ color: 'rgb(66, 133, 244)' }}
        onClick={this.handleReportSubmit}
      />,
    ];

    const deleteDialogActions = [
      <FlatButton
        label="Delete"
        key="delete"
        style={{ color: 'rgb(66, 133, 244)' }}
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
    let oldGroupValue = this.props.location.pathname.split('/')[1];
    let oldLanguageValue = this.props.location.pathname.split('/')[3];
    let oldImageValue = this.state.imgUrl;
    let imageValue = this.state.image;
    if (!this.state.dataReceived) {
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
              {this.state.image == null ? (
                <CircleImage
                  name={this.state.skill_name.toUpperCase()}
                  size="250"
                />
              ) : (
                <img
                  className="avatar-img"
                  alt="Thumbnail"
                  src={this.state.imgUrl}
                />
              )}
            </div>
            <div className="linkButtons">
              {cookies.get('showAdmin') ? (
                <div className="skillDeleteBtn">
                  <FloatingActionButton
                    onClick={this.handleDeleteToggle}
                    data-tip="Delete Skill"
                    backgroundColor={colors.header}
                  >
                    <DeleteBtn />
                  </FloatingActionButton>
                  <ReactTooltip effect="solid" place="bottom" />
                  <Dialog
                    title="Delete Skill"
                    actions={deleteDialogActions}
                    modal={false}
                    open={this.state.showDeleteDialog}
                    onRequestClose={this.handleDeleteToggle}
                  >
                    <div>
                      Are you sure about deleting{' '}
                      <span style={{ fontWeight: 'bold' }}>
                        {this.state.skill_name}
                      </span>?
                    </div>
                  </Dialog>
                </div>
              ) : (
                ''
              )}
              <div>
                <Link
                  to={{
                    pathname:
                      '/' +
                      this.groupValue +
                      '/' +
                      this.name +
                      '/edit/' +
                      this.languageValue,
                    state: {
                      url: urlCode,
                      name: name,
                      oldExpertValue: this.name,
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
                    pathname:
                      '/' +
                      this.groupValue +
                      '/' +
                      this.name +
                      '/versions/' +
                      this.languageValue,
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
                {this.name && this.name.split('_').join(' ')}
              </h1>
              <h4>
                by{' '}
                <span style={authorStyle} onClick={this.openAuthorSkills}>
                  {this.state.author}
                </span>
              </h4>
              <a className="singleRating" href="#rating">
                <Ratings
                  rating={this.state.avg_rating}
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
                <div className="ratingLabel">{this.state.total_star}</div>
              </a>
              <div className="avatar-meta margin-b-md">
                <div className="example-container">
                  {typeof this.state.examples === 'undefined' ||
                  this.state.examples === null ||
                  typeof this.state.examples[
                    Object.keys(this.state.examples)[0]
                  ] === 'undefined'
                    ? ''
                    : this.state.examples.map((data, index) => {
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
              </div>
            </div>
            <Paper className="margin-b-md margin-t-md">
              <div className="desc margin-b-md margin-t-md">
                <h1 className="title">Description</h1>
                <p className="card-content">{this.state.descriptions}</p>

                {this.state.dynamic_content ? (
                  <div className="card-content">
                    <ul>
                      <li>
                        This skill contains dynamic content that is updated in
                        real time based on inputs from the user.
                      </li>
                    </ul>
                  </div>
                ) : null}

                {this.state.terms_of_use == null ? (
                  ''
                ) : (
                  <div className="card-content">
                    <ul>
                      <li>
                        <a
                          href={this.state.terms_of_use}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Terms & Conditions
                        </a>
                      </li>
                    </ul>
                  </div>
                )}

                {this.state.terms_of_use == null ? (
                  ''
                ) : (
                  <div className="card-content">
                    <ul>
                      <li>
                        <a
                          href={this.state.developer_privacy_policy}
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
                      <td>{` ${parseDate(this.state.last_modified_time)}`}</td>
                    </tr>
                    <tr>
                      <td>Languages supported:</td>
                      <td>
                        {this.state.languagesSupported.map((data, index) => {
                          let delimiter =
                            this.state.languagesSupported.length === index + 1
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
                          open={this.state.showReportDialog}
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
              skillName={this.state.skill_name}
              skillRatings={this.state.skill_ratings}
              rating={this.state.rating}
              avgRating={this.state.avg_rating}
              totalStar={this.state.total_star}
              changeRating={this.changeRating}
              ratingsOverTime={this.state.ratings_over_time}
            />
            <SkillFeedbackCard
              skill_name={this.state.skill_name}
              skill_feedback={this.state.skill_feedback}
              postFeedback={this.postFeedback}
              deleteFeedback={this.deleteFeedback}
              skill_language={this.languageValue}
            />
            <SkillUsageCard
              skill_usage={this.state.skill_usage}
              device_usage_data={this.state.device_usage_data}
              country_wise_skill_usage={this.state.country_wise_skill_usage}
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
            open={this.state.showAuthorSkills}
            requestClose={this.closeAuthorSkills}
            author={this.state.author}
            authorUrl={this.state.author_url}
          />
        </div>
        <Snackbar
          open={this.state.openSnack}
          message={this.state.snackMessage}
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
