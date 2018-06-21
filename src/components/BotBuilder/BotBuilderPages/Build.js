import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import CodeView from './BuildViews/CodeView';
import PropTypes from 'prop-types';
import ConversationView from './BuildViews/ConversationView';
import TreeView from './BuildViews/TreeView';
class Build extends Component {
  constructor(props) {
    super(props);
    let skillCode =
      '::name <Skill_name>\n::author <author_name>\n::author_url <author_url>\n::description <description> \n::dynamic_content <Yes/No>\n::developer_privacy_policy <link>\n::image <image_url>\n::terms_of_use <link>\n\n\nUser query1|query2|quer3....\n!example:<The question that should be shown in public skill displays>\n!expect:<The answer expected for the above example>\nAnswer for the user query';
    if (this.props.code) {
      skillCode = this.props.code;
    }
    this.state = {
      value: 1,
      treeData: {
        name: 'Welcome!',
        children: [],
      },
      ConversationData: {
        userQueries: [],
        botResponses: [],
      },
      skillCode,
    };
  }

  handleChange = (event, index, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    this.generateSkillData();
  }

  onSkillChange = skillCode => {
    this.setState({ skillCode });
    this.generateSkillData();
  };

  generateSkillData = () => {
    let treeData_new = {
      name: 'Welcome!',
      children: [],
    };
    let user_index = 0;
    let bot_index = 0;
    var conversationData_new = {
      userQueries: [],
      botResponses: [],
    };
    let tree_children = [];
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
        conversationData_new.botResponses.push(responses_bot);
        for (let response of responses_bot) {
          let obj = {
            name: response.trim(),
            type: 'bot',
          };
          bot_responses.push(obj);
        }
      }
      let queries = line_user.trim().split('|');
      conversationData_new.userQueries.push(queries);

      for (let query of queries) {
        let obj = {
          name: query.trim(),
          type: 'user',
          children: this.getChildren(bot_responses, bot_index),
          id: 'u' + user_index++,
        };
        bot_index += bot_responses.length;
        tree_children.push(obj);
      }
    }
    treeData_new.children = tree_children;
    this.setState({ ConversationData: conversationData_new });
    this.setState({ treeData: treeData_new });
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
    let { treeData } = this.state;
    for (let i = 0; i < treeData.children.length; i++) {
      let child = treeData.children[i];
      if (child.id === node.id) {
        treeData.children.splice(i, 1);
        break;
      }
      if (child.children) {
        for (let j = 0; j < child.children.length; j++) {
          let childNode = child.children[j];
          if (childNode.id === node.id) {
            treeData.children[i].children.splice(j, 1);
          }
        }
      }
    }
    this.setState({ treeData }, this.generateSkillCode());
  };
  generateSkillCode = () => {
    let { skillCode, treeData } = this.state;
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
    for (let j = 0; j < treeData.children.length; j++) {
      let node = treeData.children[j];
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
          <h2>Add a new skill to your bot</h2>
          <br />
          <DropDownMenu
            value={this.state.value}
            onChange={this.handleChange}
            style={styles.customWidth}
            autoWidth={false}
          >
            <MenuItem value={1} primaryText="Code View" />
            <MenuItem value={2} primaryText="Conversation View" />
            <MenuItem value={3} primaryText="Tree View" />
          </DropDownMenu>
          <div style={{ paddingTop: 20 }}>
            {this.state.value === 1 ? (
              <CodeView
                botBuilder={{
                  onSkillChange: this.onSkillChange,
                  code: this.state.skillCode,
                }}
              />
            ) : null}
            {this.state.value === 2 ? (
              <ConversationView
                ConversationData={this.state.ConversationData}
                treeData={this.state.treeData}
                handleDeleteNode={this.handleDeleteNode}
              />
            ) : null}
            {this.state.value === 3 ? (
              <TreeView
                treeData={this.state.treeData}
                handleDeleteNode={this.handleDeleteNode}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  customWidth: {
    width: 250,
  },
};
Build.propTypes = {
  code: PropTypes.string,
};

export default Build;
