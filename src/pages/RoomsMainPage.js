import React, { useEffect } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { setCurrentNamespace } from '../actions/namespaceActions';
import queryString from 'query-string';
import { setCurrentRoom } from '../actions/roomActions';
import { API_URL } from '../utils/helpers';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  overflow: hidden;
  background: transparent;
`;

const RoomsMainPage = ({ match, location, setCurrentNamespace, setCurrentRoom, token }) => {
  const namespaceSocket = io(`${API_URL}/${match.params.id}`);

  /* here namespace connection - socket - namespace */

  useEffect(() => {
    namespaceSocket.on('connect', () => {
      console.log('CONNECTED TO NAMESPACE');
    });
    namespaceSocket.on('load_rooms', data => {
      console.log(data);
    })
  }, []);

  useEffect(() => {
    const roomParams = queryString.parse(location.search);
    setCurrentNamespace(match.params.id);
    roomParams && setCurrentRoom(roomParams.room);
  }, []);

  return (
    <StyledWrapper>
      <p>Choose room</p>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ authenticationReducer: { token } }) => {
  return { token };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentNamespace: namespaceID => dispatch(setCurrentNamespace(namespaceID)),
    setCurrentRoom: roomID => dispatch(setCurrentRoom(roomID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomsMainPage);
