import React from 'react';
import BrowseExamples from '../../../components/BrowseExamples/BrowseExamples';
import { shallow } from 'enzyme';

 it('render BrowseExamples without crashing',()=>{
   shallow(<BrowseExamples />);
 });
 