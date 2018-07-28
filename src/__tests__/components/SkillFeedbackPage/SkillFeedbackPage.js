import React from 'react';
import SkillFeedbackPage from '../../../components/SkillFeedbackPage/SkillFeedbackPage';
import { shallow } from 'enzyme';

describe('<SkillFeedbackPage />', () => {
  it('render SkillFeedbackPage without crashing', () => {
    shallow(
      <SkillFeedbackPage
        location={{ pathname: '/:category/:skill/:lang/feedbacks' }}
      />,
    );
  });
});
