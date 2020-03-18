import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  overflow: hidden;
  background: transparent;
`;

const RoomsMainPage = () => {
  /* here namespace connection - socket - namespace */
  return (
    <StyledWrapper>
      <p>Choose room</p>
    </StyledWrapper>
  );
};

export default RoomsMainPage;
