import React, { useContext } from 'react';
import CreateNamespaceContextProvider from '../CreateNamespaceContext';
import PropTypes from 'prop-types';
import { CreateNamespaceContext } from '../CreateNamespaceContext';
import * as Styles from '../styles/multiStepStyles';

const Page = ({ children, pageIndex }) => {
  const { currentPage, changePage } = useContext(CreateNamespaceContext);

  return currentPage === pageIndex ? (
    <Styles.StyledContentWrapper>
      {children}
      {currentPage !== 0 ? (
        <Styles.BackParagraph onClick={() => changePage(0)}>GO BACK</Styles.BackParagraph>
      ) : null}
    </Styles.StyledContentWrapper>
  ) : null;
};

/* Choose between join and create server */
const Controls = () => {
  const { currentPage, changePage } = useContext(CreateNamespaceContext);

  return currentPage === 0 ? (
    <Styles.StyledWrapper>
      <Styles.StyledJoinSection onClick={() => changePage(1)}>
        <Styles.StyledHeading>Join</Styles.StyledHeading>
        <Styles.StyledParagraph>Join to the server</Styles.StyledParagraph>
        <Styles.StyledJoinIcon />
      </Styles.StyledJoinSection>
      <Styles.StyledCreateSection onClick={() => changePage(2)}>
        <Styles.StyledHeading>Create</Styles.StyledHeading>
        <Styles.StyledParagraph>Create your own server</Styles.StyledParagraph>
        <Styles.StyledCreateIcon />
      </Styles.StyledCreateSection>
    </Styles.StyledWrapper>
  ) : null;
};

const Wizard = ({ children }) => {
  return <CreateNamespaceContextProvider>{children}</CreateNamespaceContextProvider>;
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  pageIndex: PropTypes.number.isRequired
};

Wizard.propTypes = {
  children: PropTypes.node.isRequired
};

export { Page, Controls, Wizard };
