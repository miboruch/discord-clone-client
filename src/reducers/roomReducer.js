export const FETCH_ROOMS_START = 'FETCH_ROOMS_START';
export const FETCH_ROOMS_SUCCESS = 'FETCH_ROOMS_SUCCESS';
export const ADD_ROOM = 'ADD_ROOM';
export const REMOVE_ROOM = 'REMOVE_ROOM';
export const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM';

const initialState = {
  rooms: [],
  roomsLoading: false,
  currentRoom: ''
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
    case SET_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: action.payload
      };
    default:
      return state;
  }
};
