import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ModalBox from '../ModalBox/ModalBox';
import NamespaceSocketContext from '../../../providers/NamespaceSocketContext';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import gsap from 'gsap';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 16;
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

const StyledHeading = styled.h1`
  font-size: 32px;
`;

const ConfirmBox = ({ isOpen, toggleBox }) => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);

  return (
    <StyledWrapper>
      <StyledBox>
        <StyledHeading>Are you sure you want to </StyledHeading>
        <p>Yes</p>
        <p>No</p>
      </StyledBox>
    </StyledWrapper>
  );
};

export default ConfirmBox;
