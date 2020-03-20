export const FETCH_ROOMS_START = 'FETCH_ROOMS_START';
export const FETCH_ROOMS_SUCCESS = 'FETCH_ROOMS_SUCCESS';
export const ADD_ROOM = 'ADD_ROOM';
export const REMOVE_ROOM = 'REMOVE_ROOM';

const initialState = {
  rooms: [],
  roomsLoading: false
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
        rooms: action.payload
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
    default:
      return state;
  }
};
