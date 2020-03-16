export const FETCH_NAMESPACES_START = 'FETCH_NAMESPACES_START';
export const FETCH_NAMESPACES_SUCCESS = 'FETCH_NAMESPACES_SUCCESS';
export const FETCH_ROOMS_START = 'FETCH_ROOMS_START';
export const FETCH_ROOMS_SUCCESS = 'FETCH_ROOMS_SUCCESS';
export const ADD_NAMESPACE = 'ADD_NAMESPACE';
export const REMOVE_NAMESPACE = 'REMOVE_NAMESPACE';
export const ADD_ROOM = 'ADD_ROOM';
export const REMOVE_ROOM = 'REMOVE_ROOM';

const initialState = {
  namespaces: [],
  namespacesLoading: false,
  rooms: [],
  roomsLoading: false
};

export const projectDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NAMESPACES_START:
      return {
        ...state,
        namespacesLoading: true
      };
    case FETCH_NAMESPACES_SUCCESS:
      return {
        ...state,
        namespacesLoading: false,
        namespaces: action.payload
      };
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
    case ADD_NAMESPACE:
      return {
        ...state,
        namespaces: [...state.namespaces, action.payload]
      };
    case REMOVE_NAMESPACE:
      return {
        ...state,
        namespaces: [...state.namespaces.filter(item => item._id !== action.payload.id)]
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
