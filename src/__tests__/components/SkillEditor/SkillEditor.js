import React from 'react';
import SkillEditor from '../../../components/SkillEditor/SkillEditor';
import { shallow } from 'enzyme';

describe('<SkillEditor />', () => {
  it('render SkillEditor without crashing', () => {
    shallow(
      <SkillEditor location={{ pathname: '/:category/:skill/edit/:lang' }} />,
    );
  });
});
