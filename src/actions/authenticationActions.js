import axios from 'axios';
import {
  AUTH_START,
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

export const authSuccess = (token, userID) => {
  return {
    type: AUTH_SUCCESS,
    payload: {
      token: token,
      userID: userID
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
    dispatch(authSuccess(data.token, data.id));

    localStorage.setItem('token', data.token);
    localStorage.setItem('userID', data.id);
    history.push('/');
  } catch (error) {
    dispatch(authLoginFailure(error));
  }
};

export const userRegister = (email, password, name, lastName, nick) => async dispatch => {
  dispatch(authStart());

  try {
    const { data } = await axios.post(`${API_URL}/user/register`, {
      email,
      password,
      name,
      lastName,
      nick
    });
    console.log(data);
    dispatch(authSuccess(data.token, data._doc._id));
    localStorage.setItem('token', data.token);
    localStorage.setItem('userID', data._doc._id);
    history.push('/');
  } catch (error) {
    dispatch(authRegisterFailure(error));
  }
};

export const authenticationCheck = () => async dispatch => {
  const token = localStorage.getItem('token');
  const userID = localStorage.getItem('userID');

  if (token && userID) {
    dispatch(authSuccess(token, userID));
  }
};
