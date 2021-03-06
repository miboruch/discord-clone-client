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
    width: 12px;
    height: 1px;
    background-color: ${({ isDarkTheme }) => (isDarkTheme ? '#fff' : '#2d2d2d')};
    top: ${({ isOpen }) => (isOpen ? '25%' : '50%')};
    transition: all 0.5s ease;
  }

  &::before {
    left: -6px;
    transform-origin: bottom right;
    transform: translate(-50%, -50%) ${({ isOpen }) => (isOpen ? 'rotate(-43deg)' : 'rotate(43deg)')};
  }

  &::after {
    left: 6px;
    transform-origin: bottom left;
    transform: translate(-50%, -50%) ${({ isOpen }) => (isOpen ? 'rotate(43deg)' : 'rotate(-43deg)')};
  }
`;

const SlideIcon = ({ isOpen, isDarkTheme }) => {
  return <StyledButton isOpen={isOpen} isDarkTheme={isDarkTheme} />;
};

SlideIcon.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isDarkTheme: PropTypes.bool
};

SlideIcon.defaultProps = {
  isDarkTheme: true
};

export default SlideIcon;
