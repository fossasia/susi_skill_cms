import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './app';
import skills from './skills';
import skill from './skill';
export default combineReducers({
  routing: routerReducer,
  app,
  skills,
  skill,
});
