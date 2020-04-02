import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import NamespaceSocketContext from '../providers/namespaceSocketContext';
import { setRoomMembers } from '../actions/roomActions';
import Chat from '../components/templates/Chat/Chat';
import RoomInfo from '../components/molecules/RoomInfo/RoomInfo';

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

const ChatPage = ({ currentRoomName, setRoomMembers }) => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);

  useEffect(() => {
    if (namespaceSocket) {
      namespaceSocket.on('members_update', members => {
        setRoomMembers(members);
      });

      return () => {
        namespaceSocket.emit('leave_room', currentRoomName);
        console.log(`LEFT ROOM ${currentRoomName}`);
      };
    }
  }, [currentRoomName]);

  return (
    <StyledWrapper>
      <RoomInfo />
      <Chat />
    </StyledWrapper>
  );
};

const mapStateToProps = ({ roomReducer: { currentRoomName } }) => {
  return { currentRoomName };
};

const mapDispatchToProps = dispatch => {
  return {
    setRoomMembers: members => dispatch(setRoomMembers(members))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
