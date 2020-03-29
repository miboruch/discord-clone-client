import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { openCreateRoom } from '../../../actions/toggleActions';
import CreateRoomBox from '../../molecules/CreateRoomBox/CreateRoomBox';
import { ReactComponent as HashIcon } from '../../../assets/icons/hash.svg';
import NamespaceSocketContext from '../../../providers/namespaceSocketContext';
import ChatPage from '../../../pages/ChatPage';
import { chatLoadingStart, setCurrentRoom } from '../../../actions/roomActions';

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

const RoomName = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RoomWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 2rem;
`;

const StyledLink = styled(Link)`
  color: ${({ isCurrent, theme }) => (isCurrent ? '#fff' : theme.color.darkThemeFontColor)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
`;

const StyledLinkWrapper = styled.div`
  color: ${({ isCurrent, theme }) => (isCurrent ? '#fff' : theme.color.darkThemeFontColor)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
  cursor: pointer;
`;

const StyledRoomNameParagraph = styled.p`
  font-size: 16px;
  letter-spacing: 2px;
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
  fill: ${({ theme }) => theme.color.darkThemeFontColor};
  margin: 0 1rem;
`;

const RoomsTemplate = ({
  history,
  namespaces,
  currentNamespaceID,
  openCreateRoomBox,
  isMenuOpen,
  rooms,
  namespaceName,
  setCurrentRoom,
  match,
  chatLoadingStart,
  currentRoom
}) => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);

  useEffect(() => {
    namespaceSocket.on('user_joined', roomID => {
      console.log(`user joined room ${roomID}`);
      setCurrentRoom(roomID);
    });
  });

  return (
    <>
      <CreateRoomBox />
      <RoomsNavbar isOpen={isMenuOpen}>
        <RoomName>
          <p>{namespaceName}</p>
        </RoomName>
        <RoomWrapper>
          {currentNamespaceID ? (
            <>
              {rooms.map(item => (
                <StyledLinkWrapper
                  isCurrent={currentRoom === item._id}
                  onClick={() => {
                    history.push(`${match.url}/room/${item._id}`);
                    namespaceSocket.emit('join_room', item._id.toString());
                    // chatLoadingStart();
                  }}
                >
                  <StyledHashIcon />
                  <StyledRoomNameParagraph>{item.name}</StyledRoomNameParagraph>
                </StyledLinkWrapper>
              ))}
            </>
          ) : (
            <p>You are not in the server</p>
          )}
        </RoomWrapper>
        {namespaces.created.some(item => item._id.includes(currentNamespaceID)) && (
          <StyledCreateParagraph onClick={() => openCreateRoomBox()}>Create new room</StyledCreateParagraph>
        )}
      </RoomsNavbar>
    </>
  );
};

const mapStateToProps = ({
  namespaceReducer: { namespaces, currentNamespaceID },
  toggleReducer: { isMenuOpen },
  roomReducer: { roomsLoading, rooms, currentRoom }
}) => {
  return { namespaces, currentNamespaceID, isMenuOpen, roomsLoading, rooms, currentRoom };
};

const mapDispatchToProps = dispatch => {
  return {
    openCreateRoomBox: () => dispatch(openCreateRoom()),
    setCurrentRoom: roomID => dispatch(setCurrentRoom(roomID)),
    chatLoadingStart: () => dispatch(chatLoadingStart())
  };
};

RoomsTemplate.propTypes = {
  namespaceName: PropTypes.string.isRequired
};

const RoomsTemplateWithRouter = withRouter(RoomsTemplate);

export default connect(mapStateToProps, mapDispatchToProps)(RoomsTemplateWithRouter);
