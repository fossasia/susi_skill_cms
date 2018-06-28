import React from 'react';
import ConversationView from '../../../../../components/BotBuilder/BotBuilderPages/BuildViews/ConversationView';
import { shallow } from 'enzyme';

describe('<ConversationView />', () => {
  it('render ConversationView without crashing', () => {
    shallow(<ConversationView />);
  });
});
