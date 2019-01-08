import { handleActions } from 'redux-actions';
import actionTypes from '../actionTypes';
import { parseDate } from '../../utils';

const defaultState = {
  metaData: {
    skillName: '',
    language: '',
    group: '',
    skillTag: '',
    developerPrivacyPolicy: null,
    descriptions: '',
    image: '',
    author: '',
    authorUrl: '',
    editStatus: true,
    staffPick: false,
    termsOfUse: null,
    dynamicContent: false,
    examples: [],
    skillRatings: {
      oneStar: 0,
      twoStar: 0,
      threeStar: 0,
      fourStar: 0,
      fiveStar: 0,
      avgStar: 0,
      totalStar: 0,
    },
    lastModifiedTime: '',
    supportedLanguages: [],
    lastAccessTime: '',
  },
  userRating: 0,
  author: '',
  feedback: '',
  dateWiseSkillUsage: [],
  countryWiseSkillUsage: [],
  deviceWiseSkillUsage: [],
  ratingsOverTime: [],
  skillFeedbacks: [],
  authorSkills: [],
  loadingSkill: true,
};

export default handleActions(
  {
    [actionTypes.SKILL_GET_METADATA](state, { payload }) {
      const {
        skillName,
        language,
        group,
        skillTag,
        developerPrivacyPolicy,
        descriptions,
        image,
        author,
        authorUrl,
        editable: editStatus,
        staffPick,
        termsOfUse,
        dynamicContent,
        examples,
        supportedLanguages,
        lastModifiedTime,
        skillRating,
      } = payload.skillMetadata;
      const { stars: skillRatings } = skillRating;
      const metaData = {
        developerPrivacyPolicy,
        descriptions,
        image,
        author,
        authorUrl,
        skillName,
        language,
        group,
        skillTag,
        editStatus,
        staffPick,
        termsOfUse,
        dynamicContent,
        examples,
        supportedLanguages,
        lastModifiedTime,
        skillRatings,
      };
      return {
        ...state,
        metaData,
        loadingSkill: false,
      };
    },
    [actionTypes.SKILL_GET_SKILL_RATING](state, { payload }) {
      const { ratings: skillRatings } = payload;
      return {
        ...state,
        metaData: { ...state.metaData, skillRatings },
      };
    },
    [actionTypes.SKILL_GET_USER_RATING](state, { payload }) {
      if (payload.ratings) {
        const { stars } = payload.ratings;
        const userRating = parseInt(stars, 10);
        return {
          ...state,
          userRating,
        };
      }
      return {
        ...state,
      };
    },
    [actionTypes.SKILL_SET_USER_RATING](state, { payload }) {
      const { userRating } = payload;
      return {
        ...state,
        userRating,
      };
    },
    [actionTypes.SKILL_GET_DATEWISE_SKILL_USAGE](state, { payload }) {
      if (payload.skillUsage) {
        const { skillUsage } = payload;
        const filterSkillUsage = skillUsage.filter(day => day !== undefined);
        const dateWiseSkillUsage = filterSkillUsage.map(usage => {
          if (usage !== null) {
            usage.count = parseInt(usage.count, 10);
            return usage;
          }
          return null;
        });
        return {
          ...state,
          dateWiseSkillUsage,
        };
      }
      return {
        ...state,
      };
    },

    [actionTypes.SKILL_GET_COUNTRYWISE_SKILL_USAGE](state, { payload }) {
      if (payload.skillUsage) {
        const { skillUsage } = payload;
        const countryWiseSkillUsage = skillUsage.map(country => [
          country.countryCode,
          parseInt(country.count, 10),
        ]);
        return {
          ...state,
          countryWiseSkillUsage,
        };
      }
      return {
        ...state,
      };
    },
    [actionTypes.SKILL_GET_DEVICEWISE_SKILL_USAGE](state, { payload }) {
      if (payload.skillUsage) {
        let { skillUsage: deviceWiseSkillUsage } = payload;
        deviceWiseSkillUsage.map(device => {
          switch (device.deviceType) {
            case 'Web Client':
              device.color = '#0088FE';
              break;
            case 'Android':
              device.color = '#00C49F';
              break;
            case 'iOS':
              device.color = '#FFBB28';
              break;
            case 'Smart Speaker':
              device.color = '#FF8042';
              break;
            case 'Others':
              device.color = '#EA4335';
              break;
            default:
              device.color = '#673AB7';
              break;
          }
          return null;
        });
        return {
          ...state,
          deviceWiseSkillUsage,
        };
      }
      return {
        ...state,
      };
    },
    [actionTypes.SKILL_GET_RATINGS_OVER_TIME](state, { payload }) {
      if (payload.ratingsOverTime) {
        const { ratingsOverTime: _ratingsOverTime } = payload;
        const ratingsOverTime = _ratingsOverTime.map(item => {
          return {
            rating: item.rating,
            count: item.count,
            timestamp: parseDate(item.timestamp)
              .split(' ')
              .slice(2, 4)
              .join(' '),
          };
        });
        return {
          ...state,
          ratingsOverTime,
        };
      }
      return {
        ...state,
      };
    },
    [actionTypes.SKILL_GET_SKILL_FEEDBACKS](state, { payload }) {
      const { feedback: skillFeedbacks } = payload;
      return {
        ...state,
        skillFeedbacks,
      };
    },

    [actionTypes.SKILL_SET_SKLL_FEEDBACK](state, { payload }) {
      const { feedback } = payload;
      return {
        ...state,
        feedback,
      };
    },
    [actionTypes.SKILL_DELETE_SKILL_FEEDBACK](state, { payload }) {
      return {
        ...state,
        feedback: '',
      };
    },
    [actionTypes.SKILL_GET_AUTHOR_SKILLS](state, { payload }) {
      let skillKeys = Object.keys(payload);
      skillKeys = skillKeys.slice(0, skillKeys.length - 1);
      const authorSkills = skillKeys.map((skillKey, index) => {
        const dataPoints = payload[skillKey].split('/');
        let name = dataPoints[6].split('.')[0];
        name = name.charAt(0).toUpperCase() + name.slice(1);

        if (name.split('_').length > 1) {
          name = name.split('_').join(' ');
        }
        return name;
      });
      return {
        ...state,
        authorSkills,
      };
    },
  },
  {
    ...defaultState,
  },
);
