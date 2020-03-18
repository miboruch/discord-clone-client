import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const RoomsNavbar = styled.div`
  width: 150px;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.roomsPanel};
  color: #fff;
  padding-left: 3rem;
  transition: all 1s ease;
  position: relative;

  ${({ theme }) => theme.mq.standard} {
    width: 250px;
  }
`;

const StyledLink = styled(Link)`
  color: #fff;
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
      <StyledLink to={'/room/123'}>
        <p>hello</p>
      </StyledLink>
      <StyledLink>
        <StyledParagraph>Create new room</StyledParagraph>
      </StyledLink>
    </RoomsNavbar>
  );
};

export default RoomsTemplate;
