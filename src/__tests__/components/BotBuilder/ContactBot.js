import React from 'react';
import ContactBot from '../../../components/BotBuilder/ContactBot';
import { shallow } from 'enzyme';

describe('<ContactBot />', () => {
  it('render ContactBot without crashing', () => {
    shallow(<ContactBot />);
  });
});
