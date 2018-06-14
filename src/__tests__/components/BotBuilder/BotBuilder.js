import React from 'react';
import BotBuilder from '../../../components/BotBuilder/BotBuilder';
import { shallow } from 'enzyme';

it('render BotBuilder without crashing', () => {
  shallow(<BotBuilder />);
});
