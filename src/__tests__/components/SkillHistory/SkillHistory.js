import React from 'react';
import SkillHistory from '../../../components/SkillHistory/SkillHistory';
import { shallow } from 'enzyme';

it('render SkillHistory without crashing', () => {
  shallow(
    <SkillHistory
      location={{
        pathname: '/:category/:skill/compare/:lang/:oldid/:recentid',
      }}
    />,
  );
});
