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
import { FloatingActionButton, Paper } from 'material-ui';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import Chip from 'material-ui/Chip';

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
import ReactTooltip from 'react-tooltip';
import colors from '../../Utils/colors';
import urls from '../../Utils/urls';
import { parseDate } from '../../Utils/helperFunctions';

import './SkillListing.css';

const cookies = new Cookies();

const defaultNullSkillList = [
  'image',
  'author',
  'author_url',
  'developer_privacy_policy',
  'terms_of_use',
  'dynamic_content',
  'examples',
];
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
      descriptions: '',
      skill_name: '',
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
      show_all_feedback: false,
    };

    let clickedSkill = this.props.location.pathname.split('/')[2];
    this.name = clickedSkill;
    this.url = urls.API_URL + '/cms/getSkillList.json?group=Knowledge';
    if (this.url !== undefined) {
      let url = this.url;
      this.name = clickedSkill;
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
    if (this.url !== undefined) {
      let baseUrl = urls.API_URL + '/cms/getSkillMetadata.json';
      let userSkillRatingUrl = `${urls.API_URL}/cms/getRatingByUser.json`;
      let skillUsageUrl = `${urls.API_URL}/cms/getSkillUsage.json`;
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
      // console.log('Url:' + url);
      let self = this;
      $.ajax({
        url: url,
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(data) {
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
            self.saveSkillUsage(data.skill_usage);
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
      country.country_name,
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
    this.setState({
      device_usage_data,
    });
  };

  updateData = skillData => {
    if (skillData.skill_rating) {
      this.saveSkillRatings(skillData.skill_rating.stars);
    }
    let imgUrl = `https://raw.githubusercontent.com/fossasia/susi_skill_data/master/models/general/${
      this.groupValue
    }/${this.languageValue}/${skillData.image}`;
    if (!skillData.image) {
      imgUrl =
        'https://pbs.twimg.com/profile_images/904617517489979392/6Hff65Th.jpg';
    }
    this.setState({
      imgUrl,
    });

    defaultNullSkillList.forEach(data => {
      this.setState({
        [data]: skillData[data],
      });
    });

    let descriptions =
      skillData.descriptions === null
        ? 'No Description Provided'
        : skillData.descriptions;
    this.setState({
      descriptions,
    });

    let skill_name =
      skillData.skill_name === null ? 'No Name Given' : skillData.skill_name;
    this.setState({
      skill_name,
    });
    name = skill_name;
    this.setState({
      last_modified_time: skillData.lastModifiedTime,
      last_access_time: skillData.lastAccessTime,
    });
    this.setState({
      dataReceived: true,
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
        !self.state.show_all_feedback
          ? self.saveSkillFeedback(data.feedback.slice(0, 5))
          : self.saveSkillFeedback(data.feedback);
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

  toggleShowAll = () => {
    this.setState(
      {
        show_all_feedback: !this.state.show_all_feedback,
      },
      this.getFeedback(),
    );
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

  testExample = (e, exampleText) => {
    let link = 'https://chat.susi.ai/?testExample=' + exampleText;
    window.open(link, '_blank');
  };

  render() {
    const authorStyle = {
      cursor: 'pointer',
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
      chip: {
        margin: '6px 6px 6px 0',
        border: '1px solid #ccc',
        cursor: 'pointer',
      },
      chipLabel: {
        fontWeight: 500,
      },
    };
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
            <div className="meta">
              <h1 className="name">
                {name &&
                  name
                    .split(' ')
                    .map(data => {
                      var s = data.charAt(0).toUpperCase() + data.substring(1);
                      return s;
                    })
                    .join(' ')}
              </h1>
              <h4>
                author:{' '}
                <span style={authorStyle} onClick={this.openAuthorSkills}>
                  {this.state.author}
                </span>
              </h4>
              <div className="avatar-meta margin-b-md">
                <div className="examples">
                  {typeof this.state.examples === 'undefined' ||
                  this.state.examples === null ||
                  typeof this.state.examples[
                    Object.keys(this.state.examples)[0]
                  ] === 'undefined'
                    ? ''
                    : this.state.examples.map((data, index) => {
                        return (
                          <Chip
                            key={index}
                            style={styles.chip}
                            labelStyle={styles.chipLabel}
                            backgroundColor={'#FFFFFF'}
                            onClick={event => this.testExample(event, data)}
                          >
                            {data}
                          </Chip>
                        );
                      })}
                </div>
              </div>
            </div>
            <Divider />
            <Paper className="margin-b-md margin-t-md">
              <div className="desc margin-b-md margin-t-md">
                <h1 className="title">Description</h1>
                <p className="card-content">{this.state.descriptions}</p>
                <div className="card-content">
                  <ul>
                    {this.state.dynamic_content ? (
                      <li>
                        The Skill Contains content Dynamic Content that is
                        updated real-time based on inputs from the User.
                      </li>
                    ) : (
                      <li>Skill details are not available yet.</li>
                    )}

                    {this.state.terms_of_use == null ? (
                      ''
                    ) : (
                      <li>
                        <a
                          href={this.state.terms_of_use}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Term & Condition
                        </a>
                      </li>
                    )}

                    {this.state.terms_of_use == null ? (
                      ''
                    ) : (
                      <li>
                        <a
                          href={this.state.developer_privacy_policy}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Developer Privacy Policy
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </Paper>
            <Paper className="margin-b-md margin-t-md">
              <div className="desc margin-b-md margin-t-md">
                <h1 className="title">Information</h1>
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
                      <td>Report: </td>
                      <td>
                        <Link to="/Report">Flag as inappropriate</Link>
                      </td>
                    </tr>
                    <tr>
                      <td>Content Rating: </td> <td>4+ age</td>
                    </tr>
                  </table>
                </div>
              </div>
            </Paper>
            <SkillRatingCard
              skill_name={this.state.skill_name}
              skill_ratings={this.state.skill_ratings}
              rating={this.state.rating}
              avg_rating={this.state.avg_rating}
              total_star={this.state.total_star}
              changeRating={this.changeRating}
            />
            <SkillFeedbackCard
              skill_name={this.state.skill_name}
              skill_feedback={this.state.skill_feedback}
              postFeedback={this.postFeedback}
              deleteFeedback={this.deleteFeedback}
              toggleShowAll={this.toggleShowAll}
              show_all_feedback={this.state.show_all_feedback}
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
      <div>
        <div>{renderElement}</div>
        <div>
          <AuthorSkills
            ref={c => {
              this.author = c;
            }}
            open={this.state.showAuthorSkills}
            close={this.closeAuthorSkills}
            author={this.state.author}
            authorUrl={this.state.author_url}
          />
        </div>
        <Snackbar
          open={this.state.openSnack}
          message={this.state.snackMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackRequestClose}
        />
      </div>
    );
  }
}

SkillListing.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default SkillListing;
