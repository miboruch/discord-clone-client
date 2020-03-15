import React, { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Layout from './components/templates/Layout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { API_URL } from './utils/helpers';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';

const socket = io(API_URL);

function App({ isLoggedIn }) {
  const [namespaces, setNamespaces] = useState(null);
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
        setNamespaces(namespaces);
        console.log(namespaces);
      });
      socket.on('namespace_created', namespace => {
        console.log(namespace);
      });
    });
  }, []);

  console.log(namespaces);

  return (
    <Router>
      <Layout>
        <Switch>
          {isLoggedIn ? (
            <Route path={'/'} component={LandingPage} />
          ) : (
            <Route path={'/'} component={LoginPage} />
          )}
        </Switch>
      </Layout>
    </Router>
  );
}

const mapStateToProps = ({ authenticationReducer: { isLoggedIn } }) => {
  return { isLoggedIn };
};

export default connect(mapStateToProps)(App);
