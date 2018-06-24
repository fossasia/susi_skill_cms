import React from 'react';
import BrowseSkill from './BrowseSkill';
import PropTypes from 'prop-types';

export default class BrowseSkillByCategory extends React.Component {
  render() {
    let category = this.props.location.pathname.split('/')[2];
    let text = `Category: ${category}`;
    return (
      <BrowseSkill
        routeType="category"
        routeValue={category}
        routeTitle={text}
      />
    );
  }
}

BrowseSkillByCategory.propTypes = {
  location: PropTypes.object,
  selector: PropTypes.string,
  text: PropTypes.string,
};
