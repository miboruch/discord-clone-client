import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import PropTypes from 'prop-types';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import { ReactComponent as ErrorIcon } from '../../../assets/icons/error.svg';
import { ReactComponent as SuccessIcon } from '../../../assets/icons/success.svg';

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;
  height: 80px;
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.color.roomsPanel};
  color: #fff;
  padding: 0 2rem;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
`;

const StyledParagraph = styled.p`
  letter-spacing: 1px;
  font-size: 15px;
  position: absolute;
  top: 50%;
  left: 74px;
  transform: translateY(-50%);
`;

const StyledErrorIcon = styled(ErrorIcon)`
  width: 40px;
  height: 40px;
`;

const StyledSuccessIcon = styled(SuccessIcon)`
  width: 40px;
  height: 40px;
`;

const InformationBox = ({ isOpen, text, isSuccess }) => {
  const wrapperRef = useRef(null);
  const [shouldBoxOpen, setBoxOpen] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setBoxOpen(false);
      }, 10000);
    }
  }, [isOpen]);

  return (
    <StyledWrapper ref={wrapperRef} isOpen={shouldBoxOpen}>
      <CloseButton setBoxState={setBoxOpen} isSmall={true} theme={'dark'} />
      {isSuccess ? <StyledSuccessIcon /> : <StyledErrorIcon />}
      <StyledParagraph>{text}</StyledParagraph>
    </StyledWrapper>
  );
};

InformationBox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  isSuccess: PropTypes.bool
};

InformationBox.defaultProps = {
  isSuccess: false
};

export default InformationBox;
