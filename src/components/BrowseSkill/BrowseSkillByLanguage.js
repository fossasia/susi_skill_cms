import React from 'react';
import BrowseSkill from './BrowseSkill';
import { Paper } from 'material-ui';
import PropTypes from 'prop-types';
import ISO6391 from 'iso-639-1';

export default class BrowseSkillByCategory extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let language = this.props.location.pathname.split('/')[2];
    return (
      <div>
        <Paper className="margin-t-md">
          <div
            style={{
              marginTop: '25px',
              padding: '25px',
            }}
          >
            <h1 className="title">
              Language: {ISO6391.getNativeName(language)}
            </h1>
          </div>
        </Paper>
        <BrowseSkill selector="language" value={language} />
      </div>
    );
  }
}

BrowseSkillByCategory.propTypes = {
  location: PropTypes.string,
  selector: PropTypes.string,
};
