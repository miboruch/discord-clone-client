export const FETCH_ROOMS_START = 'FETCH_ROOMS_START';
export const FETCH_ROOMS_SUCCESS = 'FETCH_ROOMS_SUCCESS';
export const ADD_ROOM = 'ADD_ROOM';
export const REMOVE_ROOM = 'REMOVE_ROOM';
export const SET_CURRENT_ROOM_ID = 'SET_CURRENT_ROOM_ID';
export const SET_ROOM_MEMBERS = 'SET_ROOM_MEMBERS';
export const SET_ROOM_INFO = 'SET_ROOM_INFO';
export const RESET_ROOMS = 'RESET_ROOMS';
export const CHAT_LOADING_START = 'CHAT_LOADING_START';
export const CHAT_LOADING_STOP = 'CHAT_LOADING_STOP';

const initialState = {
  rooms: [],
  roomsLoading: false,
  currentRoomID: null,
  currentRoomInfo: {},
  roomMembers: 0,
  chatLoading: false
};

export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROOMS_START:
      return {
        ...state,
        roomsLoading: true
      };
    case FETCH_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: action.payload,
        roomsLoading: false
      };
    case ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.payload]
      };
    case REMOVE_ROOM:
      return {
        ...state,
        rooms: [...state.rooms.filter(item => item._id !== action.payload.id)]
      };
    case SET_CURRENT_ROOM_ID:
      return {
        ...state,
        currentRoomID: action.payload
      };
    case SET_ROOM_MEMBERS:
      return {
        ...state,
        roomMembers: action.payload
      };
    case SET_ROOM_INFO:
      return {
        ...state,
        currentRoomInfo: action.payload
      };
    case RESET_ROOMS:
      return {
        ...state,
        rooms: []
      };
    case CHAT_LOADING_START:
      return {
        ...state,
        chatLoading: true
      };
    case CHAT_LOADING_STOP:
      return {
        ...state,
        chatLoading: false
      };
    default:
      return state;
  }
};
