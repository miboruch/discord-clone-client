import {
  FETCH_NAMESPACES_START,
  FETCH_NAMESPACES_SUCCESS,
  FETCH_ROOMS_START,
  FETCH_ROOMS_SUCCESS,
  ADD_NAMESPACE,
  REMOVE_NAMESPACE,
  ADD_ROOM,
  REMOVE_ROOM
} from '../reducers/projectDataReducer';

export const fetchNamespacesStart = () => {
  return {
    type: FETCH_NAMESPACES_START
  };
};

export const fetchNamespacesSuccess = namespaces => {
  return {
    type: FETCH_NAMESPACES_SUCCESS,
    payload: namespaces
  };
};

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

export const addNamespace = namespace => {
  return {
    type: ADD_NAMESPACE,
    payload: namespace
  };
};

export const removeNamespace = namespaceID => {
  return {
    type: REMOVE_NAMESPACE,
    payload: {
      id: namespaceID
    }
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
