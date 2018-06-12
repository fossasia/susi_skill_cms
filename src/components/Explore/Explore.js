import React from 'react';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import './Explore.css';

class Explore extends React.Component {
  render() {
    return (
      <div>
        <StaticAppBar {...this.props} />
      </div>
    );
  }
}

Explore.propTypes = {};

export default Explore;
