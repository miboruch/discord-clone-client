import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  position: relative;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 1px;
    background-color: #fff;
    top: 50%;
    transition: transform 0.5s ease;
  }

  &::before {
    left: 7px;
    transform: translate(-50%, -50%) ${({ isOpen }) => (isOpen ? 'rotate(-43deg)' : 'rotate(43deg)')};
  }

  &::after {
    left: 19px;
    transform: translate(-50%, -50%) ${({ isOpen }) => (isOpen ? 'rotate(43deg)' : 'rotate(-43deg)')};
  }
`;

const SlideIcon = ({ isOpen }) => {
  return <StyledButton isOpen={isOpen} />;
};

SlideIcon.propTypes = {
  isOpen: PropTypes.bool.isRequired
};

export default SlideIcon;
