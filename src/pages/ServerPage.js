import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { API_URL } from '../utils/helpers';
import {
  addCreatedNamespace,
  fetchNamespacesSuccess,
  setSearchedNamespaces,
  setSearchLoading
} from '../actions/namespaceActions';
import NamespaceTemplate from '../components/templates/NamespaceTemplate/NamespaceTemplate';
import ServerContentPage from './ServerContentPage';
import { setInformationObject, toggleCreateNamespace } from '../actions/toggleActions';
import CreateNamespace from '../components/compound/CreateNamespace/CreateNamespaceWrapper';
import MainSocketContext from '../providers/MainSocketContext';
import HomePage from './HomePage';
import InformationBox from '../components/molecules/InformationBox/InformationBox';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

let socket;

const ServerPage = ({
  fetchNamespaces,
  token,
  addCreatedNamespace,
  toggleCreateNamespace,
  setSearchedNamespaces,
  setSearchLoading,
                      setInformationObject
}) => {
  const [isSocketLoading, setSocketLoading] = useState(true);
  useEffect(() => {
    socket = io(`${API_URL}`, {
      query: {
        token
      }
    });
    setSocketLoading(false);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        socket.emit('user_connected', {
          socketID: socket.id
        });

        socket.on('load_namespaces', namespaces => {
          fetchNamespaces(namespaces);

          if (namespaces.created.length === 0 && namespaces.joined.length === 0) {
            toggleCreateNamespace(true);
          }
        });

        socket.on('namespace_created', namespace => {
          console.log(namespace);
          addCreatedNamespace(namespace);
        });

        socket.on('namespace_search_finished', namespace => {
          setSearchedNamespaces(namespace);
          setSearchLoading(false);
        });

        /* informationObject -> {type: enum['error', 'success'], message: String} */
        socket.on('information', informationObject => {
          setInformationObject(informationObject);
        });
      });
    }
  }, []);

  return (
    <>
      {!isSocketLoading && (
        <MainSocketContext.Provider value={{ socket }}>
          <StyledWrapper>
            <CreateNamespace />
            <NamespaceTemplate>
              <Switch>
                <Route path={'/server/:id'} component={ServerContentPage} />
                <Route path={'/home'} component={HomePage} />
              </Switch>
            </NamespaceTemplate>
            <InformationBox />
          </StyledWrapper>
        </MainSocketContext.Provider>
      )}
    </>
  );
};

const mapStateToProps = ({ authenticationReducer: { token }, toggleReducer: { isCreateRoomOpen } }) => {
  return { token, isCreateRoomOpen };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNamespaces: namespaces => dispatch(fetchNamespacesSuccess(namespaces)),
    toggleCreateNamespace: isOpen => dispatch(toggleCreateNamespace(isOpen)),
    addCreatedNamespace: namespace => dispatch(addCreatedNamespace(namespace)),
    setSearchedNamespaces: namespaces => dispatch(setSearchedNamespaces(namespaces)),
    setSearchLoading: isSearching => dispatch(setSearchLoading(isSearching)),
    setInformationObject: message => dispatch(setInformationObject(message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerPage);
