import React from 'react';
import SkillCreator from '../../../components/SkillCreator/SkillCreator';
import { shallow } from 'enzyme';

describe('<SkillCreator />', () => {
  it('render SkillCreator without crashing', () => {
    shallow(<SkillCreator />);
  });
});
