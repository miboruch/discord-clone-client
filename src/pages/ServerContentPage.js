import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { fetchNamespacesSuccess, setCurrentNamespace, setCurrentNamespaceData } from '../actions/namespaceActions';
import { setRoomMembers } from '../actions/roomActions';
import {
  fetchRoomsStart,
  fetchRoomsSuccess,
  resetRooms,
  setCurrentRoomName,
  setRoomInfo
} from '../actions/roomActions';
import { chatLoading, setMessages } from '../actions/chatActions';
import { API_URL } from '../utils/helpers';
import RoomsTemplate from '../components/templates/RoomsTemplate/RoomsTemplate';
import NamespaceSocketContext from '../providers/NamespaceSocketContext';
import ChatPage from './ChatPage';
import { setInformationObject } from '../actions/toggleActions';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  overflow: hidden;
  background: transparent;
  margin-left: 125px;
  z-index: 1;

  ${({ theme }) => theme.mq.tablet} {
    margin-left: 0;
  }
`;

const StyledChatWrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  ${({ theme }) => theme.mq.tablet} {
    position: static;
  }
`;

const StyledTestBox = styled.div`
  width: 300px;
  height: 100vh;
  border-left: 1px solid #000;
  display: none;

  ${({ theme }) => theme.mq.standard} {
    display: block;
  }
`;

const ServerContentPage = ({
  match,
  setCurrentNamespace,
  setCurrentNamespaceData,
  token,
  userID,
  fetchRoomsStart,
  fetchRoomsSuccess,
  resetRooms,
  setCurrentRoomName,
  currentRoomName,
  setRoomInfo,
  setRoomMembers,
  chatLoading,
  setMessages,
  setInformationObject,
  history,
  fetchNamespaces
}) => {
  const [namespaceSocket, setNamespaceSocket] = useState(null);
  useEffect(() => {
    setNamespaceSocket(
      io(`${API_URL}/${match.params.id}`, {
        query: {
          token
        }
      })
    );
  }, [match.params.id]);

  useEffect(() => {
    if (namespaceSocket) {
      namespaceSocket.on('namespace_joined', namespace => {
        setCurrentNamespace(namespace._id);
        setCurrentNamespaceData(namespace);
      });

      namespaceSocket.on('connect', () => {
        resetRooms();
        fetchRoomsStart();
      });

      namespaceSocket.on('user_joined', ({ roomName, roomInfo }) => {
        setCurrentRoomName(roomName);
        setRoomInfo(roomInfo);
        chatLoading(false);
      });

      // TODO -> remove this socket, we already save namespace data
      /* namespace is returned as an array with one fetched element */
      namespaceSocket.on('namespace_data', namespace => {
        setCurrentNamespaceData(namespace[0]);
      });

      namespaceSocket.on('load_rooms', rooms => {
        fetchRoomsSuccess(rooms);
      });

      namespaceSocket.on('disconnect', () => {
        console.log('Namespace disconnected');
      });

      namespaceSocket.on('history_catchup', history => {
        setMessages(history);
      });

      namespaceSocket.on('members_update', members => {
        setRoomMembers(members);
        chatLoading(false);
      });

      namespaceSocket.on('information', informationObject => {
        setInformationObject(informationObject);
      });

      namespaceSocket.on('leave_namespace', () => {
        history.push('/home');
        namespaceSocket.emit('reload_namespaces', { userID });
      });

      namespaceSocket.on('namespaces_reloaded', namespaces => {
        fetchNamespaces(namespaces);
      });

      namespaceSocket.on('leave_room', () => {
        history.push('/home');
        setCurrentRoomName(null);
      });

      return () => {
        setCurrentNamespace(null);
        if (currentRoomName) {
          namespaceSocket.emit('leave_room', currentRoomName);
          setCurrentRoomName(null);
        }
        namespaceSocket.emit('namespace_disconnect');
      };
    }
  }, [match.params.id, namespaceSocket]);

  useEffect(() => {
    if (namespaceSocket) {
      namespaceSocket.on('room_created', rooms => {
        fetchRoomsSuccess(rooms);
      });
    }
  }, [namespaceSocket]);

  return (
    <NamespaceSocketContext.Provider value={{ namespaceSocket }}>
      <StyledWrapper>
        <RoomsTemplate />
        <StyledChatWrapper>
          <Route exact path={`${match.url}/room/:roomName`} component={ChatPage} />
        </StyledChatWrapper>
        <StyledTestBox />
      </StyledWrapper>
    </NamespaceSocketContext.Provider>
  );
};

const mapStateToProps = ({ authenticationReducer: { token, userID }, roomReducer: { currentRoomName } }) => {
  return { token, userID, currentRoomName };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentNamespace: namespaceID => dispatch(setCurrentNamespace(namespaceID)),
    setCurrentNamespaceData: namespace => dispatch(setCurrentNamespaceData(namespace)),
    fetchRoomsStart: () => dispatch(fetchRoomsStart()),
    fetchRoomsSuccess: rooms => dispatch(fetchRoomsSuccess(rooms)),
    resetRooms: () => dispatch(resetRooms()),
    setCurrentRoomName: roomName => dispatch(setCurrentRoomName(roomName)),
    setRoomInfo: roomInfo => dispatch(setRoomInfo(roomInfo)),
    setRoomMembers: members => dispatch(setRoomMembers(members)),
    chatLoading: isLoading => dispatch(chatLoading(isLoading)),
    setMessages: messages => dispatch(setMessages(messages)),
    setInformationObject: informationObject => dispatch(setInformationObject(informationObject)),
    fetchNamespaces: namespaces => dispatch(fetchNamespacesSuccess(namespaces))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerContentPage);
