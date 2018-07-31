import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SkillCreator from '../../SkillCreator/SkillCreator';
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
    };
  }

  sendInfoToProps = values => {
    this.setState({ skillCode: values.code });
    this.props.sendInfoToProps(values);
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
            <SkillCreator
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
  preferUiView: PropTypes.string,
  onChangePreferUiView: PropTypes.func,
};

export default Build;
