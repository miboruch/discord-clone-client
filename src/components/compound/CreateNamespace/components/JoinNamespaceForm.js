import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { StyledButton, StyledForm } from '../../../molecules/AuthContent/styles';
import FormInput from '../../../molecules/FormInput/FormInput';
import * as Styles from '../styles/multiStepStyles';
import { SearchByIDNamespaceSchema, SearchByNameNamespaceSchema } from '../../../../utils/validationSchema';
import MainSocketContext from '../../../../providers/MainSocketContext';
import { setSearchLoading } from '../../../../actions/namespaceActions';
import { NamespaceControllerContext } from '../context/NamespaceControllerContext';

const JoinNamespaceForm = ({ setSearchLoading }) => {
  const { socket } = useContext(MainSocketContext);
  const { changePage } = useContext(NamespaceControllerContext);
  const [currentFormFocused, setFormFocused] = useState(0);
  //* When the value is 1 - second form will be disabled, when 2 - first one will be disabled

  return (
    <>
      <Formik
        initialValues={{ namespaceID: '' }}
        onSubmit={({ namespaceID }) => {
          socket.emit('search_namespace_by_id', namespaceID);
          setSearchLoading(true);
          changePage(3);
        }}
        validationSchema={SearchByIDNamespaceSchema}
      >
        {({ handleChange, handleBlur, errors }) => (
          <StyledForm isDisabled={currentFormFocused === 2} autocomplete={'off'}>
            <Styles.StyledInfoParagraph>
              {errors.namespaceID
                ? errors.namespaceID
                : 'By server ID - you can ask server owner to send you server ID'}
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
          socket.emit('search_namespace_by_name', namespaceName);
          setSearchLoading(true);
          changePage(3);
        }}
        validationSchema={SearchByNameNamespaceSchema}
      >
        {({ handleChange, handleBlur, errors }) => (
          <StyledForm isDisabled={currentFormFocused === 1} autocomplete={'off'}>
            <Styles.StyledInfoParagraph>
              {errors.namespaceName ? errors.namespaceName : 'Or by the name - search "Test" server with a "test" password if you do not want to create new server'}
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

const mapDispatchToProps = dispatch => {
  return {
    setSearchLoading: isSearching => dispatch(setSearchLoading(isSearching))
  };
};

export default connect(null, mapDispatchToProps)(JoinNamespaceForm);
