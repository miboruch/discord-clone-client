import React from 'react';
import { connect } from 'react-redux';
import { toggleCreateRoom } from '../../../actions/toggleActions';
import ModalBox from '../ModalBox/ModalBox';
import CreateRoomForm from '../CreateRoomForm/CreateRoomForm';

const CreateRoomBox = ({ isCreateRoomOpen, toggleCreateRoom }) => {
  return (
    <ModalBox closeFunction={toggleCreateRoom} isOpen={isCreateRoomOpen}>
      <CreateRoomForm />
    </ModalBox>
  );
};

const mapStateToProps = ({ toggleReducer: { isCreateRoomOpen } }) => {
  return { isCreateRoomOpen };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleCreateRoom: isOpen => dispatch(toggleCreateRoom(isOpen))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoomBox);
