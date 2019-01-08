import React from 'react';
import SkillRatingCard from '../../../components/SkillRating/SkillRatingCard';
import { shallow } from 'enzyme';

describe('<SkillRatingCard />', () => {
  it('render SkillRatingCard without crashing', () => {
    shallow(<SkillRatingCard />);
  });
});
