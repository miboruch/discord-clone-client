export const CHAT_LOADING = 'CHAT_LOADING';

const initialState = {
  isChatLoading: false
};

export const chatReducer = (state = initialState, action) => {
  switch (action) {
    case CHAT_LOADING:
      return {
        ...state,
        isChatLoading: action.payload
      };
    default:
      return state;
  }
};
