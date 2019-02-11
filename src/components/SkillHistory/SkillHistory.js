import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchCommitHistory, fetchSkillByCommitId } from '../../api/index';
import { Link } from 'react-router-dom';
import notification from 'antd/lib/notification';
import Icon from 'antd/lib/icon';
import AceEditor from 'react-ace';
import Diff from 'react-diff';
import { RaisedButton } from 'material-ui';
import CircularProgress from 'material-ui/CircularProgress';
import { Paper } from 'material-ui';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import { colors } from '../../utils';

import 'brace/mode/markdown';
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/twilight';
import 'brace/theme/xcode';
import 'brace/mode/java';
import 'brace/theme/textmate';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';
import 'brace/theme/terminal';
import 'brace/ext/searchbox';

import './SkillHistory.css';

const ErrorNotification = () => {
  return notification.open({
    message: 'Error Processing your Request',
    description: 'Failed to fetch data. Please Try Again',
    icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
  });
};

const styles = {
  homeStyle: {
    width: '100%',
    padding: '80px 30px 30px',
  },
  codeEditorStyle: {
    width: '100%',
    marginTop: '20px',
  },
  compareBtnStyle: {
    margin: '20px',
    position: 'absolute',
    right: '24',
    top: '70',
  },
  paperStyle: {
    width: '100%',
    padding: '10px',
  },
};

let rightEditorWidth = '50%';
if (window.matchMedia('only screen and (max-width: 768px)').matches) {
  rightEditorWidth = '100%';
}

class SkillHistory extends Component {
  constructor(props) {
    super(props);
    let commits = [];
    const parsePath = this.props.location.pathname.split('/');
    commits.push(parsePath[5]);
    if (parsePath.length === 7) {
      commits.push(parsePath[6]);
    }
    this.state = {
      code:
        '::name <Skill_name>\n::author <author_name>\n::author_url <author_url>\n::description <description> \n::dynamic_content <Yes/No>\n::developer_privacy_policy <link>\n::image <image_url>\n::terms_of_use <link>\n\n\nUser query1|query2|quer3....\n!example:<The question that should be shown in public skill displays>\n!expect:<The answer expected for the above example>\nAnswer for the user query',
      skillMeta: {
        modelValue: 'general',
        groupValue: parsePath[1],
        languageValue: parsePath[4],
        skillName: parsePath[2],
      },
      commits: commits,
      commitData: [],
      allCommitsData: [],
    };
  }

  componentDidMount() {
    document.title = 'SUSI.AI - Skill History';
    const {
      modelValue: model,
      groupValue: group,
      languageValue: language,
      skillName: skill,
    } = this.state.skillMeta;
    fetchCommitHistory({ model, group, language, skill })
      .then(commitsData => {
        if (commitsData.accepted) {
          let commits = commitsData.commits ? commitsData.commits : [];
          if (commits.length > 0) {
            commits[0].latest = true;
          }
          this.setState({
            allCommitsData: commits,
          });
          this.getCommitFiles();
        }
      })
      .catch(error => {
        return <ErrorNotification />;
      });
  }

  getCommitMeta = commitID => {
    let allCommits = this.state.allCommitsData;
    for (let i = 0; i < allCommits.length; i++) {
      let commitData = allCommits[i];
      if (commitData.commitId === commitID) {
        return commitData;
      }
    }
  };

  getCommitFiles = () => {
    const {
      modelValue: model,
      groupValue: group,
      languageValue: language,
      skillName: skill,
    } = this.state.skillMeta;
    const { commits } = this.state;
    if (commits.length === 2) {
      fetchSkillByCommitId({
        model,
        group,
        language,
        skill,
        commitID: commits[0],
      })
        .then(data1 => {
          fetchSkillByCommitId({
            model,
            group,
            language,
            skill,
            commitID: commits[1],
          })
            .then(data2 => {
              this.updateData([
                {
                  code: data1.file,
                  commit: this.getCommitMeta(commits[0]),
                },
                {
                  code: data2.file,
                  commit: this.getCommitMeta(commits[1]),
                },
              ]);
            })
            .catch(error => {
              return <ErrorNotification />;
            });
        })
        .catch(error => {
          return <ErrorNotification />;
        });
    }
  };

  updateData = commitData => {
    this.setState({
      commitData: commitData,
    });
  };

  render() {
    const { commitData, skillMeta, allCommitsData } = this.state;
    const { homeStyle, codeEditorStyle, paperStyle, compareBtnStyle } = styles;
    return (
      <div>
        <StaticAppBar {...this.props} />
        {commitData.length === 0 && (
          <h1 className="skill_loading_container">
            <div className="center">
              <CircularProgress size={62} color="#4285f5" />
              <h4>Loading</h4>
            </div>
          </h1>
        )}
        <div style={homeStyle}>
          {commitData.length === 2 && (
            <div style={{ display: 'block' }}>
              <Paper style={paperStyle} zDepth={1}>
                <div>
                  <div>
                    Currently Viewing :{' '}
                    <Link
                      to={{
                        pathname:
                          '/' +
                          skillMeta.groupValue +
                          '/' +
                          skillMeta.skillName +
                          '/' +
                          skillMeta.languageValue,
                      }}
                    >
                      <RaisedButton
                        label="Back"
                        backgroundColor={colors.header}
                        labelColor="#fff"
                        style={compareBtnStyle}
                      />
                    </Link>
                  </div>
                  <h3 style={{ textTransform: 'capitalize' }}>
                    {skillMeta.skillName.split('_').join(' ')}
                  </h3>
                </div>
              </Paper>
              <div className="version-code-left">
                <span>
                  commitID: <b>{commitData[0].commit.commitId}</b>
                </span>
                <br />
                <span>
                  {commitData[0].commit.latest && 'Latest '}
                  Revision as of <b>{commitData[0].commit.commitDate}</b>
                </span>
                <div style={codeEditorStyle}>
                  <AceEditor
                    mode="java"
                    readOnly={true}
                    theme="github"
                    width="100%"
                    fontSize="14"
                    height="400px"
                    value={commitData[0].code}
                    showPrintMargin={false}
                    name="skill_code_editor"
                    scrollPastEnd={false}
                    wrapEnabled={true}
                    editorProps={{ $blockScrolling: true }}
                    style={{
                      resize: 'vertical',
                      overflowY: 'auto',
                      minHeight: '200px',
                    }}
                  />
                </div>
              </div>
              <div className="version-code-right">
                <span>
                  commitID: <b>{commitData[1].commit.commitId}</b>
                </span>
                <br />
                <span>
                  {commitData[1].commit.latest && 'Latest '}
                  Revision as of <b>{commitData[1].commit.commitDate}</b>
                  <b style={{ marginLeft: '5px' }}>
                    (<Link
                      to={{
                        pathname:
                          '/' +
                          skillMeta.groupValue +
                          '/' +
                          skillMeta.skillName +
                          '/edit/' +
                          skillMeta.languageValue +
                          '/' +
                          allCommitsData[0].commitId +
                          '/' +
                          commitData[0].commit.commitId,
                      }}
                    >
                      Undo
                    </Link>)
                  </b>
                </span>
                <div style={codeEditorStyle}>
                  <AceEditor
                    mode="java"
                    readOnly={true}
                    theme="github"
                    width={rightEditorWidth}
                    fontSize="14"
                    height="400px"
                    value={commitData[1].code}
                    showPrintMargin={false}
                    name="skill_code_editor"
                    scrollPastEnd={false}
                    wrapEnabled={true}
                    editorProps={{ $blockScrolling: true }}
                    style={{
                      resize: 'vertical',
                      overflowY: 'auto',
                      minHeight: '200px',
                    }}
                  />
                </div>
              </div>
              <div>
                <h1 className="title" style={{ marginTop: '20px' }}>
                  Changes
                </h1>
                {/* latest code should be inputB */}
                <Diff
                  inputA={commitData[0].code}
                  inputB={commitData[1].code}
                  type="chars"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

SkillHistory.propTypes = {
  location: PropTypes.object,
};

export default SkillHistory;
