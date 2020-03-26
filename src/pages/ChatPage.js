import React, { useContext, useEffect, useState } from 'react';
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

const ChatPage = ({ match, location, setCurrentRoom, currentRoom, chatLoading, chatLoadingStop }) => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);
  const [message, setMessage] = useState('');
  const [isInRoom, setRoomID] = useState(false);

  useEffect(() => {
    if (!currentRoom) {
      namespaceSocket.emit('join_room', match.params.roomID);
    }

    return () => {
      namespaceSocket.emit('leave_room', match.params.roomID);
    };
  }, [match.params.roomID]);



  useEffect(() => {
    console.log(match.params);

    namespaceSocket.on('user_left', () => {
      setCurrentRoom(null);
    });

    namespaceSocket.on('user_joined', roomID => {
      console.log('user joined the chat');
      setCurrentRoom(roomID);
      chatLoadingStop();
    });
  }, [match.params.roomID]);

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

const mapStateToProps = ({ roomReducer: { currentRoom, chatLoading } }) => {
  return { currentRoom, chatLoading };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentRoom: roomID => dispatch(setCurrentRoom(roomID)),
    chatLoadingStop: () => dispatch(chatLoadingStop())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
