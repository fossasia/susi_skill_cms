import { createAction } from 'redux-actions';
import actionTypes from '../actionTypes';
import {
  getLogin,
  getSignup,
  fetchApiKeys,
  getAdmin,
  fetchUserSkill,
} from '../../api';

const returnArgumentsFn = function(payload) {
  return Promise.resolve(payload);
};

export default {
  getApiKeys: createAction(actionTypes.APP_GET_API_KEYS, fetchApiKeys),
  getLogin: createAction(actionTypes.APP_GET_LOGIN, getLogin),
  getSignup: createAction(actionTypes.APP_GET_SIGNUP, getSignup),
  logout: createAction(actionTypes.APP_LOGOUT, returnArgumentsFn),
  getAdmin: createAction(actionTypes.APP_GET_ADMIN, getAdmin),
  getUserSkills: createAction(actionTypes.APP_GET_USER_SKILLS, fetchUserSkill),
};
