import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { API_URL } from '../utils/helpers';
import { addCreatedNamespace, fetchNamespacesSuccess } from '../actions/namespaceActions';
import NamespaceTemplate from '../components/templates/NamespaceTemplate/NamespaceTemplate';
import ServerContentPage from './ServerContentPage';
import { toggleCreateNamespace } from '../actions/toggleActions';
import CreateNamespace from '../components/compound/CreateNamespace/CreateNamespace';
import MainSocketContext from '../providers/MainSocketContext';
import Spinner from '../components/atoms/Spinner/Spinner';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

let socket;

const ServerPage = ({ fetchNamespaces, token, addCreatedNamespace, history, toggleCreateNamespace }) => {
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
          // username: socket.query.username
        });
        socket.on('load_rooms', data => {
          console.log(data);
        });
        socket.on('load_namespaces', namespaces => {
          fetchNamespaces(namespaces);

          if (namespaces.created.length !== 0) {
            history.push(`server/${namespaces.created[0]._id}`);
          } else {
            toggleCreateNamespace(true);
          }
        });
        socket.on('namespace_created', namespace => {
          console.log(namespace);
          addCreatedNamespace(namespace);
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
              </Switch>
            </NamespaceTemplate>
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
    addCreatedNamespace: namespace => dispatch(addCreatedNamespace(namespace))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerPage);
