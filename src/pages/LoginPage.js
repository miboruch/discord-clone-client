import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gsap from 'gsap';
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
  background-color: ${({ isDarkTheme }) => (isDarkTheme ? '#2d2d2d' : '#f5f5f5')};

  ${({ theme }) => theme.mq.tabletL} {
    display: flex;
    align-items: center;
    flex-direction: row;
  }
`;

const StyledSceneWrapper = styled.div`
  width: 90%;
  height: 50vh;
  transform: translateX(15%);

  ${({ theme }) => theme.mq.tabletL} {
    width: 60%;
    height: 70vh;
    margin-right: 2rem;
  }
`;

const StyledScene = styled(MainScene)`
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${({ theme }) => theme.mq.tabletL} {
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

  ${({ theme }) => theme.mq.mobileL} {
    justify-content: flex-end;
    padding-bottom: 2rem;
  }

  ${({ theme }) => theme.mq.tabletL} {
    width: 40%;
    justify-content: center;
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

const LoginPage = ({ loading, userLogin }) => {
  const wrapper = useRef(null);

  useEffect(() => {
    const [elements] = wrapper.current.children;

    const mobilePhone = elements.getElementById('Mobile');
    const messageTop = elements.getElementById('MessageBoxTop');
    const middleMessage = elements.getElementById('Message');
    const messageBottom = elements.getElementById('MessageBoxBottom');
    const character = elements.getElementById('Character');

    gsap.set([mobilePhone, ...messageTop.children, ...messageBottom.children, middleMessage, character], {
      autoAlpha: 0
    });

    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

    tl.to(mobilePhone, { autoAlpha: 1, duration: 1 })
      .fromTo(character, { x: '-=100' }, { x: '0', autoAlpha: 1, duration: 1.2 })
      .fromTo(mobilePhone.children[2], { fill: '#2d2d2d' }, { fill: '#f5f5f5' })
      .fromTo(middleMessage, { x: '+=30' }, { x: '0', autoAlpha: 1, duration: 0.8 }, '+=0.15')
      .fromTo(
        [messageBottom.children, messageTop.children],
        { x: '+=10' },
        { x: '0', duration: 2, autoAlpha: 1, stagger: 0.1 }
      );
  }, []);

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
                  <StyledButton>Sign in</StyledButton>
                </StyledForm>
              )}
            </Formik>
          </FormWrapper>
          <StyledSceneWrapper ref={wrapper}>
            <StyledScene />
          </StyledSceneWrapper>
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
