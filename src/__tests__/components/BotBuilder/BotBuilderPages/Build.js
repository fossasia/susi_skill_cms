import React from 'react';
import Build from '../../../../components/BotBuilder/BotBuilderPages/Build';
import { shallow } from 'enzyme';

describe('<Build />', () => {
  it('render Build without crashing', () => {
    shallow(<Build />);
  });
});
