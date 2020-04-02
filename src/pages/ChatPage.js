import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import NamespaceSocketContext from '../providers/namespaceSocketContext';
import { chatLoadingStop, setCurrentRoomName, setRoomInfo, setRoomMembers } from '../actions/roomActions';
import Spinner from '../components/atoms/Spinner/Spinner';

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

const ChatPage = ({
  match,
  rooms,
  setCurrentRoomName,
  currentRoomName,
  chatLoading,
  chatLoadingStop,
  setRoomMembers,
  currentRoomInfo,
  roomMembers,
  setRoomInfo
}) => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);
  const [message, setMessage] = useState(['initial']);
  const [inputMessage, setInputMessage] = useState('');

  const handleChange = e => {
    setInputMessage(e.target.value);
  };

  useEffect(() => {
    if (namespaceSocket) {
      namespaceSocket.on('members_update', members => {
        setRoomMembers(members);
      });

      return () => {
        namespaceSocket.emit('leave_room', currentRoomName);
        console.log(`LEFT ROOM ${currentRoomName}`);
      };
    }
  }, [currentRoomName]);

  useEffect(() => {
    if (namespaceSocket) {
      namespaceSocket.on('new_message', newMessage => {
        console.log(newMessage);
        setMessage(array => [...array, newMessage]);
      });
    }
  }, [namespaceSocket]);

  return (
    <StyledWrapper>
      <>
        {chatLoading ? (
          <Spinner />
        ) : (
          <>
            <StyledInfoBox>
              <StyledParagraph>Users online: {roomMembers}</StyledParagraph>
              <StyledParagraph>Name: {currentRoomInfo && currentRoomInfo.name}</StyledParagraph>
              <StyledParagraph>Description: {currentRoomInfo && currentRoomInfo.description}</StyledParagraph>
            </StyledInfoBox>
            <StyledParagraph>
              {currentRoomName ? `You have joined to room ${currentRoomName}` : 'Welcome on the main page'}
            </StyledParagraph>
            {message.map(item => (
              <StyledParagraph>{item}</StyledParagraph>
            ))}
            <input type='text' onChange={e => handleChange(e)} />
            <button
              onClick={() => {
                namespaceSocket.emit('send_message', { message: inputMessage, room: currentRoomName });
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

const mapStateToProps = ({ roomReducer: { currentRoomName, chatLoading, rooms, currentRoomInfo, roomMembers } }) => {
  return { currentRoomName, chatLoading, rooms, currentRoomInfo, roomMembers };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentRoomName: roomName => dispatch(setCurrentRoomName(roomName)),
    chatLoadingStop: () => dispatch(chatLoadingStop()),
    setRoomMembers: members => dispatch(setRoomMembers(members)),
    setRoomInfo: roomInfo => dispatch(setRoomInfo(roomInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
