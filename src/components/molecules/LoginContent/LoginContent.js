import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { LoginSchema } from '../../../utils/validationSchema';
import FormInput from '../FormInput/FormInput';
import { Form, Formik } from 'formik';
import { userLogin } from '../../../actions/authenticationActions';
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

const LoginContent = ({ loginError, userLogin }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={({ email, password }) => userLogin(email, password)}
      validationSchema={LoginSchema}
    >
      {({ handleChange, handleBlur, errors }) => (
        <StyledForm>
          <StyledHeading>Sign in</StyledHeading>
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
          <StyledButton type='submit'>Sign in</StyledButton>
          <Link to={'/register'}>
            <StyledParagraph>or create an account</StyledParagraph>
          </Link>
          <StyledParagraph>{loginError ? 'Incorrect email or password' : ''}</StyledParagraph>
        </StyledForm>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ authenticationReducer: { loginError } }) => {
  return { loginError };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (email, password) => dispatch(userLogin(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContent);
