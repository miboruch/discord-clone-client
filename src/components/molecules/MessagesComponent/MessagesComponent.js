import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Message from '../../atoms/Message/Message';

const StyledMessagesWrapper = styled.div`
  position: absolute;
  top: 120px;
  left: 0;
  width: 100%;
  height: calc(100vh - 220px);
  padding: 0 2rem;
  overflow-y: scroll;
`;

const MessagesComponent = ({ children, messages }) => {
  console.log(messages);
  return (
    <StyledMessagesWrapper>
      {messages.map(item => (
        <Message name={item.name} lastName={item.lastName} date={item.date} message={item.message} />
      ))}
    </StyledMessagesWrapper>
  );
};

const mapStateToProps = ({ chatReducer: { messages } }) => {
  return { messages };
};

export default connect(mapStateToProps)(MessagesComponent);
