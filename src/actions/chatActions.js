import { CHAT_LOADING, SET_MESSAGES, ADD_MESSAGE } from '../reducers/chatReducer';

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
  console.log('ADD MESSAGE MESSAGE');
  console.log(message);
  return {
    type: ADD_MESSAGE,
    payload: message
  };
};
