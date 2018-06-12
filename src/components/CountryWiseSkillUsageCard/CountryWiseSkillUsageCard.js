// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';
import { GeoChart } from 'react-chartkick'

class CountryWiseSkillUsageCard extends Component {
	render() {
		return(
			<Paper className="margin-b-md margin-t-md">
				<h1 className='title'>
					Country Wise Skill Usage
				</h1>
				<div className="skill-usage-graph">
					<GeoChart data={this.props.country_wise_skill_usage} />
				</div>
			</Paper>
		)
	}
}

CountryWiseSkillUsageCard.propTypes = {
	country_wise_skill_usage: PropTypes.array
}

export default CountryWiseSkillUsageCard;
