import React from 'react';
import Preview from '../../../../components/BotBuilder/Preview/Preview';
import { shallow } from 'enzyme';

describe('<Preview />', () => {
  it('render Preview without crashing', () => {
    shallow(<Preview />);
  });
});
