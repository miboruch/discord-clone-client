import React from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';

const spin = keyframes`
  0% { 
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  width: 100px;
  height: 100px;
  background-color: transparent;
  //position: absolute;
  //top: 50%;
  //left: 50%;
  //transform: translate(-50%, -50%);
  border: ${({ isDarkTheme }) => (isDarkTheme ? '2px solid rgba(255,255,255, 0.4)' : '2px solid rgba(0,0,0, 0.4)')};
  border-top: 2px solid rgba(23, 23, 23, 1);
  border-radius: 50%;
  animation: ${spin} 1s infinite ease;
`;

const Spinner = ({ isDarkTheme }) => <StyledSpinner isDarkTheme={isDarkTheme} />;

const mapStateToProps = ({ toggleReducer: { isDarkTheme } }) => {
  return { isDarkTheme };
};

export default connect(mapStateToProps)(Spinner);
