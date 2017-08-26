import React from 'react';
import ForgotPassword from '../../../../components/Auth/ForgotPassword/ForgotPassword';
import { shallow } from 'enzyme';

 it('render ForgotPassword without crashing',()=>{
   shallow(<ForgotPassword />);
 });
