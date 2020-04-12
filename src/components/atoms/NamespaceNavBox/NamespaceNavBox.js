import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getFirstLetter } from '../../../utils/helpers';

const StyledNamespaceBox = styled.div`
  width: 60px;
  height: 60px;
  position: relative;
  border-radius: 8px;
  border: ${({ isCurrent }) => (isCurrent ? '2px solid #fff' : 'none')};
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'rgba(83, 212, 172, 0.7)')};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  transition: border 0.5s ease;
  
  &::after{
    content: '${({ name }) => name}';
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 100%);
    color: #fff;
    text-align: center;
    font-size: 11px;
    padding-top: 4px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
  
  &:hover::after{
    opacity: 1;
    visibility: visible;
  }
`;

const StyledParagraph = styled.p`
  font-family: ${({ theme }) => theme.font.family.futura};
  font-size: 34px;
  font-weight: 500;
  color: #fff;
`;

const NamespaceNavBox = ({ name, backgroundColor, isCurrent, ...props }) => {
  return (
    <StyledNamespaceBox backgroundColor={backgroundColor} isCurrent={isCurrent} name={name} {...props}>
      <StyledParagraph>{getFirstLetter(name)}</StyledParagraph>
    </StyledNamespaceBox>
  );
};

NamespaceNavBox.propTypes = {
  name: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string
};

export default NamespaceNavBox;
