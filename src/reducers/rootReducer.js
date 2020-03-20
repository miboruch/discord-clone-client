import { combineReducers } from 'redux';
import { authenticationReducer } from './authenticationReducer';
import { toggleReducer } from './toggleReducer';
import {namespaceReducer} from './namespaceReducer';
import {roomReducer} from './roomReducer';

export const rootReducer = combineReducers({
  authenticationReducer,
  toggleReducer,
  namespaceReducer,
  roomReducer
});
