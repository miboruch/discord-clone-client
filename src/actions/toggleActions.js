import {
  TOGGLE_CREATE_NAMESPACE,
  TOGGLE_CREATE_ROOM,
  TOGGLE_DARK_THEME,
  SET_DARK_THEME,
  TOGGLE_MENU,
  SET_INFORMATION_OBJECT
} from '../reducers/toggleReducer';

export const toggleCreateNamespace = isOpen => {
  return {
    type: TOGGLE_CREATE_NAMESPACE,
    payload: isOpen
  };
};

export const toggleCreateRoom = isOpen => {
  return {
    type: TOGGLE_CREATE_ROOM,
    payload: isOpen
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

export const setInformationObject = informationObject => {
  return {
    type: SET_INFORMATION_OBJECT,
    payload: informationObject
  };
};
