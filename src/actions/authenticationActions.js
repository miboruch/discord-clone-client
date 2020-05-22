import axios from 'axios';
import {
  AUTH_START,
  AUTH_STOP,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER_FAILURE
} from '../reducers/authenticationReducer';
import { API_URL } from '../utils/helpers';

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authStop = () => {
  return {
    type: AUTH_STOP
  };
};

export const authSuccess = (token, userID, name, lastName) => {
  return {
    type: AUTH_SUCCESS,
    payload: {
      token,
      userID,
      name,
      lastName
    }
  };
};

const authLoginFailure = error => {
  return {
    type: AUTH_LOGIN_FAILURE,
    payload: {
      error: error
    }
  };
};

const authRegisterFailure = error => {
  return {
    type: AUTH_REGISTER_FAILURE,
    payload: {
      error: error
    }
  };
};

const userLogout = () => {
  return {
    type: AUTH_LOGOUT
  };
};

export const authLogout = () => dispatch => {
  dispatch(authStart());
  localStorage.removeItem('token');
  localStorage.removeItem('userID');

  dispatch(userLogout());
};

export const userLogin = (email, password, history) => async dispatch => {
  dispatch(authStart());

  try {
    const { data } = await axios.post(`${API_URL}/user/login`, { email, password });
    dispatch(authSuccess(data.token, data.id, data.name, data.lastName));

    localStorage.setItem('token', data.token);
    localStorage.setItem('userID', data.id);
    history.push('/home');
  } catch (error) {
    dispatch(authLoginFailure(error));
  }
};

export const userRegister = (email, password, name, lastName, history) => async dispatch => {
  dispatch(authStart());

  try {
    const { data } = await axios.post(`${API_URL}/user/register`, {
      email,
      password,
      name,
      lastName
    });

    const userData = data._doc;

    dispatch(authSuccess(data.token, userData._id, userData.name, userData.lastName));
    localStorage.setItem('token', data.token);
    localStorage.setItem('userID', data._doc._id);
    history.push('/home');
  } catch (error) {
    dispatch(authRegisterFailure(error));
  }
};

export const authenticationCheck = () => async dispatch => {
  dispatch(authStart());
  const token = localStorage.getItem('token');
  const userID = localStorage.getItem('userID');

  if (token && userID) {
    try {
      const { data } = await axios.get(`${API_URL}/user/user-name`, {
        headers: {
          'auth-token': token
        }
      });

      dispatch(authSuccess(token, userID, data.name, data.lastName));
    } catch (error) {
      dispatch(authStop());
    }
  } else {
    dispatch(authStop());
  }
};
