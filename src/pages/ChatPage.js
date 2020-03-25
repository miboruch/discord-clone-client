import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
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

const ChatPage = ({ match, location, setCurrentRoom, currentRoom }) => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);
  const [message, setMessage] = useState('');
  const [isInRoom, setRoomID] = useState(false);

  useEffect(() => {
    if (!currentRoom) {
      console.log('joining room');
      namespaceSocket.emit('join_room', match.params.roomID);
    }

    // else {
    //   setCurrentRoom(match.params.roomID);
    //   namespaceSocket.emit('join_room', match.params.roomID);
    // }

    // if (!isInRoom) {
    //   console.log('joining room');
    //   namespaceSocket.emit('join_room', match.params.roomID);
    // }

    return () => {
      if (currentRoom) {
        console.log('leaving room');
        namespaceSocket.emit('leave_room', currentRoom);
        setCurrentRoom(null);
      }
    };
  }, [match.params.roomID]);

  useEffect(() => {
    // console.log('CHAT PAGE MOUNTED');
    console.log(match);
    console.log('here i should emit join room socket');
    namespaceSocket.on('user_joined', roomID => {
      setCurrentRoom(roomID);
      setMessage(`Joined ${roomID}`);
    });

    // namespaceSocket.on('first_message', message => {
    //   setMessage(message);
    // });
  }, [match.params.roomID]);

  // useEffect(() => {
  //   if (isInRoom) {
  //     console.log('joining room');
  //     namespaceSocket.emit('join_room', match.params.roomID);
  //   }
  //
  //   return () => {
  //     if (isInRoom) {
  //       console.log('leaving room');
  //       namespaceSocket.emit('leave_room', match.params.roomID);
  //     }
  //   };
  // }, [match.params.roomID]);

  // useEffect(() => {
  //   console.log('CHATPAGE CHANGE');
  //   const { roomID } = match.params;
  //   console.log(roomID);
  //
  //   namespaceSocket.on('user_joined', roomName => {
  //     console.log(`You have joined to ${roomName} room`);
  //     setCurrentRoom(roomName);
  //     setMessage(`You have joined to ${roomName} room`);
  //   });
  //
  //   namespaceSocket.on('first_message', message => {
  //     console.log(message);
  //   });
  // }, []);

  return (
    <StyledWrapper>
      <StyledParagraph>
        <p>welcome on the main chat page {queryString.parse(location.search).room}</p>
        <p>{message}</p>
        <p>CHAT PAGE MOUNTED</p>
      </StyledParagraph>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ roomReducer: { currentRoom } }) => {
  return { currentRoom };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentRoom: roomID => dispatch(setCurrentRoom(roomID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
