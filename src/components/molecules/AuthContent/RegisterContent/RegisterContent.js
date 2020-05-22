import React from 'react';
import { connect } from 'react-redux';
import { RegisterSchema } from '../../../../utils/validationSchema';
import FormInput from '../../FormInput/FormInput';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import { userRegister } from '../../../../actions/authenticationActions';
import { StyledHeading, StyledForm, StyledButton, StyledLink, StyledParagraph } from '../styles';

const RegisterContent = ({ registerError, userRegister, history }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '', name: '', lastName: '' }}
      onSubmit={({ email, password, name, lastName }) => userRegister(email, password, name, lastName, history)}
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
          <StyledLink to={'/login'}>
            <StyledParagraph>or sign in if you already have an account</StyledParagraph>
          </StyledLink>
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
    userRegister: (email, password, name, lastName, history) => dispatch(userRegister(email, password, name, lastName, history))
  };
};

const RegisterContentWithRouter = withRouter(RegisterContent);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContentWithRouter);
