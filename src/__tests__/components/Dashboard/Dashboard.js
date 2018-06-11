import React from 'react';
import Dashboard from '../../../components/Dashboard/Dashboard';
import { shallow } from 'enzyme';

it('render Dashboard without crashing', () => {
   shallow(<Dashboard />);
});
