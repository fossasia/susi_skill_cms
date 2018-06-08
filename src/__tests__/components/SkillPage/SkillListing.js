import React from 'react';
import SkillListing from '../../../components/SkillPage/SkillListing';
import { shallow } from 'enzyme';

 it('render SkillListing without crashing',()=>{
   shallow(<SkillListing />);
 });
