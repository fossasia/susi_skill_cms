import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import Info from 'material-ui/svg-icons/action/info';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

class UIView extends Component {
  constructor(props) {
    super(props);
    let code = '';
    if (this.props.configure) {
      code = this.props.configure.code;
    }
    this.state = {
      tableData: [],
      code,
      myDevices: false, // use chatbot in your devices
      publicDevices: false, // allow chatbot to be used in other people's devices
      includeSusiSkills: true,
    };
  }

  componentDidMount = () => {
    this.generateUIData();
  };

  generateUIData = () => {
    const enableDefaultSkillsMatch = this.state.code.match(
      /^::enable_default_skills\s(.*)$/m,
    );
    if (enableDefaultSkillsMatch) {
      let includeSusiSkills = false;
      if (enableDefaultSkillsMatch[1] === 'yes') {
        includeSusiSkills = true;
      }
      this.setState({
        includeSusiSkills,
      });
    }

    const enableOnDeviceMatch = this.state.code.match(
      /^::enable_bot_in_my_devices\s(.*)$/m,
    );
    if (enableOnDeviceMatch) {
      let myDevices = false;
      if (enableOnDeviceMatch[1] === 'yes') {
        myDevices = true;
      }
      this.setState({
        myDevices,
      });
    }

    const enableOtherUserDeviceMatch = this.state.code.match(
      /^::enable_bot_for_other_users\s(.*)$/m,
    );
    if (enableOtherUserDeviceMatch) {
      let publicDevices = false;
      if (enableOtherUserDeviceMatch[1] === 'yes') {
        publicDevices = true;
      }
      this.setState({
        publicDevices,
      });
    }

    let tableData = this.state.tableData;
    tableData = [];
    let newCode = this.state.code;
    let websiteData = newCode
      .split('::sites_enabled')[1]
      .split('::sites_disabled');
    let enabledSites = websiteData[0].split(',');
    let noOfEnabledSites = enabledSites.length;
    let disabledSites = websiteData[1].split('\n')[0].split(',');
    let noOfDisabledSites = disabledSites.length;
    for (let i = 1; i <= noOfEnabledSites + noOfDisabledSites; i++) {
      tableData[i - 1] = {
        id: i.toString(),
        name:
          i <= noOfEnabledSites
            ? enabledSites[i - 1].trim()
            : disabledSites[i - noOfEnabledSites - 1].trim(),
        last: 'Feb 19, 2018 13:00 hrs',
        status: i <= noOfEnabledSites ? 1 : 2,
      };
    }
    this.setState({
      tableData: tableData,
    });
  };

  handleOpenLastActiveInfo = () => {
    this.setState({ lastActiveInfo: true });
  };

  handleCloseLastActiveInfo = () => {
    this.setState({ lastActiveInfo: false });
  };

  handleChangeIncludeSusiSkills = () => {
    let value = !this.state.includeSusiSkills;
    let code = this.state.code;
    code = code.replace(
      /^::enable_default_skills\s(.*)$/m,
      `::enable_default_skills ${value ? 'yes' : 'no'}`,
    );
    this.setState(
      {
        includeSusiSkills: value,
        code,
      },
      () => this.sendInfoToProps(),
    );
  };

  handleChangeIncludeInMyDevices = () => {
    let value = !this.state.myDevices;
    let code = this.state.code;
    code = code.replace(
      /^::enable_bot_in_my_devices\s(.*)$/m,
      `::enable_bot_in_my_devices ${value ? 'yes' : 'no'}`,
    );
    this.setState(
      {
        myDevices: value,
        code,
      },
      () => this.sendInfoToProps(),
    );
  };

  handleChangeIncludeInPublicDevices = () => {
    let value = !this.state.publicDevices;
    let code = this.state.code;
    code = code.replace(
      /^::enable_bot_for_other_users\s(.*)$/m,
      `::enable_bot_for_other_users ${value ? 'yes' : 'no'}`,
    );
    this.setState(
      {
        publicDevices: value,
        code,
      },
      () => this.sendInfoToProps(),
    );
  };

  sendInfoToProps = () => {
    this.props.configure.sendInfoToProps({
      code: this.state.code,
    });
  };

  render() {
    return (
      <div className="table-wrap">
        <Table className="table-root" selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Website</TableHeaderColumn>
              <TableHeaderColumn>
                <Info
                  style={styles.helpIcon}
                  onMouseEnter={this.handleOpenLastActiveInfo}
                  onMouseLeave={this.handleCloseLastActiveInfo}
                  data-tip="Last time the bot was used"
                />
                {this.state.lastActiveInfo ? (
                  <ReactTooltip effect="solid" place="bottom" />
                ) : null}
                Last active
              </TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.state.tableData.map((item, index) => {
              if (item.name) {
                return (
                  <TableRow key={index}>
                    <TableRowColumn style={{ fontSize: '16px' }}>
                      {item.name}
                    </TableRowColumn>
                    <TableRowColumn style={{ fontSize: '16px' }}>
                      {item.last}
                    </TableRowColumn>
                    <TableRowColumn>
                      <SelectField
                        floatingLabelText="Status"
                        fullWidth={true}
                        value={item.status}
                      >
                        <MenuItem value={1} primaryText="Enable" />
                        <MenuItem value={2} primaryText="Disable" />
                      </SelectField>
                    </TableRowColumn>
                  </TableRow>
                );
              }
              return null;
            })}
          </TableBody>
        </Table>
        <div style={{ padding: '20px 0px' }}>
          <Checkbox
            label="Include SUSI default skills"
            labelPosition="right"
            checked={this.state.includeSusiSkills}
            labelStyle={{ fontSize: '14px' }}
            iconStyle={{ fill: 'rgb(66, 133, 244)' }}
            onCheck={this.handleChangeIncludeSusiSkills}
          />
          <Checkbox
            label="Enable bot in my devices"
            labelPosition="right"
            checked={this.state.myDevices}
            labelStyle={{ fontSize: '14px' }}
            iconStyle={{ fill: 'rgb(66, 133, 244)' }}
            onCheck={this.handleChangeIncludeInMyDevices}
          />
          <Checkbox
            label="Enable bot for other users"
            labelPosition="right"
            checked={this.state.publicDevices}
            labelStyle={{ fontSize: '14px' }}
            iconStyle={{ fill: 'rgb(66, 133, 244)' }}
            onCheck={this.handleChangeIncludeInPublicDevices}
          />
        </div>
      </div>
    );
  }
}

const styles = {
  helpIcon: {
    position: 'absolute',
    top: '18px',
    right: '10px',
    height: '20px',
    width: '20px',
    cursor: 'pointer',
    color: 'rgb(158, 158, 158)',
  },
};

UIView.propTypes = {
  configure: PropTypes.object,
};

export default UIView;
