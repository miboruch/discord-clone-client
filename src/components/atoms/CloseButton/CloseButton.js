import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonWrapper = styled.button`
  cursor: pointer;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  position: absolute;
  top: ${({ isSmall }) => (isSmall ? '0' : '1rem')};
  right: ${({ isSmall }) => (isSmall ? '0' : '1rem')};
  margin: 0 0.5rem;
  :focus {
    outline: none;
  }
`;

const InnerButton = styled.div`
  position: relative;
  ::before,
  ::after {
    content: '';
    width: 24px;
    height: 1px;
    background: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
    position: absolute;
    left: 0;
    transition: all 0.5s ease;
    top: 0;
  }
  ::before {
    transform: rotate(40deg);
  }
  ::after {
    transform: rotate(-40deg);
  }
`;

const CloseButton = ({ setBoxState, theme, isSmall }) => {
  return (
    <ButtonWrapper type='button' isSmall={isSmall} onClick={() => setBoxState(false)}>
      <InnerButton theme={theme} />
    </ButtonWrapper>
  );
};

CloseButton.propTypes = {
  setBoxState: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(['dark', 'light']),
  isSmall: PropTypes.bool
};

CloseButton.defaultProps = {
  theme: 'light',
  isSmall: false
};

export default CloseButton;
