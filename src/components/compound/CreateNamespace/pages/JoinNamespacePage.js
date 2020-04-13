import React, { useContext } from 'react';
import styled from 'styled-components';
import { StyledHeading } from '../styles/multiStepStyles';
import JoinNamespaceForm from '../components/JoinNamespaceForm';
import { CreateNamespaceContext } from '../context/CreateNamespaceContext';
import * as Styles from '../styles/multiStepStyles';

const JoinNamespacePage = () => {
  const { changePage } = useContext(CreateNamespaceContext);
  return (
    <>
      <StyledHeading>Join to server</StyledHeading>
      <JoinNamespaceForm />
      <Styles.BackParagraph onClick={() => changePage(0)}>GO BACK</Styles.BackParagraph>
    </>
  );
};

export default JoinNamespacePage;
