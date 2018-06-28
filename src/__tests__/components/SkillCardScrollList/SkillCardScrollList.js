import React from 'react';
import SkillCardScrollList from '../../../components/SkillCardScrollList/SkillCardScrollList';
import { shallow } from 'enzyme';

describe('<SkillCardScrollList />', () => {
  it('render SkillCardScrollList without crashing', () => {
    shallow(<SkillCardScrollList />);
  });
});
