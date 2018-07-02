import React, { Component } from 'react';
import AceEditor from 'react-ace';
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
import Info from 'material-ui/svg-icons/action/info';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

// static config data for demostration
const configData = [
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
    };
  }

  handleOpenLastActiveInfo = () => {
    this.setState({ lastActiveInfo: true });
  };

  handleCloseLastActiveInfo = () => {
    this.setState({ lastActiveInfo: false });
  };

  render() {
    return (
      <div className="menu-page">
        <div style={{ padding: '20px 10px 0 10px' }}>
          <AceEditor
            mode="java"
            theme={this.state.editorTheme}
            width="100%"
            fontSize={this.state.fontSizeCode}
            height="200px"
            value={this.props.code}
            showPrintMargin={false}
            name="skill_code_editor"
            scrollPastEnd={false}
            wrapEnabled={true}
            editorProps={{ $blockScrolling: true }}
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
              })}
              <TableRow />
            </TableBody>
          </Table>
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
Configure.propTypes = {
  updateSettings: PropTypes.func,
  code: PropTypes.string,
};
export default Configure;
