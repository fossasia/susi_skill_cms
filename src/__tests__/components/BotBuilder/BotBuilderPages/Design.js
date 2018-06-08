import React from 'react';
import Design from '../../../../components/BotBuilder/BotBuilderPages/Design';
import { shallow } from 'enzyme';

 it('render Design without crashing',()=>{
   shallow(<Design />);
 });
