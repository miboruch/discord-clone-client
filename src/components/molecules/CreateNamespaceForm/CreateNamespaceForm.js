import React, { useContext } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { CreateRoomSchema } from '../../../utils/validationSchema';
import FormInput from '../FormInput/FormInput';
import ToggleCheckbox from '../../atoms/ToggleCheckbox/ToggleCheckbox';
import { StyledForm, StyledButton } from '../AuthContent/styles';
import MainSocketContext from '../../../providers/mainSocketContext';

const CheckboxWrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
`;

const StyledParagraph = styled.p`
  color: #000;
  margin-left: 2rem;
`;

const CreateNamespaceForm = ({ userID }) => {
  const { socket } = useContext(MainSocketContext);

  return (
    <Formik
      initialValues={{
        name: '',
        isPrivate: false,
        password: ''
      }}
      onSubmit={({ name, isPrivate, password }) => {
        socket.emit('create_namespace', { name, ownerID: userID, isPrivate, password });
      }}
      validationSchema={CreateRoomSchema}
    >
      {({ handleChange, handleBlur, errors, values, setFieldValue }) => (
        <StyledForm>
          <FormInput
            placeholder={errors.name || 'Server name'}
            inputType='text'
            onChange={handleChange}
            onBlur={handleBlur}
            name='name'
          />
          <FormInput
            placeholder={errors.password || 'Password'}
            inputType='password'
            onChange={handleChange}
            onBlur={handleBlur}
            name='password'
            disabled={!values.isPrivate}
          />
          <CheckboxWrapper>
            <ToggleCheckbox
              isChecked={values.isPrivate}
              toggleFunction={() => setFieldValue('isPrivate', !values.isPrivate)}
            />
            <StyledParagraph>
              {values.isPrivate ? 'Password will be required while joining to the server' : 'Password is not required'}
            </StyledParagraph>
          </CheckboxWrapper>
          <StyledButton type='submit'>Create</StyledButton>
        </StyledForm>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ authenticationReducer: { userID } }) => {
  return { userID };
};

export default connect(mapStateToProps)(CreateNamespaceForm);
