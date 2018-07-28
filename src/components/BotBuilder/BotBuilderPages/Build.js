import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Code from 'material-ui/svg-icons/action/code';
import QA from 'material-ui/svg-icons/action/question-answer';
import Timeline from 'material-ui/svg-icons/action/timeline';
import CodeView from './BuildViews/CodeView';
import PropTypes from 'prop-types';
import ConversationView from './BuildViews/ConversationView';
import TreeView from './BuildViews/TreeView';
class Build extends Component {
  constructor(props) {
    super(props);
    let skillCode = '';
    let skillCategory = null,
      skillLanguage,
      skillName;
    if (this.props.code) {
      skillCode = this.props.code;
      skillCategory = skillCode
        .split('::category ')[1]
        .split('::')[0]
        .trim();
      if (skillCategory === '<Category>') {
        skillCategory = null;
      }
      skillLanguage = skillCode
        .split('::language ')[1]
        .split('::')[0]
        .trim();
      skillName = skillCode
        .split('::name ')[1]
        .split('::')[0]
        .trim();
    }
    this.state = {
      skillData: {
        name: 'Welcome!', // Starting message of chatbot
        children: [], // contains subsequent user queries and bot responses
      },
      skillCode,
      skillCategory,
      skillLanguage,
      skillName,
      codeView: true,
      conversationView: false,
      treeView: false,
    };
  }

  componentDidMount() {
    this.generateSkillData();
  }

  sendInfoToProps = values => {
    this.setState({ skillCode: values.code }, () => this.generateSkillData());
    this.props.sendInfoToProps(values);
  };

  generateSkillData = () => {
    let skillData_new = {
      name: 'Welcome!',
      children: [],
    };
    let user_index = 0;
    let bot_index = 0;
    let skill_children = [];
    var lines = this.state.skillCode.split('\n');
    let skills = [];
    for (let i = 0; i < lines.length; i++) {
      let bot_response = null;
      let line = lines[i];
      if (
        line &&
        !line.startsWith('::') &&
        !line.startsWith('!') &&
        !line.startsWith('#')
      ) {
        let user_query = line;
        while (true) {
          i++;
          if (i >= lines.length) {
            break;
          }
          line = lines[i];
          if (
            line &&
            !line.startsWith('::') &&
            !line.startsWith('!') &&
            !line.startsWith('#')
          ) {
            bot_response = line;
            break;
          }
        }
        let obj = {
          user_query,
          bot_response,
        };
        skills.push(obj);
      }
    }
    for (let i = 0; i < skills.length; i++) {
      // for each skill, add to the tree
      let skill = skills[i];
      let line_user = skill.user_query;
      let line_bot = skill.bot_response;
      let bot_responses = [];
      if (line_bot) {
        let responses_bot = line_bot.trim().split('|');
        for (let response of responses_bot) {
          let obj = {
            name: response.trim(),
            type: 'bot',
          };
          bot_responses.push(obj);
        }
      }
      let queries = line_user.trim().split('|');

      for (let query of queries) {
        let obj = {
          name: query.trim(),
          type: 'user',
          children: this.getChildren(bot_responses, bot_index),
          id: 'u' + user_index++,
        };
        bot_index += bot_responses.length;
        skill_children.push(obj);
      }
    }
    skillData_new.children = skill_children;
    this.setState({ skillData: skillData_new });
  };

  getChildren = (bot_responses, bot_index) => {
    var arr = [];
    for (let i of bot_responses) {
      arr.push({
        ...i,
        id: 'b' + bot_index++,
      });
    }
    return arr;
  };

  handleDeleteNode = node => {
    let { skillData } = this.state;
    for (let i = 0; i < skillData.children.length; i++) {
      let child = skillData.children[i];
      if (child.id === node.id) {
        skillData.children.splice(i, 1);
        break;
      }
      if (child.children) {
        for (let j = 0; j < child.children.length; j++) {
          let childNode = child.children[j];
          if (childNode.id === node.id) {
            skillData.children[i].children.splice(j, 1);
          }
        }
      }
    }
    this.setState({ skillData }, this.generateSkillCode());
  };

  generateSkillCode = () => {
    let { skillCode, skillData } = this.state;
    let lines = skillCode.split('\n');
    let newSkillCode = '';
    let i = 0;
    for (i = 0; i < lines.length; i++) {
      let line = lines[i];
      // add meta data from top
      if (
        line === '' ||
        line.startsWith('::') ||
        line.startsWith('!') ||
        line.startsWith('#')
      ) {
        newSkillCode += line + '\n';
      } else {
        break;
      }
    }
    for (let j = 0; j < skillData.children.length; j++) {
      let node = skillData.children[j];
      newSkillCode += node.name + '\n';
      if (node.children) {
        for (let k = 0; k < node.children.length; k++) {
          if (k !== node.children.length - 1) {
            newSkillCode += node.children[k].name + ' | ';
          } else {
            newSkillCode += node.children[k].name + '\n';
          }
        }
      }
    }
    this.setState({ skillCode: newSkillCode }, this.generateSkillData());
  };

  render() {
    return (
      <div className="menu-page">
        <div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <h1 style={{ lineHeight: '50px' }}>
              1. Add a new skill to your bot
            </h1>
            <div style={{ marginLeft: 'auto', marginRight: '0px' }}>
              <IconButton
                tooltip="Code View"
                onTouchTap={() => {
                  this.setState({
                    codeView: true,
                    conversationView: false,
                    treeView: false,
                  });
                }}
                disableTouchRipple={true}
              >
                <Code
                  color={
                    this.state.codeView
                      ? 'rgb(66, 133, 244)'
                      : 'rgb(158, 158, 158)'
                  }
                />
              </IconButton>
              <IconButton
                tooltip="Conversation View"
                onTouchTap={() => {
                  this.setState({
                    codeView: false,
                    conversationView: true,
                    treeView: false,
                  });
                }}
                disableTouchRipple={true}
              >
                <QA
                  color={
                    this.state.conversationView
                      ? 'rgb(66, 133, 244)'
                      : 'rgb(158, 158, 158)'
                  }
                />
              </IconButton>
              <IconButton
                tooltip="Tree View"
                onTouchTap={() => {
                  this.setState({
                    codeView: false,
                    conversationView: false,
                    treeView: true,
                  });
                }}
                disableTouchRipple={true}
              >
                <Timeline
                  color={
                    this.state.treeView
                      ? 'rgb(66, 133, 244)'
                      : 'rgb(158, 158, 158)'
                  }
                />
              </IconButton>
            </div>
          </div>
          <div style={{ paddingTop: 20 }}>
            {this.state.codeView ? (
              <CodeView
                botBuilder={{
                  sendInfoToProps: this.sendInfoToProps,
                  code: this.state.skillCode,
                  name: this.state.skillName,
                  category: this.state.skillCategory,
                  language: this.state.skillLanguage,
                  onSkillInfoChange: this.onSkillInfoChange,
                  onImageChange: this.props.onImageChange,
                  imageFile: this.props.imageFile,
                  image: this.props.image,
                  imageUrl: this.props.imageUrl,
                }}
              />
            ) : null}
            {this.state.conversationView ? (
              <ConversationView
                skillData={this.state.skillData}
                handleDeleteNode={this.handleDeleteNode}
              />
            ) : null}
            {this.state.treeView ? (
              <TreeView
                skillData={this.state.skillData}
                handleDeleteNode={this.handleDeleteNode}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

Build.propTypes = {
  code: PropTypes.string,
  sendInfoToProps: PropTypes.func,
  onImageChange: PropTypes.func,
  imageFile: PropTypes.object,
  image: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default Build;
