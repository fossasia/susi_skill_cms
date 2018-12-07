// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Material-UI
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RaisedButton } from 'material-ui';
import CircularProgress from 'material-ui/CircularProgress';
import { RadioButton } from 'material-ui/RadioButton';

// Other Utils
import notification from 'antd/lib/notification';
import Icon from 'antd/lib/icon';
import $ from 'jquery';
import { urls, colors } from '../../utils';

const styles = {
  home: {
    width: '100%',
    fontSize: '14px',
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  compareBtnStyle: {
    margin: '10px',
  },
};

class SkillVersion extends Component {
  static propTypes = {
    location: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      commits: [],
      dataReceived: false,
      skillMeta: {
        modelValue: 'general',
        groupValue: this.props.location.pathname.split('/')[1],
        languageValue: this.props.location.pathname.split('/')[4],
        skillName: this.props.location.pathname.split('/')[2],
      },
      leftChecks: [],
      rightChecks: [],
      currLeftChecked: null,
      currRightChecked: null,
    };
    // console.log(this.props);
  }

  componentDidMount() {
    const { skillMeta } = this.state;
    document.title = 'SUSI.AI - Skill Version';
    const commitHistoryBaseURL = `${urls.API_URL}/cms/getSkillHistory.json`;
    const commitHistoryURL = `${commitHistoryBaseURL}?model=${
      skillMeta.modelValue
    }&group=${skillMeta.groupValue}&language=${skillMeta.languageValue}&skill=${
      skillMeta.skillName
    }`;
    this.getCommitHistory(commitHistoryURL);
  }

  getCommitHistory = commitHistoryURL => {
    // console.log(commitHistoryURL);
    $.ajax({
      url: commitHistoryURL,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: commitsData => {
        console.log(commitsData);
        this.setCommitHistory(commitsData);
      },
      error: (xhr, status, error) => {
        notification.open({
          message: 'Error Processing your Request',
          description: 'Failed to fetch data. Please Try Again',
          icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
        });
        return 0;
      },
    });
  };

  setCommitHistory = commitsData => {
    // console.log(commitsData);
    if (commitsData.accepted) {
      let commits = commitsData.commits ? commitsData.commits : [];
      let currLeftChecked = null;
      let currRightChecked = null;
      let leftChecks = [];
      let rightChecks = [];
      commits.forEach((commit, index) => {
        if (index === 0) {
          commit.latest = true;
          rightChecks.push(true);
          leftChecks.push(false);
          currRightChecked = 0;
        } else if (index === 1) {
          rightChecks.push(false);
          leftChecks.push(true);
          currLeftChecked = 1;
        } else {
          rightChecks.push(false);
          leftChecks.push(false);
        }
      });
      this.setState({
        commits: commits,
        dataReceived: true,
        leftChecks,
        rightChecks,
        currLeftChecked,
        currRightChecked,
      });
    }
  };

  onCheck = event => {
    const side = event.target.name.split('-')[1];
    const index = parseInt(event.target.name.split('-')[0], 10);
    let {
      currLeftChecked,
      currRightChecked,
      leftChecks,
      rightChecks,
    } = this.state;
    if (side === 'right') {
      if (!(index >= currLeftChecked)) {
        rightChecks.fill(false);
        rightChecks[index] = true;
        currRightChecked = index;
      }
    } else if (side === 'left') {
      if (!(index <= currRightChecked)) {
        leftChecks.fill(false);
        leftChecks[index] = true;
        currLeftChecked = index;
      }
    }
    this.setState({
      currLeftChecked,
      currRightChecked,
      leftChecks,
      rightChecks,
    });
  };

  getCheckedCommits = () => {
    const { commits, currLeftChecked, currRightChecked } = this.state;
    const commitOld = commits[currLeftChecked];
    const commitRecent = commits[currRightChecked];
    return [commitOld, commitRecent];
  };

  render() {
    const {
      currLeftChecked,
      currRightChecked,
      commits,
      leftChecks,
      rightChecks,
      skillMeta,
      dataReceived,
    } = this.state;

    let showCompareBtn = false;
    if (currLeftChecked != null && currRightChecked != null) {
      showCompareBtn = true;
    }

    let commitHistoryTableHeader = (
      <TableRow>
        <TableHeaderColumn style={{ width: '20px' }} />
        <TableHeaderColumn style={{ width: '20px' }} />
        <TableHeaderColumn>Commit Date</TableHeaderColumn>
        <TableHeaderColumn>Commit ID</TableHeaderColumn>
        <TableHeaderColumn>Commit Author</TableHeaderColumn>
        <TableHeaderColumn>Commit Message</TableHeaderColumn>
      </TableRow>
    );

    let commitHistoryTableRows = commits.map((commit, index) => {
      let leftRadioBtn = null;
      let rightRadioBtn = null;
      if (leftChecks && rightChecks) {
        leftRadioBtn = (
          <RadioButton
            name={index.toString() + '-left'}
            checked={leftChecks[index]}
            onCheck={this.onCheck}
          />
        );
        rightRadioBtn = (
          <RadioButton
            name={index.toString() + '-right'}
            checked={rightChecks[index]}
            onCheck={this.onCheck}
          />
        );
      } else {
        leftRadioBtn = (
          <RadioButton
            name={index.toString() + '-left'}
            checked={index === 1}
            onCheck={this.onCheck}
          />
        );
        rightRadioBtn = (
          <RadioButton
            name={index.toString() + '-right'}
            checked={index === 0}
            onCheck={this.onCheck}
          />
        );
      }
      if (showCompareBtn) {
        if (index <= currRightChecked) {
          leftRadioBtn = null;
        }
        if (index >= currLeftChecked) {
          rightRadioBtn = null;
        }
      }

      return (
        <TableRow key={index}>
          <TableRowColumn style={{ width: '20px' }}>
            {leftRadioBtn}
          </TableRowColumn>
          <TableRowColumn style={{ width: '20px' }}>
            {rightRadioBtn}
          </TableRowColumn>
          <TableRowColumn>
            <Link
              to={{
                pathname: `/${skillMeta.groupValue}/${
                  skillMeta.skillName
                }/edit/${skillMeta.languageValue}/${commit.commitID}`,
              }}
            >
              <abbr title={commit.commitDate}>{commit.commitDate}</abbr>
            </Link>
          </TableRowColumn>
          <TableRowColumn>
            <abbr title={commit.commitID}>{commit.commitID}</abbr>
          </TableRowColumn>
          <TableRowColumn>
            <abbr title={commit.author}>{commit.author}</abbr>
          </TableRowColumn>
          <TableRowColumn>
            <abbr title={commit.commit_message}>{commit.commit_message}</abbr>
          </TableRowColumn>
        </TableRow>
      );
    });

    const commitHistoryTable = (
      <MuiThemeProvider>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            {commitHistoryTableHeader}
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {commitHistoryTableRows}
          </TableBody>
        </Table>
      </MuiThemeProvider>
    );

    const checkedCommits = this.getCheckedCommits();

    return (
      <div>
        <StaticAppBar {...this.props} />
        {!dataReceived ? (
          <h1 className="skill_loading_container">
            <div className="center">
              <CircularProgress size={62} color="#4285f5" />
              <h4>Loading</h4>
            </div>
          </h1>
        ) : (
          <div className="skill_listing_container" style={styles.home}>
            <div className="margin-b-md margin-t-md skill">
              <h1 style={{ display: 'flex' }}>
                <div style={{ textTransform: 'capitalize' }}>
                  {skillMeta.skillName.split('_').join(' ')}
                </div>
                :&nbsp;Revision History
              </h1>
              <p>
                <span>
                  For any version listed below, click on its date to view it.
                </span>
              </p>
              <div style={styles.compareBtnStyle}>{commitHistoryTable}</div>
              <div style={styles.actionButtons}>
                {showCompareBtn && (
                  <Link
                    to={{
                      pathname: `/${skillMeta.groupValue}/${
                        skillMeta.skillName
                      }/compare/${skillMeta.languageValue}/${
                        checkedCommits[0].commitID
                      }/${checkedCommits[1].commitID}`,
                    }}
                  >
                    <RaisedButton
                      label="Compare Selected Versions"
                      backgroundColor={colors.header}
                      labelColor="#fff"
                      style={styles.compareBtnStyle}
                    />
                  </Link>
                )}
                <Link
                  to={{
                    pathname: `/${skillMeta.groupValue}/${
                      skillMeta.skillName
                    }/${skillMeta.languageValue}`,
                  }}
                >
                  <RaisedButton
                    label="Back"
                    backgroundColor={colors.header}
                    labelColor="#fff"
                    style={styles.compareBtnStyle}
                  />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SkillVersion;
