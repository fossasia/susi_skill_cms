import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SkillCodeView from '../../../SkillCreator/SkillViews/CodeView';

class CodeView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div>
          <SkillCodeView botBuilder={this.props.botBuilder} />
        </div>
      </div>
    );
  }
}

CodeView.propTypes = {
  botBuilder: PropTypes.object,
};

export default CodeView;
