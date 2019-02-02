import { handleActions } from 'redux-actions';
import actionTypes from '../actionTypes';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

const defaultState = {
  userName: '',
  email: '',
  uuid: '',
  accessToken: '',
  isAdmin: false,
  apiKeys: {},
  userSkills: [],
};

const { emailId, uuid, loggedIn, username } = cookies.getAll();

const cookiesAppValues = {
  email: emailId,
  uuid,
  accessToken: loggedIn,
  userName: username,
};

export default handleActions(
  {
    [actionTypes.APP_GET_API_KEYS](state, { payload }) {
      const { keys } = payload;
      return {
        ...state,
        apiKeys: keys,
      };
    },
    [actionTypes.APP_GET_LOGIN](state, { payload }) {
      const email = payload.requestPayload.login;
      const { uuid, accessToken } = payload;
      return {
        ...state,
        uuid,
        accessToken,
        email: accessToken ? email : '',
      };
    },
    [actionTypes.APP_LOGOUT](state, { payload }) {
      return {
        ...defaultState,
      };
    },
    [actionTypes.APP_GET_ADMIN](state, { payload }) {
      const { showAdmin: isAdmin } = payload;
      return {
        ...state,
        isAdmin,
      };
    },
    [actionTypes.APP_GET_USER_SKILLS](state, { payload }) {
      let skillsData = [];
      for (let i of payload.filteredData) {
        skillsData.push({
          skillName: i.skillName,
          type: 'public',
          status: 'active',
          ...i,
        });
      }
      const userSkills = skillsData.filter(item => {
        if (item.authorEmail === state.email) {
          return item;
        }
        return null;
      });
      return {
        ...state,
        userSkills,
      };
    },
  },
  {
    ...defaultState,
    ...cookiesAppValues,
  },
);
