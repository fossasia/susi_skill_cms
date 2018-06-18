import React from 'react';
import Explore from '../../../components/Explore/Explore';
import { shallow } from 'enzyme';

describe('<Explore />', () => {
  it('render Explore without crashing', () => {
    shallow(<Explore />);
  });
});
