import React from 'react';
import Explore from '../../../components/Explore/Explore';
import { shallow } from 'enzyme';

it('render Explore without crashing', () => {
  shallow(<Explore />);
});
