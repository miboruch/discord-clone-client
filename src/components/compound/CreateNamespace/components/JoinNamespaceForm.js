import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { StyledButton, StyledForm } from '../../../molecules/AuthContent/styles';
import FormInput from '../../../molecules/FormInput/FormInput';
import * as Styles from '../styles/multiStepStyles';
import { SearchByIDNamespaceSchema, SearchByNameNamespaceSchema } from '../../../../utils/validationSchema';

const JoinNamespaceForm = () => {
  //* When the value is 1 - second form will be disabled, when 2 - first one will be disabled
  const [currentFormFocused, setFormFocused] = useState(0);
  return (
    <>
      <Formik
        initialValues={{ namespaceID: '' }}
        onSubmit={({ namespaceID }) => {
          console.log(namespaceID);
        }}
        validationSchema={SearchByIDNamespaceSchema}
      >
        {({ handleChange, handleBlur, errors }) => (
          <StyledForm isDisabled={currentFormFocused === 2} autocomplete={'off'}>
            <Styles.StyledInfoParagraph>
              {errors.namespaceID ? errors.namespaceID : 'By server ID - you can ask server owner to send you server ID'}
            </Styles.StyledInfoParagraph>
            <FormInput
              placeholder={'Server ID'}
              inputType='text'
              onChange={event => {
                handleChange(event);
                event.target.value ? setFormFocused(1) : setFormFocused(0);
              }}
              onBlur={handleBlur}
              name='namespaceID'
            />
            <StyledButton type='submit'>Search</StyledButton>
          </StyledForm>
        )}
      </Formik>
      <Formik
        initialValues={{ namespaceName: '' }}
        onSubmit={({ namespaceName }) => {
          console.log(namespaceName);
        }}
        validationSchema={SearchByNameNamespaceSchema}
      >
        {({ handleChange, handleBlur, errors }) => (
          <StyledForm isDisabled={currentFormFocused === 1}  autocomplete={'off'}>
            <Styles.StyledInfoParagraph>
              {errors.namespaceName ? errors.namespaceName : 'Or by the name'}
            </Styles.StyledInfoParagraph>
            <FormInput
              placeholder={'Server name'}
              inputType='text'
              onChange={event => {
                handleChange(event);
                event.target.value ? setFormFocused(2) : setFormFocused(0);
              }}
              onBlur={handleBlur}
              name='namespaceName'
            />
            <StyledButton type='submit'>Search</StyledButton>
          </StyledForm>
        )}
      </Formik>
    </>
  );
};

export default JoinNamespaceForm;
