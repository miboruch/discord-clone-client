import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addMessage, chatLoading } from '../../../actions/chatActions';
import Spinner from '../../atoms/Spinner/Spinner';
import NamespaceSocketContext from '../../../providers/NamespaceSocketContext';
import MessageInput from '../../molecules/MessageInput/MessageInput';
import MessagesComponent from '../../molecules/MessagesComponent/MessagesComponent';

const StyledChatWrapper = styled.section`
  width: 100%;
  height: 100vh;
  background-color: transparent;
  position: relative;
`;

const MessageInputWrapper = styled.section`
  width: 100%;
  height: 40px;
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
`;

const Chat = ({ isChatLoading, chatLoading, addMessage }) => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);

  useEffect(() => {
    if (namespaceSocket) {
      namespaceSocket.on('new_message', newMessage => {
        addMessage(newMessage);
      });
    }
  }, [namespaceSocket]);

  return (
    <StyledChatWrapper>
      {/*While loading spinner, else messages*/}
      {/*MessageInputComponent*/}
      <MessagesComponent />
      <MessageInputWrapper>
        <MessageInput />
      </MessageInputWrapper>
    </StyledChatWrapper>
  );
};

const mapStateToProps = ({ chatReducer: { isChatLoading, messages }, roomReducer: { currentRoomName } }) => {
  return { isChatLoading, currentRoomName, messages };
};

const mapDispatchToProps = dispatch => {
  return {
    addMessage: message => dispatch(addMessage(message)),
    chatLoading: isLoading => dispatch(chatLoading(isLoading))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
