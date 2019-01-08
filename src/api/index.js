import ajax from '../helper/ajax';
import urls from '../utils/urls';
const { API_URL } = urls;
const AUTH_API_PREFIX = 'aaa';
const CMS_API_PREFIX = 'cms';

export function fetchApiKeys(payload) {
  const url = `${API_URL}/${AUTH_API_PREFIX}/getApiKeys.json`;
  return ajax.get(url);
}

export function getLogin(payload) {
  const { email, password } = payload;
  const url = `${API_URL}/${AUTH_API_PREFIX}/login.json`;
  return ajax.get(url, { login: email, password, type: 'access-token' });
}

export function getSignup(payload) {
  const { email, password } = payload;
  const url = `${API_URL}/${AUTH_API_PREFIX}/signup.json`;
  return ajax.get(url, { signup: email, password });
}

export function fetchMetricsSkills(payload) {
  const { languageValue } = payload;
  const url = `${urls.API_URL}/cms/getSkillMetricsData.json`;
  return ajax.get(url, {
    language: languageValue,
  });
}

export function fetchLanguageOptions(payload) {
  const { groupValue } = payload;
  const url = `${urls.API_URL}/cms/getAllLanguages.json`;
  return ajax.get(url, { group: groupValue });
}

export function fetchGroupOptions() {
  const url = `${urls.API_URL}/cms/getGroups.json`;
  return ajax.get(url, {});
}

export function fetchSkills(payload) {
  const {
    groupValue,
    language,
    filterName,
    filterType,
    showReviewedSkills,
    showStaffPicks,
    searchQuery,
  } = payload;
  const url = `${API_URL}/${CMS_API_PREFIX}/getSkillList.json`;
  return ajax.get(url, {
    group: groupValue,
    language: language,
    applyFilter: 'true',
    filter_name: filterName,
    filter_type: filterType,
    reviewed: showReviewedSkills,
    staff_picks: showStaffPicks,
    q: searchQuery,
  });
}

export function fetchSkillMetaData(payload) {
  const { model, group, language, skill } = payload;
  const url = `${API_URL}/${CMS_API_PREFIX}/getSkillMetadata.json`;
  return ajax.get(url, {
    model,
    group,
    language,
    skill,
  });
}

export function fetchUserSkillRating(payload) {
  const { model, group, language, skill } = payload;
  const url = `${API_URL}/${CMS_API_PREFIX}/getRatingByUser.json`;
  return ajax.get(url, {
    model,
    group,
    language,
    skill,
  });
}

export function changeRating(payload) {
  const { model, group, language, skill, stars } = payload;
  const url = `${API_URL}/${CMS_API_PREFIX}/fiveStarRateSkill.json`;
  return ajax.get(url, {
    model,
    group,
    language,
    skill,
    stars,
  });
}

export function fetchDateWiseSkillUsage(payload) {
  const { model, group, language, skill } = payload;
  const url = `${API_URL}/${CMS_API_PREFIX}/getSkillUsage.json`;
  return ajax.get(url, {
    model,
    group,
    language,
    skill,
  });
}

export function fetchCountryWiseSkillUsage(payload) {
  const { model, group, language, skill } = payload;
  const url = `${API_URL}/${CMS_API_PREFIX}/getCountryWiseSkillUsage.json`;
  return ajax.get(url, {
    model,
    group,
    language,
    skill,
  });
}

export function fetchDeviceWiseSkillUsage(payload) {
  const { model, group, language, skill } = payload;
  const url = `${API_URL}/${CMS_API_PREFIX}/getDeviceWiseSkillUsage.json`;
  return ajax.get(url, {
    model,
    group,
    language,
    skill,
  });
}

export function fetchRatingsOverTime(payload) {
  const { model, group, language, skill } = payload;
  const url = `${API_URL}/${CMS_API_PREFIX}/getRatingsOverTime.json`;
  return ajax.get(url, {
    model,
    group,
    language,
    skill,
  });
}

export function fetchSkillFeedbacks(payload) {
  const { model, group, language, skill } = payload;
  const url = `${API_URL}/${CMS_API_PREFIX}/getSkillFeedback.json`;
  return ajax.get(url, {
    model,
    group,
    language,
    skill,
  });
}

export function postSkillFeedback(payload) {
  const { model, group, language, skill, feedback } = payload;
  const url = `${API_URL}/${CMS_API_PREFIX}/feedbackSkill.json`;
  return ajax.get(url, {
    model,
    group,
    language,
    skill,
    feedback,
  });
}

export function deleteSkillFeedback(payload) {
  const { model, group, language, skill } = payload;
  const url = `${API_URL}/${CMS_API_PREFIX}/removeFeedback.json`;
  return ajax.get(url, {
    model,
    group,
    language,
    skill,
  });
}

export function reportSkill(payload) {
  const { model, group, language, skill, feedback } = payload;
  const url = `${API_URL}/${CMS_API_PREFIX}/reportSkill.json`;
  return ajax.get(url, {
    model,
    group,
    language,
    skill,
    feedback,
  });
}

export function fetchSkillsByAuthor(payload) {
  const { author } = payload;
  const url = `${API_URL}/${CMS_API_PREFIX}/getSkillsByAuthor.json`;
  return ajax.get(url, {
    author,
  });
}

export function deleteSkill(payload) {
  const { model, group, language, skill } = payload;
  const url = `${API_URL}/${CMS_API_PREFIX}/deleteSkill.json`;
  return ajax.get(url, {
    model,
    group,
    language,
    skill,
  });
}
