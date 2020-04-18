import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setCurrentNamespace, setCurrentNamespaceData } from '../actions/namespaceActions';
import { setCurrentRoomName, setRoomInfo } from '../actions/roomActions';

const HomePage = ({ setCurrentNamespace, setCurrentNamespaceData, setCurrentRoomName, setRoomInfo }) => {
  useEffect(() => {
    setCurrentNamespace('home');
    setCurrentNamespaceData(null);
    setCurrentRoomName(null);
    setRoomInfo({});
  }, []);

  return (
    <div>
      <h1>hello</h1>
    </div>
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
