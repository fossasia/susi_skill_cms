import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SkillTreeView from '../../../SkillCreator/SkillViews/TreeView';
import 'react-orgchart/index.css';

class TreeView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <SkillTreeView
          skillData={this.props.skillData}
          handleDeleteNode={this.props.handleDeleteNode}
        />
      </div>
    );
  }
}

TreeView.propTypes = {
  skillData: PropTypes.object,
  handleDeleteNode: PropTypes.func,
};
export default TreeView;
