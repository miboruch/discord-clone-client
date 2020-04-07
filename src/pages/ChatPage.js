import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import NamespaceSocketContext from '../providers/NamespaceSocketContext';
import { setCurrentRoomName, setRoomInfo, setRoomMembers } from '../actions/roomActions';
import Chat from '../components/templates/Chat/Chat';
import RoomInfo from '../components/molecules/RoomInfo/RoomInfo';
import Spinner from '../components/atoms/Spinner/Spinner';
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

const ChatPage = ({ currentRoomName, setRoomMembers, isChatLoading, addMessage, chatLoading }) => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);
  const [typingUser, setTypingUser] = useState(null);

  useEffect(() => {
    console.log('CHAT PAGE MOUNTS');
    if (namespaceSocket) {
      namespaceSocket.on('members_update', members => {
        setRoomMembers(members);
      });

      namespaceSocket.on('new_message', newMessage => {
        addMessage(newMessage);
      });

      namespaceSocket.on('user_is_typing', ({ name, lastName }) => {
        setTypingUser({ name, lastName });
      });

      namespaceSocket.on('user_is_not_typing', () => {
        setTypingUser(null);
      });
    }
  }, [namespaceSocket]);

  useEffect(() => {
    return () => {
      if (namespaceSocket) {
        console.log('CHAT PAGE UNMOUNTS');
        namespaceSocket.emit('leave_room', currentRoomName);
        chatLoading(false);
        console.log(`LEFT ROOM ${currentRoomName}`);
      }
    };
  }, [currentRoomName]);

  return (
    <StyledWrapper>
      {!isChatLoading && <RoomInfo />}
      <Chat typingUser={typingUser} />
    </StyledWrapper>
  );
};

const mapStateToProps = ({ roomReducer: { currentRoomName }, chatReducer: { isChatLoading } }) => {
  return { currentRoomName, isChatLoading };
};

const mapDispatchToProps = dispatch => {
  return {
    setRoomMembers: members => dispatch(setRoomMembers(members)),
    addMessage: message => dispatch(addMessage(message)),
    setCurrentRoomName: roomName => dispatch(setCurrentRoomName(roomName)),
    setRoomInfo: roomInfo => dispatch(setRoomInfo(roomInfo)),
    chatLoading: isLoading => dispatch(chatLoading(isLoading))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
