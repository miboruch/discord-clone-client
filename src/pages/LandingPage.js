import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { API_URL } from '../utils/helpers';
import { fetchNamespacesSuccess } from '../actions/projectDataActions';

const LandingPage = ({ fetchNamespaces, token }) => {
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
    <div>
      <h1>Landing page</h1>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
