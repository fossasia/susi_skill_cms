import React from 'react';
import Configure from '../../../../components/BotBuilder/BotBuilderPages/Configure';
import { shallow } from 'enzyme';

describe('<Configure />', () => {
  it('render Configure without crashing', () => {
    shallow(<Configure />);
  });
});
