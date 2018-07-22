import React from 'react';
import CodeView from '../../../../../components/BotBuilder/BotBuilderPages/ConfigureViews/CodeView';
import { shallow } from 'enzyme';

describe('<CodeView />', () => {
  it('render CodeView without crashing', () => {
    shallow(<CodeView />);
  });
});
