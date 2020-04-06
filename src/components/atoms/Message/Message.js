import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MessageWrapper = styled.div`
  width: 100%;
  position: relative;
  transition: background-color 0.3s ease;
  padding: 0.5rem 0;
  border-top: ${({ isDarkTheme }) =>
    isDarkTheme ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'};

  &:hover {
    background-color: #28292e;
  }
`;

const StyledMessageTop = styled.section`
  display: flex;
  flex-direction: row;
`;

const Name = styled.span`
  color: lightgreen;
`;

const StyledMessage = styled.p`
  letter-spacing: 1px;
  color: inherit;
`;

const Message = ({ name, lastName, date, message, isDarkTheme }) => {
  return (
    <MessageWrapper isDarkTheme={isDarkTheme}>
      <StyledMessageTop>
        <Name>
          {name} {lastName}
        </Name>
        {date}
      </StyledMessageTop>
      <StyledMessage>{message}</StyledMessage>
    </MessageWrapper>
  );
};

const mapStateToProps = ({ toggleReducer: { isDarkTheme } }) => {
  return { isDarkTheme };
};

Message.propTypes = {
  name: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  message: PropTypes.any.isRequired
};

export default connect(mapStateToProps)(Message);
