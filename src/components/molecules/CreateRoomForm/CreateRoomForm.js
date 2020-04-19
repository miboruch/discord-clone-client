import React, { useContext } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { CreateRoomSchema } from '../../../utils/validationSchema';
import NamespaceSocketContext from '../../../providers/NamespaceSocketContext';
import { StyledButton, StyledForm } from '../AuthContent/styles';
import FormInput from '../FormInput/FormInput';
import { toggleCreateRoom } from '../../../actions/toggleActions';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const StyledHeading = styled.h1`
  color: #000;
  letter-spacing: 2px;
  margin-bottom: 3rem;
`;

const CreateRoomForm = ({ toggleCreateRoom }) => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);

  return (
    <StyledWrapper>
      <StyledHeading>Create new room</StyledHeading>
      <Formik
        initialValues={{
          name: '',
          description: ''
        }}
        onSubmit={({ name, description }, { resetForm }) => {
          namespaceSocket.emit('create_room', { name, description });
          resetForm();
          toggleCreateRoom(false);
        }}
        validationSchema={CreateRoomSchema}
      >
        {({ handleChange, handleBlur, errors }) => (
          <StyledForm>
            <FormInput
              placeholder={errors.name || 'Room name'}
              inputType='text'
              onChange={handleChange}
              onBlur={handleBlur}
              name='name'
            />
            <FormInput
              placeholder={errors.description || 'Description'}
              inputType='text'
              onChange={handleChange}
              onBlur={handleBlur}
              name='description'
            />
            <StyledButton type='submit'>Create</StyledButton>
          </StyledForm>
        )}
      </Formik>
    </StyledWrapper>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    toggleCreateRoom: isOpen => dispatch(toggleCreateRoom(isOpen))
  };
};

export default connect(null, mapDispatchToProps)(CreateRoomForm);
