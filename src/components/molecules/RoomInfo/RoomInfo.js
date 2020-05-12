import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ReactComponent as Users } from '../../../assets/icons/users.svg';

const StyledWrapper = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  ${({ theme }) => theme.mq.tablet} {
    top: 0;
  }
`;

const StyledParagraph = styled.p`
  color: inherit;
  padding: 0 1.2rem;
`;

const StyledUsersIcon = styled(Users)`
  width: 35px;
  height: 35px;
  margin-left: 2rem;
  fill: ${({ isDarkTheme }) => (isDarkTheme ? '#fff' : '#2d2d2d')};
`;

const RoomInfo = ({ currentRoomInfo, roomMembers, isDarkTheme }) => {
  return (
    <StyledWrapper>
      {currentRoomInfo && (
        <>
          <StyledUsersIcon isDarkTheme={isDarkTheme} />
          <StyledParagraph>{roomMembers}</StyledParagraph>
          <StyledParagraph>Name: {currentRoomInfo.name}</StyledParagraph>
          <StyledParagraph>Description: {currentRoomInfo.description}</StyledParagraph>
        </>
      )}
    </StyledWrapper>
  );
};

const mapStateToProps = ({ roomReducer: { roomMembers, currentRoomInfo }, toggleReducer: { isDarkTheme } }) => {
  return { roomMembers, currentRoomInfo, isDarkTheme };
};

export default connect(mapStateToProps)(RoomInfo);
