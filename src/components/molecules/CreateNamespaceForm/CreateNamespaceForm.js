import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { CreateNamespaceSchema } from '../../../utils/validationSchema';
import FormInput from '../FormInput/FormInput';
import ToggleCheckbox from '../../atoms/ToggleCheckbox/ToggleCheckbox';
import { StyledForm, StyledButton } from '../AuthContent/styles';
import MainSocketContext from '../../../providers/MainSocketContext';
import { ChromePicker } from 'react-color';
import { CreateNamespaceContext } from '../../compound/CreateNamespace/context/CreateNamespaceContext';

const CheckboxWrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
`;

const StyledParagraph = styled.p`
  color: #000;
  margin-left: 2rem;
`;

const PickerWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: -15px;
  transform: translateX(100%);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  border-radius: 100px;
  z-index: -1;
  transition: opacity 0.5s ease, visibility 0.5s ease;
`;

const CreateNamespaceForm = ({ userID }) => {
  const { socket } = useContext(MainSocketContext);
  const { isChooseColorOpen } = useContext(CreateNamespaceContext);
  const [color, setColor] = useState('#c721ba');

  const handleChangeComplete = (color, event) => {
    setColor(color.hex);
  };

  return (
    <>
      <PickerWrapper isOpen={isChooseColorOpen}>
        <ChromePicker color={color} onChange={handleChangeComplete} />
      </PickerWrapper>

      <Formik
        initialValues={{
          name: '',
          isPrivate: false,
          password: ''
        }}
        onSubmit={({ name, isPrivate, password }) => {
          socket.emit('create_namespace', { name, ownerID: userID, isPrivate, password });
        }}
        validationSchema={CreateNamespaceSchema}
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
                {values.isPrivate
                  ? 'Password will be required while joining to the server'
                  : 'Password is not required'}
              </StyledParagraph>
            </CheckboxWrapper>
            <StyledButton type='submit'>Create</StyledButton>
          </StyledForm>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps = ({ authenticationReducer: { userID } }) => {
  return { userID };
};

export default connect(mapStateToProps)(CreateNamespaceForm);
