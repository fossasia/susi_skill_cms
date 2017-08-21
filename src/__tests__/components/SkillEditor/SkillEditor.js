import React from 'react';
import SkillEditor from '../../../components/SkillEditor/SkillEditor';
import { shallow } from 'enzyme';

 it('render SkillEditor without crashing',()=>{
   shallow(<SkillEditor location={{"pathname": "/Knowledge/gender/edit/en"}} />);
 });
 