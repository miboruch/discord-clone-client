import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const RoomsNavbar = styled.div`
  width: 150px;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.roomsPanel};
  color: #fff;
  transition: all 1s ease;
  position: relative;
  border-right: 2px solid rgba(23, 23, 23, 0.3);

  ${({ theme }) => theme.mq.standard} {
    width: 250px;
  }
`;

const RoomWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 2rem;
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

const RoomsTemplate = () => {
  /* Fetch rooms - redux */
  return (
    <RoomsNavbar>
      <RoomWrapper>
        <StyledLink to={'/room/123'}>
          <p>hello</p>
        </StyledLink>
      </RoomWrapper>
      <StyledLink>
        <StyledParagraph>Create new room</StyledParagraph>
      </StyledLink>
    </RoomsNavbar>
  );
};

export default RoomsTemplate;
