/* Choose between join and create server */
import React, { useContext } from 'react';
import { CreateNamespaceContext } from '../context/CreateNamespaceContext';
import * as Styles from '../styles/multiStepStyles';

const ControlPage = () => {
  const { currentPage, changePage } = useContext(CreateNamespaceContext);

  return (
    currentPage === 0 && (
      <Styles.StyledWrapper>
        <Styles.StyledJoinSection onClick={() => changePage(2)}>
          <Styles.StyledHeading>Join</Styles.StyledHeading>
          <Styles.StyledParagraph>Join to the server</Styles.StyledParagraph>
          <Styles.StyledJoinIcon />
        </Styles.StyledJoinSection>
        <Styles.StyledCreateSection onClick={() => changePage(1)}>
          <Styles.StyledHeading>Create</Styles.StyledHeading>
          <Styles.StyledParagraph>Create your own server</Styles.StyledParagraph>
          <Styles.StyledCreateIcon />
        </Styles.StyledCreateSection>
      </Styles.StyledWrapper>
    )
  );
};

export default ControlPage;
