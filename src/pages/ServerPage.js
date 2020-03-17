import React, { useEffect } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { API_URL } from '../utils/helpers';
import { fetchNamespacesSuccess } from '../actions/projectDataActions';
import NamespaceTemplate from '../components/templates/NamespaceTemplate/NamespaceTemplate';
import RoomsMainPage from './RoomsMainPage';
import ChatPage from './ChatPage';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const ServerPage = ({ fetchNamespaces, token }) => {
  const socket = io(API_URL, {
    query: {
      token
    }
  });

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('user_connected', {
        socketID: socket.id
        // username: socket.query.username
      });
      console.log(socket);
      socket.on('load_rooms', data => {
        console.log(data);
      });
      socket.on('load_namespaces', namespaces => {
        fetchNamespaces(namespaces);
        console.log(namespaces);
      });
      socket.on('namespace_created', namespace => {
        console.log(namespace);
      });
    });
  }, []);

  return (
    <StyledWrapper>
      <NamespaceTemplate>
        <Switch>
          <Route path={'/server/:id'} component={RoomsMainPage} />
          <Route path={'/room/:id'} component={ChatPage} />
        </Switch>
      </NamespaceTemplate>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ authenticationReducer: { token } }) => {
  return { token };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNamespaces: namespaces => dispatch(fetchNamespacesSuccess(namespaces))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerPage);
