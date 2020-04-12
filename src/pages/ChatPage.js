import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import NamespaceSocketContext from '../providers/NamespaceSocketContext';
import { setCurrentRoomName, setRoomInfo } from '../actions/roomActions';
import Chat from '../components/templates/Chat/Chat';
import RoomInfo from '../components/molecules/RoomInfo/RoomInfo';
import { addMessage, chatLoading } from '../actions/chatActions';

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

const ChatPage = ({ currentRoomName, isChatLoading, addMessage, chatLoading, setRoomInfo, currentRoomInfo }) => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);
  const [typingUser, setTypingUser] = useState(null);

  useEffect(() => {
    if (namespaceSocket) {
      namespaceSocket.on('new_message', newMessage => {
        addMessage(newMessage);
      });

      namespaceSocket.on('user_is_typing', ({ name, lastName }) => {
        setTypingUser({ name, lastName });
        console.log('user typing');
      });

      namespaceSocket.on('user_is_not_typing', () => {
        setTypingUser(null);
        console.log('user stop typing');
      });
    }
  }, [namespaceSocket]);

  useEffect(() => {
    return () => {
      if (namespaceSocket) {
        namespaceSocket.emit('leave_room', currentRoomName);
        setRoomInfo({});
        chatLoading(false);
        console.log(`LEFT ROOM ${currentRoomName}`);
      }
    };
  }, [currentRoomName]);

  return (
    <StyledWrapper>
      {!isChatLoading && currentRoomInfo !== {} ? <RoomInfo roomInfo={currentRoomInfo} /> : null}
      <Chat typingUser={typingUser} />
    </StyledWrapper>
  );
};

const mapStateToProps = ({ roomReducer: { currentRoomName, currentRoomInfo }, chatReducer: { isChatLoading } }) => {
  return { currentRoomName, isChatLoading, currentRoomInfo };
};

const mapDispatchToProps = dispatch => {
  return {
    addMessage: message => dispatch(addMessage(message)),
    setCurrentRoomName: roomName => dispatch(setCurrentRoomName(roomName)),
    chatLoading: isLoading => dispatch(chatLoading(isLoading)),
    setRoomInfo: roomInfo => dispatch(setRoomInfo(roomInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
