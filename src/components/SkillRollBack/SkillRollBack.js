import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import * as $ from 'jquery';
import {Paper, RaisedButton, TextField} from 'material-ui';
import Diff from 'react-diff';
import Cookies from 'universal-cookie';
import Icon from 'antd/lib/icon';
import notification from 'antd/lib/notification';

const cookies = new Cookies();

class SkillRollBack extends Component {
    constructor(props) {
        super(props);
        var parsePath = this.props.location.pathname.split('/');
        this.state = {
            code:'::name <Skill_name>\n::author <author_name>\n::author_url <author_url>\n::description <description> \n::dynamic_content <Yes/No>\n::developer_privacy_policy <link>\n::image <image_url>\n::terms_of_use <link>\n\n\nUser query1|query2|quer3....\n!example:<The question that should be shown in public skill displays>\n!expect:<The answer expected for the above example>\nAnswer for the user query',
            fontSizeCode:14,
            editorTheme:'github',
            url:'',
            skillMeta: {
              modelValue: 'general',
              groupValue: parsePath[1],
              languageValue: parsePath[4],
              skillName: parsePath[2]
            },
            latestCommit: parsePath[5],
            revertingCommit: parsePath[6],
            commitData: [],
            commitMessage:'',
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
      let baseUrl = this.getSkillAtCommitIDUrl() ;
      let self = this;
      var url1 = baseUrl + self.state.latestCommit;
      console.log(url1);
      $.ajax({
          url: url1,
          jsonpCallback: 'pc',
          dataType: 'jsonp',
          jsonp: 'callback',
          crossDomain: true,
          success: function (data1) {
            var url2 = baseUrl + self.state.revertingCommit;
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
                    commitID:self.state.latestCommit,
                  },{
                    code:data2.file,
                    commitID:self.state.revertingCommit,
                  }])
                }
            });
          }
      });
    }

    updateData = (commitData) => {
      this.setState({
        commitData: commitData,
        code: commitData[1].code,
        commitMessage: 'Reverting to Commit - '+commitData[1].commitID
      });
    };

    updateCode = (newCode) => {
      this.setState({
        code: newCode,
      });
    };

    handleCommitMessageChange = (event) => {
      this.setState({
        commitMessage: event.target.value,
      });
    };

    handleRollBack = () => {

      if(!cookies.get('loggedIn')) {
          notification.open({
              message: 'Not logged In',
              description: 'Please login and then try to create/edit a skill',
              icon: <Icon type='close-circle' style={{ color: '#f44336' }} />,
          });
          return 0;
      }

      let skillMetaData = this.state.skillMeta;

      if(Object.keys(skillMetaData).length === 0 && skillMetaData.constructor === Object){
        notification.open({
          message: 'Error Processing your Request',
          description: 'Please select a model, group, language and a skill and Try Again',
          icon: <Icon type='close-circle' style={{ color: '#f44336' }} />,
        });
        return 0;
      }

      let latestRevisionCode = this.state.commitData[0].code;
      let oldImageName = latestRevisionCode.match(/^::image\s(.*)$/m);
      let newImageName = this.state.code.match(/^::image\s(.*)$/m);
      if(oldImageName === null || newImageName === null){
        notification.open({
          message: 'Error Processing your Request',
          description: 'Please check the image path and Try Again',
          icon: <Icon type='close-circle' style={{ color: '#f44336' }} />,
        });
        return 0;
      }
      oldImageName = oldImageName[1];
      oldImageName = oldImageName.replace('images/','');
      newImageName = newImageName[1];
      newImageName = newImageName.replace('images/','');

      let form = new FormData();
      form.append('OldModel',skillMetaData.modelValue);
      form.append('OldGroup',skillMetaData.groupValue);
      form.append('OldLanguage',skillMetaData.languageValue);
      form.append('OldSkill',skillMetaData.skillName);
      form.append('NewModel',skillMetaData.modelValue);
      form.append('NewGroup',skillMetaData.groupValue);
      form.append('NewLanguage',skillMetaData.languageValue);
      form.append('NewSkill',skillMetaData.skillName);
      form.append('content',this.state.code);
      form.append('changelog',this.state.commitMessage);
      form.append('imageChanged',false);
      form.append('image_name_changed',true);
      form.append('old_image_name',oldImageName);
      form.append('new_image_name',newImageName);
      form.append('access_token',cookies.get('loggedIn'));

      for(var pair of form.entries()) {
        console.log(pair[0]+ ', '+ pair[1]);
      }

      var settings = {
          'async': true,
          'crossDomain': true,
          'url': 'http://api.susi.ai/cms/modifySkill.json',
          'method': 'POST',
          'processData': false,
          'contentType': false,
          'mimeType': 'multipart/form-data',
          'data': form
      };

      $.ajax(settings)
          .done(function (response) {
            let data = JSON.parse(response);
            console.log(response);
            if(data.accepted===true){
              notification.open({
                message: 'Accepted',
                description: 'Your Skill has been uploaded to the server',
                icon: <Icon type='check-circle' style={{ color: '#00C853' }} />,
              });
              this.props.history.push(
                {
                  pathname: '/'+skillMetaData.groupValue+
                            '/'+skillMetaData.skillName+
                            '/'+skillMetaData.languageValue,
                  state: {
                      fromUpload: true,
                      expertValue:  skillMetaData.skillName,
                      groupValue: skillMetaData.groupValue ,
                      languageValue: skillMetaData.languageValue,
                  }});
            }
            else{
              notification.open({
                message: 'Error Processing your Request',
                description: data.message,
                icon: <Icon type='close-circle' style={{ color: '#f44336' }} />,
              });
            }
          })
          .fail(function (jqXHR, textStatus) {
            notification.open({
              message: 'Error Processing your Request',
              description: 'Error in processing the request. Please try with some other skill',
              icon: <Icon type='close-circle' style={{ color: '#f44336' }} />,
            });
          });
    };

    render(){
      const style = {
          width: '100%',
          padding: '10px'
      };
      let rightEditorWidth = '50%';
      if (window.matchMedia('only screen and (max-width: 768px)').matches){
        rightEditorWidth = '100%';
      }
      return(
        <div>
          <StaticAppBar {...this.props} />
          {this.state.commitData.length === 0 && (
            <h1 className='skill_loading_container'>Loading...</h1>
          )}
          <div style={styles.home}>
            {this.state.commitData.length === 2 && (<div style={{display:'block'}}>
            <Paper style={style} zDepth={1}>
              <div>Currently Viewing : <h3>{this.state.skillMeta.skillName}</h3></div>
            </Paper>
              <div className='version-code-left'>
                <span>commitID: <b>{this.state.commitData[0].commitID}</b></span><br/>
                <span><b>Latest Revision</b></span>
              <div style={styles.codeEditor}>
              <AceEditor
                  mode='java'
                  readOnly={true}
                  theme={this.state.editorTheme}
                  width='100%'
                  fontSize={this.state.fontSizeCode}
                  height= '400px'
                  value={this.state.commitData[0].code}
                  showPrintMargin={false}
                  name='skill_code_editor'
                  editorProps={{$blockScrolling: true}}
              />
              </div>
              </div>
              <div className='version-code-right'>
                <span>commitID: <b>{this.state.commitData[1].commitID}</b></span><br/>
                <span><b>Your Text</b></span>
              <div style={styles.codeEditor}>
              <AceEditor
                  mode='java'
                  readOnly={true}
                  theme={this.state.editorTheme}
                  width={rightEditorWidth}
                  fontSize={this.state.fontSizeCode}
                  height= '400px'
                  value={this.state.commitData[1].code}
                  showPrintMargin={false}
                  name='skill_code_editor'
                  editorProps={{$blockScrolling: true}}
              />
              </div>
              </div>
              <div>
              <h1 className='title' style={{marginTop:'20px'}}>
                  Changes
              </h1>
              {/* latest code should be inputB */}
              <Diff
                inputA={this.state.commitData[0].code}
                inputB={this.state.commitData[1].code}
                type='chars'
                />
              </div>
              <div>
              <h1 className='title' style={{marginTop:'20px'}}>
                  Edit
              </h1>
              <div style={styles.codeEditor}>
                <AceEditor
                    mode='java'
                    theme={this.state.editorTheme}
                    width='100%'
                    fontSize={this.state.fontSizeCode}
                    height= '400px'
                    value={this.state.code}
                    showPrintMargin={false}
                    name='skill_code_editor'
                    onChange={this.updateCode}
                    editorProps={{$blockScrolling: true}}
                />
              </div>
              <div style={{display: 'flex',alignItems:'center',textAlign:'center',justifyContent:'center', marginTop:10}}>
                  <Paper style={{width:'100%',padding:10,display: 'flex',alignItems:'center',textAlign:'center',justifyContent:'center'}} zDepth={1}>
                    <TextField
                        floatingLabelText='Commit message'
                        floatingLabelFixed={true}
                        hintText='Enter Commit Message'
                        style={{width:'80%'}}
                        value={this.state.commitMessage}
                        onChange={this.handleCommitMessageChange}
                    />
                    <RaisedButton
                      label='Save'
                      backgroundColor='#4285f4'
                      labelColor='#fff'
                      style={{marginLeft:10}}
                      onTouchTap={this.handleRollBack} />
                  </Paper>
              </div>
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
        padding: '80px 30px 30px',
    },
    codeEditor:{
        width: '100%',
        marginTop: '20px'
    },
};

SkillRollBack.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
};

export default SkillRollBack;
