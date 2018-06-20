// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GeoChart } from 'react-chartkick';

class CountryWiseSkillUsageCard extends Component {
  render() {
    return (
      <div>
        <div className="country-usage-graph">
          <GeoChart data={this.props.country_wise_skill_usage} />
        </div>
      </div>
    );
  }
}

CountryWiseSkillUsageCard.propTypes = {
  country_wise_skill_usage: PropTypes.array,
};

export default CountryWiseSkillUsageCard;
