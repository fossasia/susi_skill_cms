import React from 'react';
import MySkills from '../../../components/Dashboard/MySkills';
import { shallow } from 'enzyme';

it('render MySkills without crashing', () => {
  shallow(<MySkills />);
});
