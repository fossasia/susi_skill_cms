import React from 'react';
import BotBuilderWrap from '../../../components/BotBuilder/BotBuilderWrap';
import { shallow } from 'enzyme';

describe('<BotBuilderWrap />', () => {
  it('render BotBuilderWrap without crashing', () => {
    shallow(<BotBuilderWrap />);
  });
});
