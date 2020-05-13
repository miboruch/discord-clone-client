import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import NamespaceSocketContext from '../providers/NamespaceSocketContext';
import { setRoomInfo } from '../actions/roomActions';
import Chat from '../components/templates/Chat/Chat';
import RoomInfo from '../components/molecules/RoomInfo/RoomInfo';
import { addMessage, chatLoading, fetchPreviousMessages } from '../actions/chatActions';
import Spinner from '../components/atoms/Spinner/Spinner';
import { isObjectEmpty } from '../utils/helpers';

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

const ChatPage = ({
  currentRoomName,
  isChatLoading,
  addMessage,
  chatLoading,
  setRoomInfo,
  currentRoomInfo,
  fetchPreviousMessages,
}) => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);
  const [typingUser, setTypingUser] = useState(null);

  useEffect(() => {
    if (namespaceSocket) {
      namespaceSocket.on('new_message', newMessage => {
        addMessage(newMessage);
      });

      namespaceSocket.on('user_is_typing', ({ name, lastName }) => {
        setTypingUser({ name, lastName });
      });

      namespaceSocket.on('user_is_not_typing', () => {
        setTypingUser(null);
      });

      /*
       * messages comes from server in reverse order
       * - newest message has to be on the bottom
       * - oldest message has to be on the top
       */
      namespaceSocket.on('load_history', messages => {
        fetchPreviousMessages(messages.reverse());
      });
    }
  }, [namespaceSocket]);

  useEffect(() => {
    return () => {
      if (namespaceSocket) {
        namespaceSocket.emit('leave_room', currentRoomName);
        setRoomInfo({});
        chatLoading(false);
      }
    };
  }, [currentRoomName]);

  return (
    <StyledWrapper>
      {isChatLoading ? (
        <Spinner />
      ) : (
        <>
          {!isObjectEmpty(currentRoomInfo) && (
            <>
              <RoomInfo roomInfo={currentRoomInfo} />
              <Chat typingUser={typingUser} />
            </>
          )}
        </>
      )}
    </StyledWrapper>
  );
};

const mapStateToProps = ({ roomReducer: { currentRoomName, currentRoomInfo }, chatReducer: { isChatLoading } }) => {
  return { currentRoomName, isChatLoading, currentRoomInfo };
};

const mapDispatchToProps = dispatch => {
  return {
    addMessage: message => dispatch(addMessage(message)),
    chatLoading: isLoading => dispatch(chatLoading(isLoading)),
    setRoomInfo: roomInfo => dispatch(setRoomInfo(roomInfo)),
    fetchPreviousMessages: messages => dispatch(fetchPreviousMessages(messages))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
