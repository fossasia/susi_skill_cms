import React from 'react';
import Configure from '../../../../components/BotBuilder/BotBuilderPages/Configure';
import { shallow } from 'enzyme';

 it('render Configure without crashing',()=>{
   shallow(<Configure />);
 });
