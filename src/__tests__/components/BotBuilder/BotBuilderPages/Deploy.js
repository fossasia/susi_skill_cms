import React from 'react';
import Deploy from '../../../../components/BotBuilder/BotBuilderPages/Deploy';
import { shallow } from 'enzyme';

 it('render Deploy without crashing',()=>{
   shallow(<Deploy />);
 });
