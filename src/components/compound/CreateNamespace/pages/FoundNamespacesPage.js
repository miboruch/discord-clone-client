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
  color: #222;
  margin-bottom: 2rem;
`;

const StyledParagraph = styled.p`
  color: #222;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const FoundNamespacesPage = ({ isSearching, searchedNamespaces }) => {
  const { changePage } = useContext(NamespaceControllerContext);
  return (
    <StyledWrapper>
      {isSearching ? (
        <Spinner />
      ) : (
        <>
          <StyledHeading>Servers: </StyledHeading>
          <FoundNamespacesWrapper>
            {searchedNamespaces.length !== 0 ? (
              <>
                {searchedNamespaces.map(item => (
                  <NamespaceJoinBox namespace={item} key={item._id} />
                ))}
              </>
            ) : (
              <StyledParagraph>Servers not found</StyledParagraph>
            )}
          </FoundNamespacesWrapper>
        </>
      )}
      <Styles.BackParagraph onClick={() => changePage(2)}>GO BACK</Styles.BackParagraph>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ namespaceReducer: { isSearching, searchedNamespaces, namespaceError } }) => {
  return { isSearching, searchedNamespaces, namespaceError };
};

export default connect(mapStateToProps)(FoundNamespacesPage);
