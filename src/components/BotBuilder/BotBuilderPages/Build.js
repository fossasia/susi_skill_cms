import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import CodeView from './BuildViews/CodeView';
import ConversationView from './BuildViews/ConversationView';
import TreeView from './BuildViews/TreeView';
class Build extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      treeData: {
        name: 'Welcome!',
        children: [],
      },
      skillCode:
        '::name <Skill_name>\n::author <author_name>\n::author_url <author_url>\n::description <description> \n::dynamic_content <Yes/No>\n::developer_privacy_policy <link>\n::image <image_url>\n::terms_of_use <link>\n\n\nUser query1|query2|quer3....\n!example:<The question that should be shown in public skill displays>\n!expect:<The answer expected for the above example>\nAnswer for the user query',
      skills: [],
    };
  }

  handleChange = (event, index, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    this.generateTreeData();
  }

  onSkillChange = skillCode => {
    this.setState({ skillCode });
    this.generateTreeData();
  };
  generateTreeData = () => {
    let treeData_new = {
      name: 'Welcome!',
      children: [],
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
            bot_response = lines[i];
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
          children: bot_responses,
        };
        tree_children.push(obj);
      }
    }
    treeData_new.children = tree_children;
    this.setState({ treeData: treeData_new });
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
              <ConversationView treeData={this.state.treeData} />
            ) : null}
            {this.state.value === 3 ? (
              <TreeView treeData={this.state.treeData} />
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

export default Build;
