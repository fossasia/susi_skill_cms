import { handleActions } from 'redux-actions';
import actionTypes from '../actionTypes';
import { avatars, urls } from '../../utils';

import Cookies from 'universal-cookie';

const cookies = new Cookies();
const { API_URL } = urls;
let avatarsIcon = avatars.slice()[1].url;
const CMS_API_PREFIX = 'cms';
const IMAGE_GET_URL = `${API_URL}/${CMS_API_PREFIX}/getImage.png?image=`;

const defaultState = {
  skill: {
    name: '',
    file: null,
    category: null,
    language: '',
    image: avatarsIcon,
    imageUrl: '<image_name>',
    code:
      '::name <Bot_name>\n::category <Category>\n::language <Language>\n::author <author_name>\n::author_url <author_url>\n::description <description> \n::dynamic_content <Yes/No>\n::developer_privacy_policy <link>\n::image images/<image_name>\n::terms_of_use <link>\n\n\nUser query1|query2|quer3....\n!example:<The question that should be shown in public skill displays>\n!expect:<The answer expected for the above example>\nAnswer for the user query',
  },
  design: {
    botbuilderBackgroundBody: '#ffffff',
    botbuilderBodyBackgroundImg: '',
    botbuilderUserMessageBackground: '#0077e5',
    botbuilderUserMessageTextColor: '#ffffff',
    botbuilderBotMessageBackground: '#f8f8f8',
    botbuilderBotMessageTextColor: '#455a64',
    botbuilderIconColor: '#000000',
    botbuilderIconImg: '',
    code:
      '::bodyBackground #ffffff\n::bodyBackgroundImage \n::userMessageBoxBackground #0077e5\n::userMessageTextColor #ffffff\n::botMessageBoxBackground #f8f8f8\n::botMessageTextColor #455a64\n::botIconColor #000000\n::botIconImage ',
  },
  configCode:
    "::allow_bot_only_on_own_sites no\n!Write all the domains below separated by commas on which you want to enable your chatbot\n::allowed_sites \n!Choose if you want to enable the default susi skills or not\n::enable_default_skills yes\n!Choose if you want to enable chatbot in your devices or not\n::enable_bot_in_my_devices no\n!Choose if you want to enable chatbot in other user's devices or not\n::enable_bot_for_other_users no",
  step: 'build',
  view: 'code',
  loading: true,
};

export default handleActions(
  {
    [actionTypes.CREATE_SET_VIEW](state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    [actionTypes.CREATE_SET_SKILL_DATA](state, { payload }) {
      return {
        ...state,
        skill: {
          ...state.skill,
          ...payload,
        },
      };
    },
    [actionTypes.CREATE_SET_DESIGN_DATA](state, { payload }) {
      return {
        ...state,
        design: {
          ...state.design,
          ...payload,
        },
      };
    },
    [actionTypes.CREATE_SET_CONFIGURE_DATA](state, { payload }) {
      const { configureCode } = payload;
      return {
        ...state,
        configureCode,
      };
    },
    [actionTypes.CREATE_SAVE_SKILL](state, { payload }) {
      return {
        ...state,
      };
    },
    [actionTypes.CREATE_GET_SKILL_BY_COMMIT_ID](state, { payload }) {
      const { file: code } = payload;
      return {
        ...state,
        skill: {
          ...state.skill,
          code,
        },
      };
    },
    [actionTypes.CREATE_GET_AUTHOR_URL](state, { payload }) {
      if (payload.data.items) {
        const data = payload.data.items;
        for (let i = 0; i < data.length; i++) {
          if (data[i].type === 'User') {
            let newCode = String(state.skill.code);
            newCode.replace(
              /^::author_url\s(.*)$/m,
              '::author_url ' + data[i].html_url,
            );
            return {
              ...state,
              skill: {
                ...state.skill,
                code: newCode,
              },
            };
          }
        }
      } else {
        return {
          ...state,
        };
      }
    },
    [actionTypes.CREATE_GET_CONVERSATION_RESPONSE](state, { payload }) {
      return {
        ...state,
        loading: false,
      };
    },
    [actionTypes.CREATE_GET_DRAFT_BOT_DETAILS](state, { payload }) {
      if (Object.keys(payload.drafts).length > 0) {
        Object.keys(payload.drafts).forEach(key => {
          const draft = payload.drafts[key];
          const {
            name,
            language,
            group: category,
            buildCode: code,
            configCode,
          } = draft;
          let { designCode } = draft;
          designCode = designCode.replace(
            'bodyBackground ',
            'bodyBackground #',
          );
          designCode = designCode.replace(
            'userMessageBoxBackground ',
            'userMessageBoxBackground #',
          );
          designCode = designCode.replace(
            'userMessageTextColor ',
            'userMessageTextColor #',
          );
          designCode = designCode.replace(
            'botMessageBoxBackground ',
            'botMessageBoxBackground #',
          );
          designCode = designCode.replace(
            'botMessageTextColor ',
            'botMessageTextColor #',
          );
          designCode = designCode.replace('botIconColor ', 'botIconColor #');
          return {
            ...state,
            skill: {
              ...state.skill,
              name,
              language,
              category,
              code,
            },
            design: {
              ...state.design,
              designCode,
            },
            configCode,
          };
        });
      } else {
        return {
          ...state,
        };
      }
    },
    [actionTypes.CREATE_GET_BOT_DETAILS](state, { payload }) {
      let { text } = payload;
      const buildCode = '::name' + text.split('::name')[1];
      const designCode =
        '::bodyBackground ' +
        text.split('::bodyBackground ')[1].split('::name')[0];
      const configCode =
        '::allow_bot_only_on_own_sites' +
        text
          .split('::allow_bot_only_on_own_sites')[1]
          .split('::bodyBackground')[0];
      const imageNameMatch = buildCode.match(/^::image\s(.*)$/m);
      let imagePreviewUrl;
      const localImages = [
        'images/<image_name>',
        'images/<image_name_event>',
        'images/<image_name_job>',
        'images/<image_name_contact>',
      ];
      if (!localImages.includes(imageNameMatch[1])) {
        imagePreviewUrl = `${
          urls.API_URL
        }/cms/getImage.png?access_token=${cookies.get('loggedIn')}&language=${
          state.skill.language
        }&group=${state.skill.category}&image=${imageNameMatch[1]}`;
      } else if (imageNameMatch[1] === 'images/<image_name_event>') {
        imagePreviewUrl = '/botTemplates/event-registration.jpg';
      } else if (imageNameMatch[1] === 'images/<image_name_job>') {
        imagePreviewUrl = '/botTemplates/job-application.jpg';
      } else if (imageNameMatch[1] === 'images/<image_name_contact>') {
        imagePreviewUrl = '/botTemplates/contact-us.png';
      } else {
        imagePreviewUrl = state.skill.image;
      }
      return {
        ...state,
        skill: {
          ...state.skill,
          code: buildCode,
          image: imagePreviewUrl,
          imageUrl: imageNameMatch[1],
        },
        design: {
          ...state.design,
          code: designCode,
        },
        configCode,
        loading: false,
      };
    },

    [actionTypes.CREATE_SET_BOT_BACKGROUND_IMAGE](state, { payload }) {
      const response = JSON.parse(payload);
      const imagePath = { response };
      const botbuilderBodyBackgroundImg = IMAGE_GET_URL + imagePath;
      const botbuilderBodyBackgroundImgName = response.imagePath.substring(
        imagePath.indexOf('_') + 1,
      );
      let code = String(state.skill.code);
      code = code.replace(
        /^::bodyBackgroundImage\s(.*)$/m,
        `::bodyBackgroundImage ${botbuilderBodyBackgroundImg}`,
      );
      return {
        ...state,
        design: {
          ...state.design,
          code,
          botbuilderBodyBackgroundImg,
          botbuilderBodyBackgroundImgName,
        },
      };
    },
    [actionTypes.CREATE_SET_BOT_AVATAR](state, { payload }) {
      const response = JSON.parse(payload);
      const imagePath = { response };
      const botbuilderIconImg = IMAGE_GET_URL + imagePath;
      let code = String(state.skill.code);
      code = code.replace(
        /^::botIconImage\s(.*)$/m,
        `::botIconImage ${botbuilderIconImg}`,
      );
      return {
        ...state,
        design: {
          ...state.design,
          code,
          botbuilderIconImg,
        },
      };
    },
  },
  {
    ...defaultState,
  },
);
