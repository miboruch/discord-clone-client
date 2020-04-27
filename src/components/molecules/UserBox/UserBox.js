import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SlideIcon from '../../atoms/SlideIcon/SlideIcon';
import { useOutsideClick } from '../../../utils/customHooks';
import { authLogout } from '../../../actions/authenticationActions';
import { withRouter } from 'react-router-dom';

const StyledUserWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const MenuWrapper = styled.ul`
  width: 100%;
  position: absolute;
  bottom: 60px;
  left: 0;
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0;
  z-index: 9;
`;

const UserName = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding-left: 1.5rem;
  align-items: center;
  position: relative;
  cursor: pointer;
  z-index: 10;
  background-color: ${({ theme }) => theme.color.backgroundDark};
`;

const SingleMenuItem = styled.li`
  width: 100%;
  height: 60px;
  color: #fff;
  background-color: ${({ theme }) => theme.color.roomsPanel};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: background-color 0.5s ease;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 1px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &:hover::after {
    width: 100%;
    transition: width 0.5s ease;
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.namespacesPanel};
  }

  &:last-of-type {
    border-bottom: 2px solid ${({ theme }) => theme.color.namespacesPanel};
  }
`;

const StyledImage = styled.img`
  width: 25px;
  height: 25px;
  border: ${({ isDarkTheme }) => (isDarkTheme ? 'none' : '1px solid #888')};
  border-radius: 50%;
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyledParagraph = styled.p`
  font-size: 14px;
  letter-spacing: 1px;
  padding-left: 2.6rem;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translate(-50%, -75%) rotate(-180deg);
  z-index: 11;
`;

const UserBox = ({ imageURL, userName, isDarkTheme, logout, history }) => {
  const menuRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [tl] = useState(gsap.timeline({ defaults: { ease: 'power3.inOut' } }));

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const menu = menuRef.current;
    tl.fromTo(menu, { y: '+=30', autoAlpha: 0 }, { y: '0', autoAlpha: 1, duration: 0.3 }).fromTo(
      menu.children,
      { autoAlpha: 0, y: '+=20' },
      { autoAlpha: 1, y: '0', stagger: 0.15 }
    );
  }, []);

  useEffect(() => {
    isMenuOpen ? tl.play() : tl.reverse();
  }, [isMenuOpen]);

  useOutsideClick(menuRef, isMenuOpen, toggleMenu);

  return (
    <StyledUserWrapper>
      <IconWrapper>
        <SlideIcon isOpen={isMenuOpen} />
      </IconWrapper>
      <MenuWrapper ref={menuRef}>
        <SingleMenuItem
          onClick={() => {
            logout();
            history.push('/');
          }}
        >
          Logout
        </SingleMenuItem>
      </MenuWrapper>
      <UserName onClick={() => setMenuOpen(!isMenuOpen)}>
        <StyledImage src={imageURL} isDarkTheme={isDarkTheme} />
        <StyledParagraph>
          {userName.name} {userName.lastName}
        </StyledParagraph>
      </UserName>
    </StyledUserWrapper>
  );
};

UserBox.propTypes = {
  imageURL: PropTypes.string
};

UserBox.defaultProps = {
  imageURL: 'https://pngimage.net/wp-content/uploads/2018/05/default-user-profile-image-png-7.png'
};

const mapStateToProps = ({ toggleReducer: { isDarkTheme }, authenticationReducer: { userName } }) => {
  return { isDarkTheme, userName };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authLogout())
  };
};

const UserBoxWithRouter = withRouter(UserBox);

export default connect(mapStateToProps, mapDispatchToProps)(UserBoxWithRouter);
