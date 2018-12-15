import { createAction } from 'redux-actions';
import actionTypes from '../actionTypes';
import { getLogin } from '../../api';

const returnArgumentsFn = function(payload) {
  return Promise.resolve(payload);
};

export default {
  getApiKeys: createAction(actionTypes.APP_GET_API_KEYS, returnArgumentsFn),
  getLogin: createAction(actionTypes.APP_GET_LOGIN, getLogin),
};
