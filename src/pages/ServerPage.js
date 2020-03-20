import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { API_URL } from '../utils/helpers';
import {addCreatedNamespace, fetchNamespacesSuccess} from '../actions/namespaceActions';
import NamespaceTemplate from '../components/templates/NamespaceTemplate/NamespaceTemplate';
import RoomsMainPage from './RoomsMainPage';
import ChatPage from './ChatPage';
import ModalBox from '../components/molecules/ModalBox/ModalBox';
import ToggleCheckbox from '../components/atoms/ToggleCheckbox/ToggleCheckbox';
import { closeCreateRoom } from '../actions/toggleActions';
import CreateNamespace from '../components/compound/CreateNamespace/CreateNamespace';
import MainSocketContext from '../providers/mainSocketContext';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const StyledParagraph = styled.p`
  font-size: 12px;
`;

const StyledSpan = styled.span`
  font-weight: bold;
`;

const ServerPage = ({ fetchNamespaces, token, isCreateRoomOpen, closeCreateRoomBox, addCreatedNamespace }) => {
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
        addCreatedNamespace(namespace);
      });
    });
  }, []);

  const toggleRoomPrivacy = () => {
    setCreatedRoomPrivate(!isCreatedRoomPrivate);
  };

  return (
    <MainSocketContext.Provider value={{socket}}>
    <StyledWrapper>
      <ModalBox closeFunction={closeCreateRoomBox} isOpen={isCreateRoomOpen}>
        <ToggleCheckbox isChecked={isCreatedRoomPrivate} toggleFunction={toggleRoomPrivacy}>
          <StyledParagraph>
            Is private: <StyledSpan>{isCreatedRoomPrivate}</StyledSpan>
          </StyledParagraph>
        </ToggleCheckbox>
      </ModalBox>
      <CreateNamespace />
      <NamespaceTemplate>
        <Switch>
          <Route path={'/server/:id'} component={RoomsMainPage} />
          <Route path={'/room/:id'} component={ChatPage} />
        </Switch>
      </NamespaceTemplate>
    </StyledWrapper>
    </MainSocketContext.Provider>
  );
};

const mapStateToProps = ({ authenticationReducer: { token }, toggleReducer: { isCreateRoomOpen } }) => {
  return { token, isCreateRoomOpen };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNamespaces: namespaces => dispatch(fetchNamespacesSuccess(namespaces)),
    closeCreateRoomBox: () => dispatch(closeCreateRoom()),
    addCreatedNamespace: namespace => dispatch(addCreatedNamespace(namespace))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerPage);
