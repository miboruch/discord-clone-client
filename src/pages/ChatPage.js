import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import NamespaceSocketContext from '../providers/namespaceSocketContext';
import { chatLoadingStop, setCurrentRoom } from '../actions/roomActions';
import Spinner from '../components/atoms/Spinner/Spinner';
import RoomsTemplate from '../components/templates/RoomsTemplate/RoomsTemplate';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
  position: relative;
`;

const StyledParagraph = styled.p`
  color: inherit;
`;

const StyledInfoBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 2rem;
  display: flex;
  flex-direction: row;
`;

const ChatPage = ({ match, rooms, setCurrentRoom, currentRoom, chatLoading, chatLoadingStop }) => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);
  const [message, setMessage] = useState(['initial']);
  const [members, setMembers] = useState(0);
  const [roomInfo, setRoomInfo] = useState(null);
  const [inputMessage, setInputMessage] = useState('');

  const handleChange = e => {
    setInputMessage(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    return () => {
      namespaceSocket.emit('leave_room', match.params.roomID);
      setCurrentRoom(null);
      setMessage(['left']);
    };
  }, [match.params.roomID]);

  useEffect(() => {
    namespaceSocket.on('room_info', ({ members, room }) => {
      setMembers(members);
      setRoomInfo(room[0]);
      console.log(room);
    });

    namespaceSocket.on('user_left', roomID => {
      console.log(`user left room ${roomID}`);
    });

    namespaceSocket.on('history_catchup', history => {
      console.log(history);
    });

    namespaceSocket.on('new_message', newMessage => {
      setMessage(array => [...array, newMessage]);
    });
  }, [currentRoom]);

  return (
    <StyledWrapper>
      <>
        {chatLoading ? (
          <Spinner />
        ) : (
          <>
            <StyledInfoBox>
              <StyledParagraph>Users online: {members}</StyledParagraph>
              <StyledParagraph>Name: {roomInfo && roomInfo.name}</StyledParagraph>
              <StyledParagraph>Description: {roomInfo && roomInfo.description}</StyledParagraph>
            </StyledInfoBox>
            <StyledParagraph>
              {currentRoom ? `You have joined to room ${currentRoom}` : 'Welcome on the main page'}
            </StyledParagraph>
            {message.map(item => (
              <StyledParagraph>{item}</StyledParagraph>
            ))}
            <input type='text' onChange={e => handleChange(e)} />
            <button
              onClick={() => {
                namespaceSocket.emit('send_message', { message: inputMessage, room: currentRoom });
              }}
            >
              send
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
