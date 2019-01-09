import React from 'react';
import SkillCardGrid from '../../../components/SkillCardGrid/SkillCardGrid';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
const mockStore = configureMockStore();
const store = mockStore({});

describe('<SkillCardGrid />', () => {
  it('render SkillCardGrid without crashing', () => {
    shallow(
      <Provider store={store}>
        <SkillCardGrid />
      </Provider>,
    );
  });
});
