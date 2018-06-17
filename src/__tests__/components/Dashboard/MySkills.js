import React from 'react';
import MySkills from '../../../components/Dashboard/MySkills';
import { shallow } from 'enzyme';

describe('<MySkills />', () => {
  it('render MySkills without crashing', () => {
    shallow(<MySkills />);
  });
});
