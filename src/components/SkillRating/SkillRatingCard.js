// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

export default class SkillRatingCard extends Component {
  static propTypes = {
    skillName: PropTypes.string,
    skillRatings: PropTypes.array,
    rating: PropTypes.number,
    avgRating: PropTypes.number,
    totalStar: PropTypes.number,
    changeRating: PropTypes.func,
    ratingsOverTime: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      chartWidth: 0,
      ratingsOverTimeWidth: 0,
      offset: 0,
    };
  }

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
    switch (this.props.rating) {
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
    const {
      skillName,
      rating,
      changeRating,
      totalStar,
      avgRating,
      skillRatings,
      ratingsOverTime,
    } = this.props;

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
                Rate your experience with {skillName} on SUSI.AI{' '}
              </div>
              <div className="ratings-section">
                <div>
                  <Ratings
                    rating={rating}
                    widgetRatedColors="#ffbb28"
                    widgetHoverColors="#ffbb28"
                    widgetDimensions="50px"
                    changeRating={changeRating}
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
          {totalStar ? (
            <div className="ratings-section">
              <div className="average">
                <div className="large-text">{avgRating || 0}</div>
                Average Rating
              </div>
              <div className="rating-bar-chart">
                <ResponsiveContainer width={chartWidth} height={200}>
                  <BarChart
                    layout="vertical"
                    margin={{ right: 48 }}
                    data={skillRatings}
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
                      {skillRatings.map((entry, index) => (
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
                <div className="large-text">{totalStar || 0}</div>
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
