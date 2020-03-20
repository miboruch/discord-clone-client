import {
  FETCH_ROOMS_START,
  FETCH_ROOMS_SUCCESS,
  ADD_ROOM,
  REMOVE_ROOM
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

