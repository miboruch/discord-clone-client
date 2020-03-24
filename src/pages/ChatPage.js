import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NamespaceSocketContext from '../providers/namespaceSocketContext';
import { setCurrentRoom } from '../actions/roomActions';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
`;

const StyledParagraph = styled.p`
  color: inherit;
`;

const ChatPage = ({ match, location, setCurrentRoom }) => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const { room } = queryString.parse(location.search);
    console.log(room);

    namespaceSocket.emit('join_room', room);
    // setCurrentRoom(room);
  }, []);

  useEffect(() => {
    namespaceSocket.on('user_joined', roomName => {
      setCurrentRoom(roomName);
      setMessage(`user joined to ${roomName} room`);
    });

    namespaceSocket.on('first_message', message => {
      console.log(message);
    });
  }, []);

  return (
    <StyledWrapper>
      <StyledParagraph>
        <p>welcome on the main chat page {queryString.parse(location.search).room}</p>
        <p>{message}</p>
      </StyledParagraph>
    </StyledWrapper>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentRoom: roomID => dispatch(setCurrentRoom(roomID))
  };
};

const ChatPageWithRouter = withRouter(ChatPage);

export default connect(null, mapDispatchToProps)(ChatPageWithRouter);
