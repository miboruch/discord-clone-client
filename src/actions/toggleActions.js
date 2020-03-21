import {
  OPEN_CREATE_NAMESPACE,
  CLOSE_CREATE_NAMESPACE,
  OPEN_CREATE_ROOM,
  CLOSE_CREATE_ROOM,
  TOGGLE_DARK_THEME,
  SET_DARK_THEME,
  TOGGLE_MENU
} from '../reducers/toggleReducer';

export const openCreateNamespace = () => {
  return {
    type: OPEN_CREATE_NAMESPACE
  };
};

export const closeCreateNamespace = () => {
  return {
    type: CLOSE_CREATE_NAMESPACE
  };
};

export const openCreateRoom = () => {
  return {
    type: OPEN_CREATE_ROOM
  };
};

export const closeCreateRoom = () => {
  return {
    type: CLOSE_CREATE_ROOM
  };
};

export const toggleDarkTheme = () => {
  return {
    type: TOGGLE_DARK_THEME
  };
};

export const setDarkThemeState = isDark => {
  return {
    type: SET_DARK_THEME,
    payload: isDark
  };
};

export const toggleMenu = () => {
  return {
    type: TOGGLE_MENU
  };
};
