import React from 'react';
import BrowseHistory from '../../../components/BrowseHistory/BrowseHistory';
import { shallow } from 'enzyme';

 it('render BrowseHistory without crashing',()=>{
   shallow(<BrowseHistory />);
 });
 