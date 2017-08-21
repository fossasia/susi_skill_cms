import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import AceEditor from 'react-ace';
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
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import * as $ from "jquery";
import { Paper } from "material-ui";
import Diff from 'react-diff';
import './SkillHistory.css';

class SkillHistory extends Component {
    constructor(props) {
        super(props);
        var commits = [];
        var parsePath = this.props.location.pathname.split('/');
        commits.push(parsePath[5]);
        if(parsePath.length === 7){
          commits.push(parsePath[6])
        }
        this.state = {
            code:"::name <Skill_name>\n::author <author_name>\n::author_url <author_url>\n::description <description> \n::dynamic_content <Yes/No>\n::developer_privacy_policy <link>\n::image <image_url>\n::terms_of_use <link>\n\n\nUser query1|query2|quer3....\n!example:<The question that should be shown in public skill displays>\n!expect:<The answer expected for the above example>\nAnswer for the user query",
            fontSizeCode:14,
            editorTheme:"github",
            skillMeta: {
              modelValue: "general",
              groupValue: parsePath[1],
              languageValue: parsePath[4],
              skillName: parsePath[2]
            },
            commits: commits,
            commitData: [],
            allCommitsData: [],
        };
        console.log(this.props)
    }

    getSkillAtCommitIDUrl = () => {
      let baseUrl = ' http://api.susi.ai/cms/getFileAtCommitID.json';
      let skillMetaData = this.state.skillMeta;
      let skillAtCommitIDUrl = baseUrl +
                              '?model=' + skillMetaData.modelValue +
                              '&group=' + skillMetaData.groupValue +
                              '&language=' + skillMetaData.languageValue +
                              '&skill=' + skillMetaData.skillName +
                              '&commitID=';
      return skillAtCommitIDUrl;
    }

    componentDidMount(){
      let commitHistoryBaseURL = 'http://api.susi.ai/cms/getSkillHistory.json';
      let commitHistoryURL = commitHistoryBaseURL +
                            '?model=' + this.state.skillMeta.modelValue +
                            '&group=' + this.state.skillMeta.groupValue +
                            '&language=' + this.state.skillMeta.languageValue +
                            '&skill=' + this.state.skillMeta.skillName;
      let self = this;
      $.ajax({
          url: commitHistoryURL,
          jsonpCallback: 'pv',
          dataType: 'jsonp',
          jsonp: 'callback',
          crossDomain: true,
          success: function (commitsData) {
              if(commitsData.accepted){
                let commits = commitsData.commits ? commitsData.commits : [];
                if(commits.length > 0){
                  commits[0].latest = true;
                }
                self.setState({
                  allCommitsData: commits,
                });
                self.getCommitFiles();
              }
          }
      });
    }

    getCommitMeta = (commitID) => {
      let allCommits = this.state.allCommitsData;
      for(var i=0;i<allCommits.length;i++){
        var commitData = allCommits[i];
        if(commitData.commitID === commitID){
          return commitData;
        }
      }
    }

    getCommitFiles = () => {
      let baseUrl = this.getSkillAtCommitIDUrl() ;
      let self = this;
      if(this.state.commits.length === 1){
        var url = baseUrl + self.state.commits[0];
        console.log(url);
        $.ajax({
            url: url,
            jsonpCallback: 'pc',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data) {
                self.updateData([{
                  code:data.file,
                  commit:self.getCommitMeta(self.state.commits[0])
                }])
            }
        });
      }
      else if (this.state.commits.length === 2) {
        var url1 = baseUrl + self.state.commits[0];
        console.log(url1);
        $.ajax({
            url: url1,
            jsonpCallback: 'pc',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data1) {
              var url2 = baseUrl + self.state.commits[1];
              console.log(url2);
              $.ajax({
                  url: url2,
                  jsonpCallback: 'pd',
                  dataType: 'jsonp',
                  jsonp: 'callback',
                  crossDomain: true,
                  success: function (data2) {
                    self.updateData([{
                      code:data1.file,
                      commit:self.getCommitMeta(self.state.commits[0])
                    },{
                      code:data2.file,
                      commit:self.getCommitMeta(self.state.commits[1])
                    }])
                  }
              });
            }
        });
      }
    }

    updateData = (commitData) => {
      this.setState({
        commitData:commitData,
      });
    };

    render(){
      const style = {
          width: "100%",
          padding: "10px"
      };
      let rightEditorWidth = '50%';
      if (window.matchMedia('only screen and (max-width: 768px)').matches){
        rightEditorWidth = '100%';
      }
      return(
        <div>
          <StaticAppBar {...this.props} />
          {this.state.commitData.length === 0 && (
            <h1 className="skill_loading_container">Loading...</h1>
          )}
          <div style={styles.home}>
          {this.state.commitData.length === 1 && (<div>
            <Paper style={style} zDepth={1}>
              <div>Currently Viewing :
                <h3>{this.state.skillMeta.skillName}</h3>
                <span>commitID: <b>{this.state.commitData[0].commit.commitID}</b></span><br/>
                <span>{this.state.commitData[0].commit.latest && "Latest "}Revision as of <b>{this.state.commitData[0].commit.commitDate}</b></span>
              </div>
            </Paper>
            <div style={styles.codeEditor}>
            <AceEditor
                mode="java"
                readOnly={true}
                theme={this.state.editorTheme}
                width="100%"
                fontSize={this.state.fontSizeCode}
                height= "400px"
                value={this.state.commitData[0].code}
                showPrintMargin={false}
                name="skill_code_editor"
                editorProps={{$blockScrolling: true}}
            />
            </div>
            </div>)}
              {this.state.commitData.length === 2 && (<div style={{display:'block'}}>
              <Paper style={style} zDepth={1}>
                <div>Currently Viewing : <h3>{this.state.skillMeta.skillName}</h3></div>
              </Paper>
                <div className='version-code-left'>
                  <span>commitID: <b>{this.state.commitData[0].commit.commitID}</b></span><br/>
                  <span>{this.state.commitData[0].commit.latest && "Latest "}Revision as of <b>{this.state.commitData[0].commit.commitDate}</b></span>
                <div style={styles.codeEditor}>
                <AceEditor
                    mode="java"
                    readOnly={true}
                    theme={this.state.editorTheme}
                    width="100%"
                    fontSize={this.state.fontSizeCode}
                    height= "400px"
                    value={this.state.commitData[0].code}
                    showPrintMargin={false}
                    name="skill_code_editor"
                    editorProps={{$blockScrolling: true}}
                />
                </div>
                </div>
                <div className='version-code-right'>
                  <span>commitID: <b>{this.state.commitData[1].commit.commitID}</b></span><br/>
                  <span>{this.state.commitData[1].commit.latest && "Latest "}
                    Revision as of <b>{this.state.commitData[1].commit.commitDate}</b>
                    <b style={{marginLeft:'5px'}}>(<Link to={{
                        pathname: '/'+this.state.skillMeta.groupValue+
                                  '/'+this.state.skillMeta.skillName+
                                  '/edit/'+this.state.skillMeta.languageValue+
                                  '/'+this.state.allCommitsData[0].commitID+
                                  '/'+this.state.commitData[0].commit.commitID,
                      }}>Undo</Link>)</b>
                  </span>
                <div style={styles.codeEditor}>
                <AceEditor
                    mode="java"
                    readOnly={true}
                    theme={this.state.editorTheme}
                    width={rightEditorWidth}
                    fontSize={this.state.fontSizeCode}
                    height= "400px"
                    value={this.state.commitData[1].code}
                    showPrintMargin={false}
                    name="skill_code_editor"
                    editorProps={{$blockScrolling: true}}
                />
                </div>
                </div>
                <div>
                <h1 className="title" style={{marginTop:'20px'}}>
                    Changes
                </h1>
                {/*latest code should be inputB*/}
                <Diff
                  inputA={this.state.commitData[0].code}
                  inputB={this.state.commitData[1].code}
                  type="chars"
                  />
                </div>
                </div>)}
          </div>
        </div>
      );
    }
}

const styles = {
    home: {
        width: '100%',
        padding: "80px 30px 30px",
    },
    codeEditor:{
        width: "100%",
        marginTop: "20px"
    },
};

export default SkillHistory;
