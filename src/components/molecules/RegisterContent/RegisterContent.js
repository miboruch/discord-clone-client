import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { RegisterSchema } from '../../../utils/validationSchema';
import FormInput from '../FormInput/FormInput';
import { Form, Formik } from 'formik';
import { userRegister } from '../../../actions/authenticationActions';
import { Link } from 'react-router-dom';

const StyledHeading = styled.h1`
  font-family: ${({ theme }) => theme.font.family.avanti};
  font-size: 32px;
  margin-bottom: 2rem;
  letter-spacing: 2px;

  ${({ theme }) => theme.mq.standard} {
    font-size: 56px;
  }
`;

const StyledForm = styled(Form)`
  width: 90%;
`;

const StyledButton = styled.button`
  width: 140px;
  height: 40px;
  background: ${({ theme }) => theme.color.backgroundDark};
  border: none;
  font-family: ${({ theme }) => theme.font.family.futura};
  margin-top: 1rem;
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const StyledParagraph = styled.p`
  font-size: 13px;
  letter-spacing: 1px;
  margin-top: 1rem;

  ${({ theme }) => theme.mq.standard} {
    margin-top: 2rem;
  }
`;

const RegisterContent = ({ registerError, userRegister }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '', name: '', lastName: '' }}
      onSubmit={({ email, password, name, lastName }) => userRegister(email, password, name, lastName)}
      validationSchema={RegisterSchema}
    >
      {({ handleChange, handleBlur, errors }) => (
        <StyledForm>
          <StyledHeading>Register</StyledHeading>
          <FormInput
            labelText={errors.email || 'Email'}
            inputType='text'
            onChange={handleChange}
            onBlur={handleBlur}
            name='email'
          />
          <FormInput
            labelText={errors.password || 'Password'}
            inputType='password'
            onChange={handleChange}
            onBlur={handleBlur}
            name='password'
          />
          <FormInput
            labelText={errors.name || 'Name'}
            inputType='text'
            onChange={handleChange}
            onBlur={handleBlur}
            name='name'
          />
          <FormInput
            labelText={errors.lastName || 'Last name'}
            inputType='text'
            onChange={handleChange}
            onBlur={handleBlur}
            name='lastName'
          />
          <StyledButton type='submit'>Register</StyledButton>
          <Link to={'/login'}>
            <StyledParagraph>or sign in if you already have an account</StyledParagraph>
          </Link>
          <StyledParagraph>{registerError ? 'Provided data are incorrect' : ''}</StyledParagraph>
        </StyledForm>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ authenticationReducer: { registerError } }) => {
  return { registerError };
};

const mapDispatchToProps = dispatch => {
  return {
    userRegister: (email, password, name, lastName) => dispatch(userRegister(email, password, name, lastName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContent);
