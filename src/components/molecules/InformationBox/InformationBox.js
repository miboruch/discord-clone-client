import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { connect } from 'react-redux';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import { ReactComponent as ErrorIcon } from '../../../assets/icons/error.svg';
import { ReactComponent as SuccessIcon } from '../../../assets/icons/success.svg';
import { setInformationObject } from '../../../actions/toggleActions';

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

//* informationObject -> {type: enum['error', 'success'], message: String}
const InformationBox = ({ informationObject, setInformationObject }) => {
  const wrapperRef = useRef(null);
  const [shouldBoxOpen, setBoxOpen] = useState(false);
  const [isSuccess, setSuccess] = useState(true);
  const [tl] = useState(gsap.timeline({ defaults: { ease: 'power3.inOut' } }));

  useEffect(() => {
    if (informationObject) {
      setBoxOpen(true);
      informationObject.type === 'success' ? setSuccess(true) : setSuccess(false);
      setTimeout(() => {
        setBoxOpen(false);
        setInformationObject(null);
      }, 3000);
    }
  }, [informationObject]);

  useEffect(() => {
    const wrapperBox = wrapperRef.current;

    tl.fromTo(wrapperBox, { autoAlpha: 0, y: '+=30' }, { autoAlpha: 1, y: '0', duration: 0.5 });
  }, []);

  useEffect(() => {
    shouldBoxOpen ? tl.play() : tl.reverse();
  }, [shouldBoxOpen]);

  return (
    <StyledWrapper ref={wrapperRef}>
      <CloseButton setBoxState={setBoxOpen} isSmall={true} theme={'dark'} />
      {isSuccess ? <StyledSuccessIcon /> : <StyledErrorIcon />}
      <StyledParagraph>{informationObject && informationObject.message}</StyledParagraph>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ toggleReducer: { informationObject } }) => {
  return { informationObject };
};

const mapDispatchToProps = dispatch => {
  return {
    setInformationObject: informationObject => dispatch(setInformationObject(informationObject))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InformationBox);
