import React from 'react';
import Login from '../../../../components/Auth/Login/Login';
import { shallow } from 'enzyme';

describe('<Login />', () => {
  it('render Login without crashing', () => {
    shallow(<Login />);
  });
});
