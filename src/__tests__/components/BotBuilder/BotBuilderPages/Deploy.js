import React from 'react';
import Deploy from '../../../../components/BotBuilder/BotBuilderPages/Deploy';
import { shallow } from 'enzyme';

describe('<Deploy />', () => {
  it('render Deploy without crashing', () => {
    shallow(<Deploy />);
  });
});
