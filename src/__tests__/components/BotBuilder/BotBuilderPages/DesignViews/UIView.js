import React from 'react';
import UIView from '../../../../../components/BotBuilder/BotBuilderPages/DesignViews/UIView';
import { shallow } from 'enzyme';

describe('<UIView />', () => {
  it('render UIView without crashing', () => {
    shallow(<UIView />);
  });
});
