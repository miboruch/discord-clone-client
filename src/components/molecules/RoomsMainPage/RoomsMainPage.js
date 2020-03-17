import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const RoomNavbar = styled.div`
  width: 150px;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.roomsPanel};
  color: #fff;
  padding-left: 3rem;
  
  ${({theme}) => theme.mq.standard}{
    width: 250px;
  }
`;

const RoomsMainPage = () => {
  return (
    <StyledWrapper>
      <RoomNavbar>
        hello
      </RoomNavbar>
    </StyledWrapper>
  )
};

export default RoomsMainPage;
