import React from 'react';
import BrowseSkill from '../../../components/BrowseSkill/BrowseSkill';
import { shallow } from 'enzyme';

describe('<BrowseSkill />', () => {
  it('render BrowseSkill without crashing', () => {
    shallow(<BrowseSkill />);
  });
});
