import React from 'react';
import styled from 'styled-components';

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
  z-index: 10;
  transition: all 0.8s ease;

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

const StyledParagraph = styled.p`
  font-size: 12px;
`;

const StyledSpan = styled.span`
  font-weight: bold;
`;

const ToggleCheckbox = () => {
  return (
    <StyledWrapper>
      <StyledParagraph>
        Dark theme: <StyledSpan>OFF</StyledSpan>
      </StyledParagraph>
      <StyledInput type='checkbox' />
    </StyledWrapper>
  );
};

export default ToggleCheckbox;
