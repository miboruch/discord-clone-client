import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Hamburger from '../../atoms/Hamburger/Hamburger';
import { toggleDarkTheme, toggleMenu } from '../../../actions/toggleActions';
import ToggleCheckbox from '../../atoms/ToggleCheckbox/ToggleCheckbox';

const StyledHeader = styled.header`
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 16;

  ${({ theme }) => theme.mq.tablet} {
    background-color: transparent;
    pointer-events: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    left: auto;
    right: 0;
    -webkit-box-shadow: 0px 3px 8px -5px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 3px 8px -5px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 3px 8px -5px rgba(0, 0, 0, 0.75);
    z-index: 11;
  }
`;

const CheckBoxWrapper = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  pointer-events: auto;
`;

const Header = ({ isMenuOpen, toggleMenu, isDarkTheme, toggleDarkTheme }) => {
  return (
    <StyledHeader>
      <Hamburger isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <CheckBoxWrapper>
        <ToggleCheckbox isChecked={isDarkTheme} toggleFunction={toggleDarkTheme} />
      </CheckBoxWrapper>
    </StyledHeader>
  );
};

const mapStateToProps = ({ toggleReducer: { isMenuOpen, isDarkTheme } }) => {
  return { isMenuOpen, isDarkTheme };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: () => dispatch(toggleMenu()),
    toggleDarkTheme: () => dispatch(toggleDarkTheme())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
