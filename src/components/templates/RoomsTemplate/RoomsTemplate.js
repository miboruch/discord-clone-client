import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { openCreateRoom } from '../../../actions/toggleActions';
import CreateRoomBox from '../../molecules/CreateRoomBox/CreateRoomBox';
import NamespaceSocketContext from '../../../providers/namespaceSocketContext';

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
  z-index: 20;

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
  color: ${({ theme }) => theme.color.darkThemeFontColor};
  letter-spacing: 1px;
  font-weight: bold;
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

const RoomsTemplate = ({ namespaces, currentNamespaceID, openCreateRoomBox, isMenuOpen, roomsLoading, rooms }) => {
  const [currentNamespaceData, setCurrentNamespaceData] = useState({});
  const { namespaceSocket } = useContext(NamespaceSocketContext);

  useEffect(() => {
    namespaceSocket.on('namespace_data', namespace => {
      setCurrentNamespaceData(namespace);
    });
  }, []);

  return (
    <>
      <CreateRoomBox />
      <RoomsNavbar isOpen={isMenuOpen}>
        <RoomName>
          {currentNamespaceData.name && <p>{currentNamespaceData.name}</p>}
        </RoomName>
        <RoomWrapper>
          {currentNamespaceID ? (
            <>
              {rooms.map(item => (
                <StyledLink to={`/server/${currentNamespaceID}?room=${item._id}`} key={item._id}>
                  <p>{item.name}</p>
                </StyledLink>
              ))}
            </>
          ) : (
            <p>You are not in the server</p>
          )}
        </RoomWrapper>
        {namespaces.created.some(item => item._id.includes(currentNamespaceID)) ? (
          <StyledCreateParagraph onClick={() => openCreateRoomBox()}>Create new room</StyledCreateParagraph>
        ) : null}
      </RoomsNavbar>
    </>
  );
};

const mapStateToProps = ({
  namespaceReducer: { namespaces, currentNamespaceID },
  toggleReducer: { isMenuOpen },
  roomReducer: { roomsLoading, rooms }
}) => {
  return { namespaces, currentNamespaceID, isMenuOpen, roomsLoading, rooms };
};

const mapDispatchToProps = dispatch => {
  return {
    openCreateRoomBox: () => dispatch(openCreateRoom()),
    setCurrentRoom: () => dispatch()
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomsTemplate);
