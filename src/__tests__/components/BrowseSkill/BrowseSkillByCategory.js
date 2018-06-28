import React from 'react';
import BrowseSkillByCategory from '../../../components/BrowseSkill/BrowseSkillByCategory';
import { shallow } from 'enzyme';

describe('<BrowseSkillByCategory />', () => {
  it('render BrowseSkillByCategory without crashing', () => {
    shallow(<BrowseSkillByCategory />);
  });
});
