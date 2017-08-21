import React from 'react';
import SkillVersion from '../../../components/SkillVersion/SkillVersion';
import { shallow } from 'enzyme';

 it('render SkillVersion without crashing',()=>{
   shallow(<SkillVersion />);
 });
 