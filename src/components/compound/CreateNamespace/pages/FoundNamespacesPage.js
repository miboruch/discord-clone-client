import React, { useContext } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Spinner from '../../../atoms/Spinner/Spinner';
import NamespaceJoinBox from '../components/NamespaceJoinBox';
import * as Styles from '../styles/multiStepStyles';
import { NamespaceControllerContext } from '../context/NamespaceControllerContext';

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

const FoundNamespacesPage = ({ isSearching, searchedNamespaces }) => {
  const { changePage } = useContext(NamespaceControllerContext);
  return (
    <StyledWrapper>
      {isSearching ? (
        <Spinner />
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
      <Styles.BackParagraph onClick={() => changePage(2)}>GO BACK</Styles.BackParagraph>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ namespaceReducer: { isSearching, searchedNamespaces } }) => {
  return { isSearching, searchedNamespaces };
};

export default connect(mapStateToProps)(FoundNamespacesPage);
