export const FETCH_NAMESPACES_START = 'FETCH_NAMESPACES_START';
export const FETCH_NAMESPACES_SUCCESS = 'FETCH_NAMESPACES_SUCCESS';
export const ADD_CREATED_NAMESPACE = 'ADD_CREATED_NAMESPACE';
export const ADD_JOINED_NAMESPACE = 'ADD_JOINED_NAMESPACE';
export const REMOVE_NAMESPACE = 'REMOVE_NAMESPACE';
export const SET_CURRENT_NAMESPACE = 'SET_CURRENT_NAMESPACE';
export const SET_SEARCHED_NAMESPACES = 'SET_SEARCHED_NAMESPACES';
export const SET_SEARCH_LOADING = 'SET_SEARCH_LOADING';

const initialState = {
  namespaces: {
    joined: [],
    created: []
  },
  searchedNamespaces: [],
  isSearching: false,
  namespacesLoading: false,
  currentNamespaceID: ''
  /* error store info about error while joining and creating new namespace */
};

export const namespaceReducer = (state = initialState, action) => {
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
    case ADD_CREATED_NAMESPACE:
      return {
        ...state,
        namespaces: { joined: [...state.namespaces.joined], created: [...state.namespaces.created, action.payload] }
      };
    case ADD_JOINED_NAMESPACE:
      return {
        ...state,
        namespaces: { joined: [...state.namespaces.joined, action.payload], created: [...state.namespaces.created] }
      };
    case REMOVE_NAMESPACE:
      return {
        ...state,
        namespaces: [...state.namespaces.filter(item => item._id !== action.payload.id)]
      };
    case SET_CURRENT_NAMESPACE:
      return {
        ...state,
        currentNamespaceID: action.payload
      };
    case SET_SEARCHED_NAMESPACES:
      return {
        ...state,
        searchedNamespaces: action.payload
      };
    case SET_SEARCH_LOADING:
      return {
        ...state,
        isSearching: action.payload
      };
    default:
      return state;
  }
};
