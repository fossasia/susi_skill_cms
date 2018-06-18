import React from 'react';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import './Explore.css';
import * as $ from 'jquery';
// eslint-disable-next-line
import urls from '../../Utils/urls';

let groups = [];

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: true,
      groups: [],
      groupValue: 'All',
      groupSelect: false,
    };
  }

  componentDidMount() {
    this.loadGroups();
  }

  handleToggle = () => this.setState({ openDrawer: !this.state.openDrawer });

  handleClose = () => this.setState({ openDrawer: false });

  loadGroups = () => {
    if (this.state.groups.length === 0) {
      $.ajax({
        url: urls.API_URL + '/cms/getGroups.json',
        dataType: 'jsonp',
        jsonp: 'callback',
        crossDomain: true,
        success: function(data) {
          data = data.groups;
          data.sort();
          groups.push(<MenuItem value="All" key="All" primaryText="All" />);

          for (let i = 0; i < data.length; i++) {
            groups.push(
              <MenuItem
                value={data[i]}
                key={data[i]}
                primaryText={`${data[i]}`}
              />,
            );
          }
          this.setState({ groups: data });
        }.bind(this),
      });
    }
  };

  render() {
    return (
      <div>
        <StaticAppBar {...this.props} />
        <Drawer
          docked={false}
          autoWidth={true}
          open={this.state.openDrawer}
          onRequestChange={open => this.setState({ openDrawer: open })}
        >
          {groups}
        </Drawer>
      </div>
    );
  }
}

Explore.propTypes = {};

export default Explore;
