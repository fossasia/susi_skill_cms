import React, {Component} from 'react';
import CreateSkill from '../../CreateSkill/CreateSkill';
class Build extends Component {

  render() {

    return (
      <div className='menu-page'>
          <div>
            <h2>Add a new skill to your bot</h2>
            <br/>
            <CreateSkill botBuilder={true}/>
          </div>
        </div>
      );
    }
  }

  export default Build;
