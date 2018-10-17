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
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';

const entriesPerPage = 5;

class CountryWiseSkillUsageCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listCountries: this.props.countryWiseSkillUsage
        ? this.props.countryWiseSkillUsage.slice(0, 5)
        : [],
      listOffset: 0,
      listPage: 1,
      countries: this.props.countryWiseSkillUsage,
    };
  }
  getCountryName = countryCode => {
    if (isoCountries.hasOwnProperty(countryCode)) {
      return isoCountries[countryCode];
    }
  };

  handlePageChange = (event, index, value) => {
    if (value !== undefined) {
      let listPage = value;
      let listOffset = entriesPerPage * (listPage - 1);
      let { countries } = this.state;
      this.setState({
        listPage,
        listOffset,
        listCountries: countries.slice(listOffset, listOffset + entriesPerPage),
      });
    }
  };

  handleNavigationForward = () => {
    let listPage = this.state.listPage + 1;
    let listOffset = this.state.listOffset + entriesPerPage;
    this.setState({
      listPage,
      listOffset,
      listCountries: this.state.countries.slice(
        listOffset,
        listOffset + entriesPerPage,
      ),
    });
  };
  handleNavigationBackward = () => {
    let listPage = this.state.listPage - 1;
    let listOffset = this.state.listOffset - entriesPerPage;
    this.setState({
      listPage,
      listOffset,
      listCountries: this.state.countries.slice(
        listOffset,
        this.state.listOffset,
      ),
    });
  };

  countryUsageList = () => {
    const { countryWiseSkillUsage } = this.props;
    let renderCountryCountElement = '';
    if (this.state.countries.length > 0) {
      renderCountryCountElement = (
        <span className="page-number-container">
          {this.state.listOffset === 0 ? 0 : this.state.listOffset + 1}-
          {this.state.countries.length < this.state.listOffset + entriesPerPage
            ? this.state.countries.length
            : this.state.listOffset + entriesPerPage}{' '}
          out of {this.state.countries.length}
        </span>
      );
    } else {
      renderCountryCountElement = <span>No country wise usage found</span>;
    }
    return (
      <div>
        <Table>
          <TableBody displayRowCheckbox={false}>
            {countryWiseSkillUsage &&
              this.state.listCountries.map((data, id) => {
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
        <div id={'pageNavigation'}>
          {renderCountryCountElement}
          {this.state.countries.length > entriesPerPage && (
            <div>
              <FloatingActionButton
                disabled={this.state.listPage === 1}
                style={{ marginRight: 5, height: 30, width: 30 }}
                iconStyle={{ height: 30, width: 30 }}
                backgroundColor="#4285f4"
                onClick={this.handleNavigationBackward}
              >
                <NavigationArrowBack style={{ padding: '5px' }} />
              </FloatingActionButton>
              <FloatingActionButton
                disabled={
                  this.state.listPage ===
                  Math.ceil(this.state.countries.length / entriesPerPage)
                }
                style={{ marginRight: 5, height: 30, width: 30 }}
                iconStyle={{ height: 30, width: 30 }}
                backgroundColor="#4285f4"
                onClick={this.handleNavigationForward}
              >
                <NavigationArrowForward style={{ padding: '5px' }} />
              </FloatingActionButton>
            </div>
          )}
        </div>
      </div>
    );
  };

  render() {
    const { countryWiseSkillUsage } = this.props;
    return (
      <div>
        {countryWiseSkillUsage && countryWiseSkillUsage.length ? (
          <div className="country-usage-container">
            <div className="country-usage-graph">
              <GeoChart data={countryWiseSkillUsage} />
            </div>
            <div className="country-usage-list">{this.countryUsageList()}</div>
          </div>
        ) : (
          <div className="unavailable-message">
            Country wise usage distribution is not available.
          </div>
        )}
      </div>
    );
  }
}

CountryWiseSkillUsageCard.propTypes = {
  countryWiseSkillUsage: PropTypes.array,
};

export default CountryWiseSkillUsageCard;
