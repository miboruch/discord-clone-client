import {
  FETCH_ROOMS_START,
  FETCH_ROOMS_SUCCESS,
  ADD_ROOM,
  REMOVE_ROOM,
  SET_CURRENT_ROOM_NAME,
  SET_ROOM_MEMBERS,
  RESET_ROOMS,
  SET_ROOM_INFO
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

export const setCurrentRoomName = roomName => {
  return {
    type: SET_CURRENT_ROOM_NAME,
    payload: roomName
  };
};

export const setRoomMembers = members => {
  return {
    type: SET_ROOM_MEMBERS,
    payload: members
  };
};

export const setRoomInfo = roomInfo => {
  return {
    type: SET_ROOM_INFO,
    payload: roomInfo
  };
};

export const resetRooms = () => {
  return {
    type: RESET_ROOMS
  };
};
