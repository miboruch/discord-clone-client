import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ReactComponent as CrownIcon } from '../../../assets/icons/crown.svg';

const MessageWrapper = styled.div`
  width: 100%;
  position: relative;
  transition: background-color 0.3s ease;
  padding: 0.5rem;
  border-top: ${({ isDarkTheme }) =>
    isDarkTheme ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'};

  &:hover {
    background-color: ${({ isDarkTheme }) => (isDarkTheme ? '#28292e' : '#eee')};
  }

  &::before {
    content: '';
    width: 3px;
    height: 100%;
    position: absolute;
    top: 0;
    left: -5px;
    background-color: ${({ isDarkTheme }) => (isDarkTheme ? '#222' : '#ccc')};
    display: ${({ isMessageSender }) => (!isMessageSender ? 'block' : 'none')};
  }
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ isMessageSender }) => (isMessageSender ? 'flex-end' : 'flex-start')};
  align-items: ${({ isMessageSender }) => (isMessageSender ? 'flex-end' : 'flex-start')};
`;

const StyledMessageTop = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Name = styled.span`
  color: ${({ isDarkTheme }) => (isDarkTheme ? 'lightgreen' : 'darkgreen')};
  margin-right: 1rem;
`;

const Date = styled.span`
  font-size: 13px;
`;

const StyledMessage = styled.p`
  letter-spacing: 1px;
  color: inherit;
`;

const StyledCrownIcon = styled(CrownIcon)`
  width: 15px;
  height: 15px;
  margin-bottom: 3px;
  margin-right: 0.5rem;
`;

const Message = ({ name, lastName, date, message, messageSenderID, userID, isDarkTheme, currentNamespaceData }) => {
  return (
    <MessageWrapper isDarkTheme={isDarkTheme} isMessageSender={messageSenderID === userID}>
      <MessageBox isMessageSender={messageSenderID === userID}>
        <StyledMessageTop>
          {currentNamespaceData.ownerID === messageSenderID && <StyledCrownIcon />}
          <Name isDarkTheme={isDarkTheme}>
            {name} {lastName}
          </Name>
          <Date>{date}</Date>
        </StyledMessageTop>
        <StyledMessage>{message}</StyledMessage>
      </MessageBox>
    </MessageWrapper>
  );
};

const mapStateToProps = ({
  toggleReducer: { isDarkTheme },
  authenticationReducer: { userID },
  namespaceReducer: { currentNamespaceData }
}) => {
  return { isDarkTheme, userID, currentNamespaceData };
};

Message.propTypes = {
  name: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  messageSenderID: PropTypes.any.isRequired,
  message: PropTypes.any.isRequired
};

export default connect(mapStateToProps)(Message);
