import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import NamespaceSocketContext from '../providers/namespaceSocketContext';
import { chatLoadingStop, setCurrentRoom } from '../actions/roomActions';
import Spinner from '../components/atoms/Spinner/Spinner';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
`;

const StyledParagraph = styled.p`
  color: inherit;
`;

const ChatPage = ({ match, rooms, setCurrentRoom, currentRoom, chatLoading, chatLoadingStop }) => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);

  useEffect(() => {
    console.log('match params changed');
    setCurrentRoom(match.params.roomID);

    namespaceSocket.on('user_joined', roomID => {
      console.log(`user joined room ${roomID}`);
      setCurrentRoom(roomID);
      chatLoadingStop();
    });

    return () => {
      namespaceSocket.emit('leave_room', match.params.roomID);
      setCurrentRoom(null);
    };
  }, [match.params.roomID]);

  useEffect(() => {
    console.log(currentRoom);

    namespaceSocket.on('room_info', data => {
      console.log(data);
    });

    namespaceSocket.on('update_members', clientsCounter => {
      console.log('Users online: ');
      console.log(clientsCounter);
    });

    namespaceSocket.on('user_left', roomID => {
      console.log(`user left room ${roomID}`);
    });
  }, [currentRoom]);

  return (
    <StyledWrapper>
      <>
        {chatLoading ? (
          <Spinner />
        ) : (
          <>
            <StyledParagraph>
              {currentRoom ? `You have joined to room ${currentRoom}` : 'Welcome on the main page'}
            </StyledParagraph>
            <button
              onClick={() => {
                namespaceSocket.emit('leave_room', match.params.roomID);
              }}
            >
              leave
            </button>
          </>
        )}
      </>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ roomReducer: { currentRoom, chatLoading, rooms } }) => {
  return { currentRoom, chatLoading, rooms };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentRoom: roomID => dispatch(setCurrentRoom(roomID)),
    chatLoadingStop: () => dispatch(chatLoadingStop())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
