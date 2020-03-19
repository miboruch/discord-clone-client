import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { API_URL } from '../utils/helpers';
import { fetchNamespacesSuccess } from '../actions/projectDataActions';
import NamespaceTemplate from '../components/templates/NamespaceTemplate/NamespaceTemplate';
import RoomsMainPage from './RoomsMainPage';
import ChatPage from './ChatPage';
import ModalBox from '../components/molecules/ModalBox/ModalBox';
import ToggleCheckbox from '../components/atoms/ToggleCheckbox/ToggleCheckbox';
import { closeCreateRoom } from '../actions/toggleActions';
import CreateNamespace from '../components/compound/CreateNamespace/CreateNamespace';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const ServerPage = ({ fetchNamespaces, token, isCreateRoomOpen, closeCreateRoomBox }) => {
  const [isCreatedRoomPrivate, setCreatedRoomPrivate] = useState(false);

  const socket = io(API_URL, {
    query: {
      token
    }
  });

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('user_connected', {
        socketID: socket.id
        // username: socket.query.username
      });
      console.log(socket);
      socket.on('load_rooms', data => {
        console.log(data);
      });
      socket.on('load_namespaces', namespaces => {
        fetchNamespaces(namespaces);
        console.log(namespaces);
      });
      socket.on('namespace_created', namespace => {
        console.log(namespace);
      });
    });
  }, []);

  const toggleRoomPrivacy = () => {
    setCreatedRoomPrivate(!isCreatedRoomPrivate);
  };

  return (
    <StyledWrapper>
      <ModalBox closeFunction={closeCreateRoomBox} isOpen={isCreateRoomOpen}>
        <ToggleCheckbox isChecked={isCreatedRoomPrivate} toggleFunction={toggleRoomPrivacy} />
      </ModalBox>
      <CreateNamespace />
      <NamespaceTemplate>
        <Switch>
          <Route path={'/server/:id'} component={RoomsMainPage} />
          <Route path={'/room/:id'} component={ChatPage} />
        </Switch>
      </NamespaceTemplate>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ authenticationReducer: { token }, toggleReducer: { isCreateRoomOpen } }) => {
  return { token, isCreateRoomOpen };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNamespaces: namespaces => dispatch(fetchNamespacesSuccess(namespaces)),
    closeCreateRoomBox: () => dispatch(closeCreateRoom())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerPage);
