import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.input`
  cursor: pointer;
  position: relative;
  width: 56px;
  height: 24px;
  transition: all 0.8s ease;
  z-index: 1;
  -moz-appearance: initial;

  &:before {
    content: '';
    position: absolute;
    background-color: #d3d3d3;
    border-radius: 20px;
    display: block;
    width: 56px;
    height: 24px;
    transition: all 0.8s ease;
  }

  &:after {
    content: '';
    position: absolute;
    background-color: #fff;
    border: 1px solid rgba(23, 23, 23, 0.3);
    border-radius: 50%;
    display: block;
    width: 22px;
    height: 22px;
    left: 2px;
    transform: translateY(-50%);
    top: 50%;
    transition: all 0.5s ease;
  }

  &:checked {
    &:before {
      background-color: #64aa50;
    }

    &:after {
      background-color: #fff;
      left: 32px;
    }
  }
`;

const ToggleCheckbox = ({ toggleFunction, isChecked, children }) => {
  return (
    <StyledWrapper>
      {children}
      <StyledInput type='checkbox' onChange={() => toggleFunction()} checked={isChecked} />
    </StyledWrapper>
  );
};

ToggleCheckbox.propTypes = {
  toggleFunction: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired
};

export default ToggleCheckbox;
