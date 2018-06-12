import React from 'react';
import BrowseSkill from '../../../components/BrowseSkill/BrowseSkill';
import { shallow } from 'enzyme';

it('render BrowseSkill without crashing', () => {
  shallow(<BrowseSkill />);
});
