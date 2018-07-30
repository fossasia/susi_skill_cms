import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import * as $ from 'jquery';
import {
  Legend,
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { urls } from '../../utils';

const cookies = new Cookies();

class MyAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillUsage: [],
      loading: true,
      openSnackbar: false,
      msgSnackbar: '',
      activePieIndex: 0,
    };
  }
  componentDidMount() {
    this.loadSKillsUsage();
  }

  loadSKillsUsage = () => {
    let url =
      urls.API_URL +
      `/cms/getSkillsByAuthor.json?author_email=${cookies.get('emailId')}`;
    let self = this;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        self.saveUsageData(data.author_skills || []);
        self.setState({
          loading: false,
        });
      },
      error: function(err) {
        self.setState({
          loading: false,
          openSnackbar: false,
          msgSnackbar: "Error. Couldn't fetch skill usage.",
        });
      },
    });
  };

  saveUsageData = data => {
    const skillUsage = data.map(skill => {
      let dataObject = {};
      dataObject.skill_name = skill.skill_name;
      dataObject.usage_count = skill.usage_count || 0;
      return dataObject;
    });
    this.setState({ skillUsage });
  };

  onPieEnter = (data, index) => {
    this.setState({
      activePieIndex: index,
    });
  };

  render() {
    let skillUsage = this.state.skillUsage;
    return (
      <div>
        {this.state.loading ? (
          <div className="center">
            <CircularProgress size={62} color="#4285f5" />
            <h4>Loading</h4>
          </div>
        ) : (
          <div>
            {this.state.skillUsage.length !== 0 && (
              <div className="device-usage">
                <div className="sub-title">Skill Usage Distribution</div>
                <div className="pie-chart">
                  <ResponsiveContainer width={600} height={350}>
                    <PieChart>
                      <Pie
                        activeIndex={this.state.activePieIndex}
                        activeShape={renderActiveShape}
                        data={this.state.skillUsage}
                        cx={300}
                        cy={175}
                        innerRadius={80}
                        nameKey="skill_name"
                        dataKey="usage_count"
                        outerRadius={120}
                        fill="#8884d8"
                        onMouseEnter={this.onPieEnter}
                      >
                        {this.state.skillUsage.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={
                              [
                                '#0088FE',
                                '#00C49F',
                                '#FFBB28',
                                '#FF8042',
                                '#EA4335',
                              ][index % 5]
                            }
                          />
                        ))}
                      </Pie>
                      <Legend wrapperStyle={{ position: 'relative' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        )}
        {skillUsage.length === 0 &&
          !this.state.loading && (
            <div>
              <div className="center">
                <br />
                <h2>
                  Your skill has not been used, make sure to improve your skill
                  to attract more users.
                </h2>
                <br />
              </div>
            </div>
          )}

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

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    percent,
    value,
    name,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${name}: ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

renderActiveShape.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  midAngle: PropTypes.number,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  startAngle: PropTypes.number,
  endAngle: PropTypes.number,
  fill: PropTypes.string,
  percent: PropTypes.number,
  value: PropTypes.number,
  name: PropTypes.string,
};

export default MyAnalytics;
