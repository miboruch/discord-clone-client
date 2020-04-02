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
import slugify from 'slugify';
import ChatPage from '../../../pages/ChatPage';
import { setCurrentRoomName, setRoomMembers, setRoomInfo } from '../../../actions/roomActions';
import { chatLoading } from '../../../actions/chatActions';

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

const NamespaceName = styled.div`
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
  cursor: ${({ isCurrent }) => (isCurrent ? 'default' : 'pointer')};
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
  namespaces,
  currentNamespaceID,
  openCreateRoomBox,
  isMenuOpen,
  rooms,
  namespaceName,
  setCurrentRoomName,
  match,
  currentRoomName,
  setRoomInfo,
  chatLoading
}) => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);

  useEffect(() => {
    if (namespaceSocket) {
      namespaceSocket.on('user_joined', ({ roomName, roomInfo }) => {
        setCurrentRoomName(roomName);
        setRoomInfo(roomInfo);
        chatLoading(false);
        console.log(`JOINED ROOM ${roomName}`);
      });

      namespaceSocket.on('user_left', roomName => {
        console.log(`user left room ${roomName}`);
        setCurrentRoomName(null);
        setRoomInfo({});
      });

      namespaceSocket.on('history_catchup', history => {
        console.log(history);
      });
    }
  }, [namespaceSocket]);

  return (
    <>
      <CreateRoomBox />
      <RoomsNavbar isOpen={isMenuOpen}>
        <NamespaceName>
          <p>{namespaceName}</p>
        </NamespaceName>
        <RoomWrapper>
          {currentNamespaceID ? (
            <>
              {rooms.map(item => {
                return currentRoomName === `${item._id}${slugify(item.name)}` ? (
                  <StyledLink isCurrent={true} onClick={event => event.preventDefault()}>
                    <StyledHashIcon />
                    <StyledRoomNameParagraph>{item.name}</StyledRoomNameParagraph>
                  </StyledLink>
                ) : (
                  <StyledLink
                    to={`${match.url}/room/${item._id}${slugify(item.name)}`}
                    isCurrent={false}
                    onClick={() => {
                      namespaceSocket.emit('join_room', {
                        roomName: `${item._id}${slugify(item.name)}`,
                        roomID: item._id
                      });
                      chatLoading(true);
                    }}
                  >
                    <StyledHashIcon />
                    <StyledRoomNameParagraph>{item.name}</StyledRoomNameParagraph>
                  </StyledLink>
                );
              })}
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
  roomReducer: { roomsLoading, rooms, currentRoomName }
}) => {
  return { namespaces, currentNamespaceID, isMenuOpen, roomsLoading, rooms, currentRoomName };
};

const mapDispatchToProps = dispatch => {
  return {
    openCreateRoomBox: () => dispatch(openCreateRoom()),
    setCurrentRoomName: roomName => dispatch(setCurrentRoomName(roomName)),
    chatLoading: isLoading => dispatch(chatLoading(isLoading)),
    setRoomMembers: members => dispatch(setRoomMembers(members)),
    setRoomInfo: roomInfo => dispatch(setRoomInfo(roomInfo))
  };
};

RoomsTemplate.propTypes = {
  namespaceName: PropTypes.string.isRequired
};

const RoomsTemplateWithRouter = withRouter(RoomsTemplate);

export default connect(mapStateToProps, mapDispatchToProps)(RoomsTemplateWithRouter);
