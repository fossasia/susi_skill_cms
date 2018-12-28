import { handleActions } from 'redux-actions';
import actionTypes from '../actionTypes';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const defaultState = {
  viewType: 'list',
  loadingSkills: false,
  metricSkills: {
    staffPicksSkills: [],
    topRatedSkills: [],
    topUsedSkills: [],
    latestUpdatedSkills: [],
    newestSkills: [],
    topFeedbackSkills: [],
    topGames: [],
  },
  // Skills
  skills: [],
  groups: [],
  languages: [],
  // Filter
  modelValue: 'general', // constant
  groupValue: 'All',
  languageValue: ['en'],
  filterName: 'ascending',
  filterType: '',
  searchQuery: '',
  ratingRefine: null,
  reviewed: false,
  staffPicks: false,
};

const cookiesSettingValues = {
  languageValue: cookies.get('languages'),
};

export default handleActions(
  {
    [actionTypes.SKILLS_GET_METRICS_SKILLS](state, { payload }) {
      const { metricSkills } = payload;
      return {
        ...state,
        ...metricSkills,
        loadingSkills: false,
      };
    },
    [actionTypes.SKILLS_GET_LANGUAGE_OPTIONS](state, { payload }) {
      const { languages } = payload;
      return {
        ...state,
        languages,
      };
    },
    [actionTypes.SKILLS_GET_GROUP_OPTIONS](state, { payload }) {
      const { groups } = payload;
      return {
        ...state,
        groups,
      };
    },
    [actionTypes.SKILLS_GET_SKILL_LIST](state, { payload }) {
      return {
        ...state,
        ...payload,
        loadingSkills: false,
      };
    },
    // Filters
    [actionTypes.SKILLS_SET_FILTER_TYPE](state, { payload }) {
      const { filter_type: filterType } = payload;
      return {
        ...state,
        filterType,
        loadingSkills: true,
      };
    },
    [actionTypes.SKILLS_SET_LANGUAGE_FILTER](state, { payload }) {
      const { languageValue } = payload;
      return {
        ...state,
        languageValue,
        loadingSkills: true,
      };
    },
    [actionTypes.SKILLS_SET_ORDER_BY_FILTER](state, { payload }) {
      const { filter_name: filterName } = payload;
      return {
        ...state,
        filterName,
        loadingSkills: true,
      };
    },
    [actionTypes.SKILLS_SET_CATEGORY_FILTER](state, { payload }) {
      const { groupValue } = payload;
      return {
        ...state,
        groupValue,
        loadingSkills: true,
      };
    },
    [actionTypes.SKILLS_SET_SEARCH_FILTER](state, { payload }) {
      const { searchQuery } = payload;
      return {
        ...state,
        searchQuery,
        loadingSkills: true,
      };
    },
    [actionTypes.SKILLS_SET_REVIEW_FILTER](state, { payload }) {
      const { reviewed } = payload;
      return {
        ...state,
        reviewed,
        loadingSkills: true,
      };
    },
    [actionTypes.SKILLS_SET_STAFFPICK_FILTER](state, { payload }) {
      const { staffPicks } = payload;
      return {
        ...state,
        staffPicks,
        loadingSkills: true,
      };
    },
    [actionTypes.SKILLS_SET_STAR_RATING_FILTER](state, { payload }) {
      const { ratingRefine } = payload;
      return {
        ...state,
        skills: state.skills.filter(
          skill =>
            skill.skill_rating &&
            skill.skill_rating.stars.avg_star >= ratingRefine,
        ),
        ratingRefine,
      };
    },

    // View
    [actionTypes.SKILLS_SET_VIEWTYPE](state, { payload }) {
      const { viewType } = payload;
      return {
        ...state,
        viewType,
      };
    },
  },
  {
    ...defaultState,
    ...cookiesSettingValues,
  },
);
