import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { StyledButton, StyledForm } from '../../../molecules/AuthContent/styles';
import * as Styles from '../styles/multiStepStyles';
import FormInput from '../../../molecules/FormInput/FormInput';
import { Formik } from 'formik';
import { NamespaceControllerContext } from '../context/NamespaceControllerContext';
import { setInformationObject, toggleCreateNamespace } from '../../../../actions/toggleActions';
import MainSocketContext from '../../../../providers/MainSocketContext';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 4rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledHeading = styled.h1`
  font-size: 36px;
  font-family: ${({ theme }) => theme.font.family.avanti};
  color: #222;
  margin-bottom: 2rem;
`;

const JoinNamespacePassword = ({ toggleCreateNamespace, userID, setInformationObject }) => {
  const { socket } = useContext(MainSocketContext);
  const { changePage, chosenNamespace, setChosenNamespace } = useContext(NamespaceControllerContext);
  const [isError, setError] = useState(false);

  return (
    <StyledWrapper>
      <Formik
        initialValues={{ password: '' }}
        onSubmit={({ password }, { resetForm }) => {
          if (chosenNamespace.password === password) {
            socket.emit('new_namespace_join', { userID, namespace: chosenNamespace });
            setChosenNamespace({});
            toggleCreateNamespace(false);
            changePage(0);
          } else {
            setError(true);
            setInformationObject({ type: 'error', message: 'Password is incorrect' });
          }
          resetForm();
        }}
      >
        {({ handleChange, handleBlur }) => (
          <StyledForm autocomplete={'off'}>
            <StyledHeading>Password: </StyledHeading>
            <Styles.StyledInfoParagraph>Enter the password to join to the server</Styles.StyledInfoParagraph>
            <FormInput
              placeholder={'Password'}
              inputType='password'
              onChange={handleChange}
              onBlur={handleBlur}
              name='password'
            />
            {isError && <Styles.StyledInfoParagraph>Password is incorrect</Styles.StyledInfoParagraph>}
            <StyledButton type='submit'>Join</StyledButton>
          </StyledForm>
        )}
      </Formik>
      <Styles.BackParagraph onClick={() => changePage(3)}>GO BACK</Styles.BackParagraph>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ authenticationReducer: { userID } }) => {
  return { userID };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleCreateNamespace: isOpen => dispatch(toggleCreateNamespace(isOpen)),
    setInformationObject: informationObject => dispatch(setInformationObject(informationObject))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinNamespacePassword);
