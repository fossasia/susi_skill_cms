import React from 'react';
import NotFound from '../../../components/NotFound/NotFound.react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
const mockStore = configureMockStore();
const store = mockStore({});

describe('<NotFound />', () => {
  it('render NotFound without crashing', () => {
    shallow(
      <Provider store={store}>
        <NotFound />
      </Provider>,
    );
  });
});
