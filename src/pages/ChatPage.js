import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
`;

const StyledParagraph = styled.p`
  color: inherit;
`;

const ChatPage = ({match}) => {
  return (
    <StyledWrapper>
      <StyledParagraph>welcome on the main chat page {match.params.id}</StyledParagraph>
    </StyledWrapper>
  );
};

export default ChatPage;
