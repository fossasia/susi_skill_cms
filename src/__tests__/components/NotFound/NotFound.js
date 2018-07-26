import React from 'react';
import NotFound from '../../../components/NotFound/NotFound.react';
import { shallow } from 'enzyme';

describe('<NotFound />', () => {
  it('render NotFound without crashing', () => {
    shallow(<NotFound />);
  });
});
