import React from 'react';
import CodeView from '../../../../../components/BotBuilder/BotBuilderPages/DesignViews/CodeView';
import { shallow } from 'enzyme';

describe('<CodeView />', () => {
  it('render CodeView without crashing', () => {
    shallow(<CodeView />);
  });
});
