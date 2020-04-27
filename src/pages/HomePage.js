import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setCurrentNamespace, setCurrentNamespaceData } from '../actions/namespaceActions';
import { setCurrentRoomName, setRoomInfo } from '../actions/roomActions';
import UserBox from '../components/molecules/UserBox/UserBox';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const StyledUserBoxWrapper = styled.div`
  width: 200px;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const HomePage = ({ setCurrentNamespace, setCurrentNamespaceData, setCurrentRoomName, setRoomInfo }) => {
  useEffect(() => {
    setCurrentNamespace('home');
    setCurrentNamespaceData(null);
    setCurrentRoomName(null);
    setRoomInfo({});
  }, []);

  return (
    <StyledWrapper>
      <h1>hello</h1>
      <StyledUserBoxWrapper>
        <UserBox />
      </StyledUserBoxWrapper>
    </StyledWrapper>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentNamespace: namespaceID => dispatch(setCurrentNamespace(namespaceID)),
    setCurrentNamespaceData: namespaces => dispatch(setCurrentNamespaceData(namespaces)),
    setCurrentRoomName: roomName => dispatch(setCurrentRoomName(roomName)),
    setRoomInfo: roomInfo => dispatch(setRoomInfo(roomInfo))
  };
};

export default connect(null, mapDispatchToProps)(HomePage);
