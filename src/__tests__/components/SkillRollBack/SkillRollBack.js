import React from 'react';
import SkillRollBack from '../../../components/SkillRollBack/SkillRollBack';
import { shallow } from 'enzyme';

describe('<SkillRollBack />', () => {
  it('render SkillRollBack without crashing', () => {
    shallow(
      <SkillRollBack
        location={{
          pathname: '/:category/:skill/edit/:lang/:latestid/:revertid',
        }}
      />,
    );
  });
});
