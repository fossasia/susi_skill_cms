import React from 'react';
import SkillVersion from '../../../components/SkillVersion/SkillVersion';
import { shallow } from 'enzyme';

describe('<SkillVersion />', () => {
  it('render SkillVersion without crashing', () => {
    shallow(
      <SkillVersion
        location={{ pathname: '/:category/:skill/versions/:lang' }}
      />,
    );
  });
});
