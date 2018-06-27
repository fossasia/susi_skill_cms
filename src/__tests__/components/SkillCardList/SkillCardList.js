import React from 'react';
import SkillCardList from '../../../components/SkillCardList/SkillCardList';
import { shallow } from 'enzyme';

describe('<SkillCardList />', () => {
  it('render SkillCardList without crashing', () => {
    shallow(<SkillCardList />);
  });
});
