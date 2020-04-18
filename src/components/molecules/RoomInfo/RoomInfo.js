import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

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

const RoomInfo = ({ currentRoomInfo, roomMembers }) => {
  return (
    <StyledWrapper>
      <>
        <StyledParagraph>Users online: {roomMembers}</StyledParagraph>
        <StyledParagraph>Name: {currentRoomInfo.name}</StyledParagraph>
        <StyledParagraph>Description: {currentRoomInfo.description}</StyledParagraph>
      </>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ roomReducer: { roomMembers, currentRoomInfo } }) => {
  return { roomMembers, currentRoomInfo };
};

export default connect(mapStateToProps)(RoomInfo);
