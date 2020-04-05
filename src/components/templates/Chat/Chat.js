import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addMessage, chatLoading } from '../../../actions/chatActions';
import Spinner from '../../atoms/Spinner/Spinner';
import NamespaceSocketContext from '../../../providers/NamespaceSocketContext';
import MessageInput from '../../molecules/MessageInput/MessageInput';

const StyledChatWrapper = styled.section`
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

const MessageInputWrapper = styled.section`
  width: 96%;
  height: 40px;
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
`;

const Chat = ({ isChatLoading, chatLoading, currentRoomName, addMessage, messages }) => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);

  useEffect(() => {
    if (namespaceSocket) {
      namespaceSocket.on('new_message', newMessage => {
        addMessage(newMessage);
        console.log(newMessage);
      });
    }
  }, [namespaceSocket]);

  return (
    <StyledChatWrapper>
      <p>Chat Component</p>
      {/*While loading spinner, else messages*/}
      {/*MessageInputComponent*/}

      {messages.map((item, index) => (
        <>
          <StyledParagraph key={index}>
            {item.name} {item.lastName} {item.date}
          </StyledParagraph>
          <StyledParagraph key={index}>{item.message}</StyledParagraph>
        </>
      ))}
      <StyledParagraph>
        {currentRoomName ? `You have joined to room ${currentRoomName}` : 'Welcome on the main page'}
      </StyledParagraph>
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
