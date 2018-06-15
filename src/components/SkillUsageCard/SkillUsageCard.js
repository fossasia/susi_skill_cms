// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
} from 'recharts';
import { Paper } from 'material-ui';

// Static assets
import './SkillUsage.css';

class SkillUsageCard extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
  }

  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  };

  updateWindowDimensions = () => {
    this.setState({
      width: window.innerWidth * 0.8 > 800 ? 800 : window.innerWidth * 0.8,
    });
  };

  render() {
    let totalSkillUsage = 0;
    if (this.props.skill_usage) {
      totalSkillUsage = this.props.skill_usage.reduce((totalCount, day) => {
        return parseInt(totalCount, 10) + parseInt(day.count, 10);
      }, 0);
    }

    return (
      <div>
        <Paper className="margin-b-md margin-t-md">
          <h1 className="title">Skill Usage</h1>
          {totalSkillUsage > 0 ? (
            <div className="usage-section">
              <div className="skill-usage-graph">
                <LineChart
                  width={this.state.width}
                  height={300}
                  data={this.props.skill_usage}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="date" padding={{ right: 20 }} />
                  <YAxis />
                  <Tooltip wrapperStyle={{ height: '60px' }} />
                  <Legend />
                  <Line
                    name="Skill usage count"
                    type="monotone"
                    dataKey="count"
                    stroke="#82ca9d"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </div>
              {this.props.device_usage_data !== [] ? (
                <div className="device-usage">
                  <PieChart width={800} height={400}>
                    <Pie
                      data={this.props.device_usage_data}
                      cx={200}
                      cy={200}
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    />
                    <Tooltip />
                  </PieChart>
                </div>
              ) : (
                ''
              )}
              <div className="total-hits">
                <div className="large-text">{totalSkillUsage}</div>
                Hits this week
              </div>
            </div>
          ) : (
            <div className="default-message">
              No usage data available, try this skill now!
            </div>
          )}
        </Paper>
      </div>
    );
  }
}

SkillUsageCard.propTypes = {
  skill_usage: PropTypes.array,
  device_usage_data: PropTypes.array,
};

export default SkillUsageCard;
