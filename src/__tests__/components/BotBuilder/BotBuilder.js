import React from 'react';
import BotBuilder from '../../../components/BotBuilder/BotBuilder';
import { shallow } from 'enzyme';

describe('<BotBuilder />', () => {
  it('render BotBuilder without crashing', () => {
    shallow(<BotBuilder />);
  });
});
