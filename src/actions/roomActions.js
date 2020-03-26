import {
  FETCH_ROOMS_START,
  FETCH_ROOMS_SUCCESS,
  ADD_ROOM,
  REMOVE_ROOM,
  SET_CURRENT_ROOM,
  RESET_ROOMS,
  CHAT_LOADING_START,
  CHAT_LOADING_STOP
} from '../reducers/roomReducer';

export const fetchRoomsStart = () => {
  return {
    type: FETCH_ROOMS_START
  };
};

export const fetchRoomsSuccess = rooms => {
  return {
    type: FETCH_ROOMS_SUCCESS,
    payload: rooms
  };
};

export const addRoom = room => {
  return {
    type: ADD_ROOM,
    payload: room
  };
};

export const removeRoom = roomID => {
  return {
    type: REMOVE_ROOM,
    payload: {
      id: roomID
    }
  };
};

export const setCurrentRoom = roomID => {
  return {
    type: SET_CURRENT_ROOM,
    payload: roomID
  };
};

export const resetRooms = () => {
  return {
    type: RESET_ROOMS
  };
};

export const chatLoadingStart = () => {
  return {
    type: CHAT_LOADING_START
  };
};

export const chatLoadingStop = () => {
  return {
    type: CHAT_LOADING_STOP
  };
};
