import React from 'react';
import { connect } from 'react-redux';
import { LoginSchema } from '../../../../utils/validationSchema';
import FormInput from '../../FormInput/FormInput';
import { Formik } from 'formik';
import { userLogin } from '../../../../actions/authenticationActions';
import { StyledHeading, StyledForm, StyledButton, StyledLink, StyledParagraph } from '../styles';

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
          <StyledLink to={'/register'}>
            <StyledParagraph>or create an account</StyledParagraph>
          </StyledLink>
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
