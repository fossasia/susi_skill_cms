import React from 'react';
import StaticAppBar from '../../../components/StaticAppBar/StaticAppBar.react';
import { shallow } from 'enzyme';

 it('render StaticAppBar without crashing',()=>{
   shallow(<StaticAppBar />);
 });
