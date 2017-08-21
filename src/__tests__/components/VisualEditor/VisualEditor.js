import React from 'react';
import VisualEditor from '../../../components/VisualEditor/VisualEditor';
import { shallow } from 'enzyme';

 it('render VisualEditor without crashing',()=>{
   shallow(<VisualEditor />);
 });
 