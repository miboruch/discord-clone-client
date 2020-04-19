export const FETCH_NAMESPACES_START = 'FETCH_NAMESPACES_START';
export const FETCH_NAMESPACES_SUCCESS = 'FETCH_NAMESPACES_SUCCESS';
export const SET_SEARCHED_NAMESPACES = 'SET_SEARCHED_NAMESPACES';
export const SET_SEARCH_LOADING = 'SET_SEARCH_LOADING';
export const SET_NAMESPACE_USERS = 'SET_NAMESPACE_USERS';
export const ADD_CREATED_NAMESPACE = 'ADD_CREATED_NAMESPACE';
export const ADD_JOINED_NAMESPACE = 'ADD_JOINED_NAMESPACE';
export const REMOVE_NAMESPACE = 'REMOVE_NAMESPACE';
export const SET_CURRENT_NAMESPACE = 'SET_CURRENT_NAMESPACE';
export const SET_CURRENT_NAMESPACE_DATA = 'SET_CURRENT_NAMESPACE_DATA';

const initialState = {
  namespaces: {
    joined: [],
    created: []
  },
  searchedNamespaces: [],
  namespaceUsers: [],
  isSearching: false,
  namespacesLoading: false,
  currentNamespaceID: '',
  currentNamespaceData: null
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
    case SET_NAMESPACE_USERS:
      return {
        ...state,
        namespaceUsers: action.payload
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
        namespaces: {
          joined: [...state.namespaces.joined.filter(item => item._id !== action.payload.id)],
          created: [...state.namespaces.created.filter(item => item._id !== action.payload.id)]
        }
      };
    case SET_CURRENT_NAMESPACE:
      return {
        ...state,
        currentNamespaceID: action.payload
      };
    case SET_CURRENT_NAMESPACE_DATA:
      return {
        ...state,
        currentNamespaceData: action.payload
      };
    default:
      return state;
  }
};
