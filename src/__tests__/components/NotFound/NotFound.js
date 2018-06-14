import React from 'react';
import NotFound from '../../../components/NotFound/NotFound';
import { shallow } from 'enzyme';

it('render NotFound without crashing', () => {
  shallow(<NotFound />);
});
