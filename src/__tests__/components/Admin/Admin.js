import React from 'react';
import Admin from '../../../components/Admin/Admin';
import { shallow } from 'enzyme';

describe('<Admin />', () => {
  it('render Admin without crashing', () => {
    shallow(<Admin />);
  });
});
