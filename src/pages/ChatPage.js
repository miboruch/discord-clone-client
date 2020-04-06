import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import NamespaceSocketContext from '../providers/NamespaceSocketContext';
import { setRoomMembers } from '../actions/roomActions';
import Chat from '../components/templates/Chat/Chat';
import RoomInfo from '../components/molecules/RoomInfo/RoomInfo';
import Spinner from '../components/atoms/Spinner/Spinner';
import { addMessage } from '../actions/chatActions';

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

const ChatPage = ({ currentRoomName, setRoomMembers, isChatLoading, addMessage, match }) => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);

  useEffect(() => {
    console.log('CHAT PAGE MOUNTS');
    if (namespaceSocket) {
      namespaceSocket.on('members_update', members => {
        setRoomMembers(members);
      });

      return () => {
        console.log('CHAT PAGE UNMOUNTS');
        namespaceSocket.emit('leave_room', currentRoomName);
        console.log(`LEFT ROOM ${currentRoomName}`);
      };
    }
  }, [currentRoomName]);

  return (
    <StyledWrapper>
      {/*{isChatLoading ? (*/}
      {/*  <Spinner />*/}
      {/*) : (*/}
      {/*  <>*/}
      {/*    <RoomInfo />*/}
      {/*    <Chat />*/}
      {/*  </>*/}
      {/*)}*/}
      {!isChatLoading && <RoomInfo />}
      <Chat />
    </StyledWrapper>
  );
};

const mapStateToProps = ({ roomReducer: { currentRoomName }, chatReducer: { isChatLoading } }) => {
  return { currentRoomName, isChatLoading };
};

const mapDispatchToProps = dispatch => {
  return {
    setRoomMembers: members => dispatch(setRoomMembers(members)),
    addMessage: message => dispatch(addMessage(message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
