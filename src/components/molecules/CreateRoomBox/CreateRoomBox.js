import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { connect } from 'react-redux';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import { closeCreateRoom } from '../../../actions/toggleActions';
import ToggleCheckbox from '../../atoms/ToggleCheckbox/ToggleCheckbox';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
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
`;

const CreateRoomBox = ({ closeCreateRoomBox, isCreateRoomOpen }) => {
  const [isCreatedRoomPrivate, setCreatedRoomPrivate] = useState(false);
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
    isCreateRoomOpen ? tl.play() : tl.reverse();
  }, [isCreateRoomOpen]);

  const toggleRoomPrivacy = () => {
    setCreatedRoomPrivate(!isCreatedRoomPrivate);
  };

  return (
    <StyledWrapper ref={wrapperRef}>
      <StyledBox>
        <CloseButtonWrapper>
          <CloseButton setBoxState={closeCreateRoomBox} />
        </CloseButtonWrapper>
        <ToggleCheckbox isChecked={isCreatedRoomPrivate} toggleFunction={toggleRoomPrivacy} />
      </StyledBox>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ toggleReducer: { isCreateRoomOpen } }) => {
  return { isCreateRoomOpen };
};

const mapDispatchToProps = dispatch => {
  return {
    closeCreateRoomBox: () => dispatch(closeCreateRoom())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoomBox);
