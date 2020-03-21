import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { openCreateRoom } from '../../../actions/toggleActions';
import CreateRoomBox from '../../molecules/CreateRoomBox/CreateRoomBox';

const RoomWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 2rem;
`;

const RoomsNavbar = styled.div`
  width: 230px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 125px;
  background-color: ${({ theme }) => theme.color.roomsPanel};
  color: #fff;
  border-right: 2px solid rgba(23, 23, 23, 0.3);
  z-index: 800;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-155%')});
  transition: all 0.8s ease-in;

  ${({ theme }) => theme.mq.tablet} {
    transform: translateX(0);
    position: static;
  }

  ${({ theme }) => theme.mq.standard} {
    width: 250px;
  }
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

const RoomsTemplate = ({ namespaces, currentNamespaceID, openCreateRoomBox, isMenuOpen }) => {
  /* Fetch rooms - redux */
  return (
    <>
      <CreateRoomBox />
      <RoomsNavbar isOpen={isMenuOpen}>
        <RoomWrapper>
          {currentNamespaceID ? (
            <StyledLink to={`/server/${currentNamespaceID}?room=123`}>
              <p>hello</p>
            </StyledLink>
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

const mapStateToProps = ({ namespaceReducer: { namespaces, currentNamespaceID }, toggleReducer: { isMenuOpen } }) => {
  return { namespaces, currentNamespaceID, isMenuOpen };
};

const mapDispatchToProps = dispatch => {
  return {
    openCreateRoomBox: () => dispatch(openCreateRoom()),
    setCurrentRoom: () => dispatch()
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomsTemplate);
