import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import PropTypes from 'prop-types';
import CloseButton from '../../atoms/CloseButton/CloseButton';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 560;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledBox = styled.div`
  width: 90%;
  height: 350px;
  background-color: #f5f5f5;
  border-radius: 15px;
  position: relative;

  ${({ theme }) => theme.mq.tabletL} {
    width: 500px;
  }

  ${({ theme }) => theme.mq.standard} {
    width: 700px;
    height: 450px;
  }
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 500;
`;

const ModalBox = ({ closeFunction, isOpen, children }) => {
  const [tl] = useState(gsap.timeline({ defaults: { ease: 'power3.inOut' } }));
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapperElement = wrapperRef.current;
    const [boxElement] = wrapperElement.children;

    gsap.set([wrapperElement, boxElement], { autoAlpha: 0 });

    tl.to(wrapperElement, { autoAlpha: 1, duration: 0.8 }).fromTo(
      boxElement,
      { x: '-=50' },
      { x: 0, autoAlpha: 1, duration: 0.7 }
    );
  }, []);

  useEffect(() => {
    isOpen ? tl.play() : tl.reverse();
  }, [isOpen]);

  return (
    <StyledWrapper ref={wrapperRef}>
      <StyledBox>
        <CloseButtonWrapper>
          <CloseButton setBoxState={closeFunction} />
        </CloseButtonWrapper>
        {children}
      </StyledBox>
    </StyledWrapper>
  );
};

ModalBox.propTypes = {
  closeFunction: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default ModalBox;
