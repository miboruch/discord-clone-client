import React, { useContext } from 'react';
import CreateNamespaceContextProvider from '../CreateNamespaceContext';
import PropTypes from 'prop-types';
import { CreateNamespaceContext } from '../CreateNamespaceContext';
import {
  StyledWrapper,
  StyledContentWrapper,
  StyledJoinSection,
  StyledCreateSection,
  StyledCreateIcon,
  StyledJoinIcon,
  StyledHeading,
  StyledParagraph
} from '../styles/multiStepStyles';

const Page = ({ children, pageIndex }) => {
  const { currentPage } = useContext(CreateNamespaceContext);

  return currentPage === pageIndex ? <StyledContentWrapper>{children}</StyledContentWrapper> : null;
};

/* Choose between join and create server */
const Controls = () => {
  const { currentPage, changePage } = useContext(CreateNamespaceContext);

  return currentPage === 0 ? (
    <StyledWrapper>
      <StyledJoinSection onClick={() => changePage(1)}>
        <StyledHeading>Join</StyledHeading>
        <StyledParagraph>Join to the server</StyledParagraph>
        <StyledJoinIcon />
      </StyledJoinSection>
      <StyledCreateSection onClick={() => changePage(2)}>
        <StyledHeading>Create</StyledHeading>
        <StyledParagraph>Create your own server</StyledParagraph>
        <StyledCreateIcon />
      </StyledCreateSection>
    </StyledWrapper>
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
