import React from 'react';
import Logout from '../../../components/Auth/Logout.react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore();
const store = mockStore({});

describe('<Logout />', () => {
  it('render Logout without crashing', () => {
    shallow(
      <Provider store={store}>
        <Logout />
      </Provider>,
    );
  });
});
