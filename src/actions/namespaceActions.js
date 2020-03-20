import {
  FETCH_NAMESPACES_START,
  FETCH_NAMESPACES_SUCCESS,
  ADD_CREATED_NAMESPACE,
  ADD_JOINED_NAMESPACE,
  REMOVE_NAMESPACE
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