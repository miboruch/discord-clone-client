import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import { closeCreateRoom } from '../../../actions/toggleActions';

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
  backdrop-filter: blur(2px);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
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
  return (
    <StyledWrapper isOpen={isCreateRoomOpen}>
      <StyledBox>
        <CloseButtonWrapper>
          <CloseButton setBoxState={closeCreateRoomBox} />
        </CloseButtonWrapper>
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
