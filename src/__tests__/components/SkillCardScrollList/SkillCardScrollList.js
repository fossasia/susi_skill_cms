import React from 'react';
import SkillCardScrollList from '../../../components/SkillCardScrollList/SkillCardScrollList';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
const mockStore = configureMockStore();
const store = mockStore({});

describe('<SkillCardScrollList />', () => {
  it('render SkillCardScrollList without crashing', () => {
    shallow(
      <Provider store={store}>
        <SkillCardScrollList />
      </Provider>,
    );
  });
});
