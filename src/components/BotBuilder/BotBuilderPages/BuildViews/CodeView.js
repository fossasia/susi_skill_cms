import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CreateSkill from '../../../CreateSkill/CreateSkill';

class CodeView extends Component {

  constructor(props) {
    super(props);
    this.state ={
    };
  }

  componentDidMount(){
  }

  render() {
    return (
      <div className='menu-page'>
        <div>
            <CreateSkill onSkillChange={this.props.onSkillChange} botBuilder={true}/>
        </div>
      </div>
    );
  }
}

CodeView.propTypes = {
  onSkillChange: PropTypes.func
};

export default CodeView;
