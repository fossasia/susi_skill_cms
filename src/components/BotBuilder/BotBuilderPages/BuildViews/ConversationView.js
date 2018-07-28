import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SkillConversationView from '../../../SkillCreator/SkillViews/ConversationView';

class ConversationView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <SkillConversationView
          skillData={this.props.skillData}
          handleDeleteNode={this.props.handleDeleteNode}
        />
      </div>
    );
  }
}

ConversationView.propTypes = {
  skillData: PropTypes.object,
  handleDeleteNode: PropTypes.func,
};
export default ConversationView;
