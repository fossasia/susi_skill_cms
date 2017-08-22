import React from 'react';
import CreateSkill from '../../../components/CreateSkill/CreateSkill';
import { shallow } from 'enzyme';

 it('render CreateSkill without crashing',()=>{
   shallow(<CreateSkill />);
 });
