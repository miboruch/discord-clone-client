import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

const RoomsNavbar = styled.div`
  width: 150px;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.roomsPanel};
  color: #fff;
  padding-left: 3rem;
  transition: all 1s ease;

  ${({ theme }) => theme.mq.standard} {
    width: 250px;
  }
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
      <RoomsNavbar>
        <Link to={'/room/123'}>
          <p>hello</p>
        </Link>
      </RoomsNavbar>
      <ContentWrapper>Choose room</ContentWrapper>
    </StyledWrapper>
  );
};

export default RoomsMainPage;
