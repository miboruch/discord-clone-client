import React, { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Layout from './components/templates/Layout';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { API_URL } from './utils/helpers';
import AuthPage from './pages/AuthPage';
import LandingPage from './pages/LandingPage';
import { authenticationCheck } from './actions/authenticationActions';

const socket = io(API_URL);

function App({ isLoggedIn, loading, authenticationCheck }) {
  const [namespaces, setNamespaces] = useState(null);

  useEffect(() => {
    authenticationCheck();
  }, []);
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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Switch>
            {isLoggedIn ? (
              <Route path={'/'} component={LandingPage} />
            ) : (
              <>
                <Redirect exact from={'/'} to={'/login'} />
                <Route path={'/'} component={AuthPage} />
              </>
            )}
          </Switch>
        )}
      </Layout>
    </Router>
  );
}

const mapStateToProps = ({ authenticationReducer: { isLoggedIn, loading } }) => {
  return { isLoggedIn, loading };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticationCheck: () => dispatch(authenticationCheck())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
