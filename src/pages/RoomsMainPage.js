import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
`;

const RoomsMainPage = () => {
  return (
    <StyledWrapper>
      <ContentWrapper>Choose room</ContentWrapper>
    </StyledWrapper>
  );
};

export default RoomsMainPage;
