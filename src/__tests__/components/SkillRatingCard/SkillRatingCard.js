import React from 'react';
import SkillRatingCard from '../../../components/SkillRatingCard/SkillRatingCard';
import { shallow } from 'enzyme';

it('render SkillRatingCard without crashing', () => {
   shallow(<SkillRatingCard />);
});
