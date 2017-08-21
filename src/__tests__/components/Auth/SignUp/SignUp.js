import React from 'react';
import SignUp from '../../../../components/Auth/SignUp/SignUp';
import { shallow } from 'enzyme';

 it('render SignUp without crashing',()=>{
   shallow(<SignUp />);
 });
 