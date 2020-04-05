export const AUTH_START = 'AUTH_START';
export const AUTH_STOP = 'AUTH_STOP';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
export const AUTH_REGISTER_FAILURE = 'AUTH_REGISTER_FAILURE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

const initialState = {
  isLoggedIn: false,
  token: null,
  userID: null,
  userName: {},
  loading: true,
  loginError: null,
  registerError: null
};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: true
      };
    case AUTH_STOP:
      return {
        ...state,
        loading: false
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userID: action.payload.userID,
        userName: { name: action.payload.name, lastName: action.payload.lastName },
        isLoggedIn: true,
        loading: false,
        loginError: null,
        registerError: null
      };
    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        loginError: action.payload.error,
        isLoggedIn: false,
        loading: false
      };
    case AUTH_REGISTER_FAILURE:
      return {
        ...state,
        registerError: action.payload.error,
        isLoggedIn: false,
        loading: false
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        loginError: null,
        registerError: null,
        token: null,
        userID: null,
        isLoggedIn: false,
        loading: false
      };
    default:
      return state;
  }
};
