import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateSkill from '../../../CreateSkill/CreateSkill';

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
          <h3>
            Know more about{' '}
            <a
              href="https://github.com/fossasia/susi_skill_cms/blob/master/docs/Skill_Tutorial.md"
              rel="noopener noreferrer"
              target="_blank"
            >
              SUSI Skill Language
            </a>
          </h3>
          <br />
          <CreateSkill botBuilder={this.props.botBuilder} />
        </div>
      </div>
    );
  }
}

CodeView.propTypes = {
  botBuilder: PropTypes.object,
};

export default CodeView;
