import { CHAT_LOADING } from '../reducers/chatReducer';

export const chatLoading = isLoading => {
  return {
    type: CHAT_LOADING,
    payload: isLoading
  };
};
