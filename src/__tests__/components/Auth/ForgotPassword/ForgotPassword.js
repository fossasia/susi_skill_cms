import React from 'react';
import ForgotPassword from '../../../../components/Auth/ForgotPassword/ForgotPassword';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
const mockStore = configureMockStore();
const store = mockStore({});

describe('<ForgotPassword />', () => {
  it('render ForgotPassword without crashing', () => {
    shallow(
      <Provider store={store}>
        <ForgotPassword />
      </Provider>,
    );
  });
});
