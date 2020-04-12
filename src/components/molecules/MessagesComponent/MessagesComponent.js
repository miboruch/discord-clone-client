import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Message from '../../atoms/Message/Message';
import { dateOptions } from '../../../utils/helpers';

const StyledMessagesWrapper = styled.div`
  position: absolute;
  top: 120px;
  left: 0;
  width: 100%;
  height: calc(100vh - 220px);
  padding: 0 2rem;
  overflow-y: scroll;
  scroll-behavior: smooth;

  ${({ theme }) => theme.mq.standard} {
    top: 85px;
    height: calc(100vh - 165px);
  }
`;

const MessagesComponent = ({ messages }) => {
  const messageWrapperRef = useRef(null);
  useEffect(() => {
    const messageWrapper = messageWrapperRef.current;
    messageWrapper.scrollTop = messageWrapper.scrollHeight - messageWrapper.clientHeight;
  }, [messages]);

  return (
    <StyledMessagesWrapper ref={messageWrapperRef}>
      {messages.map(item => (
        <Message
          name={item.name}
          lastName={item.lastName}
          date={new Date(item.date).toLocaleString('pl-PL', dateOptions)}
          message={item.message}
          messageSenderID={item.userID}
        />
      ))}
    </StyledMessagesWrapper>
  );
};

const mapStateToProps = ({ chatReducer: { messages } }) => {
  return { messages };
};

export default connect(mapStateToProps)(MessagesComponent);
