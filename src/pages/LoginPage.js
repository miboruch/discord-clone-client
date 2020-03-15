import React from 'react';
import styled from 'styled-components';
import { ReactComponent as MainScene } from '../assets/icons/messages_icon.svg';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import FormInput from '../components/molecules/FormInput/FormInput';
import { userLogin } from '../actions/authenticationActions';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const StyledScene = styled(MainScene)`
  width: 80%;
  height: 50vh;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const FormWrapper = styled.div`
  width: 100%;
  height: 50vh;
  position: absolute;
  top: 2rem;
  left: 0;
`;

const StyledForm = styled(Form)`
  width: 90%;
`;

const LoginPage = ({ loading, userLogin }) => {
  return (
    <StyledWrapper>
      <FormWrapper>
        <FormInput />
      </FormWrapper>
      <StyledScene />
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
  loading: PropTypes.boolean
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
