import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { setCurrentNamespace } from '../actions/namespaceActions';
import queryString from 'query-string';
import { addRoom, fetchRoomsStart, fetchRoomsSuccess, resetRooms, setCurrentRoom } from '../actions/roomActions';
import { API_URL } from '../utils/helpers';
import RoomsTemplate from '../components/templates/RoomsTemplate/RoomsTemplate';
import NamespaceSocketContext from '../providers/namespaceSocketContext';
import Spinner from '../components/atoms/Spinner/Spinner';
import CreateRoomBox from '../components/molecules/CreateRoomBox/CreateRoomBox';
import ChatPage from './ChatPage';

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

const ServerContentPage = ({
  match,
  location,
  setCurrentNamespace,
  setCurrentRoom,
  token,
  fetchRoomsStart,
  fetchRoomsSuccess,
  resetRooms,
  roomsLoading,
  addRoom
}) => {
  const [currentNamespaceData, setCurrentNamespaceData] = useState({});

  const namespaceSocket = io(`${API_URL}/${match.params.id}`, {
    query: {
      token
    }
  });

  useEffect(() => {
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
    });

    namespaceSocket.on('room_created', room => {
      addRoom(room);
    });
  }, [match.params.id]);

  return (
    <NamespaceSocketContext.Provider value={{ namespaceSocket }}>
      <StyledWrapper>
        <RoomsTemplate namespaceName={currentNamespaceData && currentNamespaceData.name} />
        <StyledChatWrapper>
          {/*{roomsLoading ? <Spinner /> : <>{location.search ? <ChatPage /> : <p>Choose room</p>}</>}*/}
          <Switch>
            <Route exact path={'/server/:id/:roomID'} component={ChatPage} />
          </Switch>
        </StyledChatWrapper>
      </StyledWrapper>
    </NamespaceSocketContext.Provider>
  );
};

const mapStateToProps = ({ authenticationReducer: { token }, roomReducer: { roomsLoading } }) => {
  return { token, roomsLoading };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentNamespace: namespaceID => dispatch(setCurrentNamespace(namespaceID)),
    setCurrentRoom: roomID => dispatch(setCurrentRoom(roomID)),
    fetchRoomsStart: () => dispatch(fetchRoomsStart()),
    fetchRoomsSuccess: rooms => dispatch(fetchRoomsSuccess(rooms)),
    resetRooms: () => dispatch(resetRooms()),
    addRoom: room => dispatch(addRoom(room))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerContentPage);
