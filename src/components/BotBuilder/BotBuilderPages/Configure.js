import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AceEditor from 'react-ace';
import colors from '../../../Utils/colors';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Info from 'material-ui/svg-icons/action/info';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

// static config data for demostration
let configData = [
  {
    id: '1',
    name: 'website1.com',
    last: 'Jan 12, 2018 20:08 hrs',
    status: 1,
  },
  {
    id: '2',
    name: 'website2.com',
    last: 'Feb 19, 2018 13:00 hrs',
    status: 1,
  },
  {
    id: '3',
    name: 'website3.com',
    last: 'Mar 14, 2018 10:15 hrs',
    status: 2,
  },
];

class Configure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorTheme: 'github',
      fontSizeCode: 14,
      lastActiveInfo: false,
      code: this.props.code,
      openSnackbar: false,
      msgSnackbar: '',
    };
    this.handleChangeCode = this.handleChangeCode.bind(this);
  }

  handleChangeCode(event) {
    this.setState({ code: event });
  }

  generateConfigData = () => {
    configData = [];
    let newCode = this.state.code;
    let websiteData = newCode
      .split('::sites_enabled')[1]
      .split('::sites_disabled');
    let enabledSites = websiteData[0].split(',');
    let noOfEnabledSites = enabledSites.length;
    let disabledSites = websiteData[1].split(',');
    let noOfDisabledSites = disabledSites.length;
    for (let i = 1; i <= noOfEnabledSites + noOfDisabledSites; i++) {
      configData[i - 1] = {
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
      openSnackbar: true,
      msgSnackbar: 'Settings successfully saved!',
    });
  };

  handleOpenLastActiveInfo = () => {
    this.setState({ lastActiveInfo: true });
  };

  handleCloseLastActiveInfo = () => {
    this.setState({ lastActiveInfo: false });
  };

  render() {
    return (
      <div className="menu-page">
        <h2 style={{ lineHeight: '50px' }}>3. Configure your bot</h2>
        <div style={{ padding: '20px 10px 0 10px' }}>
          <AceEditor
            mode="java"
            theme={this.state.editorTheme}
            width="100%"
            fontSize={this.state.fontSizeCode}
            height="200px"
            value={this.state.code}
            onChange={this.handleChangeCode}
            showPrintMargin={false}
            name="skill_code_editor"
            scrollPastEnd={false}
            wrapEnabled={true}
            editorProps={{ $blockScrolling: true }}
          />
          <br />
          <RaisedButton
            label="Save"
            backgroundColor={colors.header}
            labelColor="#fff"
            onTouchTap={this.generateConfigData}
          />
        </div>
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
              {configData.map((item, index) => {
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
              <TableRow />
            </TableBody>
          </Table>
        </div>
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
Configure.propTypes = {
  updateSettings: PropTypes.func,
  code: PropTypes.string,
};
export default Configure;
