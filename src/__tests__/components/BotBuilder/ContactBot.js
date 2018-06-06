import React from 'react';
import ContactBot from '../../../components/BotBuilder/ContactBot';
import { shallow } from 'enzyme';

 it('render ContactBot without crashing',()=>{
   shallow(<ContactBot />);
 });
