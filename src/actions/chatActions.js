import { CHAT_LOADING, SET_MESSAGES, ADD_MESSAGE, FETCH_PREVIOUS_MESSAGES } from '../reducers/chatReducer';

export const chatLoading = isLoading => {
  return {
    type: CHAT_LOADING,
    payload: isLoading
  };
};

export const setMessages = messages => {
  return {
    type: SET_MESSAGES,
    payload: messages
  };
};

export const addMessage = message => {
  return {
    type: ADD_MESSAGE,
    payload: message
  };
};

export const fetchPreviousMessages = messages => {
  return {
    type: FETCH_PREVIOUS_MESSAGES,
    payload: messages
  };
};
