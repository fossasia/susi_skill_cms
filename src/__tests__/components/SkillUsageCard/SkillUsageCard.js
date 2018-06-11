import React from 'react';
import SkillUsageCard from '../../../components/SkillUsageCard/SkillUsageCard';
import { shallow } from 'enzyme';

it('render SkillUsageCard without crashing', () => {
   shallow(<SkillUsageCard />);
});
