import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Message from '../../atoms/Message/Message';
import { dateOptions } from '../../../utils/helpers';
import NamespaceSocketContext from '../../../providers/NamespaceSocketContext';

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

const MessagesComponent = ({ messages, currentRoomName }) => {
  const messageWrapperRef = useRef(null);
  const [sub, setSub] = useState(null);
  const { namespaceSocket } = useContext(NamespaceSocketContext);

  useEffect(() => {
    const messageWrapper = messageWrapperRef.current;

    messageWrapper.scrollTop = messageWrapper.scrollHeight;
  }, []);

  useEffect(() => {
    const something = messages.length - sub;
    const messageWrapper = messageWrapperRef.current;

    if (something === 1) {
      messageWrapper.scrollTop = messageWrapper.scrollHeight - messageWrapper.clientHeight;
    }
    setSub(messages.length);
  }, [messages.length]);

  const handleScroll = e => {
    if (e.target.scrollTop === 0) {
      namespaceSocket.emit('load_history_by_data', { roomID: currentRoomName, date: new Date(messages[0].date) });
    }
  };

  return (
    <StyledMessagesWrapper onScroll={handleScroll} ref={messageWrapperRef}>
      {messages.map((item, index) => (
        <Message
          key={index}
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

const mapStateToProps = ({ chatReducer: { messages }, roomReducer: { currentRoomName } }) => {
  return { messages, currentRoomName };
};

export default connect(mapStateToProps)(MessagesComponent);
