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

const RoomInfo = ({ roomInfo, roomMembers }) => {
  return (
    <StyledWrapper>
      <>
        <StyledParagraph>Users online: {roomMembers}</StyledParagraph>
        <StyledParagraph>Name: {roomInfo && roomInfo.name}</StyledParagraph>
        <StyledParagraph>Description: {roomInfo && roomInfo.description}</StyledParagraph>
      </>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ roomReducer: { roomMembers } }) => {
  return { roomMembers };
};

export default connect(mapStateToProps)(RoomInfo);
