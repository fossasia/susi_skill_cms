import React from 'react';
import BrowseSkill from './BrowseSkill';
import PropTypes from 'prop-types';
import ISO6391 from 'iso-639-1';

export default class BrowseSkillByCategory extends React.Component {
  render() {
    let language = this.props.location.pathname.split('/')[2];
    let text = `Language: ${ISO6391.getNativeName(language)}`;
    return (
      <BrowseSkill
        routeType="language"
        routeValue={language}
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
