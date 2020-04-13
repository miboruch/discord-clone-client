import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { StyledButton } from '../../../molecules/AuthContent/styles';

const StyledNamespaceWrapper = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
`;

const StyledNamespaceName = styled.p`
  color: #222;
`;

const NamespaceJoinBox = ({ namespace }) => {
  return (
    <StyledNamespaceWrapper>
      <StyledNamespaceName>{namespace.name}</StyledNamespaceName>
      <StyledButton>Join</StyledButton>
    </StyledNamespaceWrapper>
  );
};

NamespaceJoinBox.propTypes = {
  namespace: PropTypes.object.isRequired
};

export default NamespaceJoinBox;
