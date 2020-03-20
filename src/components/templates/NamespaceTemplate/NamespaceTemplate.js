import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RoomsTemplate from '../RoomsTemplate/RoomsTemplate';
import { openCreateNamespace } from '../../../actions/toggleActions';
import { ReactComponent as AddIcon } from '../../../assets/icons/add.svg';
import NamespaceNavBox from '../../atoms/NamespaceNavBox/NamespaceNavBox';
import { getFirstLetter } from '../../../utils/helpers';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: row;
`;

const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  transform: translateX(-85%);
  transition: transform 0.5s ease;
  z-index: 15;

  &:hover {
    transform: translateX(0);
  }

  ${({ theme }) => theme.mq.standard} {
    transform: translateX(0);
  }
`;

const StyledNavbar = styled.nav`
  width: 125px;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.namespacesPanel};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem 0;
  z-index: 10;
  border-right: 2px solid rgba(14, 14, 14, 0.5);
  overflow-y: scroll;
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

  ${({ theme }) => theme.mq.standard} {
    width: calc(100% - 125px);
  }
`;

const StyledNamespaceBox = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-color: ${({ isAddNew }) => (isAddNew ? 'rgba(102, 102, 102, 0.6)' : 'rgba(83, 212, 172, 0.7)')};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const StyledParagraph = styled.p`
  color: #fff;
  font-size: 12px;
  margin-bottom: 2rem;
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

const StyledAddIcon = styled(AddIcon)`
  width: 25px;
  height: 25px;
  fill: #fff;
`;

const NamespaceTemplate = ({ children, namespaces, isDarkTheme, openCreateNamespace }) => {
  return (
    <StyledWrapper>
      <NavbarWrapper>
        <StyledNavbar>
          <>
            <StyledParagraph>Your servers:</StyledParagraph>
            {namespaces.created && (
              <>
                {namespaces.created.map(item => (
                  <Link to={`/server/${item._id}`}>
                    <NamespaceNavBox firstLetter={getFirstLetter(item.name)} />
                  </Link>
                ))}
              </>
            )}
            <StyledParagraph>Joined servers:</StyledParagraph>
            {namespaces.join && (
              <>
                {namespaces.joined.map(item => (
                  <Link to={`/server/${item._id}`}>
                    <NamespaceNavBox firstLetter={getFirstLetter(item.name)} />
                  </Link>
                ))}
              </>
            )}
            <NamespaceNavBox firstLetter={'+'} onClick={() => openCreateNamespace()} backgroundColor={'#888'} />
          </>
        </StyledNavbar>
        <RoomsTemplate />
      </NavbarWrapper>
      <ContentWrapper isDarkTheme={isDarkTheme}>{children}</ContentWrapper>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ namespaceReducer: { namespaces }, toggleReducer: { isDarkTheme } }) => {
  return { namespaces, isDarkTheme };
};

const mapDispatchToProps = dispatch => {
  return {
    openCreateNamespace: () => dispatch(openCreateNamespace())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NamespaceTemplate);
