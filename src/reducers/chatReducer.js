export const CHAT_LOADING = 'CHAT_LOADING';
export const SET_MESSAGES = 'SET_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const FETCH_PREVIOUS_MESSAGES = 'FETCH_PREVIOUS_MESSAGES';

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
    case FETCH_PREVIOUS_MESSAGES:
      return {
        ...state,
        messages: [...action.payload, ...state.messages]
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
