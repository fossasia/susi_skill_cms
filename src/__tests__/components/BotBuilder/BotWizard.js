import React from 'react';
import BotWizard from '../../../components/BotBuilder/BotWizard';
import { shallow } from 'enzyme';

it('render BotWizard without crashing', () => {
  shallow(<BotWizard />);
});
