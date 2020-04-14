import {
  FETCH_NAMESPACES_START,
  FETCH_NAMESPACES_SUCCESS,
  ADD_CREATED_NAMESPACE,
  ADD_JOINED_NAMESPACE,
  REMOVE_NAMESPACE,
  SET_CURRENT_NAMESPACE,
  SET_SEARCHED_NAMESPACES,
  SET_SEARCH_LOADING,
  SET_ERROR
} from '../reducers/namespaceReducer';

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

export const addCreatedNamespace = namespace => {
  return {
    type: ADD_CREATED_NAMESPACE,
    payload: namespace
  };
};

export const addJoinedNamespace = namespace => {
  return {
    type: ADD_JOINED_NAMESPACE,
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

export const setCurrentNamespace = namespaceID => {
  return {
    type: SET_CURRENT_NAMESPACE,
    payload: namespaceID
  };
};

export const setSearchedNamespaces = namespaces => {
  return {
    type: SET_SEARCHED_NAMESPACES,
    payload: namespaces
  };
};

export const setSearchLoading = isSearching => {
  return {
    type: SET_SEARCH_LOADING,
    payload: isSearching
  };
};

export const setNamespaceError = error => {
  return {
    type: SET_ERROR,
    payload: error
  };
};
