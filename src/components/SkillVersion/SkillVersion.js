// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchCommitHistory } from '../../api';
import { Link } from 'react-router-dom';

// Material-UI
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';

// Other Utils
import notification from 'antd/lib/notification';
import Icon from 'antd/lib/icon';

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
  }

  componentDidMount() {
    document.title = 'SUSI.AI - Skill Version';
    this.getCommitHistory();
  }

  getCommitHistory = () => {
    const {
      modelValue: model,
      groupValue: group,
      languageValue: language,
      skillName: skill,
    } = this.state.skillMeta;
    fetchCommitHistory({ model, group, language, skill })
      .then(commitsData => {
        this.setCommitHistory(commitsData);
      })
      .catch(error => {
        notification.open({
          message: 'Error Processing your Request',
          description: 'Failed to fetch data. Please Try Again',
          icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
        });
        return 0;
      });
  };

  setCommitHistory = commitsData => {
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
        <TableCell padding="checkbox" />
        <TableCell padding="checkbox" />
        <TableCell padding="dense">Commit Date</TableCell>
        <TableCell padding="dense">Commit ID</TableCell>
        <TableCell padding="dense">Commit Author</TableCell>
        <TableCell padding="dense">Commit Message</TableCell>
      </TableRow>
    );

    let commitHistoryTableRows = commits.map((commit, index) => {
      const { commitId, commitDate, author, commitMessage } = commit;
      let leftRadioBtn = null;
      let rightRadioBtn = null;
      if (leftChecks && rightChecks) {
        leftRadioBtn = (
          <Radio
            name={index.toString() + '-left'}
            checked={leftChecks[index]}
            onChange={this.onCheck}
            color="primary"
          />
        );
        rightRadioBtn = (
          <Radio
            name={index.toString() + '-right'}
            checked={rightChecks[index]}
            onChange={this.onCheck}
            color="primary"
          />
        );
      } else {
        leftRadioBtn = (
          <Radio
            name={index.toString() + '-left'}
            checked={index === 1}
            onChange={this.onCheck}
            color="primary"
          />
        );
        rightRadioBtn = (
          <Radio
            name={index.toString() + '-right'}
            checked={index === 0}
            onChange={this.onCheck}
            color="primary"
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
          <TableCell padding="checkbox">{leftRadioBtn}</TableCell>
          <TableCell padding="checkbox">{rightRadioBtn}</TableCell>
          <TableCell padding="dense">
            <Link
              to={{
                pathname: `/${skillMeta.groupValue}/${
                  skillMeta.skillName
                }/edit/${skillMeta.languageValue}/${commitId}`,
              }}
            >
              <abbr title={commitDate}>{commitDate}</abbr>
            </Link>
          </TableCell>
          <TableCell padding="dense">
            <abbr title={commitId}>{commitId}</abbr>
          </TableCell>
          <TableCell padding="dense">
            <abbr title={author}>{author}</abbr>
          </TableCell>
          <TableCell padding="dense">
            <abbr title={commitMessage}>{commitMessage}</abbr>
          </TableCell>
        </TableRow>
      );
    });

    const commitHistoryTable = (
      <MuiThemeProvider>
        <Table selectable={false}>
          <TableHead displaySelectAll={false} adjustForCheckbox={false}>
            {commitHistoryTableHeader}
          </TableHead>
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
              <CircularProgress size={62} color="primary" />
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
                        checkedCommits[0].commitId
                      }/${checkedCommits[1].commitId}`,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      style={styles.compareBtnStyle}
                    >
                      Compare Selected Versions
                    </Button>
                  </Link>
                )}
                <Link
                  to={{
                    pathname: `/${skillMeta.groupValue}/${
                      skillMeta.skillName
                    }/${skillMeta.languageValue}`,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={styles.compareBtnStyle}
                  >
                    Back
                  </Button>
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
