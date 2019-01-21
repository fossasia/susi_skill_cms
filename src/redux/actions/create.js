import { createAction } from 'redux-actions';
import actionTypes from '../actionTypes';
import * as apis from '../../api';

const returnArgumentsFn = function(payload) {
  return Promise.resolve(payload);
};

const createActions = {
  setView: createAction(actionTypes.CREATE_SET_VIEW),
  setSkillData: createAction(
    actionTypes.CREATE_SET_SKILL_DATA,
    returnArgumentsFn,
  ),
  setDesignData: createAction(
    actionTypes.CREATE_SET_DESIGN_DATA,
    returnArgumentsFn,
  ),
  setConfigureData: createAction(
    actionTypes.CREATE_SET_CONFIGURE_DATA,
    returnArgumentsFn,
  ),
  saveSkillData: createAction(actionTypes.CREATE_SAVE_SKILL, apis.saveSkill),
  getSkillByCommitId: createAction(
    actionTypes.CREATE_GET_SKILL_BY_COMMIT_ID,
    apis.fetchSkillByCommitId,
  ),
  getSkillCode: createAction(
    actionTypes.CREATE_GET_SKILL_CODE,
    apis.fetchSkillCode,
  ),
  getAuthorUrl: createAction(
    actionTypes.CREATE_GET_AUTHOR_URL,
    apis.fetchAuthorUrl,
  ),
  getConversationResponse: createAction(
    actionTypes.CREATE_GET_CONVERSATION_RESPONSE,
    apis.fetchConverstionResponse,
  ),
  getDraftBotDetails: createAction(
    actionTypes.CREATE_GET_DRAFT_BOT_DETAILS,
    apis.readDraft,
  ),
  getBotDetails: createAction(
    actionTypes.CREATE_GET_BOT_DETAILS,
    apis.fetchBotDetails,
  ),
  setBotAvatar: createAction(
    actionTypes.CREATE_SET_BOT_AVATAR,
    apis.uploadBotImage,
  ),
  setBotBackgroundImage: createAction(
    actionTypes.CREATE_SET_BOT_BACKGROUND_IMAGE,
    apis.uploadBotImage,
  ),
};

export default createActions;
