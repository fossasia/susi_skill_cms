import React from 'react';
import ConversationView from '../../../../components/SkillCreator/SkillViews/ConversationView';
import { shallow } from 'enzyme';

describe('<ConversationView />', () => {
  it('render ConversationView without crashing', () => {
    shallow(<ConversationView />);
  });
});
