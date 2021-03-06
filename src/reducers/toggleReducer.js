export const TOGGLE_CREATE_NAMESPACE = 'TOGGLE_CREATE_NAMESPACE';
export const TOGGLE_CREATE_ROOM = 'TOGGLE_CREATE_ROOM';
export const TOGGLE_DARK_THEME = 'TOGGLE_DARK_THEME';
export const SET_DARK_THEME = 'SET_DARK_THEME';
export const TOGGLE_MENU = 'TOGGLE_MENU';
export const SET_INFORMATION_OBJECT = 'SET_INFORMATION_OBJECT';
export const TOGGLE_CONFIRM_BOX = 'TOGGLE_CONFIRM_BOX';

const initialState = {
  isCreateNamespaceOpen: false,
  isCreateRoomOpen: false,
  isDarkTheme: JSON.parse(localStorage.getItem('isDarkTheme')),
  isMenuOpen: false,
  informationObject: null,
  isConfirmOpen: false
};

export const toggleReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CREATE_NAMESPACE:
      return {
        ...state,
        isCreateNamespaceOpen: action.payload
      };
    case TOGGLE_CREATE_ROOM:
      return {
        ...state,
        isCreateRoomOpen: action.payload
      };
    case TOGGLE_DARK_THEME:
      localStorage.setItem('isDarkTheme', `${!state.isDarkTheme}`);
      return {
        ...state,
        isDarkTheme: !state.isDarkTheme
      };
    case SET_DARK_THEME:
      return {
        ...state,
        isDarkTheme: action.payload
      };
    case TOGGLE_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      };
    case SET_INFORMATION_OBJECT:
      return {
        ...state,
        informationObject: action.payload
      };
    case TOGGLE_CONFIRM_BOX:
      return{
        ...state,
        isConfirmOpen: action.payload
      };
    default:
      return state;
  }
};
