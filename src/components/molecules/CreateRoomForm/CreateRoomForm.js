import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { CreateRoomSchema } from '../../../utils/validationSchema';
import NamespaceSocketContext from '../../../providers/namespaceSocketContext';
import { StyledButton, StyledForm } from '../AuthContent/styles';
import FormInput from '../FormInput/FormInput';

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

const CreateRoomForm = () => {
  const { namespaceSocket } = useContext(NamespaceSocketContext);

  useEffect(() => {
    namespaceSocket.on('test', data => {
      console.log(data);
    });
    namespaceSocket.on('room_created', data => {
      /* save to the fetched namespace rooms */
      console.log(data);
    });
  }, []);

  return (
    <StyledWrapper>
      <StyledHeading>Create new room</StyledHeading>
      <Formik
        initialValues={{
          name: '',
          description: ''
        }}
        onSubmit={({ name, description }) => {
          namespaceSocket.emit('create_room', { name, description });
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
              placeholder={errors.description || 'Full name'}
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

export default CreateRoomForm;
