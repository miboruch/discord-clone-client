import React, { useContext } from 'react';
import styled from 'styled-components';
import slugify from 'slugify';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleCreateRoom } from '../../../actions/toggleActions';
import CreateRoomBox from '../../molecules/CreateRoomBox/CreateRoomBox';
import { ReactComponent as HashIcon } from '../../../assets/icons/hash.svg';
import { ReactComponent as RemoveIcon } from '../../../assets/icons/delete.svg';
import NamespaceSocketContext from '../../../providers/NamespaceSocketContext';
import { setCurrentRoomName, setRoomMembers } from '../../../actions/roomActions';
import { chatLoading } from '../../../actions/chatActions';
import NamespaceMenu from '../../molecules/NamespaceMenu/NamespaceMenu';

const RoomsNavbar = styled.div`
  width: 230px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 125px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.roomsPanel};
  color: #fff;
  border-right: 2px solid rgba(23, 23, 23, 0.3);
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-155%')});
  transition: transform 0.8s ease-in;
  z-index: 10;

  ${({ theme }) => theme.mq.tablet} {
    transform: translateX(0);
    position: static;
  }

  ${({ theme }) => theme.mq.standard} {
    width: 250px;
  }
`;

const RoomWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 1rem;
`;

const StyledRemoveIcon = styled(RemoveIcon)`
  width: 12px;
  height: 12px;
  fill: ${({ theme }) => theme.color.darkThemeFontColor};
  position: absolute;
  top: 50%;
  right: 2.3rem;
  transform: translate(100%, -50%);
  cursor: pointer;
  pointer-events: auto !important;
  transition: all 0.5s ease;

  &:hover {
    fill: #fff;
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  height: 45px;
  position: relative;
  color: ${({ isCurrent, theme }) => (isCurrent ? '#fff' : theme.color.darkThemeFontColor)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  transition: all 0.5s ease;
  cursor: ${({ isCurrent }) => (isCurrent ? 'default' : 'pointer')};
  pointer-events: ${({ isCurrent }) => (isCurrent ? 'none' : 'auto')};
  background-color: ${({ isCurrent, theme }) => (isCurrent ? theme.color.namespacesPanel : 'transparent')};

  &:hover {
    background-color: ${({ theme }) => theme.color.namespacesPanel};
  }
`;

const StyledRoomNameParagraph = styled.p`
  font-size: 13px;
  letter-spacing: 1px;
`;

const StyledParagraph = styled.p`
  font-size: 16px;
  padding: 2rem 0;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 1px;
    background-color: #fff;
    transform: translate(-50%, -30%);
  }

  &::before {
    top: 50%;
    left: -30px;
  }

  &::after {
    top: 50%;
    right: -30px;
  }
`;

const StyledCreateParagraph = styled(StyledParagraph)`
  color: ${({ theme }) => theme.color.darkThemeFontColor};
  letter-spacing: 1px;
  font-weight: bold;
  cursor: pointer;
`;

const StyledHashIcon = styled(HashIcon)`
  width: 25px;
  height: 25px;
  fill: ${({ theme, isCurrent }) => (isCurrent ? '#fff' : theme.color.darkThemeFontColor)};
  margin: 0 1rem;
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translate(-50%, -50%);
`;

const RoomsTemplate = ({
  userID,
  namespaces,
  currentNamespaceData,
  toggleCreateRoom,
  isMenuOpen,
  rooms,
  match,
  history,
  currentRoomName,
  chatLoading
}) => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);

  return (
    <>
      <CreateRoomBox />
      {currentNamespaceData && (
        <RoomsNavbar isOpen={isMenuOpen}>
          <NamespaceMenu />
          <RoomWrapper>
            <>
              {rooms.map(room => {
                const roomName = `${room._id}${slugify(room.name)}`;
                return (
                  <StyledLink
                    to={`${match.url}/room/${roomName}`}
                    isCurrent={currentRoomName === roomName}
                    key={room._id}
                    onClick={() => {
                      namespaceSocket &&
                        namespaceSocket.emit('join_room', {
                          roomName: `${room._id}${slugify(room.name)}`,
                          roomID: room._id
                        });
                      chatLoading(true);
                    }}
                  >
                    <StyledHashIcon isCurrent={currentRoomName === roomName} />
                    <StyledRoomNameParagraph>{room.name}</StyledRoomNameParagraph>
                    {currentNamespaceData.ownerID === userID && (
                      <StyledRemoveIcon
                        onClick={() => {
                          namespaceSocket.emit('delete_room', {
                            roomID: room._id,
                            roomName: room.name,
                            namespaceID: currentNamespaceData._id
                          });
                          history.push(`/server/${currentNamespaceData._id}`);
                        }}
                      />
                    )}
                  </StyledLink>
                );
              })}
            </>
          </RoomWrapper>
          {namespaces.created.some(item => item._id.includes(currentNamespaceData._id)) && (
            <StyledCreateParagraph onClick={() => toggleCreateRoom(true)}>Create new room</StyledCreateParagraph>
          )}
        </RoomsNavbar>
      )}
    </>
  );
};

const mapStateToProps = ({
  authenticationReducer: { userID },
  namespaceReducer: { namespaces, currentNamespaceData },
  toggleReducer: { isMenuOpen },
  roomReducer: { roomsLoading, rooms, currentRoomName }
}) => {
  return { userID, namespaces, currentNamespaceData, isMenuOpen, roomsLoading, rooms, currentRoomName };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleCreateRoom: isOpen => dispatch(toggleCreateRoom(isOpen)),
    setCurrentRoomName: roomName => dispatch(setCurrentRoomName(roomName)),
    chatLoading: isLoading => dispatch(chatLoading(isLoading)),
    setRoomMembers: members => dispatch(setRoomMembers(members))
  };
};

const RoomsTemplateWithRouter = withRouter(RoomsTemplate);

export default connect(mapStateToProps, mapDispatchToProps)(RoomsTemplateWithRouter);
