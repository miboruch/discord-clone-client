import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleCreateNamespace } from '../../../actions/toggleActions';
import NamespaceNavBox from '../../atoms/NamespaceNavBox/NamespaceNavBox';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 12;
`;

const StyledNavbar = styled.nav`
  width: 125px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.color.namespacesPanel};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 6rem 0;
  border-right: 2px solid rgba(14, 14, 14, 0.5);
  overflow-y: scroll;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  transition: transform 0.6s ease-in;

  ${({ theme }) => theme.mq.tablet} {
    position: static;
    overflow-y: scroll;
    transform: translateX(0);
    padding: 2rem 0;
  }
`;

/* Main wrapper - it contains main chat page */
const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${({ theme, isDarkTheme }) =>
    isDarkTheme ? theme.color.backgroundDark : theme.color.backgroundLight};
  color: ${({ isDarkTheme }) => (isDarkTheme ? '#fff' : '#000')};
  transition: all 0.3s ease;

  ${({ theme }) => theme.mq.tablet} {
    width: calc(100% - 125px);
  }
`;

const StyledParagraph = styled.p`
  color: #fff;
  font-size: 12px;
  margin-top: 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -10px;
    width: 10px;
    height: 1px;
    background-color: #fff;
    transform: translate(-50%, -30%);
  }
`;

const NamespaceTemplate = ({
  children,
  namespaces,
  isDarkTheme,
  toggleCreateNamespace,
  isMenuOpen,
  currentNamespaceID
}) => {
  return (
    <StyledWrapper>
      <NavbarWrapper>
        <StyledNavbar isOpen={isMenuOpen}>
          <>
            <Link to={`/home`}>
              <NamespaceNavBox backgroundColor={'#333'} name={'Home'} isCurrent={currentNamespaceID === 'home'} />
            </Link>
            <StyledParagraph>Your servers:</StyledParagraph>
            {namespaces.created && (
              <>
                {namespaces.created.map(item => (
                  <Link to={`/server/${item._id}`} key={item._id}>
                    <NamespaceNavBox
                      backgroundColor={item.color}
                      name={item.name}
                      isCurrent={currentNamespaceID === item._id.toString()}
                    />
                  </Link>
                ))}
              </>
            )}
            <StyledParagraph>Joined servers:</StyledParagraph>
            {namespaces.joined.map(item => (
              <Link to={`/server/${item._id}`} key={item._id}>
                <NamespaceNavBox name={item.name} backgroundColor={item.color} />
              </Link>
            ))}
            <NamespaceNavBox name={'+ Add new'} onClick={() => toggleCreateNamespace(true)} backgroundColor={'#555'} />
          </>
        </StyledNavbar>
      </NavbarWrapper>
      <ContentWrapper isDarkTheme={isDarkTheme}>{children}</ContentWrapper>
    </StyledWrapper>
  );
};

const mapStateToProps = ({
  namespaceReducer: { namespaces, currentNamespaceID },
  toggleReducer: { isDarkTheme, isMenuOpen }
}) => {
  return { namespaces, isDarkTheme, isMenuOpen, currentNamespaceID };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleCreateNamespace: isOpen => dispatch(toggleCreateNamespace(isOpen))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NamespaceTemplate);
