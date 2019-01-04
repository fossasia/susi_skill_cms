import React from 'react';
import SkillCard from '../../../components/SkillCardScrollList/SkillCard';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
const mockStore = configureMockStore();
const store = mockStore({});

describe('<SkillCard />', () => {
  it('render SkillCard without crashing', () => {
    shallow(
      <Provider store={store}>
        <SkillCard />
      </Provider>,
    );
  });
});
