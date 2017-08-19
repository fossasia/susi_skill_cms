import React from 'react';
import SkillHistory from '../../../components/SkillHistory/SkillHistory';
import { shallow } from 'enzyme';

 it('render SkillHistory without crashing',()=>{
   shallow(<SkillHistory />);
 });
 