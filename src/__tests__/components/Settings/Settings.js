import React from 'react';
import Settings from '../../../components/Settings/Settings';
import { shallow } from 'enzyme';

 it('render NotFound without crashing',()=>{
   shallow(<Settings />);
 });
