import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import CreateSkill from '../../CreateSkill/CreateSkill';
class Build extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  handleChange = (event, index, value) => {
    this.setState({ value });
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
            {this.state.value === 1 ? <CreateSkill botBuilder={true} /> : ''}
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
