import React from 'react';
import BrowseSkill from './BrowseSkill';
import { Paper } from 'material-ui';
import PropTypes from 'prop-types';

export default class BrowseSkillByCategory extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let category = this.props.location.pathname.split('/')[2];
    return (
      <div>
        <Paper className="margin-t-md">
          <div
            style={{
              marginTop: '25px',
              padding: '25px',
            }}
          >
            <h1 className="title">Category: {category}</h1>
          </div>
        </Paper>
        <BrowseSkill selector="category" value={category} />
      </div>
    );
  }
}

BrowseSkillByCategory.propTypes = {
  location: PropTypes.string,
  selector: PropTypes.string,
};
