import React from 'react';
import SkillFeedbackCard from '../../../components/SkillFeedbackCard/SkillFeedbackCard';
import { shallow } from 'enzyme';

describe('<SkillFeedbackCard />', () => {
  it('render SkillFeedbackCard without crashing', () => {
    shallow(<SkillFeedbackCard />);
  });
});
