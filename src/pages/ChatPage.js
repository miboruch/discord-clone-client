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
    console.log('CHATPAGE CHANGE');
    const { roomID } = match.params;
    console.log(roomID);

    namespaceSocket.emit('join_room', roomID);

    namespaceSocket.on('user_joined', roomName => {
      console.log(`user joined to ${roomName}`);
      setCurrentRoom(roomName);
      setMessage(`user joined to ${roomName} room`);
    });

    namespaceSocket.on('first_message', message => {
      console.log(message);
    });
  }, [match.params.roomID]);

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
