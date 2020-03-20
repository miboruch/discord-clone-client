import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { closeCreateRoom } from '../../../actions/toggleActions';
import ToggleCheckbox from '../../atoms/ToggleCheckbox/ToggleCheckbox';
import ModalBox from '../ModalBox/ModalBox';

const StyledParagraph = styled.p`
  font-size: 12px;
`;

const StyledSpan = styled.span`
  font-weight: bold;
`;

/* TODO: formik -> create room data */
const CreateRoomBox = ({ isCreateRoomOpen, closeCreateRoomBox }) => {
  return (
    <ModalBox closeFunction={closeCreateRoomBox} isOpen={isCreateRoomOpen}>
      <ToggleCheckbox isChecked={false} toggleFunction={() => {}}>
        <StyledParagraph>
          Is private: <StyledSpan>{false}</StyledSpan>
        </StyledParagraph>
      </ToggleCheckbox>
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
