import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import * as $ from 'jquery';
import { Paper } from 'material-ui';
import Diff from 'react-diff';
import Cookies from 'universal-cookie';
import Icon from 'antd/lib/icon';
import notification from 'antd/lib/notification';
import CircularProgress from 'material-ui/CircularProgress';

import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import SkillCreator from '../SkillCreator/SkillCreator';
import { urls } from '../../utils';

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

const cookies = new Cookies();

class SkillRollBack extends Component {
  constructor(props) {
    super(props);
    const parsePath = this.props.location.pathname.split('/');
    this.state = {
      code:
        '::name <Skill_name>\n::author <author_name>\n::author_url <author_url>\n::description <description> \n::dynamic_content <Yes/No>\n::developer_privacy_policy <link>\n::image <image_url>\n::terms_of_use <link>\n\n\nUser query1|query2|quer3....\n!example:<The question that should be shown in public skill displays>\n!expect:<The answer expected for the above example>\nAnswer for the user query',
      fontSizeCode: 14,
      editorTheme: 'github',
      url: '',
      skillMeta: {
        modelValue: 'general',
        groupValue: parsePath[1],
        languageValue: parsePath[4],
        skillName: parsePath[2],
      },
      latestCommit: parsePath[5],
      revertingCommit: parsePath[6],
      commitData: [],
      commitMessage: '',
    };
    // console.log(this.props)
  }

  getSkillAtCommitIDUrl = () => {
    let baseUrl = `${urls.API_URL}/cms/getFileAtCommitID.json`;
    let skillMetaData = this.state.skillMeta;
    let skillAtCommitIDUrl =
      baseUrl +
      '?model=' +
      skillMetaData.modelValue +
      '&group=' +
      skillMetaData.groupValue +
      '&language=' +
      skillMetaData.languageValue +
      '&skill=' +
      skillMetaData.skillName +
      '&commitID=';
    return skillAtCommitIDUrl;
  };

  componentDidMount() {
    document.title = 'SUSI.AI - Skill RollBack';
    let baseUrl = this.getSkillAtCommitIDUrl();
    let self = this;
    const url1 = baseUrl + self.state.latestCommit;
    // console.log(url1);
    $.ajax({
      url: url1,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data1) {
        const url2 = baseUrl + self.state.revertingCommit;
        // console.log(url2);
        $.ajax({
          url: url2,
          dataType: 'jsonp',
          jsonp: 'callback',
          crossDomain: true,
          success: function(data2) {
            self.updateData([
              {
                code: data1.file,
                commitID: self.state.latestCommit,
                author: data1.author,
                date: data1.commitDate,
              },
              {
                code: data2.file,
                commitID: self.state.revertingCommit,
                author: data2.author,
                date: data2.commitDate,
              },
            ]);
          },
          error: function(xhr, status, error) {
            notification.open({
              message: 'Error Processing your Request',
              description: 'Failed to fetch data. Please Try Again',
              icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
            });
            return 0;
          },
        });
      },
      error: function(xhr, status, error) {
        notification.open({
          message: 'Error Processing your Request',
          description: 'Failed to fetch data. Please Try Again',
          icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
        });
        return 0;
      },
    });
  }

  updateData = commitData => {
    this.setState({
      commitData: commitData,
      code: commitData[1].code,
      commitMessage: 'Reverting to Commit - ' + commitData[1].commitID,
    });
  };

  updateCode = newCode => {
    this.setState({
      code: newCode,
    });
  };

  handleCommitMessageChange = event => {
    this.setState({
      commitMessage: event.target.value,
    });
  };

  handleRollBack = () => {
    if (!cookies.get('loggedIn')) {
      notification.open({
        message: 'Not logged In',
        description: 'Please login and then try to create/edit a skill',
        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
      });
      return 0;
    }

    let skillMetaData = this.state.skillMeta;

    if (
      Object.keys(skillMetaData).length === 0 &&
      skillMetaData.constructor === Object
    ) {
      notification.open({
        message: 'Error Processing your Request',
        description:
          'Please select a model, group, language and a skill and Try Again',
        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
      });
      return 0;
    }

    let latestRevisionCode = this.state.commitData[0].code;
    let oldImageName = latestRevisionCode.match(/^::image\s(.*)$/m);
    let newImageName = this.state.code.match(/^::image\s(.*)$/m);
    if (oldImageName === null || newImageName === null) {
      notification.open({
        message: 'Error Processing your Request',
        description: 'Please check the image path and Try Again',
        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
      });
      return 0;
    }
    oldImageName = oldImageName[1];
    oldImageName = oldImageName.replace('images/', '');
    newImageName = newImageName[1];
    newImageName = newImageName.replace('images/', '');

    let form = new FormData();
    form.append('OldModel', skillMetaData.modelValue);
    form.append('OldGroup', skillMetaData.groupValue);
    form.append('OldLanguage', skillMetaData.languageValue);
    form.append('OldSkill', skillMetaData.skillName);
    form.append('NewModel', skillMetaData.modelValue);
    form.append('NewGroup', skillMetaData.groupValue);
    form.append('NewLanguage', skillMetaData.languageValue);
    form.append('NewSkill', skillMetaData.skillName);
    form.append('content', this.state.code);
    form.append('changelog', this.state.commitMessage);
    form.append('imageChanged', false);
    form.append('image_name_changed', true);
    form.append('old_image_name', oldImageName);
    form.append('new_image_name', newImageName);
    form.append('access_token', cookies.get('loggedIn'));

    /* for(var pair of form.entries()) {
         console.log(pair[0]+ ', '+ pair[1]);
      } */

    const settings = {
      async: true,
      crossDomain: true,
      url: urls.API_URL + '/cms/modifySkill.json',
      method: 'POST',
      processData: false,
      contentType: false,
      mimeType: 'multipart/form-data',
      data: form,
    };

    $.ajax(settings)
      .done(function(response) {
        let data = JSON.parse(response);
        // console.log(response);
        if (data.accepted === true) {
          notification.open({
            message: 'Accepted',
            description: 'Your Skill has been uploaded to the server',
            icon: <Icon type="check-circle" style={{ color: '#00C853' }} />,
          });
          this.props.history.push({
            pathname:
              '/' +
              skillMetaData.groupValue +
              '/' +
              skillMetaData.skillName +
              '/' +
              skillMetaData.languageValue,
            state: {
              fromUpload: true,
              expertValue: skillMetaData.skillName,
              groupValue: skillMetaData.groupValue,
              languageValue: skillMetaData.languageValue,
            },
          });
        } else {
          notification.open({
            message: 'Error Processing your Request',
            description: data.message,
            icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
          });
        }
      })
      .fail(function(jqXHR, textStatus) {
        notification.open({
          message: 'Error Processing your Request',
          description:
            'Error in processing the request. Please try with some other skill',
          icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
        });
      });
  };

  render() {
    const style = {
      width: '100%',
      padding: '10px',
    };
    const bold = {
      fontSize: '14px',
    };
    let rightEditorWidth = '50%';
    if (window.matchMedia('only screen and (max-width: 768px)').matches) {
      rightEditorWidth = '100%';
    }
    return (
      <div>
        <StaticAppBar {...this.props} />
        {this.state.commitData.length === 0 && (
          <h1 className="skill_loading_container">
            <div className="center">
              <CircularProgress size={62} color="#4285f5" />
              <h4>Loading</h4>
            </div>
          </h1>
        )}
        {this.state.commitData.length === 2 && (
          <div style={{ display: 'block' }}>
            <div style={styles.home}>
              <Paper style={style} zDepth={1}>
                {'You are currently editing an older version of the skill: '}
                <b style={bold}>{this.state.skillMeta.skillName}</b>
                <br />
                <span>
                  Author: <b style={bold}>{this.state.commitData[1].author}</b>
                </span>
                <br />
                <span>
                  commitID: <b>{this.state.commitData[1].commitID}</b>
                </span>
                <br />
                <span>
                  Revision as of <b>{this.state.commitData[1].date}</b>
                </span>
              </Paper>
              <div className="version-code-left">
                <span>
                  commitID: <b>{this.state.commitData[0].commitID}</b>
                </span>
                <br />
                <span>
                  <b style={bold}>Latest Revision</b>
                </span>
                <div style={styles.codeEditor}>
                  <AceEditor
                    mode="java"
                    readOnly={true}
                    theme={this.state.editorTheme}
                    width="100%"
                    fontSize={this.state.fontSizeCode}
                    height="400px"
                    value={this.state.commitData[0].code}
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
                  commitID: <b>{this.state.commitData[1].commitID}</b>
                </span>
                <br />
                <span>
                  <b style={bold}>Your Text</b>
                </span>
                <div style={styles.codeEditor}>
                  <AceEditor
                    mode="java"
                    readOnly={true}
                    theme={this.state.editorTheme}
                    width={rightEditorWidth}
                    fontSize={this.state.fontSizeCode}
                    height="400px"
                    value={this.state.commitData[1].code}
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
                  inputA={this.state.commitData[0].code}
                  inputB={this.state.commitData[1].code}
                  type="chars"
                />
              </div>
              <h1 className="title" style={{ marginTop: '20px' }}>
                Edit
              </h1>
            </div>
            <div style={{ marginTop: '-100px', width: '100%' }}>
              <SkillCreator
                showTopBar={false}
                revertingCommit={this.state.revertingCommit}
                location={{
                  pathname:
                    '/' +
                    this.state.skillMeta.groupValue +
                    '/' +
                    this.state.skillMeta.skillName +
                    '/edit' +
                    '/' +
                    this.state.skillMeta.languageValue +
                    '/' +
                    this.state.revertingCommit,
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  home: {
    width: '100%',
    padding: '80px 30px 30px',
  },
  codeEditor: {
    width: '100%',
    marginTop: '20px',
  },
};

SkillRollBack.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default SkillRollBack;
