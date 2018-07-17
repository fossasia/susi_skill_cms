import React, { Component } from 'react';
import BrowseSkill from './BrowseSkill';
import PropTypes from 'prop-types';

export default class BrowseSkillByCategory extends Component {
  componentDidMount() {
    document.title = `SUSI.AI - ${
      this.props.location.pathname.split('/')[2]
    } Skills`;
  }
  render() {
    let category = '';
    let text = '';
    if (this.props.location) {
      category = this.props.location.pathname.split('/')[2];
      text = `Category: ${category}`;
    }

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
