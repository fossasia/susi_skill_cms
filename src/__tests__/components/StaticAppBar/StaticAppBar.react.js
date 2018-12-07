import React from 'react';
import StaticAppBar from '../../../components/StaticAppBar/StaticAppBar.react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({});

describe('<StaticAppBar />', () => {
  it('render StaticAppBar without crashing', () => {
    shallow(
      <Provider store={store}>
        <StaticAppBar />
      </Provider>,
    );
  });
});
