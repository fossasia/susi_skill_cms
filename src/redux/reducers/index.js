import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './app';
import skills from './skills';
export default combineReducers({
  routing: routerReducer,
  app,
  skills,
});
