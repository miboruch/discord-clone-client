import { combineReducers } from 'redux';
import { authenticationReducer } from './authenticationReducer';
import { projectDataReducer } from './projectDataReducer';

export const rootReducer = combineReducers({
  authenticationReducer,
  projectDataReducer
});
