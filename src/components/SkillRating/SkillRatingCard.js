// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import skillActions from '../../redux/actions/skill';
import uiActions from '../../redux/actions/ui';

// Components
import {
  BarChart,
  Cell,
  LabelList,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Ratings from 'react-ratings-declarative';
import Cookies from 'universal-cookie';

// Material-UI
import { Paper } from 'material-ui';

// CSS
import './SkillRatingCard.css';

const cookies = new Cookies();

class SkillRatingCard extends Component {
  static propTypes = {
    skillTag: PropTypes.string,
    skillRatings: PropTypes.object,
    language: PropTypes.string,
    group: PropTypes.string,
    ratingsOverTime: PropTypes.array,
    userRating: PropTypes.number,
    actions: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      chartWidth: 0,
      ratingsOverTimeWidth: 0,
      offset: 0,
    };
  }

  changeRating = userRating => {
    const { group, language, skillTag: skill, actions } = this.props;
    const skillData = {
      model: 'general',
      group,
      language,
      skill,
      stars: userRating,
    };
    actions
      .setUserRating({ userRating: userRating })
      .then(payload => {
        actions.openSnackBar({
          snackBarMessage: 'The skill was successfully rated!',
          snackBarDuration: 4000,
        });
        actions
          .getSkillRating(skillData)
          .then(response => {})
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  };

  updateWindowDimensions = () => {
    const windowWidth = window.innerWidth;
    this.setState({
      chartWidth: windowWidth * 0.8 > 500 ? 400 : windowWidth * 0.8,
      ratingsOverTimeWidth: windowWidth * 0.8 > 800 ? 800 : windowWidth * 0.8,
      /* eslint-disable no-nested-ternary */
      offset:
        windowWidth * 0.8 > 500
          ? 305
          : windowWidth > 400
            ? windowWidth * 0.6
            : windowWidth * 0.55,
      /* eslint-enable no-nested-ternary */
    });
  };

  getRatingMessage = () => {
    const { userRating } = this.props;
    switch (userRating) {
      case 0:
        return 'The skill has not been rated by you';
      case 1:
        return 'Hated it';
      case 2:
        return 'Disliked it';
      case 3:
        return "It's OK";
      case 4:
        return 'Liked it';
      case 5:
        return 'Loved it';
      default:
        return '';
    }
  };

  roundOffRating = ratingsOverTime => {
    ratingsOverTime = ratingsOverTime.map(obj => {
      return { ...obj, rating: parseFloat(obj.rating.toFixed(1)) };
    });
    return ratingsOverTime;
  };

  render() {
    const { chartWidth, ratingsOverTimeWidth, offset } = this.state;
    const { skillTag, userRating, skillRatings, ratingsOverTime } = this.props;
    const ratings_data = [
      { name: '5.0 ⭐', value: parseInt(skillRatings.fiveStar, 10) || 0 },
      { name: '4.0 ⭐', value: parseInt(skillRatings.fourStar, 10) || 0 },
      { name: '3.0 ⭐', value: parseInt(skillRatings.threeStar, 10) || 0 },
      { name: '2.0 ⭐', value: parseInt(skillRatings.twoStar, 10) || 0 },
      { name: '1.0 ⭐', value: parseInt(skillRatings.oneStar, 10) || 0 },
    ];
    return (
      <div>
        <Paper className="margin-b-md margin-t-md">
          <h1 className="title" id="rating">
            Ratings
          </h1>
          {cookies.get('loggedIn') && (
            <div>
              <div className="subTitle">
                {' '}
                Rate your experience with {skillTag} on SUSI.AI{' '}
              </div>
              <div className="ratings-section">
                <div>
                  <Ratings
                    rating={userRating}
                    widgetRatedColors="#ffbb28"
                    widgetHoverColors="#ffbb28"
                    widgetDimensions="50px"
                    changeRating={this.changeRating}
                  >
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                  </Ratings>
                </div>
              </div>
              <div className="rating-message">{this.getRatingMessage()}</div>
            </div>
          )}
          {skillRatings.totalStar ? (
            <div className="ratings-section">
              <div className="average">
                <div className="large-text">
                  {parseFloat(skillRatings.avgStar.toFixed(2)) || 0}
                </div>
                Average Rating
              </div>
              <div className="rating-bar-chart">
                <ResponsiveContainer width={chartWidth} height={200}>
                  <BarChart
                    layout="vertical"
                    margin={{ right: 48 }}
                    data={ratings_data}
                  >
                    <XAxis type="number" hide={true} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={false}
                      wrapperStyle={{
                        height: '30px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    />
                    <Bar
                      name="Skill Rating"
                      background={true}
                      barSize={32}
                      maxBarSize={100}
                      dataKey="value"
                    >
                      <LabelList
                        position="insideLeft"
                        offset={offset}
                        fill="#666666"
                      />
                      {ratings_data.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={
                            [
                              '#81C784',
                              '#AED581',
                              '#FFF176',
                              '#FFB74D',
                              '#E57373',
                            ][index % 5]
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="total-rating">
                <div className="large-text">{skillRatings.totalStar || 0}</div>
                Total Ratings
              </div>
              <div className="time-chart">
                <div className="sub-title" style={{ alignSelf: 'flex-start' }}>
                  Rating over time
                </div>
                {ratingsOverTime.length ? (
                  <div>
                    <ResponsiveContainer
                      height={300}
                      width={ratingsOverTimeWidth}
                      debounce={1}
                    >
                      <LineChart data={this.roundOffRating(ratingsOverTime)}>
                        <XAxis dataKey="timestamp" padding={{ right: 20 }} />
                        <YAxis
                          dataKey="rating"
                          type="number"
                          domain={[0, 5]}
                          ticks={[0, 1, 2, 3, 4, 5]}
                        />
                        <Tooltip wrapperStyle={{ height: '60px' }} />
                        <Legend />
                        <Line
                          name="Average rating"
                          type="monotone"
                          dataKey="rating"
                          stroke="#82ca9d"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div>No ratings data over time is present.</div>
                )}
              </div>
            </div>
          ) : (
            <div className="ratings-default-message">
              No ratings data available yet, be the first to rate this skill!
            </div>
          )}
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    language: store.skill.metaData.language,
    group: store.skill.metaData.group,
    skillTag: store.skill.metaData.skillTag,
    skillRatings: store.skill.metaData.skillRatings,
    ratingsOverTime: store.skill.ratingsOverTime,
    userRating: store.skill.userRating,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...uiActions, ...skillActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SkillRatingCard);
