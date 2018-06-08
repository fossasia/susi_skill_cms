// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Paper } from 'material-ui';

class SkillUsageCard extends Component {
	render() {
		return(
			<Paper className="margin-b-md margin-t-md">
				<h1 className='title'>
					Skill Usage
				</h1>
				<div className="skill-usage-graph">
					<LineChart width={600} height={300} data={this.props.skill_usage}
							margin={{top: 5, right: 30, left: 20, bottom: 5}}>
						<XAxis dataKey="date" padding={{right: 20}} />
						<YAxis/>
						<Tooltip wrapperStyle={{height: '60px'}}/>
						<Legend />
						<Line name='Skill usage count' type="monotone" dataKey="count" stroke="#82ca9d" activeDot={{r: 8}}/>
					</LineChart>
				</div>
			</Paper>
		)
	}
}

SkillUsageCard.propTypes = {
	skill_usage: PropTypes.array
}

export default SkillUsageCard;
