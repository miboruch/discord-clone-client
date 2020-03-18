export const OPEN_CREATE_NAMESPACE = 'OPEN_CREATE_NAMESPACE';
export const CLOSE_CREATE_NAMESPACE = 'CLOSE_CREATE_NAMESPACE';
export const OPEN_CREATE_ROOM = 'OPEN_CREATE_ROOM';
export const CLOSE_CREATE_ROOM = 'CLOSE_CREATE_ROOM';
export const TOGGLE_DARK_THEME = 'TOGGLE_DARK_THEME';

const initialState = {
  isCreateNamespaceOpen: false,
  isCreateRoomOpen: false,
  isDarkTheme: false
};

export const toggleReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_CREATE_NAMESPACE:
      return {
        ...state,
        isCreateNamespaceOpen: true
      };
    case CLOSE_CREATE_NAMESPACE:
      return {
        ...state,
        isCreateNamespaceOpen: false
      };
    case OPEN_CREATE_ROOM:
      return {
        ...state,
        isCreateRoomOpen: true
      };
    case CLOSE_CREATE_ROOM:
      return {
        ...state,
        isCreateRoomOpen: false
      };
    case TOGGLE_DARK_THEME:
      return {
        ...state,
        isDarkTheme: !state.isDarkTheme
      };
    default:
      return state;
  }
};
