import React, { useContext } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Spinner from '../../../atoms/Spinner/Spinner';
import NamespaceJoinBox from '../components/NamespaceJoinBox';
import * as Styles from '../styles/multiStepStyles';
import { NamespaceControllerContext } from '../context/NamespaceControllerContext';
import { setNamespaceError } from '../../../../actions/namespaceActions';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 4rem;
  overflow-y: scroll;
  position: relative;
`;

const FoundNamespacesWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
`;

const StyledHeading = styled.h1`
  font-size: 36px;
  font-family: ${({ theme }) => theme.font.family.avanti};
  color: #000;
  margin-bottom: 2rem;
`;

const StyledInfoHeading = styled(StyledHeading)`
  width: 100%;
  padding: 0 4rem;
  font-size: 42px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const FoundNamespacesPage = ({ isSearching, searchedNamespaces, namespaceError, setNamespaceError }) => {
  const { changePage } = useContext(NamespaceControllerContext);
  return (
    <StyledWrapper>
      {isSearching ? (
        <Spinner />
      ) : (
        <>
          {namespaceError ? (
            <StyledInfoHeading>{namespaceError}</StyledInfoHeading>
          ) : (
            <>
              <StyledHeading>Found servers</StyledHeading>
              <FoundNamespacesWrapper>
                {searchedNamespaces.map(item => (
                  <NamespaceJoinBox namespace={item} />
                ))}
              </FoundNamespacesWrapper>
            </>
          )}
        </>
      )}
      <Styles.BackParagraph
        onClick={() => {
          changePage(2);
          setNamespaceError(null);
        }}
      >
        GO BACK
      </Styles.BackParagraph>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ namespaceReducer: { isSearching, searchedNamespaces, namespaceError } }) => {
  return { isSearching, searchedNamespaces, namespaceError };
};

const mapDispatchToProps = dispatch => {
  return {
    setNamespaceError: error => dispatch(setNamespaceError(error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoundNamespacesPage);
