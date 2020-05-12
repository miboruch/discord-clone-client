import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setCurrentNamespace, setCurrentNamespaceData } from '../actions/namespaceActions';
import { setCurrentRoomName, setRoomInfo } from '../actions/roomActions';
import UserBox from '../components/molecules/UserBox/UserBox';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ isDarkTheme }) => (isDarkTheme ? '#fff' : '#2d2d2d')};
`;

const StyledUserBoxWrapper = styled.div`
  width: 200px;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const StyledHeading = styled.h1`
  color: inherit;
  font-size: 42px;
`;

const HomePage = ({ setCurrentNamespace, setCurrentNamespaceData, setCurrentRoomName, setRoomInfo, isDarkTheme }) => {
  useEffect(() => {
    setCurrentNamespace('home');
    setCurrentNamespaceData(null);
    setCurrentRoomName(null);
    setRoomInfo({});
  }, []);

  return (
    <StyledWrapper isDarkTheme={isDarkTheme}>
      <StyledHeading>This page is not finished yet</StyledHeading>
      <StyledUserBoxWrapper>
        <UserBox />
      </StyledUserBoxWrapper>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ toggleReducer: { isDarkTheme } }) => {
  return { isDarkTheme };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentNamespace: namespaceID => dispatch(setCurrentNamespace(namespaceID)),
    setCurrentNamespaceData: namespaces => dispatch(setCurrentNamespaceData(namespaces)),
    setCurrentRoomName: roomName => dispatch(setCurrentRoomName(roomName)),
    setRoomInfo: roomInfo => dispatch(setRoomInfo(roomInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
