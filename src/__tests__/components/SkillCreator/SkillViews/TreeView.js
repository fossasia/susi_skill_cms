import React from 'react';
import TreeView from '../../../../components/SkillCreator/SkillViews/TreeView';
import { shallow } from 'enzyme';

describe('<TreeView />', () => {
  it('render TreeView without crashing', () => {
    shallow(<TreeView />);
  });
});
