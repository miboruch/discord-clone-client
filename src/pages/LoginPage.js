import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as MainScene } from '../assets/icons/messages_icon.svg';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import FormInput from '../components/molecules/FormInput/FormInput';
import { userLogin } from '../actions/authenticationActions';
import { LoginSchema } from '../utils/validationSchema';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;

  ${({ theme }) => theme.mq.standard} {
    display: flex;
    align-items: center;
    flex-direction: row;
  }
`;

const StyledScene = styled(MainScene)`
  width: 80%;
  height: 50vh;
  transform: translateX(15%);

  ${({ theme }) => theme.mq.standard} {
    width: 60%;
    height: 70vh;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${({ theme }) => theme.mq.standard} {
    display: flex;
    flex-direction: row;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${({ theme }) => theme.mq.standard} {
    width: 40%;
  }
`;

const StyledHeading = styled.h1`
  font-family: ${({ theme }) => theme.font.family.avanti};
  font-size: 32px;
  margin-bottom: 2rem;
  letter-spacing: 2px;
`;

const StyledForm = styled(Form)`
  width: 90%;
`;

const LoginPage = ({ loading, userLogin }) => {
  return (
    <StyledWrapper>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ContentWrapper>
          <FormWrapper>
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
                </StyledForm>
              )}
            </Formik>
          </FormWrapper>
          <StyledScene />
        </ContentWrapper>
      )}
    </StyledWrapper>
  );
};

const mapStateToProps = ({ authenticationReducer: { loading } }) => {
  return { loading };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (email, password) => dispatch(userLogin(email, password))
  };
};

LoginPage.propTypes = {
  loading: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
