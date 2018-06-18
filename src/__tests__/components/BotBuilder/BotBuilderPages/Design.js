import React from 'react';
import Design from '../../../../components/BotBuilder/BotBuilderPages/Design';
import { shallow } from 'enzyme';

describe('<Design />', () => {
  it('render Design without crashing', () => {
    shallow(<Design />);
  });
});
