import React from 'react';
import SkillUsageCard from '../../../components/SkillUsageCard/SkillUsageCard';
import { shallow } from 'enzyme';

describe('<SkillUsageCard />', () => {
  it('render SkillUsageCard without crashing', () => {
    shallow(<SkillUsageCard />);
  });
});
