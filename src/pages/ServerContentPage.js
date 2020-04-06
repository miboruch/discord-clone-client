import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { setCurrentNamespace } from '../actions/namespaceActions';
import { addRoom, fetchRoomsStart, fetchRoomsSuccess, resetRooms, setCurrentRoomName } from '../actions/roomActions';
import { API_URL } from '../utils/helpers';
import RoomsTemplate from '../components/templates/RoomsTemplate/RoomsTemplate';
import NamespaceSocketContext from '../providers/NamespaceSocketContext';
import ChatPage from './ChatPage';
import slugify from 'slugify';
import MainSocketContext from '../providers/MainSocketContext';
import { chatLoading } from '../actions/chatActions';

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
  width: 150px;
  height: 100vh;
  border-left: 1px solid #000;
  display: none;

  ${({ theme }) => theme.mq.standard} {
    display: block;
  }
`;

let namespaceSocket;

const ServerContentPage = ({
  match,
  setCurrentNamespace,
  token,
  fetchRoomsStart,
  fetchRoomsSuccess,
  resetRooms,
  addRoom,
  history,
  setCurrentRoomName,
  currentRoomName,
  chatLoading
}) => {
  const [currentNamespaceData, setCurrentNamespaceData] = useState({});

  useEffect(() => {
    namespaceSocket = io(`${API_URL}/${match.params.id}`, {
      query: {
        token
      }
    });
  }, [match.params.id]);

  useEffect(() => {
    if (namespaceSocket) {
      console.log(namespaceSocket);
      namespaceSocket.on('namespace_joined', namespaceID => {
        setCurrentNamespace(namespaceID);
        console.log('NAMESPACE JOINED');
      });

      namespaceSocket.on('connect', () => {
        resetRooms();
        fetchRoomsStart();
      });

      namespaceSocket.on('namespace_data', namespace => {
        setCurrentNamespaceData(namespace);
      });

      namespaceSocket.on('load_rooms', rooms => {
        fetchRoomsSuccess(rooms);
        if (rooms.length !== 0) {
          namespaceSocket.emit('join_room', {
            roomName: `${rooms[0]._id}${slugify(rooms[0].name)}`,
            roomID: rooms[0]._id
          });
          history.push(`${match.url}/room/${rooms[0]._id}${slugify(rooms[0].name)}`);
          chatLoading(true);
        }
      });

      namespaceSocket.on('room_created', room => {
        addRoom(room);
      });

      namespaceSocket.on('disconnect', () => {
        console.log('Namespace disconnected');
      });

      return () => {
        setCurrentNamespace(null);
        if (currentRoomName) {
          namespaceSocket.emit('leave_room', currentRoomName);
        }
        setCurrentRoomName(null);
        namespaceSocket.emit('namespace_disconnect');
      };
    }
  }, [match.params.id]);

  return (
    <NamespaceSocketContext.Provider value={{ namespaceSocket }}>
      <StyledWrapper>
        <RoomsTemplate namespaceName={currentNamespaceData && currentNamespaceData.name} />
        <StyledChatWrapper>
          <Route exact path={`${match.url}/room/:roomName`} component={ChatPage} />
        </StyledChatWrapper>
        <StyledTestBox />
      </StyledWrapper>
    </NamespaceSocketContext.Provider>
  );
};

const mapStateToProps = ({ authenticationReducer: { token }, roomReducer: { currentRoomName } }) => {
  return { token, currentRoomName };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentNamespace: namespaceID => dispatch(setCurrentNamespace(namespaceID)),
    fetchRoomsStart: () => dispatch(fetchRoomsStart()),
    fetchRoomsSuccess: rooms => dispatch(fetchRoomsSuccess(rooms)),
    resetRooms: () => dispatch(resetRooms()),
    addRoom: room => dispatch(addRoom(room)),
    setCurrentRoomName: roomName => dispatch(setCurrentRoomName(roomName)),
    chatLoading: isLoading => dispatch(chatLoading(isLoading))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerContentPage);
