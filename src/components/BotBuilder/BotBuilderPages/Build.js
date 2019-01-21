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
};

export default Build;
