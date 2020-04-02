import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { setCurrentNamespace } from '../actions/namespaceActions';
import { addRoom, fetchRoomsStart, fetchRoomsSuccess, resetRooms, setCurrentRoomName } from '../actions/roomActions';
import { API_URL } from '../utils/helpers';
import RoomsTemplate from '../components/templates/RoomsTemplate/RoomsTemplate';
import NamespaceSocketContext from '../providers/namespaceSocketContext';
import MainSocketContext from '../providers/mainSocketContext';
import ChatPage from './ChatPage';
import slugify from 'slugify';

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

let namespaceSocket;

const ServerContentPage = ({
  match,
  location,
  setCurrentNamespace,
  setCurrentRoomName,
  token,
  fetchRoomsStart,
  fetchRoomsSuccess,
  resetRooms,
  roomsLoading,
  addRoom,
  history,
  rooms
}) => {
  const [currentNamespaceData, setCurrentNamespaceData] = useState({});

  useEffect(() => {
    namespaceSocket = io(`${API_URL}/${match.params.id}`, {
      query: {
        token
      }
    });
  }, []);

  useEffect(() => {
    if (namespaceSocket) {
      console.log(namespaceSocket);
      namespaceSocket.on('namespace_joined', namespaceID => {
        setCurrentNamespace(namespaceID);
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
        namespaceSocket.emit('join_room', {
          roomName: `${rooms[0]._id}${slugify(rooms[0].name)}`,
          roomID: rooms[0]._id
        });
        history.push(`${match.url}/room/${rooms[0]._id}${slugify(rooms[0].name)}`);
      });

      namespaceSocket.on('room_created', room => {
        addRoom(room);
      });

      namespaceSocket.on('disconnect', () => {
        console.log('Namespace disconnected');
      });

      // return () => {
      //   setCurrentNamespace(null);
      //   // namespaceSocket.emit('namespace_disconnect');
      // };
    }
  }, [match.params.id, namespaceSocket]);

  return (
    <NamespaceSocketContext.Provider value={{ namespaceSocket }}>
      <StyledWrapper>
        <RoomsTemplate namespaceName={currentNamespaceData && currentNamespaceData.name} />
        <StyledChatWrapper>
          <Route exact path={`${match.url}/room/:roomName`} component={ChatPage} />
        </StyledChatWrapper>
      </StyledWrapper>
    </NamespaceSocketContext.Provider>
  );
};

const mapStateToProps = ({ authenticationReducer: { token }, roomReducer: { roomsLoading, rooms } }) => {
  return { token, roomsLoading, rooms };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentNamespace: namespaceID => dispatch(setCurrentNamespace(namespaceID)),
    setCurrentRoomName: roomName => dispatch(setCurrentRoomName(roomName)),
    fetchRoomsStart: () => dispatch(fetchRoomsStart()),
    fetchRoomsSuccess: rooms => dispatch(fetchRoomsSuccess(rooms)),
    resetRooms: () => dispatch(resetRooms()),
    addRoom: room => dispatch(addRoom(room))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerContentPage);
