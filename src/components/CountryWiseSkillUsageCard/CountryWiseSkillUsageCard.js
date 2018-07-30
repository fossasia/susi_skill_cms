// Packages
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { GeoChart } from 'react-chartkick';
import Table from 'material-ui/Table/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import TableRow from 'material-ui/Table/TableRow';
import { isoCountries } from '../../utils';
import './CountryWiseSkillUsageCard.css';

class CountryWiseSkillUsageCard extends PureComponent {
  getCountryName = countryCode => {
    if (isoCountries.hasOwnProperty(countryCode)) {
      return isoCountries[countryCode];
    }
  };
  countryUsageList = props => {
    return (
      <Table>
        <TableBody displayRowCheckbox={false}>
          {this.props.country_wise_skill_usage &&
            this.props.country_wise_skill_usage.map((data, id) => {
              let countryCode = data[0];
              let usage = data[1];
              let countryName = this.getCountryName(countryCode);
              return (
                <TableRow key={id}>
                  <TableRowColumn style={{ width: '70%', padding: '0' }}>
                    {countryName}:
                  </TableRowColumn>
                  <TableRowColumn
                    style={{ width: '30%', padding: '0', textAlign: 'right' }}
                  >
                    {usage}
                  </TableRowColumn>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    );
  };

  render() {
    return (
      <div className="country-usage-container">
        <div className="country-usage-graph">
          <GeoChart data={this.props.country_wise_skill_usage} />
        </div>
        <div className="country-usage-list">{this.countryUsageList()}</div>
      </div>
    );
  }
}

CountryWiseSkillUsageCard.propTypes = {
  country_wise_skill_usage: PropTypes.array,
};

export default CountryWiseSkillUsageCard;
