import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { closeCreateRoom } from '../../../actions/toggleActions';
import ToggleCheckbox from '../../atoms/ToggleCheckbox/ToggleCheckbox';
import ModalBox from '../ModalBox/ModalBox';
import CreateRoomForm from '../CreateRoomForm/CreateRoomForm';

const StyledParagraph = styled.p`
  font-size: 12px;
`;

const CreateRoomBox = ({ isCreateRoomOpen, closeCreateRoomBox }) => {
  return (
    <ModalBox closeFunction={closeCreateRoomBox} isOpen={isCreateRoomOpen}>
      <CreateRoomForm />
    </ModalBox>
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
