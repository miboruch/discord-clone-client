import { combineReducers } from 'redux';
import { authenticationReducer } from './authenticationReducer';
import { projectDataReducer } from './projectDataReducer';
import { toggleReducer } from './toggleReducer';

export const rootReducer = combineReducers({
  authenticationReducer,
  projectDataReducer,
  toggleReducer
});
