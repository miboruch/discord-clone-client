import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledNamespaceBox = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'rgba(83, 212, 172, 0.7)')};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const StyledParagraph = styled.p`
  font-family: ${({ theme }) => theme.font.family.futura};
  font-size: 34px;
  font-weight: 500;
  color: #fff;
`;

const NamespaceNavBox = ({ firstLetter, backgroundColor, ...props }) => {
  return (
    <StyledNamespaceBox backgroundColor={backgroundColor} {...props}>
      <StyledParagraph>{firstLetter}</StyledParagraph>
    </StyledNamespaceBox>
  );
};

NamespaceNavBox.propTypes = {
  firstLetter: PropTypes.symbol.isRequired,
  backgroundColor: PropTypes.string
};

export default NamespaceNavBox;
