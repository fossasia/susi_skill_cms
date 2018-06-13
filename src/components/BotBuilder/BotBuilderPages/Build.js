import React, {Component} from 'react';
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
      skillCode:''
    };
  }

  handleChange = (event, index, value) => {
    this.setState({value});
  }
  componentDidMount(){
  }
  onSkillChange = (skillCode) =>{
    this.setState({skillCode});
  }
  render() {
    return (
      <div className='menu-page'>
        <div>
          <h2>Add a new skill to your bot</h2>
          <br/>
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
          <div style={{paddingTop: 20}}>
            {(this.state.value===1)?
              (<CodeView onSkillChange={this.onSkillChange} botBuilder={true}/>):null}
            {(this.state.value===2)?(<ConversationView/>):null}
            {(this.state.value===3)?(<TreeView/>):null}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  customWidth: {
    width: 250
  },
};

export default Build;
