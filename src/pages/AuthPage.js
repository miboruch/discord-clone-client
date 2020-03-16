import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { ReactComponent as MainScene } from '../assets/icons/messages_icon.svg';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import RegisterContent from '../components/molecules/AuthContent/RegisterContent/RegisterContent';
import LoginContent from '../components/molecules/AuthContent/LoginContent/LoginContent';

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
  height: ${({ isRegister }) => (isRegister ? '35vh' : '50vh')};
  transform: translateX(15%);
  position: absolute;
  bottom: 1rem;
  transition: height 0.6s ease-in-out;

  ${({ theme }) => theme.mq.tablet} {
    position: static;
  }

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
  height: ${({ isRegister }) => (isRegister ? '65vh' : '50vh')};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${({ theme }) => theme.mq.mobileL} {
    justify-content: flex-end;
    padding-bottom: 2rem;
  }

  ${({ theme }) => theme.mq.tablet} {
    height: 50vh;
  }

  ${({ theme }) => theme.mq.tabletL} {
    width: 40%;
    justify-content: center;
  }
`;

const AuthPage = ({ loading, location }) => {
  const wrapper = useRef(null);
  const isRegister = location.pathname.includes('register');

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
      <ContentWrapper>
        <FormWrapper isRegister={isRegister}>
          {loading ? (
            <p>Loading... (Spinner)</p>
          ) : (
            <Switch>
              <Route path={'/login'} component={LoginContent} />
              <Route path={'/register'} component={RegisterContent} />
            </Switch>
          )}
        </FormWrapper>
        <StyledSceneWrapper ref={wrapper} isRegister={isRegister}>
          <StyledScene />
        </StyledSceneWrapper>
      </ContentWrapper>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ authenticationReducer: { loading } }) => {
  return { loading };
};

AuthPage.propTypes = {
  loading: PropTypes.bool
};

export default connect(mapStateToProps)(AuthPage);
