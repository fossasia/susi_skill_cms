import React from 'react';
import ListUser from '../../../../components/Admin/ListUser/ListUser';
import { shallow } from 'enzyme';

 it('render ListUser without crashing',()=>{
   shallow(<ListUser />);
 });
