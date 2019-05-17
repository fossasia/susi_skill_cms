import React from 'react';
import Build from '../../../../components/BotBuilder/BotBuilderPages/Build';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
const mockStore = configureMockStore();
const store = mockStore({});

describe('<Build />', () => {
  it('render Build without crashing', () => {
    shallow(
      <Provider store={store}>
        <Build />
      </Provider>,
    );
  });
});
