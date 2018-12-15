import { handleActions } from 'redux-actions';
import actionTypes from '../actionTypes';

const defaultState = {
  userName: '',
  email: '',
  uuid: '',
  accessToken: '',
  isAdmin: false,
  apiKeys: {},
};

export default handleActions(
  {
    [actionTypes.APP_GET_API_KEYS](state, { payload }) {
      return {
        ...state,
        apiKeys: payload,
      };
    },
    [actionTypes.APP_GET_LOGIN](state, { payload }) {
      const email = payload.requestPayload.login;
      const { uuid, accessToken } = payload;
      return {
        ...state,
        uuid,
        accessToken,
        email: uuid ? email : '',
      };
    },
  },
  defaultState,
);
