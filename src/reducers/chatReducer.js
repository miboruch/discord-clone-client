export const CHAT_LOADING = 'CHAT_LOADING';
export const SET_MESSAGES = 'SET_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';

const initialState = {
  isChatLoading: false,
  messages: []
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_LOADING:
      return {
        ...state,
        isChatLoading: action.payload
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    default:
      return state;
  }
};
