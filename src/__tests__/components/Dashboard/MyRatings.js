import React from 'react';
import MyRatings from '../../../components/Dashboard/MyRatings';
import { shallow } from 'enzyme';

describe('<MyRatings />', () => {
  it('render MyRatings without crashing', () => {
    shallow(<MyRatings />);
  });
});
