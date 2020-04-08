import React, { useContext, useEffect, useState } from 'react';
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

const TypingUserParagraph = styled.p`
  position: absolute;
  left: 2.5rem;
  bottom: 0.5rem;
  font-size: 12px;
  color: inherit;
`;

const BoldSpan = styled.span`
  font-weight: bold;
`;

const Chat = ({ isChatLoading, chatLoading, addMessage, currentRoomName, typingUser }) => {
  return (
    <StyledChatWrapper>
      {isChatLoading ? (
        <Spinner />
      ) : (
        <>
          <MessagesComponent />
          <MessageInputWrapper>
            <MessageInput />
          </MessageInputWrapper>
          {typingUser ? (
            <TypingUserParagraph>
              <BoldSpan>
                {typingUser.name} {typingUser.lastName}
              </BoldSpan>{' '}
              is typing...
            </TypingUserParagraph>
          ) : null}
        </>
      )}
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
