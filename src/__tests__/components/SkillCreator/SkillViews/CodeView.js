import React from 'react';
import CodeView from '../../../../components/SkillCreator/SkillViews/CodeView';
import { shallow } from 'enzyme';

describe('<CodeView />', () => {
  it('render CodeView without crashing', () => {
    shallow(<CodeView />);
  });
});
