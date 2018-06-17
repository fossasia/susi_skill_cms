import React from 'react';
import NotFound from '../../../components/NotFound/NotFound';
import { shallow } from 'enzyme';

describe('<NotFound />', () => {
  it('render NotFound without crashing', () => {
    shallow(<NotFound />);
  });
});
