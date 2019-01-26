import React from 'react';
import SkillCardList from '../../../components/SkillCardList/SkillCardList';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
const mockStore = configureMockStore();
const store = mockStore({});

describe('<SkillCardList />', () => {
  it('render SkillCardList without crashing', () => {
    shallow(
      <Provider store={store}>
        <SkillCardList />
      </Provider>,
    );
  });
});
